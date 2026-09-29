/**
 * Mietflotte: Typen und Auswertung für den Finder „Quelle remorque ?" (C5).
 * Rein, ohne Astro – die React-Island nutzt dieselben Funktionen wie der Build.
 */
import { assessTrailer, assessVan, fits, type Assessment, type CarData, type VisitorLicence } from './permis.ts';

export const CARGO_ORDER = ['voiture', 'moto', 'terre', 'fete', 'meubles', 'materiel'] as const;
export type Cargo = (typeof CARGO_ORDER)[number];

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
  priceDay: number | null;
  priceWeekend: number | null;
  deposit: number | null;
  notes: string | null;
  photo: string | null;
  sample: boolean;
}

export const isTrailer = (i: Pick<FleetItem, 'category'>) => TRAILER_CATEGORIES.includes(i.category);
export const isVan = (i: Pick<FleetItem, 'category'>) => i.category === 'camionnette';

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
export function cargoOptions(items: FleetItem[]): Cargo[] {
  return CARGO_ORDER.filter((c) => items.some((i) => i.suitableFor.includes(c)));
}

export function evaluate(items: FleetItem[], state: FinderState): Evaluation {
  const trailers = items
    .filter(isTrailer)
    .filter((i) => !state.cargo || i.suitableFor.includes(state.cargo))
    .map((item) => ({ item, kind: 'trailer' as const, assessment: assessTrailer(item, state.licence, state.car) }))
    .filter((r) => r.assessment.required.kind !== 'exceeds')
    .sort((a, b) => a.assessment.group - b.assessment.group || a.item.payloadKg - b.item.payloadKg);

  const vans =
    state.cargo === 'meubles'
      ? items
          .filter(isVan)
          .map((item) => ({ item, kind: 'van' as const, assessment: assessVan(item, state.licence) }))
          .filter((r) => r.assessment.required.kind !== 'exceeds')
          .sort((a, b) => a.item.payloadKg - b.item.payloadKg)
      : [];

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
