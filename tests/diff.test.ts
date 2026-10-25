/** Was beim Speichern (Cloudflare/Supabase) gesendet wird: nur Geändertes, Zurückgenommenes ausdrücklich. */
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { diffForPublish, emptyEdit, type Baked } from '../src/edit/diff.ts';
import type { EditState, FleetData } from '../supabase/functions/publish/convert.ts';

const week = JSON.parse(readFileSync('tests/fixtures/horaires.json', 'utf8')).week;
const benne = JSON.parse(readFileSync('tests/fixtures/flotte/exemple-benne.json', 'utf8')) as FleetData;
const baked: Baked = {
  texts: () => ({ 'hero.h1': 'Die Garage', 'nav.home': 'Start­seite' }),
  list: () => ['Eins', 'Zwei'],
  week,
  cargo: [{ id: 'voiture' }, { id: 'moto' }],
  categories: [],
  fleet: (id) => (id === 'exemple-benne' ? benne : undefined),
};
const st = (x: Partial<EditState> = {}): EditState => ({ ...emptyEdit(), ...x });

describe('Speichern: nur Änderungen seit dem letzten Speichern', () => {
  it('Anhänger löschen wird gesendet (null), auch wenn vorher nichts geändert war', () => {
    expect(diffForPublish(st({ fleet: { 'exemple-benne': null } }), st(), baked).fleet).toEqual({ 'exemple-benne': null });
  });
  it('Löschen zurückgenommen nach dem Speichern → wieder der gebaute Stand; neu angelegt und verworfen → löschen', () => {
    const prev = st({ fleet: { 'exemple-benne': null, neu: { ...benne, name: { fr: 'Neu' } } } });
    expect(diffForPublish(st(), prev, baked).fleet).toEqual({ 'exemple-benne': benne, neu: null });
  });
  it('schon gespeicherte, unveränderte Werte werden nicht erneut gesendet', () => {
    const prev = st({ texts: { de: { 'hero.h1': 'Neu' } }, hours: { ...week, sa: [] } });
    expect(diffForPublish(prev, prev, baked)).toEqual(emptyEdit());
  });
  it('Text zurück auf Original → Text der Seite (ohne weiche Trennstriche), Zeiten zurück → wie gebaut', () => {
    const prev = st({ texts: { de: { 'nav.home': 'Home' } }, hours: { ...week, sa: [] } });
    const out = diffForPublish(st(), prev, baked);
    expect(out.texts).toEqual({ de: { 'nav.home': 'Startseite' } });
    expect(out.hours).toEqual(week);
  });
  it('Ladungsarten: geändert und zurückgenommen', () => {
    const cargo = [{ id: 'moto' }, { id: 'velo', label: { de: 'Ein Fahrrad' } }];
    expect(diffForPublish(st({ cargo }), st(), baked).cargo).toEqual(cargo);
    expect(diffForPublish(st(), st({ cargo }), baked).cargo).toEqual(baked.cargo);
  });
  it('Foto wieder anzeigen nach dem Speichern → hidden: false', () => {
    expect(diffForPublish(st(), st({ photos: { about: { hidden: true } } }), baked).photos).toEqual({ about: { hidden: false } });
  });
});
