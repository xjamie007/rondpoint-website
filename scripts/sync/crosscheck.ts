/**
 * Vergleich LuxAuto ↔ AutoScout24, wenn LuxAuto erfolgreich war (T2.3):
 * Anzahl vergleichen und Abweichungen loggen. Zusätzlich der Zustand neu/gebraucht:
 * Meldet AutoScout24 ein Auto als Neuwagen, LuxAuto aber nicht, gilt „neu" –
 * wegen der WLTP-Pflicht bei Neuwagen ist die vorsichtigere Einstufung richtig.
 */
import type { Listing } from '../../src/lib/stock-schema.ts';
import type { DealerListing } from './sources/autoscout24.ts';
import { normMake } from './lifecycle.ts';
import { mapBody, norm } from './enums.ts';

/** „X7" und „X7 M" gelten als dasselbe Modell (Präfix an Wortgrenze). */
function sameModel(a: string, b: string): boolean {
  const x = norm(a);
  const y = norm(b);
  return x === y || x.startsWith(`${y} `) || y.startsWith(`${x} `);
}

export function matchDealer(l: Listing, dealer: DealerListing[]): DealerListing | undefined {
  return dealer.find(
    (d) =>
      normMake(d.make) === normMake(l.make) &&
      sameModel(d.model, l.model) &&
      d.mileageKm != null &&
      Math.abs(d.mileageKm - l.mileageKm) <= 500 &&
      d.priceEur != null &&
      Math.abs(d.priceEur - l.priceEur) <= l.priceEur * 0.05,
  );
}

export function crossCheck(listings: Listing[], dealer: DealerListing[]): { listings: Listing[]; warnings: string[] } {
  const warnings: string[] = [];
  if (dealer.length !== listings.length) {
    warnings.push(`Anzahl weicht ab: LuxAuto ${listings.length}, AutoScout24 ${dealer.length}`);
  }
  const out = listings.map((original) => {
    let l = original;
    const d = matchDealer(l, dealer);
    if (!d) {
      warnings.push(`${l.stableId} (${l.make} ${l.model}) nicht auf AutoScout24 gefunden`);
      return l;
    }
    if (l.body === 'other') {
      const b = mapBody(d.bodyRaw);
      if (b.known) {
        warnings.push(`${l.stableId}: Karosserie „${l.bodyRaw ?? ''}" von LuxAuto unbrauchbar, von AutoScout24 übernommen („${b.raw}")`);
        l = { ...l, body: b.value, bodyRaw: undefined };
      }
    }
    if (d.isNew && l.condition === 'used') {
      warnings.push(`${l.stableId}: AutoScout24 meldet Neuwagen, LuxAuto nicht – als Neuwagen übernommen`);
      return { ...l, condition: 'new' as const, firstRegistration: null };
    }
    if (!d.isNew && l.condition === 'new') {
      warnings.push(`${l.stableId}: LuxAuto meldet Neuwagen, AutoScout24 nicht – bitte prüfen`);
    }
    return l;
  });
  return { listings: out, warnings };
}
