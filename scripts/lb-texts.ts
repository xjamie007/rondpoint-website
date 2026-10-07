/**
 * Luxemburgische Texte für die Rechtschreibprüfung (z. B. spellchecker.lu) und zurück.
 *
 *   npm run lb:export   → LB-TEXTE/lb-pruefen.txt  (nur Text, zum Einfügen in den Checker)
 *                         LB-TEXTE/lb-texte.txt    (gleiche Texte mit Kennung, hier korrigieren)
 *   npm run lb:import   → übernimmt Korrekturen aus LB-TEXTE/lb-texte.txt nach src/content/texts.json
 *
 * Grundlage: src/i18n/lb.ts plus Änderungen aus dem Dashboard (texts.json).
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import fr from '../src/i18n/fr.ts';
import lb from '../src/i18n/lb.ts';
import { groupKeys } from '../src/lib/text-groups.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const textsFile = `${root}src/content/texts.json`;
const outDir = `${root}LB-TEXTE`;
const keyedFile = `${outDir}/lb-texte.txt`;

type Flat = Record<string, string>;
function flatten(o: unknown, pre = '', out: Flat = {}): Flat {
  if (typeof o === 'string') out[pre] = o;
  else if (Array.isArray(o)) o.forEach((v, i) => flatten(v, `${pre}.${i}`, out));
  else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) flatten(v, pre ? `${pre}.${k}` : k, out);
  return out;
}

const texts = JSON.parse(readFileSync(textsFile, 'utf8')) as Record<string, Record<string, string>>;
const frFlat = flatten(fr);
const lbBase = flatten(lb);
const current = (k: string) => texts.lb?.[k] ?? lbBase[k];
const keys = Object.keys(frFlat).filter((k) => current(k) != null);
const vars = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',');

/** Für den Checker: Platzhalter durch echte Werte, interne Notizen entfernen */
function forChecker(s: string): string {
  const site = JSON.parse(readFileSync(`${root}src/content/site.json`, 'utf8'));
  return s
    .replace(/\s*\[(FEHLT|UNBESTÄTIGT)[^\]]*\]/g, '')
    .replace(/\{address\}/g, `${site.address.street}, ${site.address.postalCode} ${site.address.locality}`)
    .replace(/\{phone\}/g, site.phone.display)
    .replace(/\{whatsapp\}/g, site.whatsapp.display)
    .replace(/\{email\}/g, site.email)
    .replace(/\{hours\}/g, 'Méindes – Freides: 07:45–12:00 an 13:00–18:00')
    .replace(/\{(n|count|i)\}/g, '3')
    .replace(/\{\w+\}/g, '…')
    .replace(/\[([^\]]+)\]\((?:page|cat):[\w-]+\)/g, '$1')
    .trim();
}

function exportTexts() {
  mkdirSync(outDir, { recursive: true });
  let plain = '';
  let keyed =
    '# Luxemburgische Texte der Website Garage Um Rond Point\n' +
    '# Korrekturen direkt unter der jeweiligen @@-Zeile eintragen, Zeilen mit @@ nicht ändern.\n' +
    '# {address}, {phone}, {n} usw. sind Platzhalter: stehen lassen. [FEHLT …]/[UNBESTÄTIGT …] sind interne Notizen.\n' +
    '# Danach: npm run lb:import\n';
  let n = 0;
  let words = 0;
  for (const g of groupKeys(keys)) {
    plain += `\n\n———————————————— ${g.keys.length} ————————————————\n`;
    keyed += `\n\n######## ${g.de} ########\n`;
    for (const k of g.keys) {
      const v = current(k);
      if (!v.trim()) continue;
      n++;
      const clean = forChecker(v);
      if (clean) {
        plain += `\n${n}. ${clean}\n`;
        words += clean.split(/\s+/).length;
      }
      keyed += `\n@@ ${n} ${k}\n${v}\n`;
    }
  }
  writeFileSync(`${outDir}/lb-pruefen.txt`, plain.trimStart() + '\n');
  writeFileSync(keyedFile, keyed);
  writeFileSync(
    `${outDir}/LIESMICH.txt`,
    [
      'Luxemburgische Texte prüfen',
      '===========================',
      '',
      `lb-pruefen.txt  – ${n} Texte, rund ${words} Wörter, nur Luxemburgisch.`,
      '                  Abschnittsweise in spellchecker.lu (oder einen anderen Checker) einfügen.',
      '                  Jeder Text hat eine Nummer (z. B. „57.“).',
      '',
      'lb-texte.txt    – dieselben Texte mit Nummer und Kennung (@@ 57 hero.h1).',
      '                  Korrekturen hier unter der passenden Nummer eintragen.',
      '                  Platzhalter wie {address} oder {phone} stehen lassen.',
      '',
      'Übernehmen:     npm run lb:import',
      '                → schreibt nur geänderte Texte nach src/content/texts.json',
      '                  (gleicher Speicherort wie Änderungen aus dem Dashboard).',
      '',
      'Alternativ einzelne Texte direkt im Dashboard ändern: /admin/ → Texte → LB.',
      '',
    ].join('\n'),
  );
  console.log(`LB-TEXTE/ geschrieben: ${n} Texte, rund ${words} Wörter`);
}

function importTexts() {
  const raw = readFileSync(keyedFile, 'utf8');
  const blocks = raw.split(/\n@@ \d+ /).slice(1);
  let changed = 0;
  const warn: string[] = [];
  const lbOver = { ...(texts.lb ?? {}) };
  for (const b of blocks) {
    const nl = b.indexOf('\n');
    const key = b.slice(0, nl).trim();
    const value = b
      .slice(nl + 1)
      .replace(/\n+######## .*$/s, '')
      .replace(/\s+$/, '');
    if (!(key in frFlat)) {
      warn.push(`unbekannte Kennung: ${key}`);
      continue;
    }
    if (!value.trim()) {
      warn.push(`${key}: leer – übersprungen`);
      continue;
    }
    if (vars(value) !== vars(current(key))) {
      warn.push(`${key}: Platzhalter verändert ({${vars(current(key))}} → {${vars(value)}}) – übersprungen`);
      continue;
    }
    if (value === current(key)) continue;
    if (value === lbBase[key]) delete lbOver[key];
    else lbOver[key] = value;
    changed++;
  }
  texts.lb = lbOver;
  writeFileSync(textsFile, JSON.stringify(texts, null, 2) + '\n');
  console.log(`${changed} luxemburgische Texte übernommen (src/content/texts.json).`);
  for (const w of warn) console.warn(`  Hinweis: ${w}`);
}

if (process.argv[2] === 'import') importTexts();
else exportTexts();
