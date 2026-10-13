/* =========================================================================
 *  SPEICHERN & LOGIN – die einzige Stelle, die für die Veröffentlichung
 *  ausgetauscht wird. Seiten, Editor und Design bleiben gleich.
 *
 *  DEMO   (storage: 'demo')   Inhalte, Bilder und Login bleiben in diesem
 *                             Browser (IndexedDB). Nichts verlässt das Gerät.
 *  LIVE   (storage: 'server') Spricht mit einer kleinen PHP-Datei (api.php):
 *                             Inhalt -> content.json, Bilder -> Ordner images/,
 *                             Passwort nur als Hash auf dem Server.
 *
 *  Schnittstelle (beide Varianten identisch):
 *    hint()                -> boolean  lohnt es, den Editor zu laden? (synchron, für jeden Besucher)
 *    loadContent()         -> EditState|null   gespeicherter Stand (null = Original)
 *    saveContent(state)                 speichern
 *    resetContent()                     gespeicherten Stand verwerfen
 *    uploadImage(blob, name) -> path    z. B. "images/uploads/werkstatt-1a2b.webp"
 *    imageUrl(path)        -> url       (synchron) Adresse für <img src>
 *    login(user, pass)     -> boolean
 *    logout()
 *    isLoggedIn()          -> boolean
 *
 *  API-Vertrag für api.php (JSON, Session-Cookie):
 *    POST ?action=login   {user,pass}   -> {ok}
 *    POST ?action=logout                 -> {ok}
 *    GET  ?action=session                -> {loggedIn}
 *    GET  content.json                   -> Inhalt (EditState)
 *    POST ?action=save    {content}      -> {ok}
 *    POST ?action=reset                  -> {ok}
 *    POST ?action=upload  multipart file -> {ok,path}
 *
 *  Format des Inhalts: `texts` hat dasselbe Format wie src/content/texts.json
 *  (Sprache → "schlüssel.mit.punkten" → Text) und kann dort direkt übernommen werden.
 * ========================================================================= */
import type { Lang } from '@/i18n/config';

export const SITE_CONFIG = {
  storage: 'demo' as 'demo' | 'server',
  api: `${import.meta.env.BASE_URL.replace(/\/?$/, '/')}api.php`,
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

export interface EditState {
  v: 1;
  texts: Partial<Record<Lang, Record<string, string>>>;
  lists: Partial<Record<Lang, Record<string, ListOverride>>>;
  /** Foto-Platz (Dateiname ohne Endung, z. B. "hero-workshop") → neues Bild oder ausgeblendet */
  photos: Record<string, { src?: string; hidden?: boolean }>;
}

export const emptyState = (): EditState => ({ v: 1, texts: {}, lists: {}, photos: {} });

export interface SiteStorage {
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

/* =================== DEMO: alles bleibt im Browser =================== */
const urls: Record<string, string> = {};
const DemoStorage: SiteStorage = {
  async init() {
    try {
      const keys = await idb<IDBValidKey[]>('img', 'readonly', (s) => s.getAllKeys());
      for (const k of keys) {
        const blob = await idb<Blob | undefined>('img', 'readonly', (s) => s.get(k));
        if (blob) urls[String(k)] = URL.createObjectURL(blob);
      }
    } catch { /* kein IndexedDB: Original */ }
  },
  hint: () => flag.get(localStorage, 'rp-edit') || flag.get(sessionStorage, 'rp-admin'),
  async loadContent() {
    try { return (await idb<EditState | undefined>('kv', 'readonly', (s) => s.get('content'))) ?? null; } catch { return null; }
  },
  async saveContent(c) {
    const json = JSON.stringify(c);
    await idb('kv', 'readwrite', (s) => s.put(JSON.parse(json), 'content'));
    // nicht mehr verwendete hochgeladene Bilder entfernen
    const keys = await idb<IDBValidKey[]>('img', 'readonly', (s) => s.getAllKeys());
    for (const k of keys) if (!json.includes(String(k))) await idb('img', 'readwrite', (s) => s.delete(k));
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

/* =================== LIVE: kleine PHP-Datei auf dem Webspace =================== */
async function api(action: string, body?: unknown, isForm = false) {
  const opt: RequestInit = { method: body ? 'POST' : 'GET', credentials: 'same-origin' };
  if (body) opt.body = isForm ? (body as FormData) : JSON.stringify(body);
  if (body && !isForm) opt.headers = { 'Content-Type': 'application/json' };
  return (await fetch(`${SITE_CONFIG.api}?action=${action}`, opt)).json();
}
const ServerStorage: SiteStorage = {
  async init() {},
  // ponytail: lädt den Editor für jeden Besucher (die Änderungen liegen auf dem Server); ein Build aus content.json spart das später
  hint: () => true,
  async loadContent() {
    try {
      const r = await fetch(`${import.meta.env.BASE_URL.replace(/\/?$/, '/')}content.json?v=${Date.now()}`, { cache: 'no-store' });
      return r.ok ? r.json() : null;
    } catch { return null; }
  },
  async saveContent(content) { if (!(await api('save', { content })).ok) throw new Error('save'); },
  async resetContent() { await api('reset', {}); },
  async uploadImage(blob, name) {
    const fd = new FormData();
    fd.append('file', blob, name);
    const r = await api('upload', fd, true);
    if (!r.ok) throw new Error('upload');
    return r.path;
  },
  imageUrl: (p) => (!p || /^(data:|blob:|https?:|\/)/.test(p) ? p : import.meta.env.BASE_URL.replace(/\/?$/, '/') + p),
  async login(user, pass) { return !!(await api('login', { user, pass })).ok; },
  async logout() { await api('logout', {}); },
  async isLoggedIn() { try { return !!(await api('session')).loggedIn; } catch { return false; } },
};

export const siteStorage: SiteStorage = SITE_CONFIG.storage === 'server' ? ServerStorage : DemoStorage;
