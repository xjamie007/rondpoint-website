import { describe, expect, it } from 'vitest';
import fr from '../src/i18n/fr.ts';
import de from '../src/i18n/de.ts';
import lb from '../src/i18n/lb.ts';
import en from '../src/i18n/en.ts';
import pt from '../src/i18n/pt.ts';

type Tree = string | string[] | { [k: string]: Tree };

function leaves(t: Tree, prefix = ''): [string, string | string[]][] {
  if (typeof t === 'string' || Array.isArray(t)) return [[prefix, t]];
  return Object.entries(t).flatMap(([k, v]) => leaves(v, prefix ? `${prefix}.${k}` : k));
}

const vars = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
const openPoints = (s: string) => (s.match(/\[(FEHLT|UNBESTÄTIGT)/g) ?? []).length;

const frLeaves = new Map(leaves(fr as unknown as Tree));
const langs = { de, lb, en, pt } as Record<string, unknown>;

describe.each(Object.entries(langs))('Übersetzung %s', (_lang, dict) => {
  const map = new Map(leaves(dict as Tree));

  it('hat jeden Schlüssel aus fr', () => {
    const missing = [...frLeaves.keys()].filter((k) => !map.has(k));
    expect(missing).toEqual([]);
  });

  it('hat keine zusätzlichen Schlüssel', () => {
    const extra = [...map.keys()].filter((k) => !frLeaves.has(k));
    expect(extra).toEqual([]);
  });

  it('übernimmt alle {Platzhalter} unverändert', () => {
    const wrong: string[] = [];
    for (const [k, v] of frLeaves) {
      const o = map.get(k);
      if (o == null) continue;
      const a = Array.isArray(v) ? v.join('|') : v;
      const b = Array.isArray(o) ? o.join('|') : o;
      if (vars(a).join() !== vars(b).join()) wrong.push(`${k}: ${vars(a)} ≠ ${vars(b)}`);
    }
    expect(wrong).toEqual([]);
  });

  it('behält alle offenen Punkte [FEHLT]/[UNBESTÄTIGT]', () => {
    const wrong: string[] = [];
    for (const [k, v] of frLeaves) {
      const o = map.get(k);
      if (o == null) continue;
      const a = Array.isArray(v) ? v.join('|') : v;
      const b = Array.isArray(o) ? o.join('|') : o;
      if (openPoints(a) !== openPoints(b)) wrong.push(k);
    }
    expect(wrong).toEqual([]);
  });

  it('enthält keine leeren Texte', () => {
    const empty = [...map.entries()].filter(([, v]) => (Array.isArray(v) ? v.some((x) => !x.trim()) : !v.trim()));
    expect(empty.map(([k]) => k)).toEqual([]);
  });
});

describe.each(Object.entries({ fr, ...langs }))('SEO-Längen %s', (_lang, dict) => {
  const seo = (dict as typeof fr).seo;
  const pages = ['home', 'rental', 'cars', 'workshop', 'sodablast', 'trailersForSale', 'garden', 'contact', 'thanks', 'legal', 'privacy'] as const;
  it.each(pages)('%s: Title 50–60, Description 150–160', (p) => {
    const { title, description } = seo[p];
    expect(title.length, `Title „${title}" hat ${title.length}`).toBeGreaterThanOrEqual(50);
    expect(title.length, `Title „${title}" hat ${title.length}`).toBeLessThanOrEqual(60);
    expect(description.length, `Description hat ${description.length}`).toBeGreaterThanOrEqual(150);
    expect(description.length, `Description hat ${description.length}`).toBeLessThanOrEqual(160);
  });
  it.each(['porte-voiture', 'porte-moto', 'benne', 'frigorifique', 'camionnette'] as const)('Kategorie %s', (c) => {
    const title = seo.category.title[c];
    const description = seo.category.description[c];
    expect(title.length, title).toBeGreaterThanOrEqual(50);
    expect(title.length, title).toBeLessThanOrEqual(60);
    expect(description.length, description).toBeGreaterThanOrEqual(150);
    expect(description.length, description).toBeLessThanOrEqual(160);
  });
});
