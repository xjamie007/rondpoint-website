/**
 * Änderungen aus dem Admin-Bereich auf der Seite (src/edit/) → Dateien im Repository.
 *
 * Läuft in der Supabase Edge Function `publish` (Deno) und in den Tests (Vitest).
 * Der Editor nutzt dieselben Prüfregeln, damit nichts gespeichert wird, woran der Build
 * später scheitern würde. Deshalb ohne Importe: die Datei muss in beiden Welten laufen.
 *
 *   Texte        → src/content/texts.json   (Schlüssel wie in src/i18n/fr.ts)
 *   Listen       → src/content/lists.json   (ganze Liste je Pfad, ersetzt Texte darunter)
 *   Fotos        → src/assets/photos/<platz>.<webp|jpg|png>, Ausblenden in src/content/photos.json
 *   Zeiten       → src/content/horaires.json (week)
 *   Anhänger     → src/content/flotte/<id>.json, Foto src/assets/flotte/<id>.<endung>
 *   Ladungsarten → src/content/cargo.json („Was transportieren Sie?“ im Finder)
 *   Eigene Arten → src/content/categories.json (z. B. Food Truck, zusätzlich zu CATEGORIES)
 *
 * Hochgeladene Bilder liegen schon als Git-Blob bei GitHub; im Inhalt stehen sie als
 * „upload/<blob-sha>.<endung>“.
 */

export type Lang = 'fr' | 'de' | 'lb' | 'en' | 'pt';
export const LANGS: Lang[] = ['fr', 'de', 'lb', 'en', 'pt'];
export type DayKey = 'mo' | 'tu' | 'we' | 'th' | 'fr' | 'sa' | 'su';
export const DAYS: DayKey[] = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];
export type Interval = [string, string];
export type Week = Record<DayKey, Interval[]>;

/** Wie src/content.config.ts (Test prüft die Gleichheit) */
export const CATEGORIES = ['porte-voiture', 'porte-moto', 'benne', 'frigorifique', 'plateau', 'fourgon', 'camionnette', 'voiture'] as const;
/** Ladungsarten von Anfang an (Beschriftung in src/i18n/*.ts); die aktuelle Liste steht in src/content/cargo.json */
export const CARGO = ['voiture', 'moto', 'terre', 'fete', 'meubles', 'materiel'] as const;
export const CARGO_ID = /^[a-z0-9][a-z0-9-]{0,30}$/;
/** Eine Ladungsart; label nur bei eigenen oder umbenannten (sonst Text aus src/i18n) */
export interface CargoItem {
  id: string;
  label?: Partial<Record<Lang, string>>;
}
/** Eigene Art (Kategorie) eines Fahrzeugs, im Admin-Bereich angelegt; kind steuert die Regeln (Anhänger oder Transporter) */
export interface CategoryItem {
  id: string;
  kind: 'trailer' | 'van';
  label: Partial<Record<Lang, string>>;
}
/** Ziele interner Links in Texten: [Wort](page:…) und [Wort](cat:…), wie src/i18n/config.ts (Test prüft die Gleichheit) */
export const LINK_PAGES = ['home', 'rental', 'cars', 'workshop', 'sodablast', 'trailersForSale', 'garden', 'contact', 'thanks', 'legal', 'privacy'] as const;
export const LINK_CATS = ['porte-voiture', 'porte-moto', 'benne', 'frigorifique', 'camionnette'] as const;

export type I18nText = { fr: string } & Partial<Record<Exclude<Lang, 'fr'>, string>>;
export interface FleetData {
  category: string;
  name: I18nText;
  brand?: string | null;
  mmaKg: number;
  emptyKg?: number | null;
  payloadKg: number;
  braked: boolean;
  loadLengthM?: number | null;
  loadWidthM?: number | null;
  loadHeightM?: number | null;
  volumeM3?: number | null;
  tempRange?: { minC: number; maxC: number } | null;
  power?: string | null;
  socket?: 7 | 13 | null;
  showPallets?: boolean;
  suitableFor?: string[];
  priceHalfDay?: number | null;
  priceDay?: number | null;
  priceWeekend?: number | null;
  priceWeek?: number | null;
  deposit?: number | null;
  /** Anhänger für Motorräder/Autos: wie viele passen (leer = aus der Ladefläche berechnet) */
  capacity?: number | null;
  /** Transporter: inklusive Kilometer je Mietdauer, Preis je weiterem Kilometer */
  kmHalfDay?: number | null;
  kmDay?: number | null;
  kmWeekend?: number | null;
  kmWeek?: number | null;
  priceExtraKm?: number | null;
  notes?: I18nText | null;
  photo?: string | null;
  active?: boolean;
  sample?: boolean;
  [k: string]: unknown;
}

export interface EditState {
  v: 1;
  texts: Partial<Record<Lang, Record<string, string>>>;
  lists: Partial<Record<Lang, Record<string, { value: unknown[]; from: number[] }>>>;
  photos: Record<string, { src?: string; hidden?: boolean }>;
  /** Öffnungszeiten, gelten auf der ganzen Website (Tabelle, Fußzeile, Texte, Google) */
  hours?: Week;
  /** Mietanhänger und Transporter: Kennung → Daten, null = gelöscht */
  fleet?: Record<string, FleetData | null>;
  /** Ladungsarten im Finder, ganze Liste in Reihenfolge */
  cargo?: CargoItem[];
  /** eigene Arten (Kategorien), ganze Liste */
  categories?: CategoryItem[];
  /** nur für den Editor: automatisch übersetzte Texte („sprache:schlüssel“), werden nicht gespeichert */
  auto?: string[];
}

/** Was im Repository liegt (nur das, was die Umwandlung braucht) */
export interface RepoSnapshot {
  texts: Record<string, unknown>;
  lists: Record<string, unknown>;
  photos: Record<string, unknown>;
  horaires: Record<string, unknown>;
  /** src/content/cargo.json (fehlt sie: Standardliste) */
  cargo?: Record<string, unknown>;
  /** src/content/categories.json (eigene Arten) */
  categories?: Record<string, unknown>;
  /** vorhandene Pfade unter src/assets/photos, src/assets/flotte, src/content/flotte */
  files: string[];
}

export interface FileChange {
  path: string;
  text?: string;
  /** SHA eines schon hochgeladenen Git-Blobs */
  blob?: string;
  delete?: true;
}

export class ContentError extends Error {}

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const KEY = /^[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*$/;
const SLOT = /^[a-z0-9][a-z0-9-]{0,60}$/;
export const FLEET_ID = /^[a-z0-9][a-z0-9-]{0,60}$/;
export const UPLOAD = /^upload\/([0-9a-f]{40})\.(webp|jpg|png)$/;
const IMG_EXT = ['webp', 'jpg', 'png'];
const MAX_TEXT = 6000;

export const json = (x: unknown) => JSON.stringify(x, null, 2) + '\n';

/* ------------------------------------------------------------------ Prüfregeln */

/** Öffnungszeiten: HH:MM, von < bis, höchstens zwei Zeitfenster ohne Überschneidung */
export function hoursErrors(week: Partial<Week>): Partial<Record<DayKey, 'time' | 'order' | 'overlap' | 'count'>> {
  const out: Partial<Record<DayKey, 'time' | 'order' | 'overlap' | 'count'>> = {};
  for (const d of DAYS) {
    const iv = week[d];
    if (!Array.isArray(iv)) { out[d] = 'time'; continue; }
    if (iv.length > 2) out[d] = 'count';
    for (const x of iv) {
      if (!Array.isArray(x) || x.length !== 2 || !TIME.test(String(x[0])) || !TIME.test(String(x[1]))) out[d] = 'time';
      else if (x[0] >= x[1]) out[d] = 'order';
    }
    if (!out[d] && iv.length === 2 && iv[0][1] > iv[1][0]) out[d] = 'overlap';
  }
  return out;
}

const posNum = (v: unknown) => v == null || (typeof v === 'number' && Number.isFinite(v) && v > 0);
const posInt = (v: unknown) => typeof v === 'number' && Number.isInteger(v) && v > 0;
const str = (v: unknown, max: number) => v == null || (typeof v === 'string' && v.length <= max);

/** Gleiche Regeln wie src/content.config.ts – ein gespeicherter Anhänger lässt den Build nie scheitern.
 *  custom: Kennungen der eigenen Arten (src/content/categories.json bzw. Admin-Bereich) */
export function fleetErrors(d: FleetData, custom: string[] = []): Record<string, string> {
  const e: Record<string, string> = {};
  if (!(CATEGORIES as readonly string[]).includes(d.category) && !custom.includes(d.category)) e.category = 'required';
  if (!d.name || typeof d.name.fr !== 'string' || !d.name.fr.trim()) e['name.fr'] = 'required';
  for (const l of LANGS) if (d.name && !str(d.name[l], 120)) e[`name.${l}`] = 'long';
  if (!posInt(d.mmaKg)) e.mmaKg = 'int';
  if (!posInt(d.payloadKg)) e.payloadKg = 'int';
  if (d.emptyKg != null && !posInt(d.emptyKg)) e.emptyKg = 'int';
  if (posInt(d.mmaKg) && posInt(d.payloadKg) && d.payloadKg > d.mmaKg) e.payloadKg = 'payload';
  if (posInt(d.mmaKg) && d.mmaKg > 3500) e.mmaKg = 'over';
  if (typeof d.braked !== 'boolean') e.braked = 'required';
  if (!posNum(d.loadLengthM) || (d.loadLengthM ?? 0) > 12) e.loadLengthM = 'range';
  if (!posNum(d.loadWidthM) || (d.loadWidthM ?? 0) > 3) e.loadWidthM = 'range';
  if (!posNum(d.loadHeightM) || (d.loadHeightM ?? 0) > 4) e.loadHeightM = 'range';
  if (!posNum(d.volumeM3)) e.volumeM3 = 'num';
  for (const k of ['priceHalfDay', 'priceDay', 'priceWeekend', 'priceWeek', 'deposit', 'priceExtraKm'] as const) if (!posNum(d[k])) e[k] = 'num';
  for (const k of ['kmHalfDay', 'kmDay', 'kmWeekend', 'kmWeek'] as const) if (d[k] != null && !posInt(d[k])) e[k] = 'int';
  if (d.socket != null && d.socket !== 7 && d.socket !== 13) e.socket = 'socket';
  if (d.tempRange && (!Number.isFinite(d.tempRange.minC) || !Number.isFinite(d.tempRange.maxC) || d.tempRange.minC > d.tempRange.maxC)) e.tempRange = 'temp';
  // Ladungsarten: gültige Kennungen; nicht mehr vorhandene ignoriert der Finder
  if (!Array.isArray(d.suitableFor ?? []) || (d.suitableFor ?? []).some((c) => typeof c !== 'string' || !CARGO_ID.test(c))) e.suitableFor = 'cargo';
  if (d.notes && (typeof d.notes !== 'object' || !d.notes.fr?.trim()) && Object.values(d.notes ?? {}).some((x) => typeof x === 'string' && x.trim())) e['notes.fr'] = 'required';
  for (const l of LANGS) if (d.notes && !str(d.notes[l], 600)) e[`notes.${l}`] = 'long';
  for (const k of ['brand', 'power'] as const) if (!str(d[k], 80)) e[k] = 'long';
  if (d.photo != null && (typeof d.photo !== 'string' || !(UPLOAD.test(d.photo) || SLOT.test(d.photo)))) e.photo = 'photo';
  if (d.capacity != null && (!posInt(d.capacity) || (d.capacity as number) > 9)) e.capacity = 'int';
  return e;
}

/** Leere optionale Felder auf null, Texte getrimmt; nur bekannte Felder.
 *  vanCats: eigene Arten, die als Transporter gelten (Kilometer-Felder bleiben) */
export function cleanFleet(d: FleetData, vanCats: string[] = []): FleetData {
  const text = (o: Record<string, unknown> | null | undefined): I18nText | null => {
    if (!o || typeof o !== 'object') return null;
    const r: Record<string, string> = {};
    for (const l of LANGS) {
      const v = o[l];
      if (typeof v === 'string' && v.trim()) r[l] = v.trim();
    }
    return r.fr ? (r as I18nText) : null;
  };
  const s = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : null);
  const n = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : null);
  const van = d.category === 'camionnette' || vanCats.includes(d.category);
  // Anzahl Motorräder bzw. Autos nur bei diesen Anhängern (sonst berechnet der Finder nichts)
  const vehicles = d.category === 'porte-moto' || d.category === 'porte-voiture';
  const out: FleetData = {
    ...(d.sample ? { sample: true } : {}),
    category: d.category,
    name: text(d.name as Record<string, unknown>) ?? { fr: '' },
    brand: s(d.brand),
    mmaKg: d.mmaKg,
    emptyKg: n(d.emptyKg),
    payloadKg: d.payloadKg,
    braked: !!d.braked,
    loadLengthM: n(d.loadLengthM),
    loadWidthM: n(d.loadWidthM),
    loadHeightM: n(d.loadHeightM),
    volumeM3: n(d.volumeM3),
    tempRange: d.tempRange ?? null,
    power: s(d.power),
    socket: d.socket ?? null,
    showPallets: !!d.showPallets,
    capacity: vehicles ? n(d.capacity) : null,
    suitableFor: [...new Set((d.suitableFor ?? []).filter((c) => typeof c === 'string' && CARGO_ID.test(c)))],
    priceHalfDay: n(d.priceHalfDay),
    priceDay: n(d.priceDay),
    priceWeekend: n(d.priceWeekend),
    priceWeek: n(d.priceWeek),
    deposit: n(d.deposit),
    // Kilometer nur bei Transportern (Anhänger haben keinen Kilometerzähler)
    kmHalfDay: van ? n(d.kmHalfDay) : null,
    kmDay: van ? n(d.kmDay) : null,
    kmWeekend: van ? n(d.kmWeekend) : null,
    kmWeek: van ? n(d.kmWeek) : null,
    priceExtraKm: van ? n(d.priceExtraKm) : null,
    notes: text(d.notes as Record<string, unknown> | null),
    photo: s(d.photo),
    active: d.active !== false,
  };
  return out;
}

export function slugify(s: string): string {
  return (
    s
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 50) || 'anhaenger'
  );
}

/** Interne Links mit unbekanntem Ziel würden den Build abbrechen */
function badLink(v: string): string | null {
  for (const m of v.matchAll(/\]\((page|cat):([\w-]+)\)/g)) {
    const ok = m[1] === 'page' ? (LINK_PAGES as readonly string[]).includes(m[2]) : (LINK_CATS as readonly string[]).includes(m[2]);
    if (!ok) return `${m[1]}:${m[2]}`;
  }
  return null;
}

/** Listen in den Texten sind reine Textlisten (Aufzählungen, Absätze, Schritte) */
const textList = (v: unknown[]) => v.length > 0 && v.length <= 100 && v.every((x) => typeof x === 'string' && x.trim() && x.length <= MAX_TEXT);

/** Gesamten Inhalt prüfen; wirft ContentError mit einer verständlichen Meldung.
 *  repoCats: eigene Arten im Repository (gelten, solange der Inhalt keine eigene Liste mitbringt) */
export function validate(s: EditState, repoCats: CategoryItem[] = []): void {
  if (!s || typeof s !== 'object' || s.v !== 1) throw new ContentError('Unbekanntes Format');
  for (const [l, tx] of Object.entries(s.texts ?? {})) {
    if (!LANGS.includes(l as Lang)) throw new ContentError(`Unbekannte Sprache ${l}`);
    for (const [k, v] of Object.entries(tx ?? {})) {
      if (!KEY.test(k)) throw new ContentError(`Ungültiger Textschlüssel ${k}`);
      if (typeof v !== 'string' || !v.trim() || v.length > MAX_TEXT) throw new ContentError(`Text ${k} ist leer oder zu lang`);
      const bad = badLink(v);
      if (bad) throw new ContentError(`Text ${k}: unbekanntes Link-Ziel ${bad}`);
    }
  }
  for (const [l, ls] of Object.entries(s.lists ?? {})) {
    if (!LANGS.includes(l as Lang)) throw new ContentError(`Unbekannte Sprache ${l}`);
    for (const [p, o] of Object.entries(ls ?? {})) {
      if (!KEY.test(p) || !o || !Array.isArray(o.value) || !textList(o.value)) throw new ContentError(`Ungültige Liste ${p}`);
      const bad = o.value.map((x) => badLink(String(x))).find(Boolean);
      if (bad) throw new ContentError(`Liste ${p}: unbekanntes Link-Ziel ${bad}`);
    }
  }
  for (const [k, p] of Object.entries(s.photos ?? {})) {
    if (!SLOT.test(k) || !p || typeof p !== 'object') throw new ContentError(`Ungültiger Foto-Platz ${k}`);
    if (p.src != null && !UPLOAD.test(p.src)) throw new ContentError(`Foto ${k} wurde nicht hochgeladen`);
  }
  if (s.hours != null) {
    const e = hoursErrors(s.hours);
    if (Object.keys(e).length) throw new ContentError(`Öffnungszeiten prüfen: ${Object.keys(e).join(', ')}`);
  }
  if (s.cargo != null) cargoErrors(s.cargo);
  if (s.categories != null) categoryErrors(s.categories);
  const custom = (s.categories ?? repoCats).map((c) => c.id);
  for (const [id, d] of Object.entries(s.fleet ?? {})) {
    if (!FLEET_ID.test(id)) throw new ContentError(`Ungültige Kennung ${id}`);
    if (d === null) continue;
    const e = fleetErrors(d, custom);
    if (Object.keys(e).length) throw new ContentError(`Anhänger „${d.name?.fr ?? id}“: ${Object.keys(e).join(', ')} prüfen`);
  }
}

/** Ladungsarten prüfen: 1–20, eindeutige Kennungen, Beschriftung höchstens 60 Zeichen, eigene mit Beschriftung */
export function cargoErrors(list: CargoItem[]): void {
  if (!Array.isArray(list) || !list.length || list.length > 20) throw new ContentError('Ladungsarten: 1 bis 20 Einträge');
  const seen = new Set<string>();
  for (const c of list) {
    if (!c || !CARGO_ID.test(c.id) || seen.has(c.id)) throw new ContentError(`Ladungsart ${c?.id}: ungültige oder doppelte Kennung`);
    seen.add(c.id);
    const labels = Object.entries(c.label ?? {});
    if (labels.some(([l, v]) => !LANGS.includes(l as Lang) || typeof v !== 'string' || v.length > 60)) throw new ContentError(`Ladungsart ${c.id}: Beschriftung prüfen`);
    if (!(CARGO as readonly string[]).includes(c.id) && !labels.some(([, v]) => v.trim())) throw new ContentError(`Ladungsart ${c.id}: Beschriftung fehlt`);
  }
}

/** Ladungsarten aufräumen: leere Beschriftungen weg */
export function cleanCargo(list: CargoItem[]): CargoItem[] {
  return list.map((c) => {
    const label = Object.fromEntries(Object.entries(c.label ?? {}).filter(([, v]) => v?.trim()).map(([l, v]) => [l, v!.trim()]));
    return Object.keys(label).length ? { id: c.id, label } : { id: c.id };
  });
}

/** Eigene Arten prüfen: höchstens 30, eindeutige neue Kennungen, Anhänger oder Transporter, Name in mindestens einer Sprache */
export function categoryErrors(list: CategoryItem[]): void {
  if (!Array.isArray(list) || list.length > 30) throw new ContentError('Arten: höchstens 30 eigene');
  const seen = new Set<string>(CATEGORIES);
  for (const c of list) {
    if (!c || !CARGO_ID.test(c.id) || seen.has(c.id)) throw new ContentError(`Art ${c?.id}: ungültige oder doppelte Kennung`);
    seen.add(c.id);
    if (c.kind !== 'trailer' && c.kind !== 'van') throw new ContentError(`Art ${c.id}: Anhänger oder Transporter wählen`);
    const labels = Object.entries(c.label ?? {});
    if (labels.some(([l, v]) => !LANGS.includes(l as Lang) || typeof v !== 'string' || v.length > 60)) throw new ContentError(`Art ${c.id}: Name prüfen`);
    if (!labels.some(([, v]) => v.trim())) throw new ContentError(`Art ${c.id}: Name fehlt`);
  }
}

/** Eigene Arten aufräumen: leere Namen weg, nur bekannte Felder */
export function cleanCategories(list: CategoryItem[]): CategoryItem[] {
  return list.map((c) => ({
    id: c.id,
    kind: c.kind,
    label: Object.fromEntries(Object.entries(c.label ?? {}).filter(([, v]) => v?.trim()).map(([l, v]) => [l, v!.trim()])),
  }));
}

/* ------------------------------------------------------------------ Umwandlung */

const obj = (v: unknown): Record<string, unknown> => (v && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, unknown>) : {});

/** Inhalt → Dateiänderungen. summary: was sich geändert hat (für die Commit-Nachricht) */
export function toFiles(s: EditState, repo: RepoSnapshot): { files: FileChange[]; summary: string[] } {
  const repoCats = (Array.isArray(obj(repo.categories).items) ? obj(repo.categories).items : []) as CategoryItem[];
  validate(s, repoCats);
  const files: FileChange[] = [];
  const summary = new Set<string>();
  const has = new Set(repo.files);
  const put = (path: string, text: string) => files.push({ path, text });
  const del = (path: string) => { if (has.has(path) && !files.some((f) => f.path === path)) files.push({ path, delete: true }); };
  const blobOf = (src: string) => { const m = UPLOAD.exec(src)!; return { sha: m[1], ext: m[2] }; };

  // Texte und Listen
  const texts = structuredClone(repo.texts) as Record<string, Record<string, string> | string>;
  const lists = structuredClone(repo.lists) as Record<string, Record<string, unknown[]>>;
  let textChanged = false;
  let listChanged = false;
  for (const l of LANGS) {
    const tx = s.texts?.[l] ?? {};
    const ls = s.lists?.[l] ?? {};
    if (!Object.keys(tx).length && !Object.keys(ls).length) continue;
    const t = (texts[l] = { ...obj(texts[l]) } as Record<string, string>);
    const L = (lists[l] = { ...obj(lists[l]) } as Record<string, unknown[]>);
    for (const [k, v] of Object.entries(tx)) {
      // Eintrag einer schon geänderten Liste: in die Liste schreiben (sie ersetzt beim Build texts.json)
      const m = /^(.+)\.(\d+)$/.exec(k);
      const list = m && !(m[1] in ls) && Array.isArray(L[m[1]]) ? L[m[1]] : null;
      if (list && +m![2] < list.length) {
        if (list[+m![2]] !== v.trim()) { L[m![1]] = list.map((x, i) => (i === +m![2] ? v.trim() : x)); listChanged = true; }
        continue;
      }
      if (t[k] !== v.trim()) { t[k] = v.trim(); textChanged = true; }
    }
    if (Object.keys(ls).length) {
      for (const [p, o] of Object.entries(ls)) {
        // die Liste ersetzt einzelne Textänderungen darunter
        for (const k of Object.keys(t)) if (k.startsWith(`${p}.`) && !(k in tx)) { delete t[k]; textChanged = true; }
        if (JSON.stringify(L[p]) !== JSON.stringify(o.value)) { L[p] = o.value; listChanged = true; }
      }
    }
    if (Object.keys(tx).length || Object.keys(ls).length) summary.add(`Texte ${l.toUpperCase()}`);
  }
  if (textChanged) put('src/content/texts.json', json(texts));
  if (listChanged) put('src/content/lists.json', json(lists));
  if (!textChanged && !listChanged) for (const x of [...summary]) if (x.startsWith('Texte')) summary.delete(x);

  // Fotos der Seite
  const hidden = structuredClone(obj(repo.photos)) as Record<string, { hidden?: boolean }>;
  let hiddenChanged = false;
  for (const [slot, p] of Object.entries(s.photos ?? {})) {
    if (p.src) {
      const { sha, ext } = blobOf(p.src);
      const target = `src/assets/photos/${slot}.${ext}`;
      files.push({ path: target, blob: sha });
      for (const e of IMG_EXT) if (e !== ext) del(`src/assets/photos/${slot}.${e}`);
      summary.add('Fotos');
    }
    const want = !!p.hidden && !p.src;
    if (!!hidden[slot]?.hidden !== want) {
      if (want) hidden[slot] = { hidden: true };
      else delete hidden[slot];
      hiddenChanged = true;
      summary.add('Fotos');
    }
  }
  if (hiddenChanged) put('src/content/photos.json', json(hidden));

  // Öffnungszeiten
  if (s.hours && JSON.stringify(s.hours) !== JSON.stringify(obj(repo.horaires).week)) {
    put('src/content/horaires.json', json({ ...obj(repo.horaires), week: Object.fromEntries(DAYS.map((d) => [d, s.hours![d]])) }));
    summary.add('Öffnungszeiten');
  }

  // Ladungsarten
  if (s.cargo) {
    const items = cleanCargo(s.cargo);
    if (JSON.stringify(items) !== JSON.stringify(obj(repo.cargo).items ?? CARGO.map((id) => ({ id })))) {
      put('src/content/cargo.json', json({ ...obj(repo.cargo), items }));
      summary.add('Ladungsarten');
    }
  }

  // Eigene Arten
  const cats = s.categories ? cleanCategories(s.categories) : repoCats;
  if (s.categories && JSON.stringify(cats) !== JSON.stringify(repoCats)) {
    put('src/content/categories.json', json({ ...obj(repo.categories), items: cats }));
    summary.add('Arten');
  }
  const vanCats = cats.filter((c) => c.kind === 'van').map((c) => c.id);

  // Anhänger
  const fleetFiles = repo.files.filter((f) => f.startsWith('src/content/flotte/') && f.endsWith('.json'));
  const pathOf = (id: string) => fleetFiles.find((f) => f.split('/').pop() === `${id}.json`) ?? `src/content/flotte/${id}.json`;
  for (const [id, d] of Object.entries(s.fleet ?? {})) {
    const path = pathOf(id);
    const ownPhotos = IMG_EXT.map((e) => `src/assets/flotte/${id}.${e}`);
    summary.add('Anhänger');
    if (d === null) {
      del(path);
      ownPhotos.forEach(del);
      continue;
    }
    const data = cleanFleet(d, vanCats);
    if (data.photo && UPLOAD.test(data.photo)) {
      const { sha, ext } = blobOf(data.photo);
      files.push({ path: `src/assets/flotte/${id}.${ext}`, blob: sha });
      for (const e of IMG_EXT) if (e !== ext) del(`src/assets/flotte/${id}.${e}`);
      data.photo = id;
    } else if (data.photo !== id) {
      ownPhotos.forEach(del); // eigenes Foto entfernt oder durch ein anderes ersetzt
    }
    put(path, json(data));
  }

  return { files, summary: [...summary] };
}
