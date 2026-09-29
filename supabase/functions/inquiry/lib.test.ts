// deno test supabase/functions/inquiry/lib.test.ts
import { assertEquals, assert } from 'jsr:@std/assert@1';
import { subjectLine, validate, mailText, errorPage } from './lib.ts';

const now = new Date('2026-10-01T10:00:00Z');
const contact = { name: 'Ana Silva', phone: '+352 621 123 456', consent: 'yes' };

Deno.test('Mietanfrage: gültig, Betreff nach Muster', () => {
  const r = validate(
    { ...contact, type: 'location', lang: 'pt', vehicle: 'porte-voiture-27', vehicleName: 'Porte-voiture 2,7 t', from: '2026-10-12', to: '2026-10-13' },
    now,
  );
  assert(r.ok);
  if (r.ok) assertEquals(subjectLine(r.data), '[Location] Porte-voiture 2,7 t, 12.10.–13.10.2026 – Ana Silva (PT)');
});

Deno.test('Mietanfrage: „Au" vor „Du" wird abgelehnt', () => {
  const r = validate({ ...contact, type: 'location', lang: 'fr', vehicle: 'x', from: '2026-10-12', to: '2026-10-11' }, now);
  assertEquals(r.ok ? [] : r.fields, ['to']);
});

Deno.test('Mietanfrage: Datum in der Vergangenheit wird abgelehnt', () => {
  const r = validate({ ...contact, type: 'location', lang: 'fr', vehicle: 'x', from: '2026-09-30', to: '2026-10-02' }, now);
  assertEquals(r.ok ? [] : r.fields, ['from']);
});

Deno.test('Auto: Betreff mit r-Referenz', () => {
  const r = validate(
    { ...contact, name: 'Nom', type: 'voiture', lang: 'fr', ref: '141306', car: 'Audi A4 Avant, 29 280 €', carTitle: 'Audi A4 Avant', wish: 'essai' },
    now,
  );
  assert(r.ok);
  if (r.ok) assertEquals(subjectLine(r.data), '[Voiture] Audi A4 Avant r141306, essai – Nom (FR)');
});

Deno.test('Werkstatt und Kontakt: Betreff', () => {
  const a = validate({ ...contact, name: 'Nom', type: 'atelier', lang: 'de', reason: 'carrosserie', machine: 'VW Golf 2018', work: 'Kratzer' }, now);
  assert(a.ok);
  if (a.ok) assertEquals(subjectLine(a.data), '[Atelier] Carrosserie, VW Golf 2018 – Nom (DE)');
  const c = validate({ ...contact, name: 'Nom', type: 'contact', lang: 'lb', subject: 'depot', message: 'Moien' }, now);
  assert(c.ok);
  if (c.ok) assertEquals(subjectLine(c.data), '[Contact] Dépôt-vente – Nom (LB)');
});

Deno.test('Pflichtfelder und Einwilligung', () => {
  const r = validate({ type: 'contact', lang: 'fr', subject: 'autre', message: '', name: '', phone: '12', consent: '' }, now);
  assertEquals(r.ok ? [] : r.fields.sort(), ['consent', 'message', 'name', 'phone']);
});

Deno.test('E-Mail optional, aber wenn angegeben gültig', () => {
  assert(validate({ ...contact, type: 'contact', lang: 'fr', subject: 'autre', message: 'x', email: '' }, now).ok);
  const r = validate({ ...contact, type: 'contact', lang: 'fr', subject: 'autre', message: 'x', email: 'kein-at' }, now);
  assertEquals(r.ok ? [] : r.fields, ['email']);
});

Deno.test('Mailtext enthält keine Einwilligungs-Rohdaten und nennt die Sprache', () => {
  const r = validate({ ...contact, type: 'contact', lang: 'pt', subject: 'question', message: 'Olá' }, now);
  assert(r.ok);
  if (r.ok) {
    const t = mailText(r.data, now);
    assert(t.includes('Sujet : Question générale'));
    assert(t.includes('Répondre en : PT'));
    assert(!t.includes('consent'));
  }
});

Deno.test('Fehlerseite ohne JavaScript ist maskiert und in der Sprache', () => {
  const html = errorPage('de', ['name', '<x>'], 'https://www.rondpoint.lu/de/kontakt/');
  assert(html.includes('lang="de"'));
  assert(html.includes('Name'));
  assert(html.includes('&lt;x&gt;'));
});
