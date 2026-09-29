import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Mietflotte (C5). Eine JSON-Datei pro Fahrzeug in src/content/flotte/.
 * Beispiele in _dev/ tragen sample: true und werden im Produktions-Build herausgefiltert
 * (src/lib/fleet.server.ts).
 */
const i18nText = z.object({
  fr: z.string().min(1),
  de: z.string().optional(),
  lb: z.string().optional(),
  en: z.string().optional(),
  pt: z.string().optional(),
});

export const CATEGORIES = [
  'porte-voiture',
  'porte-moto',
  'benne',
  'frigorifique',
  'plateau',
  'fourgon',
  'camionnette',
  'voiture',
] as const;

export const CARGO = ['voiture', 'moto', 'terre', 'fete', 'meubles', 'materiel'] as const;

const flotte = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/flotte' }),
  schema: z.object({
    category: z.enum(CATEGORIES),
    name: i18nText,
    brand: z.string().nullable().default(null),
    mmaKg: z.number().int().positive(),
    emptyKg: z.number().int().positive().nullable().default(null),
    payloadKg: z.number().int().positive(),
    braked: z.boolean(),
    loadLengthM: z.number().positive().max(12).nullable().default(null),
    loadWidthM: z.number().positive().max(3).nullable().default(null),
    loadHeightM: z.number().positive().max(4).nullable().default(null),
    volumeM3: z.number().positive().nullable().default(null),
    tempRange: z.object({ minC: z.number(), maxC: z.number() }).nullable().default(null),
    power: z.string().nullable().default(null),
    socket: z.union([z.literal(7), z.literal(13)]).nullable().default(null),
    showPallets: z.boolean().default(false),
    suitableFor: z.array(z.enum(CARGO)).default([]),
    priceDay: z.number().positive().nullable().default(null),
    priceWeekend: z.number().positive().nullable().default(null),
    deposit: z.number().positive().nullable().default(null),
    notes: i18nText.nullable().default(null),
    photo: z.string().nullable().default(null),
    active: z.boolean().default(true),
    sample: z.boolean().default(false),
  }),
});

export const collections = { flotte };
