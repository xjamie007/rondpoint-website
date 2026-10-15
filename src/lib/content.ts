/**
 * Ausführliche Seitentexte (SEO): Abschnitte und FAQ aus t.content.*.
 * Platzhalter in den Texten: {address} {phone} {whatsapp} {email} {hours}
 * Interne Links: [Text](page:workshop) oder [Text](cat:benne)
 * Öffnungszeiten werden aus horaires.json zusammengefasst, damit Texte nach einer
 * Änderung im Dashboard stimmen.
 */
import { rich, type Dict } from '@/i18n';
import { PAGE_SLUGS, path, pathFor, RENTAL_CATEGORY_SLUGS, type Lang, type PageKey, type RentalCategorySlugKey } from '@/i18n/config';
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
type Week = Record<DayKey, [string, string][]>;

/** Aufeinanderfolgende Tage mit gleichen Zeiten zusammenfassen */
function dayGroups(week: Week) {
  const groups: { from: DayKey; to: DayKey; iv: [string, string][] }[] = [];
  for (const d of DAY_KEYS) {
    const iv = week[d] ?? [];
    const last = groups.at(-1);
    if (last && same(last.iv, iv)) last.to = d;
    else groups.push({ from: d, to: d, iv });
  }
  return groups;
}

/** „Lundi – Vendredi : 07:45–12:00 et 13:00–18:00 · Samedi : 08:00–12:00 · Dimanche : fermé“ */
export function hoursSummary(t: Dict, lang: Lang, sep = ' · ', week: Week = horaires.week): string {
  const colon = lang === 'fr' ? '\u00a0: ' : ': ';
  return dayGroups(week)
    .map((g) => {
      const days = g.from === g.to ? t.hours.days[g.from] : `${t.hours.days[g.from]} – ${t.hours.days[g.to]}`;
      const time = g.iv.length ? g.iv.map(([a, b]) => `${a}–${b}`).join(` ${t.hours.and} `) : t.hours.closed.toLocaleLowerCase();
      return `${days}${colon}${time}`;
    })
    .join(sep);
}

/** Für Fließtext (z. B. Google-Beschreibung): „Lundi–vendredi 07:45–12:00 et 13:00–18:00, samedi 08:00–12:00“, ohne geschlossene Tage */
export function hoursInline(t: Dict, lang: Lang, week: Week = horaires.week): string {
  // im Satz klein (fr, pt); portugiesisch kurz „segunda–sexta“
  const day = (d: DayKey) => (lang === 'fr' || lang === 'pt' ? t.hours.days[d].toLocaleLowerCase().replace(/-feira$/, '') : t.hours.days[d]);
  const s = dayGroups(week)
    .filter((g) => g.iv.length)
    .map((g) => `${g.from === g.to ? day(g.from) : `${day(g.from)}–${day(g.to)}`} ${g.iv.map(([a, b]) => `${a}–${b}`).join(` ${t.hours.and} `)}`)
    .join(', ');
  return s.charAt(0).toLocaleUpperCase() + s.slice(1);
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
    // unbekanntes Ziel (z. B. im Admin-Bereich vertippt): nur das Wort, statt den Build abzubrechen
    const known = kind === 'cat' ? key in RENTAL_CATEGORY_SLUGS : key in PAGE_SLUGS;
    if (!known) return text;
    const href = kind === 'cat' ? pathFor(lang, { page: 'rentalCategory', category: key as RentalCategorySlugKey }) : path(lang, key as PageKey);
    return `<a class="link" href="${href}">${text}</a>`;
  });
}

export const blocks = (sections: Record<string, Block> | undefined): Block[] => Object.values(sections ?? {});
export const faqItems = (faq: Record<string, FaqItem> | undefined): FaqItem[] => Object.values(faq ?? {});
