import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { GitHub } from '../src/admin/github.ts';
import { changes, cleanFleet, fleetErrors, hoursErrors, slugify, type Draft, type FleetData, type Horaires } from '../src/admin/model.ts';
import { applyOverrides, useT } from '../src/i18n/index.ts';
import fr from '../src/i18n/fr.ts';
import { hoursSummary } from '../src/lib/content.ts';

const CATS = ['porte-voiture', 'porte-moto', 'benne', 'frigorifique', 'plateau', 'fourgon', 'camionnette', 'voiture'];
const CARGO = ['voiture', 'moto', 'terre', 'fete', 'meubles', 'materiel'];
const dir = 'src/content/flotte/_dev';
const samples = readdirSync(dir).map((f) => JSON.parse(readFileSync(`${dir}/${f}`, 'utf8')) as FleetData);

describe('Dashboard: Prüfregeln der Flotte (wie src/content.config.ts)', () => {
  it('alle Beispiel-Fahrzeuge sind gültig', () => {
    for (const s of samples) expect(fleetErrors(s, CATS, CARGO)).toEqual({});
  });
  it('erkennt ungültige Eingaben', () => {
    const bad = { ...samples[0], name: { fr: ' ' }, mmaKg: 0, payloadKg: 900, loadWidthM: 3.5, socket: 9 as 7, category: 'x' };
    const e = fleetErrors(bad, CATS, CARGO);
    expect(Object.keys(e).sort()).toEqual(['category', 'loadWidthM', 'mmaKg', 'name.fr', 'socket'].sort());
    expect(fleetErrors({ ...samples[0], mmaKg: 750, payloadKg: 900 }, CATS, CARGO).payloadKg).toBe('payload');
  });
  it('cleanFleet setzt leere optionale Texte auf null', () => {
    const c = cleanFleet({ ...samples[0], brand: '  ', notes: { fr: '' }, name: { fr: ' Benne ', de: '' } });
    expect(c.brand).toBeNull();
    expect(c.notes).toBeNull();
    expect(c.name).toEqual({ fr: 'Benne' });
  });
  it('slugify für Dateinamen', () => {
    expect(slugify('Remorque frigorifique 1,3 t (été)')).toBe('remorque-frigorifique-1-3-t-ete');
  });
});

describe('Dashboard: Öffnungszeiten', () => {
  const h: Horaires = JSON.parse(readFileSync('src/content/horaires.json', 'utf8'));
  it('gültige Zeiten ohne Fehler', () => expect(hoursErrors(h)).toEqual({}));
  it('Fehler bei falscher Reihenfolge und Überschneidung', () => {
    const x = structuredClone(h);
    x.week.mo = [['12:00', '08:00']];
    x.week.tu = [['08:00', '13:00'], ['12:00', '18:00']];
    expect(hoursErrors(x)).toEqual({ mo: 'order', tu: 'overlap' });
  });
  it('Zusammenfassung gruppiert gleiche Tage', () => {
    expect(hoursSummary(useT('de'), 'de')).toBe('Montag – Freitag: 07:45–12:00 und 13:00–18:00 · Samstag: 08:00–12:00 · Sonntag: geschlossen');
  });
});

describe('Dashboard: Änderungen → Dateien', () => {
  const base = (): Draft => ({
    site: JSON.parse(readFileSync('src/content/site.json', 'utf8')),
    horaires: JSON.parse(readFileSync('src/content/horaires.json', 'utf8')),
    texts: JSON.parse(readFileSync('src/content/texts.json', 'utf8')),
    fleet: [{ path: 'src/content/flotte/_dev/exemple-benne.json', data: samples[0], preview: null }],
    uploads: {},
    deletes: [],
  });
  it('nichts geändert → keine Dateien', () => expect(changes(base(), base())).toEqual([]));
  it('erkennt Stammdaten, Flotte, Fotos und Löschungen', () => {
    const o = base();
    const d = base();
    d.site.notice.active = true;
    d.fleet = [{ path: 'src/content/flotte/plateau.json', data: { ...samples[0], sample: false }, preview: null }];
    d.uploads['src/assets/photos/about.jpg'] = { dataUrl: 'data:', base64: 'AAA' };
    d.deletes.push('src/assets/photos/rental.jpg');
    const files = changes(o, d);
    expect(files.map((f) => f.path).sort()).toEqual(
      ['src/assets/photos/about.jpg', 'src/assets/photos/rental.jpg', 'src/content/flotte/_dev/exemple-benne.json', 'src/content/flotte/plateau.json', 'src/content/site.json'].sort(),
    );
    expect(files.find((f) => f.path.endsWith('exemple-benne.json'))?.delete).toBe(true);
    expect(JSON.parse(files.find((f) => f.path.endsWith('site.json'))!.text!).notice.active).toBe(true);
  });
});

describe('Texte aus dem Dashboard (texts.json)', () => {
  it('überschreibt vorhandene Schlüssel, auch in Listen', () => {
    const out = applyOverrides(fr, { 'hero.h1': 'Neu', 'details.points.workshop.0': 'Punkt', 'gibt.es.nicht': 'x' });
    expect(out.hero.h1).toBe('Neu');
    expect(out.details.points.workshop[0]).toBe('Punkt');
    expect((out as unknown as Record<string, unknown>).gibt).toBeUndefined();
    expect(fr.hero.h1).not.toBe('Neu');
  });
});

describe('GitHub-Speichern (mit simulierter API)', () => {
  function fakeApi(conflicts = 0) {
    const calls: string[] = [];
    let left = conflicts;
    const f = async (url: string | URL | Request, init?: RequestInit) => {
      const u = String(url).replace('https://api.github.com/repos/o/r', '');
      const m = `${init?.method ?? 'GET'} ${u}`;
      calls.push(m);
      const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s });
      if (m === 'POST /git/blobs') return json({ sha: 'blob1' }, 201);
      if (m === 'GET /git/ref/heads/main') return json({ object: { sha: `head${calls.length}` } });
      if (m.startsWith('GET /git/commits/')) return json({ tree: { sha: 'tree0' } });
      if (m === 'POST /git/trees') return json({ sha: 'tree1' }, 201);
      if (m === 'POST /git/commits') return json({ sha: 'commit1' }, 201);
      if (m === 'PATCH /git/refs/heads/main') return left-- > 0 ? json({ message: 'Update is not a fast forward' }, 422) : json({});
      return json({ message: 'unexpected ' + m }, 500);
    };
    return { calls, f: f as typeof fetch };
  }
  it('ein Commit mit allen Dateien', async () => {
    const api = fakeApi();
    const gh = new GitHub('t', 'o/r', 'main', api.f);
    const sha = await gh.commit([{ path: 'a.json', text: 'ä' }, { path: 'b.jpg', base64: 'AA==' }, { path: 'c.json', delete: true }], 'msg');
    expect(sha).toBe('commit1');
    expect(api.calls.filter((c) => c === 'POST /git/blobs')).toHaveLength(2);
    expect(api.calls.at(-1)).toBe('PATCH /git/refs/heads/main');
  });
  it('wiederholt, wenn inzwischen ein anderer Commit kam', async () => {
    const api = fakeApi(1);
    const gh = new GitHub('t', 'o/r', 'main', api.f);
    await gh.commit([{ path: 'a.json', text: '{}' }], 'msg');
    expect(api.calls.filter((c) => c.startsWith('PATCH'))).toHaveLength(2);
    expect(api.calls.filter((c) => c === 'POST /git/blobs')).toHaveLength(1);
  });
});
