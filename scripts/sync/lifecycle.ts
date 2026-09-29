/**
 * Lebenslauf eines Inserats (T2.5, T2.7).
 *  - neu in der Quelle            → active, firstSeen = heute
 *  - fehlt in erfolgreichem Lauf  → unavailable, unavailableSince = heute
 *  - 14 Tage unavailable          → entfernt (Pfad liefert 404)
 *  - taucht wieder auf            → wieder active, dieselbe URL
 * Zuordnung über stableId, sonst über Marke, Modell, Erstzulassung,
 * Kilometer ± 500 und Preis ± 5 %. Die URL (slug) ändert sich nie.
 */
import type { Listing, Vehicle } from '../../src/lib/stock-schema.ts';
import { norm } from './enums.ts';

export const REMOVE_AFTER_DAYS = 14;

const MAKE_ALIASES: Record<string, string> = {
  vw: 'volkswagen',
  'mercedes benz': 'mercedes',
  'mercedes-benz': 'mercedes',
};

export function normMake(make: string): string {
  const n = norm(make);
  return MAKE_ALIASES[n] ?? n;
}

export function slugify(s: string): string {
  return s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** {marque}-{modele}-{annee}-{stableId}, klein, ASCII (D1). */
export function vehicleSlug(l: Pick<Listing, 'make' | 'model' | 'firstRegistration' | 'modelYear' | 'stableId'>): string {
  const year = l.firstRegistration?.slice(0, 4) ?? (l.modelYear ? String(l.modelYear) : null);
  return [l.make, l.model, year, l.stableId]
    .filter((x): x is string => !!x)
    .map(slugify)
    .filter(Boolean)
    .join('-');
}

export function daysBetween(a: string, b: string): number {
  return Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86_400_000);
}

export function fuzzyMatch(
  a: Pick<Listing, 'make' | 'model' | 'firstRegistration' | 'mileageKm' | 'priceEur'>,
  b: Pick<Listing, 'make' | 'model' | 'firstRegistration' | 'mileageKm' | 'priceEur'>,
): boolean {
  return (
    normMake(a.make) === normMake(b.make) &&
    norm(a.model) === norm(b.model) &&
    (a.firstRegistration ?? null) === (b.firstRegistration ?? null) &&
    Math.abs(a.mileageKm - b.mileageKm) <= 500 &&
    Math.abs(a.priceEur - b.priceEur) <= Math.max(a.priceEur, b.priceEur) * 0.05
  );
}

const LISTING_KEYS = [
  'source', 'sourceId', 'sourceUrl', 'make', 'model', 'version', 'condition', 'firstRegistration', 'modelYear',
  'mileageKm', 'fuel', 'fuelRaw', 'transmission', 'transmissionRaw', 'powerHp', 'powerKw', 'displacementCc', 'body',
  'bodyRaw', 'seats', 'colorExterior', 'colorInterior', 'co2Gkm', 'wltpConsumption', 'euroNorm', 'priceEur',
  'vatRecoverable', 'options', 'description', 'photos', 'garageRef',
] as const;

function contentKey(x: Partial<Listing>): string {
  return JSON.stringify(LISTING_KEYS.map((k) => x[k] ?? null));
}

export interface Changes {
  added: string[];
  changed: string[];
  unavailable: string[];
  removed: string[];
  reappeared: string[];
}

export interface MergeResult {
  vehicles: Vehicle[];
  changes: Changes;
}

export function mergeStock(prev: Vehicle[], fetched: Listing[], today: string): MergeResult {
  const changes: Changes = { added: [], changed: [], unavailable: [], removed: [], reappeared: [] };
  const matched = new Set<Vehicle>();
  const out: Vehicle[] = [];
  const takenSlugs = new Set(prev.map((v) => v.slug));

  for (const l of fetched) {
    let p = prev.find((v) => !matched.has(v) && v.stableId === l.stableId);
    if (!p) p = prev.find((v) => !matched.has(v) && fuzzyMatch(v, l));
    if (p) {
      matched.add(p);
      const wasUnavailable = p.status === 'unavailable';
      const differs = contentKey(p) !== contentKey(l);
      const v: Vehicle = {
        ...l,
        stableId: p.stableId,
        slug: p.slug,
        firstSeen: p.firstSeen,
        lastSeen: today,
        lastChanged: differs || wasUnavailable ? today : p.lastChanged,
        status: 'active',
        unavailableSince: null,
      };
      if (wasUnavailable) changes.reappeared.push(v.stableId);
      else if (differs) changes.changed.push(v.stableId);
      out.push(v);
    } else {
      let slug = vehicleSlug(l);
      if (takenSlugs.has(slug)) slug = `${slug}-${slugify(l.sourceId)}`;
      takenSlugs.add(slug);
      out.push({
        ...l,
        slug,
        firstSeen: today,
        lastSeen: today,
        lastChanged: today,
        status: 'active',
        unavailableSince: null,
      });
      changes.added.push(l.stableId);
    }
  }

  for (const p of prev) {
    if (matched.has(p)) continue;
    if (p.status === 'active') {
      out.push({ ...p, status: 'unavailable', unavailableSince: today, lastChanged: today });
      changes.unavailable.push(p.stableId);
    } else if (p.unavailableSince && daysBetween(p.unavailableSince, today) >= REMOVE_AFTER_DAYS) {
      changes.removed.push(p.stableId);
    } else {
      out.push(p);
    }
  }

  out.sort((a, b) => (a.firstSeen === b.firstSeen ? a.stableId.localeCompare(b.stableId) : b.firstSeen.localeCompare(a.firstSeen)));
  return { vehicles: out, changes };
}
