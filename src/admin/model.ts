/** Datenmodell des Dashboards, Prüfregeln, Umwandlung in Dateiänderungen */
import type { FileChange } from './github';

export type Lang = 'fr' | 'de' | 'lb' | 'en' | 'pt';
export const LANGS: Lang[] = ['fr', 'de', 'lb', 'en', 'pt'];
export type DayKey = 'mo' | 'tu' | 'we' | 'th' | 'fr' | 'sa' | 'su';
export const DAYS: DayKey[] = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];
export type Interval = [string, string];

export interface Horaires {
  week: Record<DayKey, Interval[]>;
  [k: string]: unknown;
}
export interface Review {
  quote: string;
  name: string;
  date: string;
  lang?: Lang;
}
export interface Site {
  phone: { display: string; tel: string };
  whatsapp: { display: string; wa: string };
  email: string;
  social: { facebook: string; instagram: string; tiktok: { value: string | null; confirmed: boolean } };
  confirmations: Record<string, boolean | string>;
  reviews: Review[];
  notice: { active: boolean } & Partial<Record<Lang, string>>;
  presentation: boolean;
  showOpenPoints: boolean;
  admin: { repo: string; branch: string };
  [k: string]: unknown;
}
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
  priceDay?: number | null;
  priceWeekend?: number | null;
  deposit?: number | null;
  notes?: I18nText | null;
  photo?: string | null;
  active?: boolean;
  sample?: boolean;
  [k: string]: unknown;
}
export interface FleetEntry {
  path: string;
  data: FleetData;
  preview: string | null;
}
export interface PhotoSlot {
  key: string;
  preview: string | null;
  demo: boolean;
  file: string;
  /** eigenes Foto liegt im Repository */
  own?: boolean;
}
export type Texts = { $comment?: string } & Partial<Record<Lang, Record<string, string>>>;
export interface Upload {
  dataUrl: string;
  base64: string;
}

/** Was beim Build mitgeliefert wird (/admin/data.json) */
export interface BuildData {
  builtAt: string;
  base: string;
  dict: Record<Lang, Record<string, string>>;
  groups: { id: string; keys: string[] }[];
  seoPages: { id: string; title: string; description: string; url: Record<Lang, string> }[];
  labels: { categories: Record<string, string>; cargo: Record<string, string> };
  categories: string[];
  cargo: string[];
  site: Site;
  horaires: Horaires;
  texts: Texts;
  photos: PhotoSlot[];
  fleet: FleetEntry[];
  stock: { count: number; sync: { lastSuccess: string | null; status: string; count: number; warnings: string[] } };
}

/** Der bearbeitbare Stand */
export interface Draft {
  site: Site;
  horaires: Horaires;
  texts: Texts;
  fleet: FleetEntry[];
  /** neue Fotos: Dateipfad im Repository → Inhalt */
  uploads: Record<string, Upload>;
  /** zu löschende Dateien (z. B. eigenes Foto entfernen) */
  deletes: string[];
}

export const clone = <T,>(x: T): T => structuredClone(x);

export function slugify(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'fahrzeug';
}

export const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

/** Öffnungszeiten prüfen: HH:MM, von < bis, Zeitfenster ohne Überschneidung */
export function hoursErrors(h: Horaires): Partial<Record<DayKey, string>> {
  const out: Partial<Record<DayKey, string>> = {};
  for (const d of DAYS) {
    const iv = h.week[d] ?? [];
    for (const [a, b] of iv) {
      if (!TIME.test(a) || !TIME.test(b)) out[d] = 'time';
      else if (a >= b) out[d] = 'order';
    }
    if (iv.length === 2 && iv[0][1] > iv[1][0]) out[d] = 'overlap';
  }
  return out;
}

const posNum = (v: unknown) => v == null || (typeof v === 'number' && Number.isFinite(v) && v > 0);
const posInt = (v: unknown) => typeof v === 'number' && Number.isInteger(v) && v > 0;

/** Gleiche Regeln wie src/content.config.ts – damit der Build nie an einer Eingabe scheitert */
export function fleetErrors(d: FleetData, categories: string[], cargo: string[]): Record<string, string> {
  const e: Record<string, string> = {};
  if (!categories.includes(d.category)) e.category = 'required';
  if (!d.name?.fr?.trim()) e['name.fr'] = 'required';
  if (!posInt(d.mmaKg)) e.mmaKg = 'int';
  if (!posInt(d.payloadKg)) e.payloadKg = 'int';
  if (d.emptyKg != null && !posInt(d.emptyKg)) e.emptyKg = 'int';
  if (posInt(d.mmaKg) && posInt(d.payloadKg) && d.payloadKg > d.mmaKg) e.payloadKg = 'payload';
  if (!posNum(d.loadLengthM) || (d.loadLengthM ?? 0) > 12) e.loadLengthM = 'range';
  if (!posNum(d.loadWidthM) || (d.loadWidthM ?? 0) > 3) e.loadWidthM = 'range';
  if (!posNum(d.loadHeightM) || (d.loadHeightM ?? 0) > 4) e.loadHeightM = 'range';
  if (!posNum(d.volumeM3)) e.volumeM3 = 'num';
  for (const k of ['priceDay', 'priceWeekend', 'deposit'] as const) if (!posNum(d[k])) e[k] = 'num';
  if (d.socket != null && d.socket !== 7 && d.socket !== 13) e.socket = 'socket';
  if (d.tempRange && (!Number.isFinite(d.tempRange.minC) || !Number.isFinite(d.tempRange.maxC) || d.tempRange.minC > d.tempRange.maxC)) e.tempRange = 'temp';
  if ((d.suitableFor ?? []).some((c) => !cargo.includes(c))) e.suitableFor = 'cargo';
  if (d.notes && !d.notes.fr?.trim() && Object.values(d.notes).some((x) => x?.trim())) e['notes.fr'] = 'required';
  return e;
}

/** Leere optionale Felder entfernen bzw. auf null setzen, Zahlen normalisieren */
export function cleanFleet(d: FleetData): FleetData {
  const out: FleetData = { ...d };
  const strip = (o: Record<string, string | undefined> | null | undefined) => {
    if (!o) return null;
    const r: Record<string, string> = {};
    for (const [k, v] of Object.entries(o)) if (v && v.trim()) r[k] = v.trim();
    return r.fr ? (r as I18nText) : null;
  };
  out.name = strip(d.name) ?? { fr: '' };
  out.notes = strip(d.notes ?? null);
  for (const k of ['brand', 'power', 'photo'] as const) {
    const v = out[k];
    out[k] = typeof v === 'string' && v.trim() ? v.trim() : null;
  }
  return out;
}

export const json = (x: unknown) => JSON.stringify(x, null, 2) + '\n';

/** Unterschiede zwischen Ausgangsstand und Entwurf als Dateiänderungen */
export function changes(orig: Draft, draft: Draft): FileChange[] {
  const out: FileChange[] = [];
  if (json(orig.site) !== json(draft.site)) out.push({ path: 'src/content/site.json', text: json(draft.site) });
  if (json(orig.horaires) !== json(draft.horaires)) out.push({ path: 'src/content/horaires.json', text: json(draft.horaires) });
  if (json(orig.texts) !== json(draft.texts)) out.push({ path: 'src/content/texts.json', text: json(draft.texts) });
  const before = new Map(orig.fleet.map((f) => [f.path, f]));
  const after = new Map(draft.fleet.map((f) => [f.path, f]));
  for (const [p, f] of after) if (!before.has(p) || json(before.get(p)!.data) !== json(f.data)) out.push({ path: p, text: json(cleanFleet(f.data)) });
  for (const p of before.keys()) if (!after.has(p)) out.push({ path: p, delete: true });
  for (const [p, u] of Object.entries(draft.uploads)) out.push({ path: p, base64: u.base64 });
  for (const p of draft.deletes) if (!draft.uploads[p]) out.push({ path: p, delete: true });
  return out;
}

/** Foto verkleinern (längste Seite max), als JPEG; Ausrichtung aus EXIF übernimmt der Browser */
export async function resizeImage(file: File, max = 2400, quality = 0.85): Promise<Upload> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * scale);
  const h = Math.round(bmp.height * scale);
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(bmp, 0, 0, w, h);
  bmp.close();
  const dataUrl = canvas.toDataURL('image/jpeg', quality);
  return { dataUrl, base64: dataUrl.split(',')[1] };
}

/** Wert eines Textes: Dashboard-Änderung, sonst Grundtext der Sprache, sonst Französisch */
export function textValue(data: BuildData, texts: Texts, lang: Lang, key: string): string {
  return texts[lang]?.[key] ?? data.dict[lang]?.[key] ?? '';
}
