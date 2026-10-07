/**
 * Ausführliche Seitentexte (SEO): Abschnitte und FAQ aus t.content.*.
 * Platzhalter in den Texten: {address} {phone} {whatsapp} {email} {hours}
 * Interne Links: [Text](page:workshop) oder [Text](cat:benne)
 * Öffnungszeiten werden aus horaires.json zusammengefasst, damit Texte nach einer
 * Änderung im Dashboard stimmen.
 */
import { rich, type Dict } from '@/i18n';
import { path, pathFor, type Lang, type PageKey, type RentalCategorySlugKey } from '@/i18n/config';
import { DAY_KEYS, horaires, site, type DayKey } from '@/lib/site';

export interface Block {
  h: string;
  p?: string[];
  items?: string[];
}
export interface FaqItem {
  q: string;
  a: string;
}

const same = (a: [string, string][], b: [string, string][]) => JSON.stringify(a) === JSON.stringify(b);

/** „Lundi – Vendredi : 07:45–12:00 et 13:00–18:00 · Samedi : 08:00–12:00 · Dimanche : fermé“ */
export function hoursSummary(t: Dict, lang: Lang, sep = ' · '): string {
  const groups: { from: DayKey; to: DayKey; iv: [string, string][] }[] = [];
  for (const d of DAY_KEYS) {
    const iv = horaires.week[d] as [string, string][];
    const last = groups.at(-1);
    if (last && same(last.iv, iv)) last.to = d;
    else groups.push({ from: d, to: d, iv });
  }
  const colon = lang === 'fr' ? '\u00a0: ' : ': ';
  return groups
    .map((g) => {
      const days = g.from === g.to ? t.hours.days[g.from] : `${t.hours.days[g.from]} – ${t.hours.days[g.to]}`;
      const time = g.iv.length ? g.iv.map(([a, b]) => `${a}–${b}`).join(` ${t.hours.and} `) : t.hours.closed.toLocaleLowerCase();
      return `${days}${colon}${time}`;
    })
    .join(sep);
}

/** Platzhalter füllen (reiner Text) */
export function fillVars(s: string, t: Dict, lang: Lang): string {
  const address = `${site.address.street}, ${site.address.postalCode} ${site.address.locality}`;
  return s
    .replace(/\{address\}/g, address)
    .replace(/\{phone\}/g, site.phone.display)
    .replace(/\{whatsapp\}/g, site.whatsapp.display)
    .replace(/\{email\}/g, site.email)
    .replace(/\{hours\}/g, `${hoursSummary(t, lang, '; ')}.`);
}

const LINK = /\[([^\]]+)\]\((page|cat):([\w-]+)\)/g;

/** Text für JSON-LD: Platzhalter gefüllt, Links als reiner Text */
export function contentPlain(s: string, t: Dict, lang: Lang): string {
  return fillVars(s, t, lang).replace(LINK, '$1');
}

/** HTML für die Seite: Platzhalter, Typografie (rich) und interne Links */
export function contentHtml(s: string, t: Dict, lang: Lang): string {
  const html = rich(fillVars(s, t, lang));
  return html.replace(LINK, (_m, text: string, kind: string, key: string) => {
    const href = kind === 'cat' ? pathFor(lang, { page: 'rentalCategory', category: key as RentalCategorySlugKey }) : path(lang, key as PageKey);
    return `<a class="link" href="${href}">${text}</a>`;
  });
}

export const blocks = (sections: Record<string, Block> | undefined): Block[] => Object.values(sections ?? {});
export const faqItems = (faq: Record<string, FaqItem> | undefined): FaqItem[] => Object.values(faq ?? {});
