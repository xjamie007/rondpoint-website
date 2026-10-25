/**
 * Arten (Kategorien) der Mietflotte: feste (Texte und eigene Seiten in src/i18n) und eigene aus
 * src/content/categories.json (im Admin-Bereich angelegt, z. B. Food Truck). kind entscheidet,
 * ob ein Fahrzeug als Anhänger oder als Transporter gilt.
 */
import categoriesJson from '../content/categories.json';
import type { Lang } from '../i18n/config.ts';

export interface CategoryItem {
  id: string;
  kind: 'trailer' | 'van';
  label: Partial<Record<Lang, string>>;
}

export const BUILTIN_TRAILERS = ['porte-voiture', 'porte-moto', 'benne', 'frigorifique', 'plateau', 'fourgon'];
/** eigene Arten wie veröffentlicht (src/content/categories.json) */
export const PUBLISHED_CATEGORIES: CategoryItem[] = (categoriesJson as { items: CategoryItem[] }).items;
export let CUSTOM_CATEGORIES: CategoryItem[] = PUBLISHED_CATEGORIES;

/** Vorschau im Admin-Bereich: noch nicht veröffentlichte eigene Arten gelten sofort */
export function setCustomCategories(list: CategoryItem[]): void {
  CUSTOM_CATEGORIES = list;
}

/** Anhänger, Transporter oder keins von beiden (Auto im Verkauf); list: eigene Arten (Vorschau im Admin-Bereich) */
export function categoryKind(id: string, list: CategoryItem[] = CUSTOM_CATEGORIES): 'trailer' | 'van' | null {
  if (BUILTIN_TRAILERS.includes(id)) return 'trailer';
  if (id === 'camionnette') return 'van';
  return list.find((c) => c.id === id)?.kind ?? null;
}

/** Name einer Art; defaults = t.categories der Sprache */
export function categoryLabel(id: string, lang: Lang, defaults: Record<string, string>, list: CategoryItem[] = CUSTOM_CATEGORIES): string {
  if (defaults[id]) return defaults[id];
  const c = list.find((x) => x.id === id);
  return c?.label[lang] || c?.label.fr || Object.values(c?.label ?? {}).find(Boolean) || id;
}
