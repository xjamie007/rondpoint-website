/**
 * Vorschau der Mietflotte auf der offenen Seite (nur im Admin-Bereich, nur bei Änderungen geladen):
 * Finder (React) neu zeichnen, Tabelle neu schreiben, Kategorieseiten anpassen.
 */
import { createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { escapeHtml } from '@/i18n';
import Finder, { type FinderProps } from '@/components/finder/Finder';
import { bySmallest, cargoOptions, hiddenReason, isVan, toFleetItem, type FleetItem, type FleetSource } from '@/lib/fleet';
import { fleetView, maxDiagramTotal, type FleetView } from '@/lib/fleet-view';
import { cargoNow, categoriesNow, isUpload, rows, type Base, type FleetCtx } from './fleet';
import { cargoLabels } from '@/lib/cargo';
import { categoryLabel, setCustomCategories } from '@/lib/categories';
import { useT } from '@/i18n';
import { $, $$ } from './ui';

/** Astro-Island-Props (Format [typ, wert]) lesen */
function revive(v: unknown): unknown {
  if (!Array.isArray(v)) return v;
  const [type, x] = v as [number, unknown];
  if (type === 1) return (x as unknown[]).map(revive);
  if (type === 0 && x && typeof x === 'object') return Object.fromEntries(Object.entries(x).map(([k, y]) => [k, revive(y)]));
  return x;
}

interface Host { root: Root; props: FinderProps }
const hosts: Host[] = [];

function takeIslands() {
  for (const isl of $$('astro-island')) {
    if (!/\/Finder[.-]/.test(isl.getAttribute('component-url') ?? '')) continue;
    const raw = JSON.parse(isl.getAttribute('props') ?? '{}') as Record<string, unknown>;
    const props = Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, revive(v)])) as unknown as FinderProps;
    const host = document.createElement('div');
    host.className = 'ed-finder';
    isl.replaceWith(host);
    hosts.push({ root: createRoot(host), props });
  }
}

/** Angezeigte Fahrzeuge dieser Sprache mit den Änderungen (wie getFleet + fleetView + withPhotos) */
function viewItems(ctx: FleetCtx, base: Base, known: Map<string, FleetView['display']['photo']>): FleetView[] {
  const items: FleetItem[] = [];
  const photos = new Map<string, FleetView['display']['photo']>();
  for (const r of rows(base, ctx.state())) {
    if (r.status === 'deleted' || hiddenReason(r.data as FleetSource, base.showSamples)) continue;
    items.push(toFleetItem(r.id, r.data as FleetSource, ctx.lang));
    if (isUpload(r.data.photo)) photos.set(r.id, { src: ctx.storage.imageUrl(r.data.photo!), srcset: '', width: 1600, height: 1000, contain: false });
    else if (r.base && r.data.photo === r.base.data.photo) {
      const p = known.get(r.id) ?? (r.base.thumb ? { src: r.base.thumb, srcset: '', width: 320, height: 200, contain: false } : null);
      if (p) photos.set(r.id, p);
    }
  }
  items.sort(bySmallest);
  return fleetView(items, ctx.lang, ctx.t).map((v) => ({ ...v, display: { ...v.display, photo: photos.get(v.id) ?? null } }));
}

export function preview(ctx: FleetCtx, base: Base) {
  const table = $('table.fleet-table');
  if (!hosts.length) takeIslands();
  // neue Arten aus dem Admin-Bereich gelten in der Vorschau sofort (Anhänger oder Transporter)
  setCustomCategories(categoriesNow(ctx));
  const known = new Map<string, FleetView['display']['photo']>();
  for (const h of hosts) for (const i of h.props.items) if (i.display.photo) known.set(i.id, i.display.photo);
  const all = viewItems(ctx, base, known);

  // Finder (ohne Autos, wie FinderSection)
  const forFinder = all.filter((i) => i.category !== 'voiture');
  for (const h of hosts) {
    // Ladungsarten wie im Admin-Bereich eingestellt (Reihenfolge, Beschriftung)
    const cargo = cargoNow(ctx);
    const strings = { ...h.props.strings, cargo: cargoLabels(cargo, ctx.lang, useT(ctx.lang).finder.cargo as Record<string, string>) };
    h.root.render(createElement(Finder, { ...h.props, strings, items: forFinder, cargoOptions: cargoOptions(forFinder, cargo.map((c) => c.id)), maxTotalM: maxDiagramTotal(forFinder) }));
  }

  // Tabelle (wie FleetTable.astro)
  const tbody = table?.querySelector('tbody');
  if (tbody) {
    const cid = [...tbody.attributes].find((a) => a.name.startsWith('data-astro-cid'))?.name ?? '';
    const td = (label: string, v: string, num = true) => `<td ${cid} role="cell" data-label="${escapeHtml(label)}"${num ? ' class="tnum"' : ''}>${escapeHtml(v)}</td>`;
    const h = ctx.t.fleetTable;
    tbody.innerHTML = all.map((i) => `<tr ${cid} role="row" data-fleet="${i.id}" data-kind="${isVan(i) ? 'van' : 'trailer'}"><th ${cid} scope="row" role="rowheader">${escapeHtml(i.name)}<span ${cid} class="cat t-small">${escapeHtml(categoryLabel(i.category, ctx.lang, ctx.t.categories))}</span></th>
      ${td(h.payload, i.display.payload)}${td(h.mma, i.display.mma)}${td(h.surface, i.display.surface ?? '—')}${td(h.licence, i.display.requiredShort, false)}${td(h.halfDay, i.display.priceHalfDay ?? '—')}${td(h.day, i.display.priceDay ?? '—')}${td(h.weekend, i.display.priceWeekend ?? '—')}${td(h.week, i.display.priceWeek ?? '—')}</tr>`).join('');
  }
}
