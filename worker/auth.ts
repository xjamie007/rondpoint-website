/**
 * Anmeldung für den Admin-Bereich: Passwort-Hash (PBKDF2-SHA-256) und signiertes Sitzungs-Cookie.
 * Nur Web Crypto, damit es im Worker, in Node (Konten-Skript) und in den Tests gleich läuft.
 */

/** Höchstwert, den Cloudflare Workers für PBKDF2 erlauben */
export const ITERATIONS = 100_000;
export const COOKIE = 'rp_admin';
/** Sitzung: 12 Stunden */
export const SESSION_SECONDS = 12 * 3600;

const enc = new TextEncoder();

const toB64 = (b: Uint8Array) => btoa(String.fromCharCode(...b));
const fromB64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
const toB64url = (b: Uint8Array) => toB64(b).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromB64url = (s: string) => fromB64(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4));

/** Vergleich in konstanter Zeit (verrät nicht, ab welcher Stelle zwei Werte abweichen) */
export function sameBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a[i] ^ b[i];
  return d === 0;
}

async function derive(password: string, salt: Uint8Array<ArrayBuffer>, iterations: number): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey('raw', enc.encode(password.normalize('NFC')), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, key, 256);
  return new Uint8Array(bits);
}

/** „pbkdf2-sha256$100000$<salz>$<hash>“ (Base64) */
export async function hashPassword(password: string, salt: Uint8Array<ArrayBuffer> = crypto.getRandomValues(new Uint8Array(16)), iterations = ITERATIONS): Promise<string> {
  return `pbkdf2-sha256$${iterations}$${toB64(salt)}$${toB64(await derive(password, salt, iterations))}`;
}

// Für unbekannte E-Mail-Adressen trotzdem rechnen: gleiche Antwortzeit wie bei falschem Passwort
const DUMMY = 'pbkdf2-sha256$100000$AAAAAAAAAAAAAAAAAAAAAA==$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';

export async function verifyPassword(password: string, stored: string | null | undefined): Promise<boolean> {
  const [algo, iter, salt, hash] = (stored ?? DUMMY).split('$');
  if (algo !== 'pbkdf2-sha256' || !salt || !hash) return false;
  const n = Number(iter);
  if (!Number.isInteger(n) || n < 10_000 || n > ITERATIONS) return false;
  const ok = sameBytes(await derive(password, fromB64(salt), n), fromB64(hash));
  return ok && stored != null;
}

async function hmac(secret: string, data: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
}

/** Sitzung: „<email base64url>.<ablauf unix>.<hmac>“ */
export async function makeSession(secret: string, email: string, now = Date.now()): Promise<string> {
  if (!secret || secret.length < 32) throw new Error('SESSION_SECRET fehlt oder ist zu kurz (mindestens 32 Zeichen)');
  const body = `${toB64url(enc.encode(email))}.${Math.floor(now / 1000) + SESSION_SECONDS}`;
  return `${body}.${toB64url(await hmac(secret, body))}`;
}

/** E-Mail der gültigen Sitzung, sonst null */
export async function readSession(secret: string, token: string | null, now = Date.now()): Promise<string | null> {
  if (!token || !secret || secret.length < 32) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [mail, exp, sig] = parts;
  try {
    if (!sameBytes(await hmac(secret, `${mail}.${exp}`), fromB64url(sig))) return null;
    if (!(Number(exp) * 1000 > now)) return null;
    return new TextDecoder().decode(fromB64url(mail));
  } catch {
    return null;
  }
}

export function getCookie(req: Request, name: string): string | null {
  for (const part of (req.headers.get('cookie') ?? '').split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return v.join('=');
  }
  return null;
}

/** Nur für /api, nicht per JavaScript lesbar, nur über HTTPS, nie von fremden Seiten mitgeschickt */
export const sessionCookie = (token: string) => `${COOKIE}=${token}; Path=/api; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_SECONDS}`;
export const clearCookie = () => `${COOKIE}=; Path=/api; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;

export async function sha256Hex(s: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', enc.encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
