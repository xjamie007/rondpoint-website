import type { Dict } from './fr.ts';

/** Lëtzebuergesch – Entwurf. review: "native" – jeder Text muss von einer Muttersprachlerin/einem Muttersprachler geprüft werden. */
const lb: Dict = {
  meta: {
    lang: 'Lëtzebuergesch',
    siteName: 'Garage Um Rond Point',
    ogAlt: 'Garage Um Rond Point um Rond-point zu Ierpeldeng',
  },

  nav: {
    skip: 'Direkt bei den Inhalt',
    main: 'Haaptnavigatioun',
    rental: 'Lounen',
    cars: 'Autoen',
    workshop: 'Atelier',
    trailersForSale: 'Unhänger kafen',
    garden: 'Gaart & Bësch',
    contact: 'Kontakt',
    menu: 'Menü',
    close: 'Zoumaachen',
    langLabel: 'Sprooch',
    callAria: '+352 81 05 41 uruffen',
    home: 'Haaptsäit',
    breadcrumb: 'Navigatiounspad',
    logoAria: 'Garage Um Rond Point, Haaptsäit',
  },

  contactBar: {
    label: 'Direktkontakt',
    call: 'Uruffen',
    whatsapp: 'WhatsApp',
    ask: 'Ufroen',
    whatsappText: 'Moien, ech hunn eng Fro un d’Garage Um Rond Point.',
  },

  status: {
    stock: { one: '{n} Auto am Stock.', other: '{n} Autoen am Stock.' },
    updatedToday: 'Lëscht haut ëm {time} aktualiséiert.',
    updatedYesterday: 'Lëscht gëschter ëm {time} aktualiséiert.',
    updatedOn: 'Lëscht aktualiséiert: {date} ëm {time}.',
    never: 'D’Lëscht mat eisen Autoen ass geschwënn do.',
    everyMorning: 'D’Lëscht vun den Autoe gëtt all Moien aktualiséiert.',
  },

  hero: {
    h1: 'D’Garage um Rond-point zu Ierpeldeng',
    sub: 'Lount en Unhänger oder eng Camionnette, fannt Ären nächsten Auto. Dir fannt eis op 1, rue du Viaduc, nieft der Aral-Tankstell, tëscht Ettelbréck an Angelduerf.',
    ctaFinder: 'Unhänger fannen',
    ctaCars: 'Autoe kucken',
    drawingAlt: 'Plang vum Rond-point zu Ierpeldeng mat der Plaz vun der Garage nieft der Aral-Tankstell',
  },

  finder: {
    h2: 'Wat fir en Unhänger braucht Dir?',
    intro:
      'Sot eis, wat Dir transportéiert a wat fir e Führerschäin Dir hutt. Dir gesitt direkt, wéi eng Unhänger passen, wat se kaschten an ob Äre Führerschäin duergeet.',
    cargoLegend: 'Wat transportéiert Dir?',
    cargo: {
      voiture: 'Een Auto',
      moto: 'Eng Moto',
      terre: 'Buedem, Bauschutt oder Gréngschnëtt',
      fete: 'Gedrénks an Iessen fir e Fest',
      meubles: 'Miwwelen oder Karton',
      materiel: 'Material oder Maschinnen',
    },
    licenceLegend: 'Wat fir e Führerschäin hutt Dir?',
    licence: {
      B: 'Führerschäin B',
      B96: 'Führerschäin B mam Code 96',
      BE: 'Führerschäin BE',
      unknown: 'Ech weess et net',
    },
    exactSummary: 'Genee fir Ären Auto ausrechnen (fakultativ)',
    f2: 'Zoulässegt Gesamtgewiicht vun Ärem Auto (Feld F.2)',
    o1: 'Unhängelaascht gebremst (Feld O.1)',
    o2: 'Unhängelaascht ongebremst (Feld O.2)',
    kg: 'kg',
    exactHint: 'Dës Zuele fannt Dir op der Carte grise vun Ärem Auto.',
    fleetCount: { one: '{n} Unhänger an eiser Flott', other: '{n} Unhänger an eiser Flott' },
    matchCount: { one: '{n} Unhänger passt', other: '{n} Unhänger passen' },
    none: 'Fir dës Kombinatioun passt keen Unhänger. Rufft eis un op +352 81 05 41, mir beroden Iech.',
    vansHeading: 'Camionnetten',
    vanStatement: 'Eng Camionnette bis 3.500 kg zoulässegt Gesamtgewiicht fuert Dir mam Führerschäin B.',
    specs: {
      payload: 'Notzlaascht',
      mma: 'Zoulässegt Gesamtgewiicht',
      empty: 'Eidelgewiicht',
      surface: 'Luedfläch',
      height: 'Luedhéicht',
      braked: 'Gebremst',
      yes: 'jo',
      no: 'nee',
      socket: 'Stecker',
      socketValue: '{n}-poleg',
      deposit: 'Kautioun',
      volume: 'Bannevolumen',
      temp: 'Temperatur',
      power: 'Stroumversuergung',
    },
    pallets: { one: '{n} Europalett', other: '{n} Europaletten' },
    volumeText: 'Bannevolumen {m3} m³',
    diagramLabel: 'Luedfläch {l} × {w} m',
    diagramPallets: '{n} Europaletten',
    verdict: {
      ok: 'Äre Führerschäin geet duer.',
      needB96orBE: 'Dir braucht de Code 96 oder de Führerschäin BE.',
      needBE: 'Dir braucht de Führerschäin BE.',
      dependsB:
        'Mam Führerschäin B dierfen Auto an Unhänger zesummen net méi wéi 3.500 kg weien. Gitt d’Gewiicht vun Ärem Auto (F.2) un, da wësst Dir et.',
      dependsB96:
        'Mam Code 96 dierfen Auto an Unhänger zesummen net méi wéi 4.250 kg weien. Gitt d’Gewiicht vun Ärem Auto (F.2) un, da wësst Dir et.',
      required: 'Néidege Führerschäin: {licence}',
      requiredDepends: 'Néidege Führerschäin: je no Auto B, B96 oder BE',
      towLimit: 'Voll gelueden ass dësen Unhänger méi schwéier, wéi Ären Auto zéien däerf ({limite} kg).',
    },
    licenceShort: { B: 'B', B96: 'B mam Code 96', BE: 'BE' },
    price: '{day} pro Dag, {weekend} pro Weekend',
    priceMissing: '[FEHLT — Preis pro Tag und Wochenende]',
    request: 'Dësen Unhänger ufroen',
    requestVan: 'Dës Camionnette ufroen',
    seeAll: 'Déi ganz Flott kucken',
    finePrint:
      'Dës Angab baséiert op de Führerschäinreegelen zu Lëtzebuerg (transports.public.lu). Wann Dir net sécher sidd, frot eis, ier Dir lassfuert.',
    sourceLink: 'Führerschäinreegelen op transports.public.lu',
    empty: 'D’Lëscht mat eisen Unhänger kënnt geschwënn. Rufft eis un op +352 81 05 41.',
    noJsRules:
      'Mam Führerschäin B dierft Dir en Unhänger bis 750 kg zoulässegt Gesamtgewiicht zéien, oder e méi schwéieren Unhänger, wann Auto an Unhänger zesummen net méi wéi 3.500 kg weien. Mam Code 96 sinn zesumme bis zu 4.250 kg erlaabt. Doriwwer braucht Dir de Führerschäin BE.',
  },

  fleetTable: {
    h2: 'Eis ganz Flott',
    caption: 'Eis Unhänger a Camionnetten fir ze lounen',
    kind: 'Typ',
    payload: 'Notzlaascht',
    mma: 'Zoulässegt Gesamtgewiicht',
    surface: 'Luedfläch',
    licence: 'Néidege Führerschäin',
    day: 'Präis pro Dag',
    weekend: 'Präis pro Weekend',
    licenceDepends: 'je no Auto',
  },

  categories: {
    'porte-voiture': 'Autosunhänger',
    'porte-moto': 'Motosunhänger',
    benne: 'Kipper',
    frigorifique: 'Killunhänger',
    plateau: 'Plattformunhänger',
    fourgon: 'Kofferunhänger',
    camionnette: 'Camionnette',
    voiture: 'Auto',
  },

  cars: {
    homeH2: 'Eis Autoen am Stock',
    h1: 'Nei Autoen an Occasiounen',
    lead: 'All d’Autoen am Stock vun der Garage Um Rond Point, um Rond-point zu Ierpeldeng. Rufft eis un oder schreift eis op WhatsApp, ier Dir laanschtkommt. Probefaarten op Rendez-vous.',
    seeAll: { one: 'Den Auto kucken', other: 'All {n} Autoe kucken' },
    year: 'Joer',
    km: 'Kilometer',
    fuel: 'Brennstoff',
    tagFresh: 'Nei am Stock',
    tagNew: 'Neiwon',
    price: 'Präis',
    noPhoto: 'Foto kënnt nach',
    empty: 'Am Moment ass keen Auto am Stock. Rufft eis un op +352 81 05 41.',
    filter: {
      summary: 'Filter ({n})',
      legend: 'Autoe filteren',
      make: 'Mark',
      fuel: 'Brennstoff',
      gearbox: 'Schaltung',
      maxPrice: 'Maximalpräis',
      condition: 'Zoustand',
      sort: 'Sortéierung',
      all: 'All',
      any: 'All',
      conditionNew: 'Nei',
      conditionUsed: 'Occasioun',
      sortRecent: 'Neiste fir d’éischt',
      sortPriceAsc: 'Präis: bëllegst fir d’éischt',
      sortPriceDesc: 'Präis: deierst fir d’éischt',
      sortKmAsc: 'Kilometer: mannst fir d’éischt',
      count: { one: '{n} Auto', other: '{n} Autoen' },
      empty: 'Keen Auto passt zu dëse Filteren.',
      reset: 'Filteren zrécksetzen',
      apply: 'Resultater weisen',
      upTo: 'bis {price}',
    },
  },

  enums: {
    fuel: {
      petrol: 'Bensin',
      diesel: 'Diesel',
      hybrid: 'Hybrid',
      plugin_hybrid: 'Plug-in-Hybrid',
      electric: 'Elektresch',
      lpg: 'Autogas',
      other: 'Aner',
    },
    transmission: { automatic: 'Automatesch', manual: 'Manuell', other: 'Aner' },
    body: {
      estate: 'Break',
      saloon: 'Limousine',
      suv: 'SUV / 4x4',
      city: 'Klengwon',
      coupe: 'Coupé',
      convertible: 'Cabriolet',
      mpv: 'Monospace',
      van: 'Notzfuerzeug',
      pickup: 'Pick-up',
      other: 'Aner',
    },
    condition: { new: 'Nei', used: 'Occasioun' },
    /** Farben aus den Inseraten (französisch) → Anzeige; unbekannte bleiben im Original */
    colors: {
      noir: 'Schwaarz',
      blanc: 'Wäiss',
      gris: 'Gro',
      argent: 'Sëlwer',
      bleu: 'Blo',
      rouge: 'Rout',
      vert: 'Gréng',
      jaune: 'Giel',
      orange: 'Orange',
      marron: 'Brong',
      brun: 'Brong',
      beige: 'Beige',
      bordeaux: 'Bordeaux',
      violet: 'Mof',
      or: 'Gold',
      anthracite: 'Anthrazit',
    },
  },

  car: {
    specsH2: 'Technesch Donnéeën',
    firstReg: 'Éischt Zouloossung',
    mileage: 'Kilometerstand',
    fuel: 'Brennstoff',
    gearbox: 'Schaltung',
    power: 'Leeschtung',
    powerUnit: 'PS',
    displacement: 'Hubraum',
    body: 'Karosserie',
    seats: 'Sëtzplazen',
    colorExt: 'Faarf baussen',
    colorInt: 'Faarf bannen',
    euro: 'Euro-Norm',
    wltp: 'Verbrauch an CO₂ (WLTP)',
    wltpMissing: 'Informatiounen an der Garage',
    ref: 'Ref.',
    notSpecified: 'net uginn',
    condition: 'Zoustand',
    vatRecoverable: 'TVA ofsetzbar',
    equipmentH2: 'Ausstattung',
    equipmentMore: 'Déi ganz Ausstattung kucken ({n})',
    descriptionH2: 'Beschreiwung',
    originalNote: 'Original-Beschreiwung op Franséisch',
    originalListNote: 'Original-Lëscht op Franséisch',
    contactH2: 'Interesséiert Dir Iech fir dësen Auto?',
    contactText: 'Rufft eis un, schreift eis op WhatsApp oder schéckt eis Är Ufro.',
    whatsappText: 'Moien, ass dësen Auto nach disponibel: {make} {model} (Ref. {id})?',
    similarH2: 'Ähnlech Autoen',
    sodablast: 'Fir en alen Auto bidde mir och Sodablast un.',
    sold: 'Dësen Auto ass verkaaft oder net méi am Stock.',
    backToList: 'All eis Autoe kucken',
    gallery: {
      label: 'Fotoen: {make} {model}',
      counter: '{i} / {n}',
      prev: 'Vireg Foto',
      next: 'Nächst Foto',
      open: 'Fotoe grouss weisen',
      close: 'Zoumaachen',
      thumbs: 'Miniaturen',
      thumb: 'Foto {i}',
      alt: '{make} {model} {version}, Foto {i} vun {n}',
    },
  },

  photos: {
    heroWorkshop: 'Schwaarzen Auto an engem modernen, hellen Atelier',
    workshop: 'Mecanicien bei der Aarbecht am Motorraum vun engem Auto',
    sodablast: 'Rastegen Oldtimer mat ofgeblättertem Lack',
    bodywork: 'Rouden Sportsauto op enger Hiefbün an engem Atelier',
    garden: 'Benzinsrasemeeër op engem Wuess',
    gardenPage: 'Gras méien an der Sonn',
    paint: 'Lackéiere vun enger Karosserie mat der Sprëtzpistoul',
    rental: 'Wäisse Pick-up op engem Plateau',
    trailersSale: 'Kippunhänger mat Gitteropsaz',
    fleetAlt: 'Foto: {name}',
    creditsH2: 'Beispillfotoen',
    credits: 'Beispillfotoen ënner fräier Lizenz:',
  },
  services: {
    h2: 'Eis aner Servicer',
    workshop: {
      h3: 'Atelier',
      text: 'Entretien, Diagnos a Reparatur vun Ärem Auto oder Ärer Camionnette. No engem klengen Accident reparéiere mir Äert Gefier a lackéieren et nei.',
      link: 'Mechanik a Karosserie',
    },
    sodablast: {
      h3: 'Sodablast',
      text: 'Beim Sodablast sprëtze mir Natron op d’Uewerfläch a maachen esou Lack, Fett an Dreck ewech. Dës mëll Method beschiedegt keng empfindlech Uewerflächen: al Karosserien, Felgen, mechanesch Deeler.',
      link: 'Méi iwwer Sodablast',
    },
    garden: {
      h3: 'Gaart & Bësch',
      text: 'Mir verkafen a reparéieren Gaart- a Bëschmaschinnen, virun allem vun de Marken Honda a Stihl.',
      link: 'Gaart- a Bëschmaschinnen',
    },
    trailers: {
      h3: 'Unhänger kafen',
      text: 'Mir verkafen Unhänger vu Saris, Humbaur a WM Meyer, fir Privatleit a Betriber. Mir hëllefen Iech, en Unhänger ze wielen, deen Ären Auto zéie kann an deen Dir mat Ärem Führerschäin fueren dierft.',
      link: 'Eis Unhänger zum Verkaf',
    },
    photoMissing: '[FEHLT — Foto]',
  },

  reviews: {
    h2: 'Google-Bewäertungen',
    link: 'All Bewäertungen op Google liesen',
    missing: '[FEHLT — 2–3 vom Kunden freigegebene Zitate aus dem Google-Profil, mit Vorname + Initiale und Monat/Jahr]',
  },

  faq: {
    h2: 'Froen & Äntwerten',
    rentalH2: 'Froen zum Lounen',
    items: {
      permis: {
        q: 'Wat fir e Führerschäin brauch ech, fir en Unhänger ze zéien?',
        a: 'Mam Führerschäin B dierft Dir en Unhänger bis 750 kg zoulässegt Gesamtgewiicht zéien. E méi schwéieren Unhänger ass erlaabt, wann Auto an Unhänger zesummen net méi wéi 3.500 kg weien. Mam Code 96 op Ärem Führerschäin B dierfen Auto an Unhänger zesumme bis zu 4.250 kg weien. Doriwwer braucht Dir de Führerschäin BE. Domat dierft Dir en Unhänger bis 3.500 kg zéien.',
      },
      carte: {
        q: 'Wou gesinn ech, wat mäin Auto zéien däerf?',
        a: 'Op der Carte grise: D’Feld O.1 weist d’Unhängelaascht mat Bremsen, d’Feld O.2 d’Unhängelaascht ouni Bremsen. Dat zoulässegt Gesamtgewiicht vun Ärem Auto steet am Feld F.2.',
      },
      prix: {
        q: 'Wat kascht et, en Unhänger ze lounen?',
        a: 'De Präis pro Dag a pro Weekend steet bei all Unhänger an eiser Unhängersich. [FEHLT — Preise der Flotte]',
      },
      louer: {
        q: 'Wat brauch ech, fir ze lounen?',
        a: '[FEHLT — Mietbedingungen: Ausweis, Führerschein, Kaution, Stecker 7- oder 13-polig]',
      },
      reserver: {
        q: 'Muss ech am Viraus reservéieren?',
        a: '[FEHLT — Reservierung, Abhol- und Rückgabezeiten]',
      },
      dispo: {
        q: 'Sinn d’Autoen op der Lëscht nach disponibel?',
        a: 'Mir aktualiséieren d’Lëscht all Moien. En Auto, deen am Laf vum Dag verkaaft gëtt, kann nach bis den Dag drop op der Lëscht stoen. Rufft eis un oder schreift eis op WhatsApp, ier Dir laanschtkommt.',
      },
      marques: {
        q: 'Reparéiert Dir all Marken?',
        a: 'Jo, eisen Atelier mécht den Entretien an d’Reparatur vun Autoen a Camionnetten, egal vu wéi enger Mark. [UNBESTÄTIGT — Werden alle Marken repariert?]',
      },
      depot: {
        q: 'Kënnt Dir mäin Auto fir mech verkafen?',
        a: 'Jo, am Kommissiounsverkaf: Mir bidden Ären Auto zum Verkaf un a bréngen Iech mat Keefer a Kontakt. Schwätzt mat eis iwwer d’Konditiounen, an der Garage oder um Telefon.',
      },
      langues: {
        q: 'Wéi eng Sprooche schwätzt Dir?',
        a: 'Lëtzebuergesch, Franséisch, Däitsch, Englesch a Portugisesch.',
      },
      paiement: {
        q: 'Wéi kann ech bezuelen?',
        a: 'Bar, mat Kaart (Visa, Mastercard oder V PAY), mat Payconiq, Apple Pay oder PayPal oder per Iwwerweisung. [UNBESTÄTIGT — Zahlungsmittel]',
      },
    },
  },

  access: {
    h2: 'Wéi Dir eis fannt',
    address: 'Adress',
    landmark: 'Um Rond-point, nieft der Aral-Tankstell, tëscht Ettelbréck an Dikrech.',
    hoursH3: 'Ëffnungszäiten',
    languagesH3: 'Sproochen',
    languages: 'Mir schwätze Lëtzebuergesch, Franséisch, Däitsch, Englesch a Portugisesch.',
    mapLink: 'Route op Google Maps',
    external: '(extern Websäit)',
    mapTitle: 'De Rond-point zu Ierpeldeng',
    osm: '© OpenStreetMap-Mataarbechter',
    osmLabel: 'Kaartendaten',
    labels: {
      garage: 'Garage Um Rond Point',
      aral: 'Aral',
      ettelbruck: 'Ettelbréck',
      diekirch: 'Dikrech',
      erpeldange: 'Ierpeldeng',
      rail: 'Eisebunn',
      sure: 'Sauer',
    },
  },

  hours: {
    caption: 'Ëffnungszäite vun der Garage Um Rond Point',
    day: 'Dag',
    time: 'Zäiten',
    days: {
      mo: 'Méindeg',
      tu: 'Dënschdeg',
      we: 'Mëttwoch',
      th: 'Donneschdeg',
      fr: 'Freideg',
      sa: 'Samschdeg',
      su: 'Sonndeg',
    },
    closed: 'Zou',
    today: 'haut',
    and: 'an',
    holidays: 'Feierdeeg: [UNBESTÄTIGT — Feiertage vermutlich geschlossen]',
    short: 'Méindeg bis Freideg {weekday}, Samschdeg {saturday}',
  },

  footer: {
    hoursH: 'Ëffnungszäiten',
    followH: 'Follegt eis',
    portals: 'Eis Annoncen och op {luxauto} an {autoscout}',
    legal: 'Impressum',
    privacy: 'Dateschutz',
    tiktokMissing: 'TikTok [UNBESTÄTIGT — genaue URL]',
  },

  depot: {
    h2: 'Wëllt Dir Ären Auto verkafen?',
    text: 'Am Kommissiounsverkaf bidde mir Ären Auto zum Verkaf un a bréngen Iech mat Keefer a Kontakt. Erzielt eis vun Ärem Auto, mir erklären Iech d’Konditiounen.',
    missing: '[FEHLT — Konditionen Kommissionsverkauf]',
    link: 'Mäin Auto ubidden',
  },

  pages: {
    rental: {
      h1: 'Unhänger a Camionnetten zu Ierpeldeng lounen',
      lead: 'Autos- a Motosunhänger, Kipper, Killunhänger fir Äert Fest, Camionnetten. Fir een Dag oder fir de Weekend.',
      durationsMissing: '[UNBESTÄTIGT — Mietdauern Tag / Wochenende]',
      conditionsH2: 'Lounbedéngungen',
      conditionsMissing:
        '[FEHLT — Mietbedingungen: Ausweis, Führerschein, Kaution, Abhol- und Rückgabezeiten, Reservierung]',
      formH2: 'Lounufro',
      formIntro: 'Wielt den Unhänger an d’Datumer. Mir ruffen Iech zréck, fir ze bestätegen.',
    },
    category: {
      h1: {
        'porte-voiture': 'Autosunhänger lounen zu Ierpeldeng',
        'porte-moto': 'Motosunhänger lounen zu Ierpeldeng',
        benne: 'Kipper lounen zu Ierpeldeng',
        frigorifique: 'Killunhänger lounen zu Ierpeldeng',
        camionnette: 'Camionnette lounen zu Ierpeldeng',
      },
      intro: {
        'porte-voiture':
          'Mam Autosunhänger transportéiert Dir e futtisen Auto, en Oldtimer oder en Auto, deen Dir grad kaaft hutt. Kuckt, ier Dir lassfuert, ob Ären Auto den Unhänger mat der Luedung zéien däerf an ob Äre Führerschäin duergeet.',
        'porte-moto':
          'Mam Motosunhänger bréngt Dir eng Moto, e Scooter oder e Quad an den Atelier, an d’Vakanz oder op d’Rennstreck. Fir en ze zéien, geet en normalen Auto duer.',
        benne:
          'Mam Kipper transportéiert Dir Buedem, Bauschutt, Sand oder Gréngschnëtt a kippt d’Luedung of. Fir e Chantier, fir de Gaart oder fir an de Recyclingszenter.',
        frigorifique:
          'De Killunhänger hält Gedrénks an Iessen wärend engem Fest, enger Hochzäit oder engem Festival frësch. Dir stellt de Killunhänger fir d’Dauer vum Fest op der Plaz of.',
        camionnette:
          'Mat der Camionnette plënnert Dir oder transportéiert Miwwelen oder Material. Bis 3.500 kg zoulässegt Gesamtgewiicht fuert Dir se mam Führerschäin B.',
      },
      vehiclesH2: 'Eis Gefierer',
      licenceH2: 'Wat fir e Führerschäin?',
      backToFinder: 'Mat all eisen Unhänger vergläichen',
    },
    workshop: {
      h1: 'Mechanik a Karosserie zu Ierpeldeng',
      lead: 'Entretien, Diagnos a Reparatur vun Ärem Auto oder Ärer Camionnette. No engem klengen Accident reparéiere mir Äert Gefier a lackéieren et nei.',
      whatH2: 'Dat mécht eisen Atelier',
      items: {
        entretien: 'Entretien a Revisioun',
        diagnostic: 'Feelerdiagnos',
        reparation: 'Mechanesch Reparaturen',
        carrosserie: 'Karosserie a Lack',
      },
      extraMissing:
        '[UNBESTÄTIGT — weitere Leistungen laut Editus: Richtbank, Smart Repair, Ausbeulen, Turbo, 4x4, Restaurierung alter Autos; erst nach Bestätigung zeigen]',
      transparency: 'Virun all Aarbecht erkläre mir Iech, wat mir maachen. Dir kritt eng detailléiert Rechnung.',
      transparencyMissing: '[UNBESTÄTIGT — Kostenvoranschlag vorher, detaillierte Rechnung?]',
      formH2: 'Rendez-vous ufroen',
      formIntro: 'Sot eis, ëm wat fir e Gefier et geet a wat ze maachen ass. Mir ruffen Iech zréck, fir e Rendez-vous auszemaachen.',
    },
    sodablast: {
      h1: 'Sodablast zu Ierpeldeng',
      lead: 'Beim Sodablast sprëtze mir Natron op d’Uewerfläch a maachen esou Lack, Fett an Dreck ewech. Dës mëll Method beschiedegt keng empfindlech Uewerflächen: al Karosserien, Felgen, mechanesch Deeler.',
      whatH2: 'Fir wat?',
      items: {
        carrosserie: 'Al Karosserien, virun enger Restauratioun',
        jantes: 'Felgen',
        pieces: 'Mechanesch Deeler',
      },
      photosH2: 'Virdrun an duerno',
      photosMissing: '[FEHLT — Vorher-nachher-Fotos Sodablast]',
      whatsapp: 'Schéckt eis Fotoen op WhatsApp fir eng éischt Aschätzung.',
      whatsappText: 'Moien, hei sinn e puer Fotoe fir eng éischt Aschätzung fir e Sodablast.',
      whatsappLink: 'Fotoen op WhatsApp schécken',
      formH2: 'Rendez-vous ufroen',
    },
    trailersForSale: {
      h1: 'Unhänger kafen zu Ierpeldeng',
      lead: 'Mir verkafen Unhänger vu Saris, Humbaur a WM Meyer, fir Privatleit a Betriber.',
      dealerMissing: '[UNBESTÄTIGT — Händlerstatus Saris, Humbaur, WM Meyer; Logos nur mit Freigabe]',
      adviceH2: 'Wéi en Unhänger mat wéi engem Führerschäin?',
      advice:
        'Mir hëllefen Iech, en Unhänger ze wielen, deen Ären Auto zéie kann an deen Dir mat Ärem Führerschäin fueren dierft: Gréisst, zoulässegt Gesamtgewiicht, Bremsen. Eis Unhängersich fir d’Lounen weist Iech d’Führerschäinreegele mat Beispiller.',
      adviceLink: 'Wéi en Unhänger mat wéi engem Führerschäin?',
      stockH2: 'Unhänger am Stock',
      stockMissing: '[FEHLT — Anhänger auf Lager]',
      formH2: 'Hutt Dir eng Fro zu engem Unhänger?',
    },
    garden: {
      h1: 'Gaart- a Bëschmaschinnen zu Ierpeldeng',
      lead: 'Mir verkafen a reparéieren Gaart- a Bëschmaschinnen, virun allem vun de Marken Honda a Stihl.',
      dealerMissing: '[UNBESTÄTIGT — Händlerstatus Honda und Stihl; Logos nur mit Freigabe]',
      whatH2: 'Verkaf a Reparatur',
      text: 'Rasemeeër, Fräischneider, Motorsee oder Heckeschéier: Bréngt Är Maschinn an den Atelier oder loosst Iech vun eis beroden, fir eng nei auszesichen.',
      formH2: 'Reparatur ufroen',
    },
    contact: {
      h1: 'Kontakt a Wee bei eis',
      lead: 'Garage Um Rond Point, 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre. Um Rond-point, nieft der Aral-Tankstell. Telefon +352 81 05 41, WhatsApp +352 621 373 272, info@rondpoint.lu. Mir schwätze Lëtzebuergesch, Franséisch, Däitsch, Englesch a Portugisesch.',
      waysH2: 'Esou erreecht Dir eis',
      phone: 'Telefon',
      whatsapp: 'WhatsApp',
      email: 'E-Mail',
      paymentH2: 'Bezuelen',
      payment: 'Bar, mat Kaart (Visa, Mastercard oder V PAY), mat Payconiq, Apple Pay oder PayPal oder per Iwwerweisung.',
      paymentMissing: '[UNBESTÄTIGT — Zahlungsmittel]',
      formH2: 'Schreift eis',
    },
    thanks: {
      h1: 'Är Ufro ass ukomm',
      text: 'Mir äntweren Iech [FEHLT — Antwortzeit, z. B. « le jour ouvrable suivant »]. Ass et dréngend? Rufft +352 81 05 41 un.',
      back: 'Zréck op d’Haaptsäit',
    },
    notFound: {
      h1: 'Säit net fonnt',
      text: 'Dës Säit gëtt et net oder net méi. E verkaaften Auto verschwënnt vun eiser Lëscht.',
    },
  },

  forms: {
    optional: 'fakultativ',
    name: 'Numm',
    phone: 'Telefon',
    phoneHint: 'Mir ruffen Iech zréck.',
    email: 'E-Mail',
    message: 'Message',
    consent:
      'Ech sinn domat averstanen, datt d’Garage Um Rond Point meng Donnéeë benotzt, fir op meng Ufro z’äntweren. Méi Informatiounen an der {link}.',
    consentLink: 'Dateschutzerklärung',
    honeypot: 'Fëllt dëst Feld net aus',
    choose: 'Wielt …',
    sending: 'Gëtt geschéckt …',
    successH: 'Är Ufro ass ukomm.',
    successText: 'Mir äntweren Iech sou séier wéi méiglech. Ass et dréngend? Rufft +352 81 05 41 un.',
    errorSummary: 'Iwwerpréift déi markéiert Felder.',
    errorSend: 'D’Ufro gouf net geschéckt. Probéiert et nach eng Kéier oder rufft eis un op +352 81 05 41.',
    errorRate: 'Dir hutt haut scho vill Ufroe geschéckt. Rufft eis un op +352 81 05 41.',
    fallbackH: 'Leschte Schrëtt: Är Ufro schécken',
    fallbackText: 'Wielt, wéi Dir eis d’Ufro schéckt. Äre Message ass scho fäerdeg geschriwwen, Dir musst en just nach schécken.',
    fallbackWhatsapp: 'Iwwer WhatsApp schécken',
    fallbackMail: 'Per E-Mail schécken',
    fallbackEdit: 'Ufro änneren',
    fallbackSubject: 'Ufro iwwer de Site',
    fallbackIntro: 'Moien, hei ass meng Ufro:',
    errors: {
      name: 'Gitt Ären Numm un.',
      phone: 'Gitt eng Telefonsnummer un, fir datt mir Iech zréckruffe kënnen.',
      phoneInvalid:
        'Dës Nummer schéngt net komplett ze sinn. Gitt se mat der Landesvirwiel un, zum Beispill +352 621 123 456.',
      email: 'Dës E-Mail-Adress ass net gëlteg. Si muss en @ enthalen, zum Beispill numm@beispill.lu.',
      consent: 'Kräizt d’Këschtchen un, fir datt mir Är Donnéeë benotzen dierfen, fir Iech z’äntweren.',
      vehicle: 'Wielt en Unhänger oder e Gefier.',
      from: 'Gitt den Ufanksdatum un.',
      to: 'Gitt den Enddatum un.',
      toBeforeFrom: 'Den Datum „Bis“ däerf net virum Datum „Vun“ leien.',
      past: 'Wielt en Datum vun haut un.',
      wish: 'Wielt, wat Dir wëllt.',
      reason: 'Wielt, fir wat Dir kommt.',
      machine: 'Gitt d’Gefier oder d’Maschinn un.',
      work: 'Beschreift, wat ze maachen ass.',
      subject: 'Wielt en Theema.',
      message: 'Schreift Äre Message.',
    },
    rental: {
      vehicle: 'Gewënschten Unhänger oder Gefier',
      from: 'Vun',
      to: 'Bis',
      licence: 'Äre Führerschäin',
      licenceNone: 'Keng Angab',
      licenceB: 'B',
      licenceB96: 'B + Code 96',
      licenceBE: 'BE',
      submit: 'Lounufro schécken',
      noFleet: 'Schreift eis am Message, wat Dir wëllt lounen.',
      other: 'Eppes anescht, am Message beschriwwen',
    },
    car: {
      carLabel: 'Auto',
      wish: 'Dir wëllt',
      wishTest: 'Eng Probefaart',
      wishInfo: 'Méi Informatiounen',
      wishTradeIn: 'Reprise vu mengem Auto',
      tradeInH: 'Nëmme fir eng Reprise',
      tradeMake: 'Mark a Modell',
      tradeYear: 'Joer',
      tradeKm: 'Kilometerstand',
      title: 'Informatiounen ufroen',
      submit: 'Ufro schécken',
    },
    workshop: {
      reason: 'Fir wat?',
      reasonMaintenance: 'Entretien',
      reasonRepair: 'Pann oder Reparatur',
      reasonBody: 'Karosserie',
      reasonSodablast: 'Sodablast',
      reasonGarden: 'Gaart- oder Bëschmaschinn',
      machine: 'Gefier oder Maschinn',
      machineHint: 'Mark, Modell a Joer, zum Beispill: VW Golf 2018.',
      work: 'Wat ass ze maachen?',
      date: 'Wonschdatum',
      photos: 'Fir Karosserie oder Sodablast schéckt eis Fotoen op WhatsApp: +352 621 373 272.',
      submit: 'Rendez-vous ufroen',
    },
    contact: {
      subject: 'Theema',
      subjectQuestion: 'Allgemeng Fro',
      subjectTrailer: 'Unhänger kafen',
      subjectDepot: 'Kommissiounsverkaf',
      subjectOther: 'Soss eppes',
      submit: 'Message schécken',
    },
  },

  seo: {
    home: {
      title: 'Garage Um Rond Point Erpeldange – Unhänger, Autoen, Atelier',
      description:
        'Garage um Rond-point zu Ierpeldeng (Erpeldange), tëscht Ettelbréck an Dikrech: Unhänger a Camionnetten lounen, nei Autoen an Occasiounen, Mechanik a Karosserie.',
    },
    rental: {
      title: 'Unhänger lounen zu Erpeldange bei Ettelbréck | Um Rond Point',
      description:
        'Autosunhänger, Motosunhänger, Kipper, Killunhänger oder Camionnette zu Erpeldange: Kuckt, wéi en Unhänger passt, wat e kascht an ob Äre Führerschäin duergeet.',
    },
    category: {
      title: {
        'porte-voiture': 'Autosunhänger lounen zu Erpeldange | Garage Um Rond Point',
        'porte-moto': 'Motosunhänger lounen zu Erpeldange | Garage Um Rond Point',
        benne: 'Kipper lounen zu Erpeldange bei Ettelbréck | Um Rond Point',
        frigorifique: 'Killunhänger lounen zu Erpeldange | Garage Um Rond Point',
        camionnette: 'Camionnette lounen zu Erpeldange | Garage Um Rond Point',
      },
      description: {
        'porte-voiture':
          'Lount en Autosunhänger um Rond-point zu Erpeldange, no bei Ettelbréck: Moossen, Notzlaascht, Präis an néidege Führerschäin fir all Unhänger an eiser Flott.',
        'porte-moto':
          'Lount e Motosunhänger um Rond-point zu Erpeldange, no bei Ettelbréck: Moossen, Notzlaascht, Präis an néidege Führerschäin fir all Unhänger an eiser Flott.',
        benne:
          'Lount e Kipper fir Buedem, Bauschutt oder Gréngschnëtt um Rond-point zu Erpeldange, no bei Ettelbréck: Notzlaascht, Präis a wat fir e Führerschäin Dir braucht.',
        frigorifique:
          'Lount e Killunhänger fir Äert Fest oder Festival um Rond-point zu Erpeldange, no bei Ettelbréck: Bannevolumen, Temperatur, Präis an néidege Führerschäin.',
        camionnette:
          'Lount eng Camionnette fir en Ëmzug oder Material um Rond-point zu Erpeldange, no bei Ettelbréck. Bis 3.500 kg geet de Führerschäin B duer. Präis pro Dag.',
      },
    },
    cars: {
      title: 'Nei Autoen an Occasiounen zu Erpeldange | Um Rond Point',
      description:
        'All d’Autoen am Stock vun der Garage Um Rond Point zu Erpeldange, mat Präis, Kilometerstand a Fotoen. Lëscht all Moien aktualiséiert. Probefaart op Rendez-vous.',
    },
    car: {
      suffixLong: ' | Garage Um Rond Point',
      suffixShort: ' | Um Rond Point',
      place: ' zu Ierpeldeng',
      descTail: 'Ze gesinn an der Garage Um Rond Point zu Ierpeldeng.',
      descExtra: [' Probefaart op Rendez-vous.', ' Tëscht Ettelbréck an Dikrech.', ' Rufft +352 81 05 41 un.'],
      descGearbox: 'Schaltung: {gearbox}',
      soldTitle: '{make} {model} verkaaft | Garage Um Rond Point, Erpeldange',
      soldDescription:
        '{make} {model}: Dësen Auto ass verkaaft oder net méi am Stock. Kuckt déi aner nei Autoen an Occasioune vun der Garage Um Rond Point zu Erpeldange.',
    },
    workshop: {
      title: 'Mechanik a Karosserie zu Erpeldange | Garage Um Rond Point',
      description:
        'Entretien, Diagnos, Reparatur, Karosserie a Lackéierung an der Garage um Rond-point zu Erpeldange, bei Ettelbréck an Dikrech. Frot online e Rendez-vous un.',
    },
    sodablast: {
      title: 'Sodablast zu Lëtzebuerg | Garage Um Rond Point, Erpeldange',
      description:
        'Sodablast mécht Lack an Dreck ewech, ouni d’Uewerfläch ze beschiedegen: al Autoen, Felgen, mechanesch Deeler. Zu Erpeldange, tëscht Ettelbréck an Dikrech.',
    },
    trailersForSale: {
      title: 'Unhänger kafen: Humbaur, Saris, WM Meyer | Erpeldange',
      description:
        'Kaaft Ären Unhänger zu Erpeldange: Humbaur, Saris oder WM Meyer. Mir hëllefen Iech, Gréisst a Gewiicht passend zu Ärem Auto an Ärem Führerschäin ze wielen.',
    },
    garden: {
      title: 'Gaart- a Bëschmaschinne vun Honda a Stihl zu Erpeldange',
      description:
        'Verkaf a Reparatur vu Gaart- a Bëschmaschinnen, virun allem vun Honda a Stihl, an der Garage Um Rond Point zu Erpeldange, tëscht Ettelbréck an Dikrech.',
    },
    contact: {
      title: 'Kontakt a Wee bei eis | Garage Um Rond Point, Erpeldange',
      description:
        '1, rue du Viaduc zu Erpeldange-sur-Sûre, um Rond-point nieft der Aral. Méindeg bis Freideg 7:45–12 an 13–18 Auer, Samschdeg 8–12 Auer. Tel. +352 81 05 41.',
    },
    thanks: {
      title: 'Ufro geschéckt | Garage Um Rond Point, Erpeldange-sur-Sûre',
      description:
        'Är Ufro ass bei der Garage Um Rond Point zu Erpeldange ukomm. Mir äntweren Iech séier. Ass et dréngend? Rufft eis un op +352 81 05 41. Merci villmools!',
    },
    legal: {
      title: 'Impressum | Garage Um Rond Point, Erpeldange-sur-Sûre',
      description:
        'Impressum vun der Garage Um Rond Point S.à r.l., 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre: Erausgeber, Handelsregister B296148, TVA LU36559673, Hosting.',
    },
    privacy: {
      title: 'Dateschutzerklärung | Garage Um Rond Point, Erpeldange',
      description:
        'Wéi eng Donnéeën d’Garage Um Rond Point veraarbecht, wann Dir eis schreift, firwat, wéi laang a wéi eng Rechter Dir hutt. Ouni Cookien, ouni Tracking-Tools.',
    },
  },

  legal: {
    h1: 'Impressum',
    publisherH2: 'Erausgeber vun der Websäit',
    company: 'Firmennumm',
    legalForm: 'Rechtsform',
    address: 'Sëtz',
    phone: 'Telefon',
    email: 'E-Mail',
    rcs: 'Handelsregister',
    vat: 'TVA-Nummer',
    registered: 'Androung',
    manager: 'Geschäftsféierer',
    permit: 'Néierlassungserlaabnes (Autorisation d’établissement)',
    capital: 'Gesellschaftskapital',
    managerMissing: '[UNBESTÄTIGT — Gérant David Moreira laut Editus]',
    permitMissing: '[FEHLT — Nummer der Gewerbegenehmigung]',
    capitalMissing: '[FEHLT — Gesellschaftskapital]',
    hostingH2: 'Hosting',
    hosting:
      'D’Websäit gëtt vu GitHub Pages gehost, engem Service vu GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, Vereenegt Staaten.',
    contentH2: 'Inhalt',
    content:
      'D’Autosannoncen iwwerhuelen eis eegen Annoncen op LuxAuto an AutoScout24. Präisser an technesch Donnéeë kënne sech änneren; verbindlech ass eleng d’Offer, déi an der Garage bestätegt gëtt.',
    photosH2: 'Fotoen a Plang',
    photos:
      'Plang vum Rond-point, gezeechent no Date vun OpenStreetMap (© OpenStreetMap-Mataarbechter, Lizenz ODbL). Fotoe vun den Autoen: eis eegen Annoncen.',
    fontH2: 'Schrëft',
    font: 'Archivo, Omnibus-Type, SIL Open Font License 1.1.',
  },

  privacy: {
    h1: 'Dateschutzerklärung',
    intro:
      'Mir veraarbechten Är Donnéeën nëmmen, fir op Är Ufroen z’äntweren. Dës Websäit setzt keng Cookien a benotzt keng Tools fir Tracking oder Reklamm.',
    controllerH2: 'Verantwortlechen',
    controller:
      'Garage Um Rond Point S.à r.l., 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre, Lëtzebuerg. Telefon +352 81 05 41, info@rondpoint.lu.',
    formsH2: 'Ufroformulairen',
    forms:
      'Wann Dir e Formulaire schéckt, kréie mir d’Donnéeën, déi Dir agitt: Numm, Telefon, E-Mail, wann Dir se ugitt, Äre Message an d’Detailer vun Ärer Ufro (zum Beispill Lounzäit, Gefier, gewënschte Rendez-vous). Mir benotzen se, fir Iech z’äntweren an eng Offer oder e Rendez-vous virzebereeden.',
    legalBasis:
      'Rechtsgrondlag: Är Awëllegung (Art. 6 Abs. 1 Buchst. a DSGVO), déi Dir gitt, wann Dir d’Këschtchen ukräizt, a virvertraglech Moossnamen op Är Ufro (Art. 6 Abs. 1 Buchst. b DSGVO). Dir kënnt Är Awëllegung all Moment per E-Mail oder Telefon zréckzéien.',
    storage:
      'Är Ufro gëtt an enger Datebank bei Supabase (Regioun Europäesch Unioun) gespäichert an eis per E-Mail iwwer [UNBESTÄTIGT — EU-Mailanbieter, mit Nave klären] zougestallt. D’Ufroe ginn no 90 Deeg automatesch geläscht [UNBESTÄTIGT — Frist mit Kunde bestätigen]. Korrespondenz, déi zu engem Kontrakt féiert, bewahre mir no de Buchhaltungsflichten op.',
    abuse:
      'Fir Mëssbrauch ze begrenzen, späichere mir 24 Stonnen laang e kryptografeschen Hashwäert vun Ärer IP-Adress. Doraus kann een Är Adress net erëmfannen.',
    hostingH2: 'Hosting a Server-Protokoller',
    hosting:
      'D’Websäit gëtt vu GitHub Pages (GitHub, Inc., Vereenegt Staaten) gehost. Bei all Besuch veraarbecht GitHub Är IP-Adress an technesch Donnéeën, fir d’Säiten auszeliwweren an d’Sécherheet ze garantéieren. GitHub ass nom EU-US-Dateschutzrumm (EU-US Data Privacy Framework) zertifiéiert. Rechtsgrondlag: eist berechtegt Interessi un enger Websäit, déi sécher an erreechbar ass (Art. 6 Abs. 1 Buchst. f DSGVO).',
    linksH2: 'Linken op aner Servicer',
    links:
      'D’Websäit lued keen externen Inhalt: Schrëften, Fotoen a Plang sinn zesumme mat der Websäit gehost. D’Linken op Google Maps, WhatsApp, Facebook, Instagram, TikTok, LuxAuto an AutoScout24 ginn nëmmen op, wann Dir drop klickt. Dës Servicer veraarbechten Är Donnéeën dann no hiren eegene Reegelen. WhatsApp gehéiert zu Meta Platforms; wann Dir eis op WhatsApp schreift, veraarbecht Meta Är Nummer an Är Messagen.',
    rightsH2: 'Är Rechter',
    rights:
      'Dir kënnt Accès op Är Donnéeën, hir Korrektur, hir Läschung, d’Aschränkung vun der Veraarbechtung an d’Portabilitéit vun den Donnéeë verlaangen an der Veraarbechtung widderspriechen. Schreift eis op info@rondpoint.lu. Dir kënnt och eng Reklamatioun bei der Nationaler Kommissioun fir den Dateschutz (CNPD) aginn: 15, boulevard du Jazz, L-4370 Belvaux, cnpd.public.lu.',
    updated: 'Stand: {date}',
  },
  /** Leiste im Startbildschirm: alle Leistungen auf einen Blick (Titel aus nav.*) */
  offer: {
    label: 'Eis Servicer op ee Bléck',
    sub: {
      rental: 'Unhänger a Camionnetten',
      cars: 'All Moien aktualiséiert',
      workshop: 'Mechanik a Karosserie',
      trailers: 'Saris, Humbaur, WM Meyer',
      garden: 'Honda a Stihl',
      sodablast: 'Schounend ofbeizen',
    },
  },
  /** Kurzes „Über uns“ auf der Startseite (nur bestätigte Angaben: Lage, Leistungen, Sprachen, Öffnungstage) */
  about: {
    h2: 'Iwwer eis',
    text: 'D’Garage Um Rond Point ass Är Garage um Rond-point zu Ierpeldeng, tëscht Ettelbréck an Dikrech. Unhänger a Camionnetten lounen, Autoen an Unhänger kafen, Atelier a Gaartmaschinnen: alles op enger Adress. Kommt laanscht – mir schwätzen Är Sprooch.',
    link: 'Wéi Dir eis fannt',
    photoAlt: 'Mecanicien reecht en Autosschlëssel',
  },
  /** Startseite: Stichpunkte; Unterseiten: ausführliche Erklärungen */
  details: {
    points: {
      workshop: [
        'Entretien a Revisioun',
        'Feelerdiagnos',
        'Mechanesch Reparatur',
        'Karosserie a Lack',
      ],
      sodablast: [
        'Schounend Ofbeizen mat Natron',
        'Al Karosserien, Felgen, mechanesch Deeler',
        'Éischt Aschätzung per Foto iwwer WhatsApp',
      ],
      garden: [
        'Verkaf vu Gaart- a Bëschmaschinnen',
        'Reparatur vun Äre Maschinnen',
        'Virun allem Honda a Stihl',
      ],
      trailers: [
        'Unhänger vu Saris, Humbaur a WM Meyer',
        'Fir Privatleit a Betriber',
        'Berodung zu Gewiicht a Führerschäin',
      ],
    },
    workshop: {
      entretienH: 'Entretien a Revisioun',
      entretien: 'E reegelméissegen Entretien hält Ären Auto zouverlässeg a sécher: Uelegwiessel, Filteren, Bremsen, Niveauen an allgemeng Kontroll. Sot eis an Ärer Ufro de Kilometerstand an den Datum vum leschten Entretien.',
      diagnosticH: 'Feelerdiagnos',
      diagnostic: 'Eng Warnluucht geet un, en ongewéinlecht Geräisch, den Auto spréngt schlecht un: Beschreift, wat Dir mierkt a zanter wéini. D’Diagnos fënnt d’Ursaach, ier reparéiert gëtt.',
      reparationH: 'Mechanesch Reparatur',
      reparation: 'No der Diagnos reparéiere mir Ären Auto oder Är Camionnette an eisem Atelier um Rond-point zu Ierpeldeng.',
      carrosserieH: 'Karosserie a Lack',
      carrosserie: 'No engem klengen Accident reparéiere mir d’Karosserie a lackéieren déi beschiedegt Deeler nei. Schéckt eis Fotoe vum Schued iwwer WhatsApp fir eng éischt Aschätzung.',
      processH2: 'Esou kritt Dir e Rendez-vous',
      process: [
        'Beschreift Äert Gefier a wat ze maachen ass, am Formulaire, um Telefon oder iwwer WhatsApp.',
        'Mir ruffen Iech zréck, fir den Datum ofzemaachen.',
        'Dir bréngt Äert Gefier an d’Garage, 1, rue du Viaduc.',
      ],
    },
    sodablast: {
      explainH2: 'Wéi funktionéiert Sodablast?',
      explain: 'Natron gëtt mat Drockloft op d’Uewerfläch gestraalt. Et ass méi mëll wéi Sand an hëlt Lack, Fett a Knascht ewech, ouni d’Metall unzegräifen. Dofir gëtt et fir empfindlech Deeler an al Karosserien benotzt.',
      explain2: 'D’Ofbeize leet déi ursprénglech Uewerfläch fräi: Dir gesitt de richtegen Zoustand vum Metall virun enger Reparatur oder engem neie Lack.',
      processH2: 'Esou leeft d’Ofbeizen of',
      process: [
        'Schéckt eis Fotoe vum Auto oder vum Deel iwwer WhatsApp.',
        'Dir kritt eng éischt Aschätzung.',
        'Mir maachen zesummen e Rendez-vous an der Garage.',
      ],
    },
    garden: {
      saleH2: 'Verkaf',
      sale: 'Rasemeeër, Fräischneider, Motorsee oder Heckeschéier: Mir verkafe Gaart- a Bëschmaschinnen, virun allem vun de Marken Honda a Stihl. Sot eis, wéi grouss Ären Terrain ass a wat Dir wëllt maachen, mir beroden Iech beim Wielen.',
      repairH2: 'Reparatur',
      repair: 'De Rasemeeër spréngt net méi un, d’Motorsee schneit schlecht, de Fräischneider verléiert Kraaft? Bréngt Är Maschinn an den Atelier oder beschreift de Problem am Formulaire.',
    },
    trailers: {
      chooseH2: 'De richtegen Unhänger wielen',
      masseH: 'Zoulässegt Gesamtgewiicht',
      masse: 'Et bestëmmt, wéi e Führerschäin Dir braucht. Bis 750 kg geet de Führerschäin B duer, doriwwer hänkt et vun Ärem Auto of.',
      freinH: 'Bremsen',
      frein: 'En Unhänger mat engem zoulässege Gesamtgewiicht vu méi wéi 750 kg muss gebremst sinn.',
      chargeH: 'Unhängelaascht',
      charge: 'Ären Auto däerf net méi zéie wéi am Feld O.1 (gebremst) oder O.2 (ongebremst) vun der Carte grise steet.',
      usageH: 'Bauaart a Moossen',
      usage: 'Plateau, Kipper, Autosunhänger oder Kofferunhänger: De passenden Unhänger hänkt dovun of, wat Dir am meeschte transportéiert a wou Dir en ofstellt.',
    },
  },
  /** Ausführliche Seitentexte (SEO): Abschnitte und FAQ je Seite, siehe src/lib/content.ts */
  content: {
    workshop: {
      sections: {
        s1: {
          h: 'Är Garage no bei Iech, tëscht Ettelbréck an Dikrech',
          p: [
            'D’Garage Um Rond Point ass um {address}, direkt um Rond-point zu Ierpeldeng, nieft der Aral-Tankstell. Wann Dir zu Ierpeldeng, Ettelbréck, Dikrech oder soss iergendwou an der Nordstad wunnt, ass eisen Atelier just e puer Minutten ewech.',
            'Mir schwätze Lëtzebuergesch, Franséisch, Däitsch, Englesch a Portugisesch. Dir kënnt eis de Problem mat Ärem Auto also an der Sprooch erklären, déi Iech am léifsten ass.',
          ],
        },
        s2: {
          h: 'Entretien: firwat de Plang vum Hiersteller wichteg ass',
          p: [
            'All Hiersteller leet en Entretiensplang fest, nom Kilometerstand oder no der Zäit zanter dem leschte Besuch an der Garage. Dir fannt en am Carnet d’entretien oder um Ecran vun Ärem Auto.',
            'Wann Dir Iech un dëse Plang haalt, gëtt Ären Auto manner ofgenotzt, Dir vermeit deier Pannen an den Auto behält beim Verkaf besser säi Wäert. Wat zu engem Entretien gehéiert, hänkt vum Plang of. Dozou gehéieren zum Beispill den Uelegwiessel, d’Filteren, d’Kontroll vun de Bremsen an den Niveauen, d’Luuchten an d’Scheiwewëscher.',
          ],
        },
        s3: {
          h: 'Bei dësen Zeeche sollt Dir an den Atelier kommen',
          items: [
            'Eng Warnluucht am Cockpit geet net méi aus.',
            'D’Bremse jäizen, vibréieren oder zéien op eng Säit.',
            'De Motor huet ze wéineg Kraaft oder spréngt schlecht un.',
            'Et richt verbrannt, eppes leeft aus oder et kënnt ongewéinlechen Damp.',
            'En neit Geräisch beim Fueren oder wann Dir d’Steierrad dréit.',
          ],
          p: [
            'Gëtt e Feeler fréi fonnt, bleift d’Reparatur méi einfach. Beschreift am Formulaire, wat Dir mierkt a zanter wéini: Dat ass déi bescht Basis fir d’Diagnos.',
          ],
        },
        s4: {
          h: 'Karosserie a Lack no engem klengen Accident',
          p: [
            'Ass d’Karosserie verkraazt oder agedréckt, oder ass de Pare-choc beschiedegt? Da schéckt eis Fotoe vum Schued iwwer WhatsApp op {whatsapp}. Dir kritt eng éischt Aschätzung, nach ier Dir bei eis kommt. Duerno reparéiere mir an eisem Atelier d’Karosserie a lackéieren déi beschiedegt Deeler nei.',
            'Wann en anert Gefier bedeelegt ass, fëllt de Constat amiable op der Plaz aus a maacht selwer Fotoe vum Accident. Dës Dokumenter sinn nëtzlech fir Är Versécherung.',
          ],
        },
        s5: {
          h: 'Autoen a Camionnetten',
          p: [
            'Eisen Atelier këmmert sech ëm Autoen a Camionnetten. Fir e Rasemeeër, eng Motorsee oder eng aner Maschinn, kuckt op eiser Säit [Gaart & Bësch](page:garden). Fir eng Karosserie oder en Deel bis op d’Metall ofzebeizen, entdeckt eist [Ofbeize mat Sodablast](page:sodablast).',
          ],
        },
      },
      faqH: 'Froen zum Atelier',
      faq: {
        q1: {
          q: 'Wéi maachen ech e Rendez-vous am Atelier aus?',
          a: 'Beschreift Äert Gefier a wat ze maachen ass: am Formulaire op dëser Säit, um Telefon op {phone} oder iwwer WhatsApp op {whatsapp}. Mir ruffen Iech zréck, fir de Rendez-vous auszemaachen.',
        },
        q2: {
          q: 'Wéini ass d’Garage op?',
          a: '{hours}',
        },
        q3: {
          q: 'Kann ech Fotoe schécken, ier ech kommen?',
          a: 'Jo. Fir Karosserie oder Sodablast schéckt eis Fotoen iwwer WhatsApp op {whatsapp}: Dir kritt eng éischt Aschätzung.',
        },
        q4: {
          q: 'Wou ass den Atelier?',
          a: 'Um {address}, um Rond-point zu Ierpeldeng, nieft der Aral-Tankstell, tëscht Ettelbréck an Dikrech.',
        },
        q5: {
          q: 'A wéi enge Sprooche kann ech de Problem erklären?',
          a: 'Op Lëtzebuergesch, Franséisch, Däitsch, Englesch oder Portugisesch.',
        },
      },
    },
    sodablast: {
      sections: {
        s1: {
          h: 'Sodablast oder Sandstralen: wat ass den Ënnerscheed?',
          p: [
            'Beim klassesche Sandstrale gëtt en haart Material wéi Sand oder Korund op d’Uewerfläch gestraalt. Dat beizt séier of, mä et gräift och d’Metall un a kann dënn Blecher erhëtzen an deforméieren.',
            'Natron ass vill méi mëll wéi Metall. Et hëlt Lack, Fett an Dreck ewech, ouni d’Uewerfläch ofzedroen an ouni se z’erhëtzen. Dofir passt Sodablast gutt fir empfindlech Deeler an al Karosserien.',
          ],
        },
        s2: {
          h: 'Fir wéi eng Projeten?',
          items: [
            'Restauratioun vun engem alen Auto: d’Karosserie bis op d’Metall fräileeën, ier se reparéiert a lackéiert gëtt.',
            'Felgen: den ale Lack an de festsëtzenden Dreck ewechmaachen, ier se nei lackéiert ginn.',
            'Mechanesch Deeler: e Carter, e Motorblock oder en Zylinderkapp botzen, ier se kontrolléiert oder erëm zesummegebaut ginn.',
          ],
          p: [
            'Dir wësst net, ob Ären Deel sech dofir eegent? Schéckt eis eng Foto iwwer WhatsApp op {whatsapp}, mir soen Iech et.',
          ],
        },
        s3: {
          h: 'Nom Ofbeizen: d’Metall schützen',
          p: [
            'Eng ofgebeizt Uewerfläch ass blankt Metall. Am Kontakt mat Loft a Fiichtegkeet oxydéiert se séier. Plangt dofir den nächste Schrëtt vun Ufank un: Grondéierung, Reparatur oder Lack. D’Natronreschter gi virum Lackéiere mat Waasser ofgespullt.',
            'Bei engem Auto kann eisen Atelier duerno d’Karosserie reparéieren an nei lackéieren: Kuckt [Mechanik a Karosserie](page:workshop).',
          ],
        },
        s4: {
          h: 'Sodablast zu Lëtzebuerg, zu Ierpeldeng',
          p: [
            'Eisen Atelier ass um Rond-point zu Ierpeldeng, tëscht Ettelbréck an Dikrech, an aus dem ganzen Norde vu Lëtzebuerg einfach z’erreechen. Ob fir en eenzelnen Deel oder fir e ganzen Auto: Mir maachen zesummen e Rendez-vous an der Garage aus.',
          ],
        },
      },
      faqH: 'Froen zum Sodablast',
      faq: {
        q1: {
          q: 'Beschiedegt Sodablast d’Metall?',
          a: 'Nee. Natron ass méi mëll wéi Metall: Et hëlt Lack, Fett an Dreck ewech, ouni d’Uewerfläch ofzedroen. Dat ass den Ënnerscheed zum Sandstralen.',
        },
        q2: {
          q: 'Wat kascht d’Ofbeize mat Sodablast?',
          a: 'Dat hänkt dovun of, wéi grouss den Deel ass a wéi vill Schichten ewech mussen. Schéckt eis Fotoen iwwer WhatsApp op {whatsapp}: Dir kritt eng éischt Aschätzung.',
        },
        q3: {
          q: 'Muss den Deel nom Ofbeize behandelt ginn?',
          a: 'Jo. Dat blankt Metall muss séier mat enger Grondéierung oder engem Lack geschützt ginn, soss oxydéiert et.',
        },
        q4: {
          q: 'Kann een och Felge mat Sodablast ofbeizen?',
          a: 'Jo, Felge gehéieren zu den Deeler, déi mir mat Sodablast ofbeizen, sou wéi al Karosserien a mechanesch Deeler.',
        },
      },
    },
    garden: {
      sections: {
        s1: {
          h: 'Gaart- a Bëschmaschinnen an der Nordstad',
          p: [
            'Fir Äre Gaart, Ären Terrain oder Äre Bësch ze pfleegen, fannt Dir an der Garage Um Rond Point Maschinnen, virun allem vun de Marken Honda a Stihl, an en Atelier, fir se ze reparéieren. D’Garage ass um Rond-point zu Ierpeldeng, tëscht Ettelbréck an Dikrech.',
          ],
        },
        s2: {
          h: 'Déi richteg Maschinn wielen',
          items: [
            'Rasemeeër: D’Gréisst vum Wuess, d’Steigung an d’Hindernisser bestëmmen d’Schnëttbreet an d’Aart vum Undriff.',
            'Fräischneider: fir Kanten, Häng an héicht Gras, wou de Rasemeeër net hikënnt.',
            'Motorsee: D’Längt vum Schwäert hänkt vum Duerchmiesser vum Holz of, dat Dir am meeschte schneit.',
            'Heckeschéier: D’Längt vum Messer an d’Gewiicht zielen, wann Dir laang oder an der Héicht schneit.',
          ],
          p: [
            'Bensin oder Akku? Eng Maschinn mat Akku ass méi roueg a spréngt ouni Méi un. Eng Maschinn mat Bensinsmotor hält och op grouss Flächen duer. Sot eis, wéi Dir se benotzt, mir beroden Iech.',
          ],
        },
        s3: {
          h: 'Reparatur: wéini Dir Är Maschinn brénge sollt',
          items: [
            'De Motor spréngt net méi un oder geet aus.',
            'D’Maschinn verléiert Kraaft oder fëmmt.',
            'D’Ketten oder d’Messer schneit schlecht.',
            'Dir héiert ongewéinlech Geräischer oder spiert Vibratiounen.',
          ],
          p: [
            'Beschreift d’Pann am Formulaire oder rufft eis un op {phone}. Gitt d’Mark an de Modell vun der Maschinn un: Da wësse mir direkt, ëm wat et geet.',
          ],
        },
        s4: {
          h: 'Esou kënnt Är Maschinn gutt duerch de Wanter',
          p: [
            'Ier Dir eng Maschinn mat Bensinsmotor fir de Wanter ewechstellt, botzt se, maacht den Tank eidel oder loosst de Motor lafen, bis se ausgeet. Stellt se duerno am Dréchenen of. Esou spréngt d’Maschinn am Fréijoer méi einfach erëm un.',
            'Den Akku gehéiert op eng frostfräi Plaz, am beschten hallef gelueden.',
          ],
        },
      },
      faqH: 'Froen zu de Gaartmaschinnen',
      faq: {
        q1: {
          q: 'Vu wéi enge Marke verkaaft Dir Maschinnen?',
          a: 'Virun allem Maschinne vun Honda a Stihl.',
        },
        q2: {
          q: 'Wéi loossen ech mäi Rasemeeër oder meng Motorsee reparéieren?',
          a: 'Bréngt d’Maschinn an den Atelier oder beschreift d’Pann am Formulaire op dëser Säit. Mir ruffen Iech zréck.',
        },
        q3: {
          q: 'Wéini kann ech an der Garage laanschtkommen?',
          a: '{hours}',
        },
        q4: {
          q: 'Wou ass d’Garage?',
          a: 'Um {address}, um Rond-point zu Ierpeldeng, nieft der Aral-Tankstell.',
        },
      },
    },
    trailersForSale: {
      sections: {
        s1: {
          h: 'Saris, Humbaur a WM Meyer zu Ierpeldeng',
          p: [
            'Mir verkafen Unhänger vu Saris, Humbaur a WM Meyer, fir Privatleit a fir Betriber. Sot eis, wat Dir transportéiert: Mir hëllefen Iech, de Modell ze fannen, deen zu Ärem Auto an zu Ärem Führerschäin passt.',
            'D’Garage ass um Rond-point zu Ierpeldeng, tëscht Ettelbréck an Dikrech.',
          ],
        },
        s2: {
          h: 'Déi richteg Froe virum Kaf',
          items: [
            'Wat transportéieren ech am meeschten, a wéi vill weit et?',
            'Wéi laang a wéi breet muss d’Luedfläch sinn?',
            'Ka mäin Auto dësen Unhänger zéien (Felder O.1 an O.2 vun der Carte grise)?',
            'Geet mäi Führerschäin duer: B, B mam Code 96 oder BE?',
            'Wou stellen ech den Unhänger of, wann ech en net brauch?',
          ],
        },
        s3: {
          h: 'Privatleit a Betriber',
          p: [
            'Privatleit brauchen den Unhänger fir de Gaart, fir ze plënneren oder fir e Fräizäitgefier ze transportéieren. En Handwierker oder e Betrib transportéiert domat all Dag Material a Maschinnen: Do zielen d’Notzlaascht, eng robust Luedfläch an d’Befestegungspunkten nach méi.',
          ],
        },
        s4: {
          h: 'Kafen oder lounen?',
          p: [
            'Wann Dir nëmmen heiansdo en Unhänger braucht, kann et duergoen, een ze [lounen](page:rental). Eis Unhängersich weist Iech och, wéi en Unhänger Dir mat Ärem Führerschäin zéien dierft.',
          ],
        },
      },
      faqH: 'Froen zum Kaf vun engem Unhänger',
      faq: {
        q1: {
          q: 'Vu wéi enge Marke verkaaft Dir Unhänger?',
          a: 'Saris, Humbaur a WM Meyer.',
        },
        q2: {
          q: 'Verkaaft Dir och u Betriber?',
          a: 'Jo, mir verkafen Unhänger u Privatleit an u Betriber.',
        },
      },
    },
    cars: {
      sections: {
        s1: {
          h: 'En Auto kafen an der Garage Um Rond Point',
          p: [
            'All d’Autoen op dëser Säit si bei eis am Stock, um Rond-point zu Ierpeldeng. D’Lëscht gëtt all Moien op Basis vun eisen Annoncen aktualiséiert: Dir gesitt de Präis, de Kilometerstand, d’Joer an d’Fotoe vun all Auto.',
          ],
          items: [
            'Wielt en Auto aus der Lëscht a maacht seng Detailsäit op.',
            'Rufft eis un oder schreift eis op WhatsApp, fir nozefroen, ob en nach disponibel ass.',
            'Kommt den Auto an der Garage kucken a maacht eng Probefaart op Rendez-vous.',
          ],
        },
        s2: {
          h: 'Nei Autoen an Occasiounen no bei Ettelbréck an Dikrech',
          p: [
            'Am Stock sinn nei Autoen an Occasiounen. De Stock ännert sech dacks: D’Lëscht weist Iech all Dag de Stand vum Moien. Dir fannt eis Annoncen och op LuxAuto an AutoScout24.',
          ],
        },
        s3: {
          h: 'Wat ass mat Ärem aktuellen Auto?',
          p: [
            'Wëllt Dir Ären Auto a Reprise ginn? Sot et eis am Formulaire vum Auto, deen Iech interesséiert. Wëllt Dir léiwer verkafen, ouni Iech selwer drëm ze këmmeren? Entdeckt eise Kommissiounsverkaf méi ënnen op dëser Säit.',
          ],
        },
      },
      faqH: 'Froen zu eisen Autoen',
      faq: {
        q1: {
          q: 'Kann ech eng Probefaart maachen?',
          a: 'Jo, op Rendez-vous. Rufft eis un op {phone} oder schreift eis iwwer WhatsApp op {whatsapp}.',
        },
        q2: {
          q: 'Wou kann ech d’Autoe kucken?',
          a: 'An der Garage, um {address}, um Rond-point zu Ierpeldeng. {hours}',
        },
        q3: {
          q: 'Sinn Är Autoen och op LuxAuto an AutoScout24?',
          a: 'Jo, Dir fannt eis Annoncen och op LuxAuto an AutoScout24. Hei gesitt Dir eise ganze Stock op enger Plaz.',
        },
      },
    },
    contact: {
      sections: {
        s1: {
          h: 'Wéi erreecht Dir eis am beschten?',
          items: [
            'Eng kuerz Fro oder Fotoen, déi Dir eis weise wëllt: WhatsApp op {whatsapp}.',
            'E Rendez-vous oder eng direkt Äntwert: Telefon op {phone}.',
            'Eng detailléiert Ufro: de Formulaire hei ënnen oder eng E-Mail un {email}.',
          ],
        },
        s2: {
          h: 'De Wee bei eis an d’Garage',
          p: [
            'D’Garage ass um {address}, um Rond-point zu Ierpeldeng, nieft der Aral-Tankstell. Kommt Dir vun Ettelbréck oder vun Dikrech? Da läit de Rond-point op Ärem Wee. Fir déi genee Route maacht Google Maps iwwer dës Säit op.',
          ],
        },
      },
      faqH: 'Praktesch Froen',
      faq: {
        q1: {
          q: 'Wéini ass d’Garage op?',
          a: '{hours}',
        },
        q2: {
          q: 'Wéi eng Sprooche schwätzt Dir?',
          a: 'Mir schwätze Lëtzebuergesch, Franséisch, Däitsch, Englesch a Portugisesch.',
        },
      },
    },
    rental: {
      sections: {
        s1: {
          h: 'Unhänger lounen an der Nordstad',
          p: [
            'Um Rond-point zu Ierpeldeng, tëscht Ettelbréck an Dikrech, lount Dir en Unhänger oder eng Camionnette ganz no bei Iech doheem. Eis Unhängersich hei uewe weist Iech mat e puer Klicks, wéi en Unhänger zu deem passt, wat Dir transportéiert, an ob Äre Führerschäin duergeet.',
          ],
        },
        s2: {
          h: 'Tipps fir richteg ze lueden',
          items: [
            'Iwwerschreit ni dat zoulässegt Gesamtgewiicht vum Unhänger an och net d’Unhängelaascht vun Ärem Auto.',
            'Verdeelt d’Luedung: schwéier Saachen iwwer d’Achs, e bësse Gewiicht op d’Kupplung, sou wéi et an der Uleedung steet.',
            'Sécheert d’Luedung mat Spannrimmen an deckt alles, wat lass ass, mat enger Bâche oder engem Netz of.',
            'Ier Dir lassfuert, kontrolléiert d’Kupplung, d’Luuchten an den Drock vun de Pneuen.',
            'Fuert méi lues wéi ouni Luedung: Auto an Unhänger bremse manner gutt a brauche méi Plaz an de Kéieren.',
          ],
        },
      },
    },
    category: {
      'porte-voiture': {
        sections: {
          s1: {
            h: 'Wéini en Autosunhänger lounen?',
            p: [
              'Fir en Auto heemzebréngen, deen net méi fiert, fir en Oldtimer ze transportéieren, ouni Kilometer dobäizefueren, oder fir en Auto ofzehuelen, deen Dir wäit vun doheem kaaft hutt. Mam Autosunhänger muss den transportéierten Auto net selwer fueren.',
            ],
          },
          s2: {
            h: 'En Auto sécher lueden',
            items: [
              'Kontrolléiert, datt den Auto net méi weit wéi d’Notzlaascht vum Unhänger.',
              'Fuert lues a riicht op d’Rampen erop, mat engem, deen Iech aweist.',
              'Stellt den Auto esou, datt e bësse Gewiicht op de viischten Deel vum Unhänger läit, sou wéi et an der Uleedung steet.',
              'Sécheert all Rad mat passend Spannrimmen a kontrolléiert se no den éischte Kilometer.',
            ],
          },
        },
      },
      'porte-moto': {
        sections: {
          s1: {
            h: 'Eng Moto transportéieren',
            p: [
              'Fir op eng Rennstreck ze fueren, eng Moto reparéieren ze loossen oder se nom Kaf heemzebréngen, ass de Motosunhänger méi einfach wéi eng Camionnette: D’Moto kënnt iwwer d’Ramp erop a steet da fest am Radhalter.',
            ],
          },
          s2: {
            h: 'D’Moto richteg festmaachen',
            items: [
              'Setzt d’Viischtrad fest an de Radhalter.',
              'Benotzt véier Spannrimmen, zwee vir an zwee hannen, u stabil Punkte vum Rumm.',
              'Dréckt d’Fiederung e bëssen zesummen, awer net ze vill.',
              'Kontrolléiert no den éischte Kilometer, ob d’Spannrimmen nach fest sinn.',
            ],
          },
        },
      },
      benne: {
        sections: {
          s1: {
            h: 'Opgepasst mam Gewiicht vum Material',
            p: [
              'Material, dat lass gelueden ass, weit vill. E Kubikmeter fiichte Buedem weit ongeféier 1,5 bis 1,8 Tonnen, e Kubikmeter Kis ongeféier 1,5 Tonnen. E Kipper, dee bis un de Rand voll ass, iwwerschreit also séier seng Notzlaascht.',
              'Kuckt d’Notzlaascht an den Detailer vum Unhänger no a luet deementspriechend: Léiwer zweemol fueren, wéi den Unhänger z’iwwerlueden.',
            ],
          },
          s2: {
            h: 'Chantier, Gaart, Recyclingszenter',
            items: [
              'Deckt d’Luedung mat enger Bâche oder engem Netz of, fir datt näischt op d’Strooss fält.',
              'Sortéiert den Offall, ier Dir lassfuert: Am Recyclingszenter spuert Dir esou Zäit.',
              'Kippt nëmmen op flaachem, festem Buedem of, wann den Unhänger ugekuppelt ass.',
            ],
          },
        },
      },
      frigorifique: {
        sections: {
          s1: {
            h: 'Fir wéi eng Geleeënheeten?',
            p: [
              'Familljefest, Hochzäit, Gebuertsdag, Kiermes, Maart oder Veräinsfest: De Killunhänger hält Gedrénks an Iessen op der Plaz frësch, wärend der ganzer Dauer vum Evenement.',
            ],
          },
          s2: {
            h: 'Esou benotzt Dir de Killunhänger',
            items: [
              'Schléisst den Unhänger e puer Stonne virum Lueden un, fir datt e scho kal ass.',
              'Luet am beschte Produiten, déi scho kal sinn: Et brauch Zäit, fir vill lauwarmt Gedrénks ofzekillen.',
              'Loosst tëscht de Keesse Plaz, fir datt d’Loft zirkuléiere kann.',
              'Suergt fir e passende Stroumuschloss no bei der Plaz, wou den Unhänger steet.',
            ],
          },
        },
      },
      camionnette: {
        sections: {
          s1: {
            h: 'Plënneren, Miwwelen, Material',
            p: [
              'Eng Camionnette passt fir ze plënneren, fir Miwwelen, Haushaltsapparater oder voluminéist Material, ouni datt Dir en Unhänger ukuppele musst. D’Luedung bleift och bei Reen dréchen.',
            ],
          },
          s2: {
            h: 'Tipps fir Ären Transport',
            items: [
              'Moosst grouss Miwwelen, ier Dir reservéiert.',
              'Stellt schwéier Saache ganz no bannen, géint d’Trennwand, a sécheert d’Luedung mat Spannrimmen.',
              'Schützt d’Miwwele mat Decken, fir datt se net verkraazt ginn.',
              'Denkt un d’Héicht vum Gefier, ier Dir an en ënnerierdesche Parking fuert.',
            ],
          },
        },
      },
    },
  },
};

export default lb;
