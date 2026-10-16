/**
 * Öffnungszeiten im Admin-Bereich: eine Stelle für die ganze Website.
 * Die Änderung gilt für die Tabelle, die Fußzeile, alle Texte mit {hours} und Google
 * (nach dem Veröffentlichen). Auf der offenen Seite zeigt die Vorschau sie sofort.
 */
import { escapeHtml, type Dict } from '@/i18n';
import type { Lang } from '@/i18n/config';
import horaires from '@/content/horaires.json';
import { hoursSummary } from '@/lib/content';
import { DAYS, hoursErrors, type DayKey, type EditState, type Interval, type Week } from '../../supabase/functions/publish/convert';
import { $, $$, closeSheet, sheet, toast } from './ui';

export const baseWeek = horaires.week as unknown as Week;
export const weekOf = (s: EditState): Week => s.hours ?? baseWeek;
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

const ERR: Record<string, string> = {
  time: 'Bitte die Uhrzeit vollständig eingeben (z. B. 08:00).',
  order: '„Bis“ muss nach „Von“ liegen.',
  overlap: 'Die beiden Zeitfenster überschneiden sich.',
  count: 'Höchstens zwei Zeitfenster pro Tag.',
};

export interface HoursCtx {
  t: Dict;
  lang: Lang;
  state: () => EditState;
  change: (fn: () => void | false) => void;
}

/** Fenster „Öffnungszeiten“ */
export function hoursSheet(ctx: HoursCtx) {
  const { t } = ctx;
  let w: Week = structuredClone(weekOf(ctx.state()));
  const wrap = sheet('Öffnungszeiten', '<div class="ed-form ed-hours-form"></div>', { wide: true, focus: false });
  const body = $('.ed-hours-form', wrap)!;

  const draw = () => {
    const errs = hoursErrors(w);
    body.innerHTML = `<p class="ed-hint">Gilt für die ganze Website: Tabelle, Fußzeile, Texte und Google. Für eine Mittagspause zwei Zeitfenster eintragen.</p>
      <div class="ed-days">${DAYS.map((d) => {
        const iv = w[d];
        return `<div class="ed-day${errs[d] ? ' ed-day-err' : ''}" data-d="${d}">
          <label class="ed-check"><input type="checkbox" data-open ${iv.length ? 'checked' : ''}> <b>${escapeHtml(t.hours.days[d])}</b></label>
          <div class="ed-ivs">${
            iv.length
              ? iv.map(([a, b], i) => `<div class="ed-iv"><input type="time" value="${a}" data-i="${i}" data-j="0" aria-label="${escapeHtml(t.hours.days[d])} von">
                  <span>–</span><input type="time" value="${b}" data-i="${i}" data-j="1" aria-label="${escapeHtml(t.hours.days[d])} bis">
                  ${i === 1 ? '<button type="button" class="ed-mini" data-rm>✕ entfernen</button>' : ''}</div>`).join('') +
                (iv.length === 1 ? '<button type="button" class="ed-mini" data-add>+ zweites Zeitfenster (Mittagspause)</button>' : '')
              : `<span class="ed-closed">${escapeHtml(t.hours.closed)}</span>`
          }</div>
          <p class="ed-err" data-err ${errs[d] ? '' : 'hidden'}>${errs[d] ? ERR[errs[d]!] : ''}</p>
        </div>`;
      }).join('')}</div>
      <div class="ed-row ed-row-start"><button type="button" class="ed-btn ed-ghost" data-copy>Montag auf Dienstag–Freitag übertragen</button>
        <button type="button" class="ed-btn ed-ghost" data-orig ${same(w, baseWeek) ? 'hidden' : ''}>Wie zurzeit auf der Website</button></div>
      <div class="ed-prev-hours"><span class="ed-hint">So steht es in der Fußzeile:</span><p data-prev>${escapeHtml(hoursSummary(t, ctx.lang, ' · ', w))}</p></div>
      <div class="ed-row"><button type="button" class="ed-btn ed-ghost" data-cancel>Abbrechen</button><button type="button" class="ed-btn ed-primary" data-ok>Übernehmen</button></div>`;
  };
  draw();

  /** Fehler und Vorschau aktualisieren, ohne die Eingabefelder neu zu zeichnen (sonst springt der Cursor beim Tippen) */
  const status = () => {
    const errs = hoursErrors(w);
    for (const el of $$('[data-d]', body)) {
      const d = el.dataset.d as DayKey;
      el.classList.toggle('ed-day-err', !!errs[d]);
      const p = $('[data-err]', el)!;
      p.hidden = !errs[d];
      p.textContent = errs[d] ? ERR[errs[d]!] : '';
    }
    $('[data-prev]', body)!.textContent = hoursSummary(t, ctx.lang, ' · ', w);
    $<HTMLButtonElement>('[data-orig]', body)!.hidden = same(w, baseWeek);
  };
  const onTime = (e: Event) => {
    const el = e.target as HTMLInputElement;
    const d = el.closest<HTMLElement>('[data-d]')?.dataset.d as DayKey | undefined;
    if (!d || el.type !== 'time') return;
    w[d][+el.dataset.i!][+el.dataset.j!] = el.value;
    status();
  };
  body.addEventListener('input', onTime);
  body.addEventListener('change', (e) => {
    const el = e.target as HTMLInputElement;
    const d = el.closest<HTMLElement>('[data-d]')?.dataset.d as DayKey | undefined;
    if (!d) return;
    if (el.matches('[data-open]')) {
      w[d] = el.checked ? [(w.mo[0] ?? ['08:00', '12:00']).slice() as Interval] : [];
      draw();
    } else onTime(e);
  });
  body.addEventListener('click', (e) => {
    const b = (e.target as Element).closest<HTMLButtonElement>('button');
    if (!b) return;
    const d = b.closest<HTMLElement>('[data-d]')?.dataset.d as DayKey | undefined;
    if (d && b.matches('[data-add]')) w[d].push(['13:00', '18:00']);
    else if (d && b.matches('[data-rm]')) w[d].splice(1, 1);
    else if (b.matches('[data-copy]')) for (const x of ['tu', 'we', 'th', 'fr'] as DayKey[]) w[x] = structuredClone(w.mo);
    else if (b.matches('[data-orig]')) w = structuredClone(baseWeek);
    else if (b.matches('[data-cancel]')) return closeSheet();
    else if (b.matches('[data-ok]')) {
      if (Object.keys(hoursErrors(w)).length) return toast('Bitte die rot markierten Tage korrigieren.', 3500);
      closeSheet();
      if (same(w, weekOf(ctx.state()))) return;
      ctx.change(() => {
        const s = ctx.state();
        if (same(w, baseWeek)) delete s.hours;
        else s.hours = w;
      });
      toast('Öffnungszeiten übernommen – überall auf der Website. Bitte speichern.', 3600);
      return;
    }
    draw();
  });
}

/** Vorschau auf der offenen Seite: Tabelle und Fußzeile. Texte mit {hours} → hoursVar() */
export function renderHours(ctx: HoursCtx) {
  const w = weekOf(ctx.state());
  const { t } = ctx;
  for (const tr of $$('[data-hours=table] tr[data-day]')) {
    const d = tr.dataset.day as DayKey;
    const td = $('td', tr);
    if (!td) continue;
    const html = w[d].length ? w[d].map(([a, b]) => `<span class="iv">${a}–${b}</span>`).join(` ${escapeHtml(t.hours.and)} `) : escapeHtml(t.hours.closed);
    if (td.innerHTML !== html) {
      const cid = [...(td.attributes as unknown as Attr[])].find((a) => a.name.startsWith('data-astro-cid'))?.name;
      td.innerHTML = cid ? html.replace(/<span /g, `<span ${cid} `) : html;
    }
  }
  for (const el of $$('[data-hours=text]')) {
    const v = hoursText(ctx);
    if (el.textContent !== v) el.textContent = v;
  }
  for (const p of $$('[data-hours=sum]')) {
    const html = hoursSummary(t, ctx.lang, ' · ', w).split(' · ').map((l) => `<span>${escapeHtml(l)}</span>`).join('');
    if (p.innerHTML.replace(/ data-astro-cid-\w+(="")?/g, '') !== html) {
      const cid = [...(p.attributes as unknown as Attr[])].find((a) => a.name.startsWith('data-astro-cid'))?.name;
      p.innerHTML = cid ? html.replace(/<span>/g, `<span ${cid}>`) : html;
    }
  }
}

/** Text für {hours} (wie fillVars in src/lib/content.ts); baked: so wie die Seite gebaut wurde */
export const hoursText = (ctx: HoursCtx, baked = false) => `${hoursSummary(ctx.t, ctx.lang, '; ', baked ? baseWeek : weekOf(ctx.state()))}.`;
export const hoursVar = (ctx: HoursCtx) => escapeHtml(hoursText(ctx));
