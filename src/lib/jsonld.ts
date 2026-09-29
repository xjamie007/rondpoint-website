/**
 * Strukturierte Daten (G3). Alles entspricht dem sichtbaren Inhalt.
 * Keine AggregateRating, keine Review.
 */
import { site, openingHoursSpecification } from './site.ts';
import type { CarView } from './stock.ts';
import type { FleetItem } from './fleet.ts';

export const SITE_ORIGIN = 'https://www.rondpoint.lu';
export const ORG_ID = `${SITE_ORIGIN}/#garage`;

const PAYMENT_LABEL: Record<string, string> = {
  cash: 'Cash',
  visa: 'Visa',
  mastercard: 'Mastercard',
  vpay: 'V PAY',
  payconiq: 'Payconiq',
  applepay: 'Apple Pay',
  paypal: 'PayPal',
  transfer: 'Bank transfer',
};

export function organization() {
  const org: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['AutoDealer', 'AutoRepair'],
    '@id': ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    telephone: site.phone.display,
    email: site.email,
    vatID: site.vat,
    foundingDate: site.registered,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.locality,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.googleProfileUrl,
    areaServed: ['Erpeldange-sur-Sûre', 'Ettelbruck', 'Diekirch', 'Nordstad'],
    knowsLanguage: ['lb', 'fr', 'de', 'en', 'pt'],
    sameAs: [site.social.facebook, site.social.instagram, site.portals.luxauto, site.portals.autoscout24],
    openingHoursSpecification: openingHoursSpecification(),
  };
  if (site.payment.confirmed) org.paymentAccepted = site.payment.methods.map((m) => PAYMENT_LABEL[m]).join(', ');
  return org;
}

export function breadcrumbs(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: new URL(it.url, SITE_ORIGIN).toString(),
    })),
  };
}

/** Nur Fragen mit echter Antwort (ohne Platzhalter). */
export function faqPage(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

const FUEL_SCHEMA: Record<string, string> = {
  petrol: 'Gasoline',
  diesel: 'Diesel',
  hybrid: 'Hybrid',
  plugin_hybrid: 'Plug-in hybrid',
  electric: 'Electric',
  lpg: 'LPG',
};

export function car(v: CarView, opts: { url: string; images: string[]; bodyLabel: string; transmissionLabel: string }) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: [v.make, v.model, v.version].filter(Boolean).join(' '),
    url: new URL(opts.url, SITE_ORIGIN).toString(),
    brand: { '@type': 'Brand', name: v.make },
    model: v.model,
    itemCondition: v.condition === 'new' ? 'https://schema.org/NewCondition' : 'https://schema.org/UsedCondition',
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: v.mileageKm, unitCode: 'KMT' },
    vehicleTransmission: opts.transmissionLabel,
    bodyType: opts.bodyLabel,
    image: opts.images.map((u) => new URL(u, SITE_ORIGIN).toString()),
    offers: {
      '@type': 'Offer',
      price: v.priceEur,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      itemCondition: v.condition === 'new' ? 'https://schema.org/NewCondition' : 'https://schema.org/UsedCondition',
      seller: { '@id': ORG_ID },
    },
  };
  if (v.version) data.vehicleConfiguration = v.version;
  if (v.modelYear) data.vehicleModelDate = String(v.modelYear);
  if (v.firstRegistration) data.dateVehicleFirstRegistered = v.firstRegistration;
  if (v.fuel !== 'other') data.fuelType = FUEL_SCHEMA[v.fuel];
  if (v.seats) data.seatingCapacity = v.seats;
  if (v.colorExterior) data.color = v.colorExterior;
  if (v.powerKw) {
    data.vehicleEngine = {
      '@type': 'EngineSpecification',
      enginePower: { '@type': 'QuantitativeValue', value: v.powerKw, unitCode: 'KWT' },
      ...(v.displacementCc ? { engineDisplacement: { '@type': 'QuantitativeValue', value: v.displacementCc, unitCode: 'CMQ' } } : {}),
    };
  }
  return data;
}

/** Vermietung: Service mit provider = @id; offers nur mit echten Preisen. */
export function rentalService(opts: { name: string; serviceType: string; url: string; items: FleetItem[] }) {
  const offers = opts.items
    .filter((i) => i.priceDay != null)
    .map((i) => ({
      '@type': 'Offer',
      name: i.name,
      price: i.priceDay,
      priceCurrency: 'EUR',
      unitText: 'DAY',
    }));
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    serviceType: opts.serviceType,
    url: new URL(opts.url, SITE_ORIGIN).toString(),
    provider: { '@id': ORG_ID },
    areaServed: ['Erpeldange-sur-Sûre', 'Ettelbruck', 'Diekirch', 'Nordstad'],
    ...(offers.length ? { offers } : {}),
  };
}
