import siteJson from '@/content/site.json';
import horairesJson from '@/content/horaires.json';

export const site = siteJson;

export type DayKey = 'mo' | 'tu' | 'we' | 'th' | 'fr' | 'sa' | 'su';
export const DAY_KEYS: DayKey[] = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];
export type Interval = [string, string];

export const horaires = horairesJson as unknown as {
  timezone: string;
  week: Record<DayKey, Interval[]>;
  holidaysConfirmed: boolean;
};

const SCHEMA_DAY: Record<DayKey, string> = {
  mo: 'Monday',
  tu: 'Tuesday',
  we: 'Wednesday',
  th: 'Thursday',
  fr: 'Friday',
  sa: 'Saturday',
  su: 'Sunday',
};

/** openingHoursSpecification aus horaires.json (G3). Gleiche Zeiten werden zusammengefasst. */
export function openingHoursSpecification() {
  const groups = new Map<string, { days: string[]; opens: string; closes: string }>();
  for (const d of DAY_KEYS) {
    for (const [opens, closes] of horaires.week[d]) {
      const key = `${opens}-${closes}`;
      const g = groups.get(key) ?? { days: [], opens, closes };
      g.days.push(`https://schema.org/${SCHEMA_DAY[d]}`);
      groups.set(key, g);
    }
  }
  return [...groups.values()].map((g) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: g.days,
    opens: g.opens,
    closes: g.closes,
  }));
}

/** Wochentag (mo…su) für ein Datum in Luxemburger Zeit. */
export function dayKeyInLuxembourg(date = new Date()): DayKey {
  const wd = new Intl.DateTimeFormat('en-GB', { timeZone: horaires.timezone, weekday: 'short' }).format(date);
  return ({ Mon: 'mo', Tue: 'tu', Wed: 'we', Thu: 'th', Fri: 'fr', Sat: 'sa', Sun: 'su' } as const)[
    wd as 'Mon'
  ];
}

export const telHref = `tel:${site.phone.tel}`;
export const whatsappHref = (text: string) => `https://wa.me/${site.whatsapp.wa}?text=${encodeURIComponent(text)}`;

/**
 * Präsentationsversion (für den Kunden-Termin): Stockfotos statt Platzhaltern,
 * interne Hinweise [FEHLT]/[UNBESTÄTIGT] ausgeblendet, unbestätigte Aussagen weggelassen.
 */
export const presentation = (site as { presentation?: boolean }).presentation === true;
/** Abschnitte, die nur einen Platzhalter enthalten, werden nur ohne Präsentationsmodus gezeigt. */
export const showOpenPoints = site.showOpenPoints && !presentation;
