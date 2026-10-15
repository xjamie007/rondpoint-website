/**
 * Edge Function `publish`: Speichern aus dem Admin-Bereich auf der Seite.
 *
 *  1. Anmeldung prüfen (Supabase Auth, Zugang über das Supabase-Dashboard angelegt),
 *     optional nur E-Mails aus ADMIN_EMAILS
 *  2. action "blob":    Foto als Git-Blob zu GitHub hochladen → { sha }
 *     action "publish": Inhalt prüfen, in Dateien umwandeln (convert.ts) und als EIN Commit
 *                       auf den Branch schreiben → GitHub Actions baut und veröffentlicht
 *  3. Protokoll in der Tabelle admin_changes (wer, wann, was), wenn vorhanden
 *
 * Ohne Deno-Abhängigkeiten, damit die Tests (Vitest) dieselbe Logik prüfen. Der GitHub-Teil
 * (makeGit) dient auch dem Cloudflare Worker (worker/index.ts).
 */
import { ContentError, toFiles, type EditState, type FileChange, type RepoSnapshot } from './convert.ts';

export interface GitEnv {
  /** Fine-grained Token: nur dieses Repository, „Contents: Read and write“ */
  GITHUB_TOKEN: string;
  /** z. B. xjamie007/rondpoint-website */
  GITHUB_REPO: string;
  GITHUB_BRANCH?: string;
  /** nur für Tests: andere Adresse der GitHub-API */
  GITHUB_API?: string;
}

export interface Env extends GitEnv {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  /** kommagetrennt, Pflicht: nur diese Konten dürfen speichern (ohne Liste speichert niemand) */
  ADMIN_EMAILS?: string;
  /** kommagetrennt, z. B. https://www.rondpoint.lu,https://xjamie007.github.io */
  ALLOWED_ORIGINS?: string;
}

const MAX_IMAGE = 10 * 1024 * 1024;
const WATCH = ['src/assets/photos/', 'src/assets/flotte/', 'src/content/flotte/'];

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function cors(req: Request, env: Env): Record<string, string> {
  const origin = req.headers.get('origin');
  const allowed = (env.ALLOWED_ORIGINS ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!origin || !allowed.includes(origin)) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

const b64 = (s: string) => {
  const bin = atob(s.slice(0, 32));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
};
const b64Size = (s: string) => Math.floor((s.length * 3) / 4) - (s.endsWith('==') ? 2 : s.endsWith('=') ? 1 : 0);

/** Dateityp an den ersten Bytes erkennen – nur echte Bilder */
export function imageKind(base64: string): 'webp' | 'jpg' | 'png' | null {
  if (!/^[A-Za-z0-9+/]+=*$/.test(base64)) return null;
  const h = b64(base64);
  if (h[0] === 0xff && h[1] === 0xd8 && h[2] === 0xff) return 'jpg';
  if (h[0] === 0x89 && h[1] === 0x50 && h[2] === 0x4e && h[3] === 0x47) return 'png';
  if (String.fromCharCode(...h.slice(0, 4)) === 'RIFF' && String.fromCharCode(...h.slice(8, 12)) === 'WEBP') return 'webp';
  return null;
}

/** Fotos hochladen und Änderungen als einen Commit schreiben (Supabase und Cloudflare) */
export function makeGit(env: GitEnv, f: typeof fetch = fetch) {
  const branch = env.GITHUB_BRANCH || 'main';
  const api = (env.GITHUB_API || 'https://api.github.com').replace(/\/$/, '');
  const gh = async <T>(path: string, init: RequestInit = {}): Promise<T> => {
    const r = await f(`${api}/repos/${env.GITHUB_REPO}${path}`, {
      ...init,
      headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${env.GITHUB_TOKEN}`, 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'rondpoint-editor', ...(init.body ? { 'Content-Type': 'application/json' } : {}) },
    });
    if (!r.ok) {
      const m = await r.json().catch(() => ({}));
      throw new HttpError(r.status === 422 ? 409 : 502, `GitHub ${r.status}: ${(m as { message?: string }).message ?? r.statusText}`);
    }
    return (await r.json()) as T;
  };
  const readJson = async (path: string, ref: string): Promise<Record<string, unknown>> => {
    const r = await f(`${api}/repos/${env.GITHUB_REPO}/contents/${path}?ref=${ref}`, {
      headers: { Accept: 'application/vnd.github.raw+json', Authorization: `Bearer ${env.GITHUB_TOKEN}`, 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'rondpoint-editor' },
    });
    if (r.status === 404) return {};
    if (!r.ok) throw new HttpError(502, `GitHub ${r.status} beim Lesen von ${path}`);
    return JSON.parse(await r.text());
  };

  async function blob(body: { data?: unknown; ext?: unknown }) {
    const data = typeof body.data === 'string' ? body.data : '';
    if (!data || b64Size(data) > MAX_IMAGE) throw new HttpError(413, 'Das Bild ist zu groß (höchstens 10 MB).');
    const kind = imageKind(data);
    if (!kind || kind !== body.ext) throw new HttpError(400, 'Nur JPG-, PNG- oder WebP-Bilder.');
    const r = await gh<{ sha: string }>('/git/blobs', { method: 'POST', body: JSON.stringify({ content: data, encoding: 'base64' }) });
    return { sha: r.sha };
  }

  async function publish(state: EditState) {
    for (let attempt = 0; attempt < 4; attempt++) {
      const ref = await gh<{ object: { sha: string } }>(`/git/ref/heads/${branch}`);
      const head = ref.object.sha;
      const commit = await gh<{ tree: { sha: string }; committer: { date: string } }>(`/git/commits/${head}`);
      const tree = await gh<{ tree: { path: string; type: string }[]; truncated: boolean }>(`/git/trees/${commit.tree.sha}?recursive=1`);
      const [texts, lists, photos, horaires] = await Promise.all(
        ['texts', 'lists', 'photos', 'horaires'].map((n) => readJson(`src/content/${n}.json`, head)),
      );
      const repo: RepoSnapshot = {
        texts, lists, photos, horaires,
        files: tree.tree.filter((e) => e.type === 'blob' && WATCH.some((w) => e.path.startsWith(w))).map((e) => e.path),
      };
      const { files, summary } = toFiles(state, repo);
      if (!files.length) return { sha: head, committedAt: commit.committer.date, summary: [] as string[] };
      const newTree = await gh<{ sha: string }>('/git/trees', {
        method: 'POST',
        body: JSON.stringify({
          base_tree: commit.tree.sha,
          tree: files.map((x: FileChange) =>
            x.delete ? { path: x.path, mode: '100644', type: 'blob', sha: null }
            : x.blob ? { path: x.path, mode: '100644', type: 'blob', sha: x.blob }
            : { path: x.path, mode: '100644', type: 'blob', content: x.text }),
        }),
      });
      if (newTree.sha === commit.tree.sha) return { sha: head, committedAt: commit.committer.date, summary: [] as string[] };
      const created = await gh<{ sha: string; committer: { date: string } }>('/git/commits', {
        method: 'POST',
        body: JSON.stringify({ message: `Website-Editor: ${summary.join(', ')}`, tree: newTree.sha, parents: [head] }),
      });
      try {
        await gh(`/git/refs/heads/${branch}`, { method: 'PATCH', body: JSON.stringify({ sha: created.sha, force: false }) });
        return { sha: created.sha, committedAt: created.committer.date, summary };
      } catch (e) {
        // inzwischen kam ein anderer Commit (z. B. der Bestand-Abgleich): auf dem neuen Stand wiederholen
        if (e instanceof HttpError && e.status === 409 && attempt < 3) continue;
        throw e;
      }
    }
    throw new HttpError(409, 'Speichern gerade nicht möglich, bitte gleich noch einmal.');
  }

  return { blob, publish };
}

export function makeHandler(env: Env, f: typeof fetch = fetch) {
  const { blob, publish } = makeGit(env, f);

  async function user(req: Request): Promise<string> {
    const auth = req.headers.get('authorization') ?? '';
    if (!/^Bearer\s+\S+/.test(auth)) throw new HttpError(401, 'Bitte anmelden.');
    // Schlüssel des Browsers weiterreichen (gilt auch für die neuen „publishable“ Schlüssel)
    const apikey = req.headers.get('apikey') || env.SUPABASE_ANON_KEY;
    const r = await f(`${env.SUPABASE_URL}/auth/v1/user`, { headers: { apikey, Authorization: auth } });
    if (!r.ok) throw new HttpError(401, 'Die Anmeldung ist abgelaufen. Bitte erneut anmelden.');
    const email = String(((await r.json()) as { email?: string }).email ?? '').toLowerCase();
    // Ohne Liste darf niemand speichern: sonst könnte sich jeder selbst ein Konto anlegen und veröffentlichen
    const allowed = (env.ADMIN_EMAILS ?? '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
    if (!allowed.length) throw new HttpError(403, 'ADMIN_EMAILS ist nicht gesetzt – Speichern ist gesperrt.');
    if (!email || !allowed.includes(email)) throw new HttpError(403, 'Dieses Konto darf die Website nicht bearbeiten.');
    return email;
  }

  async function log(email: string, summary: string[], sha: string) {
    const key = env.SUPABASE_SERVICE_ROLE_KEY;
    if (!key || !summary.length) return;
    // alter Service-Role-Schlüssel (JWT) auch als Bearer, neue „sb_secret_…“-Schlüssel nur als apikey
    const auth: Record<string, string> = key.startsWith('eyJ') ? { Authorization: `Bearer ${key}` } : {};
    await f(`${env.SUPABASE_URL}/rest/v1/admin_changes`, {
      method: 'POST',
      headers: { apikey: key, ...auth, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify({ user_email: email, summary: summary.join(', '), commit_sha: sha }),
    }).catch(() => {});
  }

  return async function handle(req: Request): Promise<Response> {
    const h = cors(req, env);
    const reply = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: { ...h, 'Content-Type': 'application/json; charset=utf-8' } });
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: h });
    if (req.method !== 'POST') return reply(405, { ok: false, error: 'Nur POST' });
    try {
      const email = await user(req);
      const body = (await req.json().catch(() => null)) as { action?: string; state?: EditState; data?: unknown; ext?: unknown } | null;
      if (!body) throw new HttpError(400, 'Ungültige Anfrage');
      if (body.action === 'blob') return reply(200, { ok: true, ...(await blob(body)) });
      if (body.action === 'publish') {
        const r = await publish(body.state as EditState);
        await log(email, r.summary, r.sha);
        return reply(200, { ok: true, ...r });
      }
      throw new HttpError(400, 'Unbekannte Aktion');
    } catch (e) {
      if (e instanceof ContentError) return reply(422, { ok: false, error: e.message });
      if (e instanceof HttpError) return reply(e.status, { ok: false, error: e.message });
      console.error(e);
      return reply(500, { ok: false, error: 'Interner Fehler' });
    }
  };
}
