/**
 * Zahlen, Preise, Maße und Daten je Sprache (C2).
 * fr: „29 280 €", de/lb: „29.280 €", en: „€29,280", pt: „29 280 €".
 */
import { intlLocale, type Lang } from '@/i18n/config';

const cache = new Map<string, Intl.NumberFormat>();
function nf(lang: Lang, opts: Intl.NumberFormatOptions = {}): Intl.NumberFormat {
  const key = lang + JSON.stringify(opts);
  let f = cache.get(key);
  if (!f) {
    f = new Intl.NumberFormat(intlLocale(lang), opts);
    cache.set(key, f);
  }
  return f;
}

export function num(lang: Lang, n: number, opts: Intl.NumberFormatOptions = {}): string {
  return nf(lang, opts).format(n);
}

export function eur(lang: Lang, n: number): string {
  return nf(lang, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(n);
}

const NBSP = ' ';

export const km = (lang: Lang, n: number) => `${num(lang, n)}${NBSP}km`;
export const kg = (lang: Lang, n: number) => `${num(lang, n)}${NBSP}kg`;
export const meters = (lang: Lang, n: number) =>
  `${num(lang, n, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${NBSP}m`;
export const metersBare = (lang: Lang, n: number) =>
  num(lang, n, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const cubic = (lang: Lang, n: number) => num(lang, n, { maximumFractionDigits: 1 });

/** „2024-06" → „06/2024" (numerisch, in allen Sprachen gleich lesbar) */
export function monthYear(ym: string | null): string | null {
  if (!ym) return null;
  const [y, m] = ym.split('-');
  return `${m}/${y}`;
}

const TZ = 'Europe/Luxembourg';

export function timeHM(lang: Lang, iso: string): string {
  return new Intl.DateTimeFormat(intlLocale(lang), { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: TZ }).format(
    new Date(iso),
  );
}

export function dateLong(lang: Lang, iso: string): string {
  return new Intl.DateTimeFormat(intlLocale(lang), { day: 'numeric', month: 'long', year: 'numeric', timeZone: TZ }).format(
    new Date(iso),
  );
}

export function dateIsoInLuxembourg(d: Date): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(d);
}

/** „120 kW (163 ch)" – Einheit in Klammern je Sprache */
export function power(lang: Lang, kw: number | null, hp: number | null, unit: string): string | null {
  if (kw == null && hp == null) return null;
  if (kw != null && hp != null) return `${num(lang, kw)}${NBSP}kW (${num(lang, hp)}${NBSP}${unit})`;
  if (kw != null) return `${num(lang, kw)}${NBSP}kW`;
  return `${num(lang, hp!)}${NBSP}${unit}`;
}
