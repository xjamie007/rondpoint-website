/**
 * Sprachen, Locales und übersetzte URLs (D1).
 * Reihenfolge im Umschalter: LB, DE, FR, EN, PT.
 */
export const LANGS = ['lb', 'de', 'fr', 'en', 'pt'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'fr';

export function isLang(x: string | undefined): x is Lang {
  return !!x && (LANGS as readonly string[]).includes(x);
}

/** Wert für <html lang> und lang-Attribute. */
export const HTML_LANG: Record<Lang, string> = {
  fr: 'fr',
  de: 'de',
  lb: 'lb',
  en: 'en',
  pt: 'pt-PT',
};

/** Wert für hreflang. */
export const HREFLANG: Record<Lang, string> = {
  fr: 'fr',
  de: 'de',
  lb: 'lb',
  en: 'en',
  pt: 'pt-PT',
};

/** Voller Sprachname in der eigenen Sprache (Sprachumschalter). */
export const LANG_NAME: Record<Lang, string> = {
  lb: 'Lëtzebuergesch',
  de: 'Deutsch',
  fr: 'Français',
  en: 'English',
  pt: 'Português',
};

/**
 * Locale für Intl.NumberFormat / DateTimeFormat.
 * - fr: „fr" statt „fr-LU", weil CLDR für fr-LU den Punkt als
 *   Tausendertrenner setzt (29.280). Gewünscht ist „29 280 €".
 * - lb: „lb", sofern die Laufzeit es kennt, sonst de-LU (siehe intlLocale()).
 */
const INTL_LOCALE: Record<Lang, string> = {
  fr: 'fr',
  de: 'de-LU',
  lb: 'lb',
  en: 'en-GB',
  pt: 'pt-PT',
};

export function intlLocale(lang: Lang): string {
  const wanted = INTL_LOCALE[lang];
  if (lang === 'lb') {
    try {
      if (Intl.NumberFormat.supportedLocalesOf([wanted]).length === 0) return 'de-LU';
    } catch {
      return 'de-LU';
    }
  }
  return wanted;
}

/* ------------------------------------------------------------------
   Routen
------------------------------------------------------------------- */
export type RentalCategorySlugKey =
  | 'porte-voiture'
  | 'porte-moto'
  | 'benne'
  | 'frigorifique'
  | 'camionnette';

export const RENTAL_CATEGORY_KEYS: RentalCategorySlugKey[] = [
  'porte-voiture',
  'porte-moto',
  'benne',
  'frigorifique',
  'camionnette',
];

type SlugTable = Record<Lang, string>;

export const PAGE_SLUGS = {
  home: { fr: '', de: '', lb: '', en: '', pt: '' },
  rental: { fr: 'location', de: 'mieten', lb: 'lounen', en: 'hire', pt: 'aluguer' },
  cars: { fr: 'voitures', de: 'autos', lb: 'autoen', en: 'cars', pt: 'carros' },
  workshop: { fr: 'atelier', de: 'werkstatt', lb: 'atelier', en: 'workshop', pt: 'oficina' },
  sodablast: { fr: 'sodablast', de: 'sodablast', lb: 'sodablast', en: 'soda-blasting', pt: 'sodablast' },
  trailersForSale: {
    fr: 'remorques-a-vendre',
    de: 'anhaenger-kaufen',
    lb: 'unhaenger-kafen',
    en: 'trailers-for-sale',
    pt: 'atrelados-a-venda',
  },
  garden: { fr: 'jardin-foret', de: 'garten-forst', lb: 'gaart-besch', en: 'garden-forestry', pt: 'jardim-floresta' },
  contact: { fr: 'contact', de: 'kontakt', lb: 'kontakt', en: 'contact', pt: 'contacto' },
  thanks: { fr: 'merci', de: 'danke', lb: 'merci', en: 'thank-you', pt: 'obrigado' },
  legal: { fr: 'mentions-legales', de: 'impressum', lb: 'impressum', en: 'legal-notice', pt: 'aviso-legal' },
  privacy: {
    fr: 'protection-des-donnees',
    de: 'datenschutz',
    lb: 'dateschutz',
    en: 'privacy',
    pt: 'privacidade',
  },
} satisfies Record<string, SlugTable>;

export type PageKey = keyof typeof PAGE_SLUGS;

export const RENTAL_CATEGORY_SLUGS: Record<RentalCategorySlugKey, SlugTable> = {
  'porte-voiture': {
    fr: 'remorque-porte-voiture',
    de: 'autotransporter',
    lb: 'autosunhaenger',
    en: 'car-trailer',
    pt: 'atrelado-porta-carros',
  },
  'porte-moto': {
    fr: 'remorque-porte-moto',
    de: 'motorradanhaenger',
    lb: 'motosunhaenger',
    en: 'motorbike-trailer',
    pt: 'atrelado-porta-motos',
  },
  benne: {
    fr: 'benne-basculante',
    de: 'kipper',
    lb: 'kipper',
    en: 'tipper-trailer',
    pt: 'atrelado-basculante',
  },
  frigorifique: {
    fr: 'remorque-frigorifique',
    de: 'kuehlanhaenger',
    lb: 'killunhaenger',
    en: 'refrigerated-trailer',
    pt: 'atrelado-frigorifico',
  },
  camionnette: {
    fr: 'camionnette',
    de: 'transporter',
    lb: 'camionnette',
    en: 'van',
    pt: 'carrinha',
  },
};

/** Eine Route beschreibt eine Seite unabhängig von der Sprache. */
export type Route =
  | { page: Exclude<PageKey, never> }
  | { page: 'rentalCategory'; category: RentalCategorySlugKey }
  | { page: 'car'; slug: string };

/**
 * Basis-Pfad der Website: '' auf der eigenen Domain, z. B. '/rondpoint-website' auf GitHub Pages.
 * Außerhalb von Astro (Tests, Skripte) leer.
 */
export const BASE = ((import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL ?? '/').replace(/\/$/, '');

/** Hängt den Basis-Pfad vor einen Pfad ab Wurzel ('/fonts/x.woff2' → '/rondpoint-website/fonts/x.woff2'). */
export function withBase(p: string): string {
  return BASE + p;
}

/** Link zu einer Seite, mit Basis-Pfad. */
export function pathFor(lang: Lang, route: Route): string {
  return withBase(routePath(lang, route));
}

/** Pfad einer Seite ab Wurzel ohne Basis-Pfad (für die Routen-Erzeugung). */
export function routePath(lang: Lang, route: Route): string {
  if (route.page === 'rentalCategory') {
    return `/${lang}/${PAGE_SLUGS.rental[lang]}/${RENTAL_CATEGORY_SLUGS[route.category][lang]}/`;
  }
  if (route.page === 'car') {
    return `/${lang}/${PAGE_SLUGS.cars[lang]}/${route.slug}/`;
  }
  const slug = PAGE_SLUGS[route.page][lang];
  return slug ? `/${lang}/${slug}/` : `/${lang}/`;
}

/** Kurzform: path(lang, 'rental') */
export function path(lang: Lang, page: PageKey): string {
  return pathFor(lang, { page });
}

export function alternates(route: Route): { lang: Lang; href: string }[] {
  return LANGS.map((lang) => ({ lang, href: pathFor(lang, route) }));
}

/**
 * Löst einen Pfad (ohne Sprachpräfix) in eine Route auf.
 * Wird vom Catch-all [lang]/[...path].astro nicht gebraucht, aber vom 404-Skript
 * und in Tests, um tote Links zu finden.
 */
export function parsePath(lang: Lang, rest: string): Route | null {
  const parts = rest.split('/').filter(Boolean);
  if (parts.length === 0) return { page: 'home' };
  for (const key of Object.keys(PAGE_SLUGS) as PageKey[]) {
    if (key === 'home') continue;
    if (PAGE_SLUGS[key][lang] === parts[0]) {
      if (parts.length === 1) return { page: key };
      if (key === 'rental' && parts.length === 2) {
        const cat = (Object.keys(RENTAL_CATEGORY_SLUGS) as RentalCategorySlugKey[]).find(
          (c) => RENTAL_CATEGORY_SLUGS[c][lang] === parts[1],
        );
        return cat ? { page: 'rentalCategory', category: cat } : null;
      }
      if (key === 'cars' && parts.length === 2) return { page: 'car', slug: parts[1] };
    }
  }
  return null;
}
