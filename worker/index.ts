/**
 * Cloudflare Worker der Website: liefert die fertigen Seiten aus (dist/, statische Assets)
 * und beantwortet nur /api/* selbst:
 *
 *   POST /api/login     { email, password } → Sitzungs-Cookie (12 h)
 *   POST /api/logout
 *   GET  /api/session   → { loggedIn, email }
 *   POST /api/publish   { action: "blob" | "publish" } → wie die Supabase-Function, Commit nach GitHub
 *   POST /api/inquiry   Formulare (worker/inquiry.ts)
 *
 * Täglich (Cron): alte Anfragen (90 Tage), IP-Hashes und Fehlversuche (24 h) löschen.
 *
 * Schutz:
 *  - Konten nur in der Tabelle admins; es gibt keine Registrierung.
 *  - Passwörter als PBKDF2-Hash (auth.ts).
 *  - Höchstens 5 Fehlversuche pro E-Mail und 20 pro IP in 15 Minuten.
 *  - Cookie HttpOnly, Secure, SameSite=Strict, nur für /api.
 *  - Schreibende Anfragen nur von der eigenen Seite (Origin und Kopfzeile X-RP-Editor).
 */
import { ContentError, type EditState } from '../supabase/functions/publish/convert.ts';
import { HttpError, makeGit } from '../supabase/functions/publish/publish.ts';
import { clearCookie, COOKIE, getCookie, makeSession, readSession, sessionCookie, sha256Hex, verifyPassword } from './auth';
import { handleInquiry } from './inquiry';
import { SCHEMA } from './schema';
import type { Ctx, Env } from './types';

const WINDOW = 15 * 60;
const MAX_PER_EMAIL = 5;
const MAX_PER_IP = 20;
const MAX_BODY = 15 * 1024 * 1024;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (status: number, body: unknown, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', ...headers } });

/** Nur Anfragen der eigenen Seite (fremde Seiten können die Kopfzeile nicht ohne CORS-Freigabe setzen) */
function fromEditor(req: Request, url: URL): boolean {
  const origin = req.headers.get('origin');
  if (origin && origin !== url.origin) return false;
  return req.headers.get('x-rp-editor') === '1';
}

async function sessionEmail(req: Request, env: Env): Promise<string | null> {
  const email = await readSession(env.SESSION_SECRET, getCookie(req, COOKIE));
  if (!email) return null;
  // gelöschtes Konto: Sitzung sofort ungültig
  const row = await env.DB.prepare('SELECT email FROM admins WHERE email = ?').bind(email).first();
  return row ? email : null;
}

async function login(req: Request, env: Env): Promise<Response> {
  const body = (await req.json().catch(() => null)) as { email?: unknown; password?: unknown } | null;
  const email = String(body?.email ?? '').trim().toLowerCase();
  const password = String(body?.password ?? '');
  if (!EMAIL.test(email) || !password || password.length > 200) return json(401, { ok: false, error: 'E-Mail oder Passwort stimmt nicht.' });

  const now = Math.floor(Date.now() / 1000);
  const ipKey = `i:${(await sha256Hex(`${env.SESSION_SECRET}|${req.headers.get('cf-connecting-ip') ?? ''}`)).slice(0, 32)}`;
  const mailKey = `e:${email}`;
  const count = async (key: string) =>
    (await env.DB.prepare('SELECT COUNT(*) AS n FROM login_attempts WHERE key = ? AND ts > ?').bind(key, now - WINDOW).first<{ n: number }>())?.n ?? 0;
  if ((await count(mailKey)) >= MAX_PER_EMAIL || (await count(ipKey)) >= MAX_PER_IP) {
    return json(429, { ok: false, error: 'Zu viele Versuche. Bitte in 15 Minuten erneut versuchen.' });
  }

  const row = await env.DB.prepare('SELECT pass_hash FROM admins WHERE email = ?').bind(email).first<{ pass_hash: string }>();
  if (!(await verifyPassword(password, row?.pass_hash))) {
    await env.DB.batch([
      env.DB.prepare('INSERT INTO login_attempts (key, ts) VALUES (?, ?)').bind(mailKey, now),
      env.DB.prepare('INSERT INTO login_attempts (key, ts) VALUES (?, ?)').bind(ipKey, now),
    ]);
    return json(401, { ok: false, error: 'E-Mail oder Passwort stimmt nicht.' });
  }
  await env.DB.prepare('DELETE FROM login_attempts WHERE key = ?').bind(mailKey).run();
  return json(200, { ok: true, email }, { 'set-cookie': sessionCookie(await makeSession(env.SESSION_SECRET, email)) });
}

async function publish(req: Request, env: Env): Promise<Response> {
  const email = await sessionEmail(req, env);
  if (!email) return json(401, { ok: false, error: 'Die Anmeldung ist abgelaufen. Bitte erneut anmelden.' });
  if (Number(req.headers.get('content-length') ?? 0) > MAX_BODY) return json(413, { ok: false, error: 'Zu groß.' });
  const body = (await req.json().catch(() => null)) as { action?: string; state?: EditState; data?: unknown; ext?: unknown } | null;
  if (!body) return json(400, { ok: false, error: 'Ungültige Anfrage' });
  const git = makeGit(env);
  if (body.action === 'blob') return json(200, { ok: true, ...(await git.blob(body)) });
  if (body.action === 'publish') {
    const r = await git.publish(body.state as EditState);
    if (r.summary.length) {
      await env.DB.prepare('INSERT INTO admin_changes (user_email, summary, commit_sha) VALUES (?, ?, ?)').bind(email, r.summary.join(', '), r.sha).run();
    }
    return json(200, { ok: true, ...r });
  }
  return json(400, { ok: false, error: 'Unbekannte Aktion' });
}

async function route(req: Request, env: Env, url: URL): Promise<Response> {
  const p = url.pathname;
  if (p === '/api/session' && req.method === 'GET') {
    const email = await sessionEmail(req, env);
    return json(200, { loggedIn: !!email, email });
  }
  if (p === '/api/inquiry' && req.method === 'POST') return handleInquiry(req, env);
  if (req.method !== 'POST') return json(405, { ok: false, error: 'Nur POST' });
  if (!fromEditor(req, url)) return json(403, { ok: false, error: 'Nicht erlaubt' });
  if (p === '/api/login') return login(req, env);
  if (p === '/api/logout') return json(200, { ok: true }, { 'set-cookie': clearCookie() });
  if (p === '/api/publish') return publish(req, env);
  return json(404, { ok: false, error: 'Nicht gefunden' });
}

export async function cleanup(env: Env, now = Date.now()): Promise<void> {
  const s = Math.floor(now / 1000);
  await env.DB.batch([
    env.DB.prepare("DELETE FROM inquiries WHERE created_at < datetime(?, 'unixepoch', '-90 days')").bind(s),
    env.DB.prepare('DELETE FROM inquiry_rate WHERE ts < ?').bind(s - 86_400),
    env.DB.prepare('DELETE FROM login_attempts WHERE ts < ?').bind(s - 86_400),
  ]);
}

/** Tabellen beim ersten Aufruf anlegen (einmal je Worker-Instanz; alles „IF NOT EXISTS“) */
let schemaReady: Promise<unknown> | null = null;
export function ensureSchema(env: Env): Promise<unknown> {
  return (schemaReady ??= env.DB.batch(SCHEMA.map((s) => env.DB.prepare(s))).catch((e) => {
    schemaReady = null;
    throw e;
  }));
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(req);
    let res: Response;
    try {
      await ensureSchema(env);
      res = await route(req, env, url);
    } catch (e) {
      if (e instanceof ContentError) res = json(422, { ok: false, error: e.message });
      else if (e instanceof HttpError) res = json(e.status, { ok: false, error: e.message });
      else {
        console.error(e);
        res = json(500, { ok: false, error: 'Interner Fehler' });
      }
    }
    const out = new Response(res.body, res);
    out.headers.set('cache-control', 'no-store');
    out.headers.set('x-content-type-options', 'nosniff');
    return out;
  },
  async scheduled(_event: unknown, env: Env, ctx: Ctx): Promise<void> {
    ctx.waitUntil(ensureSchema(env).then(() => cleanup(env)));
  },
};
