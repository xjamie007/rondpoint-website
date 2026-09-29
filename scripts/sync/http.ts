/**
 * Höflicher HTTP-Client für den Bestand-Abgleich (T2.3).
 * - eigener, ehrlicher User-Agent, keine Browser-Kennung
 * - 2 Sekunden zwischen Anfragen, höchstens 80 Anfragen pro Lauf
 * - Timeout 20 s, zwei Wiederholungen mit wachsendem Abstand
 * - 403, 429 oder eine Bot-Abfrage beenden die Quelle für diesen Lauf.
 *   Es wird nichts umgangen.
 */
import { isAllowed } from './robots.ts';

export const USER_AGENT = 'RondPointStockSync/1.0 (+https://www.rondpoint.lu/fr/contact/)';
export const ROBOTS_TOKEN = 'RondPointStockSync';

export class RobotsError extends Error {
  readonly url: string;
  constructor(url: string) {
    super(`robots.txt erlaubt ${url} nicht`);
    this.name = 'BlockedError';
    this.url = url;
  }
}

export class BlockedError extends Error {
  readonly url: string;
  constructor(message: string, url: string) {
    super(message);
    this.name = 'BlockedError';
    this.url = url;
  }
}

export class BudgetError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BudgetError';
  }
}

export interface HttpOptions {
  delayMs?: number;
  maxRequests?: number;
  timeoutMs?: number;
  retries?: number;
  log?: (msg: string) => void;
}

const CHALLENGE_MARKERS = [
  /captcha/i,
  /cf-challenge|cf_chl_|challenge-platform/i,
  /Just a moment\.\.\./i,
  /Access denied|Request unsuccessful\. Incapsula/i,
  /datadome/i,
  /px-captcha|perimeterx/i,
];

export function looksLikeChallenge(status: number, body: string): boolean {
  if (status === 403 || status === 429) return true;
  // Nur kurze Seiten prüfen: echte Inseratsseiten erwähnen „captcha" teils in Skripten.
  if (body.length < 40_000) return CHALLENGE_MARKERS.some((re) => re.test(body));
  return false;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Schnittstelle, die Adapter benutzen – im Test durch einen Fixture-Client ersetzt. */
export interface HttpClient {
  readonly requestCount: number;
  readonly remaining: number;
  loadRobots(origin: string): Promise<void>;
  getText(url: string): Promise<{ status: number; body: string }>;
}

export class PoliteClient implements HttpClient {
  private last = 0;
  private count = 0;
  private readonly delayMs: number;
  private readonly maxRequests: number;
  private readonly timeoutMs: number;
  private readonly retries: number;
  private readonly log: (msg: string) => void;

  constructor(opts: HttpOptions = {}) {
    this.delayMs = opts.delayMs ?? 2000;
    this.maxRequests = opts.maxRequests ?? 80;
    this.timeoutMs = opts.timeoutMs ?? 20_000;
    this.retries = opts.retries ?? 2;
    this.log = opts.log ?? (() => {});
  }

  get requestCount(): number {
    return this.count;
  }

  get remaining(): number {
    return this.maxRequests - this.count;
  }

  private readonly robots = new Map<string, string>();

  /** Lädt die robots.txt einer Quelle. Ohne sie wird die Quelle nicht angefragt. */
  async loadRobots(origin: string): Promise<void> {
    const res = await this.fetchRaw(`${origin}/robots.txt`);
    // 4xx: keine robots.txt → alles erlaubt (RFC 9309). 5xx: als „alles verboten" behandeln.
    if (res.status >= 500) throw new RobotsError(`${origin}/robots.txt (HTTP ${res.status})`);
    this.robots.set(origin, res.status === 200 ? res.body : '');
  }

  async getText(url: string): Promise<{ status: number; body: string }> {
    const u = new URL(url);
    const txt = this.robots.get(u.origin);
    if (txt === undefined) throw new RobotsError(`${url} (robots.txt nicht geladen)`);
    if (!isAllowed(txt, ROBOTS_TOKEN, u.pathname + u.search)) throw new RobotsError(url);
    return this.fetchRaw(url);
  }

  private async fetchRaw(url: string): Promise<{ status: number; body: string }> {
    let attempt = 0;
    for (;;) {
      if (this.count >= this.maxRequests) {
        throw new BudgetError(`Anfrage-Budget von ${this.maxRequests} erreicht (${url})`);
      }
      const wait = this.last + this.delayMs - Date.now();
      if (wait > 0) await sleep(wait);
      this.last = Date.now();
      this.count++;
      try {
        const res = await fetch(url, {
          headers: {
            'User-Agent': USER_AGENT,
            Accept: 'text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.8',
            'Accept-Language': 'fr-LU,fr;q=0.9',
          },
          redirect: 'follow',
          signal: AbortSignal.timeout(this.timeoutMs),
        });
        const body = await res.text();
        if (looksLikeChallenge(res.status, body)) {
          throw new BlockedError(`Quelle blockiert oder fragt nach einer Bot-Prüfung (HTTP ${res.status})`, url);
        }
        if (res.status >= 500 && attempt < this.retries) {
          attempt++;
          this.log(`HTTP ${res.status} bei ${url}, Wiederholung ${attempt}`);
          await sleep(this.delayMs * 2 ** attempt);
          continue;
        }
        return { status: res.status, body };
      } catch (err) {
        if (err instanceof BlockedError) throw err;
        if (attempt < this.retries) {
          attempt++;
          this.log(`Netzwerkfehler bei ${url} (${(err as Error).message}), Wiederholung ${attempt}`);
          await sleep(this.delayMs * 2 ** attempt);
          continue;
        }
        throw err;
      }
    }
  }
}
