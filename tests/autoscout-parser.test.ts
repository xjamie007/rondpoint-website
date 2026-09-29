import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { parseDealerPage, parseDetailPage } from '../scripts/sync/sources/autoscout24.ts';

const fx = (name: string) => readFileSync(new URL(`./fixtures/${name}`, import.meta.url), 'utf8');

describe('AutoScout24 Händlerseite', () => {
  const page = parseDealerPage(fx('autoscout-dealer.html'));
  it('findet dieselben 10 Autos', () => {
    expect(page.listings).toHaveLength(10);
    expect(page.numberOfResults).toBe(10);
  });
  it('erkennt Neuwagen', () => {
    expect(page.listings.filter((l) => l.isNew)).toHaveLength(5);
    const a4 = page.listings.find((l) => l.model === 'A4');
    expect(a4?.isNew).toBe(false);
    expect(a4?.firstRegistration).toBe('2024-06');
  });
});

describe('AutoScout24 Referenzinserat (Audi A4 Avant)', () => {
  const url =
    'https://www.autoscout24.lu/offres/audi-a4-avant-2-0l-tdi-diesel-gris-cat_ma9mo1626-af87628c-b8e7-459c-8eb9-1c762e04aa6a';
  const { listing: l } = parseDetailPage(fx('autoscout-detail-af87628c.html'), url);

  it('liefert dieselbe stabile Kennung wie LuxAuto', () => {
    expect(l.garageRef).toBe('141306');
    expect(l.stableId).toBe('r141306');
  });

  it('liest die Kerndaten', () => {
    expect(l.make).toBe('Audi');
    expect(l.model).toBe('A4');
    expect(l.version).toBe('AVANT 2.0L TDI');
    expect(l.firstRegistration).toBe('2024-06');
    expect(l.mileageKm).toBe(61370);
    expect(l.priceEur).toBe(29280);
    expect(l.fuel).toBe('diesel');
    expect(l.transmission).toBe('automatic');
    expect(l.body).toBe('estate');
    expect(l.powerKw).toBe(120);
    expect(l.powerHp).toBe(163);
    expect(l.displacementCc).toBe(1968);
    expect(l.seats).toBe(5);
    expect(l.condition).toBe('used');
  });

  it('nimmt große Fotos', () => {
    expect(l.photos.length).toBeGreaterThan(10);
    expect(l.photos[0].url).toMatch(/\/1920x1440\.webp$/);
  });
});

describe('AutoScout24 Neuwagen (Cupra Terramar)', () => {
  const url = 'https://www.autoscout24.lu/offres/cupra-terramar-5846cc07-9a08-4db5-9323-b0c5a4a25a7f';
  const { listing: l } = parseDetailPage(fx('autoscout-detail-5846cc07.html'), url);
  it('erkennt den Neuwagen ohne Erstzulassung', () => {
    expect(l.condition).toBe('new');
    expect(l.firstRegistration).toBeNull();
  });
  it('übernimmt kein HTML aus der Beschreibung', () => {
    const flat = JSON.stringify(l.description);
    expect(flat).not.toMatch(/<[a-z/][^>]*>/i);
    expect(l.description.some((b) => b.kind === 'ul')).toBe(true);
  });
});
