import { describe, expect, it } from 'vitest';
import { buildIndex, capture, displayText, listOf, renderHtml } from '@/edit/match';

describe('Seiten-Editor: Texte zuordnen', () => {
  const idx = buildIndex({
    'nav.contact': 'Contact',
    'hero.h1': 'Le garage du rond-point d’Erpeldange',
    'footer.call': 'Appelez-nous au {phone} ou passez au garage.',
    'content.p': 'Voir aussi notre [atelier](page:workshop) [UNBESTÄTIGT — Prix].',
    'x.short': '{n} h',
  });

  it('findet Texte trotz geschützter Leerzeichen, Trennstriche und Platzhalter', () => {
    expect(idx.find(' Le garage du rond-­point d’Erpeldange ')).toEqual(['hero.h1']);
    expect(idx.find('Appelez-nous au +352 81 05 41 ou passez au garage.')).toEqual(['footer.call']);
    expect(idx.find('Voir aussi notre atelier.')).toEqual(['content.p']);
    expect(idx.find('12 h')).toEqual([]); // zu wenig fester Text
  });

  it('behält Platzhalter und Links beim Ändern', () => {
    const html = 'Appelez-nous au <a href="tel:+352810541">+352&nbsp;81&nbsp;05&nbsp;41</a> ou passez au garage.';
    const c = capture('Appelez-nous au {phone} ou passez au garage.', html)!;
    expect(renderHtml('Rufen Sie {phone} an & kommen Sie vorbei.', c)).toBe(
      'Rufen Sie <a href="tel:+352810541">+352 81 05 41</a> an &amp; kommen Sie vorbei.',
    );
    const l = capture('Voir aussi notre [atelier](page:workshop).', 'Voir aussi notre <a href="/fr/atelier/">atelier</a>.')!;
    expect(renderHtml('Siehe [Werkstatt](page:workshop).', l)).toBe('Siehe <a href="/fr/atelier/">Werkstatt</a>.');
    expect(capture('Autre {x} texte', 'pas pareil')).toBeNull();
  });

  it('erkennt Listen-Einträge', () => {
    expect(listOf('faq.3.q')).toEqual({ path: 'faq', index: 3, rest: 'q' });
    expect(listOf('a.1.b.2')).toEqual({ path: 'a.1.b', index: 2, rest: '' });
    expect(listOf('hero.h1')).toBeNull();
    expect(displayText('[A](page:x) {n}')).toBe('A {n}');
  });
});
