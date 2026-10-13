/**
 * Quelle MovingCar (offizielle API, https://api.movingcar.lu/fr/webservices).
 * MovingCar ist die Bestandsverwaltung der Garage; von dort gehen die Inserate an
 * LuxAuto und AutoScout24. Die Website liest den Bestand deshalb direkt hier.
 *
 * Ablauf: Liste der Inserate (en ligne + réservé, Autos und Nutzfahrzeuge) → Details je
 * Inserat (Beschreibung, Ausstattung, WLTP, Fotos 1600×1200) → normalisiertes Listing.
 *
 * Konfiguration (Umgebungsvariablen, in GitHub als Secret/Variable):
 *   MOVINGCAR_API_KEY      Zugangsschlüssel (Secret)
 *   MOVINGCAR_AUTH         wie der Schlüssel mitgeschickt wird:
 *                            bearer (Standard) · basic (Schlüssel = "benutzer:passwort")
 *                            header:<Name>     (z. B. header:X-Api-Key)
 *                            query:<Parameter> (z. B. query:token)
 *   MOVINGCAR_PARTNER_ID   id_partenaire der Garage (optional, falls der Schlüssel mehrere Händler sieht)
 *   MOVINGCAR_VEHICLES     v_id der gewünschten Fahrzeugarten, Standard 1_3 (Voiture + Utilitaire)
 */
import { listingSchema, type Body, type Listing } from '../../../src/lib/stock-schema.ts';
import { mapFuel, mapTransmission } from '../enums.ts';
import { cleanDescription, htmlToLines, plausible, PLAUSIBLE } from '../text.ts';
import type { SourceAdapter, SourceResult } from './types.ts';

export const MC_ORIGIN = 'https://api.movingcar.lu';
const PAGE_SIZE = 300;
const DELAY_MS = 250;
const MAX_REQUESTS = 400;

export interface MovingCarConfig {
  key: string;
  auth: string;
  partnerId: string | null;
  vehicles: string;
}

export function movingCarConfigFromEnv(env: Record<string, string | undefined> = process.env): MovingCarConfig | null {
  const key = env.MOVINGCAR_API_KEY?.trim();
  if (!key) return null;
  return {
    key,
    auth: env.MOVINGCAR_AUTH?.trim() || 'bearer',
    partnerId: env.MOVINGCAR_PARTNER_ID?.trim() || null,
    vehicles: env.MOVINGCAR_VEHICLES?.trim() || '1_3',
  };
}

export class MovingCarError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MovingCarError';
  }
}

/** Ruft eine Adresse der API ab und liefert `_data`; injizierbar für Tests */
export type JsonFetcher = (url: string) => Promise<unknown>;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Echter Abruf mit Anmeldung, Pause zwischen Anfragen, Obergrenze und Wiederholung bei 5xx */
export function movingCarFetcher(cfg: MovingCarConfig, log: (msg: string) => void = () => {}): JsonFetcher {
  let count = 0;
  let last = 0;
  return async (url: string) => {
    const u = new URL(url);
    const headers: Record<string, string> = { Accept: 'application/json', 'User-Agent': 'RondPointStockSync/2.0 (MovingCar API)' };
    const [mode, name] = cfg.auth.split(':');
    if (mode === 'bearer') headers.Authorization = `Bearer ${cfg.key}`;
    else if (mode === 'basic') headers.Authorization = `Basic ${Buffer.from(cfg.key).toString('base64')}`;
    else if (mode === 'header' && name) headers[name] = cfg.key;
    else if (mode === 'query' && name) u.searchParams.set(name, cfg.key);
    else throw new MovingCarError(`MOVINGCAR_AUTH „${cfg.auth}“ unbekannt`);

    for (let attempt = 0; ; attempt++) {
      if (++count > MAX_REQUESTS) throw new MovingCarError(`mehr als ${MAX_REQUESTS} Anfragen`);
      const wait = last + DELAY_MS - Date.now();
      if (wait > 0) await sleep(wait);
      last = Date.now();
      let res: Response;
      try {
        res = await fetch(u, { headers, signal: AbortSignal.timeout(30_000) });
      } catch (err) {
        if (attempt < 2) {
          log(`MovingCar: Netzwerkfehler (${(err as Error).message}), Wiederholung`);
          await sleep(2000 * (attempt + 1));
          continue;
        }
        throw err;
      }
      if (res.status >= 500 && attempt < 2) {
        log(`MovingCar: HTTP ${res.status}, Wiederholung`);
        await sleep(2000 * (attempt + 1));
        continue;
      }
      if (res.status === 401 || res.status === 403) throw new MovingCarError(`Zugang abgelehnt (HTTP ${res.status}) – Schlüssel oder MOVINGCAR_AUTH prüfen`);
      if (!res.ok) throw new MovingCarError(`HTTP ${res.status} bei ${u.pathname}`);
      const text = await res.text();
      try {
        return JSON.parse(text);
      } catch {
        // ohne gültige Anmeldung liefert die API eine HTML-Seite „Authentification requise“
        throw new MovingCarError(/authentification/i.test(text) ? 'Anmeldung nicht akzeptiert („Authentification requise“) – Schlüssel oder MOVINGCAR_AUTH prüfen' : 'keine JSON-Antwort');
      }
    }
  };
}

/* ------------------------------------------------------------------
   Umwandlung eines Inserats
------------------------------------------------------------------- */
type Raw = Record<string, unknown>;
const str = (v: unknown): string => (v == null ? '' : String(v).trim());
const int = (v: unknown): number | null => {
  const n = Number.parseInt(str(v).replace(/[^\d-]/g, ''), 10);
  return Number.isFinite(n) && n > 0 ? n : null;
};
const dec = (v: unknown): number | null => {
  const n = Number.parseFloat(str(v).replace(',', '.'));
  return Number.isFinite(n) && n > 0 ? n : null;
};

/** „06-11-2017“ (TT-MM-JJJJ) → „2017-11“ */
export function mcMonth(v: unknown): string | null {
  const m = str(v).match(/^(\d{1,2})-(\d{1,2})-(\d{4})/);
  if (!m) return null;
  const month = Number(m[2]);
  return month >= 1 && month <= 12 ? `${m[3]}-${String(month).padStart(2, '0')}` : null;
}

/** Karosserie aus id_categorie (Wörterbuch der API) */
const BODY_BY_CATEGORY: Record<string, Body> = { '1': 'city', '2': 'saloon', '3': 'estate', '4': 'convertible', '5': 'coupe', '6': 'mpv', '7': 'suv', '8': 'pickup' };

/** carburant der API → Begriffe, die mapFuel kennt */
const FUEL_ALIASES: Record<string, string> = { 'hybride-essence': 'hybride essence', 'hybride-diesel': 'hybride diesel', 'gpl-lpg': 'gpl lpg' };

/** „euro-6d-temp“ → „Euro 6d-TEMP“ */
export function euroLabel(v: unknown): string | null {
  const s = str(v);
  if (!s) return null;
  return s.replace(/^euro-/i, 'Euro ').replace(/-temp$/i, '-TEMP');
}

/** „blanc“ → „Blanc“ (die Seite übersetzt die Farbe, JSON-LD zeigt sie so) */
const cap = (v: unknown): string | null => {
  const s = str(v);
  return s ? s.charAt(0).toLocaleUpperCase('fr') + s.slice(1) : null;
};

/** „4.8“ → „4,8 l/100 km“ */
const consumption = (v: unknown): string | null => {
  const n = dec(v);
  return n ? `${String(n).replace('.', ',')} l/100 km` : null;
};

export interface Mapped {
  listing: Listing | null;
  warnings: string[];
  invalid?: string;
}

/** Ein Inserat (Liste + Details) in das Format des Bestands umwandeln */
export function mapAnnonce(list: Raw, detail: Raw | null): Mapped {
  const a = { ...list, ...(detail ?? {}) };
  const id = str(a.id);
  const warnings: string[] = [];
  // interne Referenz der Garage: eigenes Feld, sonst die MovingCar-ID (sie steht auf LuxAuto als „Ref Interne“)
  const ref = str(a.reference_interne).replace(/^r/i, '') || id;
  const stableId = /^\d+$/.test(ref) ? `r${ref}` : `mc${id}`;
  const warn = (m: string) => warnings.push(`${stableId}: ${m}`);

  const price = int(a.prix);
  if (!price) return { listing: null, warnings, invalid: 'kein Preis (prix = 0)' };

  const fuelRaw = str(a.carburant);
  const fuel = mapFuel(FUEL_ALIASES[fuelRaw] ?? fuelRaw);
  if (!fuel.known && fuelRaw) warn(`unbekannter Kraftstoff „${fuelRaw}“`);
  const trRaw = str(a.transmission);
  const transmission = mapTransmission(trRaw);
  const vId = str(a.id_vehicule);
  const body: Body = vId === '3' ? 'van' : (BODY_BY_CATEGORY[str(a.id_categorie)] ?? 'other');

  const hp = plausible(int(a.cv), PLAUSIBLE.powerHp, 'Leistung (CV)', warn);
  const kw = plausible(int(a.kw), [15, 1180], 'Leistung (kW)', warn);
  const cc = plausible(int(a.cylindree), PLAUSIBLE.displacementCc, 'Hubraum (cm³)', warn);
  const seats = plausible(int(a.place), PLAUSIBLE.seats, 'Sitzplätze', warn);

  const photosRaw = Array.isArray(a.photos) ? (a.photos as unknown[]).map(str).filter((u) => u.startsWith('https://')) : [];
  const photos = (photosRaw.length ? photosRaw : str(a.photo).startsWith('https://') ? [str(a.photo)] : []).map((url) => {
    const m = url.match(/\/(\d+)x(\d+)\//);
    return m ? { url, width: Number(m[1]), height: Number(m[2]) } : { url };
  });

  const strList = (v: unknown) => (Array.isArray(v) ? (v as unknown[]).map(str).filter(Boolean).map((o) => o.slice(0, 200)) : []);
  const options = strList(a.equipements_fr);
  const description = cleanDescription(htmlToLines(str(a.description)));
  const co2 = int(a.co2_wltp) ?? int(a.co2);
  const condition = str(a.type_vehicule) === 'neuf' ? 'new' : 'used';
  if (str(a.en_stock) === 'non') warn('laut MovingCar nicht auf Lager (en_stock = non)');

  const candidate = {
    stableId,
    source: 'movingcar' as const,
    sourceId: id,
    sourceUrl: `${MC_ORIGIN}/fr/annonce/?id=${id}`,
    make: str(a.marque),
    model: str(a.modele),
    version: str(a.type).slice(0, 200),
    condition,
    // Neuwagen tragen in MovingCar ein Platzhalter-Datum; wie bisher keine Erstzulassung zeigen
    firstRegistration: condition === 'new' ? null : mcMonth(a.immat),
    modelYear: int(a.annee_modele),
    mileageKm: int(a.km) ?? 0,
    fuel: fuel.value,
    fuelRaw: fuelRaw || undefined,
    transmission: transmission.value,
    transmissionRaw: trRaw || undefined,
    powerHp: hp,
    powerKw: kw ?? (hp ? Math.round(hp * 0.7355) : null),
    displacementCc: cc,
    body,
    bodyRaw: str(a.id_categorie) || undefined,
    seats,
    colorExterior: cap(a.couleur_carrosserie),
    colorInterior: cap(a.couleur_interieur),
    co2Gkm: co2,
    wltpConsumption: consumption(a.conso_mixte_wltp),
    euroNorm: euroLabel(a.classe_emission),
    priceEur: price,
    vatRecoverable: str(a.tva) === 'oui',
    options,
    optionsDe: strList(a.equipements_de),
    optionsEn: strList(a.equipements_en),
    description,
    photos,
    garageRef: /^\d+$/.test(ref) ? ref : null,
  };
  const parsed = listingSchema.safeParse(candidate);
  if (!parsed.success) {
    return { listing: null, warnings, invalid: parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ') };
  }
  return { listing: parsed.data, warnings };
}

/** `_data` aus einer Antwort holen */
function data(res: unknown): Raw {
  const d = (res as { _data?: Raw })?._data;
  if (!d || typeof d !== 'object') throw new MovingCarError('Antwort ohne _data');
  return d;
}

/** Ganzen Bestand laden */
export async function fetchMovingCar(cfg: MovingCarConfig, fetchApi: JsonFetcher, log: (msg: string) => void): Promise<SourceResult> {
  let requests = 0;
  const fetchJson: JsonFetcher = (url) => {
    requests++;
    return fetchApi(url);
  };
  const params = new URLSearchParams({
    v_id: cfg.vehicles,
    statut: 'en-ligne_reserve',
    results: String(PAGE_SIZE),
    order: 'date_desc',
    dim_photos: '1600x1200',
  });
  if (cfg.partnerId) params.set('id_partenaire', cfg.partnerId);

  const list: Raw[] = [];
  let total = Infinity;
  for (let page = 0; list.length < total && page < 20; page++) {
    params.set('page', String(page));
    const d = data(await fetchJson(`${MC_ORIGIN}/fr/annonces/?${params}`));
    total = int(d.nbannonces) ?? 0;
    const items = Array.isArray(d.annonces) ? (d.annonces as Raw[]) : [];
    list.push(...items);
    log(`MovingCar: Seite ${page + 1}, ${items.length} Inserate (gesamt ${total})`);
    if (!items.length) break;
  }

  const listings: Listing[] = [];
  const invalid: SourceResult['invalid'] = [];
  const warnings: string[] = [];
  const seen = new Set<string>();
  for (const item of list) {
    const id = str(item.id);
    let detail: Raw | null = null;
    try {
      const d = data(await fetchJson(`${MC_ORIGIN}/fr/annonce/?id=${encodeURIComponent(id)}&dim_photos=1600x1200`));
      detail = (d.annonce as Raw) ?? null;
      for (const l of ['de', 'en'] as const) {
        try {
          const dl = data(await fetchJson(`${MC_ORIGIN}/${l}/annonce/?id=${encodeURIComponent(id)}`));
          const eq = (dl.annonce as Raw | undefined)?.[`equipements_${l}`];
          if (detail && eq) detail[`equipements_${l}`] = eq;
        } catch {
          warnings.push(`mc${id}: Ausstattung ${l.toUpperCase()} nicht abrufbar`);
        }
      }
    } catch (err) {
      if (err instanceof MovingCarError && /Anmeldung|Zugang/.test(err.message)) throw err;
      warnings.push(`mc${id}: Details nicht abrufbar (${(err as Error).message}), nur Daten aus der Liste`);
    }
    const m = mapAnnonce(item, detail);
    warnings.push(...m.warnings);
    if (!m.listing) {
      invalid.push({ url: `${MC_ORIGIN}/fr/annonce/?id=${id}`, reason: m.invalid ?? 'ungültig' });
      continue;
    }
    if (seen.has(m.listing.stableId)) {
      warnings.push(`${m.listing.stableId}: doppelte interne Referenz, Inserat mc${id} übersprungen`);
      continue;
    }
    seen.add(m.listing.stableId);
    listings.push(m.listing);
  }
  log(`MovingCar: ${requests} Anfragen, ${listings.length} gültige Inserate`);
  return { source: 'movingcar', listings, found: list.length, invalid, warnings };
}

/** Adapter für den Abgleich; ohne Schlüssel nicht verwendbar */
export function movingCarAdapter(cfg: MovingCarConfig, fetchJson?: JsonFetcher): SourceAdapter {
  return {
    name: 'movingcar',
    origin: MC_ORIGIN,
    robots: false,
    fetchAll: (_client, log) => fetchMovingCar(cfg, fetchJson ?? movingCarFetcher(cfg, log), log),
  };
}

