/**
 * Supabase Edge Function `inquiry` (F).
 *
 * Nimmt alle vier Formulare per normalem POST entgegen (funktioniert ohne JavaScript):
 *  1. Honeypot → still „Erfolg", nichts speichern
 *  2. Prüfung mit Zod je Typ
 *  3. Rate-Limit über gehashten IP-Wert (24 Stunden)
 *  4. Speichern in `inquiries` (EU-Region), Löschung nach 90 Tagen per pg_cron
 *  5. Mail an FORM_RECIPIENT über einen EU-Mailanbieter; scheitert die Mail,
 *     bleibt die Anfrage gespeichert (mail_status = failed)
 *  6. Antwort: 303 auf die Danke-Seite der Sprache, oder JSON bei Accept: application/json
 *
 * Umgebungsvariablen (supabase secrets set …):
 *   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY   (von Supabase gesetzt)
 *   FORM_RECIPIENT     Empfänger, z. B. info@rondpoint.lu
 *   MAIL_PROVIDER      brevo | scaleway | log
 *   MAIL_API_KEY       Schlüssel des Mailanbieters
 *   MAIL_FROM          Absender, z. B. "rondpoint.lu <formulaire@rondpoint.lu>"
 *   SCALEWAY_PROJECT_ID nur für scaleway
 *   IP_HASH_SALT       zufälliger Wert für den IP-Hash
 *   SITE_ORIGIN        https://www.rondpoint.lu
 *   ALLOWED_ORIGINS    kommagetrennt, z. B. https://www.rondpoint.lu,http://localhost:4321
 *   RATE_LIMIT         Anfragen pro IP und 24 h (Standard 10)
 *   INQUIRY_DRY_RUN    1 = nichts speichern, keine Mail (lokaler Test)
 */
import { createClient } from 'npm:@supabase/supabase-js@2.117.2';
import { errorPage, LANGS, mailText, subjectLine, THANKS_PATH, validate, type Inquiry, type Lang } from './lib.ts';

const env = (k: string, d = '') => Deno.env.get(k) ?? d;
const SITE_ORIGIN = env('SITE_ORIGIN', 'https://www.rondpoint.lu');
const ALLOWED = env('ALLOWED_ORIGINS', SITE_ORIGIN)
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const RATE_LIMIT = Number(env('RATE_LIMIT', '10'));
const DRY = env('INQUIRY_DRY_RUN') === '1';

const db = DRY ? null : createClient(env('SUPABASE_URL'), env('SUPABASE_SERVICE_ROLE_KEY'), { auth: { persistSession: false } });

function cors(origin: string | null): Record<string, string> {
  if (!origin || !ALLOWED.includes(origin)) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type, accept',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

async function sha256(s: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function sendMail(opts: { subject: string; text: string; replyTo?: string }): Promise<void> {
  const provider = env('MAIL_PROVIDER', 'log');
  const to = env('FORM_RECIPIENT');
  const from = env('MAIL_FROM');
  if (provider === 'log' || !to) {
    console.log(`[mail:${provider}] an ${to || '(FORM_RECIPIENT fehlt)'}: ${opts.subject}\n${opts.text}`);
    return;
  }
  const fromMatch = from.match(/^(.*)<(.+)>$/);
  const fromName = fromMatch ? fromMatch[1].trim().replace(/^"|"$/g, '') : 'rondpoint.lu';
  const fromEmail = fromMatch ? fromMatch[2].trim() : from;
  let res: Response;
  if (provider === 'brevo') {
    res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': env('MAIL_API_KEY'), 'content-type': 'application/json', accept: 'application/json' },
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
      headers: { 'X-Auth-Token': env('MAIL_API_KEY'), 'content-type': 'application/json' },
      body: JSON.stringify({
        from: { email: fromEmail, name: fromName },
        to: [{ email: to }],
        subject: opts.subject,
        text: opts.text,
        project_id: env('SCALEWAY_PROJECT_ID'),
        ...(opts.replyTo ? { additional_headers: [{ key: 'Reply-To', value: opts.replyTo }] } : {}),
      }),
    });
  } else {
    throw new Error(`Unbekannter MAIL_PROVIDER ${provider}`);
  }
  if (!res.ok) throw new Error(`Mail ${provider}: HTTP ${res.status} ${(await res.text()).slice(0, 300)}`);
}

function respond(
  req: Request,
  lang: Lang,
  kind: 'ok' | 'invalid' | 'rate' | 'error',
  fields: string[] = [],
): Response {
  const origin = req.headers.get('origin');
  const wantsJson = (req.headers.get('accept') ?? '').includes('application/json');
  const status = kind === 'ok' ? 200 : kind === 'invalid' ? 422 : kind === 'rate' ? 429 : 500;
  if (wantsJson) {
    return new Response(JSON.stringify({ ok: kind === 'ok', fields }), {
      status,
      headers: { 'content-type': 'application/json; charset=utf-8', ...cors(origin) },
    });
  }
  if (kind === 'ok') {
    return new Response(null, { status: 303, headers: { Location: `${SITE_ORIGIN}${THANKS_PATH[lang]}` } });
  }
  const referer = req.headers.get('referer');
  const back = referer && referer.startsWith(SITE_ORIGIN) ? referer : `${SITE_ORIGIN}/${lang}/`;
  return new Response(errorPage(lang, fields, back, kind === 'rate'), {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(origin) });
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return respond(req, 'fr', 'invalid', ['form']);
  }
  const input: Record<string, string> = {};
  for (const [k, v] of form.entries()) if (typeof v === 'string') input[k] = v;
  const lang: Lang = (LANGS as readonly string[]).includes(input.lang) ? (input.lang as Lang) : 'fr';

  // Honeypot: Bots bekommen dieselbe Antwort wie Menschen, es wird nichts gespeichert
  if (input.website) return respond(req, lang, 'ok');

  const v = validate(input);
  if (!v.ok) return respond(req, lang, 'invalid', v.fields);
  const data: Inquiry = v.data;

  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  const ipHash = await sha256(`${env('IP_HASH_SALT')}|${ip}`);
  const subject = subjectLine(data);
  const text = mailText(data, new Date());

  if (DRY) {
    console.log(`[dry-run] ${subject} (ip ${ipHash.slice(0, 8)})\n${text}`);
    return respond(req, lang, 'ok');
  }

  try {
    const since = new Date(Date.now() - 24 * 3_600_000).toISOString();
    const { count, error: countErr } = await db!
      .from('inquiry_rate')
      .select('id', { count: 'exact', head: true })
      .eq('ip_hash', ipHash)
      .gte('created_at', since);
    if (countErr) throw countErr;
    if ((count ?? 0) >= RATE_LIMIT) return respond(req, lang, 'rate');
    await db!.from('inquiry_rate').insert({ ip_hash: ipHash });

    const { consent: _c, ...payload } = data as Inquiry & { consent: string };
    const { data: row, error } = await db!
      .from('inquiries')
      .insert({
        type: data.type,
        lang: data.lang,
        name: data.name,
        phone: data.phone,
        email: data.email ?? null,
        subject,
        payload,
      })
      .select('id')
      .single();
    if (error) throw error;

    try {
      await sendMail({ subject, text, replyTo: data.email });
      await db!.from('inquiries').update({ mail_status: 'sent' }).eq('id', row.id);
    } catch (mailErr) {
      console.error('Mail fehlgeschlagen, Anfrage bleibt gespeichert', mailErr);
      await db!
        .from('inquiries')
        .update({ mail_status: 'failed', mail_error: String((mailErr as Error).message).slice(0, 500) })
        .eq('id', row.id);
    }
    return respond(req, lang, 'ok');
  } catch (err) {
    console.error('inquiry', err);
    return respond(req, lang, 'error');
  }
});
