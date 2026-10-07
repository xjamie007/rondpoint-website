/**
 * Daten für das Admin-Dashboard (/admin/), beim Build erzeugt:
 * Grundtexte aller Sprachen (ohne Dashboard-Änderungen), Gliederung, Stammdaten,
 * Öffnungszeiten, Flotte (Rohdateien), Foto-Plätze mit Vorschau, Bestand.
 * Im echten Modus lädt das Dashboard Stammdaten, Zeiten, Texte und Flotte zusätzlich
 * frisch aus GitHub; diese Datei liefert dann vor allem die Grundtexte und Vorschaubilder.
 */
import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';
import fr from '@/i18n/fr';
import de from '@/i18n/de';
import lb from '@/i18n/lb';
import en from '@/i18n/en';
import pt from '@/i18n/pt';
import { LANGS, path, pathFor, RENTAL_CATEGORY_SLUGS, withBase, type RentalCategorySlugKey } from '@/i18n/config';
import { useT } from '@/i18n';
import siteJson from '@/content/site.json';
import horaires from '@/content/horaires.json';
import texts from '@/content/texts.json';
import syncStatus from '@/data/sync-status.json';
import { PHOTO_KEYS, photo, fleetPhoto } from '@/lib/photos';
import { activeCars } from '@/lib/stock';
import { CATEGORIES, CARGO } from '@/content.config';
import { groupKeys } from '@/lib/text-groups';

type Flat = Record<string, string>;
function flatten(o: unknown, pre = '', out: Flat = {}): Flat {
  if (typeof o === 'string') out[pre] = o;
  else if (Array.isArray(o)) o.forEach((v, i) => flatten(v, `${pre}.${i}`, out));
  else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) flatten(v, pre ? `${pre}.${k}` : k, out);
  return out;
}

export const GET: APIRoute = async () => {
  const base = { fr, de, lb, en, pt };
  const dict: Record<string, Flat> = {};
  for (const l of LANGS) dict[l] = flatten(base[l]);
  const groups = groupKeys(Object.keys(dict.fr), false).map((g) => ({ id: g.id, keys: g.keys }));

  // Google: Titel und Beschreibung je Seite, mit Adresse für die Vorschau
  const seoPages = Object.keys(fr.seo)
    .filter((k) => k !== 'car' && k !== 'category')
    .map((k) => ({ id: k, title: `seo.${k}.title`, description: `seo.${k}.description`, url: Object.fromEntries(LANGS.map((l) => [l, path(l, k as never)])) }));
  for (const c of Object.keys(RENTAL_CATEGORY_SLUGS) as RentalCategorySlugKey[]) {
    seoPages.push({ id: `category.${c}`, title: `seo.category.title.${c}`, description: `seo.category.description.${c}`, url: Object.fromEntries(LANGS.map((l) => [l, pathFor(l, { page: 'rentalCategory', category: c })])) });
  }

  // Foto-Plätze mit kleiner Vorschau
  const photos = [];
  for (const key of PHOTO_KEYS) {
    const ph = photo(key);
    const preview = ph ? (await getImage({ src: ph.img, width: 480, format: 'webp' })).src : null;
    photos.push({ key, preview, demo: ph?.demo ?? false, own: !!ph && !ph.demo, file: `src/assets/photos/${key}.jpg` });
  }

  // Flotte: Rohdateien (mit Kommentaren), Vorschau des Fotos
  const raw = import.meta.glob<Record<string, unknown>>('/src/content/flotte/**/*.json', { eager: true, import: 'default' });
  const fleet = [];
  for (const [file, data] of Object.entries(raw)) {
    const ph = fleetPhoto((data.photo as string | null) ?? null);
    fleet.push({ path: file.slice(1), data, preview: ph ? (await getImage({ src: ph.img, width: 480, format: 'webp' })).src : null });
  }

  const t = useT('fr');
  const body = {
    builtAt: new Date().toISOString(),
    base: withBase(''),
    langs: LANGS,
    dict,
    groups,
    seoPages,
    labels: { categories: t.categories, cargo: Object.fromEntries(CARGO.map((c) => [c, t.finder.cargo?.[c as keyof typeof t.finder.cargo] ?? c])) },
    categories: CATEGORIES,
    cargo: CARGO,
    site: siteJson,
    horaires,
    texts,
    photos,
    fleet,
    stock: { count: activeCars.length, sync: syncStatus },
  };
  return new Response(JSON.stringify(body), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
