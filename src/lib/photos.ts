/**
 * Fotos der Website. In der Präsentationsversion (site.json → presentation) kommen
 * Stockfotos aus src/assets/demo/ – freie Lizenzen, Nachweis in credits.json und im Impressum.
 * Echte Fotos später in src/assets/photos/ (gleiche Schlüssel) bzw. src/assets/flotte/ ablegen.
 */
import type { ImageMetadata } from 'astro';
import credits from '@/assets/demo/credits.json';
import { presentation } from './site.ts';

const demo = import.meta.glob<{ default: ImageMetadata }>('/src/assets/demo/*.{jpg,png,webp}', { eager: true });
const real = import.meta.glob<{ default: ImageMetadata }>('/src/assets/photos/*.{jpg,png,webp}', { eager: true });
const fleet = import.meta.glob<{ default: ImageMetadata }>('/src/assets/flotte/*.{jpg,png,webp}', { eager: true });

export type PhotoKey = 'hero-workshop' | 'workshop' | 'sodablast' | 'bodywork' | 'garden' | 'garden-page' | 'paint' | 'rental' | 'trailers-sale' | 'about';

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

/** Echtes Foto, sonst in der Präsentation das Demo-Foto, sonst null (Platzhalter). */
export function photo(key: PhotoKey): Photo | null {
  const r = find(real, 'photos', key);
  if (r) return { ...r, demo: false };
  if (!presentation) return null;
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

/** Bildnachweise der Demo-Fotos (für das Impressum), nur in der Präsentation */
export function demoCredits(): Credit[] {
  if (!presentation) return [];
  const seen = new Set<string>();
  return Object.values(credits as Record<string, Credit>).filter((c) => {
    if (seen.has(c.page)) return false;
    seen.add(c.page);
    return true;
  });
}
