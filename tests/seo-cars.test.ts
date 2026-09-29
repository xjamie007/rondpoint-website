/** Title 50–60 und Description 150–160 für jede Autoseite in jeder Sprache (G2). */
import { describe, expect, it } from 'vitest';
import { LANGS } from '../src/i18n/config.ts';
import { useT } from '../src/i18n/index.ts';
import { activeCars } from '../src/lib/stock.ts';
import { carDescription, carTitle, DESC_RANGE, TITLE_RANGE } from '../src/lib/seo.ts';

describe.each(LANGS)('Autoseiten %s', (lang) => {
  const t = useT(lang);
  it.each(activeCars.map((c) => [c.slug, c] as const))('%s', (_slug, car) => {
    const title = carTitle(car, lang, t);
    const desc = carDescription(car, lang, t);
    expect(title.length, title).toBeGreaterThanOrEqual(TITLE_RANGE[0]);
    expect(title.length, title).toBeLessThanOrEqual(TITLE_RANGE[1]);
    expect(desc.length, desc).toBeGreaterThanOrEqual(DESC_RANGE[0]);
    expect(desc.length, desc).toBeLessThanOrEqual(DESC_RANGE[1]);
  });
});
