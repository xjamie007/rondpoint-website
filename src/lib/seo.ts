/**
 * Title (50–60 Zeichen) und Description (150–160 Zeichen) für Autoseiten (G2).
 * Muster: „{Marque} {Modèle} {Année}, {prix} € | Um Rond Point", auf die Spanne
 * angepasst: Version wortweise kürzen, Zusatz „Garage"/Ort ergänzen.
 */
import { fmt, type Dict } from '@/i18n';
import type { Lang } from '@/i18n/config';
import { eur, km } from './format.ts';
import { carYear, type CarView } from './stock.ts';

export const TITLE_RANGE = [50, 60] as const;
export const DESC_RANGE = [150, 160] as const;

const inRange = (s: string, [a, b]: readonly [number, number]) => s.length >= a && s.length <= b;

function versionPrefixes(version: string): string[] {
  const words = version.split(/\s+/).filter(Boolean);
  const out: string[] = [];
  for (let i = words.length; i >= 0; i--) out.push(words.slice(0, i).join(' '));
  return out;
}

export function carTitle(v: CarView, lang: Lang, t: Dict): string {
  const year = carYear(v);
  const price = eur(lang, v.priceEur);
  const suffixes = [t.seo.car.suffixShort, t.seo.car.suffixLong, `${t.seo.car.place}${t.seo.car.suffixShort}`, `${t.seo.car.place}${t.seo.car.suffixLong}`];
  const candidates: string[] = [];
  for (const ver of versionPrefixes(v.version)) {
    const head = [v.make, v.model, ver, year].filter(Boolean).join(' ');
    for (const s of suffixes) candidates.push(`${head}, ${price}${s}`);
  }
  // Bevorzugt: mit Version, kürzester Zusatz. Erste passende Variante gewinnt.
  const hit = candidates.find((c) => inRange(c, TITLE_RANGE));
  if (hit) return hit;
  // Sonst: längste Variante ≤ 60, notfalls die kürzeste
  const fitting = candidates.filter((c) => c.length <= TITLE_RANGE[1]).sort((a, b) => b.length - a.length);
  return fitting[0] ?? candidates[candidates.length - 1];
}

export function carDescription(v: CarView, lang: Lang, t: Dict): string {
  // Deutsch und Luxemburgisch schreiben Substantive groß
  const lower = (s: string) => (lang === 'de' || lang === 'lb' ? s : s.toLowerCase());
  const fuel = t.enums.fuel[v.fuel];
  const gearbox = fmt(t.seo.car.descGearbox, { gearbox: t.enums.transmission[v.transmission].toLowerCase() });
  const facts = (ver: string) =>
    [
      [v.make, v.model, ver].filter(Boolean).join(' '),
      km(lang, v.mileageKm),
      lower(fuel),
      v.transmission !== 'other' ? gearbox : null,
      eur(lang, v.priceEur),
    ]
      .filter(Boolean)
      .join(', ') + '.';
  const tail = ` ${t.seo.car.descTail}`;
  const extras = t.seo.car.descExtra;
  const candidates: string[] = [];
  for (const ver of versionPrefixes(v.version)) {
    const base = facts(ver) + tail;
    candidates.push(base);
    // Zusätze in allen Kombinationen der Reihe nach
    for (let i = 0; i < extras.length; i++) {
      candidates.push(base + extras[i]);
      for (let j = i + 1; j < extras.length; j++) {
        candidates.push(base + extras[i] + extras[j]);
        for (let k = j + 1; k < extras.length; k++) candidates.push(base + extras[i] + extras[j] + extras[k]);
      }
    }
  }
  const hit = candidates.find((c) => inRange(c, DESC_RANGE));
  if (hit) return hit;
  const fitting = candidates.filter((c) => c.length <= DESC_RANGE[1]).sort((a, b) => b.length - a.length);
  return fitting[0] ?? candidates[candidates.length - 1];
}

/** Verkaufte Autos (noindex): Version wortweise ergänzen, bis die Spanne erreicht ist. */
export function soldTitle(v: CarView, t: Dict): string {
  const variants = versionPrefixes(v.version)
    .reverse()
    .map((ver) => fmt(t.seo.car.soldTitle, { make: v.make, model: [v.model, ver].filter(Boolean).join(' ') }));
  return variants.find((c) => inRange(c, TITLE_RANGE)) ?? variants.filter((c) => c.length <= TITLE_RANGE[1]).pop() ?? variants[0];
}

export function soldDescription(v: CarView, t: Dict): string {
  return fmt(t.seo.car.soldDescription, { make: v.make, model: v.model });
}
