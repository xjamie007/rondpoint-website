/* =========================================================================
 *  Admin-Bereich: Bearbeiten direkt auf der Seite (nur nach Login sichtbar).
 *  Wird nur geladen, wenn jemand auf „Login" tippt oder dieser Browser
 *  gespeicherte Änderungen hat (src/edit/boot.ts). Speichern und Login: storage.ts.
 *
 *  Wie die Seite bearbeitbar wird: Jeder sichtbare Text wird seinem Schlüssel in
 *  src/i18n/<sprache>.ts zugeordnet (match.ts), jedes Foto seinem Foto-Platz
 *  (data-eimg aus Photo.astro). Änderungen liegen als Schlüssel → Text vor und werden
 *  auf die fertige Seite angewendet; ohne Änderungen bleibt sie genau wie gebaut.
 * ========================================================================= */
import { escapeHtml, useT } from '@/i18n';
import { HTML_LANG, type Lang } from '@/i18n/config';
import { hoursInline } from '@/lib/content';
import { buildIndex, capture, displayText, flatten, getPath, isRich, listOf, norm, renderHtml, setPath, type Caps } from './match';
import { emptyState, siteStorage as S, type EditState, type ListOverride } from './storage';
import { $, $$, closeSheet, confirmBox, pickers, prepareImage, sheet, toast } from './ui';
import { baseWeek, hoursSheet, hoursText, hoursVar, renderHours, weekOf, type HoursCtx } from './hours';
import { cargoSheet, fleetEdit, fleetSheet, loadBase, renderFleet, type FleetCtx } from './fleet';
import { countChanges, reviewSheet } from './review';
import { changedFleet, diffForPublish } from './diff';
import { CARGO_ITEMS } from '@/lib/cargo';
import { autoOn, canTranslate, queueTranslate, setAuto } from './translate';
import hiddenPhotos from '@/content/photos.json';
import css from './editor.css?inline';

// erst mit dem Editor laden, nicht auf jeder Seite für alle Besucher
document.head.append(Object.assign(document.createElement('style'), { textContent: css }));

const lang = ((Object.keys(HTML_LANG) as Lang[]).find((l) => HTML_LANG[l] === document.documentElement.lang) ?? 'fr') as Lang;
const nested = useT(lang);
const dict = flatten(nested);

let state: EditState = emptyState();
/** Supabase: zuletzt veröffentlichter Stand dieses Browsers (Vergleich für das nächste Speichern) */
let lastSaved: EditState = emptyState();
let admin = false;
let busy = false;
let undo: string[] = [];
let sel: { path: string; j: number } | null = null;
let bar: HTMLElement | null = null;
let ctxBar: HTMLElement | null = null;

const clone = <T>(o: T): T => JSON.parse(JSON.stringify(o));
const DRAFT = 'rp-draft';
const draft = {
  get: (): EditState | null => { try { return JSON.parse(sessionStorage.getItem(DRAFT) ?? 'null'); } catch { return null; } },
  set: (s: EditState | null) => { try { s ? sessionStorage.setItem(DRAFT, JSON.stringify(s)) : sessionStorage.removeItem(DRAFT); } catch { /* nur diese Seite */ } },
};
const dirty = () => !!draft.get();
// Öffnungszeiten und Anhänger (hours.ts, fleet.ts) arbeiten auf demselben Stand
const hctx: HoursCtx = { t: nested, lang, state: () => state, change: (fn) => change(fn) };
const fctx: FleetCtx = { ...hctx, storage: S, lastSaved: () => lastSaved };
/** in diesem Schritt geänderte Texte: danach automatisch in die anderen Sprachen übersetzen */
let changedTexts: [string, string][] = [];
const openReview = () => {
  commitEditing();
  void reviewSheet({
    lang, state: () => state, lastSaved: () => lastSaved, change: (fn) => change(fn), storage: S, save,
    openHours: () => hoursSheet(hctx), openFleet: (id) => (id ? fleetEdit(fctx, id) : fleetSheet(fctx)), openCargo: () => void cargoSheet(fctx, openReview),
  });
};
let hoursShown = false;

/* ------------------------------------------------------------ Seite zuordnen (einmal, am Original) */
const orig = new Map<string, string>(); // Schlüssel → Original-HTML
const origAttr = new Map<string, string>();
const caps = new Map<string, Caps>();
interface ListInfo { marker: Comment; items: Map<number, Element> }
const lists = new Map<string, ListInfo>();
const touched = new Set<string>();
let seo: { title?: string; desc?: string; origTitle: string; origDesc: string } = { origTitle: '', origDesc: '' };

const SKIP = 'script, style, noscript, template, svg, select, astro-island, .ed-ui, [data-hours], [data-fleet]';

function mapPage() {
  const index = buildIndex(dict);
  // Texte, die nur aus den Öffnungszeiten bestehen ({hours}), ändern sich mit der Tabelle
  const plainHours = norm(hoursText(hctx, true));
  for (const el of $$('main p, main dd, main li')) if (!el.closest(SKIP) && norm(el.textContent ?? '') === plainHours) el.dataset.hours = 'text';
  for (const el of $$('body *')) {
    if (el.closest(SKIP) || el.closest('[data-eok]')) continue;
    if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent!.trim())) continue;
    const keys = index.find(el.textContent ?? '');
    if (!keys.length) continue;
    const key = keys[0];
    if (isRich(dict[key])) {
      const c = capture(dict[key], el.innerHTML);
      if (!c) continue; // ponytail: Text mit Platzhaltern, der anders gebaut ist als erwartet → bleibt unbearbeitbar
      caps.set(key, c);
    }
    el.dataset.eok = key;
    if (keys.length > 1) el.dataset.ekeys = keys.join(' ');
    if (!orig.has(key)) orig.set(key, el.innerHTML);
  }
  for (const el of $$<HTMLImageElement | HTMLInputElement>('img[alt], input[placeholder], textarea[placeholder]')) {
    if (el.closest(SKIP)) continue;
    const attr = el.tagName === 'IMG' ? 'alt' : 'placeholder';
    const key = index.find(el.getAttribute(attr) ?? '')[0];
    if (!key) continue;
    el.dataset.eka = key;
    if (!origAttr.has(key)) origAttr.set(key, el.getAttribute(attr)!);
  }
  // auch Beschreibungen mit Platzhaltern wie {hours} (Kontaktseite)
  const seoKey = (text: string) => Object.keys(dict).find((k) => k.startsWith('seo.') && displayText(dict[k]) === norm(text)) ?? index.find(text).find((k) => k.startsWith('seo.'));
  const desc = $<HTMLMetaElement>('meta[name=description]')?.content ?? '';
  seo = { title: seoKey(document.title), desc: seoKey(desc), origTitle: document.title, origDesc: desc };
  mapLists();
}

/** Listen (Aufzählungen, Ablauf-Schritte, Absätze): Einträge lassen sich verschieben, kopieren, löschen. */
function mapLists() {
  const groups = new Map<string, Map<number, Element[]>>();
  for (const el of $$('[data-eok], [data-eka]')) {
    const key = el.dataset.eok ?? el.dataset.eka!;
    const l = listOf(key);
    if (!l || !Array.isArray(getPath(nested, l.path))) continue;
    const g = groups.get(l.path) ?? new Map<number, Element[]>();
    g.set(l.index, [...(g.get(l.index) ?? []), el]);
    groups.set(l.path, g);
  }
  const roots = new Map<string, Map<number, Element>>();
  for (const [path, byIdx] of groups) {
    const els = [...byIdx.values()].flat();
    const parent = byIdx.size > 1 ? lca(els) : els[0].closest('li')?.parentElement;
    if (!parent || parent.matches('body, main, header, footer')) continue;
    const r = new Map<number, Element>();
    let ok = true;
    for (const [i, es] of byIdx) {
      const root = childOf(parent, es[0]);
      if (!root || es.some((e) => !root.contains(e)) || [...r.values()].includes(root)) { ok = false; break; }
      r.set(i, root);
    }
    if (ok) roots.set(path, r);
  }
  // ponytail: Listen in Listen-Einträgen bleiben fest, nur die äußere ist verschiebbar
  const all = [...roots.values()].flatMap((r) => [...r.values()]);
  for (const [path, r] of roots) {
    if ([...r.values()].some((el) => all.some((o) => o !== el && o.contains(el)))) continue;
    const first = [...r.values()].sort((a, b) => (a.compareDocumentPosition(b) & 4 ? -1 : 1))[0];
    const marker = document.createComment(`ed:${path}`);
    first.before(marker);
    for (const [i, el] of r) { el.setAttribute('data-eli', path); el.setAttribute('data-eix', String(i)); }
    lists.set(path, { marker, items: new Map([...r].map(([i, el]) => [i, el.cloneNode(true) as Element])) });
  }
}
function lca(els: Element[]): Element | null {
  let a: Element | null = els[0].parentElement;
  while (a && !els.every((e) => a!.contains(e))) a = a.parentElement;
  return a;
}
function childOf(parent: Element, el: Element): Element | null {
  let e: Element | null = el;
  while (e && e.parentElement !== parent) e = e.parentElement;
  return e;
}

/* ------------------------------------------------------------ Änderungen auf die Seite anwenden */
/** Eintrag-Index und Restschlüssel, wenn el in einer geänderten Liste steht */
function inList(el: Element, key: string) {
  const root = el.closest<HTMLElement>('[data-eli]');
  const path = root?.dataset.eli;
  const ov = path ? state.lists[lang]?.[path] : undefined;
  if (!root || !ov || !key.startsWith(`${path}.`)) return null;
  const rest = key.slice(path!.length + 1).split('.').slice(1).join('.');
  return { ov, j: +root.dataset.eix!, rest };
}
function current(el: Element, key: string): string | null {
  const l = inList(el, key);
  if (l) {
    const v = l.rest ? getPath(l.ov.value[l.j], l.rest) : l.ov.value[l.j];
    return typeof v === 'string' && norm(v) !== norm(dict[key]) ? v : null;
  }
  return state.texts[lang]?.[key] ?? null;
}

function render() {
  const L = state.lists[lang] ?? {};
  for (const [path, info] of lists) {
    const ov = L[path];
    if (!ov && !touched.has(path)) continue;
    touched.add(path);
    const from = ov ? ov.from : [...info.items.keys()].sort((a, b) => a - b);
    $$(`[data-eli="${CSS.escape(path)}"]`).forEach((e) => e.remove());
    let at: ChildNode = info.marker;
    from.forEach((src, j) => {
      const tpl = info.items.get(src);
      if (!tpl) return; // im Original nicht sichtbar (z. B. noch unbestätigt)
      const el = tpl.cloneNode(true) as HTMLElement;
      el.dataset.eix = String(j);
      at.after(el);
      at = el;
    });
  }
  for (const el of $$('[data-eok]')) {
    if (el === document.activeElement) continue;
    const key = el.dataset.eok!;
    const v = current(el, key);
    const c = caps.get(key);
    // {hours} in einem Text: geänderte Öffnungszeiten gleich mit anzeigen
    const hc = c && 'hours' in c.vars && state.hours ? { ...c, vars: { ...c.vars, hours: hoursVar(hctx) } } : null;
    if (v === null && !hc) { if (el.innerHTML !== orig.get(key)) el.innerHTML = orig.get(key)!; }
    else if (c) el.innerHTML = renderHtml(v ?? dict[key], hc ?? c);
    else if (el.textContent !== v) el.textContent = v;
  }
  for (const el of $$('[data-eka]')) {
    const key = el.dataset.eka!;
    el.setAttribute(el.tagName === 'IMG' ? 'alt' : 'placeholder', current(el, key) ?? origAttr.get(key)!);
  }
  for (const fig of $$('[data-eimg]')) {
    const p = state.photos[fig.dataset.eimg!];
    const img = $<HTMLImageElement>('img', fig);
    fig.hidden = !admin && !!p?.hidden;
    fig.classList.toggle('ed-hidden', admin && !!p?.hidden);
    if (!img) continue;
    for (const s of $$<HTMLSourceElement | HTMLImageElement>('source, img', fig)) {
      s.dataset.edSrcset ??= s.getAttribute('srcset') ?? '';
      if (p?.src) s.setAttribute('srcset', '');
      else if (s.dataset.edSrcset) s.setAttribute('srcset', s.dataset.edSrcset);
    }
    img.dataset.edSrc ??= img.getAttribute('src') ?? '';
    const src = p?.src ? S.imageUrl(p.src) : img.dataset.edSrc;
    if (img.getAttribute('src') !== src) img.setAttribute('src', src);
  }
  if (state.hours || hoursShown) { renderHours(hctx); hoursShown = true; }
  void renderFleet(fctx);
  const fill = (v: string) => v.replace(/\{hours\}/g, hoursInline(nested, lang, weekOf(state)));
  document.title = fill((seo.title && state.texts[lang]?.[seo.title]) || seo.origTitle);
  $<HTMLMetaElement>('meta[name=description]')?.setAttribute('content', fill((seo.desc && state.texts[lang]?.[seo.desc]) || seo.origDesc));
  if (admin) prepare();
}

/* ------------------------------------------------------------ Admin: öffentlicher Teil (Login im Footer) */
function loginLabel() {
  for (const a of $$('[data-ed-login]')) a.textContent = admin ? 'Abmelden' : 'Login';
}
function loginDialog(note = '') {
  const w = sheet('Anmelden', `<form class="ed-form" autocomplete="on">${note ? `<p class="ed-hint">${escapeHtml(note)}</p>` : ''}
    <label>${S.userLabel}<input name="u" ${S.live ? 'type="email" ' : ''}autocomplete="username" autocapitalize="none" required></label>
    <label>Passwort<input name="p" type="password" autocomplete="current-password" required></label>
    <p class="ed-err" hidden>${S.userLabel} oder Passwort stimmt nicht.</p>
    <button class="ed-btn ed-primary ed-block" type="submit">Anmelden</button></form>`);
  $('form', w)!.addEventListener('submit', async (e) => {
    e.preventDefault();
    const f = e.target as HTMLFormElement & { u: HTMLInputElement; p: HTMLInputElement };
    const err = $('.ed-err', w)!;
    let ok = false;
    try {
      ok = await S.login(f.u.value, f.p.value);
      err.textContent = `${S.userLabel} oder Passwort stimmt nicht.`;
    } catch (x) {
      err.textContent = (x as Error).message;
    }
    if (!ok) {
      err.hidden = false;
      f.p.value = '';
      f.p.focus();
      return;
    }
    closeSheet();
    startAdmin();
    toast('Angemeldet – tippen Sie auf einen Text oder ein Bild, um es zu ändern.', 4200);
  });
}
async function logout() {
  if (dirty() && !(await confirmBox('Abmelden', 'Es gibt ungespeicherte Änderungen. Ohne Speichern abmelden?', 'Ohne Speichern abmelden', true))) return;
  await S.logout();
  draft.set(null);
  location.reload();
}

/* ------------------------------------------------------------ Admin-Modus */
function startAdmin() {
  admin = true;
  document.documentElement.classList.add('ed-on');
  state = draft.get() ?? state;
  for (const d of $$<HTMLDetailsElement>('main details')) d.open = true;
  buildBar();
  loginLabel();
  render();
  watchPublish();
}

/* ------------------------------------------------------------ Veröffentlichung verfolgen */
let pubTimer: ReturnType<typeof setTimeout> | undefined;
let pubEl: HTMLElement | null = null;
/** Nach dem Speichern: Hinweis „Wird veröffentlicht …“, bis die neu gebaute Seite online ist */
function watchPublish() {
  clearTimeout(pubTimer);
  const at = S.pendingAt();
  if (!S.live || !admin || at == null) return;
  if (!pubEl) {
    pubEl = document.createElement('div');
    pubEl.className = 'ed-pub ed-ui';
    pubEl.setAttribute('role', 'status');
    document.body.append(pubEl);
  }
  const show = (html: string, ok = false) => {
    pubEl!.innerHTML = `<span>${html}</span><button type="button" aria-label="Hinweis schließen">✕</button>`;
    pubEl!.classList.toggle('ed-pub-ok', ok);
    $('button', pubEl!)!.onclick = () => { clearTimeout(pubTimer); pubEl?.remove(); pubEl = null; };
  };
  const min = Math.round((Date.now() - at) / 60_000);
  // Veröffentlichung hängt? (Build auf Cloudflare fehlgeschlagen)
  if (min > 20) show(`Die letzte Speicherung (vor ${min} Minuten) ist noch nicht online. Bitte Nave Bescheid geben – die Veröffentlichung ist wohl hängen geblieben.`);
  else show('<i class="ed-busy" aria-hidden="true"></i>Wird veröffentlicht … meist 1–3 Minuten. Hier sehen Sie den neuen Stand schon, Besucher gleich danach.');
  const check = async () => {
    try {
      const html = await (await fetch(location.pathname, { cache: 'no-store' })).text();
      const built = Date.parse(html.match(/<meta[^>]+name="rp-build"[^>]+content="([^"]+)"/)?.[1] ?? '');
      if (built >= at) {
        show('✓ Veröffentlicht – jetzt für alle Besucher sichtbar.', true);
        pubTimer = setTimeout(() => { pubEl?.remove(); pubEl = null; }, 9000);
        return;
      }
    } catch { /* offline: später erneut */ }
    pubTimer = setTimeout(check, 20_000);
  };
  pubTimer = setTimeout(check, min > 20 ? 60_000 : 15_000);
}

function buildBar() {
  bar?.remove();
  ctxBar?.remove();
  bar = document.createElement('div');
  bar.className = 'ed-bar ed-ui';
  bar.innerHTML = `<button class="ed-b ed-save" data-a="save" disabled><span class="ed-i">✓</span><span>Speichern</span></button>
    <button class="ed-b" data-a="undo" disabled><span class="ed-i">↶</span><span>Rückgängig</span></button>
    <button class="ed-b" data-a="pages"><span class="ed-i">☰</span><span>Seiten</span></button>
    <button class="ed-b" data-a="fleet"><span class="ed-i">🛻</span><span>Anhänger</span></button>
    <button class="ed-b" data-a="hours"><span class="ed-i">🕒</span><span>Zeiten</span></button>
    <button class="ed-b" data-a="more"><span class="ed-i">⋯</span><span>Mehr</span></button>`;
  document.body.append(bar);
  bar.addEventListener('click', (e) => {
    const b = (e.target as Element).closest('button');
    if (b) ({ save: openReview, undo: doUndo, pages: pagesSheet, fleet: () => { commitEditing(); fleetSheet(fctx); }, hours: () => { commitEditing(); hoursSheet(hctx); }, more: moreSheet })[b.dataset.a as 'save']();
  });
  ctxBar = document.createElement('div');
  ctxBar.className = 'ed-ctx ed-ui';
  ctxBar.hidden = true;
  document.body.append(ctxBar);
  ctxBar.addEventListener('mousedown', (e) => { if ((e.target as Element).closest('button')) e.preventDefault(); });
  updateBar();
}
function updateBar() {
  if (!bar) return;
  const s = $<HTMLButtonElement>('[data-a=save]', bar)!;
  s.disabled = !dirty() || busy;
  s.classList.toggle('ed-dirty', dirty());
  const n = dirty() ? countChanges(state, lastSaved) : 0;
  $('span:last-child', s)!.textContent = busy ? 'Speichert…' : dirty() ? (n ? `Speichern (${n})` : 'Speichern') : 'Gespeichert';
  $<HTMLButtonElement>('[data-a=undo]', bar)!.disabled = !undo.length;
}
/** Jede Änderung: Stand für „Rückgängig" merken, ändern, als Entwurf behalten (auch beim Seitenwechsel), anzeigen */
function change(fn: () => void | false, show = true) {
  const before = JSON.stringify(state);
  changedTexts = [];
  if (fn() === false) return;
  undo.push(before);
  if (undo.length > 60) undo.shift();
  draft.set(state);
  updateBar();
  if (show) render();
  // derselbe Text an mehreren Stellen: einmal übersetzen
  const byText = new Map<string, string[]>();
  for (const [k, v] of changedTexts) byText.set(v, [...(byText.get(v) ?? []), k]);
  for (const [v, keys] of byText) queueTranslate({ state: () => state, change: (f) => change(f) }, keys, v, lang);
  changedTexts = [];
}
function doUndo() {
  const prev = undo.pop();
  if (!prev) return;
  state = JSON.parse(prev);
  draft.set(state);
  updateBar();
  render();
  toast('Letzte Änderung rückgängig gemacht');
}
async function save() {
  if (busy) return;
  commitEditing();
  busy = true;
  updateBar();
  // Stand beim Tippen auf „Speichern“: was währenddessen geändert wird, bleibt ungespeichert
  const snap: EditState = clone(state);
  const snapJson = JSON.stringify(snap);
  try {
    if (S.live) {
      await S.saveContent(snap, await publishPayload(snap, lastSaved));
      lastSaved = snap;
      undo = []; // Gespeichertes ist veröffentlicht: Rückgängig gilt ab hier
    } else {
      await S.saveContent(snap);
      lastSaved = snap;
    }
    draft.set(JSON.stringify(state) === snapJson ? null : state);
    toast(S.live ? 'Gespeichert ✓ – in wenigen Minuten für alle Besucher sichtbar.' : 'Gespeichert ✓ (Demo: in diesem Browser gespeichert)', 4200);
    watchPublish();
  } catch (e) {
    const err = e as Error;
    if (err.name === 'AuthError') {
      loginDialog('Bitte erneut anmelden – Ihre Änderungen bleiben erhalten. Danach noch einmal speichern.');
    } else toast(`Speichern hat nicht geklappt. ${S.live ? err.message : 'Bitte erneut versuchen.'}`, 7000);
  }
  busy = false;
  updateBar();
}

/**
 * Supabase: nur senden, was sich seit dem letzten Speichern geändert hat (alte Werte nicht erneut
 * schreiben). Zurückgenommenes ausdrücklich mit dem Stand der Seite senden – sonst bliebe die schon
 * veröffentlichte Änderung im Repository.
 */
async function publishPayload(cur: EditState, prev: EditState): Promise<EditState> {
  const flat = new Map<Lang, Record<string, string>>();
  // Anhänger, wie gebaut: nur laden, wenn einer zurückgenommen wurde
  const fb = cur.fleet ?? {};
  const base = changedFleet(cur, prev).some((id) => !(id in fb)) ? await loadBase() : null;
  return diffForPublish(cur, prev, {
    texts: (l) => flat.get(l) ?? (flat.set(l, flatten(useT(l))), flat.get(l)!),
    list: (l, p) => getPath(useT(l), p),
    week: baseWeek,
    cargo: CARGO_ITEMS,
    fleet: (id) => base?.entries.find((e) => e.id === id)?.data,
  });
}

/* ------------------------------------------------------------ Seite zum Bearbeiten vorbereiten */
function prepare() {
  for (const el of $$('[data-eok]')) {
    if (caps.has(el.dataset.eok!)) { el.classList.add('ed-rich'); continue; }
    if (el.isContentEditable) continue;
    try { el.contentEditable = 'plaintext-only'; } catch { el.contentEditable = 'true'; }
    el.spellcheck = true;
    el.classList.add('ed-text');
  }
  for (const el of $$('[data-hours=table], [data-hours=sum]')) el.classList.add('ed-data');
  for (const el of $$('[data-fleet], .ed-finder .result')) el.classList.add('ed-data');
  for (const el of $$('[data-eimg]')) {
    if (el.closest('[data-fleet]')) continue; // Fotos der Anhänger: im Fenster „Anhänger“
    el.classList.add('ed-img');
    if (!$('.ed-chip', el)) el.insertAdjacentHTML('beforeend', '<span class="ed-chip" aria-hidden="true">🖼 Bild ändern</span>');
  }
  for (const el of $$<HTMLInputElement>('input[data-eka], textarea[data-eka]')) { el.readOnly = true; el.classList.add('ed-attr'); }
  reselect();
}

document.addEventListener('click', (e) => {
  if (!admin) return;
  const t = e.target as Element;
  if (t.closest('.ed-ui, [data-ed-login]')) return;
  if (t.closest('a[href], summary')) e.preventDefault();
  if (t.closest('[data-hours=table], [data-hours=sum]')) { e.preventDefault(); commitEditing(); hoursSheet(hctx); return; }
  if (t.closest('[data-cargo-q]')) { e.preventDefault(); commitEditing(); void cargoSheet(fctx, closeSheet); return; }
  const card = t.closest<HTMLElement>('[data-fleet]');
  if (card) { e.preventDefault(); commitEditing(); fleetEdit(fctx, card.dataset.fleet!); return; }
  const fig = t.closest<HTMLElement>('[data-eimg]');
  if (fig && !t.closest('.ed-text')) { e.preventDefault(); select(t); imageSheet(fig); return; }
  const attr = t.closest<HTMLInputElement>('.ed-attr');
  if (attr) { e.preventDefault(); attrSheet(attr); return; }
  const rich = t.closest<HTMLElement>('.ed-rich');
  if (rich) { e.preventDefault(); select(t); richSheet(rich); return; }
  select(t);
}, true);
document.addEventListener('submit', (e) => { if (admin) e.preventDefault(); }, true);
document.addEventListener('focusin', (e) => {
  const t = admin && (e.target as Element).closest?.('.ed-text');
  if (t) showCtx();
});
document.addEventListener('focusout', (e) => {
  const t = admin && (e.target as Element).closest?.<HTMLElement>('.ed-text');
  if (t) commitText(t);
});
document.addEventListener('keydown', (e) => {
  if (!admin) return;
  const t = (e.target as Element).closest?.<HTMLElement>('.ed-text');
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') { e.preventDefault(); if (t) commitText(t); openReview(); return; }
  if (t && e.key === 'Enter') { e.preventDefault(); t.blur(); }
  if (t && e.key === ' ') e.stopPropagation(); // Leertaste in Buttons und Fragen nicht als Klick
});
document.addEventListener('paste', (e) => {
  if (!admin || !(e.target as Element).closest?.('.ed-text')) return;
  e.preventDefault();
  document.execCommand('insertText', false, e.clipboardData?.getData('text/plain').replace(/\s+/g, ' ') ?? '');
});

function setText(el: HTMLElement, key: string, v: string) {
  const l = inList(el, key);
  if (l) { if (l.rest) setPath(l.ov.value[l.j], l.rest, v); else l.ov.value[l.j] = v; return; }
  const t = (state.texts[lang] ??= {});
  for (const k of (el.dataset.ekeys ?? key).split(' ')) {
    if (norm(v) === norm(dict[k])) delete t[k];
    else t[k] = v;
    // von Hand geändert: keine automatische Übersetzung mehr in dieser Sprache
    if (state.auto?.length) state.auto = state.auto.filter((x) => x !== `${lang}:${k}`);
    changedTexts.push([k, v]);
  }
}
function commitText(el: HTMLElement) {
  const key = el.dataset.eok;
  if (!key || !el.isConnected) return; // beim Neuaufbau einer Liste entfernt: zählt nicht
  const v = norm(el.textContent ?? '');
  if (!v) { render(); toast('Ein Text kann nicht ganz leer sein – zum Entfernen den Eintrag löschen.', 4000); return; }
  // unverändert: auch wenn im Grundtext ein ausgeblendeter Hinweis [FEHLT …] steht
  const cur = current(el, key);
  if (cur != null ? v === norm(cur) : v === norm(dict[key]) || v === displayText(dict[key])) return;
  change(() => setText(el, key, v), false);
  // derselbe Text an anderer Stelle (Menü oben und im Handy-Menü)
  for (const o of $$(`[data-eok="${CSS.escape(key)}"]`)) if (o !== el && !inList(o, key)) o.textContent = v;
}
function commitEditing() {
  const a = document.activeElement as HTMLElement | null;
  if (a?.classList.contains('ed-text')) commitText(a);
}

/* ------------------------------------------------------------ Auswahl + Leiste für Listen-Einträge */
function select(target: Element) {
  const root = target.closest<HTMLElement>('[data-eli]');
  sel = root ? { path: root.dataset.eli!, j: +root.dataset.eix! } : null;
  reselect();
}
function reselect() {
  $$('.ed-sel').forEach((e) => e.classList.remove('ed-sel'));
  const el = sel && $(`[data-eli="${CSS.escape(sel.path)}"][data-eix="${sel.j}"]`);
  if (sel && !el) sel = null;
  el?.classList.add('ed-sel');
  showCtx();
}
function showCtx() {
  if (!ctxBar) return;
  ctxBar.innerHTML = sel
    ? `<div class="ed-grp"><span class="ed-lbl">Eintrag</span><button data-c="up" aria-label="Nach oben">↑</button><button data-c="down" aria-label="Nach unten">↓</button>
       <button data-c="dup">⧉ Kopieren</button><button data-c="del" class="ed-red">Löschen</button><button data-c="x" aria-label="Auswahl aufheben">✕</button></div>`
    : '';
  ctxBar.hidden = !sel;
  document.documentElement.classList.toggle('ed-ctx-on', !!sel);
  for (const b of $$('button', ctxBar)) b.onclick = () => ctxAction(b.dataset.c!);
}

/** Erste Änderung an einer Liste: Liste mit allen bisherigen Textänderungen als Ganzes übernehmen */
function touchList(path: string): ListOverride {
  const L = (state.lists[lang] ??= {});
  if (L[path]) return L[path];
  const value = clone(getPath(nested, path) as unknown[]);
  const t = state.texts[lang] ?? {};
  for (const k of Object.keys(t)) {
    if (!k.startsWith(`${path}.`)) continue;
    const [i, ...rest] = k.slice(path.length + 1).split('.');
    if (rest.length) setPath(value[+i], rest.join('.'), t[k]);
    else value[+i] = t[k];
    delete t[k];
  }
  return (L[path] = { value, from: value.map((_, i) => i) });
}
function ctxAction(c: string) {
  if (c === 'x') { sel = null; reselect(); return; }
  if (!sel) return;
  commitEditing();
  (document.activeElement as HTMLElement | null)?.blur();
  const { path, j } = sel;
  const info = lists.get(path)!;
  if (c === 'up' || c === 'down') {
    const d = c === 'up' ? -1 : 1;
    let k = -1;
    change(() => {
      const ov = touchList(path);
      k = j + d;
      while (k >= 0 && k < ov.from.length && !info.items.has(ov.from[k])) k += d;
      if (k < 0 || k >= ov.from.length) { toast(d < 0 ? 'Steht schon ganz oben' : 'Steht schon ganz unten'); return false; }
      [ov.value[j], ov.value[k]] = [ov.value[k], ov.value[j]];
      [ov.from[j], ov.from[k]] = [ov.from[k], ov.from[j]];
    });
    if (k >= 0 && sel) { sel.j = k; reselect(); }
  }
  if (c === 'dup') {
    change(() => {
      const ov = touchList(path);
      ov.value.splice(j + 1, 0, clone(ov.value[j]));
      ov.from.splice(j + 1, 0, ov.from[j]);
    });
    sel = { path, j: j + 1 };
    reselect();
    toast('Kopie eingefügt – jetzt anpassen');
  }
  if (c === 'del') {
    const shown = (state.lists[lang]?.[path]?.from ?? [...info.items.keys()]).filter((i) => info.items.has(i)).length;
    if (shown <= 1) { toast('Der letzte Eintrag hier kann nicht gelöscht werden – ändern Sie stattdessen den Text.', 4000); return; }
    confirmBox('Eintrag löschen', 'Soll dieser Eintrag wirklich gelöscht werden? (Mit „Rückgängig" holen Sie ihn zurück.)', 'Löschen', true).then((ok) => {
      if (!ok) return;
      sel = null;
      change(() => {
        const ov = touchList(path);
        ov.value.splice(j, 1);
        ov.from.splice(j, 1);
      });
    });
  }
}

/* ------------------------------------------------------------ Texte mit Platzhaltern oder Links, Hinweistexte in Feldern */
function richSheet(el: HTMLElement) {
  const key = el.dataset.eok!;
  const v = current(el, key) ?? dict[key];
  const w = sheet('Text ändern', `<div class="ed-form"><label>Text<textarea name="v" rows="6">${escapeHtml(v.replace(/­/g, ''))}</textarea></label>
    <p class="ed-hint">Teile in <b>{geschweiften Klammern}</b> setzt die Website selbst ein (z. B. Telefonnummer, Adresse). <b>[Wort](…)</b> ist ein Link: nur das Wort in den eckigen Klammern ändern.</p>
    <div class="ed-row"><button class="ed-btn ed-ghost" data-a="orig">Original</button><button class="ed-btn ed-primary" data-a="ok">Übernehmen</button></div></div>`);
  $('[data-a=orig]', w)!.onclick = () => { $<HTMLTextAreaElement>('[name=v]', w)!.value = dict[key].replace(/­/g, ''); };
  $('[data-a=ok]', w)!.onclick = () => {
    const nv = $<HTMLTextAreaElement>('[name=v]', w)!.value.trim();
    // Platzhalter müssen erhalten bleiben (sonst fehlt z. B. die Telefonnummer, und die Prüfung beim Veröffentlichen schlägt an)
    const vars = (x: string) => [...x.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join();
    const links = (x: string) => [...x.matchAll(/\]\(([^)\s]+)\)/g)].map((m) => m[1]).sort().join();
    if (nv && links(nv) !== links(dict[key])) {
      toast('Bitte bei Links nur das Wort in [eckigen Klammern] ändern, nicht das Ziel in (runden Klammern).', 5000);
      return;
    }
    if (nv && vars(nv) !== vars(dict[key])) {
      const need = [...new Set(dict[key].match(/\{\w+\}/g) ?? [])].join(' ');
      toast(need ? `Bitte ${need} genau so im Text lassen – die Website setzt dort die Angaben ein.` : 'Bitte keine Teile in {geschweiften Klammern} einfügen.', 5000);
      return;
    }
    closeSheet();
    if (nv && nv !== v) change(() => setText(el, key, nv));
  };
}
function attrSheet(el: HTMLInputElement) {
  const key = el.dataset.eka!;
  const w = sheet('Hinweistext im Feld', `<div class="ed-form"><label>Text, der im leeren Feld steht<input name="v" value="${escapeHtml(current(el, key) ?? origAttr.get(key)!)}"></label>
    <button class="ed-btn ed-primary ed-block" data-a="ok">Übernehmen</button></div>`);
  $('[data-a=ok]', w)!.onclick = () => {
    const v = $<HTMLInputElement>('[name=v]', w)!.value.trim();
    closeSheet();
    if (v) change(() => setText(el, key, v));
  };
}

/* ------------------------------------------------------------ Bilder */
function imageSheet(fig: HTMLElement) {
  const k = fig.dataset.eimg!;
  const img = $<HTMLImageElement>('img', fig);
  const altKey = img?.dataset.eka;
  const p = () => state.photos[k] ?? {};
  const w = sheet('Bild', `<div class="ed-form"><div class="ed-prev"><img src="${escapeHtml(img?.currentSrc || img?.src || '')}" alt=""></div>${pickers()}
    ${altKey ? `<label>Bildbeschreibung (für Google und Screenreader)<input name="alt" value="${escapeHtml(current(img!, altKey) ?? origAttr.get(altKey)!)}" placeholder="z. B. Werkstatt der Garage am Kreisel"></label>` : ''}
    <p class="ed-hint">Das Bild wird automatisch verkleinert und für schnelles Laden optimiert. Es erscheint überall, wo dieses Foto vorkommt.</p>
    <div class="ed-row">${p().src && !S.live ? '<button class="ed-btn ed-ghost" data-a="orig">Original-Bild</button>' : ''}
    <button class="ed-btn ed-ghost ed-red" data-a="hide">${p().hidden ? 'Wieder anzeigen' : 'Bild ausblenden'}</button>
    <button class="ed-btn ed-primary" data-a="ok">Fertig</button></div></div>`);
  for (const inp of $$<HTMLInputElement>('input[type=file]', w)) {
    inp.onchange = async () => {
      const f = inp.files?.[0];
      if (!f) return;
      $('.ed-sheet', w)!.classList.add('ed-working');
      try {
        const r = await prepareImage(f);
        const path = await S.uploadImage(r.blob, `${k}-${Math.random().toString(36).slice(2, 7)}.${r.ext}`);
        change(() => { state.photos[k] = { src: path }; });
        $<HTMLImageElement>('.ed-prev img', w)!.src = S.imageUrl(path);
        toast('Bild ersetzt');
      } catch (e) {
        toast((e as Error).message === 'format' ? 'Dieses Bildformat wird nicht unterstützt. Bitte ein JPG oder PNG wählen.' : 'Das Bild konnte nicht geladen werden.', 5000);
      }
      $('.ed-sheet', w)?.classList.remove('ed-working');
    };
  }
  const done = () => {
    const alt = $<HTMLInputElement>('[name=alt]', w);
    if (alt && altKey && alt.value.trim() && alt.value.trim() !== (current(img!, altKey) ?? origAttr.get(altKey))) change(() => setText(img!, altKey, alt.value.trim()));
    closeSheet();
  };
  $('[data-a=ok]', w)!.onclick = done;
  $('[data-a=hide]', w)!.onclick = () => { done(); change(() => { if (p().hidden) delete state.photos[k]; else state.photos[k] = { hidden: true }; }); };
  const o = $('[data-a=orig]', w);
  if (o) o.onclick = () => { done(); change(() => { delete state.photos[k]; }); };
}

/* ------------------------------------------------------------ Seiten, Google, Mehr */
function pagesSheet() {
  commitEditing();
  const seen = new Set<string>();
  const links = $$<HTMLAnchorElement>('header a[href], footer a[href]').filter((a) => {
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || a.matches('[data-ed-login], [hreflang]') || u.hash || seen.has(u.pathname)) return false;
    seen.add(u.pathname);
    return !!norm(a.textContent ?? '');
  });
  const label = (a: HTMLAnchorElement) => (a.matches('.logo') ? 'Startseite' : norm(a.textContent!));
  const langs = $$<HTMLLinkElement>('link[rel=alternate][hreflang]').filter((l) => l.hreflang !== 'x-default');
  const w = sheet('Seite öffnen', `<h3 class="ed-h3">Seiten</h3><div class="ed-list">${links.map((a) =>
      `<button class="ed-li${new URL(a.href).pathname === location.pathname ? ' ed-cur' : ''}" data-p="${escapeHtml(a.href)}">${escapeHtml(label(a))}</button>`).join('')}</div>
    <h3 class="ed-h3">Diese Seite in einer anderen Sprache</h3><div class="ed-row ed-langs">${langs.map((l) =>
      `<button class="ed-btn ${l.hreflang.startsWith(document.documentElement.lang) ? 'ed-primary' : 'ed-ghost'}" data-p="${escapeHtml(l.href)}">${escapeHtml(l.hreflang.slice(0, 2).toUpperCase())}</button>`).join('')}</div>
    <p class="ed-hint">Nicht gespeicherte Änderungen bleiben beim Seitenwechsel erhalten.</p>`);
  for (const b of $$('[data-p]', w)) b.onclick = () => { location.href = new URL(b.dataset.p!, location.href).pathname; };
}
function seoSheet() {
  commitEditing();
  const imgs = $$<HTMLImageElement>('main img[data-eka]').filter((im, i, a) => a.findIndex((x) => x.dataset.eka === im.dataset.eka) === i);
  const val = (k?: string, o = '') => (k ? state.texts[lang]?.[k] ?? dict[k] : o);
  const w = sheet('Google & Teilen – diese Seite', `<div class="ed-form">
    <div class="ed-serp"><div class="ed-serp-url">${escapeHtml(location.host + location.pathname)}</div><div class="ed-serp-t"></div><div class="ed-serp-d"></div></div>
    ${seo.title ? `<label>Titel bei Google <small data-c="t"></small><input name="t" value="${escapeHtml(val(seo.title))}"></label>` : '<p class="ed-hint">Titel und Beschreibung dieser Seite entstehen automatisch (z. B. aus den Fahrzeugdaten).</p>'}
    ${seo.desc ? `<label>Beschreibung bei Google <small data-c="d"></small><textarea name="d" rows="3">${escapeHtml(val(seo.desc))}</textarea></label>` : ''}
    <h3 class="ed-h3">Bildbeschreibungen auf dieser Seite</h3><div class="ed-alts">${imgs.map((im, i) =>
      `<div class="ed-alt"><img src="${escapeHtml(im.currentSrc || im.src)}" alt=""><input data-ai="${i}" value="${escapeHtml(im.alt)}" placeholder="Was ist auf dem Bild zu sehen?"></div>`).join('') || '<p class="ed-hint">Keine Bilder mit Beschreibung.</p>'}</div>
    <button class="ed-btn ed-primary ed-block" data-a="ok">Übernehmen</button></div>`, { wide: true });
  const t = $<HTMLInputElement>('[name=t]', w);
  const d = $<HTMLTextAreaElement>('[name=d]', w);
  // {hours} setzt die Website ein: Vorschau und Zeichenzahl mit den echten Öffnungszeiten
  const fill = (v: string) => v.replace(/\{hours\}/g, hoursInline(nested, lang, weekOf(state)));
  const upd = () => {
    const tv = t ? fill(t.value) : document.title;
    const dv = d ? fill(d.value) : seo.origDesc;
    $('.ed-serp-t', w)!.textContent = tv;
    $('.ed-serp-d', w)!.textContent = dv;
    if (t) $('[data-c=t]', w)!.textContent = `${tv.length}/60${tv.length > 60 ? ' – etwas lang' : ''}`;
    if (d) $('[data-c=d]', w)!.textContent = `${dv.length}/160${dv.length > 160 ? ' – etwas lang' : ''}${d.value.includes('{hours}') ? ' · {hours} = Öffnungszeiten, setzt die Website ein' : ''}`;
  };
  if (t) t.oninput = upd;
  if (d) d.oninput = upd;
  upd();
  $('[data-a=ok]', w)!.onclick = () => {
    change(() => {
      const tx = (state.texts[lang] ??= {});
      for (const [k, el] of [[seo.title, t], [seo.desc, d]] as const) {
        if (!k || !el) continue;
        if (el.value.trim() && norm(el.value) !== norm(dict[k])) tx[k] = el.value.trim();
        else delete tx[k];
      }
      for (const inp of $$<HTMLInputElement>('[data-ai]', w)) {
        const im = imgs[+inp.dataset.ai!];
        if (inp.value.trim()) setText(im, im.dataset.eka!, inp.value.trim());
      }
    });
    closeSheet();
    toast('Angaben für Google übernommen – bitte Speichern nicht vergessen');
  };
}
function moreSheet() {
  commitEditing();
  const hidden = Object.entries(hiddenPhotos as Record<string, { hidden?: boolean }>).filter(([k, v]) => v?.hidden && !state.photos[k]).map(([k]) => k);
  const w = sheet('Mehr', `<div class="ed-list">
    <button class="ed-li" data-m="seo">G&nbsp; Google – Titel und Beschreibung dieser Seite</button>
    <button class="ed-li" data-m="hours">🕒 Öffnungszeiten</button>
    <button class="ed-li" data-m="fleet">🛻 Mietanhänger & Transporter</button>
    <button class="ed-li" data-m="cargo">„Was transportieren Sie?“ (Auswahl im Finder)</button>
    ${canTranslate ? `<button class="ed-li" data-m="tr">🌐 Automatisch in die anderen Sprachen übersetzen: <b>${autoOn() ? 'an' : 'aus'}</b></button>` : ''}
    <button class="ed-li" data-m="help">❓ Kurzanleitung</button>
    ${hidden.length ? `<button class="ed-li" data-m="unhide">🖼 Ausgeblendete Bilder wieder anzeigen (${hidden.length})</button>` : ''}
    ${S.live
      ? '<button class="ed-li ed-red" data-m="discard">↺ Nicht gespeicherte Änderungen verwerfen</button>'
      : `<button class="ed-li" data-m="resetp">↺ Diese Seite auf Original zurücksetzen</button>
    <button class="ed-li ed-red" data-m="reset">↺ Ganze Website auf Original zurücksetzen</button>`}
    <button class="ed-li" data-m="logout">⎋ Abmelden</button></div>`);
  for (const b of $$('[data-m]', w)) {
    b.onclick = () => {
      closeSheet();
      ({
        seo: seoSheet, hours: () => hoursSheet(hctx), fleet: () => fleetSheet(fctx), cargo: () => void cargoSheet(fctx, closeSheet), help: helpSheet,
        tr: () => { setAuto(!autoOn()); toast(autoOn() ? 'Geänderte Texte werden automatisch übersetzt' : 'Automatische Übersetzung aus'); }, resetp: resetPage, reset: resetAll, discard, logout,
        unhide: () => { change(() => { for (const k of hidden) state.photos[k] = { hidden: false }; }); toast('Die Bilder erscheinen nach dem Speichern wieder.', 3600); },
      })[b.dataset.m as 'help']();
    };
  }
}
function helpSheet() {
  sheet('Kurzanleitung', `<ol class="ed-help">
    <li><b>Text ändern:</b> Text antippen und lostippen. Texte mit Telefonnummer, Adresse oder Link öffnen ein kleines Fenster.</li>
    <li><b>Bild ändern:</b> Bild antippen → „Foto aus Galerie" oder „Foto aufnehmen". Dort auch die Bildbeschreibung.</li>
    <li><b>Reihenfolge, Kopieren, Löschen:</b> einen Eintrag einer Liste antippen (z. B. einen Aufzählungspunkt oder Absatz) – unten erscheinen ↑ ↓ Kopieren Löschen.</li>
    <li><b>Andere Sprache:</b> unter „Seiten" die Sprache wählen und dort genauso ändern.</li>
    <li><b>Öffnungszeiten:</b> unten auf <b>Zeiten</b> tippen (oder auf die Öffnungszeiten auf der Seite). Sie gelten überall: Tabelle, Fußzeile, Texte und Google.</li>
    <li><b>Mietanhänger:</b> unten auf <b>Anhänger</b> tippen – anlegen, Daten, Preise, Texte und Foto ändern, ausblenden oder löschen. Oder direkt auf eine Anhänger-Karte tippen.</li>
    <li><b>Google:</b> unter „Mehr“ Titel, Beschreibung und Bildbeschreibungen pro Seite und Sprache.</li>
    ${canTranslate ? '<li><b>Andere Sprachen:</b> Ein geänderter Text wird automatisch in die anderen Sprachen übersetzt (abschaltbar unter „Mehr“). Prüfen Sie die Übersetzungen beim Speichern.</li>' : ''}
    <li><b>Fertig?</b> Auf <b>Speichern</b> tippen: Sie sehen alle Änderungen und können Texte dort noch verbessern, dann „${S.live ? 'Jetzt veröffentlichen' : 'Speichern'}“${S.live ? ' – nach wenigen Minuten sehen alle Besucher die Änderungen' : ''}. Vertippt? <b>Rückgängig</b>.</li></ol>`);
}
async function resetPage() {
  if (!(await confirmBox('Seite zurücksetzen', 'Alle Änderungen auf dieser Seite in dieser Sprache werden verworfen. Kopf- und Fußbereich bleiben, wie sie sind.', 'Zurücksetzen', true))) return;
  const inChrome = (el: Element) => !!el.closest('header, footer');
  change(() => {
    const tx = state.texts[lang] ?? {};
    for (const el of $$('[data-eok], [data-eka]')) {
      if (inChrome(el)) continue;
      for (const k of (el.dataset.ekeys ?? el.dataset.eok ?? el.dataset.eka!).split(' ')) delete tx[k];
    }
    if (seo.title) delete tx[seo.title];
    if (seo.desc) delete tx[seo.desc];
    for (const [path, info] of lists) if (!inChrome(info.marker.parentElement!)) delete state.lists[lang]?.[path];
    for (const fig of $$('main [data-eimg]')) delete state.photos[fig.dataset.eimg!];
  });
  save();
}
/** Supabase: nur Ungespeichertes verwerfen – Gespeichertes ist schon veröffentlicht */
async function discard() {
  if (!dirty()) { toast('Es gibt keine ungespeicherten Änderungen.'); return; }
  if (!(await confirmBox('Änderungen verwerfen', 'Alle Änderungen seit dem letzten Speichern gehen verloren.', 'Verwerfen', true))) return;
  state = (await S.loadContent()) ?? emptyState();
  undo = [];
  draft.set(null);
  updateBar();
  render();
  toast('Verworfen – die Seite zeigt den gespeicherten Stand');
}
async function resetAll() {
  if (!(await confirmBox('Ganze Website zurücksetzen', 'Alle Änderungen in allen Sprachen und alle hochgeladenen Bilder werden gelöscht. Die Website sieht danach wieder genau aus wie das Original.', 'Alles zurücksetzen', true))) return;
  await S.resetContent();
  state = emptyState();
  undo = [];
  draft.set(null);
  updateBar();
  render();
  toast('Website auf Original zurückgesetzt');
}

/* ------------------------------------------------------------ Start (aus boot.ts) */
let ready: Promise<void> | null = null;
export async function boot(loginClicked: boolean) {
  ready ??= (async () => {
    mapPage();
    await S.init();
    state = (await S.loadContent()) ?? emptyState();
    lastSaved = clone(state);
    if (await S.isLoggedIn()) startAdmin();
    else render();
  })();
  await ready;
  if (loginClicked) admin ? logout() : loginDialog();
}
