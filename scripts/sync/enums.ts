/**
 * Zuordnung der Rohwerte beider Portale zu den Enums (T2.6).
 * Unbekannte Werte → 'other' plus Rohwert und Log-Eintrag.
 */
import type { Body, Fuel, Transmission } from '../../src/lib/stock-schema.ts';

export function norm(s: string): string {
  return s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

const FUEL_MAP: Record<string, Fuel> = {
  essence: 'petrol',
  petrol: 'petrol',
  benzin: 'petrol',
  'super 95': 'petrol',
  diesel: 'diesel',
  hybride: 'hybrid',
  hybrid: 'hybrid',
  'hybride essence': 'hybrid',
  'hybride diesel': 'hybrid',
  'electrique essence': 'hybrid',
  'electrique diesel': 'hybrid',
  'hybride rechargeable': 'plugin_hybrid',
  'plug in hybrid': 'plugin_hybrid',
  'hybride plug in': 'plugin_hybrid',
  electrique: 'electric',
  electric: 'electric',
  gpl: 'lpg',
  lpg: 'lpg',
};

const TRANSMISSION_MAP: Record<string, Transmission> = {
  automatique: 'automatic',
  'boite automatique': 'automatic',
  automatic: 'automatic',
  'semi automatique': 'automatic',
  manuelle: 'manual',
  'boite manuelle': 'manual',
  manual: 'manual',
};

const BODY_MAP: Record<string, Body> = {
  break: 'estate',
  berline: 'saloon',
  suv: 'suv',
  '4x4': 'suv',
  'suv 4x4': 'suv',
  'tout terrain suv': 'suv',
  'tout terrain': 'suv',
  'suv tout terrain': 'suv',
  'suv 4x4 pick up': 'suv',
  citadine: 'city',
  coupe: 'coupe',
  cabriolet: 'convertible',
  'cabriolet roadster': 'convertible',
  roadster: 'convertible',
  monospace: 'mpv',
  utilitaire: 'van',
  fourgon: 'van',
  'vehicule utilitaire': 'van',
  'pick up': 'pickup',
  pickup: 'pickup',
};

export interface Mapped<T> {
  value: T;
  raw: string;
  known: boolean;
}

function mapWith<T extends string>(table: Record<string, T>, raw: string | null | undefined, other: T): Mapped<T> {
  const r = (raw ?? '').trim();
  const hit = table[norm(r)];
  return hit ? { value: hit, raw: r, known: true } : { value: other, raw: r, known: false };
}

export const mapFuel = (raw: string | null | undefined) => mapWith<Fuel>(FUEL_MAP, raw, 'other');
export const mapTransmission = (raw: string | null | undefined) =>
  mapWith<Transmission>(TRANSMISSION_MAP, raw, 'other');
export const mapBody = (raw: string | null | undefined) => mapWith<Body>(BODY_MAP, raw, 'other');

/** kW = CV × 0,7355, gerundet (T2.6). */
export function hpToKw(hp: number): number {
  return Math.round(hp * 0.7355);
}
