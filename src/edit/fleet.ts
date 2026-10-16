/**
 * Mietanhänger und Transporter im Admin-Bereich: anlegen, bearbeiten (Daten, Texte in allen
 * Sprachen, Foto), ausblenden, löschen. Änderungen liegen in state.fleet (Kennung → Daten,
 * null = gelöscht) und werden beim Veröffentlichen zu src/content/flotte/<kennung>.json.
 *
 * Vorschau: Auf der offenen Seite werden der Finder (Startseite, Mieten) und die Tabelle neu
 * gezeichnet, auf den Kategorieseiten gelöschte Fahrzeuge ausgeblendet.
 */
import { escapeHtml, useT, type Dict } from '@/i18n';
import type { Lang } from '@/i18n/config';
import { hiddenReason, toFleetItem, type FleetSource } from '@/lib/fleet';
import { CATEGORIES, cargoErrors, cleanFleet, ContentError, fleetErrors, LANGS, slugify, type CargoItem, type EditState, type FleetData } from '../../supabase/functions/publish/convert';
import { CARGO_ITEMS, cargoLabel } from '@/lib/cargo';
import { canTranslate, fillLanguages } from './translate';
import type { SiteStorage } from './storage';
import { $, $$, closeSheet, confirmBox, pickers, prepareImage, sheet, toast } from './ui';

export interface FleetCtx {
  lang: Lang;
  t: Dict;
  state: () => EditState;
  change: (fn: () => void | false) => void;
  storage: SiteStorage;
}

export interface BaseEntry { id: string; path: string; data: FleetData; thumb: string | null; hidden: string | null }
export interface Base { showSamples: boolean; entries: BaseEntry[] }
export interface Row { id: string; data: FleetData; base?: BaseEntry; status: 'base' | 'new' | 'changed' | 'deleted' }

const DE = useT('de');
const BASE_URL = import.meta.env.BASE_URL.replace(/\/?$/, '/');
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
export const isUpload = (p: string | null | undefined) => !!p && /^(upload|images\/uploads)\//.test(p);

let basePromise: Promise<Base> | null = null;
export function loadBase(): Promise<Base> {
  return (basePromise ??= fetch(`${BASE_URL}edit/fleet.json`, { cache: 'no-store' })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .catch((e) => {
      basePromise = null;
      throw e;
    }));
}

/** Alle Fahrzeuge mit den Änderungen aus dem Admin-Bereich */
export function rows(base: Base, s: EditState): Row[] {
  const ed = s.fleet ?? {};
  const out: Row[] = base.entries.map((b) => {
    if (!(b.id in ed)) return { id: b.id, data: b.data, base: b, status: 'base' };
    const d = ed[b.id];
    return d === null ? { id: b.id, data: b.data, base: b, status: 'deleted' } : { id: b.id, data: d, base: b, status: 'changed' };
  });
  for (const [id, d] of Object.entries(ed)) if (d && !base.entries.some((b) => b.id === id)) out.push({ id, data: d, status: 'new' });
  return out;
}

const HIDDEN: Record<string, string> = {
  inactive: 'Ausgeblendet',
  sample: 'Beispiel – auf der Live-Website nicht sichtbar',
  sampleShown: 'Beispieldaten – vor dem Livegang ersetzen',
  trailerLimit: 'Über 3 500 kg – nicht sichtbar',
  vanLimit: 'Über 3 500 kg – nicht sichtbar',
};

function thumbOf(ctx: FleetCtx, r: Row): string | null {
  if (isUpload(r.data.photo)) return ctx.storage.imageUrl(r.data.photo!);
  return r.base && r.data.photo === r.base.data.photo ? r.base.thumb : null;
}

/* ================================================================ Liste */
export async function fleetSheet(ctx: FleetCtx) {
  const wrap = sheet('Mietanhänger & Transporter', '<p class="ed-hint">Wird geladen …</p>', { wide: true, focus: false });
  let base: Base;
  try {
    base = await loadBase();
  } catch {
    $('.ed-sheet-body', wrap)!.innerHTML = '<p class="ed-err">Die Fahrzeugliste konnte nicht geladen werden. Bitte die Seite neu laden.</p>';
    return;
  }
  if (!wrap.isConnected) return;
  const list = rows(base, ctx.state());
  const label = (r: Row) => r.data.name?.[ctx.lang] || r.data.name?.fr || 'Neues Fahrzeug';
  const meta = (d: FleetData) =>
    [DE.categories[d.category as keyof typeof DE.categories] ?? d.category, d.mmaKg ? `${d.mmaKg} kg` : '', d.priceDay ? `${d.priceDay} €/Tag` : ''].filter(Boolean).join(' · ');
  const tags = (r: Row) => {
    const t: string[] = [];
    if (r.status === 'new') t.push('<span class="ed-tag ed-tag-new">Neu</span>');
    if (r.status === 'changed') t.push('<span class="ed-tag ed-tag-new">Geändert</span>');
    if (r.status === 'deleted') t.push('<span class="ed-tag ed-tag-del">Wird gelöscht</span>');
    const why = r.status === 'deleted' ? null : hiddenReason(r.data as FleetSource, base.showSamples) ?? (r.data.sample ? 'sampleShown' : null);
    if (why) t.push(`<span class="ed-tag">${HIDDEN[why]}</span>`);
    return t.join('');
  };
  const item = (r: Row) => {
    const th = thumbOf(ctx, r);
    return `<div class="ed-fitem${r.status === 'deleted' ? ' ed-fdel' : ''}">
        <div class="ed-fthumb">${th ? `<img src="${escapeHtml(th)}" alt="">` : '<span aria-hidden="true">🛻</span>'}</div>
        <div class="ed-fmain"><b>${escapeHtml(label(r))}</b><small>${escapeHtml(meta(r.data))}</small><span class="ed-tags">${tags(r)}</span></div>
        <div class="ed-fact">${r.status === 'deleted'
          ? `<button class="ed-btn ed-ghost" data-undel="${r.id}">Wiederherstellen</button>`
          : `<button class="ed-btn ed-ghost" data-edit="${r.id}">Bearbeiten</button><button class="ed-btn ed-ghost ed-red" data-del="${r.id}">Löschen</button>`}</div>
      </div>`;
  };
  // Gelöschte verschwinden sofort aus der Liste (und von der Seite); bis zum Speichern zurückholbar
  const shown = list.filter((r) => r.status !== 'deleted');
  const gone = list.filter((r) => r.status === 'deleted');
  $('.ed-sheet-body', wrap)!.innerHTML = `<div class="ed-form">
    <div class="ed-row ed-row-start"><button class="ed-btn ed-primary" data-new>＋ Neues Fahrzeug anlegen</button>
      <button class="ed-btn ed-ghost" data-cargo>🧺 „Was transportieren Sie?“ bearbeiten</button></div>
    <div class="ed-flist">${shown.length ? shown.map(item).join('') : '<p class="ed-hint">Noch keine Fahrzeuge eingetragen.</p>'}</div>
    ${gone.length ? `<details class="ed-details"><summary>Gelöscht (${gone.length}) – endgültig weg nach dem Speichern</summary><div class="ed-flist">${gone.map(item).join('')}</div></details>` : ''}
</div>`;

  $('[data-new]', wrap)!.onclick = () => editSheet(ctx, base, null);
  $('[data-cargo]', wrap)!.onclick = () => cargoSheet(ctx);
  for (const b of $$<HTMLButtonElement>('[data-edit]', wrap)) b.onclick = () => editSheet(ctx, base, list.find((r) => r.id === b.dataset.edit)!);
  for (const b of $$<HTMLButtonElement>('[data-undel]', wrap)) {
    b.onclick = () => {
      ctx.change(() => {
        delete ctx.state().fleet![b.dataset.undel!];
        tidy(ctx);
      });
      fleetSheet(ctx);
    };
  }
  for (const b of $$<HTMLButtonElement>('[data-del]', wrap)) {
    b.onclick = async () => {
      const r = list.find((x) => x.id === b.dataset.del)!;
      if (!(await confirmBox('Fahrzeug löschen', `„${label(r)}“ wird nach dem Speichern von der Website entfernt. Nur ausblenden geht unter „Bearbeiten“ → „Auf der Website zeigen“.`, 'Löschen', true))) return fleetSheet(ctx);
      ctx.change(() => {
        const s = ctx.state();
        s.fleet ??= {};
        if (r.status === 'new') delete s.fleet[r.id];
        else s.fleet[r.id] = null;
        tidy(ctx);
      });
      toast('Gelöscht – mit „Rückgängig“ zurückholen');
      fleetSheet(ctx);
    };
  }
}

/** Fahrzeug direkt bearbeiten (Tippen auf eine Karte oder Tabellenzeile) */
export async function fleetEdit(ctx: FleetCtx, id: string) {
  let base: Base;
  try { base = await loadBase(); } catch { return fleetSheet(ctx); }
  const r = rows(base, ctx.state()).find((x) => x.id === id && x.status !== 'deleted');
  if (r) editSheet(ctx, base, r);
  else fleetSheet(ctx);
}

/** leere Änderungsliste entfernen */
function tidy(ctx: FleetCtx) {
  const s = ctx.state();
  if (s.fleet && !Object.keys(s.fleet).length) delete s.fleet;
}

/* ================================================================ Bearbeiten */
const EMPTY = (): FleetData => ({
  category: 'benne', name: { fr: '' }, brand: null, mmaKg: 750, emptyKg: null, payloadKg: 500, braked: false,
  loadLengthM: null, loadWidthM: null, loadHeightM: null, volumeM3: null, tempRange: null, power: null, socket: 13,
  showPallets: false, suitableFor: [], priceDay: null, priceWeekend: null, deposit: null, notes: null, photo: null, active: true,
});

const ERR: Record<string, string> = {
  required: 'Pflichtfeld',
  int: 'Bitte eine ganze Zahl in kg',
  num: 'Bitte eine Zahl größer 0',
  range: 'Wert außerhalb des Üblichen',
  payload: 'Nutzlast größer als Gesamtgewicht',
  over: 'Über 3 500 kg – mit Führerschein B/BE nicht erlaubt',
  socket: '7 oder 13 Pole',
  temp: '„Von“ muss kleiner als „bis“ sein',
  cargo: 'Ungültige Auswahl',
  long: 'Zu lang',
  photo: 'Foto erneut wählen',
};

function editSheet(ctx: FleetCtx, base: Base, row: Row | null) {
  const d: FleetData = structuredClone(row?.data ?? EMPTY());
  const isNew = !row || row.status === 'new';
  let photoUrl: string | null = row ? thumbOf(ctx, row) : null;
  const L = LANGS.filter((l) => l !== 'fr');
  const num = (v: unknown) => (v == null ? '' : String(v).replace('.', ','));
  const f = (label: string, name: string, value: string, extra = '') =>
    `<label><span>${label}</span><input name="${name}" value="${escapeHtml(value)}" ${extra}><span class="ed-ferr" data-e="${name}"></span></label>`;
  const nf = (label: string, name: keyof FleetData & string, unit: string, hint = '') =>
    f(`${label} <small>${unit}${hint ? ` · ${hint}` : ''}</small>`, name, num(d[name]), 'inputmode="decimal" autocomplete="off"');
  const isTrailerCat = (c: string) => c !== 'camionnette' && c !== 'voiture';

  const wrap = sheet(row ? `Bearbeiten: ${d.name.fr || 'Fahrzeug'}` : 'Neues Fahrzeug', `<form class="ed-form ed-fleet-form" novalidate>
    <div class="ed-photo-edit"><div class="ed-prev">${photoUrl ? `<img src="${escapeHtml(photoUrl)}" alt="">` : '<span class="ed-hint">Noch kein Foto</span>'}</div>
      ${pickers()}<button type="button" class="ed-mini" data-nophoto ${d.photo ? '' : 'hidden'}>Foto entfernen</button></div>

    <h3 class="ed-h3">Grunddaten</h3>
    <div class="ed-grid">
      <label><span>Art</span><select name="category">${CATEGORIES.map((c) => `<option value="${c}" ${c === d.category ? 'selected' : ''}>${escapeHtml(DE.categories[c])}</option>`).join('')}</select></label>
      ${f('Name (Französisch) <small>Pflicht</small>', 'name.fr', d.name.fr, 'maxlength="80"')}
      ${f('Marke <small>optional</small>', 'brand', d.brand ?? '', 'maxlength="60"')}
    </div>
    <details class="ed-details"><summary>Name in den anderen Sprachen <small>(leer = Französisch)</small></summary>
      ${canTranslate ? '<button type="button" class="ed-mini" data-tr="name">Leere Sprachen automatisch übersetzen</button>' : ''}<div class="ed-grid">
      ${L.map((l) => f(`Name ${l.toUpperCase()}`, `name.${l}`, d.name[l] ?? '', 'maxlength="80"')).join('')}</div></details>

    <h3 class="ed-h3">Gewichte</h3>
    <div class="ed-grid">
      ${nf('Zulässiges Gesamtgewicht', 'mmaKg', 'kg')}${nf('Leergewicht', 'emptyKg', 'kg', 'optional')}${nf('Nutzlast', 'payloadKg', 'kg')}
    </div>
    <button type="button" class="ed-mini" data-payload hidden></button>
    <label class="ed-check" data-trailer><input type="checkbox" name="braked" ${d.braked ? 'checked' : ''}> Gebremst</label>

    <h3 class="ed-h3">Ladefläche <small>optional</small></h3>
    <div class="ed-grid">
      ${nf('Länge', 'loadLengthM', 'm')}${nf('Breite', 'loadWidthM', 'm')}${nf('Höhe', 'loadHeightM', 'm')}${nf('Volumen', 'volumeM3', 'm³')}
    </div>
    <label class="ed-check" data-trailer><input type="checkbox" name="showPallets" ${d.showPallets ? 'checked' : ''}> Europaletten auf der Ladefläche anzeigen</label>

    <h3 class="ed-h3">Preise <small>optional – ohne Preis fragen Kunden über das Formular an</small></h3>
    <div class="ed-grid">${nf('Pro Tag', 'priceDay', '€')}${nf('Wochenende', 'priceWeekend', '€')}${nf('Kaution', 'deposit', '€')}</div>

    <h3 class="ed-h3">Ausstattung</h3>
    <fieldset class="ed-opts"><legend>Geeignet für</legend>${cargoNow(ctx).map((c) => `<label class="ed-opt"><input type="checkbox" name="cargo" value="${c.id}" ${(d.suitableFor ?? []).includes(c.id) ? 'checked' : ''}><span>${escapeHtml(cargoLabel(c, 'de', DE.finder.cargo as Record<string, string>))}</span></label>`).join('')}</fieldset>
    <div class="ed-grid">
      <label data-trailer><span>Steckdose</span><select name="socket"><option value="">keine Angabe</option>${[7, 13].map((n) => `<option value="${n}" ${d.socket === n ? 'selected' : ''}>${n}-polig</option>`).join('')}</select></label>
      <span data-frigo>${f('Kühlung von <small>°C</small>', 'tempMin', num(d.tempRange?.minC), 'inputmode="numeric"')}</span>
      <span data-frigo>${f('Kühlung bis <small>°C</small>', 'tempMax', num(d.tempRange?.maxC), 'inputmode="numeric"')}</span>
      <span data-frigo>${f('Stromanschluss <small>optional</small>', 'power', d.power ?? '', 'placeholder="230 V"')}</span>
    </div>

    <h3 class="ed-h3">Kurze Beschreibung <small>optional, erscheint auf der Karte des Fahrzeugs</small></h3>
    <label>Französisch<textarea name="notes.fr" rows="2" maxlength="600">${escapeHtml(d.notes?.fr ?? '')}</textarea><span class="ed-ferr" data-e="notes.fr"></span></label>
    <details class="ed-details"><summary>Beschreibung in den anderen Sprachen <small>(leer = Französisch)</small></summary>
      ${canTranslate ? '<button type="button" class="ed-mini" data-tr="notes">Leere Sprachen automatisch übersetzen</button>' : ''}
      ${L.map((l) => `<label>${l.toUpperCase()}<textarea name="notes.${l}" rows="2" maxlength="600">${escapeHtml(d.notes?.[l] ?? '')}</textarea></label>`).join('')}</details>

    <label class="ed-check ed-check-big"><input type="checkbox" name="active" ${d.active !== false ? 'checked' : ''}> Auf der Website zeigen</label>
    <p class="ed-err" data-summary hidden></p>
    <div class="ed-row"><button type="button" class="ed-btn ed-ghost" data-back>Zurück zur Liste</button><button type="submit" class="ed-btn ed-primary">Übernehmen</button></div>
  </form>`, { wide: true, focus: false });
  const form = $<HTMLFormElement>('form', wrap)!;
  const val = (n: string) => (form.elements.namedItem(n) as HTMLInputElement | null)?.value.trim() ?? '';
  const numVal = (n: string): number | null => {
    const v = val(n).replace(/\s/g, '').replace(',', '.');
    return v === '' ? null : Number(v);
  };

  /** Formular → Daten */
  const read = () => {
    d.category = val('category');
    d.name = { fr: val('name.fr'), ...Object.fromEntries(L.map((l) => [l, val(`name.${l}`)])) } as FleetData['name'];
    d.brand = val('brand') || null;
    d.mmaKg = numVal('mmaKg') as number;
    d.emptyKg = numVal('emptyKg');
    d.payloadKg = numVal('payloadKg') as number;
    for (const k of ['loadLengthM', 'loadWidthM', 'loadHeightM', 'volumeM3', 'priceDay', 'priceWeekend', 'deposit'] as const) d[k] = numVal(k);
    const trailer = isTrailerCat(d.category);
    d.braked = trailer && (form.elements.namedItem('braked') as HTMLInputElement).checked;
    d.showPallets = trailer && (form.elements.namedItem('showPallets') as HTMLInputElement).checked;
    d.socket = trailer && val('socket') ? (Number(val('socket')) as 7 | 13) : null;
    d.suitableFor = $$<HTMLInputElement>('[name=cargo]:checked', form).map((x) => x.value);
    const frigo = d.category === 'frigorifique';
    const tmin = numVal('tempMin');
    const tmax = numVal('tempMax');
    d.tempRange = frigo && (tmin != null || tmax != null) ? { minC: tmin ?? 0, maxC: tmax ?? 8 } : null;
    d.power = frigo ? val('power') || null : null;
    const notes = { fr: val('notes.fr'), ...Object.fromEntries(L.map((l) => [l, val(`notes.${l}`)])) };
    d.notes = Object.values(notes).some(Boolean) ? (notes as FleetData['notes']) : null;
    d.active = (form.elements.namedItem('active') as HTMLInputElement).checked;
  };
  const errors = () => {
    const e = fleetErrors(d);
    if (!ctx.storage.live) delete e.photo; // Demo: Bild liegt nur im Browser
    return e;
  };
  /** Felder je nach Art ein- und ausblenden, Nutzlast-Hilfe */
  const sync = () => {
    read();
    for (const el of $$('[data-trailer]', form)) el.hidden = !isTrailerCat(d.category);
    for (const el of $$('[data-frigo]', form)) el.hidden = d.category !== 'frigorifique';
    const pb = $<HTMLButtonElement>('[data-payload]', form)!;
    const auto = d.emptyKg && d.mmaKg > d.emptyKg ? d.mmaKg - d.emptyKg : null;
    pb.hidden = !auto || auto === d.payloadKg;
    pb.textContent = `Nutzlast = Gesamtgewicht − Leergewicht übernehmen (${auto} kg)`;
  };
  const showErrors = (e: Record<string, string>) => {
    for (const s of $$('[data-e]', form)) s.textContent = '';
    for (const [k, v] of Object.entries(e)) {
      const s = $(`[data-e="${k === 'tempRange' ? 'tempMin' : k}"]`, form);
      if (s) s.textContent = ERR[v] ?? v;
    }
    const sum = $('[data-summary]', form)!;
    sum.hidden = !Object.keys(e).length;
    sum.textContent = 'Bitte die markierten Felder prüfen.';
    $('.ed-ferr:not(:empty)', form)?.closest('label')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  };
  form.addEventListener('input', sync);
  form.addEventListener('change', sync);
  sync();

  $<HTMLButtonElement>('[data-payload]', form)!.onclick = () => {
    (form.elements.namedItem('payloadKg') as HTMLInputElement).value = String(d.mmaKg - (d.emptyKg ?? 0));
    sync();
  };
  let uploading = false;
  for (const inp of $$<HTMLInputElement>('input[type=file]', form)) {
    inp.onchange = async () => {
      const file = inp.files?.[0];
      if (!file) return;
      uploading = true;
      $('.ed-sheet', wrap)!.classList.add('ed-working');
      try {
        const r = await prepareImage(file, 1600);
        const path = await ctx.storage.uploadImage(r.blob, `fleet-${Math.random().toString(36).slice(2, 8)}.${r.ext}`);
        d.photo = path;
        photoUrl = ctx.storage.imageUrl(path);
        $('.ed-prev', form)!.innerHTML = `<img src="${escapeHtml(photoUrl)}" alt="">`;
        $<HTMLButtonElement>('[data-nophoto]', form)!.hidden = false;
      } catch (e) {
        toast((e as Error).message === 'format' ? 'Dieses Bildformat wird nicht unterstützt. Bitte ein JPG oder PNG wählen.' : `Das Bild konnte nicht hochgeladen werden. ${(e as Error).message}`, 5000);
      }
      uploading = false;
      $('.ed-sheet', wrap)?.classList.remove('ed-working');
    };
  }
  $<HTMLButtonElement>('[data-nophoto]', form)!.onclick = (e) => {
    d.photo = null;
    photoUrl = null;
    $('.ed-prev', form)!.innerHTML = '<span class="ed-hint">Kein Foto</span>';
    (e.target as HTMLElement).hidden = true;
  };
  $<HTMLButtonElement>('[data-back]', form)!.onclick = () => fleetSheet(ctx);

  for (const b of $$<HTMLButtonElement>('[data-tr]', form)) {
    b.onclick = async () => {
      const field = b.dataset.tr as 'name' | 'notes';
      const get = (l: Lang) => (form.elements.namedItem(`${field}.${l}`) as HTMLInputElement).value;
      b.disabled = true;
      b.textContent = 'Übersetze …';
      try {
        const res = await fillLanguages(Object.fromEntries(LANGS.map((l) => [l, get(l)])), 'fr');
        for (const [l, v] of Object.entries(res)) (form.elements.namedItem(`${field}.${l}`) as HTMLInputElement).value = v!;
        sync();
        toast(Object.keys(res).length ? 'Übersetzt – bitte kurz prüfen' : 'Nichts zu übersetzen');
      } catch (x) {
        toast(`Übersetzung nicht möglich: ${(x as Error).message}`, 4500);
      }
      b.disabled = false;
      b.textContent = 'Leere Sprachen automatisch übersetzen';
    };
  }

  form.onsubmit = (e) => {
    e.preventDefault();
    if (uploading) return toast('Das Foto wird noch vorbereitet – einen Moment bitte.');
    read();
    const errs = errors();
    if (Object.keys(errs).length) return showErrors(errs);
    const data = cleanFleet(d);
    let id = row?.id;
    if (!id) {
      const taken = new Set([...base.entries.map((b) => b.id), ...Object.keys(ctx.state().fleet ?? {})]);
      const slug = slugify(data.name.fr);
      id = slug;
      for (let n = 2; taken.has(id); n++) id = `${slug}-${n}`;
    }
    const baseData = row?.base?.data;
    ctx.change(() => {
      const s = ctx.state();
      s.fleet ??= {};
      if (baseData && same(cleanFleet(baseData), data)) delete s.fleet[id!];
      else s.fleet[id!] = data;
      tidy(ctx);
    });
    closeSheet();
    toast(isNew ? 'Fahrzeug angelegt – bitte speichern' : 'Änderungen übernommen – bitte speichern', 3200);
    fleetSheet(ctx);
  };
}

/* ================================================================ Ladungsarten („Was transportieren Sie?“) */
/** aktuelle Liste: geändert im Admin-Bereich oder wie gebaut */
export const cargoNow = (ctx: FleetCtx): CargoItem[] => ctx.state().cargo ?? CARGO_ITEMS;
const defaults = (l: Lang) => useT(l).finder.cargo as Record<string, string>;

export function cargoSheet(ctx: FleetCtx) {
  type RowC = { id: string; label: Partial<Record<Lang, string>> };
  // Beschriftung je Sprache so, wie sie auf der Seite steht (eigene oder Standard)
  let rowsC: RowC[] = cargoNow(ctx).map((c) => ({ id: c.id, label: Object.fromEntries(LANGS.map((l) => [l, cargoLabel(c, l, defaults(l))])) }));
  const other = LANGS.filter((l) => l !== ctx.lang);
  const wrap = sheet('„Was transportieren Sie?“', '<div class="ed-form ed-cargo"></div>', { wide: true, focus: false });
  const body = $('.ed-cargo', wrap)!;
  const draw = () => {
    body.innerHTML = `<p class="ed-hint">Die Auswahl oben im Anhänger-Finder. Beim Anhänger unter „Geeignet für“ ankreuzen, wofür er passt. Angezeigt werden nur Ladungsarten mit mindestens einem passenden Anhänger.</p>
      <div class="ed-flist">${rowsC.map((r, i) => `<div class="ed-crow" data-i="${i}">
        <label>Beschriftung (${ctx.lang.toUpperCase()})<input data-l="${ctx.lang}" value="${escapeHtml(r.label[ctx.lang] ?? '')}" maxlength="60" placeholder="z. B. Ein Fahrrad"></label>
        <details class="ed-details"><summary>Andere Sprachen</summary><div class="ed-grid">${other.map((l) => `<label>${l.toUpperCase()}<input data-l="${l}" value="${escapeHtml(r.label[l] ?? '')}" maxlength="60"></label>`).join('')}</div></details>
        <div class="ed-fact"><button type="button" class="ed-mini" data-up aria-label="Nach oben">↑</button><button type="button" class="ed-mini" data-down aria-label="Nach unten">↓</button><button type="button" class="ed-mini ed-red" data-rm>Entfernen</button></div>
      </div>`).join('')}</div>
      <div class="ed-row ed-row-start"><button type="button" class="ed-btn ed-ghost" data-add>＋ Neue Ladungsart</button>
        ${canTranslate ? '<button type="button" class="ed-btn ed-ghost" data-tr>Leere Sprachen automatisch übersetzen</button>' : ''}</div>
      <p class="ed-err" data-err hidden></p>
      <div class="ed-row"><button type="button" class="ed-btn ed-ghost" data-back>Zurück</button><button type="button" class="ed-btn ed-primary" data-ok>Übernehmen</button></div>`;
  };
  draw();
  body.addEventListener('input', (e) => {
    const el = e.target as HTMLInputElement;
    const i = el.closest<HTMLElement>('[data-i]')?.dataset.i;
    if (i != null && el.dataset.l) rowsC[+i].label[el.dataset.l as Lang] = el.value;
  });
  body.addEventListener('click', async (e) => {
    const b = (e.target as Element).closest<HTMLButtonElement>('button');
    if (!b) return;
    const i = Number(b.closest<HTMLElement>('[data-i]')?.dataset.i);
    if (b.matches('[data-up]') && i > 0) [rowsC[i - 1], rowsC[i]] = [rowsC[i], rowsC[i - 1]];
    else if (b.matches('[data-down]') && i < rowsC.length - 1) [rowsC[i + 1], rowsC[i]] = [rowsC[i], rowsC[i + 1]];
    else if (b.matches('[data-rm]')) rowsC.splice(i, 1);
    else if (b.matches('[data-add]')) rowsC.push({ id: '', label: {} });
    else if (b.matches('[data-back]')) return fleetSheet(ctx);
    else if (b.matches('[data-tr]')) {
      b.disabled = true;
      try {
        for (const r of rowsC) {
          const res = await fillLanguages(r.label, ctx.lang);
          Object.assign(r.label, res);
        }
        toast('Übersetzt – bitte kurz prüfen');
      } catch (x) {
        toast(`Übersetzung nicht möglich: ${(x as Error).message}`, 4500);
      }
    } else if (b.matches('[data-ok]')) {
      // Kennung neuer Einträge aus der Beschriftung; Beschriftung nur speichern, wo sie vom Standardtext abweicht
      const taken = new Set(rowsC.map((r) => r.id).filter(Boolean));
      const items: CargoItem[] = rowsC
        .filter((r) => r.id || Object.values(r.label).some((v) => v?.trim()))
        .map((r) => {
          let id = r.id;
          if (!id) {
            const base = slugify(r.label[ctx.lang] || Object.values(r.label).find((v) => v?.trim()) || 'ladung').slice(0, 30);
            id = base;
            for (let n = 2; taken.has(id); n++) id = `${base}-${n}`;
            taken.add(id);
          }
          const label = Object.fromEntries(LANGS.filter((l) => r.label[l]?.trim() && r.label[l]!.trim() !== defaults(l)[id]).map((l) => [l, r.label[l]!.trim()]));
          return Object.keys(label).length ? { id, label } : { id };
        });
      try {
        cargoErrors(items);
      } catch (x) {
        const err = $('[data-err]', body)!;
        err.hidden = false;
        err.textContent = x instanceof ContentError ? x.message : String(x);
        return;
      }
      const same = JSON.stringify(items) === JSON.stringify(CARGO_ITEMS);
      ctx.change(() => {
        const st = ctx.state();
        if (same) delete st.cargo;
        else st.cargo = items;
      });
      toast('Übernommen – bitte speichern');
      return fleetSheet(ctx);
    } else return;
    draw();
  });
}
/* ================================================================ Vorschau auf der Seite */
let previewed = false;

/** Finder, Tabelle und Kategorieseiten mit den Änderungen neu zeichnen (React erst bei Bedarf laden) */
export async function renderFleet(ctx: FleetCtx) {
  const edits = Object.keys(ctx.state().fleet ?? {}).length > 0 || !!ctx.state().cargo;
  if (!edits && !previewed) return;
  const cards = $$('.static-result[data-fleet]');
  const finder = !!document.querySelector('astro-island[component-url*="Finder"], .ed-finder, table.fleet-table');
  if (!cards.length && !finder) return;
  let base: Base;
  try { base = await loadBase(); } catch { return; }
  previewed = true;

  // Kategorieseiten: gelöschte und ausgeblendete Fahrzeuge weg, Namen und Fotos aktuell
  const shown = new Map(rows(base, ctx.state()).filter((r) => r.status !== 'deleted' && !hiddenReason(r.data as FleetSource, base.showSamples)).map((r) => [r.id, r]));
  for (const li of cards) {
    const r = shown.get(li.dataset.fleet!);
    li.hidden = !r;
    if (!r) continue;
    const name = toFleetItem(r.id, r.data as FleetSource, ctx.lang).name;
    const h3 = $('h3', li);
    if (h3 && h3.textContent !== name) h3.textContent = name;
    const img = $<HTMLImageElement>('img', li);
    if (img && isUpload(r.data.photo)) {
      for (const so of $$<HTMLSourceElement>('source', li)) so.srcset = '';
      img.src = ctx.storage.imageUrl(r.data.photo!);
    }
  }

  if (!finder) return;
  try {
    (await import('./fleet-preview')).preview(ctx, base);
  } catch {
    /* Vorschau nicht möglich: Änderungen erscheinen nach dem Speichern */
  }
}
