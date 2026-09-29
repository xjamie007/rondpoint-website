import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import {
  galleryPhotos,
  listingFeatures,
  parseDetailPage,
  parseGaragePage,
} from '../scripts/sync/sources/luxauto.ts';

const fx = (name: string) => readFileSync(new URL(`./fixtures/${name}`, import.meta.url), 'utf8');

describe('LuxAuto Garagenseite', () => {
  const page = parseGaragePage(fx('luxauto-garage.html'));

  it('findet alle 10 Inserate der Garage', () => {
    expect(page.listingUrls).toHaveLength(10);
    expect(page.listingUrls).toContain('https://www.luxauto.lu/fr/voiture/audi-a4-diesel-2024-1930044');
    expect(page.listingUrls.every((u) => /^https:\/\/www\.luxauto\.lu\/fr\/voiture\/[a-z0-9-]+-\d+$/.test(u))).toBe(true);
  });

  it('liest die angekündigte Anzahl und die Paginierung', () => {
    expect(page.announcedCount).toBe(10);
    expect(page.pageUrls.length).toBeGreaterThanOrEqual(1);
    expect(page.pageUrls.every((u) => u.includes('sellerId=450143'))).toBe(true);
  });
});

describe('LuxAuto Referenzinserat 1930044 (Audi A4 Avant)', () => {
  const url = 'https://www.luxauto.lu/fr/voiture/audi-a4-diesel-2024-1930044';
  const { listing: l, warnings } = parseDetailPage(fx('luxauto-detail-1930044.html'), url);

  it('liest Marke, Modell und Version', () => {
    expect(l.make).toBe('Audi');
    expect(l.model).toBe('A4');
    expect(l.version).toBe('AVANT 2.0L TDI');
  });

  it('liest Erstzulassung, Kilometer und Preis', () => {
    expect(l.firstRegistration).toBe('2024-06');
    expect(l.mileageKm).toBe(61370);
    expect(l.priceEur).toBe(29280);
    expect(l.condition).toBe('used');
  });

  it('ordnet Kraftstoff, Getriebe und Karosserie zu', () => {
    expect(l.fuel).toBe('diesel');
    expect(l.transmission).toBe('automatic');
    expect(l.body).toBe('estate');
  });

  it('rechnet 163 CV in 120 kW um und liest Hubraum und Plätze', () => {
    expect(l.powerHp).toBe(163);
    expect(l.powerKw).toBe(120);
    expect(l.displacementCc).toBe(1968);
    expect(l.seats).toBe(5);
  });

  it('liest Farben; leeres CO₂-Feld wird null', () => {
    expect(l.colorExterior).toBe('Gris');
    expect(l.colorInterior).toBe('Noir');
    expect(l.co2Gkm).toBeNull();
    expect(l.euroNorm).toBeNull();
  });

  it('nimmt „Ref Interne : 141306" als stabile Kennung', () => {
    expect(l.garageRef).toBe('141306');
    expect(l.stableId).toBe('r141306');
    expect(l.sourceId).toBe('1930044');
  });

  it('bereinigt die Beschreibung: keine Ref-Zeile, keine Trennlinie, Liste aus „•"', () => {
    const flat = JSON.stringify(l.description);
    expect(flat).not.toMatch(/Ref Interne/i);
    expect(flat).not.toMatch(/-{3,}/);
    expect(l.description[0]).toEqual({ kind: 'p', text: 'Options complémentaires / Additional options :' });
    const list = l.description.find((b) => b.kind === 'ul');
    expect(list && list.kind === 'ul' && list.items).toContain('Garantie 12 mois');
    expect(list && list.kind === 'ul' && list.items.length).toBe(20);
  });

  it('liest die Ausstattung', () => {
    expect(l.options).toContain('ABS');
    expect(l.options).toContain('Volant multifonctions');
    expect(l.options).not.toContain('AVANT 2.0L TDI');
  });

  it('nimmt nur die 16 Galerie-Fotos in der größten Variante', () => {
    expect(l.photos).toHaveLength(16);
    expect(l.photos[0].url).toBe('https://static.prd.luxauto.lu/pictures/occasions/x/1790259029_0QpBcXvIfQVKKc1k.jpg');
    expect(l.photos.every((p) => p.url.includes('/occasions/x/'))).toBe(true);
  });

  it('übernimmt keine Finanzierungs-Teaser und keine Tracking-Nummer', () => {
    const flat = JSON.stringify(l);
    expect(flat).not.toMatch(/Financez|€\/mois|par mois/i);
    expect(flat.replace(/\D/g, '')).not.toContain('27940449');
  });

  it('meldet keine Warnungen', () => {
    expect(warnings).toEqual([]);
  });
});

describe('LuxAuto Neuwagen (Cupra Terramar)', () => {
  const url = 'https://www.luxauto.lu/fr/voiture/cupra-terramar-essence-2026-1916354';
  const html = fx('luxauto-detail-1916354.html');
  const { listing: l } = parseDetailPage(html, url);

  it('erkennt „vehicule_neuf", obwohl das JSON-LD UsedCondition sagt', () => {
    expect(listingFeatures(html, 'cupra-terramar-essence-2026-1916354')).toContain('vehicule_neuf');
    expect(l.condition).toBe('new');
  });

  it('setzt bei Neuwagen keine Erstzulassung (LuxAuto zeigt dort das Einstelldatum)', () => {
    expect(l.firstRegistration).toBeNull();
    expect(l.modelYear).toBe(2026);
  });

  it('liest „TVA récupérable" und „Tout Terrain SUV"', () => {
    expect(l.vatRecoverable).toBe(true);
    expect(l.body).toBe('suv');
    expect(l.powerKw).toBe(Math.round(265 * 0.7355));
  });
});

describe('LuxAuto Oldtimer mit fehlerhaften Angaben (Austin-Healey 3000)', () => {
  const url = 'https://www.luxauto.lu/fr/voiture/austin-healey-3000-essence-1966-1931062';
  const { listing: l, warnings } = parseDetailPage(fx('luxauto-detail-1931062.html'), url);

  it('verwirft „1632 CV" und „21912 Cm³" als unplausibel und meldet es', () => {
    expect(l.powerHp).toBeNull();
    expect(l.powerKw).toBeNull();
    expect(l.displacementCc).toBeNull();
    expect(warnings.some((w) => w.includes('Leistung') && w.includes('1632'))).toBe(true);
    expect(warnings.some((w) => w.includes('Hubraum') && w.includes('21912'))).toBe(true);
  });

  it('behält das Auto mit den übrigen Daten', () => {
    expect(l.stableId).toBe('r141522');
    expect(l.firstRegistration).toBe('1966-01');
    expect(l.transmission).toBe('manual');
    expect(l.body).toBe('convertible');
    expect(l.version).toBe('MK III');
  });
});

describe('Fotos', () => {
  it('ignoriert Bilder der ähnlichen Fahrzeuge', () => {
    const photos = galleryPhotos(fx('luxauto-detail-1930044.html'));
    expect(photos.some((p) => p.includes('1790413660_hmizYJOMyKUYRFcp'))).toBe(false);
  });
});

describe('Nur Inserate dieser Garage', () => {
  it('lehnt ein Inserat eines anderen Verkäufers ab', () => {
    const html = fx('luxauto-detail-1930044.html').replace(/("name":\s*)"GARAGE UM ROND POINT"/g, '$1"AUTRE GARAGE"');
    expect(() => parseDetailPage(html, 'https://www.luxauto.lu/fr/voiture/audi-a4-diesel-2024-1930044')).toThrow(
      /gehört nicht zur Garage/,
    );
  });
});
