/**
 * Gliederung der Texte nach Seiten (Präfixe der Schlüssel; die erste passende Gruppe gewinnt).
 * Genutzt vom Dashboard (/admin/data.json) und vom LB-Export.
 */
export const TEXT_GROUPS: { id: string; de: string; prefixes: string[] }[] = [
  { id: 'home', de: 'Startseite', prefixes: ['hero.', 'offer.', 'services.', 'details.points.', 'about.', 'reviews.', 'faq.'] },
  { id: 'rental', de: 'Vermietung', prefixes: ['pages.rental.', 'pages.category.', 'content.rental.', 'content.category.', 'fleetTable.', 'categories.', 'finder.'] },
  { id: 'cars', de: 'Autos', prefixes: ['cars.', 'car.', 'depot.', 'content.cars.', 'enums.'] },
  { id: 'workshop', de: 'Atelier', prefixes: ['pages.workshop.', 'details.workshop.', 'content.workshop.'] },
  { id: 'sodablast', de: 'Sodablast', prefixes: ['pages.sodablast.', 'details.sodablast.', 'content.sodablast.'] },
  { id: 'garden', de: 'Jardin & forêt', prefixes: ['pages.garden.', 'details.garden.', 'content.garden.'] },
  { id: 'trailersForSale', de: 'Anhänger zu verkaufen', prefixes: ['pages.trailersForSale.', 'details.trailers.', 'content.trailersForSale.'] },
  { id: 'contact', de: 'Kontakt & Öffnungszeiten', prefixes: ['pages.contact.', 'access.', 'hours.', 'content.contact.', 'contactBar.'] },
  { id: 'forms', de: 'Formulare', prefixes: ['forms.'] },
  { id: 'layout', de: 'Menü, Footer, Bildtexte', prefixes: ['nav.', 'footer.', 'status.', 'meta.', 'photos.'] },
  { id: 'legal', de: 'Impressum & Datenschutz', prefixes: ['legal.', 'privacy.', 'pages.thanks.', 'pages.notFound.'] },
  { id: 'seo', de: 'Google: Titel und Beschreibungen', prefixes: ['seo.'] },
];

/** Schlüssel in Gruppen einteilen; was nirgends passt, landet in „other“ */
export function groupKeys(keys: string[], withSeo = true): { id: string; de: string; keys: string[] }[] {
  const groups = TEXT_GROUPS.filter((g) => withSeo || g.id !== 'seo').map((g) => ({ id: g.id, de: g.de, keys: [] as string[] }));
  const other = { id: 'other', de: 'Sonstiges', keys: [] as string[] };
  for (const k of keys) {
    if (!withSeo && k.startsWith('seo.')) continue;
    const i = TEXT_GROUPS.filter((g) => withSeo || g.id !== 'seo').findIndex((g) => g.prefixes.some((p) => k.startsWith(p)));
    (i >= 0 ? groups[i] : other).keys.push(k);
  }
  return [...groups, other].filter((g) => g.keys.length);
}
