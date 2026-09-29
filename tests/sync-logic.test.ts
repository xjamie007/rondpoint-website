import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { mergeStock, vehicleSlug, REMOVE_AFTER_DAYS } from '../scripts/sync/lifecycle.ts';
import { guardReason } from '../scripts/sync/guards.ts';
import { hpToKw, mapBody, mapFuel, mapTransmission } from '../scripts/sync/enums.ts';
import { cleanDescription } from '../scripts/sync/text.ts';
import { isAllowed } from '../scripts/sync/robots.ts';
import { crossCheck } from '../scripts/sync/crosscheck.ts';
import type { Listing, Vehicle } from '../src/lib/stock-schema.ts';

const base: Listing = {
  stableId: 'r141306',
  source: 'luxauto',
  sourceId: '1930044',
  sourceUrl: 'https://www.luxauto.lu/fr/voiture/audi-a4-diesel-2024-1930044',
  make: 'Audi',
  model: 'A4',
  version: 'AVANT 2.0L TDI',
  condition: 'used',
  firstRegistration: '2024-06',
  modelYear: 2024,
  mileageKm: 61370,
  fuel: 'diesel',
  transmission: 'automatic',
  powerHp: 163,
  powerKw: 120,
  displacementCc: 1968,
  body: 'estate',
  seats: 5,
  colorExterior: 'Gris',
  colorInterior: 'Noir',
  co2Gkm: null,
  wltpConsumption: null,
  euroNorm: null,
  priceEur: 29280,
  vatRecoverable: false,
  options: ['ABS'],
  description: [],
  photos: [{ url: 'https://static.prd.luxauto.lu/pictures/occasions/x/1_a.jpg' }],
  garageRef: '141306',
};

const other: Listing = {
  ...base,
  stableId: 'r141522',
  sourceId: '1931062',
  garageRef: '141522',
  make: 'Austin-Healey',
  model: '3000',
  firstRegistration: '1966-01',
  mileageKm: 82264,
  priceEur: 34900,
};

describe('Slug', () => {
  it('ist {marque}-{modele}-{annee}-{stableId}, klein und ASCII', () => {
    expect(vehicleSlug(base)).toBe('audi-a4-2024-r141306');
    expect(vehicleSlug(other)).toBe('austin-healey-3000-1966-r141522');
    expect(vehicleSlug({ ...base, make: 'Škoda', model: 'Citigo e iV', firstRegistration: null, modelYear: 2026 })).toBe(
      'skoda-citigo-e-iv-2026-r141306',
    );
  });
});

describe('Lebenslauf', () => {
  const day1 = '2026-09-28';

  it('neu: active, firstSeen heute', () => {
    const { vehicles, changes } = mergeStock([], [base], day1);
    expect(vehicles[0]).toMatchObject({ status: 'active', firstSeen: day1, slug: 'audi-a4-2024-r141306' });
    expect(changes.added).toEqual(['r141306']);
  });

  it('verschwindet: unavailable, unavailableSince heute, Seite bleibt', () => {
    const start = mergeStock([], [base, other], day1).vehicles;
    const { vehicles, changes } = mergeStock(start, [other], '2026-09-29');
    const a4 = vehicles.find((v) => v.stableId === 'r141306')!;
    expect(a4.status).toBe('unavailable');
    expect(a4.unavailableSince).toBe('2026-09-29');
    expect(changes.unavailable).toEqual(['r141306']);
  });

  it(`nach ${REMOVE_AFTER_DAYS} Tagen unavailable wird entfernt, vorher nicht`, () => {
    const start = mergeStock([], [base, other], day1).vehicles;
    let v = mergeStock(start, [other], '2026-09-29').vehicles;
    v = mergeStock(v, [other], '2026-10-12').vehicles; // 13 Tage
    expect(v.some((x) => x.stableId === 'r141306')).toBe(true);
    const r = mergeStock(v, [other], '2026-10-13'); // 14 Tage
    expect(r.vehicles.some((x) => x.stableId === 'r141306')).toBe(false);
    expect(r.changes.removed).toEqual(['r141306']);
  });

  it('taucht wieder auf: active unter derselben URL', () => {
    const start = mergeStock([], [base], day1).vehicles;
    const gone = mergeStock(start, [other], '2026-09-30').vehicles;
    const { vehicles, changes } = mergeStock(gone, [{ ...base, priceEur: 28900 }], '2026-10-03');
    const a4 = vehicles.find((x) => x.stableId === 'r141306')!;
    expect(a4.status).toBe('active');
    expect(a4.slug).toBe('audi-a4-2024-r141306');
    expect(a4.firstSeen).toBe(day1);
    expect(a4.unavailableSince).toBeNull();
    expect(changes.reappeared).toEqual(['r141306']);
  });

  it('Quellenwechsel ohne Ref: Zuordnung über Marke, Modell, Erstzulassung, km ± 500, Preis ± 5 %', () => {
    const start = mergeStock([], [base], day1).vehicles;
    const fromAs24: Listing = {
      ...base,
      source: 'autoscout24',
      sourceId: 'af87628c',
      stableId: 'asaf87628c',
      garageRef: null,
      mileageKm: base.mileageKm + 400,
      priceEur: Math.round(base.priceEur * 1.04),
    };
    const { vehicles, changes } = mergeStock(start, [fromAs24], '2026-09-29');
    expect(vehicles).toHaveLength(1);
    expect(vehicles[0].stableId).toBe('r141306');
    expect(vehicles[0].slug).toBe('audi-a4-2024-r141306');
    expect(changes.added).toEqual([]);
  });

  it('außerhalb der Toleranz ist es ein anderes Auto', () => {
    const start = mergeStock([], [base], day1).vehicles;
    const different: Listing = { ...base, stableId: 'asx', garageRef: null, mileageKm: base.mileageKm + 600 };
    const { changes } = mergeStock(start, [different], '2026-09-29');
    expect(changes.added).toEqual(['asx']);
    expect(changes.unavailable).toEqual(['r141306']);
  });

  it('unveränderte Daten ändern lastChanged nicht', () => {
    const start = mergeStock([], [base], day1).vehicles;
    const { vehicles, changes } = mergeStock(start, [base], '2026-09-29');
    expect(vehicles[0].lastChanged).toBe(day1);
    expect(vehicles[0].lastSeen).toBe('2026-09-29');
    expect(changes.changed).toEqual([]);
  });
});

describe('Abbruchregeln', () => {
  it('0 Autos → Abbruch', () => {
    expect(guardReason({ previousCount: 10, valid: 0, invalid: 0 })).toMatch(/0 Autos/);
    expect(guardReason({ previousCount: 0, valid: 0, invalid: 0 })).toMatch(/0 Autos/);
  });
  it('mehr als 30 % ungültig → Abbruch, genau 30 % nicht', () => {
    expect(guardReason({ previousCount: 10, valid: 6, invalid: 4 })).toMatch(/ungültig/);
    expect(guardReason({ previousCount: 10, valid: 7, invalid: 3 })).toBeNull();
  });
  it('Rückgang um mehr als 50 % bei mindestens 4 alten Autos → Abbruch', () => {
    expect(guardReason({ previousCount: 10, valid: 4, invalid: 0 })).toMatch(/fällt/);
    expect(guardReason({ previousCount: 10, valid: 5, invalid: 0 })).toBeNull();
    expect(guardReason({ previousCount: 3, valid: 1, invalid: 0 })).toBeNull();
    expect(guardReason({ previousCount: 4, valid: 1, invalid: 0 })).toMatch(/fällt/);
  });
});

describe('Enum-Zuordnung', () => {
  it.each([
    ['Essence', 'petrol'],
    ['Diesel', 'diesel'],
    ['Hybride', 'hybrid'],
    ['Hybride rechargeable', 'plugin_hybrid'],
    ['Électrique', 'electric'],
    ['GPL', 'lpg'],
  ])('Kraftstoff %s → %s', (raw, want) => expect(mapFuel(raw).value).toBe(want));

  it.each([
    ['Automatique', 'automatic'],
    ['Manuelle', 'manual'],
    ['Boîte automatique', 'automatic'],
  ])('Getriebe %s → %s', (raw, want) => expect(mapTransmission(raw).value).toBe(want));

  it.each([
    ['Break', 'estate'],
    ['Berline', 'saloon'],
    ['SUV/4x4', 'suv'],
    ['Tout Terrain SUV', 'suv'],
    ['Citadine', 'city'],
    ['Coupé', 'coupe'],
    ['Cabriolet', 'convertible'],
    ['Monospace', 'mpv'],
    ['Utilitaire', 'van'],
    ['Pick-up', 'pickup'],
  ])('Karosserie %s → %s', (raw, want) => expect(mapBody(raw).value).toBe(want));

  it('unbekannte Werte → other mit Rohwert', () => {
    const m = mapBody('Corbillard');
    expect(m).toEqual({ value: 'other', raw: 'Corbillard', known: false });
  });

  it('kW = CV × 0,7355, gerundet', () => {
    expect(hpToKw(163)).toBe(120);
    expect(hpToKw(265)).toBe(195);
    expect(hpToKw(140)).toBe(103);
  });
});

describe('Beschreibung', () => {
  it('entfernt Finanzierungs-Teaser, Plaketten und Tracking-Nummern', () => {
    const blocks = cleanDescription([
      'PRIVILEGE',
      'Superbe état.',
      'Financez ce véhicule à partir de 445 € / mois',
      'Appelez le 27 94 04 49',
      '----------',
      'Ref Interne : 1',
    ]);
    expect(blocks).toEqual([{ kind: 'p', text: 'Superbe état.' }]);
  });
});

describe('robots.txt', () => {
  const lux = readFileSync(new URL('./fixtures/luxauto-robots.txt', import.meta.url), 'utf8');
  const as24 = readFileSync(new URL('./fixtures/autoscout-robots.txt', import.meta.url), 'utf8');
  it('LuxAuto erlaubt Garagen- und Inseratsseiten', () => {
    expect(isAllowed(lux, 'RondPointStockSync', '/fr/garage/garage-um-rond-point-450143')).toBe(true);
    expect(isAllowed(lux, 'RondPointStockSync', '/fr/voiture/audi-a4-diesel-2024-1930044')).toBe(true);
    expect(isAllowed(lux, 'RondPointStockSync', '/fr/financement')).toBe(false);
  });
  it('AutoScout24 erlaubt dem eigenen Bot die Händlerseite, sperrt aber KI-Crawler', () => {
    expect(isAllowed(as24, 'RondPointStockSync', '/professional/um-rond-point')).toBe(true);
    expect(isAllowed(as24, 'RondPointStockSync', '/offres/audi-a4-avant-af87628c')).toBe(true);
    expect(isAllowed(as24, 'RondPointStockSync', '/fr/professional/um-rond-point')).toBe(false);
    expect(isAllowed(as24, 'ClaudeBot', '/professional/um-rond-point')).toBe(false);
  });
});

describe('Vergleich mit AutoScout24', () => {
  it('übernimmt „neu", wenn AutoScout24 einen Neuwagen meldet', () => {
    const { listings, warnings } = crossCheck(
      [{ ...base, mileageKm: 10, firstRegistration: '2026-09' }],
      [
        {
          id: 'x',
          url: 'https://www.autoscout24.lu/offres/x',
          make: 'Audi',
          model: 'A4',
          version: '',
          mileageKm: 10,
          priceEur: 29280,
          firstRegistration: null,
          isNew: true,
          bodyRaw: 'Break',
        },
      ],
    );
    expect(listings[0].condition).toBe('new');
    expect(listings[0].firstRegistration).toBeNull();
    expect(warnings.join()).toMatch(/Neuwagen/);
  });
});

// Typcheck-Hilfe: Vehicle muss sich aus Listing ableiten lassen
const _v: Vehicle | undefined = undefined;
void _v;
