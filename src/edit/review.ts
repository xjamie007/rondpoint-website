/**
 * Übersicht vor dem Speichern: alle Änderungen seit dem letzten Speichern, nach Art geordnet.
 * Texte lassen sich hier direkt nachbessern, jede Änderung einzeln verwerfen; Öffnungszeiten,
 * Anhänger und Ladungsarten öffnen ihr Fenster. Automatisch übersetzte Texte sind markiert.
 */
import { escapeHtml, useT } from '@/i18n';
import { HTML_LANG, LANGS, type Lang } from '@/i18n/config';
import { hoursSummary } from '@/lib/content';
import type { EditState } from '../../supabase/functions/publish/convert';
import { flatten, getPath } from './match';
import { baseWeek } from './hours';
import { loadBase } from './fleet';
import type { SiteStorage } from './storage';
import { $, $$, closeSheet, sheet, toast } from './ui';

export interface ReviewCtx {
  lang: Lang;
  state: () => EditState;
  lastSaved: () => EditState;
  change: (fn: () => void | false) => void;
  storage: SiteStorage;
  save: () => Promise<void>;
  openHours: () => void;
  openFleet: (id?: string) => void;
  openCargo: () => void;
}

const LANG_NAME: Record<Lang, string> = { lb: 'Lëtzebuergesch', fr: 'Französisch', de: 'Deutsch', en: 'Englisch', pt: 'Portugiesisch' };
// gelöscht (null) ist etwas anderes als nicht vorhanden (undefined)
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const flat = new Map<Lang, Record<string, string>>();
export const baked = (l: Lang) => flat.get(l) ?? (flat.set(l, flatten(useT(l))), flat.get(l)!);
/** Platzhalter und Link-Ziele eines Textes (müssen beim Ändern gleich bleiben) */
export const fixedParts = (s: string) =>
  [...[...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort(), '|', ...[...s.matchAll(/\]\(([^)\s]+)\)/g)].map((m) => m[1]).sort()].join(',');
const autoKey = (l: Lang, k: string) => `${l}:${k}`;

/** Anzahl der Änderungen seit dem letzten Speichern */
export function countChanges(cur: EditState, prev: EditState): number {
  let n = 0;
  for (const l of LANGS) {
    const a = prev.texts[l] ?? {}, b = cur.texts[l] ?? {};
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) if (a[k] !== b[k]) n++;
    const la = prev.lists[l] ?? {}, lb = cur.lists[l] ?? {};
    for (const p of new Set([...Object.keys(la), ...Object.keys(lb)])) if (!same(la[p], lb[p])) n++;
  }
  for (const k of new Set([...Object.keys(prev.photos), ...Object.keys(cur.photos)])) if (!same(prev.photos[k], cur.photos[k])) n++;
  if (!same(prev.hours, cur.hours)) n++;
  const fa = prev.fleet ?? {}, fb = cur.fleet ?? {};
  for (const id of new Set([...Object.keys(fa), ...Object.keys(fb)])) if (!same(fa[id], fb[id])) n++;
  if (!same(prev.cargo, cur.cargo)) n++;
  return n;
}

export async function reviewSheet(ctx: ReviewCtx) {
  const s = ctx.state();
  const prev = ctx.lastSaved();
  const auto = new Set(s.auto ?? []);
  const items: string[] = [];

  // Texte, nach Sprache: die Sprache der offenen Seite zuerst
  const order = [ctx.lang, ...LANGS.filter((l) => l !== ctx.lang)];
  for (const l of order) {
    const a = prev.texts[l] ?? {}, b = s.texts[l] ?? {};
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
      if (a[k] === b[k]) continue;
      const before = a[k] ?? baked(l)[k] ?? '';
      const isAuto = auto.has(autoKey(l, k));
      items.push(`<div class="ed-rv" data-kind="text" data-l="${l}" data-k="${escapeHtml(k)}">
        <div class="ed-rv-head"><span class="ed-tag">${LANG_NAME[l]}</span>${isAuto ? '<span class="ed-tag ed-tag-auto">automatisch übersetzt – bitte prüfen</span>' : ''}
          <button type="button" class="ed-mini" data-drop>Verwerfen</button></div>
        <p class="ed-rv-before"><small>Vorher:</small> ${escapeHtml(before.replace(/­/g, ''))}</p>
        ${k in b
          ? `<textarea rows="${Math.min(8, Math.ceil(b[k].length / 60) + 1)}" lang="${HTML_LANG[l]}" spellcheck="true">${escapeHtml(b[k])}</textarea><p class="ed-err" data-err hidden></p>`
          : '<p class="ed-rv-note">Zurück auf den vorherigen Text</p>'}
      </div>`);
    }
    const la = prev.lists[l] ?? {}, lb = s.lists[l] ?? {};
    for (const p of new Set([...Object.keys(la), ...Object.keys(lb)])) {
      if (same(la[p], lb[p])) continue;
      const after = (lb[p]?.value ?? (getPath(useT(l), p) as unknown[]) ?? []).map((x) => `<li>${escapeHtml(String(x))}</li>`).join('');
      items.push(`<div class="ed-rv" data-kind="list" data-l="${l}" data-k="${escapeHtml(p)}">
        <div class="ed-rv-head"><span class="ed-tag">${LANG_NAME[l]}</span><span class="ed-tag">Liste (Reihenfolge, Einträge)</span><button type="button" class="ed-mini" data-drop>Verwerfen</button></div>
        <ul class="ed-rv-list">${after}</ul></div>`);
    }
  }

  // Fotos
  for (const k of new Set([...Object.keys(prev.photos), ...Object.keys(s.photos)])) {
    if (same(prev.photos[k], s.photos[k])) continue;
    const p = s.photos[k];
    const what = p?.src ? `<img src="${escapeHtml(ctx.storage.imageUrl(p.src))}" alt="">` : p?.hidden ? '<span>ausgeblendet</span>' : '<span>wieder angezeigt</span>';
    items.push(`<div class="ed-rv" data-kind="photo" data-k="${escapeHtml(k)}"><div class="ed-rv-head"><span class="ed-tag">Foto</span><b>${escapeHtml(k)}</b><button type="button" class="ed-mini" data-drop>Verwerfen</button></div>
      <div class="ed-rv-photo">${what}</div></div>`);
  }

  // Öffnungszeiten
  if (!same(prev.hours, s.hours)) {
    const t = useT(ctx.lang);
    items.push(`<div class="ed-rv" data-kind="hours"><div class="ed-rv-head"><span class="ed-tag">Öffnungszeiten</span>
      <button type="button" class="ed-mini" data-open>Bearbeiten</button><button type="button" class="ed-mini" data-drop>Verwerfen</button></div>
      <p class="ed-rv-before"><small>Vorher:</small> ${escapeHtml(hoursSummary(t, ctx.lang, ' · ', prev.hours ?? baseWeek))}</p>
      <p><b>${escapeHtml(hoursSummary(t, ctx.lang, ' · ', s.hours ?? baseWeek))}</b></p></div>`);
  }

  // Anhänger
  const fa = prev.fleet ?? {}, fb = s.fleet ?? {};
  const fleetIds = [...new Set([...Object.keys(fa), ...Object.keys(fb)])].filter((id) => !same(fa[id], fb[id]));
  if (fleetIds.length) {
    const base = await loadBase().catch(() => null);
    for (const id of fleetIds) {
      const b = fb[id];
      const inBase = base?.entries.find((e) => e.id === id);
      const name = (b ?? fa[id] ?? inBase?.data)?.name?.[ctx.lang] || (b ?? fa[id] ?? inBase?.data)?.name?.fr || id;
      const status = b === null ? 'wird gelöscht' : !(id in fb) ? (fa[id] === null ? 'wird wiederhergestellt' : 'zurück auf vorher') : inBase || id in fa ? 'geändert' : 'neu';
      items.push(`<div class="ed-rv" data-kind="fleet" data-k="${escapeHtml(id)}"><div class="ed-rv-head"><span class="ed-tag">Anhänger</span><b>${escapeHtml(name)}</b><span class="ed-tag">${status}</span>
        ${b ? '<button type="button" class="ed-mini" data-open>Bearbeiten</button>' : ''}<button type="button" class="ed-mini" data-drop>Verwerfen</button></div></div>`);
    }
  }

  // Ladungsarten
  if (!same(prev.cargo, s.cargo)) {
    items.push(`<div class="ed-rv" data-kind="cargo"><div class="ed-rv-head"><span class="ed-tag">„Was transportieren Sie?“</span><b>Auswahl geändert</b>
      <button type="button" class="ed-mini" data-open>Bearbeiten</button><button type="button" class="ed-mini" data-drop>Verwerfen</button></div></div>`);
  }

  const w = sheet('Änderungen prüfen', `<div class="ed-form">
    ${items.length
      ? `<p class="ed-hint">${items.length} ${items.length === 1 ? 'Änderung' : 'Änderungen'} seit dem letzten Speichern. Texte können Sie hier noch verbessern.</p><div class="ed-rvs">${items.join('')}</div>`
      : '<p class="ed-hint">Keine ungespeicherten Änderungen.</p>'}
    <div class="ed-row"><button type="button" class="ed-btn ed-ghost" data-back>Weiter bearbeiten</button>
      ${items.length ? `<button type="button" class="ed-btn ed-primary" data-go>${ctx.storage.live ? 'Jetzt veröffentlichen' : 'Speichern'}</button>` : ''}</div></div>`, { wide: true, focus: false });

  const reopen = () => reviewSheet(ctx);
  // Text direkt in der Übersicht ändern
  for (const ta of $$<HTMLTextAreaElement>('.ed-rv[data-kind=text] textarea', w)) {
    ta.addEventListener('change', () => {
      const box = ta.closest<HTMLElement>('.ed-rv')!;
      const l = box.dataset.l as Lang;
      const k = box.dataset.k!;
      const v = ta.value.trim();
      const err = $('[data-err]', box)!;
      const ref = baked(l)[k] ?? '';
      if (!v) { err.hidden = false; err.textContent = 'Ein Text kann nicht leer sein.'; return; }
      if (fixedParts(v) !== fixedParts(ref)) {
        err.hidden = false;
        err.textContent = 'Bitte die Teile in {geschweiften Klammern} und die Link-Ziele in (runden Klammern) genau so lassen.';
        return;
      }
      err.hidden = true;
      ctx.change(() => {
        const st = ctx.state();
        (st.texts[l] ??= {})[k] = v;
        st.auto = (st.auto ?? []).filter((x) => x !== autoKey(l, k));
      });
      $('.ed-tag-auto', box)?.remove();
      toast('Text übernommen');
    });
  }
  // einzelne Änderung verwerfen: zurück auf den Stand beim letzten Speichern
  for (const b of $$<HTMLButtonElement>('[data-drop]', w)) {
    b.onclick = () => {
      const box = b.closest<HTMLElement>('.ed-rv')!;
      const { kind, l, k } = box.dataset as { kind: string; l: Lang; k: string };
      ctx.change(() => {
        const st = ctx.state();
        const restore = <T,>(from: Record<string, T> | undefined, to: Record<string, T>, key: string) => {
          if (from && key in from) to[key] = structuredClone(from[key]);
          else delete to[key];
        };
        if (kind === 'text') { restore(prev.texts[l], (st.texts[l] ??= {}), k); st.auto = (st.auto ?? []).filter((x) => x !== autoKey(l, k)); }
        if (kind === 'list') restore(prev.lists[l], (st.lists[l] ??= {}), k);
        if (kind === 'photo') restore(prev.photos, st.photos, k);
        if (kind === 'hours') { if (prev.hours) st.hours = structuredClone(prev.hours); else delete st.hours; }
        if (kind === 'fleet') { st.fleet ??= {}; restore(prev.fleet, st.fleet, k); if (!Object.keys(st.fleet).length) delete st.fleet; }
        if (kind === 'cargo') { if (prev.cargo) st.cargo = structuredClone(prev.cargo); else delete st.cargo; }
      });
      reopen();
    };
  }
  for (const b of $$<HTMLButtonElement>('[data-open]', w)) {
    b.onclick = () => {
      const box = b.closest<HTMLElement>('.ed-rv')!;
      closeSheet();
      if (box.dataset.kind === 'hours') ctx.openHours();
      if (box.dataset.kind === 'fleet') ctx.openFleet(box.dataset.k);
      if (box.dataset.kind === 'cargo') ctx.openCargo();
    };
  }
  $<HTMLButtonElement>('[data-back]', w)!.onclick = () => closeSheet();
  const go = $<HTMLButtonElement>('[data-go]', w);
  if (go) {
    go.onclick = async () => {
      // offene Eingabe in einem Textfeld zuerst übernehmen
      (document.activeElement as HTMLElement | null)?.blur();
      if ($$('[data-err]:not([hidden])', w).length) return toast('Bitte zuerst die rot markierten Texte korrigieren.', 4000);
      closeSheet();
      await ctx.save();
    };
  }
}
