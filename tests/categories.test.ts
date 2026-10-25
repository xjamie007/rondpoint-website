/** Eigene Arten (z. B. Food Truck), Anzahl Motorräder/Autos und Umschalter Anhänger/Transporter. */
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { CATEGORIES, ContentError, categoryErrors, cleanFleet, fleetErrors, toFiles, type CategoryItem, type EditState, type FleetData, type RepoSnapshot } from '../supabase/functions/publish/convert.ts';
import { categoryKind, categoryLabel } from '../src/lib/categories.ts';
import { evaluate, toFleetItem, type FleetSource } from '../src/lib/fleet.ts';
import { placeVehicles, vehicleCapacity } from '../src/lib/vehicles.ts';

const benne = JSON.parse(readFileSync('tests/fixtures/flotte/exemple-benne.json', 'utf8')) as FleetData;
const state = (x: Partial<EditState> = {}): EditState => ({ v: 1, texts: {}, lists: {}, photos: {}, ...x });
const repo = (x: Partial<RepoSnapshot> = {}): RepoSnapshot => ({ texts: {}, lists: {}, photos: {}, horaires: {}, files: [], ...x });
const food: CategoryItem = { id: 'food-truck', kind: 'trailer', label: { de: 'Food Truck', fr: 'Food truck' } };
const minibus: CategoryItem = { id: 'minibus', kind: 'van', label: { de: 'Minibus' } };

describe('Eigene Arten', () => {
  it('gültig nur, wenn bekannt (fest, im Repository oder im Inhalt)', () => {
    const d = { ...benne, category: 'food-truck' };
    expect(fleetErrors(d).category).toBe('required');
    expect(fleetErrors(d, ['food-truck']).category).toBeUndefined();
    expect(() => toFiles(state({ fleet: { ft: d } }), repo())).toThrow(ContentError);
    expect(toFiles(state({ fleet: { ft: d } }), repo({ categories: { items: [food] } })).files.map((f) => f.path)).toEqual(['src/content/flotte/ft.json']);
    expect(toFiles(state({ categories: [food], fleet: { ft: d } }), repo()).files.map((f) => f.path).sort()).toEqual(['src/content/categories.json', 'src/content/flotte/ft.json']);
  });
  it('Prüfung: keine festen Kennungen, keine doppelten, Name nötig, Anhänger oder Transporter', () => {
    expect(() => categoryErrors([{ ...food, id: 'benne' }])).toThrow(/Kennung/);
    expect(() => categoryErrors([food, food])).toThrow(/doppelte/);
    expect(() => categoryErrors([{ ...food, label: { de: ' ' } }])).toThrow(/Name fehlt/);
    expect(() => categoryErrors([{ ...food, kind: 'auto' as 'van' }])).toThrow(/Transporter/);
    expect(() => categoryErrors([food, minibus])).not.toThrow();
  });
  it('categories.json wird nur bei Änderung geschrieben, Kilometer bleiben bei eigenen Transportern', () => {
    expect(toFiles(state({ categories: [food] }), repo({ categories: { items: [food] } })).files).toEqual([]);
    const r = toFiles(state({ categories: [food, minibus] }), repo({ categories: { $comment: 'x', items: [food] } }));
    expect(JSON.parse(r.files[0].text!)).toEqual({ $comment: 'x', items: [food, minibus] });
    expect(r.summary).toContain('Arten');
    const bus = { ...benne, category: 'minibus', kmDay: 200 };
    expect(cleanFleet(bus, ['minibus']).kmDay).toBe(200);
    expect(cleanFleet(bus).kmDay).toBeNull();
  });
  it('Art und Name in der Website (Food Truck aus src/content/categories.json)', () => {
    expect(categoryKind('food-truck')).toBe('trailer');
    expect(categoryKind('camionnette')).toBe('van');
    expect(categoryKind('minibus', [minibus])).toBe('van');
    expect(categoryKind('voiture')).toBeNull();
    expect(categoryLabel('food-truck', 'de', {})).toBe('Food Truck');
    expect(categoryLabel('benne', 'de', { benne: 'Kipper' })).toBe('Kipper');
    expect(CATEGORIES).not.toContain('food-truck');
  });
});

describe('Motorräder und Autos auf dem Anhänger', () => {
  const moto: FleetSource = { ...(benne as FleetSource), category: 'porte-moto', loadLengthM: 2.5, loadWidthM: 1.56, payloadKg: 450, suitableFor: ['moto'] };
  const auto: FleetSource = { ...(benne as FleetSource), category: 'porte-voiture', loadLengthM: 4.0, loadWidthM: 1.8, payloadKg: 1360, suitableFor: ['voiture'] };
  it('Anzahl aus Ladefläche und Nutzlast (Richtwert), sonst wie im Admin-Bereich festgelegt', () => {
    expect(vehicleCapacity(toFleetItem('m', moto, 'de'))).toEqual({ n: 2, approx: true });
    expect(vehicleCapacity(toFleetItem('m', { ...moto, payloadKg: 300 }, 'de'))).toEqual({ n: 1, approx: false });
    expect(vehicleCapacity(toFleetItem('m', { ...moto, capacity: 3 }, 'de'))).toEqual({ n: 3, approx: false });
    expect(vehicleCapacity(toFleetItem('a', auto, 'de'))).toEqual({ n: 1, approx: false });
    expect(vehicleCapacity(toFleetItem('b', benne as FleetSource, 'de'))).toBeNull();
    // Kapazität nur bei Motorrad- und Autoanhängern
    expect(cleanFleet({ ...benne, capacity: 2 }).capacity).toBeNull();
    expect(cleanFleet({ ...(moto as FleetData), capacity: 2 }).capacity).toBe(2);
    expect(fleetErrors({ ...(moto as FleetData), capacity: 0 }).capacity).toBe('int');
  });
  it('Zeichnung: Fahrzeuge liegen auf der Ladefläche', () => {
    for (const r of [...placeVehicles('moto', 2.5, 1.56, 2, 2), ...placeVehicles('voiture', 4, 1.8, 1, 1)]) {
      expect(r.x).toBeGreaterThanOrEqual(0);
      expect(r.y).toBeGreaterThanOrEqual(0);
    }
    expect(placeVehicles('moto', 2.5, 1.56, 1, 2)).toHaveLength(1);
    expect(placeVehicles('moto', 2.5, 1.56, 5, 2)).toHaveLength(2);
  });
  it('Finder: bei 2 Motorrädern nur Anhänger, die 2 tragen', () => {
    const items = [toFleetItem('klein', { ...moto, payloadKg: 300 }, 'de'), toFleetItem('gross', moto, 'de')];
    const ids = (count: number | null) => evaluate(items, { cargo: 'moto', licence: null, car: { f2: null, o1: null, o2: null }, count }).trailers.map((r) => r.item.id);
    expect(ids(null)).toEqual(['klein', 'gross']);
    expect(ids(1)).toEqual(['klein', 'gross']);
    expect(ids(2)).toEqual(['gross']);
  });
  it('eigene Arten zählen als Anhänger bzw. Transporter', () => {
    const ft = toFleetItem('ft', { ...(benne as FleetSource), category: 'food-truck' }, 'de');
    const ev = evaluate([ft], { cargo: null, licence: null, car: { f2: null, o1: null, o2: null } });
    expect(ev.trailers.map((r) => r.item.id)).toEqual(['ft']);
  });
});
