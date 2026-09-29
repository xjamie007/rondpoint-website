/**
 * Fahrzeugbestand für den Build: stock.json + vehicle-overrides.json (T2.8).
 */
import stockJson from '@/data/stock.json';
import statusJson from '@/data/sync-status.json';
import overridesJson from '@/data/vehicle-overrides.json';
import { overridesSchema, stockFileSchema, syncStatusSchema, type Vehicle } from './stock-schema.ts';

export const BUILD_TIME = new Date();

const overrides = overridesSchema.parse(overridesJson);

export type CarView = Vehicle & { note?: string };

const all: CarView[] = stockFileSchema
  .parse(stockJson)
  .vehicles.filter((v) => !overrides[v.stableId]?.hide)
  .map((v) => {
    const o = overrides[v.stableId];
    if (!o) return v;
    const condition = o.condition ?? v.condition;
    return {
      ...v,
      condition,
      firstRegistration: condition === 'new' ? null : v.firstRegistration,
      wltpConsumption: o.wltpConsumption ?? v.wltpConsumption,
      co2Gkm: o.co2Gkm ?? v.co2Gkm,
      note: o.note,
    };
  });

export const syncStatus = syncStatusSchema.parse(statusJson);

/** Alle Autos mit eigener Seite (aktiv und „nicht mehr verfügbar") */
export const carPages = all;

/** Aktive Autos, neueste zuerst */
export const activeCars = all
  .filter((v) => v.status === 'active')
  .sort((a, b) => b.firstSeen.localeCompare(a.firstSeen) || a.stableId.localeCompare(b.stableId));

export const FRESH_DAYS = 7;

/** „Nouveau": firstSeen höchstens 7 Tage vor dem Build */
export function isFresh(v: Pick<Vehicle, 'firstSeen'>, now = BUILD_TIME): boolean {
  const days = (now.getTime() - Date.parse(`${v.firstSeen}T00:00:00Z`)) / 86_400_000;
  return days <= FRESH_DAYS;
}

export function carYear(v: Pick<Vehicle, 'firstRegistration' | 'modelYear'>): string | null {
  return v.firstRegistration?.slice(0, 4) ?? (v.modelYear ? String(v.modelYear) : null);
}

/** „Voitures similaires": gleiche Karosserie oder Preis ± 25 %, beides zuerst, dann nach Preisnähe. */
export function similarCars(v: CarView, pool = activeCars, n = 3): CarView[] {
  return pool
    .filter((c) => c.stableId !== v.stableId)
    .map((c) => {
      const sameBody = c.body === v.body && c.body !== 'other';
      const near = Math.abs(c.priceEur - v.priceEur) <= v.priceEur * 0.25;
      return { c, sameBody, near, dist: Math.abs(c.priceEur - v.priceEur) };
    })
    .filter((x) => x.sameBody || x.near)
    .sort((a, b) => Number(b.sameBody && b.near) - Number(a.sameBody && a.near) || a.dist - b.dist)
    .slice(0, n)
    .map((x) => x.c);
}

/** Erstzulassung bis einschließlich 1995 → Hinweis auf Sodablast */
export function isClassic(v: Pick<Vehicle, 'firstRegistration'>): boolean {
  return !!v.firstRegistration && Number(v.firstRegistration.slice(0, 4)) <= 1995;
}

/** Bestandsstand älter als 36 Stunden? Dann nie „aujourd'hui". */
export function syncAgeHours(now = BUILD_TIME): number | null {
  if (!syncStatus.lastSuccess) return null;
  return (now.getTime() - Date.parse(syncStatus.lastSuccess)) / 3_600_000;
}
