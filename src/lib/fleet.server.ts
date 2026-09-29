/**
 * Flotte aus der Content Collection, lokalisiert (nur im Build).
 * - Beispiele (sample: true) nur in der Entwicklung
 * - nur aktive Fahrzeuge
 * - Anhänger über 3 500 kg und Transporter über 3 500 kg werden ausgeblendet und geloggt
 */
import { getCollection } from 'astro:content';
import type { Lang } from '@/i18n/config';
import { isTrailer, isVan, type FleetItem } from './fleet.ts';
import { LIMITS } from './permis.ts';
import { presentation } from './site.ts';

let warned = false;

export async function getFleet(lang: Lang): Promise<FleetItem[]> {
  const entries = await getCollection('flotte');
  // Beispiele: in der Entwicklung, in der Präsentationsversion oder mit RONDPOINT_SAMPLES=1
  const prod = import.meta.env.PROD && process.env.RONDPOINT_SAMPLES !== '1' && !presentation;
  const items: FleetItem[] = [];
  for (const e of entries) {
    const d = e.data;
    if (!d.active) continue;
    if (d.sample && prod) continue;
    if (isTrailer(d) && d.mmaKg > LIMITS.trailerBEKg) {
      if (!warned) console.warn(`[flotte] ${e.id}: Anhänger über ${LIMITS.trailerBEKg} kg – ausgeblendet (BE reicht nicht)`);
      continue;
    }
    if (isVan(d) && d.mmaKg > LIMITS.vanBKg) {
      if (!warned) console.warn(`[flotte] ${e.id}: Transporter über ${LIMITS.vanBKg} kg – ausgeblendet (Permis B reicht nicht)`);
      continue;
    }
    items.push({
      id: e.id.split('/').pop()!,
      category: d.category,
      name: d.name[lang] ?? d.name.fr,
      brand: d.brand,
      mmaKg: d.mmaKg,
      emptyKg: d.emptyKg,
      payloadKg: d.payloadKg,
      braked: d.braked,
      loadLengthM: d.loadLengthM,
      loadWidthM: d.loadWidthM,
      loadHeightM: d.loadHeightM,
      volumeM3: d.volumeM3,
      tempRange: d.tempRange,
      power: d.power,
      socket: d.socket,
      showPallets: d.showPallets,
      suitableFor: d.suitableFor,
      priceDay: d.priceDay,
      priceWeekend: d.priceWeekend,
      deposit: d.deposit,
      notes: d.notes ? (d.notes[lang] ?? d.notes.fr) : null,
      photo: d.photo,
      sample: d.sample,
    });
  }
  if (prod && items.filter(isTrailer).length === 0 && !warned) {
    console.warn(
      '\n\x1b[33m[flotte] WARNUNG: Die Mietflotte ist im Produktions-Build leer. Der Finder zeigt „La liste de nos remorques arrive bientôt". Echte Fahrzeuge in src/content/flotte/ eintragen.\x1b[0m\n',
    );
  }
  warned = true;
  return items.sort((a, b) => a.payloadKg - b.payloadKg);
}
