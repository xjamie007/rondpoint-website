import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { euroLabel, fetchMovingCar, mapAnnonce, mcMonth, movingCarConfigFromEnv, MovingCarError, type JsonFetcher } from '../scripts/sync/sources/movingcar.ts';
import { defaultAdapters } from '../scripts/sync/index.ts';

const fx = (f: string) => JSON.parse(readFileSync(`tests/fixtures/movingcar/${f}`, 'utf8'));
const cfg = { key: 'k', auth: 'bearer', partnerId: null, vehicles: '1_3' };

/** simulierte API: Liste + Details 111, andere Details fehlen */
const fakeApi = (calls: string[] = []): JsonFetcher => async (url) => {
  calls.push(url);
  if (url.includes('/fr/annonces/')) return fx('annonces.json');
  if (url.includes('/fr/annonce/?id=111')) return fx('annonce-111.json');
  return { _data: { annonce: null } };
};

describe('MovingCar: Konfiguration', () => {
  it('ohne Schlüssel keine MovingCar-Quelle, sonst nur MovingCar', () => {
    expect(movingCarConfigFromEnv({})).toBeNull();
    expect(defaultAdapters({}).map((a) => a.name)).toEqual(['luxauto', 'autoscout24']);
    expect(defaultAdapters({ MOVINGCAR_API_KEY: 'x' }).map((a) => a.name)).toEqual(['movingcar']);
    expect(movingCarConfigFromEnv({ MOVINGCAR_API_KEY: ' x ', MOVINGCAR_AUTH: 'header:X-Api-Key', MOVINGCAR_PARTNER_ID: '77' })).toEqual({ key: 'x', auth: 'header:X-Api-Key', partnerId: '77', vehicles: '1_3' });
  });
});

describe('MovingCar: Umwandlung', () => {
  it('Hilfen', () => {
    expect(mcMonth('06-11-2017')).toBe('2017-11');
    expect(mcMonth('')).toBeNull();
    expect(euroLabel('euro-6d-temp')).toBe('Euro 6d-TEMP');
  });
  it('Inserat mit Details: alle Felder', () => {
    const list = fx('annonces.json')._data.annonces[0];
    const { listing } = mapAnnonce(list, fx('annonce-111.json')._data.annonce);
    expect(listing).toMatchObject({
      stableId: 'r141314',
      source: 'movingcar',
      garageRef: '141314',
      make: 'Renault',
      model: 'Clio',
      condition: 'used',
      firstRegistration: '2017-11',
      mileageKm: 15000,
      fuel: 'diesel',
      transmission: 'manual',
      powerHp: 90,
      powerKw: 66,
      displacementCc: 1461,
      body: 'city',
      seats: 5,
      co2Gkm: 122,
      wltpConsumption: '4,8 l/100 km',
      euroNorm: 'Euro 6d-TEMP',
      priceEur: 16000,
      vatRecoverable: true,
      options: ['Climatisation automatique', 'Isofix', 'Régulateur de vitesse'],
    });
    expect(listing!.photos[0]).toEqual({ url: 'https://webfiles.movingcar.lu/annonces/1600x1200/111-a.jpg', width: 1600, height: 1200 });
    // HTML wird zu Text, „Réf interne“ verschwindet
    expect(listing!.description).toEqual([
      { kind: 'p', text: 'Véhicule collaborateur, kilométrage évolutif.' },
      { kind: 'ul', items: ["Carnet d'entretien", '2 clés'] },
    ]);
  });
  it('Neuwagen ohne Referenz → mc-Kennung, Hybrid, SUV', () => {
    const { listing } = mapAnnonce(fx('annonces.json')._data.annonces[1], null);
    expect(listing).toMatchObject({ stableId: 'mc334', condition: 'new', firstRegistration: null, fuel: 'hybrid', transmission: 'automatic', body: 'suv', garageRef: null });
  });
  it('ohne Preis ungültig', () => {
    const m = mapAnnonce(fx('annonces.json')._data.annonces[2], null);
    expect(m.listing).toBeNull();
    expect(m.invalid).toMatch(/Preis/);
  });
});

describe('MovingCar: ganzer Abruf', () => {
  it('Liste, Details, ungültige Inserate getrennt', async () => {
    const calls: string[] = [];
    const r = await fetchMovingCar(cfg, fakeApi(calls), () => {});
    expect(r.source).toBe('movingcar');
    expect(r.found).toBe(3);
    expect(r.listings.map((l) => l.stableId)).toEqual(['r141314', 'mc334']);
    expect(r.invalid).toHaveLength(1);
    expect(calls[0]).toContain('statut=en-ligne_reserve');
    expect(calls[0]).toContain('v_id=1_3');
    expect(calls[0]).toContain('dim_photos=1600x1200');
  });
  it('abgelehnte Anmeldung bricht ab (Bestand bleibt unverändert)', async () => {
    const denied: JsonFetcher = async () => {
      throw new MovingCarError('Anmeldung nicht akzeptiert („Authentification requise“)');
    };
    await expect(fetchMovingCar(cfg, denied, () => {})).rejects.toThrow(/Anmeldung/);
  });
});
