/**
 * Bereinigung von Beschreibungstexten und Hilfen für Zahlen (T2.6).
 * Es wird nur Text übernommen, nie HTML aus der Quelle.
 */
import type { DescriptionBlock } from '../../src/lib/stock-schema.ts';

const REF_RE = /^\s*r[ée]f(?:[ée]rence)?\.?\s*interne\s*:?\s*(\d+)\s*$/i;
const REF_ANYWHERE_RE = /r[ée]f(?:[ée]rence)?\.?\s*interne\s*:?\s*(\d+)/i;
const RULE_RE = /^\s*[-–—_=*]{3,}\s*$/;
const BULLET_RE = /^\s*[•·▪●◦‣∙]\s*/;
const FINANCE_RE = /(financez|financement|leasing)\b.*(€|eur).*\/\s*mois|à partir de\s+[\d\s.,]+\s*€\s*\/\s*mois/i;
const BADGE_RE = /^\s*(privilege|nouveau|pro|top annonce|premium)\s*$/i;
const PHONE_RE = /(\+?352)?[\s./-]*\(?\d{2}\)?[\s./-]*\d{2}[\s./-]*\d{2}[\s./-]*\d{2}/;
/** Tracking-Nummern der Portale, die nie auf die Website dürfen. */
const TRACKING_PHONES = ['27940449', '27864544'];

export function extractGarageRef(lines: string[]): string | null {
  for (const l of lines) {
    const m = l.match(REF_ANYWHERE_RE);
    if (m) return m[1];
  }
  return null;
}

function containsTrackingPhone(line: string): boolean {
  const digits = line.replace(/\D/g, '');
  return TRACKING_PHONES.some((p) => digits.includes(p));
}

/**
 * Wandelt Beschreibungszeilen in Blöcke um:
 * - „Ref Interne : …" entfernen
 * - Trennlinien entfernen, Leerzeilen zusammenfassen
 * - Zeilen mit „•" werden eine Liste
 * - Finanzierungs-Teaser, Plaketten und Tracking-Nummern entfernen
 */
export function cleanDescription(lines: string[]): DescriptionBlock[] {
  const blocks: DescriptionBlock[] = [];
  let list: string[] | null = null;
  const flushList = () => {
    if (list && list.length) blocks.push({ kind: 'ul', items: list });
    list = null;
  };
  for (const raw of lines) {
    const line = raw.replace(/\s+/g, ' ').trim();
    if (!line) {
      flushList();
      continue;
    }
    if (REF_RE.test(line)) continue;
    if (RULE_RE.test(line)) {
      flushList();
      continue;
    }
    if (FINANCE_RE.test(line) || BADGE_RE.test(line)) continue;
    if (containsTrackingPhone(line) && PHONE_RE.test(line)) continue;
    const cleaned = line.replace(REF_ANYWHERE_RE, '').trim();
    if (!cleaned) continue;
    if (BULLET_RE.test(cleaned)) {
      const item = cleaned.replace(BULLET_RE, '').trim();
      if (!item) continue;
      if (!list) list = [];
      list.push(item);
    } else {
      flushList();
      blocks.push({ kind: 'p', text: cleaned });
    }
  }
  flushList();
  return blocks;
}

/** HTML-Beschreibung (AutoScout24) in Zeilen reinen Texts zerlegen. */
export function htmlToLines(html: string): string[] {
  return html
    .replace(/<\s*br\s*\/?>/gi, '\n')
    .replace(/<\s*li[^>]*>/gi, '\n• ')
    .replace(/<\/\s*(p|div|li|ul|ol|h\d)\s*>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .split('\n');
}

/** „61 370km" → 61370, „1968 Cm³" → 1968, „-" → null */
export function parseIntLoose(s: string | null | undefined): number | null {
  if (!s) return null;
  const digits = s.replace(/[^\d]/g, '');
  if (!digits) return null;
  const n = Number.parseInt(digits, 10);
  return Number.isFinite(n) ? n : null;
}

export function dashToNull(s: string | null | undefined): string | null {
  if (s == null) return null;
  const t = s.replace(/\s+/g, ' ').trim();
  if (!t || /^[-–—]+$/.test(t)) return null;
  return t;
}

/** „06-2024" oder „06/2024" → „2024-06" */
export function parseMonthYear(s: string | null | undefined): string | null {
  if (!s) return null;
  const m = s.match(/(\d{1,2})\s*[-/.]\s*(\d{4})/);
  if (!m) return null;
  const month = Number(m[1]);
  if (month < 1 || month > 12) return null;
  return `${m[2]}-${String(month).padStart(2, '0')}`;
}

/**
 * Plausibilitätsprüfung: unplausible Werte werden verworfen (null) und gemeldet,
 * das Auto bleibt im Bestand. Beispiel: Austin-Healey mit „1632 CV" im Inserat.
 */
export const PLAUSIBLE = {
  powerHp: [20, 1600],
  displacementCc: [49, 9000],
  seats: [1, 9],
} as const;

export function plausible(
  value: number | null,
  range: readonly [number, number],
  label: string,
  warn: (msg: string) => void,
): number | null {
  if (value == null) return null;
  if (value < range[0] || value > range[1]) {
    warn(`${label} ${value} ist unplausibel und wird nicht angezeigt`);
    return null;
  }
  return value;
}
