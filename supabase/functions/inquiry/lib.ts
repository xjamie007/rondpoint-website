/**
 * Reine Logik der Edge Function `inquiry` (F): Prüfung je Typ, Betreffzeile, Mailtext.
 * Keine Abhängigkeit von Supabase, damit sie mit `deno test` prüfbar ist.
 */
import { z } from 'npm:zod@4.6.5';

export const LANGS = ['fr', 'de', 'lb', 'en', 'pt'] as const;
export type Lang = (typeof LANGS)[number];

export const THANKS_PATH: Record<Lang, string> = {
  fr: '/fr/merci/',
  de: '/de/danke/',
  lb: '/lb/merci/',
  en: '/en/thank-you/',
  pt: '/pt/obrigado/',
};

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const optText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

export function todayInLuxembourg(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Luxembourg' }).format(now);
}

const base = {
  lang: z.enum(LANGS),
  name: z.string().trim().min(1).max(120),
  phone: z
    .string()
    .trim()
    .max(40)
    .refine((v) => v.replace(/\D/g, '').length >= 6, 'phoneInvalid'),
  email: z
    .string()
    .trim()
    .max(160)
    .optional()
    .transform((v) => (v ? v : undefined))
    .refine((v) => v === undefined || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v), 'email'),
  consent: z.literal('yes'),
};

export function schemas(today: string) {
  const notPast = isoDate.refine((d) => d >= today, 'past');
  return {
    location: z
      .object({
        ...base,
        type: z.literal('location'),
        vehicle: z.string().trim().min(1).max(80),
        vehicleName: optText(120),
        from: notPast,
        to: notPast,
        licence: z.enum(['', 'B', 'B96', 'BE']).optional().transform((v) => v || undefined),
        cargo: z
          .enum(['', 'voiture', 'moto', 'terre', 'fete', 'meubles', 'materiel'])
          .optional()
          .transform((v) => v || undefined),
        message: optText(3000),
      })
      .refine((d) => d.to >= d.from, { path: ['to'], message: 'toBeforeFrom' }),
    voiture: z.object({
      ...base,
      type: z.literal('voiture'),
      ref: z.string().trim().min(1).max(40),
      car: z.string().trim().min(1).max(240),
      carTitle: optText(200),
      wish: z.enum(['essai', 'info', 'reprise']),
      tradeMake: optText(120),
      tradeYear: optText(4),
      tradeKm: optText(9),
      message: optText(3000),
    }),
    atelier: z.object({
      ...base,
      type: z.literal('atelier'),
      reason: z.enum(['entretien', 'panne', 'carrosserie', 'sodablast', 'jardin']),
      machine: z.string().trim().min(1).max(160),
      work: z.string().trim().min(1).max(3000),
      date: z
        .union([z.literal(''), notPast])
        .optional()
        .transform((v) => v || undefined),
    }),
    contact: z.object({
      ...base,
      type: z.literal('contact'),
      subject: z.enum(['question', 'remorque', 'depot', 'autre']),
      message: z.string().trim().min(1).max(3000),
    }),
  };
}

export type Inquiry =
  | z.infer<ReturnType<typeof schemas>['location']>
  | z.infer<ReturnType<typeof schemas>['voiture']>
  | z.infer<ReturnType<typeof schemas>['atelier']>
  | z.infer<ReturnType<typeof schemas>['contact']>;

export type ValidationResult = { ok: true; data: Inquiry } | { ok: false; fields: string[] };

export function validate(input: Record<string, string>, now = new Date()): ValidationResult {
  const s = schemas(todayInLuxembourg(now));
  const type = input.type as keyof typeof s;
  if (!(type in s)) return { ok: false, fields: ['type'] };
  const r = s[type].safeParse(input);
  if (r.success) return { ok: true, data: r.data as Inquiry };
  return { ok: false, fields: [...new Set(r.error.issues.map((i) => String(i.path[0] ?? 'form')))] };
}

const WISH_FR: Record<string, string> = { essai: 'essai', info: 'informations', reprise: 'reprise' };
const REASON_FR: Record<string, string> = {
  entretien: 'Entretien',
  panne: 'Panne ou réparation',
  carrosserie: 'Carrosserie',
  sodablast: 'Sodablast',
  jardin: 'Machine de jardin ou forêt',
};
const SUBJECT_FR: Record<string, string> = {
  question: 'Question générale',
  remorque: 'Achat de remorque',
  depot: 'Dépôt-vente',
  autre: 'Autre',
};

const dm = (iso: string) => `${iso.slice(8, 10)}.${iso.slice(5, 7)}.`;
const dmy = (iso: string) => `${dm(iso)}${iso.slice(0, 4)}`;

/**
 * Betreff, damit die Garage im Posteingang sortieren kann:
 *  [Location] Porte-voiture 2,7 t, 12.10.–13.10.2026 – Nom (PT)
 *  [Voiture] Audi A4 Avant r141306, essai – Nom (FR)
 *  [Atelier] Carrosserie, VW Golf 2018 – Nom (DE)
 *  [Contact] Dépôt-vente – Nom (LB)
 */
export function subjectLine(d: Inquiry): string {
  const who = `${d.name} (${d.lang.toUpperCase()})`;
  const clip = (s: string, n = 60) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
  switch (d.type) {
    case 'location':
      return `[Location] ${clip(d.vehicleName ?? d.vehicle)}, ${dm(d.from)}–${dmy(d.to)} – ${who}`;
    case 'voiture': {
      const ref = /^\d+$/.test(d.ref) ? `r${d.ref}` : d.ref;
      return `[Voiture] ${clip(d.carTitle ?? d.car)} ${ref}, ${WISH_FR[d.wish]} – ${who}`;
    }
    case 'atelier':
      return `[Atelier] ${REASON_FR[d.reason]}, ${clip(d.machine)} – ${who}`;
    case 'contact':
      return `[Contact] ${SUBJECT_FR[d.subject]} – ${who}`;
  }
}

const LABEL_FR: Record<string, string> = {
  name: 'Nom',
  phone: 'Téléphone',
  email: 'E-mail',
  lang: 'Langue du client',
  vehicle: 'Remorque ou véhicule',
  vehicleName: 'Nom du véhicule',
  from: 'Du',
  to: 'Au',
  licence: 'Permis',
  cargo: 'Transporte',
  car: 'Voiture',
  carTitle: 'Titre',
  ref: 'Réf.',
  wish: 'Souhaite',
  tradeMake: 'Reprise : marque et modèle',
  tradeYear: 'Reprise : année',
  tradeKm: 'Reprise : kilométrage',
  reason: 'Pour quoi',
  machine: 'Véhicule ou machine',
  work: 'Travail',
  date: 'Date souhaitée',
  subject: 'Sujet',
  message: 'Message',
};

export function mailText(d: Inquiry, receivedAt: Date): string {
  const lines: string[] = [];
  for (const [k, v] of Object.entries(d)) {
    if (k === 'type' || k === 'consent' || v == null || v === '') continue;
    let val = String(v);
    if (k === 'wish') val = WISH_FR[val] ?? val;
    if (k === 'reason') val = REASON_FR[val] ?? val;
    if (k === 'subject') val = SUBJECT_FR[val] ?? val;
    if ((k === 'from' || k === 'to' || k === 'date') && /^\d{4}-\d{2}-\d{2}$/.test(val)) val = dmy(val);
    lines.push(`${LABEL_FR[k] ?? k} : ${val}`);
  }
  lines.push('');
  lines.push(`Reçu le ${receivedAt.toLocaleString('fr-LU', { timeZone: 'Europe/Luxembourg' })} via rondpoint.lu.`);
  lines.push(`Répondre en : ${d.lang.toUpperCase()}. Le client a accepté l'utilisation de ses données pour cette demande.`);
  return lines.join('\n');
}

/* Meldungen für die Fehlerseite ohne JavaScript */
export const ERROR_PAGE: Record<Lang, { title: string; text: string; back: string; call: string; rate: string }> = {
  fr: {
    title: 'Votre demande n’a pas pu être envoyée',
    text: 'Vérifiez ces champs :',
    back: 'Retour au formulaire',
    call: 'Ou appelez-nous au +352 81 05 41.',
    rate: 'Vous avez envoyé beaucoup de demandes aujourd’hui. Appelez-nous au +352 81 05 41.',
  },
  de: {
    title: 'Ihre Anfrage wurde nicht gesendet',
    text: 'Bitte prüfen Sie diese Felder:',
    back: 'Zurück zum Formular',
    call: 'Oder rufen Sie uns an: +352 81 05 41.',
    rate: 'Sie haben heute schon viele Anfragen gesendet. Rufen Sie uns an: +352 81 05 41.',
  },
  lb: {
    title: 'Är Ufro gouf net geschéckt',
    text: 'Kuckt w.e.g. dës Felder no:',
    back: 'Zréck bei de Formulaire',
    call: 'Oder rufft eis un: +352 81 05 41.',
    rate: 'Dir hutt haut scho vill Ufroe geschéckt. Rufft eis un: +352 81 05 41.',
  },
  en: {
    title: 'Your request was not sent',
    text: 'Please check these fields:',
    back: 'Back to the form',
    call: 'Or call us on +352 81 05 41.',
    rate: 'You have sent many requests today. Please call us on +352 81 05 41.',
  },
  pt: {
    title: 'O seu pedido não foi enviado',
    text: 'Verifique estes campos:',
    back: 'Voltar ao formulário',
    call: 'Ou ligue-nos: +352 81 05 41.',
    rate: 'Já enviou muitos pedidos hoje. Ligue-nos: +352 81 05 41.',
  },
};

export const FIELD_NAMES: Record<Lang, Record<string, string>> = {
  fr: { name: 'Nom', phone: 'Téléphone', email: 'E-mail', consent: 'Consentement', vehicle: 'Remorque ou véhicule', from: 'Du', to: 'Au', wish: 'Vous souhaitez', reason: 'Pour quoi ?', machine: 'Véhicule ou machine', work: 'Que faut-il faire ?', date: 'Date souhaitée', subject: 'Sujet', message: 'Message' },
  de: { name: 'Name', phone: 'Telefon', email: 'E-Mail', consent: 'Einwilligung', vehicle: 'Anhänger oder Fahrzeug', from: 'Von', to: 'Bis', wish: 'Sie möchten', reason: 'Wofür?', machine: 'Fahrzeug oder Maschine', work: 'Was ist zu tun?', date: 'Wunschtermin', subject: 'Betreff', message: 'Nachricht' },
  lb: { name: 'Numm', phone: 'Telefon', email: 'E-Mail', consent: 'Averständnis', vehicle: 'Unhänger oder Gefier', from: 'Vum', to: 'Bis', wish: 'Dir wëllt', reason: 'Fir wat?', machine: 'Gefier oder Maschinn', work: 'Wat ass ze maachen?', date: 'Wonschdatum', subject: 'Sujet', message: 'Message' },
  en: { name: 'Name', phone: 'Phone', email: 'Email', consent: 'Consent', vehicle: 'Trailer or vehicle', from: 'From', to: 'To', wish: 'You would like', reason: 'What for?', machine: 'Vehicle or machine', work: 'What needs doing?', date: 'Preferred date', subject: 'Subject', message: 'Message' },
  pt: { name: 'Nome', phone: 'Telefone', email: 'E-mail', consent: 'Consentimento', vehicle: 'Atrelado ou veículo', from: 'De', to: 'Até', wish: 'Pretende', reason: 'Para quê?', machine: 'Veículo ou máquina', work: 'O que é preciso fazer?', date: 'Data pretendida', subject: 'Assunto', message: 'Mensagem' },
};

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export function errorPage(lang: Lang, fields: string[], backUrl: string | null, rate = false): string {
  const m = ERROR_PAGE[lang];
  const names = fields.map((f) => FIELD_NAMES[lang][f] ?? f);
  const hl = lang === 'pt' ? 'pt-PT' : lang;
  return `<!doctype html><html lang="${hl}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${esc(m.title)}</title><style>body{font-family:Arial,sans-serif;max-width:40rem;margin:0 auto;padding:40px 16px;line-height:1.5;color:#000;background:#fff}h1{font-size:1.75rem}a{color:#b5480a}</style></head><body><h1>${esc(m.title)}</h1>${
    rate ? `<p>${esc(m.rate)}</p>` : `<p>${esc(m.text)}</p><ul>${names.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>`
  }${backUrl ? `<p><a href="${esc(backUrl)}">${esc(m.back)}</a></p>` : ''}<p>${esc(m.call)}</p></body></html>`;
}
