/**
 * Normalisiertes Schema eines Fahrzeugs im Bestand (T2.4).
 * Wird vom Abgleich (scripts/sync) und vom Build (Autoseiten) benutzt.
 */
import { z } from 'zod';

export const FUELS = ['petrol', 'diesel', 'hybrid', 'plugin_hybrid', 'electric', 'lpg', 'other'] as const;
export const TRANSMISSIONS = ['automatic', 'manual', 'other'] as const;
export const BODIES = [
  'estate',
  'saloon',
  'suv',
  'city',
  'coupe',
  'convertible',
  'mpv',
  'van',
  'pickup',
  'other',
] as const;

export type Fuel = (typeof FUELS)[number];
export type Transmission = (typeof TRANSMISSIONS)[number];
export type Body = (typeof BODIES)[number];

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD');
const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'YYYY-MM');

export const descriptionBlockSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('p'), text: z.string().min(1) }),
  z.object({ kind: z.literal('ul'), items: z.array(z.string().min(1)).min(1) }),
]);
export type DescriptionBlock = z.infer<typeof descriptionBlockSchema>;

export const photoSchema = z.object({
  url: z.url({ protocol: /^https$/ }),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});

/** Das, was eine Quelle liefert – ohne Lebenslauf. */
export const listingSchema = z.object({
  stableId: z.string().regex(/^(r\d+|lx\d+|as[0-9a-f-]+)$/),
  source: z.enum(['luxauto', 'autoscout24']),
  sourceId: z.string().min(1),
  sourceUrl: z.url({ protocol: /^https$/ }),

  make: z.string().min(1).max(60),
  model: z.string().min(1).max(80),
  version: z.string().max(200),
  condition: z.enum(['new', 'used']),
  firstRegistration: yearMonth.nullable(),
  modelYear: z.number().int().min(1900).max(2100).nullable(),
  mileageKm: z.number().int().min(0).max(2_000_000),

  fuel: z.enum(FUELS),
  fuelRaw: z.string().optional(),
  transmission: z.enum(TRANSMISSIONS),
  transmissionRaw: z.string().optional(),
  powerHp: z.number().int().positive().nullable(),
  powerKw: z.number().int().positive().nullable(),
  displacementCc: z.number().int().positive().nullable(),

  body: z.enum(BODIES),
  bodyRaw: z.string().optional(),
  seats: z.number().int().min(1).max(9).nullable(),
  colorExterior: z.string().max(60).nullable(),
  colorInterior: z.string().max(60).nullable(),

  co2Gkm: z.number().nonnegative().nullable(),
  wltpConsumption: z.string().max(120).nullable(),
  euroNorm: z.string().max(40).nullable(),

  priceEur: z.number().int().positive().max(5_000_000),
  vatRecoverable: z.boolean(),
  options: z.array(z.string().min(1).max(200)),
  description: z.array(descriptionBlockSchema),
  photos: z.array(photoSchema),
  garageRef: z.string().regex(/^\d+$/).nullable(),
});
export type Listing = z.infer<typeof listingSchema>;

/** Ein Fahrzeug im Bestand, mit Lebenslauf (T2.7). */
export const vehicleSchema = listingSchema.extend({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  firstSeen: isoDate,
  lastSeen: isoDate,
  lastChanged: isoDate,
  status: z.enum(['active', 'unavailable']),
  unavailableSince: isoDate.nullable(),
});
export type Vehicle = z.infer<typeof vehicleSchema>;

export const stockFileSchema = z.object({
  vehicles: z.array(vehicleSchema),
});
export type StockFile = z.infer<typeof stockFileSchema>;

export const syncStatusSchema = z.object({
  lastSuccess: z.string().nullable(),
  lastRun: z.string().nullable(),
  status: z.enum(['ok', 'error', 'never']),
  source: z.enum(['luxauto', 'autoscout24']).nullable(),
  count: z.number().int().min(0),
  warnings: z.array(z.string()),
  error: z.string().nullable().optional(),
});
export type SyncStatus = z.infer<typeof syncStatusSchema>;

/** Manuelle Ergänzungen von Nave (T2.8), Schlüssel = stableId. */
export const overridesSchema = z.record(
  z.string(),
  z.object({
    wltpConsumption: z.string().max(120).optional(),
    co2Gkm: z.number().nonnegative().optional(),
    condition: z.enum(['new', 'used']).optional(),
    hide: z.boolean().optional(),
    note: z.string().optional(),
  }),
);
export type Overrides = z.infer<typeof overridesSchema>;
