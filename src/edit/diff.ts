/**
 * Was beim Speichern veröffentlicht wird (Cloudflare/Supabase): nur das, was sich seit dem letzten
 * Speichern geändert hat. Zurückgenommenes wird ausdrücklich mit dem Stand der Seite gesendet –
 * sonst bliebe die schon veröffentlichte Änderung im Repository. Rein, ohne DOM (tests/diff.test.ts).
 */
import { LANGS, type Lang } from '@/i18n/config';
import type { CargoItem, EditState, FleetData, Week } from '../../supabase/functions/publish/convert';

export interface Baked {
  /** Texte einer Sprache, so wie die Seite gebaut wurde */
  texts: (l: Lang) => Record<string, string>;
  /** Liste einer Sprache (Pfad), so wie gebaut */
  list: (l: Lang, path: string) => unknown;
  week: Week;
  cargo: CargoItem[];
  /** Anhänger, so wie gebaut (undefined = gab es nicht) */
  fleet: (id: string) => FleetData | undefined;
}

// gelöscht (null) ist etwas anderes als nicht vorhanden (undefined)
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const noShy = (s: string) => s.replace(/­/g, ''); // weiche Trennstriche setzt der Build selbst

export const emptyEdit = (): EditState => ({ v: 1, texts: {}, lists: {}, photos: {} });

/** Kennungen der Anhänger, die sich geändert haben */
export const changedFleet = (cur: EditState, prev: EditState) => {
  const fa = prev.fleet ?? {};
  const fb = cur.fleet ?? {};
  return [...new Set([...Object.keys(fa), ...Object.keys(fb)])].filter((id) => !same(fa[id], fb[id]));
};

export function diffForPublish(cur: EditState, prev: EditState, baked: Baked): EditState {
  const out = emptyEdit();
  for (const l of LANGS) {
    const a = prev.texts[l] ?? {};
    const b = cur.texts[l] ?? {};
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
      if (a[k] === b[k]) continue;
      const v = b[k] ?? (baked.texts(l)[k] != null ? noShy(baked.texts(l)[k]) : undefined);
      if (v != null) (out.texts[l] ??= {})[k] = v;
    }
    const la = prev.lists[l] ?? {};
    const lb = cur.lists[l] ?? {};
    for (const p of new Set([...Object.keys(la), ...Object.keys(lb)])) {
      if (same(la[p], lb[p])) continue;
      const base = baked.list(l, p);
      const v = lb[p] ?? (Array.isArray(base) ? { value: base.map((x) => noShy(String(x))), from: base.map((_, i) => i) } : null);
      if (v) (out.lists[l] ??= {})[p] = v;
    }
  }
  for (const k of new Set([...Object.keys(prev.photos), ...Object.keys(cur.photos)])) {
    if (same(prev.photos[k], cur.photos[k])) continue;
    out.photos[k] = cur.photos[k] ?? (prev.photos[k].hidden ? { hidden: false } : prev.photos[k]);
  }
  if (!same(prev.hours, cur.hours)) out.hours = cur.hours ?? baked.week;
  if (!same(prev.cargo, cur.cargo)) out.cargo = cur.cargo ?? baked.cargo;
  const fb = cur.fleet ?? {};
  const ids = changedFleet(cur, prev);
  // zurückgenommen: wie gebaut; gab es ihn im Build nicht (neu angelegt und wieder verworfen): löschen
  if (ids.length) out.fleet = Object.fromEntries(ids.map((id) => [id, id in fb ? fb[id] : baked.fleet(id) ?? null]));
  return out;
}
