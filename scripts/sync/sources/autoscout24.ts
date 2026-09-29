/**
 * Ersatzquelle AutoScout24 (T2.3).
 *
 * Händlerseite und Detailseiten sind Next.js mit __NEXT_DATA__ (geprüft 28.09.2026):
 *  - Händlerseite: props.pageProps.listings[], numberOfResults
 *  - Detailseite:  props.pageProps.listingDetails (vehicle, prices, images,
 *                  description als HTML, identifier.offerReference = „Ref Interne")
 * Fotos: der Bild-Host rechnet die Größe auf Anfrage um; wir nehmen 1920 × 1440 (4:3).
 *
 * robots.txt von AutoScout24 sperrt KI-Crawler (GPTBot, ClaudeBot …) komplett.
 * Unser Bot läuft unter eigenem Namen und fällt unter „User-agent: *";
 * /professional/um-rond-point und /offres/… sind dort erlaubt.
 */
import { load } from 'cheerio';
import { listingSchema, type Listing } from '../../../src/lib/stock-schema.ts';
import { hpToKw, mapBody, mapFuel, mapTransmission } from '../enums.ts';
import { cleanDescription, dashToNull, htmlToLines, plausible, PLAUSIBLE } from '../text.ts';
import type { HttpClient } from '../http.ts';
import { ParseError, type ParsedListing, type SourceAdapter, type SourceResult } from './types.ts';

export const AS24_ORIGIN = 'https://www.autoscout24.lu';
export const AS24_DEALER_URL = `${AS24_ORIGIN}/professional/um-rond-point`;
export const AS24_PHOTO_SIZE = '1920x1440';

function nextData(html: string): any {
  const $ = load(html);
  const txt = $('script#__NEXT_DATA__').text();
  if (!txt) throw new ParseError('Kein __NEXT_DATA__ gefunden');
  try {
    return JSON.parse(txt);
  } catch {
    throw new ParseError('__NEXT_DATA__ ist kein gültiges JSON');
  }
}

export interface DealerListing {
  id: string;
  url: string;
  make: string;
  model: string;
  version: string;
  mileageKm: number | null;
  priceEur: number | null;
  firstRegistration: string | null;
  isNew: boolean;
  bodyRaw: string | null;
}

export interface DealerPage {
  listings: DealerListing[];
  numberOfResults: number | null;
}

export function parseDealerPage(html: string): DealerPage {
  const d = nextData(html);
  const pp = d?.props?.pageProps;
  if (!pp || !Array.isArray(pp.listings)) throw new ParseError('Händlerseite: keine listings');
  return {
    numberOfResults: typeof pp.numberOfResults === 'number' ? pp.numberOfResults : null,
    listings: pp.listings.map((l: any) => {
      const v = l.vehicle ?? {};
      const reg = v.firstRegistrationDate?.raw as string | null | undefined;
      return {
        id: String(l.id),
        url: new URL(l.url, AS24_ORIGIN).toString(),
        make: String(v.make ?? ''),
        model: String(v.model ?? ''),
        version: String(v.modelVersionInput ?? ''),
        mileageKm: typeof v.mileageInKm?.raw === 'number' ? v.mileageInKm.raw : null,
        priceEur: typeof l.prices?.public?.priceRaw === 'number' ? l.prices.public.priceRaw : null,
        firstRegistration: reg ? reg.slice(0, 7) : null,
        isNew: Array.isArray(v.offerType) && v.offerType.some((o: string) => /neu|new|neuve/i.test(o)),
        bodyRaw: typeof v.bodyType?.formatted === 'string' ? v.bodyType.formatted : null,
      } satisfies DealerListing;
    }),
  };
}

function photoUrl(u: string): string {
  // …/listing-images/{id}_{img}.jpg/1280x960.webp → …/{id}_{img}.jpg/1920x1440.webp
  return u.replace(/\/\d+x\d+\.(webp|jpe?g)$/i, `/${AS24_PHOTO_SIZE}.webp`);
}

export function parseDetailPage(html: string, url: string): ParsedListing {
  const warnings: string[] = [];
  const d = nextData(html);
  const ld = d?.props?.pageProps?.listingDetails;
  if (!ld?.vehicle) throw new ParseError('Detailseite: keine listingDetails');
  const v = ld.vehicle;
  const id = String(ld.id);
  const warn = (msg: string) => warnings.push(`as${id}: ${msg}`);

  const legal: string[] = v.legalCategoriesRaw ?? [];
  const isNew = legal.includes('NewVehicle') || ld.isNew === true;
  const ref = ld.identifier?.offerReference ? String(ld.identifier.offerReference).trim() : null;
  const garageRef = ref && /^\d+$/.test(ref) ? ref : null;

  const fuel = mapFuel(v.fuelCategory?.formatted);
  if (!fuel.known) warn(`unbekannter Kraftstoff „${fuel.raw}"`);
  const transmission = mapTransmission(v.transmissionType);
  if (!transmission.known) warn(`unbekanntes Getriebe „${transmission.raw}"`);
  const body = mapBody(v.bodyType);
  if (!body.known) warn(`unbekannte Karosserie „${body.raw}"`);

  const powerHp = plausible(typeof v.rawPowerInHp === 'number' ? v.rawPowerInHp : null, PLAUSIBLE.powerHp, 'Leistung (PS)', warn);
  const kwRaw = typeof v.rawPowerInKw === 'number' ? v.rawPowerInKw : null;
  const displacementCc = plausible(
    typeof v.rawDisplacementInCCM === 'number' ? v.rawDisplacementInCCM : null,
    PLAUSIBLE.displacementCc,
    'Hubraum (cm³)',
    warn,
  );
  const seats = plausible(typeof v.numberOfSeats === 'number' ? v.numberOfSeats : null, PLAUSIBLE.seats, 'Plätze', warn);

  const reg: string | null = v.firstRegistrationDateRaw ?? null;
  const images: string[] = Array.isArray(ld.images) ? ld.images : [];
  const equipment = v.equipment && typeof v.equipment === 'object' ? Object.values(v.equipment).flat() : [];
  const options = [...new Set((equipment as any[]).map((e) => String(e?.id ?? '').trim()).filter(Boolean))];

  const co2 = v.co2emissionInGramPerKmWithFallback?.raw;
  const consumption = v.fuelConsumptionCombined?.raw;

  const candidate: Listing = {
    stableId: garageRef ? `r${garageRef}` : `as${id}`,
    source: 'autoscout24',
    sourceId: id,
    sourceUrl: url.split('?')[0],
    make: String(v.make ?? '').trim(),
    model: String(v.model ?? '').trim(),
    version: String(v.modelVersionInput ?? '').trim(),
    condition: isNew ? 'new' : 'used',
    firstRegistration: !isNew && reg ? reg.slice(0, 7) : null,
    modelYear: v.productionYear ? Number.parseInt(String(v.productionYear), 10) || null : null,
    mileageKm: typeof v.mileageInKmRaw === 'number' ? v.mileageInKmRaw : -1,
    fuel: fuel.value,
    ...(fuel.known ? {} : { fuelRaw: fuel.raw }),
    transmission: transmission.value,
    ...(transmission.known ? {} : { transmissionRaw: transmission.raw }),
    powerHp,
    powerKw: kwRaw ?? (powerHp ? hpToKw(powerHp) : null),
    displacementCc,
    body: body.value,
    ...(body.known ? {} : { bodyRaw: body.raw }),
    seats,
    colorExterior: dashToNull(v.bodyColor ?? null),
    colorInterior: dashToNull(v.upholsteryColor ?? null),
    co2Gkm: typeof co2 === 'number' ? co2 : null,
    wltpConsumption: typeof consumption === 'number' ? `${consumption} l/100 km` : null,
    euroNorm: dashToNull(v.environmentEuDirective ?? null),
    priceEur: Math.round(Number(ld.prices?.public?.priceRaw ?? NaN)),
    vatRecoverable: ld.prices?.public?.taxDeductible === true,
    options,
    description: cleanDescription(htmlToLines(String(ld.description ?? ''))),
    photos: images.map((u) => ({ url: photoUrl(u), width: 1920, height: 1440 })),
    garageRef,
  };

  const parsed = listingSchema.safeParse(candidate);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ');
    throw new ParseError(`Inserat ${id} ungültig: ${issues}`);
  }
  return { listing: parsed.data, warnings };
}

export async function fetchDealer(client: HttpClient): Promise<DealerPage> {
  const res = await client.getText(AS24_DEALER_URL);
  if (res.status !== 200) throw new ParseError(`Händlerseite: HTTP ${res.status}`);
  const first = parseDealerPage(res.body);
  const all = [...first.listings];
  let page = 2;
  while (first.numberOfResults != null && all.length < first.numberOfResults && page <= 6) {
    const r = await client.getText(`${AS24_DEALER_URL}?page=${page}`);
    if (r.status !== 200) break;
    const p = parseDealerPage(r.body);
    const fresh = p.listings.filter((l) => !all.some((a) => a.id === l.id));
    if (fresh.length === 0) break;
    all.push(...fresh);
    page++;
  }
  return { listings: all, numberOfResults: first.numberOfResults };
}

export const autoscoutAdapter: SourceAdapter = {
  name: 'autoscout24',
  origin: AS24_ORIGIN,
  async fetchAll(client: HttpClient, log): Promise<SourceResult> {
    const dealer = await fetchDealer(client);
    log(`AutoScout24: ${dealer.listings.length} Inserate auf der Händlerseite`);
    const listings: Listing[] = [];
    const invalid: SourceResult['invalid'] = [];
    const warnings: string[] = [];
    for (const l of dealer.listings) {
      if (client.remaining <= 1) {
        invalid.push({ url: l.url, reason: 'Anfrage-Budget erschöpft' });
        continue;
      }
      try {
        const res = await client.getText(l.url);
        if (res.status !== 200) throw new ParseError(`HTTP ${res.status}`);
        const parsed = parseDetailPage(res.body, l.url);
        listings.push(parsed.listing);
        warnings.push(...parsed.warnings);
      } catch (err) {
        if ((err as Error).name === 'BlockedError') throw err;
        invalid.push({ url: l.url, reason: (err as Error).message });
        log(`übersprungen: ${l.url} – ${(err as Error).message}`);
      }
    }
    return { source: 'autoscout24', listings, found: dealer.listings.length, invalid, warnings };
  },
};
