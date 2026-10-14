/**
 * Flotte aus der Content Collection, lokalisiert (nur im Build).
 * - Beispiele (sample: true) nur in der Entwicklung bzw. in der Präsentationsversion
 * - nur aktive Fahrzeuge
 * - Anhänger über 3 500 kg und Transporter über 3 500 kg werden ausgeblendet und geloggt
 */
import { getCollection } from 'astro:content';
import type { Lang } from '@/i18n/config';
import { bySmallest, hiddenReason, isTrailer, toFleetItem, type FleetItem } from './fleet.ts';
import { LIMITS } from './permis.ts';
import { presentation } from './site.ts';

let warned = false;

/** Beispiele zeigen: in der Entwicklung, in der Präsentationsversion oder mit RONDPOINT_SAMPLES=1 */
export const showSamples = !(import.meta.env.PROD && process.env.RONDPOINT_SAMPLES !== '1' && !presentation);

export async function getFleet(lang: Lang): Promise<FleetItem[]> {
  const entries = await getCollection('flotte');
  const items: FleetItem[] = [];
  for (const e of entries) {
    const why = hiddenReason(e.data, showSamples);
    if (why === 'trailerLimit' && !warned) console.warn(`[flotte] ${e.id}: Anhänger über ${LIMITS.trailerBEKg} kg – ausgeblendet (BE reicht nicht)`);
    if (why === 'vanLimit' && !warned) console.warn(`[flotte] ${e.id}: Transporter über ${LIMITS.vanBKg} kg – ausgeblendet (Permis B reicht nicht)`);
    if (why) continue;
    items.push(toFleetItem(e.id.split('/').pop()!, e.data, lang));
  }
  if (!showSamples && items.filter(isTrailer).length === 0 && !warned) {
    console.warn(
      '\n\x1b[33m[flotte] WARNUNG: Die Mietflotte ist im Produktions-Build leer. Der Finder zeigt „La liste de nos remorques arrive bientôt". Echte Fahrzeuge in src/content/flotte/ eintragen.\x1b[0m\n',
    );
  }
  warned = true;
  return items.sort(bySmallest);
}
