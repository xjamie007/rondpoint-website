/**
 * Motorräder und Autos auf der Ladefläche (Draufsicht im Finder), wie die Europaletten in
 * pallets.ts aus den Maßen berechnet. Der Platzbedarf sind Richtwerte, keine Herstellerangaben;
 * im Admin-Bereich lässt sich die Zahl je Anhänger festlegen (Feld capacity), dann gilt diese.
 */
import type { Rect } from './pallets.ts';

export type VehicleKind = 'moto' | 'voiture';

/** Platzbedarf von oben (Länge in Fahrtrichtung, Breite) in m und Gewicht in kg, mit dem gerechnet wird */
export const VEHICLE: Record<VehicleKind, { l: number; w: number; kg: number }> = {
  moto: { l: 2.1, w: 0.7, kg: 200 },
  voiture: { l: 3.8, w: 1.7, kg: 1000 },
};

/** Welche Fahrzeuge ein Anhänger trägt: nur Motorrad- und Autoanhänger */
export function vehicleKind(category: string): VehicleKind | null {
  return category === 'porte-moto' ? 'moto' : category === 'porte-voiture' ? 'voiture' : null;
}

const EPS = 1e-9;

/** Wie viele passen: festgelegt oder aus Ladefläche und Nutzlast (null = keine Angabe möglich) */
export function vehicleCapacity(i: { category: string; capacity?: number | null; loadLengthM?: number | null; loadWidthM?: number | null; payloadKg: number }): { n: number; approx: boolean } | null {
  const kind = vehicleKind(i.category);
  if (!kind) return null;
  if (i.capacity != null) return { n: i.capacity, approx: false };
  if (i.loadLengthM == null || i.loadWidthM == null) return null;
  const v = VEHICLE[kind];
  const bySpace = Math.floor((i.loadLengthM + EPS) / v.l) * Math.floor((i.loadWidthM + EPS) / v.w);
  // ein Fahrzeug passt immer, auch wenn es etwas übersteht (Autoanhänger sind dafür gebaut)
  const n = Math.max(1, Math.min(bySpace, Math.floor(i.payloadKg / v.kg)));
  // eines passt sicher; „ca.“ nur, wenn mehrere berechnet sind
  return { n, approx: n > 1 };
}

/** Lage der Fahrzeuge für die Zeichnung (m, Ladefläche ab 0/0, vorn = links): nebeneinander in Spuren */
export function placeVehicles(kind: VehicleKind, lengthM: number, widthM: number, count: number, capacity: number): Rect[] {
  const v = VEHICLE[kind];
  const lanes = Math.max(1, Math.min(capacity, Math.floor((widthM + EPS) / v.w) || 1));
  const rows = Math.max(1, Math.ceil(capacity / lanes));
  const laneW = widthM / lanes;
  const w = Math.min(laneW * 0.9, kind === 'moto' ? 0.66 : 1.78);
  const l = Math.min((lengthM / rows) * 0.94, kind === 'moto' ? 2.1 : 4.25);
  const out: Rect[] = [];
  for (let k = 0; k < Math.min(count, capacity); k++) {
    const lane = k % lanes;
    const row = Math.floor(k / lanes);
    // Motorräder leicht versetzt, damit sich die Lenker nicht berühren
    const shift = kind === 'moto' && lanes > 1 ? (lane % 2 ? 0.08 : -0.08) * lengthM : 0;
    const x = (lengthM / rows) * row + (lengthM / rows - l) / 2 + shift;
    out.push({ x: Math.max(0, Math.min(lengthM - l, x)), y: laneW * lane + (laneW - w) / 2, w: l, h: w });
  }
  return out;
}
