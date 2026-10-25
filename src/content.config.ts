import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import categoriesJson from './content/categories.json';

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

/** feste Arten plus eigene aus src/content/categories.json (Admin-Bereich) */
const CUSTOM_CATEGORY_IDS = (categoriesJson as { items: { id: string }[] }).items.map((c) => c.id);
const isCategory = (c: string) => (CATEGORIES as readonly string[]).includes(c) || CUSTOM_CATEGORY_IDS.includes(c);

const flotte = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/flotte' }),
  schema: z.object({
    category: z.string().refine(isCategory, { message: 'Unbekannte Art (src/content/categories.json)' }),
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
    // Motorrad- und Autoanhänger: wie viele Fahrzeuge passen (leer = aus der Ladefläche berechnet)
    capacity: z.number().int().positive().max(9).nullable().default(null),
    // Ladungsarten aus src/content/cargo.json (im Admin-Bereich erweiterbar); unbekannte ignoriert der Finder
    suitableFor: z.array(z.string().regex(/^[a-z0-9][a-z0-9-]{0,30}$/)).default([]),
    priceHalfDay: z.number().positive().nullable().default(null),
    priceDay: z.number().positive().nullable().default(null),
    priceWeekend: z.number().positive().nullable().default(null),
    priceWeek: z.number().positive().nullable().default(null),
    deposit: z.number().positive().nullable().default(null),
    // Transporter: inklusive Kilometer je Mietdauer und Preis je weiterem Kilometer
    kmHalfDay: z.number().int().positive().nullable().default(null),
    kmDay: z.number().int().positive().nullable().default(null),
    kmWeekend: z.number().int().positive().nullable().default(null),
    kmWeek: z.number().int().positive().nullable().default(null),
    priceExtraKm: z.number().positive().nullable().default(null),
    notes: i18nText.nullable().default(null),
    photo: z.string().nullable().default(null),
    active: z.boolean().default(true),
    sample: z.boolean().default(false),
  }),
});

export const collections = { flotte };
