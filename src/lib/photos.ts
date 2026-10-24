/**
 * Fotos der Website. Wo noch kein eigenes Foto da ist, kommen Stockfotos aus src/assets/demo/
 * (in der Präsentationsversion oder mit site.json → stockPhotos) – freie Lizenzen, Nachweis in
 * credits.json und im Impressum.
 * Echte Fotos später in src/assets/photos/ (gleiche Schlüssel) bzw. src/assets/flotte/ ablegen.
 */
import type { ImageMetadata } from 'astro';
import credits from '@/assets/demo/credits.json';
import hiddenJson from '@/content/photos.json';
import { presentation, site } from './site.ts';

const demo = import.meta.glob<{ default: ImageMetadata }>('/src/assets/demo/*.{jpg,png,webp}', { eager: true });
const real = import.meta.glob<{ default: ImageMetadata }>('/src/assets/photos/*.{jpg,png,webp}', { eager: true });
const fleet = import.meta.glob<{ default: ImageMetadata }>('/src/assets/flotte/*.{jpg,png,webp}', { eager: true });

/** Stockfotos als Lückenfüller: in der Präsentation oder live mit site.json → stockPhotos */
const useDemo = presentation || (site as { stockPhotos?: boolean }).stockPhotos === true;

export const PHOTO_KEYS = ['hero-workshop', 'workshop', 'bodywork', 'paint', 'sodablast', 'garden', 'garden-page', 'rental', 'trailers-sale', 'about'] as const;
export type PhotoKey = (typeof PHOTO_KEYS)[number];

export interface Photo {
  img: ImageMetadata;
  /** Produktfoto mit transparentem Hintergrund → nicht beschneiden */
  contain: boolean;
  demo: boolean;
  /** Pfad ab Projektwurzel (für die unscharfe Vorschau) */
  file: string;
}

function find(map: Record<string, { default: ImageMetadata }>, dir: string, key: string) {
  for (const ext of ['jpg', 'png', 'webp']) {
    const file = `/src/assets/${dir}/${key}.${ext}`;
    const m = map[file];
    if (m) return { img: m.default, contain: ext === 'png', file };
  }
  return null;
}

/** Im Admin-Bereich ausgeblendete Foto-Plätze (src/content/photos.json) */
export const hiddenPhotos = new Set(Object.entries(hiddenJson as Record<string, { hidden?: boolean }>).filter(([, v]) => v?.hidden).map(([k]) => k));

/** Echtes Foto, sonst (siehe useDemo) das Demo-Foto, sonst null (Platzhalter). */
export function photo(key: PhotoKey): Photo | null {
  if (hiddenPhotos.has(key)) return null;
  const r = find(real, 'photos', key);
  if (r) return { ...r, demo: false };
  if (!useDemo) return null;
  const d = find(demo, 'demo', key);
  return d ? { ...d, demo: true } : null;
}

/** Foto eines Flottenfahrzeugs: Dateiname in src/assets/flotte/ oder Demo-Schlüssel (fleet-…). */
export function fleetPhoto(name: string | null): Photo | null {
  if (!name) return null;
  const base = name.replace(/\.(jpg|png|webp)$/, '');
  const r = find(fleet, 'flotte', base);
  if (r) return { ...r, demo: false };
  if (!presentation) return null;
  const d = find(demo, 'demo', base);
  return d ? { ...d, demo: true } : null;
}

export interface Credit {
  file: string;
  title: string;
  author: string;
  license: string;
  licenseUrl: string;
  page: string;
}

/** Bildnachweise der Demo-Fotos (für das Impressum); live nur die tatsächlich gezeigten */
export function demoCredits(): Credit[] {
  if (!useDemo) return [];
  const shown = new Set<string>(PHOTO_KEYS.filter((k) => photo(k)?.demo));
  const seen = new Set<string>();
  return Object.entries(credits as Record<string, Credit>).filter(([key, c]) => {
    if (!presentation && !shown.has(key)) return false;
    if (seen.has(c.page)) return false;
    seen.add(c.page);
    return true;
  }).map(([, c]) => c);
}
