/**
 * Übersicht vor dem Speichern: alle Änderungen seit dem letzten Speichern, nach Art geordnet.
 * Texte lassen sich hier direkt nachbessern, jede Änderung einzeln verwerfen; Öffnungszeiten,
 * Anhänger und Ladungsarten öffnen ihr Fenster. Automatisch übersetzte Texte sind markiert.
 */
import { escapeHtml, useT } from '@/i18n';
import { HTML_LANG, LANGS, type Lang } from '@/i18n/config';
import { CARGO_ITEMS, cargoLabel } from '@/lib/cargo';
import { PUBLISHED_CATEGORIES } from '@/lib/categories';
import { hoursSummary } from '@/lib/content';
import type { EditState } from '../../supabase/functions/publish/convert';
import { getPath } from './match';
import { baseWeek } from './hours';
import { loadBase } from './fleet';
import type { SiteStorage } from './storage';
import { autoOn, baked, canTranslate, failed, flushTranslations, targetsOf, translateKey, translating } from './translate';
import { $, $$, closeSheet, sheet, toast } from './ui';

export { baked };

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
/** Platzhalter und Link-Ziele eines Textes (müssen beim Ändern gleich bleiben) */
export const fixedParts = (s: string) =>
  [...[...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort(), '|', ...[...s.matchAll(/\]\(([^)\s]+)\)/g)].map((m) => m[1]).sort()].join(',');
const autoKey = (l: Lang, k: string) => `${l}:${k}`;

/**
 * Geänderte Texte einer Sprache, zusammengefasst: derselbe Satz an mehreren Stellen (gleich vorher
 * und nachher) ist eine Änderung.
 */
function textGroups(cur: EditState, prev: EditState, l: Lang): string[][] {
  const a = prev.texts[l] ?? {}, b = cur.texts[l] ?? {};
  const auto = new Set(cur.auto ?? []);
  const groups = new Map<string, string[]>();
  for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
    if (a[k] === b[k]) continue;
    const sig = JSON.stringify([a[k] ?? baked(l)[k] ?? '', k in b ? b[k] : null, auto.has(autoKey(l, k))]);
    groups.set(sig, [...(groups.get(sig) ?? []), k]);
  }
  return [...groups.values()];
}

/** Anzahl der Änderungen seit dem letzten Speichern */
export function countChanges(cur: EditState, prev: EditState): number {
  let n = 0;
  for (const l of LANGS) {
    n += textGroups(cur, prev, l).length;
    const la = prev.lists[l] ?? {}, lb = cur.lists[l] ?? {};
    for (const p of new Set([...Object.keys(la), ...Object.keys(lb)])) if (!same(la[p], lb[p])) n++;
  }
  for (const k of new Set([...Object.keys(prev.photos), ...Object.keys(cur.photos)])) if (!same(prev.photos[k], cur.photos[k])) n++;
  if (!same(prev.hours, cur.hours)) n++;
  const fa = prev.fleet ?? {}, fb = cur.fleet ?? {};
  for (const id of new Set([...Object.keys(fa), ...Object.keys(fb)])) if (!same(fa[id], fb[id])) n++;
  if (!same(prev.cargo, cur.cargo)) n++;
  if (!same(prev.categories, cur.categories)) n++;
  return n;
}

export async function reviewSheet(ctx: ReviewCtx) {
  // erst die laufenden Übersetzungen abwarten, sonst fehlen hier die anderen Sprachen
  if (translating()) {
    const w = sheet('Änderungen prüfen', '<p class="ed-hint ed-busy">Übersetze in die anderen Sprachen … einen Moment.</p>', { wide: true, focus: false });
    await flushTranslations();
    if (!w.isConnected) return; // inzwischen geschlossen
  }
  const s = ctx.state();
  const prev = ctx.lastSaved();
  const auto = new Set(s.auto ?? []);
  const items: string[] = [];

  // Texte, nach Sprache: die Sprache der offenen Seite zuerst
  const order = [ctx.lang, ...LANGS.filter((l) => l !== ctx.lang)];
  const noted = new Set<string>();
  /** von Hand geändert, aber in anderen Sprachen steht noch der alte Text */
  const missingNote = (l: Lang, keys: string[]) => {
    if (!canTranslate || keys.some((k) => noted.has(k)) || !(keys[0] in (s.texts[l] ?? {}))) return '';
    const miss = targetsOf(s, keys, l).filter((t) => !keys.every((k) => auto.has(autoKey(t, k))));
    if (!miss.length) return '';
    for (const k of keys) noted.add(k);
    const why = keys.map((k) => failed.get(k)).find(Boolean);
    return `<div class="ed-rv-miss${why || autoOn() ? ' ed-warn' : ''}"><span>In ${miss.map((t) => LANG_NAME[t]).join(', ')} steht noch der alte Text.${why ? ` <small>(Übersetzung fehlgeschlagen: ${escapeHtml(why)})</small>` : ''}</span>
      <button type="button" class="ed-mini" data-tr>Jetzt übersetzen</button></div>`;
  };
  for (const l of order) {
    const a = prev.texts[l] ?? {}, b = s.texts[l] ?? {};
    for (const keys of textGroups(s, prev, l)) {
      const k = keys[0];
      const before = a[k] ?? baked(l)[k] ?? '';
      const isAuto = auto.has(autoKey(l, k));
      items.push(`<div class="ed-rv" data-kind="text" data-l="${l}" data-k="${escapeHtml(keys.join(' '))}">
        <div class="ed-rv-head"><span class="ed-tag">${LANG_NAME[l]}</span>${keys.length > 1 ? `<span class="ed-tag">an ${keys.length} Stellen</span>` : ''}${isAuto ? '<span class="ed-tag ed-tag-auto">automatisch übersetzt – bitte prüfen</span>' : ''}
          <button type="button" class="ed-mini" data-drop>Verwerfen</button></div>
        <p class="ed-rv-before"><small>Vorher:</small> ${escapeHtml(before.replace(/­/g, ''))}</p>
        ${k in b
          ? `<textarea rows="${Math.min(8, Math.ceil(b[k].length / 60) + 1)}" lang="${HTML_LANG[l]}" spellcheck="true">${escapeHtml(b[k])}</textarea><p class="ed-err" data-err hidden></p>`
          : '<p class="ed-rv-note">Zurück auf den vorherigen Text</p>'}
        ${isAuto ? '' : missingNote(l, keys)}
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

  // Ladungsarten: was genau sich geändert hat
  if (!same(prev.cargo, s.cargo)) {
    const dflt = useT(ctx.lang).finder.cargo as Record<string, string>;
    const a = prev.cargo ?? CARGO_ITEMS, b = s.cargo ?? CARGO_ITEMS;
    const name = (c: (typeof a)[number]) => cargoLabel(c, ctx.lang, dflt);
    const lines: string[] = [];
    for (const c of b) {
      const o = a.find((x) => x.id === c.id);
      if (!o) lines.push(`Neu: <b>${escapeHtml(name(c))}</b>`);
      else if (!same(o.label ?? {}, c.label ?? {})) lines.push(name(o) === name(c) ? `Andere Sprachen geändert: <b>${escapeHtml(name(c))}</b>` : `Umbenannt: ${escapeHtml(name(o))} → <b>${escapeHtml(name(c))}</b>`);
    }
    for (const o of a) if (!b.some((c) => c.id === o.id)) lines.push(`Entfernt: <s>${escapeHtml(name(o))}</s>`);
    const kept = b.filter((c) => a.some((x) => x.id === c.id)).map((c) => c.id);
    if (!same(kept, a.filter((x) => kept.includes(x.id)).map((x) => x.id))) lines.push('Reihenfolge geändert');
    items.push(`<div class="ed-rv" data-kind="cargo"><div class="ed-rv-head"><span class="ed-tag">„Was transportieren Sie?“</span>
      <button type="button" class="ed-mini" data-open>Bearbeiten</button><button type="button" class="ed-mini" data-drop>Verwerfen</button></div>
      <ul class="ed-rv-list">${(lines.length ? lines : ['Auswahl geändert']).map((x) => `<li>${x}</li>`).join('')}</ul></div>`);
  }

  // Eigene Arten (z. B. Food Truck)
  if (!same(prev.categories, s.categories)) {
    const a = prev.categories ?? PUBLISHED_CATEGORIES, b = s.categories ?? PUBLISHED_CATEGORIES;
    const name = (c: (typeof a)[number]) => c.label.de || c.label.fr || c.id;
    const lines: string[] = [];
    for (const c of b) {
      const o = a.find((x) => x.id === c.id);
      if (!o) lines.push(`Neu: <b>${escapeHtml(name(c))}</b> (${c.kind === 'van' ? 'Transporter' : 'Anhänger'})`);
      else if (!same(o, c)) lines.push(`Geändert: <b>${escapeHtml(name(c))}</b>`);
    }
    for (const o of a) if (!b.some((c) => c.id === o.id)) lines.push(`Entfernt: <s>${escapeHtml(name(o))}</s>`);
    items.push(`<div class="ed-rv" data-kind="categories"><div class="ed-rv-head"><span class="ed-tag">Arten</span>
      <button type="button" class="ed-mini" data-drop>Verwerfen</button></div>
      <ul class="ed-rv-list">${(lines.length ? lines : ['Arten geändert']).map((x) => `<li>${x}</li>`).join('')}</ul></div>`);
  }

  const nAuto = items.filter((x) => x.includes('ed-tag-auto')).length;
  const w = sheet('Änderungen prüfen', `<div class="ed-form">
    ${items.length
      ? `<p class="ed-hint">${items.length} ${items.length === 1 ? 'Änderung' : 'Änderungen'} seit dem letzten Speichern. Texte können Sie hier noch verbessern.${nAuto ? ` <b>${nAuto} ${nAuto === 1 ? 'Text wurde' : 'Texte wurden'} automatisch übersetzt</b> – bitte kurz prüfen (gelb markiert).` : ''}</p><div class="ed-rvs">${items.join('')}</div>`
      : '<p class="ed-hint">Keine ungespeicherten Änderungen.</p>'}
    <div class="ed-row"><button type="button" class="ed-btn ed-ghost" data-back>Weiter bearbeiten</button>
      ${items.length ? `<button type="button" class="ed-btn ed-primary" data-go>${ctx.storage.live ? 'Jetzt veröffentlichen' : 'Speichern'}</button>` : ''}</div></div>`, { wide: true, focus: false });

  const reopen = () => reviewSheet(ctx);
  // Text direkt in der Übersicht ändern
  for (const ta of $$<HTMLTextAreaElement>('.ed-rv[data-kind=text] textarea', w)) {
    ta.addEventListener('change', () => {
      const box = ta.closest<HTMLElement>('.ed-rv')!;
      const l = box.dataset.l as Lang;
      const keys = box.dataset.k!.split(' ');
      const v = ta.value.trim();
      const err = $('[data-err]', box)!;
      if (!v) { err.hidden = false; err.textContent = 'Ein Text kann nicht leer sein.'; return; }
      if (keys.some((k) => fixedParts(v) !== fixedParts(baked(l)[k] ?? ''))) {
        err.hidden = false;
        err.textContent = 'Bitte die Teile in {geschweiften Klammern} und die Link-Ziele in (runden Klammern) genau so lassen.';
        return;
      }
      err.hidden = true;
      const drop = new Set(keys.map((k) => autoKey(l, k)));
      ctx.change(() => {
        const st = ctx.state();
        for (const k of keys) (st.texts[l] ??= {})[k] = v;
        st.auto = (st.auto ?? []).filter((x) => !drop.has(x));
      });
      const wasAuto = !!$('.ed-tag-auto', box);
      $('.ed-tag-auto', box)?.remove();
      // Ausgangstext verbessert: die automatischen Fassungen der anderen Sprachen neu übersetzen
      if (!wasAuto && autoOn() && targetsOf(ctx.state(), keys, l).length) {
        toast('Text übernommen – übersetze die anderen Sprachen neu …');
        void translateKey(ctx, keys, v, l, true).then(() => { if (w.isConnected) void reopen(); });
      } else toast('Text übernommen');
    });
  }
  // in die Sprachen übersetzen, in denen noch der alte Text steht
  for (const b of $$<HTMLButtonElement>('[data-tr]', w)) {
    b.onclick = async () => {
      const box = b.closest<HTMLElement>('.ed-rv')!;
      const l = box.dataset.l as Lang;
      const keys = box.dataset.k!.split(' ');
      const v = ctx.state().texts[l]?.[keys[0]];
      if (!v) return;
      b.disabled = true;
      b.textContent = 'Übersetze …';
      const ok = await translateKey(ctx, keys, v, l, true);
      if (!w.isConnected) return;
      if (!ok) toast(`Übersetzung nicht möglich: ${failed.get(keys[0]) ?? 'unbekannter Fehler'}`, 5000);
      reopen();
    };
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
        if (kind === 'text') {
          const keys = k.split(' ');
          for (const key of keys) restore(prev.texts[l], (st.texts[l] ??= {}), key);
          st.auto = (st.auto ?? []).filter((x) => !keys.some((key) => x === autoKey(l, key)));
        }
        if (kind === 'list') restore(prev.lists[l], (st.lists[l] ??= {}), k);
        if (kind === 'photo') restore(prev.photos, st.photos, k);
        if (kind === 'hours') { if (prev.hours) st.hours = structuredClone(prev.hours); else delete st.hours; }
        if (kind === 'fleet') { st.fleet ??= {}; restore(prev.fleet, st.fleet, k); if (!Object.keys(st.fleet).length) delete st.fleet; }
        if (kind === 'cargo') { if (prev.cargo) st.cargo = structuredClone(prev.cargo); else delete st.cargo; }
        if (kind === 'categories') { if (prev.categories) st.categories = structuredClone(prev.categories); else delete st.categories; }
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
      if (translating()) {
        go.disabled = true;
        go.textContent = 'Übersetze noch …';
        await flushTranslations();
        // die neuen Übersetzungen sollen vor dem Veröffentlichen zu sehen sein
        if (w.isConnected) return reopen();
      }
      closeSheet();
      await ctx.save();
    };
  }
}
