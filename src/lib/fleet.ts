/**
 * Mietflotte: Typen und Auswertung für den Finder „Quelle remorque ?" (C5).
 * Rein, ohne Astro – die React-Island nutzt dieselben Funktionen wie der Build.
 */
import { assessTrailer, assessVan, fits, LIMITS, type Assessment, type CarData, type VisitorLicence } from './permis.ts';
import type { Lang } from '../i18n/config.ts';

export const CARGO_ORDER = ['voiture', 'moto', 'terre', 'fete', 'meubles', 'materiel'] as const;
/** Kennung einer Ladungsart (src/content/cargo.json); CARGO_ORDER sind die ursprünglichen */
export type Cargo = string;

export type Category =
  | 'porte-voiture'
  | 'porte-moto'
  | 'benne'
  | 'frigorifique'
  | 'plateau'
  | 'fourgon'
  | 'camionnette'
  | 'voiture';

export const TRAILER_CATEGORIES: Category[] = ['porte-voiture', 'porte-moto', 'benne', 'frigorifique', 'plateau', 'fourgon'];

export interface FleetItem {
  id: string;
  category: Category;
  name: string;
  brand: string | null;
  mmaKg: number;
  emptyKg: number | null;
  payloadKg: number;
  braked: boolean;
  loadLengthM: number | null;
  loadWidthM: number | null;
  loadHeightM: number | null;
  volumeM3: number | null;
  tempRange: { minC: number; maxC: number } | null;
  power: string | null;
  socket: 7 | 13 | null;
  showPallets: boolean;
  suitableFor: Cargo[];
  priceHalfDay: number | null;
  priceDay: number | null;
  priceWeekend: number | null;
  priceWeek: number | null;
  deposit: number | null;
  kmHalfDay: number | null;
  kmDay: number | null;
  kmWeekend: number | null;
  kmWeek: number | null;
  priceExtraKm: number | null;
  notes: string | null;
  photo: string | null;
  sample: boolean;
}

export const isTrailer = (i: Pick<FleetItem, 'category'>) => TRAILER_CATEGORIES.includes(i.category);
export const isVan = (i: Pick<FleetItem, 'category'>) => i.category === 'camionnette';

/** Rohdaten eines Fahrzeugs (wie src/content/flotte/*.json, Felder dürfen fehlen) */
export interface FleetSource {
  category: string;
  name: { fr: string } & Partial<Record<Lang, string>>;
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
  kmHalfDay?: number | null;
  kmDay?: number | null;
  kmWeekend?: number | null;
  kmWeek?: number | null;
  priceExtraKm?: number | null;
  notes?: ({ fr: string } & Partial<Record<Lang, string>>) | null;
  photo?: string | null;
  active?: boolean;
  sample?: boolean;
}

/** Rohdaten → Eintrag in einer Sprache (Build und Vorschau im Admin-Bereich) */
export function toFleetItem(id: string, d: FleetSource, lang: Lang): FleetItem {
  return {
    id,
    category: d.category as Category,
    name: d.name[lang] || d.name.fr,
    brand: d.brand ?? null,
    mmaKg: d.mmaKg,
    emptyKg: d.emptyKg ?? null,
    payloadKg: d.payloadKg,
    braked: d.braked,
    loadLengthM: d.loadLengthM ?? null,
    loadWidthM: d.loadWidthM ?? null,
    loadHeightM: d.loadHeightM ?? null,
    volumeM3: d.volumeM3 ?? null,
    tempRange: d.tempRange ?? null,
    power: d.power ?? null,
    socket: d.socket ?? null,
    showPallets: d.showPallets ?? false,
    suitableFor: (d.suitableFor ?? []) as Cargo[],
    priceHalfDay: d.priceHalfDay ?? null,
    priceDay: d.priceDay ?? null,
    priceWeekend: d.priceWeekend ?? null,
    priceWeek: d.priceWeek ?? null,
    deposit: d.deposit ?? null,
    kmHalfDay: d.kmHalfDay ?? null,
    kmDay: d.kmDay ?? null,
    kmWeekend: d.kmWeekend ?? null,
    kmWeek: d.kmWeek ?? null,
    priceExtraKm: d.priceExtraKm ?? null,
    notes: d.notes ? d.notes[lang] || d.notes.fr : null,
    photo: d.photo ?? null,
    sample: d.sample ?? false,
  };
}

/** Warum ein Fahrzeug nicht angezeigt wird (null = wird angezeigt) */
export function hiddenReason(d: FleetSource, showSamples: boolean): 'inactive' | 'sample' | 'trailerLimit' | 'vanLimit' | null {
  if (d.active === false) return 'inactive';
  if (d.sample && !showSamples) return 'sample';
  const cat = { category: d.category as Category };
  if (isTrailer(cat) && d.mmaKg > LIMITS.trailerBEKg) return 'trailerLimit';
  if (isVan(cat) && d.mmaKg > LIMITS.vanBKg) return 'vanLimit';
  return null;
}

export const bySmallest = (a: FleetItem, b: FleetItem) => a.payloadKg - b.payloadKg;

export interface FinderState {
  cargo: Cargo | null;
  licence: VisitorLicence | null;
  car: CarData;
}

export interface ResultRow {
  item: FleetItem;
  kind: 'trailer' | 'van';
  assessment: Assessment;
}

export interface Evaluation {
  trailers: ResultRow[];
  vans: ResultRow[];
  fitCount: number;
}

/** Nur Ladungsarten, für die mindestens ein aktives Fahrzeug passt. */
export function cargoOptions(items: FleetItem[], order: readonly string[] = CARGO_ORDER): Cargo[] {
  return order.filter((c) => items.some((i) => i.suitableFor.includes(c)));
}

export function evaluate(items: FleetItem[], state: FinderState): Evaluation {
  const trailers = items
    .filter(isTrailer)
    .filter((i) => !state.cargo || i.suitableFor.includes(state.cargo))
    .map((item) => ({ item, kind: 'trailer' as const, assessment: assessTrailer(item, state.licence, state.car) }))
    .filter((r) => r.assessment.required.kind !== 'exceeds')
    .sort((a, b) => a.assessment.group - b.assessment.group || a.item.payloadKg - b.item.payloadKg);

  // Transporter wie Anhänger: ohne gewählte Ladung alle, sonst die, die dafür passen
  const vans = items
    .filter(isVan)
    .filter((i) => !state.cargo || i.suitableFor.includes(state.cargo))
    .map((item) => ({ item, kind: 'van' as const, assessment: assessVan(item, state.licence) }))
    .filter((r) => r.assessment.required.kind !== 'exceeds')
    .sort((a, b) => a.item.payloadKg - b.item.payloadKg);

  const fitCount = [...trailers, ...vans].filter((r) => fits(r.assessment)).length;
  return { trailers, vans, fitCount };
}

/** Link zum Mietformular mit Vorbelegung (C5): ?remorque=&permis=&objet= */
export function requestHref(base: string, id: string, licence: VisitorLicence | null, cargo: Cargo | null): string {
  const p = new URLSearchParams({ remorque: id });
  if (licence && licence !== 'unknown') p.set('permis', licence);
  if (cargo) p.set('objet', cargo);
  return `${base}?${p.toString()}#demande`;
}
