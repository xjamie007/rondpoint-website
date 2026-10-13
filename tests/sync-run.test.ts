/**
 * Simulation ganzer Abgleich-Läufe mit einer nachgebildeten MovingCar-API statt Netz (T3):
 * normaler Lauf, verschwundenes Auto, abgelehnte Anmeldung → Abbruch, Einbruch der Anzahl → Abbruch.
 */
import { describe, expect, it } from 'vitest';
import { runSync } from '../scripts/sync/index.ts';
import { movingCarAdapter, MovingCarError, type JsonFetcher } from '../scripts/sync/sources/movingcar.ts';
import type { HttpClient } from '../scripts/sync/http.ts';
import type { StockFile, SyncStatus } from '../src/lib/stock-schema.ts';

const CARS: Record<string, Record<string, string>> = {
  '141306': { marque: 'Audi', modele: 'A4', type: 'Avant 2.0L TDI', type_vehicule: 'occasion', immat: '06-06-2024', km: '61370', prix: '29280', carburant: 'diesel', transmission: 'automatique', id_categorie: '3' },
  '141522': { marque: 'Austin-Healey', modele: '3000', type: 'MK III', type_vehicule: 'occasion', immat: '07-01-1966', km: '82264', prix: '34900', carburant: 'essence', transmission: 'manuelle', id_categorie: '4' },
  '139035': { marque: 'Cupra', modele: 'Terramar', type: 'VZ 2.0 TSI', type_vehicule: 'neuf', immat: '01-10-2026', km: '10', prix: '42870', carburant: 'essence', transmission: 'automatique', id_categorie: '7' },
};
const annonce = (id: string) => ({ id, reference_interne: '', statut: 'en-ligne', id_vehicule: '1', tva: 'non', photos: [`https://webfiles.movingcar.lu/annonces/1600x1200/${id}-a.jpg`], ...CARS[id] });

/** nachgebildete API: Liste der gegebenen IDs, Details je Auto */
const api =
  (ids: string[]): JsonFetcher =>
  async (url) => {
    if (url.includes('/annonces/')) return { _data: { nbannonces: String(ids.length), annonces: ids.map(annonce) } };
    const id = new URL(url).searchParams.get('id')!;
    return { _data: { annonce: { ...annonce(id), equipements_fr: ['Isofix'] } } };
  };
const denied: JsonFetcher = async () => {
  throw new MovingCarError('Anmeldung nicht akzeptiert („Authentification requise“)');
};
const cfg = { key: 'k', auth: 'basic', partnerId: null, vehicles: '1_3' };
const client = { requestCount: 0, remaining: 0, loadRobots: async () => {}, getText: async () => ({ status: 404, body: '' }) } as HttpClient;

const empty: StockFile = { vehicles: [] };
const neverStatus: SyncStatus = { lastSuccess: null, lastRun: null, status: 'never', source: null, count: 0, warnings: [] };
const log = () => {};
const run = (fetcher: JsonFetcher, previous: StockFile, previousStatus: SyncStatus, day: string) =>
  runSync({ client, previous, previousStatus, overrides: {}, now: new Date(`${day}T04:17:00Z`), log, adapters: [movingCarAdapter(cfg, fetcher)] });

describe('Abgleich-Lauf mit MovingCar', () => {
  it('normaler Lauf: drei Autos, Status ok, Quelle movingcar', async () => {
    const out = await run(api(['141306', '141522', '139035']), empty, neverStatus, '2026-10-13');
    expect(out.code).toBe(0);
    expect(out.stock!.vehicles.map((v) => v.stableId).sort()).toEqual(['r139035', 'r141306', 'r141522']);
    expect(out.status).toMatchObject({ status: 'ok', source: 'movingcar', count: 3 });
    expect(out.status.warnings.some((w) => w.includes('Neuwagen ohne WLTP') && w.includes('r139035'))).toBe(true);
    expect(out.stock!.vehicles.find((v) => v.stableId === 'r139035')!.firstRegistration).toBeNull();
  });

  it('ein Auto verschwindet: unavailable, Seite bleibt', async () => {
    const first = await run(api(['141306', '141522', '139035']), empty, neverStatus, '2026-10-13');
    const second = await run(api(['141306', '139035']), first.stock!, first.status, '2026-10-14');
    expect(second.code).toBe(0);
    const healey = second.stock!.vehicles.find((v) => v.stableId === 'r141522')!;
    expect(healey.status).toBe('unavailable');
    expect(healey.unavailableSince).toBe('2026-10-14');
    expect(second.report).toMatch(/nicht mehr verfügbar \| 1 \| r141522/);
  });

  it('Anmeldung abgelehnt: Abbruch, stock.json unverändert, Status error mit Grund', async () => {
    const out = await run(denied, empty, { ...neverStatus, lastSuccess: '2026-10-12T04:17:00Z', status: 'ok', count: 3 }, '2026-10-13');
    expect(out.code).toBe(1);
    expect(out.stock).toBeNull();
    expect(out.status.status).toBe('error');
    expect(out.status.lastSuccess).toBe('2026-10-12T04:17:00Z');
    expect(out.status.error).toMatch(/movingcar: MovingCarError – Anmeldung/);
    expect(out.report).toMatch(/Bestand-Sync fehlgeschlagen/);
  });

  it('Anzahl fällt um mehr als 50 %: Abbruch', async () => {
    const big = await run(api(['141306', '141522', '139035']), empty, neverStatus, '2026-10-13');
    const previous: StockFile = {
      vehicles: [...big.stock!.vehicles, ...Array.from({ length: 5 }, (_, i) => ({ ...big.stock!.vehicles[0], stableId: `r90000${i}`, slug: `x-${i}` }))],
    };
    const out = await run(api(['141306']), previous, big.status, '2026-10-14');
    expect(out.code).toBe(1);
    expect(out.status.error).toMatch(/fällt von 8 auf 1/);
  });
});
