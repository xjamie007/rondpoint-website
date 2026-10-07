/**
 * Minimaler GitHub-Client für das Dashboard (nur fetch, keine Abhängigkeiten).
 * Speichern = ein Commit mit allen Änderungen über die Git-Data-API, direkt auf den
 * Branch, den der Pages-Workflow veröffentlicht. Wenn inzwischen ein anderer Commit
 * kam (z. B. der tägliche Bestand-Abgleich), wird auf dem neuen Stand neu aufgesetzt.
 */
const API = 'https://api.github.com';

export class GitHubError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export interface FileChange {
  path: string;
  /** Textinhalt (UTF-8) */
  text?: string;
  /** Binärinhalt als Base64 */
  base64?: string;
  delete?: boolean;
}

export interface RunInfo {
  status: string;
  conclusion: string | null;
  createdAt: string;
  url: string;
  event: string;
}

const utf8ToBase64 = (s: string) => {
  const bytes = new TextEncoder().encode(s);
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
};
const base64ToUtf8 = (b64: string) => new TextDecoder().decode(Uint8Array.from(atob(b64.replace(/\s/g, '')), (c) => c.charCodeAt(0)));

export class GitHub {
  constructor(
    private token: string,
    public repo: string,
    public branch: string,
    private fetchImpl: typeof fetch = (...a) => fetch(...a),
  ) {}

  private async req<T>(path: string, init: RequestInit = {}): Promise<T> {
    const res = await this.fetchImpl(`${API}${path}`, {
      ...init,
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${this.token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        ...(init.body ? { 'Content-Type': 'application/json' } : {}),
        ...(init.headers ?? {}),
      },
    });
    if (!res.ok) {
      let msg = res.statusText;
      try {
        msg = ((await res.json()) as { message?: string }).message ?? msg;
      } catch {}
      throw new GitHubError(res.status, msg);
    }
    return (res.status === 204 ? null : await res.json()) as T;
  }

  /** Prüft den Schlüssel: Zugriff auf das Repository und Schreibrecht */
  async check(): Promise<{ canPush: boolean }> {
    const r = await this.req<{ permissions?: { push?: boolean } }>(`/repos/${this.repo}`);
    return { canPush: r.permissions?.push !== false };
  }

  /** Textdatei lesen; null, wenn es sie nicht gibt */
  async readText(path: string): Promise<{ text: string; sha: string } | null> {
    try {
      const r = await this.req<{ content: string; sha: string; encoding: string }>(
        `/repos/${this.repo}/contents/${encodeURI(path)}?ref=${encodeURIComponent(this.branch)}`,
      );
      return { text: base64ToUtf8(r.content), sha: r.sha };
    } catch (e) {
      if (e instanceof GitHubError && e.status === 404) return null;
      throw e;
    }
  }

  /** Ordner auflisten; leer, wenn es ihn nicht gibt */
  async listDir(path: string): Promise<{ name: string; path: string; type: 'file' | 'dir'; sha: string }[]> {
    try {
      return await this.req(`/repos/${this.repo}/contents/${encodeURI(path)}?ref=${encodeURIComponent(this.branch)}`);
    } catch (e) {
      if (e instanceof GitHubError && e.status === 404) return [];
      throw e;
    }
  }

  /** Alle Änderungen als ein Commit. Gibt die neue Commit-SHA zurück. */
  async commit(files: FileChange[], message: string): Promise<string> {
    if (!files.length) throw new Error('Keine Änderungen');
    const blobs = new Map<string, string>();
    for (const f of files) {
      if (f.delete) continue;
      const b = await this.req<{ sha: string }>(`/repos/${this.repo}/git/blobs`, {
        method: 'POST',
        body: JSON.stringify(f.base64 != null ? { content: f.base64, encoding: 'base64' } : { content: utf8ToBase64(f.text ?? ''), encoding: 'base64' }),
      });
      blobs.set(f.path, b.sha);
    }
    for (let attempt = 0; attempt < 4; attempt++) {
      const ref = await this.req<{ object: { sha: string } }>(`/repos/${this.repo}/git/ref/heads/${encodeURIComponent(this.branch)}`);
      const head = ref.object.sha;
      const commit = await this.req<{ tree: { sha: string } }>(`/repos/${this.repo}/git/commits/${head}`);
      const tree = await this.req<{ sha: string }>(`/repos/${this.repo}/git/trees`, {
        method: 'POST',
        body: JSON.stringify({
          base_tree: commit.tree.sha,
          tree: files.map((f) => ({ path: f.path, mode: '100644', type: 'blob', sha: f.delete ? null : blobs.get(f.path) })),
        }),
      });
      const created = await this.req<{ sha: string }>(`/repos/${this.repo}/git/commits`, {
        method: 'POST',
        body: JSON.stringify({ message, tree: tree.sha, parents: [head] }),
      });
      try {
        await this.req(`/repos/${this.repo}/git/refs/heads/${encodeURIComponent(this.branch)}`, {
          method: 'PATCH',
          body: JSON.stringify({ sha: created.sha, force: false }),
        });
        return created.sha;
      } catch (e) {
        // jemand anderes hat inzwischen gespeichert: auf dem neuen Stand wiederholen
        if (e instanceof GitHubError && e.status === 422 && attempt < 3) continue;
        throw e;
      }
    }
    throw new Error('Speichern nicht möglich');
  }

  /** Letzter Lauf des Veröffentlichungs-Workflows (braucht das Recht „Actions: lesen“) */
  async latestRun(): Promise<RunInfo | null> {
    try {
      const r = await this.req<{ workflow_runs: { status: string; conclusion: string | null; created_at: string; html_url: string; event: string }[] }>(
        `/repos/${this.repo}/actions/runs?branch=${encodeURIComponent(this.branch)}&per_page=1`,
      );
      const w = r.workflow_runs[0];
      return w ? { status: w.status, conclusion: w.conclusion, createdAt: w.created_at, url: w.html_url, event: w.event } : null;
    } catch {
      return null;
    }
  }
}
