/**
 * Übersetzung für den Admin-Bereich (POST /api/translate, nur angemeldet).
 * Workers AI (Gemma 3, über 140 Sprachen) übersetzt einen geänderten Text in die anderen
 * Sprachen der Website. Platzhalter {…}, Link-Ziele (page:…) und der Firmenname bleiben;
 * eine Übersetzung, bei der sie fehlen, wird verworfen. Der Editor markiert die Ergebnisse
 * als „automatisch übersetzt – bitte prüfen“.
 */
import type { Env } from './types';

export const MODEL = '@cf/google/gemma-3-12b-it';
const LANGS = ['fr', 'de', 'lb', 'en', 'pt'] as const;
type Lang = (typeof LANGS)[number];
const NAME: Record<Lang, string> = {
  fr: 'French',
  de: 'German',
  lb: 'Luxembourgish (Lëtzebuergesch)',
  en: 'English (British)',
  pt: 'European Portuguese (Portugal)',
};

/** Platzhalter und Link-Ziele: müssen in jeder Übersetzung gleich bleiben */
export const fixedParts = (s: string) =>
  [...[...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort(), '|', ...[...s.matchAll(/\]\(([^)\s]+)\)/g)].map((m) => m[1]).sort()].join(',');

/** Erstes JSON-Objekt aus der Antwort des Modells */
export function parseJson(s: string): Record<string, unknown> | null {
  const a = s.indexOf('{');
  const b = s.lastIndexOf('}');
  if (a < 0 || b <= a) return null;
  try {
    return JSON.parse(s.slice(a, b + 1));
  } catch {
    return null;
  }
}

export async function translate(env: Env, body: { text?: unknown; from?: unknown; to?: unknown }) {
  const text = typeof body.text === 'string' ? body.text.trim() : '';
  const from = body.from as Lang;
  const to = (Array.isArray(body.to) ? body.to : []).filter((l): l is Lang => LANGS.includes(l as Lang) && l !== from);
  if (!text || text.length > 3000 || !LANGS.includes(from) || !to.length) return { status: 400, body: { ok: false, error: 'Ungültige Anfrage' } };
  if (!env.AI) return { status: 501, body: { ok: false, error: 'Übersetzung nicht eingerichtet' } };

  const system = [
    'You translate texts for the website of "Garage Um Rond Point", a car garage with trailer and van rental in Erpeldange, Luxembourg.',
    `Translate the user's text from ${NAME[from]} into: ${to.map((l) => `${l} = ${NAME[l]}`).join('; ')}.`,
    'Rules: Never translate the company name "Um Rond Point". Keep every placeholder in curly braces such as {phone} or {hours} exactly as it is.',
    'Keep links written as [word](page:target): translate only the word in square brackets, never the part in round brackets.',
    'Keep numbers, prices, units, phone numbers, e-mail addresses and brand names. Address the customer formally. Keep the meaning, length and tone; no explanations.',
    `Answer with one JSON object only, keys ${to.map((l) => `"${l}"`).join(', ')}, values the translations.`,
  ].join('\n');
  const out = (await env.AI.run(MODEL, {
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: text },
    ],
    max_tokens: Math.min(4000, 400 + text.length * 3),
    temperature: 0.2,
  })) as { response?: unknown };
  const raw = typeof out?.response === 'string' ? parseJson(out.response) : out?.response && typeof out.response === 'object' ? (out.response as Record<string, unknown>) : null;
  const translations: Partial<Record<Lang, string>> = {};
  const skipped: Lang[] = [];
  for (const l of to) {
    const v = typeof raw?.[l] === 'string' ? (raw[l] as string).trim() : '';
    if (v && v.length <= text.length * 3 + 80 && fixedParts(v) === fixedParts(text)) translations[l] = v;
    else skipped.push(l);
  }
  return { status: 200, body: { ok: true, translations, skipped } };
}
