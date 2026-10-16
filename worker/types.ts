/** Die Teile der Cloudflare-Laufzeit, die der Worker nutzt (ohne @cloudflare/workers-types). */
export interface D1Result<T = Record<string, unknown>> {
  results: T[];
  success: boolean;
}
export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  run(): Promise<D1Result>;
}
export interface D1Database {
  prepare(sql: string): D1PreparedStatement;
  batch(statements: D1PreparedStatement[]): Promise<D1Result[]>;
}
export interface Fetcher {
  fetch(request: Request): Promise<Response>;
}
export interface Ctx {
  waitUntil(promise: Promise<unknown>): void;
}

export interface Ai {
  run(model: string, input: Record<string, unknown>): Promise<unknown>;
}

export interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  /** Workers AI (Übersetzung im Admin-Bereich) */
  AI?: Ai;
  /** zufälliger Wert (wrangler secret put SESSION_SECRET), signiert die Anmelde-Cookies */
  SESSION_SECRET: string;
  /** Fine-grained Token: nur dieses Repository, „Contents: Read and write“ */
  GITHUB_TOKEN: string;
  GITHUB_REPO: string;
  GITHUB_BRANCH?: string;
  GITHUB_API?: string;
  // Formulare (optional, alle per wrangler secret put)
  FORM_RECIPIENT?: string;
  MAIL_PROVIDER?: string;
  MAIL_API_KEY?: string;
  MAIL_FROM?: string;
  SCALEWAY_PROJECT_ID?: string;
  IP_HASH_SALT?: string;
  RATE_LIMIT?: string;
}
