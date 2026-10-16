/**
 * Automatisch übersetzen (nur Betrieb auf Cloudflare, Workers AI im Worker):
 * Wird ein Text in einer Sprache geändert, holt der Editor im Hintergrund Übersetzungen für die
 * anderen Sprachen. Sie stehen als Änderung im Stand, markiert „automatisch übersetzt“ (state.auto),
 * und lassen sich vor dem Speichern in der Übersicht prüfen und verbessern.
 * Eine in einer anderen Sprache selbst geänderte Fassung wird nie überschrieben.
 */
import { useT } from '@/i18n';
import { LANGS, type Lang } from '@/i18n/config';
import type { EditState } from '../../supabase/functions/publish/convert';
import { flatten } from './match';
import { SITE_CONFIG } from './storage';
import { toast } from './ui';

const flat = new Map<Lang, Record<string, string>>();
/** Texte einer Sprache, wie die Seite gebaut wurde (flach: Schlüssel → Text) */
export const baked = (l: Lang) => flat.get(l) ?? (flat.set(l, flatten(useT(l))), flat.get(l)!);

const OFF = 'rp-translate-off';
const API = `${import.meta.env.BASE_URL.replace(/\/?$/, '/')}api/translate`;
export const canTranslate = SITE_CONFIG.storage === 'cloudflare';
export const autoOn = () => {
  try { return canTranslate && localStorage.getItem(OFF) !== '1'; } catch { return canTranslate; }
};
export const setAuto = (on: boolean) => {
  try { on ? localStorage.removeItem(OFF) : localStorage.setItem(OFF, '1'); } catch { /* egal */ }
};

export async function translateText(text: string, from: Lang, to: Lang[]): Promise<Partial<Record<Lang, string>>> {
  const r = await fetch(API, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'content-type': 'application/json', 'x-rp-editor': '1' },
    body: JSON.stringify({ text, from, to }),
  });
  const j = (await r.json().catch(() => ({}))) as { ok?: boolean; translations?: Partial<Record<Lang, string>>; error?: string };
  if (!r.ok || !j.ok) throw new Error(j.error ?? `Fehler ${r.status}`);
  return j.translations ?? {};
}

export interface TranslateCtx {
  state: () => EditState;
  change: (fn: () => void | false) => void;
}

const timers = new Map<string, ReturnType<typeof setTimeout>>();
const waiting = new Map<string, () => Promise<boolean>>();
const running = new Set<Promise<boolean>>();
/** zuletzt fehlgeschlagene Übersetzungen (Schlüssel → Meldung), für die Übersicht vor dem Speichern */
export const failed = new Map<string, string>();

function start(key: string) {
  clearTimeout(timers.get(key));
  timers.delete(key);
  const job = waiting.get(key);
  waiting.delete(key);
  if (!job) return;
  const p = job().finally(() => running.delete(p));
  running.add(p);
}

/**
 * Nach einer Textänderung: kurz warten (weiteres Tippen), dann in die anderen Sprachen übersetzen.
 * keys: alle Stellen mit diesem Text (derselbe Satz kann auf mehreren Seiten stehen) – einmal übersetzt.
 */
export function queueTranslate(ctx: TranslateCtx, keys: string[], text: string, from: Lang) {
  if (!autoOn() || !keys.length) return;
  const id = keys.join(' ');
  clearTimeout(timers.get(id));
  waiting.set(id, () => translateKey(ctx, keys, text, from));
  timers.set(id, setTimeout(() => start(id), 900));
}

/** Übersetzungen laufen noch oder warten auf das Ende des Tippens */
export const translating = () => waiting.size + running.size > 0;

/** Wartende Übersetzungen sofort starten und alle abwarten (vor der Übersicht beim Speichern) */
export async function flushTranslations(): Promise<void> {
  for (const key of [...waiting.keys()]) start(key);
  while (running.size) await Promise.allSettled([...running]);
}

/** Sprachen, in die ein Text übersetzt würde: es gibt ihn dort, und er wurde dort nicht von Hand geändert */
const isTarget = (s: EditState, auto: Set<string>, l: Lang, k: string) =>
  baked(l)[k] != null && (s.texts[l]?.[k] == null || auto.has(`${l}:${k}`));
export function targetsOf(s: EditState, keys: string[], from: Lang): Lang[] {
  const auto = new Set(s.auto ?? []);
  return LANGS.filter((l) => l !== from && keys.some((k) => isTarget(s, auto, l, k)));
}

/** Einen Text jetzt in die anderen Sprachen übersetzen (an allen Stellen keys); true = geklappt */
export async function translateKey(ctx: TranslateCtx, keys: string[], text: string, from: Lang, quiet = false): Promise<boolean> {
  const to = targetsOf(ctx.state(), keys, from);
  if (!to.length) return true;
  let res: Partial<Record<Lang, string>>;
  try {
    res = await translateText(text, from, to);
  } catch (e) {
    const msg = (e as Error).message || 'unbekannter Fehler';
    for (const k of keys) failed.set(k, msg);
    if (!quiet) toast(`Automatische Übersetzung nicht möglich: ${msg}`, 4500);
    return false;
  }
  const got = Object.keys(res) as Lang[];
  if (!got.length) {
    for (const k of keys) failed.set(k, 'Die Übersetzung passte nicht (Platzhalter oder Links fehlten).');
    return false;
  }
  for (const k of keys) failed.delete(k);
  ctx.change(() => {
    const st = ctx.state();
    const a = new Set(st.auto ?? []);
    for (const l of got) {
      for (const k of keys) {
        // nicht vorhanden oder inzwischen von Hand geändert: nicht überschreiben
        if (!isTarget(st, a, l, k)) continue;
        (st.texts[l] ??= {})[k] = res[l]!;
        a.add(`${l}:${k}`);
      }
    }
    st.auto = [...a];
  });
  if (!quiet) toast(`In ${got.length} ${got.length === 1 ? 'Sprache' : 'Sprachen'} übersetzt – vor dem Speichern in der Übersicht prüfen`, 3800);
  return true;
}

/** Leere Sprachen eines mehrsprachigen Felds (z. B. Name eines Anhängers) aus einer gefüllten übersetzen */
export async function fillLanguages(values: Partial<Record<Lang, string>>, prefer: Lang): Promise<Partial<Record<Lang, string>>> {
  const from = (values[prefer]?.trim() ? prefer : LANGS.find((l) => values[l]?.trim())) as Lang | undefined;
  if (!from) return {};
  const to = LANGS.filter((l) => l !== from && !values[l]?.trim());
  if (!to.length) return {};
  return translateText(values[from]!.trim(), from, to);
}
