import fr, { type Dict } from './fr.ts';
import de from './de.ts';
import lb from './lb.ts';
import en from './en.ts';
import pt from './pt.ts';
import { intlLocale, type Lang } from './config.ts';
import siteJson from '../content/site.json';

/** Präsentationsversion: interne Platzhalter nicht anzeigen (siehe src/lib/site.ts) */
const PRESENTATION = (siteJson as { presentation?: boolean }).presentation === true;

export type { Dict };

/* ------------------------------------------------------------------
   Typografie
------------------------------------------------------------------- */
const NNBSP = ' ';
const NBSP = ' ';

/** Französische Typografie: schmales geschütztes Leerzeichen vor ? ! ; und in « », geschütztes vor :. */
export function frenchTypo(s: string): string {
  return s
    .replace(/ ([?!;])/g, `${NNBSP}$1`)
    .replace(/ :(?=\s|$)/g, `${NBSP}:`)
    .replace(/« /g, `«${NNBSP}`)
    .replace(/ »/g, `${NNBSP}»`)
    .replace(/(\d) (\d{3})(?=\s(?:kg|km|m|€))/g, `$1${NNBSP}$2`)
    .replace(/(\d) (kg|km|m|m³|€|h|%)(?![a-zà-ÿ])/g, `$1${NBSP}$2`);
}

/** Geschützte Leerzeichen zwischen Zahl und Einheit, in allen Sprachen. */
function unitTypo(s: string): string {
  return s.replace(/(\d) (kg|km|m|m³|€|h|%)(?![a-zà-ÿ])/g, `$1${NBSP}$2`);
}

type Deep = string | string[] | { [k: string]: Deep };

function mapDeep(v: Deep, f: (s: string) => string): Deep {
  if (typeof v === 'string') return f(v);
  if (Array.isArray(v)) return v.map(f);
  const out: Record<string, Deep> = {};
  for (const [k, x] of Object.entries(v)) out[k] = mapDeep(x, f);
  return out;
}

export const MISSING_TRANSLATION = '[FEHLT — Übersetzung]';

/** Fehlt ein Schlüssel in einer Sprache, erscheint er sichtbar markiert (nie still auf Französisch). */
function fillMissing(base: Deep, over: Deep | undefined): Deep {
  if (typeof base === 'string') return typeof over === 'string' ? over : `${MISSING_TRANSLATION} ${base}`;
  if (Array.isArray(base)) return Array.isArray(over) ? over : base.map((s) => `${MISSING_TRANSLATION} ${s}`);
  const out: Record<string, Deep> = {};
  const o = (over && typeof over === 'object' && !Array.isArray(over) ? over : {}) as Record<string, Deep>;
  for (const [k, x] of Object.entries(base)) out[k] = fillMissing(x, o[k]);
  return out;
}

export type DeepPartial<T> = { [K in keyof T]?: T[K] extends string ? string : T[K] extends string[] ? string[] : DeepPartial<T[K]> };

const raw: Record<Lang, DeepPartial<Dict>> = { fr, de, lb, en, pt };

/**
 * Weiche Trennstriche an Wortfugen langer Komposita. Browser haben kein luxemburgisches
 * Trennwörterbuch, hyphens: auto greift dort nicht. Nicht in seo.* (Title/Description).
 */
const SHY = '\u00AD';
const SOFT_HYPHENS: Partial<Record<Lang, [RegExp, string][]>> = {
  lb: [
    [/Dateschutzerklärung/g, `Dateschutz${SHY}erklärung`],
    [/Bëschmaschinnen/g, `Bësch${SHY}maschinnen`],
    [/Gaartmaschinnen/g, `Gaart${SHY}maschinnen`],
    [/(Autos|Motos|Kill|Plattform|Koffer)unhänger/g, `$1${SHY}unhänger`],
    [/Gesamtgewiicht/g, `Gesamt${SHY}gewiicht`],
    [/Camionnett(en|e)/g, `Camion${SHY}nett$1`],
    [/Notzlaascht/g, `Notz${SHY}laascht`],
    [/Unhängelaascht/g, `Unhänge${SHY}laascht`],
    [/Führerschäin/g, `Führer${SHY}schäin`],
    [/Kommissiounsverkaf/g, `Kommissiouns${SHY}verkaf`],
  ],
};

function softHyphenate(d: Deep, lang: Lang, key = ''): Deep {
  const rules = SOFT_HYPHENS[lang];
  if (!rules || key === 'seo' || key === 'meta') return d;
  if (typeof d === 'string') return rules.reduce((acc, [re, rep]) => acc.replace(re, rep), d);
  if (Array.isArray(d)) return d.map((x) => softHyphenate(x, lang) as string);
  const out: Record<string, Deep> = {};
  for (const [k, v] of Object.entries(d)) out[k] = softHyphenate(v, lang, k);
  return out;
}

const cache = new Map<Lang, Dict>();

export function useT(lang: Lang): Dict {
  let d = cache.get(lang);
  if (!d) {
    const filled = lang === 'fr' ? (fr as unknown as Deep) : fillMissing(fr as unknown as Deep, raw[lang] as Deep);
    d = softHyphenate(mapDeep(filled, lang === 'fr' ? frenchTypo : unitTypo), lang) as unknown as Dict;
    cache.set(lang, d);
  }
  return d;
}

/** Rohdaten einer Sprache, für die Vollständigkeitsprüfung */
export function rawDict(lang: Lang): DeepPartial<Dict> {
  return raw[lang];
}

/* ------------------------------------------------------------------
   Platzhalter, Interpolation, Plural
------------------------------------------------------------------- */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}

export interface PluralForms {
  one: string;
  other: string;
}

export function plural(lang: Lang, forms: PluralForms, n: number, vars: Record<string, string | number> = {}): string {
  const rule = new Intl.PluralRules(intlLocale(lang)).select(n);
  const tpl = rule === 'one' ? forms.one : forms.other;
  return fmt(tpl, { n, ...vars });
}

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

const OPEN_POINT_RE = /\[(FEHLT|UNBESTÄTIGT)(?:\s*[—–-]\s*([^\]]*))?\]/g;

export function hasOpenPoint(s: string): boolean {
  OPEN_POINT_RE.lastIndex = 0;
  return OPEN_POINT_RE.test(s);
}

export function stripOpenPoints(s: string): string {
  return s.replace(OPEN_POINT_RE, '').replace(/\s{2,}/g, ' ').trim();
}

/** Enthält eine unbestätigte Aussage – in der Präsentation ganz weglassen. */
export function isUnconfirmed(s: string): boolean {
  return /\[UNBESTÄTIGT/.test(s);
}

/** Text ohne Platzhalter noch sinnvoll? (sonst Abschnitt/Frage weglassen) */
export function hasContent(s: string): boolean {
  return stripOpenPoints(s).replace(/[\s.:;,–—-]/g, '').length > 0;
}

/**
 * Text → HTML: maskiert, markiert Platzhalter sichtbar und ersetzt {name}
 * durch vorbereitetes HTML (z. B. Links). Für set:html.
 * In der Präsentationsversion werden Platzhalter entfernt, außer keepOpenPoints.
 */
export function rich(s: string, html: Record<string, string> = {}, opts: { keepOpenPoints?: boolean } = {}): string {
  const hide = PRESENTATION && !opts.keepOpenPoints;
  let out = hide
    ? escapeHtml(s.replace(/\s*\[(FEHLT|UNBESTÄTIGT)(?:\s*[—–-]\s*[^\]]*)?\]/g, '')).trim()
    : escapeHtml(s).replace(OPEN_POINT_RE, (m) => `<mark class="open-point" data-open-point>${m}</mark>`);
  out = out.replace(/\{(\w+)\}/g, (m, k) => (k in html ? html[k] : m));
  return out;
}
