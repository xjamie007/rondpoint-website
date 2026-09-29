/**
 * Prüfliste für Muttersprachler (E): Jeder luxemburgische und portugiesische Text trägt
 * review: "native", bis er in src/i18n/review.json als geprüft eingetragen ist.
 * Schreibt die Liste in I18N-REVIEW.md (im README verlinkt).
 *   npm run i18n:review
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import lb from '../src/i18n/lb.ts';
import pt from '../src/i18n/pt.ts';
import fr from '../src/i18n/fr.ts';

type Tree = string | string[] | { [k: string]: Tree };
const leaves = (t: Tree, p = ''): [string, string][] =>
  typeof t === 'string'
    ? [[p, t]]
    : Array.isArray(t)
      ? t.map((s, i) => [`${p}[${i}]`, s] as [string, string])
      : Object.entries(t).flatMap(([k, v]) => leaves(v, p ? `${p}.${k}` : k));

const reviewFile = fileURLToPath(new URL('../src/i18n/review.json', import.meta.url));
const reviewed = JSON.parse(readFileSync(reviewFile, 'utf8')) as { lb: string[]; pt: string[] };
const frMap = new Map(leaves(fr as unknown as Tree));
const esc = (s: string) => s.replace(/\|/g, '\\|').replace(/\n/g, ' ');

let md = '# Übersetzungen zur Prüfung durch Muttersprachler\n\n';
md += 'Jeder Text hier hat den Status `review: "native"`. Nach der Prüfung den Schlüssel in `src/i18n/review.json` eintragen und `npm run i18n:review` neu laufen lassen.\n\n';
md += readFileSync(fileURLToPath(new URL('../src/i18n/review-notes.md', import.meta.url)), 'utf8') + '\n';
for (const [lang, dict] of [
  ['lb', lb],
  ['pt', pt],
] as const) {
  const open = leaves(dict as unknown as Tree).filter(([k]) => !reviewed[lang].includes(k));
  md += `## ${lang === 'lb' ? 'Lëtzebuergesch' : 'Português (pt-PT)'}: ${open.length} Texte offen\n\n| Schlüssel | Französisch | ${lang.toUpperCase()} |\n|---|---|---|\n`;
  for (const [k, v] of open) md += `| \`${k}\` | ${esc(frMap.get(k) ?? '')} | ${esc(v)} |\n`;
  md += '\n';
}
writeFileSync(fileURLToPath(new URL('../I18N-REVIEW.md', import.meta.url)), md);
console.log('I18N-REVIEW.md geschrieben');
