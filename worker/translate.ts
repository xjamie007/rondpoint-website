/**
 * Übersetzung für den Admin-Bereich (POST /api/translate, nur angemeldet).
 * Workers AI (Llama 3.3 70B) übersetzt einen geänderten Text in die anderen
 * Sprachen der Website. Platzhalter {…}, Link-Ziele (page:…) und der Firmenname bleiben;
 * eine Übersetzung, bei der sie fehlen, wird verworfen. Der Editor markiert die Ergebnisse
 * als „automatisch übersetzt – bitte prüfen“.
 */
import type { Env } from './types';

// Gemma ist für dieses Konto gesperrt (Fehler 5018); Mistral Small erfand Ortsnamen – Llama 3.3 war im Test am verlässlichsten
export const MODEL = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';
const LANGS = ['fr', 'de', 'lb', 'en', 'pt'] as const;
type Lang = (typeof LANGS)[number];
const NAME: Record<Lang, string> = {
  fr: 'French',
  de: 'German',
  lb: 'Luxembourgish (Lëtzebuergesch)',
  en: 'English (British)',
  pt: 'European Portuguese (as in Portugal, never Brazilian Portuguese)',
};

/** Platzhalter und Link-Ziele: müssen in jeder Übersetzung gleich bleiben */
export const fixedParts = (s: string) =>
  [...[...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort(), '|', ...[...s.matchAll(/\]\(([^)\s]+)\)/g)].map((m) => m[1]).sort()].join(',');

/** Text der Antwort: ältere Modelle liefern { response }, neuere das OpenAI-Format { choices } */
export function answerOf(out: unknown): unknown {
  const o = out as { response?: unknown; choices?: { message?: { content?: unknown } }[] } | null;
  return o?.response ?? o?.choices?.[0]?.message?.content ?? null;
}

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
    'Keep numbers, prices, units, phone numbers, e-mail addresses and brand names. Address the customer formally. Keep the meaning, length, tone and punctuation (also the final full stop); no explanations.',
    'Place names: Luxembourgish "Ierpeldeng" is "Erpeldange", "Ettelbréck" is "Ettelbruck", "Angelduerf" is "Ingeldorf" and "Dikrech" is "Diekirch" in all other languages (and the other way round into Luxembourgish). Never replace a place by another one.',
    'Terms: Luxembourgish "Unhänger" = trailer (French "remorque", feminine: "une remorque"; German "Anhänger"; Portuguese "atrelado"), "Camionnette" = van (German "Transporter"), "Méimaschinn" = lawn mower (German "Rasenmäher", French "tondeuse à gazon"), "lounen" = to rent/hire (German "mieten"). Keep the vocabulary of a garage and rental business.',
    `Answer with one JSON object only, keys ${to.map((l) => `"${l}"`).join(', ')}, values the translations.`,
  ].join('\n');
  const out = (await env.AI.run(MODEL, {
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: text },
    ],
    max_tokens: Math.min(4000, 400 + text.length * 3),
    temperature: 0.2,
  }));
  const answer = answerOf(out);
  const raw = typeof answer === 'string' ? parseJson(answer) : answer && typeof answer === 'object' ? (answer as Record<string, unknown>) : null;
  const translations: Partial<Record<Lang, string>> = {};
  const skipped: Lang[] = [];
  const end = /[.!?:]$/.exec(text)?.[0];
  for (const l of to) {
    let v = typeof raw?.[l] === 'string' ? (raw[l] as string).trim() : '';
    // Schlusspunkt geht beim Modell manchmal verloren
    if (v && end && !/[.!?:…"»”)]$/.test(v)) v += end;
    if (v && v.length <= text.length * 3 + 80 && fixedParts(v) === fixedParts(text)) translations[l] = v;
    else skipped.push(l);
  }
  return { status: 200, body: { ok: true, translations, skipped } };
}
