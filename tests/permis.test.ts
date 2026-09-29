import { describe, expect, it } from 'vitest';
import { assessTrailer, assessVan, fits, requiredLicence } from '../src/lib/permis.ts';
import { packPallets } from '../src/lib/pallets.ts';
import { cargoOptions, evaluate, type FleetItem } from '../src/lib/fleet.ts';

describe('Nötiger Führerschein – Grenzfälle', () => {
  it.each([
    // [Anhänger mma, F.2 des Autos, erwartet]
    [750, undefined, 'B'],
    [750, 3000, 'B'],
    [751, undefined, 'depends'],
    [751, 2749, 'B'], // Summe 3 500
    [751, 2750, 'B96'], // Summe 3 501
    [751, 3499, 'B96'], // Summe 4 250
    [751, 3500, 'BE'], // Summe 4 251
    [1500, 2000, 'B'], // 3 500
    [1500, 2001, 'B96'], // 3 501
    [1500, 2750, 'B96'], // 4 250
    [1500, 2751, 'BE'], // 4 251
    [3500, undefined, 'depends'],
    [3500, 1000, 'BE'],
    [3501, undefined, 'exceeds'],
    [3501, 1000, 'exceeds'],
  ] as const)('Anhänger %i kg, F.2 %s → %s', (mma, f2, want) => {
    const r = requiredLicence(mma, f2);
    expect(r.kind === 'licence' ? r.licence : r.kind).toBe(want);
  });

  it('ignoriert leere oder unsinnige F.2', () => {
    expect(requiredLicence(1000, 0).kind).toBe('depends');
    expect(requiredLicence(1000, Number.NaN).kind).toBe('depends');
    expect(requiredLicence(1000, null).kind).toBe('depends');
  });
});

describe('Aussage je nach Führerschein des Besuchers', () => {
  const light = { mmaKg: 750, braked: false };
  const heavy = { mmaKg: 2000, braked: true };

  it('B reicht für 750 kg', () => {
    expect(assessTrailer(light, 'B').verdict).toBe('ok');
  });
  it('ohne F.2: dépend bei B und B96, BE reicht immer', () => {
    expect(assessTrailer(heavy, 'B').verdict).toBe('dependsB');
    expect(assessTrailer(heavy, 'B96').verdict).toBe('dependsB96');
    expect(assessTrailer(heavy, 'BE').verdict).toBe('ok');
  });
  it('mit F.2: reicht nicht → passende Aussage', () => {
    expect(assessTrailer(heavy, 'B', { f2: 1800 }).verdict).toBe('needB96orBE'); // 3 800
    expect(assessTrailer(heavy, 'B', { f2: 2300 }).verdict).toBe('needBE'); // 4 300
    expect(assessTrailer(heavy, 'B96', { f2: 2300 }).verdict).toBe('needBE');
    expect(assessTrailer(heavy, 'B96', { f2: 2250 }).verdict).toBe('ok'); // 4 250
    expect(assessTrailer(heavy, 'B', { f2: 1500 }).verdict).toBe('ok'); // 3 500
  });
  it('Führerschein unbekannt: nur Info, kein Urteil', () => {
    const a = assessTrailer(heavy, 'unknown', { f2: 2300 });
    expect(a.verdict).toBe('info');
    expect(a.required).toEqual({ kind: 'licence', licence: 'BE' });
  });
});

describe('Anhängelast', () => {
  it('gebremst gilt O.1, ungebremst O.2', () => {
    expect(assessTrailer({ mmaKg: 2000, braked: true }, 'BE', { o1: 1800, o2: 750 }).towLimitKg).toBe(1800);
    expect(assessTrailer({ mmaKg: 750, braked: false }, 'B', { o1: 1800, o2: 700 }).towLimitKg).toBe(700);
  });
  it('überschritten: Hinweis und ganz nach unten sortiert, nicht ausgeblendet', () => {
    const a = assessTrailer({ mmaKg: 2000, braked: true }, 'BE', { o1: 1800 });
    expect(a.exceedsTowLimit).toBe(true);
    expect(a.group).toBe(3);
    expect(fits(a)).toBe(false);
  });
  it('genau an der Grenze ist erlaubt', () => {
    expect(assessTrailer({ mmaKg: 1800, braked: true }, 'BE', { o1: 1800 }).exceedsTowLimit).toBe(false);
  });
});

describe('Transporter', () => {
  it('bis 3 500 kg: Permis B', () => {
    expect(assessVan({ mmaKg: 3500 }, 'B').verdict).toBe('ok');
    expect(assessVan({ mmaKg: 3500 }, 'B').required).toEqual({ kind: 'licence', licence: 'B' });
    expect(assessVan({ mmaKg: 3501 }, 'B').required.kind).toBe('exceeds');
  });
});

describe('Europaletten', () => {
  it.each([
    [3.05, 1.55, 3], // zu schmal für zwei Paletten quer
    [2.5, 1.3, 3], // quer: 3 × 0,80 m längs, 1,20 m breit
    [4.0, 2.0, 8],
    [2.4, 1.6, 4],
    [1.2, 0.8, 1],
    [1.19, 0.8, 0],
    [3.0, 1.5, 3],
    [2.0, 1.2, 2],
  ])('%f × %f m → %i', (l, w, n) => {
    const r = packPallets(l, w);
    expect(r.count).toBe(n);
    for (const p of r.rects) {
      expect(p.x + p.w).toBeLessThanOrEqual(l + 1e-6);
      expect(p.y + p.h).toBeLessThanOrEqual(w + 1e-6);
    }
  });
});

const item = (over: Partial<FleetItem>): FleetItem => ({
  id: 'x',
  category: 'porte-voiture',
  name: 'x',
  brand: null,
  mmaKg: 750,
  emptyKg: null,
  payloadKg: 500,
  braked: false,
  loadLengthM: null,
  loadWidthM: null,
  loadHeightM: null,
  volumeM3: null,
  tempRange: null,
  power: null,
  socket: null,
  showPallets: false,
  suitableFor: ['voiture'],
  priceDay: null,
  priceWeekend: null,
  deposit: null,
  notes: null,
  photo: null,
  sample: false,
  ...over,
});

describe('Sortierung und Auswahl im Finder', () => {
  const fleet = [
    item({ id: 'big', mmaKg: 2700, braked: true, payloadKg: 2000 }),
    item({ id: 'small', mmaKg: 750, payloadKg: 450 }),
    item({ id: 'mid', mmaKg: 1300, braked: true, payloadKg: 900 }),
    item({ id: 'benne', category: 'benne', suitableFor: ['terre'], payloadKg: 500 }),
    item({ id: 'van', category: 'camionnette', mmaKg: 3500, payloadKg: 1200, suitableFor: ['meubles'] }),
    item({ id: 'toolarge', mmaKg: 3600, braked: true, payloadKg: 2800 }),
  ];

  it('passt zuerst, dann dépend, dann reicht nicht, dann Anhängelast; je Gruppe kleinste Nutzlast zuerst', () => {
    const e = evaluate(fleet, { cargo: 'voiture', licence: 'B', car: { f2: 2300, o1: 1200 } });
    // small: B (750). mid: 2300+1300=3600 → B96 → reicht nicht, aber Anhängelast 1300 > 1200 → Gruppe 3.
    // big: 2300+2700=5000 → BE → reicht nicht, Anhängelast 2700 > 1200 → Gruppe 3.
    expect(e.trailers.map((r) => r.item.id)).toEqual(['small', 'mid', 'big']);
  });

  it('ohne F.2 steht dépend vor „reicht nicht"', () => {
    const e = evaluate(fleet, { cargo: 'voiture', licence: 'B', car: {} });
    expect(e.trailers.map((r) => [r.item.id, r.assessment.verdict])).toEqual([
      ['small', 'ok'],
      ['mid', 'dependsB'],
      ['big', 'dependsB'],
    ]);
  });

  it('Anhänger über 3 500 kg erscheinen nicht', () => {
    const e = evaluate(fleet, { cargo: null, licence: null, car: {} });
    expect(e.trailers.some((r) => r.item.id === 'toolarge')).toBe(false);
  });

  it('bei Meubles ou cartons kommen die Transporter dazu', () => {
    expect(evaluate(fleet, { cargo: 'voiture', licence: 'B', car: {} }).vans).toHaveLength(0);
    expect(evaluate(fleet, { cargo: 'meubles', licence: 'B', car: {} }).vans.map((r) => r.item.id)).toEqual(['van']);
  });

  it('zeigt nur Ladungsarten, für die ein Fahrzeug passt', () => {
    expect(cargoOptions(fleet)).toEqual(['voiture', 'terre', 'meubles']);
  });
});
