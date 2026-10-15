import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { CARGO, CATEGORIES, ContentError, LINK_CATS, LINK_PAGES, fleetErrors, hoursErrors, toFiles, validate, type EditState, type FileChange, type FleetData, type RepoSnapshot } from '../supabase/functions/publish/convert.ts';
import { imageKind, makeHandler, type Env } from '../supabase/functions/publish/publish.ts';
import { applyLists, useT } from '../src/i18n/index.ts';
import fr from '../src/i18n/fr.ts';
import { contentHtml, hoursInline, hoursSummary } from '../src/lib/content.ts';
import { PAGE_SLUGS, RENTAL_CATEGORY_SLUGS } from '../src/i18n/config.ts';

// Feste Testdaten: die echten Dateien ändert der Admin-Bereich (Beispiele löschen, Zeiten ändern)
const dir = 'tests/fixtures/flotte';
const samples = readdirSync(dir).map((f) => [f.replace('.json', ''), JSON.parse(readFileSync(`${dir}/${f}`, 'utf8')) as FleetData] as const);
const horaires = JSON.parse(readFileSync('tests/fixtures/horaires.json', 'utf8'));
const SHA = 'a'.repeat(40);
const SHA2 = 'b'.repeat(40);
const state = (x: Partial<EditState> = {}): EditState => ({ v: 1, texts: {}, lists: {}, photos: {}, ...x });
const repo = (x: Partial<RepoSnapshot> = {}): RepoSnapshot => ({
  texts: { $comment: 'c', fr: {}, de: { 'nav.home': 'Start' } },
  lists: {},
  photos: {},
  horaires,
  files: ['src/content/flotte/_dev/exemple-benne.json', 'src/assets/photos/rental.jpg', 'src/assets/flotte/ma-remorque.jpg'],
  ...x,
});
const byPath = (files: FileChange[]): Record<string, FileChange> => Object.fromEntries(files.map((f) => [f.path, f]));

describe('Admin-Bereich: Prüfregeln', () => {
  it('Kategorien und Ladungen wie src/content.config.ts', () => {
    const cfg = readFileSync('src/content.config.ts', 'utf8');
    const list = (name: string) => [...new RegExp(`export const ${name} = \\[([^\\]]*)\\]`).exec(cfg)![1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
    expect([...CATEGORIES]).toEqual(list('CATEGORIES'));
    expect([...CARGO]).toEqual(list('CARGO'));
  });
  it('Link-Ziele wie src/i18n/config.ts', () => {
    expect([...LINK_PAGES].sort()).toEqual(Object.keys(PAGE_SLUGS).sort());
    expect([...LINK_CATS].sort()).toEqual(Object.keys(RENTAL_CATEGORY_SLUGS).sort());
    expect(() => validate(state({ texts: { de: { 'a.b': 'Siehe [Garten](page:garten).' } } }))).toThrow(/page:garten/);
    expect(() => validate(state({ texts: { de: { 'a.b': 'Siehe [Garten](page:garden) und [Kipper](cat:benne).' } } }))).not.toThrow();
    expect(contentHtml('Siehe [Garten](page:garten).', useT('de'), 'de')).toBe('Siehe Garten.');
  });
  it('alle Beispiel-Fahrzeuge und die echten Öffnungszeiten sind gültig', () => {
    for (const [, d] of samples) expect(fleetErrors(d)).toEqual({});
    expect(hoursErrors(horaires.week)).toEqual({});
  });
  it('lehnt Ungültiges ab, bevor etwas gespeichert wird', () => {
    expect(() => validate(state({ texts: { de: { 'a b': 'x' } } }))).toThrow(ContentError);
    expect(() => validate(state({ texts: { de: { 'nav.home': '  ' } } }))).toThrow(/leer/);
    expect(() => validate(state({ texts: { xx: { a: 'b' } } as never }))).toThrow(/Sprache/);
    expect(() => validate(state({ lists: { fr: { 'details.points.workshop': { value: [{ a: 1 }], from: [0] } } } }))).toThrow(/Liste/);
    expect(() => validate(state({ photos: { rental: { src: 'images/uploads/x.webp' } } }))).toThrow(/hochgeladen/);
    expect(() => validate(state({ hours: { ...horaires.week, mo: [['12:00', '08:00']] } }))).toThrow(/Öffnungszeiten/);
    expect(() => validate(state({ fleet: { 'Böse/Datei': null } }))).toThrow(/Kennung/);
    const heavy = { ...samples[0][1], mmaKg: 4000, payloadKg: 3000 };
    expect(() => validate(state({ fleet: { x: heavy } }))).toThrow(/mmaKg/);
  });
});

describe('Admin-Bereich: Änderungen → Dateien', () => {
  it('nichts geändert → keine Dateien', () => {
    expect(toFiles(state(), repo()).files).toEqual([]);
    expect(toFiles(state({ texts: { de: { 'nav.home': 'Start' } } }), repo()).files).toEqual([]);
  });

  it('Texte und Listen: Liste ersetzt einzelne Texte darunter', () => {
    const r = repo({ texts: { fr: { 'details.points.workshop.1': 'alt', 'hero.h1': 'X' } } });
    const { files, summary } = toFiles(state({
      texts: { fr: { 'nav.home': 'Accueil !' } },
      lists: { fr: { 'details.points.workshop': { value: ['a', 'b'], from: [0, 2] } } },
    }), r);
    const f = byPath(files);
    expect(JSON.parse(f['src/content/texts.json'].text!).fr).toEqual({ 'hero.h1': 'X', 'nav.home': 'Accueil !' });
    expect(JSON.parse(f['src/content/lists.json'].text!).fr).toEqual({ 'details.points.workshop': ['a', 'b'] });
    expect(summary).toEqual(['Texte FR']);
  });

  it('Eintrag einer schon geänderten Liste landet in der Liste, nicht in texts.json', () => {
    const r = repo({ lists: { de: { 'details.points.workshop': ['Eins', 'Zwei', 'Drei'] } } });
    const { files } = toFiles(state({ texts: { de: { 'details.points.workshop.1': 'Zwei korrigiert', 'hero.h1': 'Neu' } } }), r);
    const f = byPath(files);
    expect(JSON.parse(f['src/content/lists.json'].text!).de['details.points.workshop']).toEqual(['Eins', 'Zwei korrigiert', 'Drei']);
    expect(JSON.parse(f['src/content/texts.json'].text!).de).toEqual({ 'nav.home': 'Start', 'hero.h1': 'Neu' });
  });

  it('Fotos: neues Bild ersetzt alle Formate des Platzes, Ausblenden in photos.json', () => {
    const { files } = toFiles(state({ photos: { rental: { src: `upload/${SHA}.webp` }, about: { hidden: true } } }), repo());
    const f = byPath(files);
    expect(f['src/assets/photos/rental.webp']).toEqual({ path: 'src/assets/photos/rental.webp', blob: SHA });
    expect(f['src/assets/photos/rental.jpg']).toEqual({ path: 'src/assets/photos/rental.jpg', delete: true });
    expect(JSON.parse(f['src/content/photos.json'].text!)).toEqual({ about: { hidden: true } });
    // wieder anzeigen
    const back = toFiles(state({ photos: { about: { hidden: false } } }), repo({ photos: { about: { hidden: true } } }));
    expect(JSON.parse(back.files[0].text!)).toEqual({});
  });

  it('Öffnungszeiten: nur week ändert sich, Rest bleibt', () => {
    const week = { ...horaires.week, sa: [] };
    const { files, summary } = toFiles(state({ hours: week }), repo());
    const h = JSON.parse(files[0].text!);
    expect(files[0].path).toBe('src/content/horaires.json');
    expect(h.week.sa).toEqual([]);
    expect(h.timezone).toBe('Europe/Luxembourg');
    expect(summary).toEqual(['Öffnungszeiten']);
  });

  it('Anhänger: neu mit Foto, Beispiel bearbeiten (Pfad und sample bleiben), löschen mit Foto', () => {
    const [id, benne] = samples.find(([k]) => k === 'exemple-benne')!;
    const neu: FleetData = { ...benne, sample: false, name: { fr: ' Ma remorque ', de: '' }, photo: `upload/${SHA2}.jpg`, priceDay: 45 };
    const { files } = toFiles(state({ fleet: { 'neue-remorque': neu, [id]: { ...benne, priceDay: 30 }, 'ma-remorque': null } }), repo());
    const f = byPath(files);
    const created = JSON.parse(f['src/content/flotte/neue-remorque.json'].text!);
    expect(created).toMatchObject({ name: { fr: 'Ma remorque' }, photo: 'neue-remorque', priceDay: 45, active: true });
    expect(created.sample).toBeUndefined();
    expect(f['src/assets/flotte/neue-remorque.jpg']).toEqual({ path: 'src/assets/flotte/neue-remorque.jpg', blob: SHA2 });
    const edited = JSON.parse(f['src/content/flotte/_dev/exemple-benne.json'].text!);
    expect(edited).toMatchObject({ sample: true, priceDay: 30, photo: 'fleet-benne' });
    expect(f['src/content/flotte/ma-remorque.json']).toBeUndefined(); // gab es nicht → nichts zu löschen
    expect(f['src/assets/flotte/ma-remorque.jpg']).toEqual({ path: 'src/assets/flotte/ma-remorque.jpg', delete: true });
  });
});

describe('Build: Listen aus lists.json, Öffnungszeiten an einer Stelle', () => {
  it('applyLists ersetzt nur echte Textlisten', () => {
    const d = applyLists(fr, { 'details.points.workshop': ['Eins', 'Zwei'], 'hero.h1': ['x'], 'nope.list': ['y'] });
    expect(d.details.points.workshop).toEqual(['Eins', 'Zwei']);
    expect(d.hero.h1).toBe(fr.hero.h1);
  });
  it('Zusammenfassung und Fließtext mit anderen Zeiten', () => {
    const week = { ...horaires.week, sa: [], fr: [['08:00', '17:00']] };
    expect(hoursSummary(useT('de'), 'de', ' · ', week)).toBe('Montag – Donnerstag: 07:45–12:00 und 13:00–18:00 · Freitag: 08:00–17:00 · Samstag – Sonntag: geschlossen');
    expect(hoursInline(useT('fr'), 'fr', week)).toBe('Lundi–jeudi 07:45–12:00 et 13:00–18:00, vendredi 08:00–17:00');
    expect(hoursInline(useT('pt'), 'pt', horaires.week)).toMatch(/^Segunda–sexta /);
  });
});

/* ------------------------------------------------------------------ Edge Function mit simulierter API */
const ENV: Env = { SUPABASE_URL: 'https://sb.test', SUPABASE_ANON_KEY: 'anon', GITHUB_TOKEN: 'gh', GITHUB_REPO: 'o/r', ALLOWED_ORIGINS: 'https://site.test', ADMIN_EMAILS: 'chef@garage.lu' };
const WEBP = btoa('RIFF\x00\x00\x00\x00WEBPVP8 ' + '\x00'.repeat(20));

function fakeApi(opts: { user?: string | null; conflicts?: number } = {}) {
  const calls: { url: string; method: string; body?: unknown }[] = [];
  let conflicts = opts.conflicts ?? 0;
  const res = (status: number, body: unknown) => new Response(typeof body === 'string' ? body : JSON.stringify(body), { status });
  const f = (async (input: string | URL | Request, init: RequestInit = {}) => {
    const url = String(input);
    const method = init.method ?? 'GET';
    calls.push({ url, method, body: init.body ? JSON.parse(String(init.body)) : undefined });
    if (url.endsWith('/auth/v1/user')) return opts.user === null ? res(401, {}) : res(200, { email: opts.user ?? 'chef@garage.lu' });
    if (url.includes('/rest/v1/')) return res(201, '');
    const p = url.replace('https://api.github.com/repos/o/r', '');
    if (p.startsWith('/contents/src/content/')) return p.includes('horaires') ? res(200, JSON.stringify(horaires)) : res(404, {});
    if (p === '/git/blobs') return res(201, { sha: SHA });
    if (p === '/git/ref/heads/main') return res(200, { object: { sha: 'head1' } });
    if (p === '/git/commits/head1') return res(200, { tree: { sha: 'tree1' }, committer: { date: '2026-10-14T10:00:00Z' } });
    if (p.startsWith('/git/trees/tree1')) return res(200, { tree: [{ path: 'src/content/flotte/_dev/exemple-benne.json', type: 'blob' }], truncated: false });
    if (p === '/git/trees') return res(201, { sha: 'tree2' });
    if (p === '/git/commits') return res(201, { sha: 'c2', committer: { date: '2026-10-14T10:01:00Z' } });
    if (p === '/git/refs/heads/main') return conflicts-- > 0 ? res(422, { message: 'Update is not a fast forward' }) : res(200, {});
    return res(404, { message: `unbekannt ${p}` });
  }) as typeof fetch;
  return { f, calls };
}
const post = (body: unknown, token = 'Bearer t') =>
  new Request('https://sb.test/functions/v1/publish', { method: 'POST', headers: { authorization: token, origin: 'https://site.test', 'content-type': 'application/json' }, body: JSON.stringify(body) });

describe('Edge Function publish (mit simulierter API)', () => {
  it('erkennt Bilder an den ersten Bytes', () => {
    expect(imageKind(WEBP)).toBe('webp');
    expect(imageKind(btoa('\xff\xd8\xff\xe0abc'))).toBe('jpg');
    expect(imageKind(btoa('<svg onload=alert(1)>'))).toBeNull();
  });
  it('ohne gültige Anmeldung → 401, fremdes Konto → 403', async () => {
    expect((await makeHandler(ENV, fakeApi({ user: null }).f)(post({ action: 'publish', state: state() }))).status).toBe(401);
    expect((await makeHandler(ENV, fakeApi().f)(post({ action: 'publish' }, ''))).status).toBe(401);
    const only = { ...ENV, ADMIN_EMAILS: 'info@rondpoint.lu' };
    expect((await makeHandler(only, fakeApi().f)(post({ action: 'publish', state: state() }))).status).toBe(403);
    // ohne Liste speichert niemand (sonst könnte sich jeder selbst registrieren)
    const none = await makeHandler({ ...ENV, ADMIN_EMAILS: '' }, fakeApi().f)(post({ action: 'publish', state: state() }));
    expect(none.status).toBe(403);
    expect((await none.json()).error).toMatch(/ADMIN_EMAILS/);
  });
  it('Foto hochladen: nur echte Bilder', async () => {
    const api = fakeApi();
    const ok = await makeHandler(ENV, api.f)(post({ action: 'blob', ext: 'webp', data: WEBP }));
    expect(await ok.json()).toEqual({ ok: true, sha: SHA });
    expect(ok.headers.get('access-control-allow-origin')).toBe('https://site.test');
    const bad = await makeHandler(ENV, api.f)(post({ action: 'blob', ext: 'webp', data: btoa('<html>') }));
    expect(bad.status).toBe(400);
  });
  it('Veröffentlichen: ein Commit, bei Konflikt auf neuem Stand wiederholen, Protokoll', async () => {
    const api = fakeApi({ conflicts: 1 });
    const env = { ...ENV, SUPABASE_SERVICE_ROLE_KEY: 'srv' };
    const r = await makeHandler(env, api.f)(post({ action: 'publish', state: state({ hours: { ...horaires.week, sa: [] }, fleet: { 'exemple-benne': null } }) }));
    expect(await r.json()).toEqual({ ok: true, sha: 'c2', committedAt: '2026-10-14T10:01:00Z', summary: ['Öffnungszeiten', 'Anhänger'] });
    const trees = api.calls.filter((c) => c.url.endsWith('/git/trees') && c.method === 'POST');
    expect(trees).toHaveLength(2);
    const entries = (trees[1].body as { tree: { path: string; sha?: null; content?: string }[] }).tree;
    expect(entries.map((e) => e.path).sort()).toEqual(['src/content/flotte/_dev/exemple-benne.json', 'src/content/horaires.json']);
    expect(entries.find((e) => e.path.endsWith('benne.json'))!.sha).toBeNull();
    expect(api.calls.some((c) => c.url.includes('/rest/v1/admin_changes'))).toBe(true);
  });
  it('ungültiger Inhalt → 422 mit Meldung, nichts geschrieben', async () => {
    const api = fakeApi();
    const r = await makeHandler(ENV, api.f)(post({ action: 'publish', state: state({ hours: { ...horaires.week, mo: [['9', '8']] } }) }));
    expect(r.status).toBe(422);
    expect((await r.json()).error).toMatch(/Öffnungszeiten/);
    expect(api.calls.some((c) => c.method === 'POST' && c.url.includes('/git/'))).toBe(false);
  });
  it('nichts geändert → kein Commit, Zeit des aktuellen Stands', async () => {
    const api = fakeApi();
    const r = await makeHandler(ENV, api.f)(post({ action: 'publish', state: state() }));
    expect(await r.json()).toMatchObject({ ok: true, sha: 'head1', committedAt: '2026-10-14T10:00:00Z' });
    expect(api.calls.some((c) => c.url.endsWith('/git/commits') && c.method === 'POST')).toBe(false);
  });
});
