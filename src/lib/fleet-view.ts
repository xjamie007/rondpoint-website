/**
 * Anzeige-Werte der Flotte, im Build je Sprache formatiert (für Island, Tabelle und
 * Kategorieseiten). So erzeugt die Island beim Hydrieren exakt dasselbe HTML.
 */
import { fmt, plural, type Dict } from '@/i18n';
import type { Lang } from '@/i18n/config';
import { cubic, eur, kg, meters, metersBare, num } from './format.ts';
import { packPallets } from './pallets.ts';
import { requiredLicence } from './permis.ts';
import { diagramTotalM } from '@/components/finder/LoadDiagram';
import type { FleetItem } from './fleet.ts';

export interface FleetDisplay {
  payload: string;
  mma: string;
  empty: string | null;
  surface: string | null;
  height: string | null;
  braked: string;
  price: string | null;
  priceDay: string | null;
  priceWeekend: string | null;
  deposit: string | null;
  socket: string | null;
  volume: string | null;
  temp: string | null;
  power: string | null;
  pallets: number;
  palletsText: string | null;
  lengthLabel: string | null;
  widthLabel: string | null;
  diagramAria: string | null;
  /** „Permis nécessaire …" ohne Angaben zum Auto (ohne JavaScript, Tabelle) */
  requiredText: string;
  requiredShort: string;
  /** Foto (im Build vorbereitet, siehe fleet-photos.ts) */
  photo: { src: string; srcset: string; width: number; height: number; contain: boolean } | null;
}

export type FleetView = FleetItem & { display: FleetDisplay };

function signed(lang: Lang, n: number): string {
  return `${n > 0 ? '+' : n < 0 ? '−' : ''}${num(lang, Math.abs(n))}`;
}

export function fleetView(items: FleetItem[], lang: Lang, t: Dict): FleetView[] {
  const s = t.finder;
  return items.map((i) => {
    const hasDims = i.loadLengthM != null && i.loadWidthM != null;
    const pallets = hasDims && i.showPallets ? packPallets(i.loadLengthM!, i.loadWidthM!).count : 0;
    const palletsText = hasDims && i.showPallets ? plural(lang, s.pallets, pallets) : null;
    const surface = hasDims ? `${metersBare(lang, i.loadLengthM!)} × ${meters(lang, i.loadWidthM!)}` : null;
    const req = i.category === 'camionnette' ? { kind: 'licence', licence: 'B' as const } : requiredLicence(i.mmaKg);
    const requiredShort =
      req.kind === 'licence' ? s.licenceShort[req.licence] : t.fleetTable.licenceDepends;
    const requiredText =
      req.kind === 'licence' ? fmt(s.verdict.required, { licence: s.licenceShort[req.licence] }) : s.verdict.requiredDepends;
    const priceDay = i.priceDay != null ? eur(lang, i.priceDay) : null;
    const priceWeekend = i.priceWeekend != null ? eur(lang, i.priceWeekend) : null;
    const price = priceDay && priceWeekend ? fmt(s.price, { day: priceDay, weekend: priceWeekend }) : null;
    let diagramAria: string | null = null;
    if (hasDims) {
      diagramAria = fmt(s.diagramLabel, { l: metersBare(lang, i.loadLengthM!), w: metersBare(lang, i.loadWidthM!) });
      if (palletsText) diagramAria += `, ${palletsText}`;
    }
    return {
      ...i,
      display: {
        payload: kg(lang, i.payloadKg),
        mma: kg(lang, i.mmaKg),
        empty: i.emptyKg != null ? kg(lang, i.emptyKg) : null,
        surface,
        height: i.loadHeightM != null ? meters(lang, i.loadHeightM) : null,
        braked: i.braked ? s.specs.yes : s.specs.no,
        price,
        priceDay,
        priceWeekend,
        deposit: i.deposit != null ? eur(lang, i.deposit) : null,
        socket: i.socket != null ? fmt(s.specs.socketValue, { n: i.socket }) : null,
        volume: i.volumeM3 != null ? fmt(s.volumeText, { m3: cubic(lang, i.volumeM3) }) : null,
        temp: i.tempRange ? `${signed(lang, i.tempRange.minC)}\u2009–\u2009${signed(lang, i.tempRange.maxC)}\u00A0°C` : null,
        power: i.power,
        pallets,
        palletsText,
        lengthLabel: hasDims ? meters(lang, i.loadLengthM!) : null,
        widthLabel: hasDims ? meters(lang, i.loadWidthM!) : null,
        diagramAria,
        requiredText,
        requiredShort,
        photo: null,
      },
    };
  });
}

export function maxDiagramTotal(items: FleetItem[]): number {
  const lens = items.filter((i) => i.loadLengthM != null && i.loadWidthM != null).map((i) => diagramTotalM(i.loadLengthM!));
  return lens.length ? Math.max(...lens) : 1;
}
