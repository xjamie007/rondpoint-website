/**
 * Formulare der Website (Miete, Auto, Werkstatt, Kontakt) auf Cloudflare.
 * Gleiche Regeln wie die Supabase-Function `inquiry` (Prüfung, Betreff, Mailtext aus lib.ts):
 *  1. Honeypot → still „Erfolg“, nichts speichern
 *  2. Prüfung je Typ
 *  3. Rate-Limit über gehashte IP (24 Stunden)
 *  4. Speichern in D1 (inquiries), Löschung nach 90 Tagen (Cron in index.ts)
 *  5. Mail an FORM_RECIPIENT über einen EU-Mailanbieter; scheitert sie, bleibt die Anfrage gespeichert
 *  6. Antwort: JSON (Formular mit JavaScript) oder 303 auf die Danke-Seite
 */
import { errorPage, LANGS, mailText, subjectLine, THANKS_PATH, validate, type Inquiry, type Lang } from '../supabase/functions/inquiry/lib.ts';
import { sha256Hex } from './auth';
import type { Env } from './types';

/** true = verschickt; false = nur protokolliert (MAIL_PROVIDER=log, zum Testen) */
async function sendMail(env: Env, opts: { subject: string; text: string; replyTo?: string }): Promise<boolean> {
  const provider = env.MAIL_PROVIDER || 'log';
  const to = env.FORM_RECIPIENT ?? '';
  const from = env.MAIL_FROM ?? '';
  if (provider === 'log') {
    console.log(`[mail:log] an ${to || '(FORM_RECIPIENT fehlt)'}: ${opts.subject}`);
    return false;
  }
  if (!to) throw new Error('FORM_RECIPIENT fehlt');
  const m = from.match(/^(.*)<(.+)>$/);
  const fromName = m ? m[1].trim().replace(/^"|"$/g, '') : 'rondpoint.lu';
  const fromEmail = m ? m[2].trim() : from;
  let res: Response;
  if (provider === 'brevo') {
    res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': env.MAIL_API_KEY ?? '', 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        sender: { name: fromName, email: fromEmail },
        to: [{ email: to }],
        ...(opts.replyTo ? { replyTo: { email: opts.replyTo } } : {}),
        subject: opts.subject,
        textContent: opts.text,
      }),
    });
  } else if (provider === 'scaleway') {
    res = await fetch('https://api.scaleway.com/transactional-email/v1alpha1/regions/fr-par/emails', {
      method: 'POST',
      headers: { 'X-Auth-Token': env.MAIL_API_KEY ?? '', 'content-type': 'application/json' },
      body: JSON.stringify({
        from: { email: fromEmail, name: fromName },
        to: [{ email: to }],
        subject: opts.subject,
        text: opts.text,
        project_id: env.SCALEWAY_PROJECT_ID,
        ...(opts.replyTo ? { additional_headers: [{ key: 'Reply-To', value: opts.replyTo }] } : {}),
      }),
    });
  } else {
    throw new Error(`Unbekannter MAIL_PROVIDER ${provider}`);
  }
  if (!res.ok) throw new Error(`Mail ${provider}: HTTP ${res.status} ${(await res.text()).slice(0, 300)}`);
  return true;
}

function respond(req: Request, lang: Lang, kind: 'ok' | 'invalid' | 'rate' | 'error', fields: string[] = []): Response {
  const origin = new URL(req.url).origin;
  const status = kind === 'ok' ? 200 : kind === 'invalid' ? 422 : kind === 'rate' ? 429 : 500;
  if ((req.headers.get('accept') ?? '').includes('application/json')) {
    return Response.json({ ok: kind === 'ok', fields }, { status });
  }
  if (kind === 'ok') return new Response(null, { status: 303, headers: { Location: `${origin}${THANKS_PATH[lang]}` } });
  const referer = req.headers.get('referer');
  const back = referer && referer.startsWith(`${origin}/`) ? referer : `${origin}/${lang}/`;
  return new Response(errorPage(lang, fields, back, kind === 'rate'), { status, headers: { 'content-type': 'text/html; charset=utf-8' } });
}

export async function handleInquiry(req: Request, env: Env): Promise<Response> {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return respond(req, 'fr', 'invalid', ['form']);
  }
  const input: Record<string, string> = {};
  for (const [k, v] of form.entries()) if (typeof v === 'string') input[k] = v;
  const lang: Lang = (LANGS as readonly string[]).includes(input.lang) ? (input.lang as Lang) : 'fr';

  // Honeypot: Bots bekommen dieselbe Antwort wie Menschen, gespeichert wird nichts
  if (input.website) return respond(req, lang, 'ok');

  const v = validate(input);
  if (!v.ok) return respond(req, lang, 'invalid', v.fields);
  const data: Inquiry = v.data;

  const ip = req.headers.get('cf-connecting-ip') ?? 'unknown';
  const ipHash = await sha256Hex(`${env.IP_HASH_SALT ?? env.SESSION_SECRET}|${ip}`);
  const subject = subjectLine(data);
  const text = mailText(data, new Date());
  const now = Math.floor(Date.now() / 1000);
  const limit = Number(env.RATE_LIMIT ?? '10');

  try {
    const used = await env.DB.prepare('SELECT COUNT(*) AS n FROM inquiry_rate WHERE ip_hash = ? AND ts > ?').bind(ipHash, now - 86_400).first<{ n: number }>();
    if ((used?.n ?? 0) >= limit) return respond(req, lang, 'rate');
    await env.DB.prepare('INSERT INTO inquiry_rate (ip_hash, ts) VALUES (?, ?)').bind(ipHash, now).run();

    const { consent: _c, ...payload } = data as Inquiry & { consent: string };
    const row = await env.DB.prepare('INSERT INTO inquiries (type, lang, name, phone, email, subject, payload) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id')
      .bind(data.type, data.lang, data.name, data.phone, data.email ?? null, subject, JSON.stringify(payload))
      .first<{ id: number }>();
    try {
      if (await sendMail(env, { subject, text, replyTo: data.email })) await env.DB.prepare("UPDATE inquiries SET mail_status = 'sent' WHERE id = ?").bind(row!.id).run();
    } catch (mailErr) {
      console.error('Mail fehlgeschlagen, Anfrage bleibt gespeichert', mailErr);
      await env.DB.prepare("UPDATE inquiries SET mail_status = 'failed', mail_error = ? WHERE id = ?").bind(String((mailErr as Error).message).slice(0, 500), row!.id).run();
    }
    return respond(req, lang, 'ok');
  } catch (err) {
    console.error('inquiry', err);
    return respond(req, lang, 'error');
  }
}
