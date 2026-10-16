/**
 * Ladungsarten im Finder („Was transportieren Sie?“) aus src/content/cargo.json.
 * Beschriftung: eigene je Sprache (Admin-Bereich), sonst der Text aus src/i18n (finder.cargo).
 */
import cargoJson from '@/content/cargo.json';
import type { Lang } from '@/i18n/config';

export interface CargoItem {
  id: string;
  label?: Partial<Record<Lang, string>>;
}

export const CARGO_ITEMS: CargoItem[] = (cargoJson as { items: CargoItem[] }).items;
export const CARGO_IDS: string[] = CARGO_ITEMS.map((c) => c.id);

/** Beschriftung einer Ladungsart; defaults = t.finder.cargo der Sprache */
export function cargoLabel(item: CargoItem, lang: Lang, defaults: Record<string, string>): string {
  return item.label?.[lang] || defaults[item.id] || item.label?.fr || Object.values(item.label ?? {}).find(Boolean) || item.id;
}

export function cargoLabels(items: CargoItem[], lang: Lang, defaults: Record<string, string>): Record<string, string> {
  return Object.fromEntries(items.map((c) => [c.id, cargoLabel(c, lang, defaults)]));
}
