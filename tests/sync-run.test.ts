/**
 * Simulation ganzer Abgleich-Läufe mit Fixtures statt Netz (T3):
 * normaler Lauf, verschwundenes Auto, kaputtes Fixture → Abbruch, Einbruch der Anzahl → Abbruch.
 */
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { runSync } from '../scripts/sync/index.ts';
import type { HttpClient } from '../scripts/sync/http.ts';
import type { StockFile, SyncStatus } from '../src/lib/stock-schema.ts';

const fx = (name: string) => readFileSync(new URL(`./fixtures/${name}`, import.meta.url), 'utf8');

const DETAILS: Record<string, string> = {
  '1930044': 'audi-a4-diesel-2024-1930044',
  '1931062': 'austin-healey-3000-essence-1966-1931062',
  '1916354': 'cupra-terramar-essence-2026-1916354',
};

function garagePage(ids: string[]): string {
  const links = ids.map((id) => `<a href="/fr/voiture/${DETAILS[id]}">x</a>`).join('');
  return `<html><body><h1>GARAGE UM ROND POINT</h1><p>sur ${ids.length} annonces</p>${links}</body></html>`;
}

class FixtureClient implements HttpClient {
  requestCount = 0;
  remaining = 80;
  constructor(private routes: (url: string) => { status: number; body: string }) {}
  async loadRobots() {}
  async getText(url: string) {
    this.requestCount++;
    this.remaining--;
    return this.routes(url);
  }
}

function routes(opts: { ids: string[]; brokenDetails?: boolean; as24Down?: boolean }) {
  return (url: string) => {
    const u = new URL(url);
    if (u.hostname === 'www.luxauto.lu') {
      if (u.pathname.startsWith('/fr/garage/')) return { status: 200, body: garagePage(opts.ids) };
      const id = u.pathname.match(/-(\d+)$/)?.[1];
      if (id && DETAILS[id]) {
        return { status: 200, body: opts.brokenDetails ? '<html><body><p>Neues Layout</p></body></html>' : fx(`luxauto-detail-${id}.html`) };
      }
    }
    if (u.hostname === 'www.autoscout24.lu') {
      if (opts.as24Down) return { status: 503, body: 'down' };
      if (u.pathname === '/professional/um-rond-point') return { status: 200, body: fx('autoscout-dealer.html') };
    }
    return { status: 404, body: 'not found' };
  };
}

const empty: StockFile = { vehicles: [] };
const neverStatus: SyncStatus = { lastSuccess: null, lastRun: null, status: 'never', source: null, count: 0, warnings: [] };
const log = () => {};

describe('Abgleich-Lauf mit Fixtures', () => {
  it('normaler Lauf: drei Autos, Status ok', async () => {
    const out = await runSync({
      client: new FixtureClient(routes({ ids: ['1930044', '1931062', '1916354'] })),
      previous: empty,
      previousStatus: neverStatus,
      overrides: {},
      now: new Date('2026-09-28T04:17:00Z'),
      log,
    });
    expect(out.code).toBe(0);
    expect(out.stock!.vehicles.map((v) => v.stableId).sort()).toEqual(['r139035', 'r141306', 'r141522']);
    expect(out.status.status).toBe('ok');
    expect(out.status.count).toBe(3);
    expect(out.status.warnings.some((w) => w.includes('Neuwagen ohne WLTP') && w.includes('r139035'))).toBe(true);
  });

  it('ein Auto verschwindet: unavailable, Seite bleibt', async () => {
    const first = await runSync({
      client: new FixtureClient(routes({ ids: ['1930044', '1931062', '1916354'] })),
      previous: empty,
      previousStatus: neverStatus,
      overrides: {},
      now: new Date('2026-09-28T04:17:00Z'),
      log,
      crossCheck: false,
    });
    const second = await runSync({
      client: new FixtureClient(routes({ ids: ['1930044', '1916354'] })),
      previous: first.stock!,
      previousStatus: first.status,
      overrides: {},
      now: new Date('2026-09-29T04:17:00Z'),
      log,
      crossCheck: false,
    });
    expect(second.code).toBe(0);
    const healey = second.stock!.vehicles.find((v) => v.stableId === 'r141522')!;
    expect(healey.status).toBe('unavailable');
    expect(healey.unavailableSince).toBe('2026-09-29');
    expect(second.report).toMatch(/nicht mehr verfügbar \| 1 \| r141522/);
  });

  it('kaputtes Fixture: Abbruch, stock.json unverändert, Status error mit Grund', async () => {
    const out = await runSync({
      client: new FixtureClient(routes({ ids: ['1930044', '1931062', '1916354'], brokenDetails: true, as24Down: true })),
      previous: empty,
      previousStatus: { ...neverStatus, lastSuccess: '2026-09-27T04:17:00Z', status: 'ok', count: 3 },
      overrides: {},
      now: new Date('2026-09-28T04:17:00Z'),
      log,
    });
    expect(out.code).toBe(1);
    expect(out.stock).toBeNull();
    expect(out.status.status).toBe('error');
    expect(out.status.lastSuccess).toBe('2026-09-27T04:17:00Z');
    expect(out.status.error).toMatch(/luxauto: GuardError/);
    expect(out.report).toMatch(/Bestand-Sync fehlgeschlagen/);
  });

  it('Anzahl fällt um mehr als 50 %: Abbruch', async () => {
    const big = await runSync({
      client: new FixtureClient(routes({ ids: ['1930044', '1931062', '1916354'] })),
      previous: empty,
      previousStatus: neverStatus,
      overrides: {},
      now: new Date('2026-09-28T04:17:00Z'),
      log,
      crossCheck: false,
    });
    // künstlich 8 aktive Autos im alten Stand
    const previous: StockFile = {
      vehicles: [
        ...big.stock!.vehicles,
        ...Array.from({ length: 5 }, (_, i) => ({ ...big.stock!.vehicles[0], stableId: `r90000${i}`, slug: `x-${i}` })),
      ],
    };
    const out = await runSync({
      client: new FixtureClient(routes({ ids: ['1930044'], as24Down: true })),
      previous,
      previousStatus: big.status,
      overrides: {},
      now: new Date('2026-09-29T04:17:00Z'),
      log,
    });
    expect(out.code).toBe(1);
    expect(out.status.error).toMatch(/fällt von 8 auf 1/);
  });
});
