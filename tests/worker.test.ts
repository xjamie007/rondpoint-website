/** Cloudflare Worker: Anmeldung, Speichern, Formulare – mit echter SQLite-Datenbank statt D1 und simuliertem GitHub. */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import worker, { cleanup } from '../worker/index.ts';
import { hashPassword, makeSession, readSession, verifyPassword } from '../worker/auth.ts';
import type { D1Database, D1PreparedStatement, Env } from '../worker/types.ts';

const ORIGIN = 'https://site.test';
const horaires = JSON.parse(readFileSync('tests/fixtures/horaires.json', 'utf8'));

function memoryD1(): { d1: D1Database; db: DatabaseSync } {
  const db = new DatabaseSync(':memory:');
  db.exec(readFileSync('worker/migrations/0001_init.sql', 'utf8'));
  const stmt = (sql: string, args: unknown[] = []): D1PreparedStatement => ({
    bind: (...a: unknown[]) => stmt(sql, a),
    first: async <T,>() => ((db.prepare(sql).get(...(args as never[])) as T) ?? null),
    all: async <T,>() => ({ results: db.prepare(sql).all(...(args as never[])) as T[], success: true }),
    run: async () => {
      db.prepare(sql).run(...(args as never[]));
      return { results: [], success: true };
    },
  });
  return { db, d1: { prepare: (sql: string) => stmt(sql), batch: async (s: D1PreparedStatement[]) => Promise.all(s.map((x) => x.run())) } };
}

let db: DatabaseSync;
let env: Env;
const assets = vi.fn(async () => new Response('<html>Seite</html>', { headers: { 'content-type': 'text/html' } }));

beforeEach(async () => {
  const m = memoryD1();
  db = m.db;
  env = { ASSETS: { fetch: assets }, DB: m.d1, SESSION_SECRET: 'x'.repeat(40), GITHUB_TOKEN: 'gh', GITHUB_REPO: 'o/r', GITHUB_API: 'https://gh.test' };
  db.prepare('INSERT INTO admins (email, pass_hash) VALUES (?, ?)').run('chef@garage.lu', await hashPassword('richtig-langes-passwort'));
});
afterEach(() => vi.restoreAllMocks());

const call = (path: string, init: RequestInit & { cookie?: string; editor?: boolean } = {}) => {
  const headers = new Headers(init.headers);
  if (init.editor !== false && init.method === 'POST') headers.set('x-rp-editor', '1');
  if (init.cookie) headers.set('cookie', init.cookie);
  return worker.fetch(new Request(`${ORIGIN}${path}`, { ...init, headers }), env);
};
const login = (email: string, password: string, extra: RequestInit & { editor?: boolean } = {}) =>
  call('/api/login', { method: 'POST', body: JSON.stringify({ email, password }), headers: { 'content-type': 'application/json' }, ...extra });
const cookieOf = (r: Response) => (r.headers.get('set-cookie') ?? '').split(';')[0];

describe('Worker: Passwort und Sitzung', () => {
  it('Passwort-Hash: richtig, falsch, unbekanntes Konto', async () => {
    const h = await hashPassword('geheim-und-lang');
    expect(h).toMatch(/^pbkdf2-sha256\$100000\$/);
    expect(await verifyPassword('geheim-und-lang', h)).toBe(true);
    expect(await verifyPassword('falsch', h)).toBe(false);
    expect(await verifyPassword('geheim-und-lang', null)).toBe(false);
  });
  it('Sitzung: gültig, verändert, abgelaufen, zu kurzer Schlüssel', async () => {
    const s = 'y'.repeat(32);
    const t = await makeSession(s, 'a@b.lu', 0);
    expect(await readSession(s, t, 1000)).toBe('a@b.lu');
    expect(await readSession(s, t.replace(/^[^.]+/, 'eEBiLmx1'), 1000)).toBeNull();
    expect(await readSession(s, t, 13 * 3600 * 1000)).toBeNull();
    await expect(makeSession('kurz', 'a@b.lu')).rejects.toThrow(/SESSION_SECRET/);
  });
});

describe('Worker: Anmelden', () => {
  it('Seiten kommen aus dem Speicher, nicht vom Worker-Code', async () => {
    const r = await call('/de/kontakt/');
    expect(await r.text()).toContain('Seite');
    expect(assets).toHaveBeenCalled();
  });
  it('ohne Kopfzeile des Editors oder von fremder Seite: verboten', async () => {
    expect((await login('chef@garage.lu', 'richtig-langes-passwort', { editor: false })).status).toBe(403);
    expect((await login('chef@garage.lu', 'richtig-langes-passwort', { headers: { 'content-type': 'application/json', origin: 'https://boese.test' } })).status).toBe(403);
  });
  it('richtig → Cookie (HttpOnly, Secure, SameSite=Strict, nur /api) und Sitzung', async () => {
    const r = await login('Chef@Garage.lu ', 'richtig-langes-passwort');
    expect(r.status).toBe(200);
    const sc = r.headers.get('set-cookie')!;
    expect(sc).toMatch(/HttpOnly/);
    expect(sc).toMatch(/Secure/);
    expect(sc).toMatch(/SameSite=Strict/);
    expect(sc).toMatch(/Path=\/api/);
    const s = await (await call('/api/session', { cookie: cookieOf(r) })).json();
    expect(s).toEqual({ loggedIn: true, email: 'chef@garage.lu' });
    // Konto gelöscht → Sitzung sofort ungültig
    db.prepare('DELETE FROM admins').run();
    expect((await (await call('/api/session', { cookie: cookieOf(r) })).json()).loggedIn).toBe(false);
  });
  it('falsch → 401; nach 5 Fehlversuchen gesperrt (auch mit richtigem Passwort)', async () => {
    for (let i = 0; i < 5; i++) expect((await login('chef@garage.lu', 'falsch')).status).toBe(401);
    const r = await login('chef@garage.lu', 'richtig-langes-passwort');
    expect(r.status).toBe(429);
    expect((await r.json()).error).toMatch(/15 Minuten/);
    expect((await login('niemand@garage.lu', 'x')).status).toBe(401);
  });
});

describe('Worker: Speichern nach GitHub', () => {
  it('ohne Anmeldung 401; angemeldet: ein Commit und Protokoll in D1', async () => {
    const commits: string[] = [];
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input, init) => {
      const p = String(input).replace('https://gh.test/repos/o/r', '');
      const res = (b: unknown, s = 200) => new Response(typeof b === 'string' ? b : JSON.stringify(b), { status: s });
      if (p.startsWith('/contents/')) return p.includes('horaires') ? res(JSON.stringify(horaires)) : res({}, 404);
      if (p === '/git/ref/heads/main') return res({ object: { sha: 'h1' } });
      if (p === '/git/commits/h1') return res({ tree: { sha: 't1' }, committer: { date: '2026-10-15T10:00:00Z' } });
      if (p.startsWith('/git/trees/t1')) return res({ tree: [], truncated: false });
      if (p === '/git/trees') return res({ sha: 't2' }, 201);
      if (p === '/git/commits') { commits.push(JSON.parse(String(init!.body)).message); return res({ sha: 'c2', committer: { date: '2026-10-15T10:01:00Z' } }, 201); }
      if (p === '/git/refs/heads/main') return res({});
      return res({ message: p }, 404);
    });
    const body = JSON.stringify({ action: 'publish', state: { v: 1, texts: {}, lists: {}, photos: {}, hours: { ...horaires.week, sa: [] } } });
    expect((await call('/api/publish', { method: 'POST', body })).status).toBe(401);
    const c = cookieOf(await login('chef@garage.lu', 'richtig-langes-passwort'));
    const r = await call('/api/publish', { method: 'POST', body, cookie: c });
    expect(await r.json()).toMatchObject({ ok: true, sha: 'c2', summary: ['Öffnungszeiten'] });
    expect(commits).toEqual(['Website-Editor: Öffnungszeiten']);
    expect(db.prepare('SELECT user_email, summary FROM admin_changes').all()).toEqual([{ user_email: 'chef@garage.lu', summary: 'Öffnungszeiten' }]);
    // ungültiger Inhalt → 422, nichts geschrieben
    const bad = await call('/api/publish', { method: 'POST', cookie: c, body: JSON.stringify({ action: 'publish', state: { v: 1, texts: { de: { 'x y': 'a' } }, lists: {}, photos: {} } }) });
    expect(bad.status).toBe(422);
  });
});

describe('Worker: Formulare', () => {
  const form = (extra: Record<string, string> = {}) =>
    new URLSearchParams({ type: 'contact', lang: 'de', subject: 'question', message: 'Hallo', name: 'Ana', phone: '+352 621 000 000', consent: 'yes', ...extra });
  const send = (body: URLSearchParams, json = true) =>
    call('/api/inquiry', { method: 'POST', editor: false, body, headers: { 'content-type': 'application/x-www-form-urlencoded', ...(json ? { accept: 'application/json' } : {}) } });

  it('gültig → gespeichert (Mail nur protokolliert), ohne JavaScript 303 auf die Danke-Seite', async () => {
    expect(await (await send(form())).json()).toEqual({ ok: true, fields: [] });
    const r = await send(form(), false);
    expect(r.status).toBe(303);
    expect(r.headers.get('location')).toBe(`${ORIGIN}/de/danke/`);
    const rows = db.prepare('SELECT type, lang, name, mail_status FROM inquiries').all();
    expect(rows).toEqual([{ type: 'contact', lang: 'de', name: 'Ana', mail_status: 'pending' }, { type: 'contact', lang: 'de', name: 'Ana', mail_status: 'pending' }]);
  });
  it('ungültig → 422 mit Feldern; Honeypot → „ok“, aber nichts gespeichert; Rate-Limit → 429', async () => {
    const bad = await send(form({ phone: '12' }));
    expect(bad.status).toBe(422);
    expect((await bad.json()).fields).toContain('phone');
    expect((await send(form({ website: 'spam' }))).status).toBe(200);
    expect(db.prepare('SELECT COUNT(*) AS n FROM inquiries').get()).toEqual({ n: 0 });
    env.RATE_LIMIT = '1';
    expect((await send(form())).status).toBe(200);
    expect((await send(form())).status).toBe(429);
  });
  it('Aufräumen: Anfragen nach 90 Tagen, Fehlversuche und IP-Hashes nach 24 Stunden', async () => {
    db.prepare("INSERT INTO inquiries (created_at, type, lang, name, phone, subject, payload) VALUES (datetime('now', '-91 days'), 'contact', 'de', 'Alt', '1', 's', '{}')").run();
    db.prepare("INSERT INTO inquiries (type, lang, name, phone, subject, payload) VALUES ('contact', 'de', 'Neu', '1', 's', '{}')").run();
    db.prepare('INSERT INTO login_attempts (key, ts) VALUES (?, ?)').run('e:x', Math.floor(Date.now() / 1000) - 90_000);
    await cleanup(env);
    expect(db.prepare('SELECT name FROM inquiries').all()).toEqual([{ name: 'Neu' }]);
    expect(db.prepare('SELECT COUNT(*) AS n FROM login_attempts').get()).toEqual({ n: 0 });
  });
});
