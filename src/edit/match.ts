/**
 * Seiten-Editor, reine Hilfen ohne DOM (getestet in tests/edit.test.ts):
 * sichtbaren Text einer Seite dem Textschlüssel in src/i18n/*.ts zuordnen
 * und geänderte Texte wieder als HTML ausgeben, ohne Platzhalter und Links zu verlieren.
 */
import { escapeHtml } from '@/i18n';

export type Flat = Record<string, string>;

export function flatten(o: unknown, pre = '', out: Flat = {}): Flat {
  if (typeof o === 'string') out[pre] = o;
  else if (Array.isArray(o)) o.forEach((v, i) => flatten(v, `${pre}.${i}`, out));
  else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) flatten(v, pre ? `${pre}.${k}` : k, out);
  return out;
}

/** Interne Platzhalter „[FEHLT — …]“ samt Leerzeichen davor weg, wie rich() in der Präsentation. */
const stripOpenPoints = (s: string) => s.replace(/\s*\[(FEHLT|UNBESTÄTIGT)(?:\s*[—–-]\s*[^\]]*)?\]/g, '');

/** Weiche Trennstriche weg, alle Leerzeichenarten (auch geschützte) zu einem. */
export const norm = (s: string) => s.replace(/­/g, '').replace(/\s+/g, ' ').trim();

export type Tok = { t: 'text'; v: string } | { t: 'var'; k: string } | { t: 'link'; text: string; to: string };
const TOK = /\{(\w+)\}|\[([^\]]+)\]\(([^)\s]+)\)/g;

export function tokens(s: string): Tok[] {
  const out: Tok[] = [];
  let last = 0;
  for (const m of s.matchAll(TOK)) {
    if (m.index > last) out.push({ t: 'text', v: s.slice(last, m.index) });
    out.push(m[1] ? { t: 'var', k: m[1] } : { t: 'link', text: m[2], to: m[3] });
    last = m.index + m[0].length;
  }
  if (last < s.length) out.push({ t: 'text', v: s.slice(last) });
  return out;
}

/** Enthält {platzhalter} oder [Link](ziel) → wird im Fenster bearbeitet, nicht direkt im Text. */
export const isRich = (s: string) => tokens(s).some((t) => t.t !== 'text');

/** So steht der Text sichtbar auf der Seite (Links nur als Wort, Platzhalter-Markierungen weg). */
export function displayText(s: string): string {
  return norm(stripOpenPoints(tokens(s).map((t) => (t.t === 'text' ? t.v : t.t === 'link' ? t.text : `{${t.k}}`)).join('')));
}

const reEsc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Index aller Texte einer Sprache: sichtbarer Text → Schlüssel. */
export function buildIndex(dict: Flat) {
  const exact = new Map<string, string[]>();
  const patterns: { key: string; re: RegExp }[] = [];
  for (const [key, v] of Object.entries(dict)) {
    const d = displayText(v);
    if (!d) continue;
    if (!tokens(v).some((t) => t.t === 'var')) {
      exact.set(d, [...(exact.get(d) ?? []), key]);
      continue;
    }
    // Platzhalter: genug fester Text drumherum, sonst passt das Muster auf alles
    const fixed = d.replace(/\{\w+\}/g, '');
    if (fixed.replace(/[\s.,:;–—-]/g, '').length < 4) continue;
    const src = d.split(/\{\w+\}/).map(reEsc).join('(.+?)');
    patterns.push({ key, re: new RegExp(`^${src}$`, 's') });
  }
  return {
    /** Schlüssel zum sichtbaren Text. ponytail: gleicher Text unter mehreren Schlüsseln → alle, der erste zählt */
    find(text: string): string[] {
      const t = norm(stripOpenPoints(text));
      if (!t) return [];
      const hit = exact.get(t);
      if (hit) return hit;
      if (t.length > 3000) return [];
      return patterns.filter((p) => p.re.test(t)).map((p) => p.key);
    },
  };
}

/* ------------------------------------------------------------------
   Platzhalter und Links aus dem fertigen HTML des Originals herauslesen,
   damit ein geänderter Text sie wieder genauso enthält.
------------------------------------------------------------------- */
export interface Caps {
  vars: Record<string, string>;
  links: Record<string, string>;
}

const normHtml = (h: string) =>
  norm(h.replace(/<mark\b[^>]*data-open-point[^>]*>[\s\S]*?<\/mark>/g, '').replace(/&nbsp;/g, ' ').replace(/&shy;/g, ''));

export function capture(template: string, html: string): Caps | null {
  const toks = tokens(stripOpenPoints(template));
  const names: ({ var: string } | { link: string })[] = [];
  let src = '';
  for (const t of toks) {
    if (t.t === 'text') src += reEsc(escapeText(t.v));
    else if (t.t === 'var') (src += '([\\s\\S]*?)'), names.push({ var: t.k });
    else (src += `<a\\b([^>]*)>${reEsc(escapeText(t.text))}</a>`), names.push({ link: t.to });
  }
  const m = new RegExp(`^${src.replace(/ +/g, ' ').trim()}$`).exec(normHtml(html));
  if (!m) return null;
  const caps: Caps = { vars: {}, links: {} };
  names.forEach((n, i) => {
    if ('var' in n) caps.vars[n.var] = m[i + 1];
    else caps.links[n.link] ??= m[i + 1];
  });
  return caps;
}

/** So wie der Browser Textknoten ausgibt (nur & < > maskiert). */
const escapeText = (s: string) =>
  s.replace(/­/g, '').replace(/\s+/g, ' ').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Neuer Text → HTML mit den Platzhaltern und Links des Originals. Unbekanntes bleibt sichtbar als Text. */
export function renderHtml(value: string, caps: Caps): string {
  return tokens(value)
    .map((t) => {
      if (t.t === 'text') return escapeHtml(t.v);
      if (t.t === 'var') return caps.vars[t.k] ?? escapeHtml(`{${t.k}}`);
      const attrs = caps.links[t.to];
      return attrs === undefined ? escapeHtml(t.text) : `<a${attrs}>${escapeHtml(t.text)}</a>`;
    })
    .join('');
}

/** Schlüssel in einer Liste? „faq.3.q" → Liste „faq", Eintrag 3, Rest „q" (die innerste Liste zählt). */
export function listOf(key: string): { path: string; index: number; rest: string } | null {
  const parts = key.split('.');
  for (let i = parts.length - 1; i > 0; i--) {
    if (/^\d+$/.test(parts[i])) return { path: parts.slice(0, i).join('.'), index: +parts[i], rest: parts.slice(i + 1).join('.') };
  }
  return null;
}

export function getPath(o: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((a, k) => (a && typeof a === 'object' ? (a as Record<string, unknown>)[k] : undefined), o);
}

export function setPath(o: unknown, path: string, v: unknown): unknown {
  if (!path) return v;
  const ks = path.split('.');
  const last = ks.pop()!;
  const node = ks.reduce<Record<string, unknown>>((a, k) => a[k] as Record<string, unknown>, o as Record<string, unknown>);
  node[last] = v;
  return o;
}
