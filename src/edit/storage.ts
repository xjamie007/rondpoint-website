/* =========================================================================
 *  SPEICHERN & LOGIN – die einzige Stelle, die für die Veröffentlichung
 *  ausgetauscht wird. Seiten, Editor und Design bleiben gleich.
 *
 *  DEMO      (ohne Supabase)  Inhalte, Bilder und Login bleiben in diesem
 *                             Browser (IndexedDB). Nichts verlässt das Gerät.
 *  SUPABASE  (PUBLIC_SUPABASE_URL und PUBLIC_SUPABASE_ANON_KEY beim Build gesetzt)
 *                             Anmeldung mit E-Mail und Passwort (Supabase Auth).
 *                             Speichern = die Edge Function `publish` schreibt die
 *                             Änderungen als Commit ins Repository; GitHub baut die
 *                             Seite neu, nach wenigen Minuten sehen sie alle.
 *                             Bis dahin zeigt dieser Browser den gespeicherten Stand.
 *
 *  Schnittstelle (beide Varianten identisch):
 *    hint()                -> boolean  lohnt es, den Editor zu laden? (synchron, für jeden Besucher)
 *    loadContent()         -> EditState|null   gespeicherter, noch nicht sichtbarer Stand
 *    saveContent(state)                 speichern (Supabase: veröffentlichen)
 *    resetContent()                     gespeicherten Stand verwerfen (nur Demo)
 *    uploadImage(blob, name) -> path    Demo „images/uploads/…“, Supabase „upload/<sha>.<endung>“
 *    imageUrl(path)        -> url       (synchron) Adresse für <img src>
 *    login(user, pass)     -> boolean
 *    logout()
 *    isLoggedIn()          -> boolean
 *
 *  Format des Inhalts: supabase/functions/publish/convert.ts (EditState).
 * ========================================================================= */
import type { EditState } from '../../supabase/functions/publish/convert';

export type { EditState };

const SB_URL = (import.meta.env.PUBLIC_SUPABASE_URL as string | undefined)?.replace(/\/$/, '') ?? '';
const SB_KEY = (import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined) ?? '';

export const SITE_CONFIG = {
  storage: (SB_URL && SB_KEY ? 'supabase' : 'demo') as 'demo' | 'supabase',
  // Demo-Zugang (nur Demo!). Gespeichert ist nur der SHA-256-Hash des Passworts.
  demoUser: 'rondpoint',
  demoPassHash: 'f89e2ec568c1908a086b38d5137666acd071644c9992dafe364b2ef8d13181c2',
};

export interface ListOverride {
  /** neue Einträge der Liste, im Format des Grundtexts (Text oder Objekt) */
  value: unknown[];
  /** je Eintrag: aus welchem Original-Eintrag er hervorgeht (für die Darstellung) */
  from: number[];
}

export const emptyState = (): EditState => ({ v: 1, texts: {}, lists: {}, photos: {} });

export interface SiteStorage {
  /** true: Speichern veröffentlicht für alle Besucher (Supabase) */
  live: boolean;
  /** Beschriftung des ersten Login-Felds */
  userLabel: string;
  init(): Promise<void>;
  hint(): boolean;
  loadContent(): Promise<EditState | null>;
  saveContent(c: EditState): Promise<void>;
  resetContent(): Promise<void>;
  uploadImage(blob: Blob, name: string): Promise<string>;
  imageUrl(path: string): string;
  login(user: string, pass: string): Promise<boolean>;
  logout(): Promise<void>;
  isLoggedIn(): Promise<boolean>;
}

async function sha256(s: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/* ---------- kleine Hilfen: IndexedDB und Sitzung, beides darf fehlen (privates Fenster) ---------- */
let dbp: Promise<IDBDatabase> | null = null;
function db(): Promise<IDBDatabase> {
  return (dbp ??= new Promise((res, rej) => {
    const r = indexedDB.open('rondpoint-demo', 1);
    r.onupgradeneeded = () => {
      r.result.createObjectStore('kv');
      r.result.createObjectStore('img');
    };
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  }));
}
async function idb<T>(store: string, mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest | void): Promise<T> {
  const tx = (await db()).transaction(store, mode);
  const req = fn(tx.objectStore(store));
  return new Promise((res, rej) => {
    tx.oncomplete = () => res((req ? req.result : undefined) as T);
    tx.onerror = () => rej(tx.error);
  });
}
const flag = {
  get: (s: Storage, k: string) => { try { return s.getItem(k) === '1'; } catch { return false; } },
  set: (s: Storage, k: string, on: boolean) => { try { on ? s.setItem(k, '1') : s.removeItem(k); } catch { /* ohne Speicher: nur diese Seite */ } },
};
const local = {
  get: <T>(k: string): T | null => { try { return JSON.parse(localStorage.getItem(k) ?? 'null'); } catch { return null; } },
  set: (k: string, v: unknown) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, JSON.stringify(v)); } catch { /* ohne Speicher */ } },
};

/** Hochgeladene Bilder (Vorschau) aus IndexedDB, als Objekt-URL */
const urls: Record<string, string> = {};
async function loadImages() {
  try {
    const keys = await idb<IDBValidKey[]>('img', 'readonly', (s) => s.getAllKeys());
    for (const k of keys) {
      const blob = await idb<Blob | undefined>('img', 'readonly', (s) => s.get(k));
      if (blob) urls[String(k)] = URL.createObjectURL(blob);
    }
  } catch { /* kein IndexedDB: Original */ }
}
async function keepImage(path: string, blob: Blob) {
  try { await idb('img', 'readwrite', (s) => s.put(blob, path)); } catch { /* nur für diese Sitzung */ }
  urls[path] = URL.createObjectURL(blob);
}
/** nicht mehr verwendete Bilder entfernen */
async function pruneImages(json: string) {
  try {
    const keys = await idb<IDBValidKey[]>('img', 'readonly', (s) => s.getAllKeys());
    for (const k of keys) if (!json.includes(String(k))) await idb('img', 'readwrite', (s) => s.delete(k));
  } catch { /* egal */ }
}

/* =================== DEMO: alles bleibt im Browser =================== */
const DemoStorage: SiteStorage = {
  live: false,
  userLabel: 'Benutzername',
  init: loadImages,
  hint: () => flag.get(localStorage, 'rp-edit') || flag.get(sessionStorage, 'rp-admin'),
  async loadContent() {
    try { return (await idb<EditState | undefined>('kv', 'readonly', (s) => s.get('content'))) ?? null; } catch { return null; }
  },
  async saveContent(c) {
    const json = JSON.stringify(c);
    await idb('kv', 'readwrite', (s) => s.put(JSON.parse(json), 'content'));
    await pruneImages(json);
    flag.set(localStorage, 'rp-edit', true);
  },
  async resetContent() {
    await idb('kv', 'readwrite', (s) => s.delete('content'));
    await idb('img', 'readwrite', (s) => s.clear());
    flag.set(localStorage, 'rp-edit', false);
  },
  async uploadImage(blob, name) {
    const path = `images/uploads/${name}`;
    await idb('img', 'readwrite', (s) => s.put(blob, path));
    urls[path] = URL.createObjectURL(blob);
    return path;
  },
  imageUrl: (p) => urls[p] ?? p,
  async login(user, pass) {
    const ok = user.trim().toLowerCase() === SITE_CONFIG.demoUser && (await sha256(pass)) === SITE_CONFIG.demoPassHash;
    if (ok) flag.set(sessionStorage, 'rp-admin', true);
    return ok;
  },
  async logout() { flag.set(sessionStorage, 'rp-admin', false); },
  async isLoggedIn() { return flag.get(sessionStorage, 'rp-admin'); },
};

/* =================== SUPABASE: Anmeldung + Veröffentlichen über die Edge Function =================== */
const SESSION = 'rp-session';
const PENDING = 'rp-pending';
interface Session { access_token: string; refresh_token: string; expires_at: number; email: string }
interface Pending { state: EditState; at: string }

async function authCall(path: string, body: unknown, token?: string): Promise<Record<string, unknown>> {
  const r = await fetch(`${SB_URL}/auth/v1/${path}`, {
    method: 'POST',
    headers: { apikey: SB_KEY, 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(body ?? {}),
  });
  const j = r.status === 204 ? {} : await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(String(j.error_description ?? j.msg ?? j.message ?? r.status));
  return j;
}
function keepSession(j: Record<string, unknown>): Session {
  const s: Session = {
    access_token: String(j.access_token),
    refresh_token: String(j.refresh_token),
    expires_at: Number(j.expires_at) || Math.floor(Date.now() / 1000) + Number(j.expires_in ?? 3600),
    email: String((j.user as { email?: string } | undefined)?.email ?? ''),
  };
  local.set(SESSION, s);
  return s;
}
/** Gültiger Zugangsschlüssel, bei Bedarf erneuert */
async function accessToken(): Promise<string> {
  const s = local.get<Session>(SESSION);
  if (!s) throw new Error('Bitte erneut anmelden.');
  if (s.expires_at * 1000 - Date.now() > 60_000) return s.access_token;
  try {
    return keepSession(await authCall('token?grant_type=refresh_token', { refresh_token: s.refresh_token })).access_token;
  } catch {
    local.set(SESSION, null);
    throw new Error('Die Anmeldung ist abgelaufen. Bitte erneut anmelden.');
  }
}
async function publishCall(body: unknown): Promise<Record<string, unknown>> {
  const r = await fetch(`${SB_URL}/functions/v1/publish`, {
    method: 'POST',
    headers: { apikey: SB_KEY, Authorization: `Bearer ${await accessToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.ok) throw new Error(String(j.error ?? `Fehler ${r.status}`));
  return j;
}
function toBase64(blob: Blob): Promise<string> {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(String(fr.result).split(',')[1]);
    fr.onerror = () => rej(fr.error);
    fr.readAsDataURL(blob);
  });
}
/** Commit-Zeit, aus der diese Seite gebaut wurde (meta rp-build) */
const builtAt = () => Date.parse(document.querySelector<HTMLMetaElement>('meta[name=rp-build]')?.content ?? '') || 0;

const SupabaseStorage: SiteStorage = {
  live: true,
  userLabel: 'E-Mail',
  init: loadImages,
  hint: () => !!local.get(SESSION) || !!local.get(PENDING),
  async loadContent() {
    const p = local.get<Pending>(PENDING);
    if (!p) return null;
    // schon veröffentlicht: die Seite zeigt den Stand selbst
    if (builtAt() >= Date.parse(p.at)) {
      local.set(PENDING, null);
      return null;
    }
    return p.state;
  },
  async saveContent(state) {
    const r = await publishCall({ action: 'publish', state });
    local.set(PENDING, { state, at: String(r.committedAt ?? new Date().toISOString()) } satisfies Pending);
    await pruneImages(JSON.stringify(state));
  },
  async resetContent() { /* veröffentlichte Änderungen bleiben; ungespeicherte verwirft der Editor */ },
  async uploadImage(blob) {
    const ext = blob.type === 'image/webp' ? 'webp' : blob.type === 'image/png' ? 'png' : 'jpg';
    const r = await publishCall({ action: 'blob', ext, data: await toBase64(blob) });
    const path = `upload/${r.sha}.${ext}`;
    await keepImage(path, blob);
    return path;
  },
  imageUrl: (p) => urls[p] ?? p,
  async login(user, pass) {
    try {
      keepSession(await authCall('token?grant_type=password', { email: user.trim(), password: pass }));
      return true;
    } catch {
      return false;
    }
  },
  async logout() {
    const s = local.get<Session>(SESSION);
    local.set(SESSION, null);
    if (s) await authCall('logout', {}, s.access_token).catch(() => {});
  },
  async isLoggedIn() {
    try { return !!(await accessToken()); } catch { return false; }
  },
};

export const siteStorage: SiteStorage = SITE_CONFIG.storage === 'supabase' ? SupabaseStorage : DemoStorage;
