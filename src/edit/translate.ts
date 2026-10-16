/**
 * Automatisch übersetzen (nur Betrieb auf Cloudflare, Workers AI im Worker):
 * Wird ein Text in einer Sprache geändert, holt der Editor im Hintergrund Übersetzungen für die
 * anderen Sprachen. Sie stehen als Änderung im Stand, markiert „automatisch übersetzt“ (state.auto),
 * und lassen sich vor dem Speichern in der Übersicht prüfen und verbessern.
 * Eine in einer anderen Sprache selbst geänderte Fassung wird nie überschrieben.
 */
import { LANGS, type Lang } from '@/i18n/config';
import type { EditState } from '../../supabase/functions/publish/convert';
import { SITE_CONFIG } from './storage';
import { baked } from './review';
import { toast } from './ui';

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

/** Nach einer Textänderung: kurz warten (weiteres Tippen), dann in die anderen Sprachen übersetzen */
export function queueTranslate(ctx: TranslateCtx, key: string, text: string, from: Lang) {
  if (!autoOn()) return;
  clearTimeout(timers.get(key));
  timers.set(key, setTimeout(() => run(ctx, key, text, from), 900));
}

async function run(ctx: TranslateCtx, key: string, text: string, from: Lang) {
  const s = ctx.state();
  const auto = new Set(s.auto ?? []);
  // nur Sprachen, in denen es den Text gibt und die nicht von Hand geändert wurden
  const to = LANGS.filter((l) => l !== from && baked(l)[key] != null && (s.texts[l]?.[key] == null || auto.has(`${l}:${key}`)));
  if (!to.length) return;
  let res: Partial<Record<Lang, string>>;
  try {
    res = await translateText(text, from, to);
  } catch (e) {
    toast(`Automatische Übersetzung nicht möglich: ${(e as Error).message}`, 4500);
    return;
  }
  const got = Object.keys(res) as Lang[];
  if (!got.length) return;
  ctx.change(() => {
    const st = ctx.state();
    const a = new Set(st.auto ?? []);
    for (const l of got) {
      // inzwischen von Hand geändert? Dann nicht überschreiben
      if (st.texts[l]?.[key] != null && !a.has(`${l}:${key}`)) continue;
      (st.texts[l] ??= {})[key] = res[l]!;
      a.add(`${l}:${key}`);
    }
    st.auto = [...a];
  });
  toast(`In ${got.length} ${got.length === 1 ? 'Sprache' : 'Sprachen'} übersetzt – vor dem Speichern in der Übersicht prüfen`, 3800);
}

/** Leere Sprachen eines mehrsprachigen Felds (z. B. Name eines Anhängers) aus einer gefüllten übersetzen */
export async function fillLanguages(values: Partial<Record<Lang, string>>, prefer: Lang): Promise<Partial<Record<Lang, string>>> {
  const from = (values[prefer]?.trim() ? prefer : LANGS.find((l) => values[l]?.trim())) as Lang | undefined;
  if (!from) return {};
  const to = LANGS.filter((l) => l !== from && !values[l]?.trim());
  if (!to.length) return {};
  return translateText(values[from]!.trim(), from, to);
}
