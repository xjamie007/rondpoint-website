/**
 * Primärquelle LuxAuto (T2.3).
 *
 * Detailseiten sind serverseitig gerendert (Next.js). Gelesen wird aus
 *  1. JSON-LD (@type Product)
 *  2. sichtbaren Labels im HTML („Kilométrage", „Année" …) – nie aus CSS-Klassen,
 *     die Next.js bei jedem Release neu erzeugt
 *  3. dem Merkmal "vehicule_neuf" im Next.js-Datenstrom: Neuwagen stehen im
 *     JSON-LD fälschlich als UsedCondition.
 *
 * Fotos: Variante „x" ist die größte (2048 × 1536 px, 4:3, gemessen am 28.09.2026).
 * „b" = 400 × 300, „r" = 530 × 350.
 */
import { load, type CheerioAPI } from 'cheerio';
import type { AnyNode, Element } from 'domhandler';
import { listingSchema, type Listing } from '../../../src/lib/stock-schema.ts';
import { hpToKw, mapBody, mapFuel, mapTransmission, norm } from '../enums.ts';
import {
  cleanDescription,
  dashToNull,
  extractGarageRef,
  parseIntLoose,
  parseMonthYear,
  plausible,
  PLAUSIBLE,
} from '../text.ts';
import type { HttpClient } from '../http.ts';
import { ParseError, type ParsedListing, type SourceAdapter, type SourceResult } from './types.ts';

export const LUXAUTO_ORIGIN = 'https://www.luxauto.lu';
export const LUXAUTO_SELLER_ID = '450143';
export const LUXAUTO_GARAGE_URL = `${LUXAUTO_ORIGIN}/fr/garage/garage-um-rond-point-450143`;
export const LUXAUTO_SELLER_NAME = 'GARAGE UM ROND POINT';
export const LUXAUTO_PHOTO_VARIANT = 'x';

const LISTING_PATH_RE = /^\/fr\/voiture\/([a-z0-9-]+)-(\d+)\/?$/;
const PHOTO_RE = /https?:\/\/static\.prd\.luxauto\.lu\/pictures\/occasions\/[a-z]\/(\d+_[A-Za-z0-9]+)\.(jpe?g|png|webp)/g;

/* ------------------------------------------------------------------
   Garagenseite
------------------------------------------------------------------- */
export interface GaragePage {
  listingUrls: string[];
  pageUrls: string[];
  /** Anzahl laut sichtbarem Text „sur N annonces" */
  announcedCount: number | null;
}

export function parseGaragePage(html: string): GaragePage {
  const $ = load(html);
  const listing = new Set<string>();
  const pages = new Map<number, string>();
  $('a[href]').each((_, a) => {
    const href = $(a).attr('href') ?? '';
    let url: URL;
    try {
      url = new URL(href, LUXAUTO_ORIGIN);
    } catch {
      return;
    }
    if (url.origin !== LUXAUTO_ORIGIN) return;
    if (LISTING_PATH_RE.test(url.pathname)) {
      listing.add(`${LUXAUTO_ORIGIN}${url.pathname.replace(/\/$/, '')}`);
      return;
    }
    // Paginierung: nur Seiten dieser Garage
    if (url.searchParams.get('sellerId') === LUXAUTO_SELLER_ID && url.searchParams.has('page')) {
      const n = Number(url.searchParams.get('page'));
      if (Number.isInteger(n) && n > 0) pages.set(n, url.toString());
    }
  });
  const text = $('body').text().replace(/\s+/g, ' ');
  const m = text.match(/sur\s+(\d+)\s+annonces?/i) ?? text.match(/(\d+)\s+véhicules?\s+proposés/i);
  return {
    listingUrls: [...listing],
    pageUrls: [...pages.entries()].sort((a, b) => a[0] - b[0]).map(([, u]) => u),
    announcedCount: m ? Number(m[1]) : null,
  };
}

/* ------------------------------------------------------------------
   Detailseite
------------------------------------------------------------------- */
interface ProductLd {
  '@type'?: string;
  url?: string;
  image?: string;
  brand?: { name?: string };
  model?: string;
  name?: string;
  vehicleModelDate?: string;
  fuelType?: string;
  mileageFromOdometer?: { value?: number };
  vehicleTransmission?: string;
  bodyType?: string;
  offers?: {
    price?: number;
    priceCurrency?: string;
    itemCondition?: string;
    seller?: { name?: string };
  };
}

function readProductLd($: CheerioAPI): ProductLd {
  let found: ProductLd | null = null;
  $('script[type="application/ld+json"]').each((_, el) => {
    if (found) return;
    try {
      const data = JSON.parse($(el).text());
      const items = Array.isArray(data) ? data : [data];
      for (const d of items) if (d && d['@type'] === 'Product') found = d;
    } catch {
      /* anderes JSON-LD */
    }
  });
  if (!found) throw new ParseError('Kein JSON-LD vom Typ Product gefunden');
  return found;
}

function isTag(n: AnyNode): n is Element {
  return n.type === 'tag';
}

/** Alle Elemente in Dokumentreihenfolge ab der h1. */
function elementsAfterH1($: CheerioAPI): Element[] {
  const all = $('body *').toArray().filter(isTag);
  const h1 = $('h1').first()[0];
  if (!h1) throw new ParseError('Keine h1 gefunden');
  return all.slice(all.indexOf(h1 as Element));
}

/** Findet das Label-Element und liefert den Text des Wert-Elements daneben. */
function valueForLabel($: CheerioAPI, scope: Element[], label: string): string | null {
  const wanted = norm(label);
  const el = scope.find((e) => $(e).children().length === 0 && norm($(e).text()) === wanted);
  if (!el) return null;
  let value = $(el).next();
  if (value.length === 0) value = $(el).parent().next();
  if (value.length === 0) return null;
  return $(value).text().replace(/\s+/g, ' ').trim();
}

function descriptionLines($: CheerioAPI, scope: Element[]): string[] {
  const h2 = scope.find((e) => e.tagName === 'h2' && norm($(e).text()) === 'description');
  if (!h2) return [];
  const container = $(h2).next();
  if (container.length === 0) return [];
  container.find('br').replaceWith('\n');
  const lines: string[] = [];
  container.find('*').each((_, el) => {
    if ($(el).children().length === 0) lines.push(...$(el).text().split('\n'));
  });
  if (lines.length === 0) lines.push(...container.text().split('\n'));
  return lines;
}

function optionsList($: CheerioAPI, scope: Element[]): string[] {
  const h2 = scope.find((e) => e.tagName === 'h2' && /^options\b/.test(norm($(e).text())));
  if (!h2) return [];
  const section = $(h2).parent();
  const items = section
    .find('li')
    .toArray()
    .map((li) => $(li).text().replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  return [...new Set(items)];
}

/** Fotos der Galerie: <img> im HTML vor der h1 (ähnliche Fahrzeuge stehen nur in Skripten danach). */
export function galleryPhotos(html: string): string[] {
  const h1 = html.indexOf('<h1');
  const head = (h1 > 0 ? html.slice(0, h1) : html).replace(/<script[\s\S]*?<\/script>/gi, '');
  const ids: string[] = [];
  for (const m of head.matchAll(PHOTO_RE)) if (!ids.includes(m[1])) ids.push(m[1]);
  return ids.map((id) => `https://static.prd.luxauto.lu/pictures/occasions/${LUXAUTO_PHOTO_VARIANT}/${id}.jpg`);
}

/** Merkmale aus dem Next.js-Datenstrom (z. B. "vehicule_neuf"). */
export function listingFeatures(html: string, slug: string): string[] {
  const raw = html.replace(/\\"/g, '"');
  const re = new RegExp(`"features":\\[([^\\]]*)\\][^{}]{0,120}?"slug":"${slug.replace(/[-]/g, '\\-')}"`);
  const m = raw.match(re);
  if (!m) return [];
  return m[1]
    .split(',')
    .map((s) => s.replace(/"/g, '').trim())
    .filter(Boolean);
}

export function parseDetailPage(html: string, url: string): ParsedListing {
  const warnings: string[] = [];
  const u = new URL(url);
  const pm = u.pathname.match(LISTING_PATH_RE);
  if (!pm) throw new ParseError(`Unerwartete Inserats-URL ${url}`);
  const [, slugBase, sourceId] = pm;
  const slug = `${slugBase}-${sourceId}`;
  const warn = (msg: string) => warnings.push(`lx${sourceId}: ${msg}`);

  const $ = load(html);
  const ld = readProductLd($);

  const seller = ld.offers?.seller?.name ?? '';
  if (norm(seller) !== norm(LUXAUTO_SELLER_NAME)) {
    throw new ParseError(`Inserat ${sourceId} gehört nicht zur Garage (Verkäufer „${seller}")`);
  }

  const scope = elementsAfterH1($);
  const h1 = $('h1').first();
  const version = h1.children('span').first().text().replace(/\s+/g, ' ').trim();

  const mileageTxt = valueForLabel($, scope, 'Kilométrage');
  const yearTxt = valueForLabel($, scope, 'Année');
  const transmissionTxt = valueForLabel($, scope, 'Transmission') ?? ld.vehicleTransmission ?? null;
  const fuelTxt = valueForLabel($, scope, 'Carburant') ?? ld.fuelType ?? null;
  const powerTxt = valueForLabel($, scope, 'Puissance (CV)');
  const ccTxt = valueForLabel($, scope, 'Cylindrée');
  const bodyTxt = valueForLabel($, scope, 'Carrosserie') ?? ld.bodyType ?? null;
  const seatsTxt = valueForLabel($, scope, 'Nombre de places');
  const colorExt = dashToNull(valueForLabel($, scope, 'Couleur extérieure'));
  const colorInt = dashToNull(valueForLabel($, scope, 'Couleur intérieure'));
  const co2Txt = dashToNull(valueForLabel($, scope, 'Émissions de g CO₂/km'));
  const euroTxt = dashToNull(valueForLabel($, scope, 'Norme d’émission') ?? valueForLabel($, scope, "Norme d'émission"));

  const features = listingFeatures(html, slug);
  const isNew = features.includes('vehicule_neuf') || /NewCondition/i.test(ld.offers?.itemCondition ?? '');

  const lines = descriptionLines($, scope);
  const garageRef = extractGarageRef(lines);
  const description = cleanDescription(lines);

  const fuel = mapFuel(fuelTxt);
  if (!fuel.known) warn(`unbekannter Kraftstoff „${fuel.raw}"`);
  const transmission = mapTransmission(transmissionTxt);
  if (!transmission.known) warn(`unbekanntes Getriebe „${transmission.raw}"`);
  const body = mapBody(bodyTxt);
  if (!body.known) warn(`unbekannte Karosserie „${body.raw}"`);

  const powerHp = plausible(parseIntLoose(powerTxt), PLAUSIBLE.powerHp, 'Leistung (CV)', warn);
  const displacementCc = plausible(parseIntLoose(ccTxt), PLAUSIBLE.displacementCc, 'Hubraum (cm³)', warn);
  const seats = plausible(parseIntLoose(seatsTxt), PLAUSIBLE.seats, 'Plätze', warn);

  const mileage = ld.mileageFromOdometer?.value ?? parseIntLoose(mileageTxt);
  // Bei Neuwagen zeigt LuxAuto unter „Année" das Einstelldatum, keine Erstzulassung.
  const firstRegistration = isNew ? null : parseMonthYear(yearTxt);
  const modelYear = parseIntLoose(ld.vehicleModelDate ?? null);

  const vatRecoverable = scope
    .slice(0, 60)
    .some((e) => $(e).children().length === 0 && /^tva recuperable$/.test(norm($(e).text())));

  const photos = galleryPhotos(html).map((url) => ({ url, width: 2048, height: 1536 }));
  if (photos.length === 0) warn('keine Fotos gefunden');

  const candidate: Listing = {
    stableId: garageRef ? `r${garageRef}` : `lx${sourceId}`,
    source: 'luxauto',
    sourceId,
    sourceUrl: `${LUXAUTO_ORIGIN}${u.pathname.replace(/\/$/, '')}`,
    make: (ld.brand?.name ?? '').trim(),
    model: (ld.model ?? '').trim(),
    version,
    condition: isNew ? 'new' : 'used',
    firstRegistration,
    modelYear: modelYear && modelYear >= 1900 ? modelYear : null,
    mileageKm: mileage ?? -1,
    fuel: fuel.value,
    ...(fuel.known ? {} : { fuelRaw: fuel.raw }),
    transmission: transmission.value,
    ...(transmission.known ? {} : { transmissionRaw: transmission.raw }),
    powerHp,
    powerKw: powerHp ? hpToKw(powerHp) : null,
    displacementCc,
    body: body.value,
    ...(body.known ? {} : { bodyRaw: body.raw }),
    seats,
    colorExterior: colorExt,
    colorInterior: colorInt,
    co2Gkm: co2Txt ? parseIntLoose(co2Txt) : null,
    wltpConsumption: null,
    euroNorm: euroTxt,
    priceEur: Math.round(Number(ld.offers?.price ?? NaN)),
    vatRecoverable,
    options: optionsList($, scope),
    description,
    photos,
    garageRef,
  };

  const parsed = listingSchema.safeParse(candidate);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ');
    throw new ParseError(`Inserat ${sourceId} ungültig: ${issues}`);
  }
  return { listing: parsed.data, warnings };
}

/* ------------------------------------------------------------------
   Adapter
------------------------------------------------------------------- */
export const luxautoAdapter: SourceAdapter = {
  name: 'luxauto',
  origin: LUXAUTO_ORIGIN,
  async fetchAll(client: HttpClient, log): Promise<SourceResult> {
    const first = await client.getText(LUXAUTO_GARAGE_URL);
    if (first.status !== 200) throw new ParseError(`Garagenseite: HTTP ${first.status}`);
    const firstPage = parseGaragePage(first.body);
    const urls = new Set(firstPage.listingUrls);
    const visited = new Set<string>();
    const queue = firstPage.pageUrls.filter((p) => new URL(p).searchParams.get('page') !== '1');
    while (queue.length) {
      const pageUrl = queue.shift()!;
      if (visited.has(pageUrl)) continue;
      visited.add(pageUrl);
      const res = await client.getText(pageUrl);
      if (res.status !== 200) throw new ParseError(`Garagenseite ${pageUrl}: HTTP ${res.status}`);
      const p = parseGaragePage(res.body);
      p.listingUrls.forEach((u) => urls.add(u));
      for (const next of p.pageUrls) if (!visited.has(next) && !queue.includes(next)) queue.push(next);
    }
    const warnings: string[] = [];
    if (firstPage.announcedCount != null && firstPage.announcedCount !== urls.size) {
      warnings.push(`LuxAuto nennt ${firstPage.announcedCount} Inserate, gefunden wurden ${urls.size}`);
    }
    log(`LuxAuto: ${urls.size} Inserate auf der Garagenseite`);

    const listings: Listing[] = [];
    const invalid: SourceResult['invalid'] = [];
    for (const url of urls) {
      if (client.remaining <= 1) {
        invalid.push({ url, reason: 'Anfrage-Budget erschöpft' });
        continue;
      }
      try {
        const res = await client.getText(url);
        if (res.status !== 200) throw new ParseError(`HTTP ${res.status}`);
        const parsed = parseDetailPage(res.body, url);
        listings.push(parsed.listing);
        warnings.push(...parsed.warnings);
      } catch (err) {
        if ((err as Error).name === 'BlockedError') throw err;
        invalid.push({ url, reason: (err as Error).message });
        log(`übersprungen: ${url} – ${(err as Error).message}`);
      }
    }
    return { source: 'luxauto', listings, found: urls.size, invalid, warnings };
  },
};
