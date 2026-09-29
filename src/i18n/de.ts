import type { Dict } from './fr.ts';

/** Deutsch. */
const de: Dict = {
  meta: {
    lang: 'Deutsch',
    siteName: 'Garage Um Rond Point',
    ogAlt: 'Garage Um Rond Point am Kreisel in Erpeldange',
  },

  nav: {
    skip: 'Zum Inhalt springen',
    main: 'Hauptnavigation',
    rental: 'Mieten',
    cars: 'Autos',
    workshop: 'Werkstatt',
    trailersForSale: 'Anhänger kaufen',
    garden: 'Garten & Forst',
    contact: 'Kontakt',
    menu: 'Menü',
    close: 'Schließen',
    langLabel: 'Sprache',
    callAria: '+352 81 05 41 anrufen',
    home: 'Startseite',
    breadcrumb: 'Brotkrümelnavigation',
    logoAria: 'Garage Um Rond Point, Startseite',
  },

  contactBar: {
    label: 'Schnellkontakt',
    call: 'Anrufen',
    whatsapp: 'WhatsApp',
    ask: 'Anfragen',
    whatsappText: 'Guten Tag, ich habe eine Frage an die Garage Um Rond Point.',
  },

  status: {
    stock: { one: '{n} Auto im Bestand.', other: '{n} Autos im Bestand.' },
    updatedToday: 'Liste heute um {time} aktualisiert.',
    updatedYesterday: 'Liste gestern um {time} aktualisiert.',
    updatedOn: 'Liste am {date} um {time} aktualisiert.',
    never: 'Die Liste unserer Autos folgt bald.',
    everyMorning: 'Autoliste jeden Morgen aktualisiert.',
  },

  hero: {
    h1: 'Die Garage am Kreisel in Erpeldange',
    sub: 'Mieten Sie einen Anhänger oder Transporter, finden Sie Ihr nächstes Auto, lassen Sie Ihres warten und reparieren. 1, rue du Viaduc, neben der Aral-Tankstelle, zwischen Ettelbruck und Diekirch.',
    ctaFinder: 'Anhänger finden',
    ctaCars: 'Autos ansehen',
    drawingAlt: 'Plan des Kreisels in Erpeldange mit der Lage der Garage neben der Aral-Tankstelle',
  },

  finder: {
    h2: 'Welcher Anhänger passt?',
    intro:
      'Sagen Sie uns, was Sie transportieren und welchen Führerschein Sie haben. Sie sehen sofort, welche Anhänger passen, was sie kosten und ob Ihr Führerschein reicht.',
    cargoLegend: 'Was transportieren Sie?',
    cargo: {
      voiture: 'Ein Auto',
      moto: 'Ein Motorrad',
      terre: 'Erde, Bauschutt oder Grünschnitt',
      fete: 'Getränke und Essen für ein Fest',
      meubles: 'Möbel oder Kartons',
      materiel: 'Geräte oder Maschinen',
    },
    licenceLegend: 'Welchen Führerschein haben Sie?',
    licence: {
      B: 'Führerschein B',
      B96: 'Führerschein B mit Code 96',
      BE: 'Führerschein BE',
      unknown: 'Weiß ich nicht',
    },
    exactSummary: 'Genaue Berechnung für Ihr Auto (optional)',
    f2: 'Zulässige Gesamtmasse Ihres Autos (Feld F.2)',
    o1: 'Anhängelast gebremst (Feld O.1)',
    o2: 'Anhängelast ungebremst (Feld O.2)',
    kg: 'kg',
    exactHint: 'Diese Zahlen stehen in der Zulassungsbescheinigung Ihres Autos.',
    fleetCount: { one: '{n} Anhänger in unserer Flotte', other: '{n} Anhänger in unserer Flotte' },
    matchCount: { one: '{n} Anhänger passt', other: '{n} Anhänger passen' },
    none: 'Für diese Kombination passt kein Anhänger. Rufen Sie uns unter +352 81 05 41 an, wir beraten Sie.',
    vansHeading: 'Transporter',
    vanStatement: 'Einen Transporter bis 3.500 kg zulässige Gesamtmasse fahren Sie mit Führerschein B.',
    specs: {
      payload: 'Nutzlast',
      mma: 'Zulässige Gesamtmasse',
      empty: 'Leergewicht',
      surface: 'Ladefläche',
      height: 'Ladehöhe',
      braked: 'Gebremst',
      yes: 'ja',
      no: 'nein',
      socket: 'Stecker',
      socketValue: '{n}-polig',
      deposit: 'Kaution',
      volume: 'Innenvolumen',
      temp: 'Temperatur',
      power: 'Stromversorgung',
    },
    pallets: { one: '{n} Europalette', other: '{n} Europaletten' },
    volumeText: 'Innenvolumen {m3} m³',
    diagramLabel: 'Ladefläche {l} × {w} m',
    diagramPallets: '{n} Europaletten',
    verdict: {
      ok: 'Ihr Führerschein reicht.',
      needB96orBE: 'Sie brauchen Code 96 oder den Führerschein BE.',
      needBE: 'Sie brauchen den Führerschein BE.',
      dependsB:
        'Mit Führerschein B dürfen Auto und Anhänger zusammen höchstens 3.500 kg wiegen. Geben Sie das Gewicht Ihres Autos an (F.2), dann wissen Sie es.',
      dependsB96:
        'Mit Code 96 dürfen Auto und Anhänger zusammen höchstens 4.250 kg wiegen. Geben Sie das Gewicht Ihres Autos an (F.2), dann wissen Sie es.',
      required: 'Benötigter Führerschein: {licence}',
      requiredDepends: 'Benötigter Führerschein: je nach Auto B, B96 oder BE',
      towLimit: 'Voll beladen ist dieser Anhänger schwerer, als Ihr Auto ziehen darf ({limite} kg).',
    },
    licenceShort: { B: 'B', B96: 'B mit Code 96', BE: 'BE' },
    price: '{day} pro Tag, {weekend} pro Wochenende',
    priceMissing: '[FEHLT — Preis pro Tag und Wochenende]',
    request: 'Diesen Anhänger anfragen',
    requestVan: 'Diesen Transporter anfragen',
    seeAll: 'Ganze Flotte ansehen',
    finePrint:
      'Hinweis auf Grundlage der Führerscheinregeln in Luxemburg (transports.public.lu). Fragen Sie uns im Zweifel, bevor Sie losfahren.',
    sourceLink: 'Führerscheinregeln auf transports.public.lu',
    empty: 'Die Liste unserer Anhänger folgt bald. Rufen Sie uns unter +352 81 05 41 an.',
    noJsRules:
      'Mit Führerschein B dürfen Sie einen Anhänger bis 750 kg zulässige Gesamtmasse ziehen, oder einen schwereren Anhänger, wenn Auto und Anhänger zusammen höchstens 3.500 kg wiegen. Mit Code 96 darf das Gespann bis 4.250 kg wiegen. Darüber brauchen Sie den Führerschein BE.',
  },

  fleetTable: {
    h2: 'Unsere ganze Flotte',
    caption: 'Unsere Anhänger und Transporter zum Mieten',
    kind: 'Typ',
    payload: 'Nutzlast',
    mma: 'Zulässige Gesamtmasse',
    surface: 'Ladefläche',
    licence: 'Benötigter Führerschein',
    day: 'Preis pro Tag',
    weekend: 'Preis pro Wochenende',
    licenceDepends: 'je nach Auto',
  },

  categories: {
    'porte-voiture': 'Autotransporter',
    'porte-moto': 'Motorradanhänger',
    benne: 'Kipper',
    frigorifique: 'Kühlanhänger',
    plateau: 'Plattformanhänger',
    fourgon: 'Kofferanhänger',
    camionnette: 'Transporter',
    voiture: 'Auto',
  },

  cars: {
    homeH2: 'Unsere Autos im Bestand',
    h1: 'Neu- und Gebrauchtwagen',
    lead: 'Alle Autos im Bestand der Garage Um Rond Point am Kreisel in Erpeldange. Rufen Sie uns an oder schreiben Sie uns auf WhatsApp, bevor Sie vorbeikommen. Probefahrten nach Vereinbarung.',
    seeAll: { one: 'Das Auto ansehen', other: 'Alle {n} Autos ansehen' },
    year: 'Jahr',
    km: 'Kilometer',
    fuel: 'Kraftstoff',
    tagFresh: 'Neu im Bestand',
    tagNew: 'Neuwagen',
    price: 'Preis',
    noPhoto: 'Foto folgt',
    empty: 'Zurzeit ist kein Auto im Bestand. Rufen Sie uns unter +352 81 05 41 an.',
    filter: {
      summary: 'Filter ({n})',
      legend: 'Autos filtern',
      make: 'Marke',
      fuel: 'Kraftstoff',
      gearbox: 'Getriebe',
      maxPrice: 'Höchstpreis',
      condition: 'Zustand',
      sort: 'Sortierung',
      all: 'Alle',
      any: 'Beliebig',
      conditionNew: 'Neu',
      conditionUsed: 'Gebraucht',
      sortRecent: 'Neueste zuerst',
      sortPriceAsc: 'Preis aufsteigend',
      sortPriceDesc: 'Preis absteigend',
      sortKmAsc: 'Kilometerstand aufsteigend',
      count: { one: '{n} Auto', other: '{n} Autos' },
      empty: 'Kein Auto passt zu diesen Filtern.',
      reset: 'Filter zurücksetzen',
      upTo: 'bis {price}',
    },
  },

  enums: {
    fuel: {
      petrol: 'Benzin',
      diesel: 'Diesel',
      hybrid: 'Hybrid',
      plugin_hybrid: 'Plug-in-Hybrid',
      electric: 'Elektro',
      lpg: 'Autogas',
      other: 'Andere',
    },
    transmission: { automatic: 'Automatisch', manual: 'Manuell', other: 'Andere' },
    body: {
      estate: 'Kombi',
      saloon: 'Limousine',
      suv: 'SUV / Geländewagen',
      city: 'Kleinwagen',
      coupe: 'Coupé',
      convertible: 'Cabrio',
      mpv: 'Van',
      van: 'Nutzfahrzeug',
      pickup: 'Pick-up',
      other: 'Andere',
    },
    condition: { new: 'Neu', used: 'Gebraucht' },
    /** Farben aus den Inseraten (französisch) → Anzeige; unbekannte bleiben im Original */
    colors: {
      noir: 'Schwarz',
      blanc: 'Weiß',
      gris: 'Grau',
      argent: 'Silber',
      bleu: 'Blau',
      rouge: 'Rot',
      vert: 'Grün',
      jaune: 'Gelb',
      orange: 'Orange',
      marron: 'Braun',
      brun: 'Braun',
      beige: 'Beige',
      bordeaux: 'Bordeaux',
      violet: 'Violett',
      or: 'Gold',
      anthracite: 'Anthrazit',
    },
  },

  car: {
    specsH2: 'Technische Daten',
    firstReg: 'Erstzulassung',
    mileage: 'Kilometerstand',
    fuel: 'Kraftstoff',
    gearbox: 'Getriebe',
    power: 'Leistung',
    powerUnit: 'PS',
    displacement: 'Hubraum',
    body: 'Karosserie',
    seats: 'Sitzplätze',
    colorExt: 'Außenfarbe',
    colorInt: 'Innenfarbe',
    euro: 'Euro-Norm',
    wltp: 'Verbrauch und CO₂ (WLTP)',
    wltpMissing: 'Angaben in der Garage',
    ref: 'Ref.',
    notSpecified: 'nicht angegeben',
    condition: 'Zustand',
    vatRecoverable: 'MwSt. ausweisbar',
    equipmentH2: 'Ausstattung',
    equipmentMore: 'Alle {n} Ausstattungsmerkmale ansehen',
    descriptionH2: 'Beschreibung',
    originalNote: 'Originalbeschreibung auf Französisch',
    originalListNote: 'Originalliste auf Französisch',
    contactH2: 'Interessiert Sie dieses Auto?',
    contactText: 'Rufen Sie uns an, schreiben Sie uns auf WhatsApp oder senden Sie uns Ihre Anfrage.',
    whatsappText: 'Guten Tag, ist dieses Auto noch verfügbar: {make} {model} (Ref. {id})?',
    similarH2: 'Ähnliche Autos',
    sodablast: 'Für einen Oldtimer bieten wir auch Sodastrahlen (Sodablast) an.',
    sold: 'Dieses Auto wurde verkauft oder ist nicht mehr im Bestand.',
    backToList: 'Alle unsere Autos ansehen',
    gallery: {
      label: 'Fotos: {make} {model}',
      counter: '{i} / {n}',
      prev: 'Vorheriges Foto',
      next: 'Nächstes Foto',
      open: 'Fotos groß anzeigen',
      close: 'Schließen',
      thumbs: 'Miniaturansichten',
      thumb: 'Foto {i}',
      alt: '{make} {model} {version}, Foto {i} von {n}',
    },
  },

  photos: {
    heroWorkshop: 'Schwarzes Auto in einer modernen, hellen Werkstatt',
    workshop: 'Mechaniker bei der Arbeit im Motorraum eines Autos',
    sodablast: 'Rostiger Oldtimer mit abblätterndem Lack',
    bodywork: 'Roter Sportwagen auf einer Hebebühne in einer Werkstatt',
    garden: 'Benzinrasenmäher auf einem Rasen',
    gardenPage: 'Rasenmähen in der Sonne',
    paint: 'Lackieren einer Karosserie mit der Spritzpistole',
    rental: 'Weißer Pick-up auf einem Plateau',
    trailersSale: 'Kippanhänger mit Gitteraufsatz',
    fleetAlt: 'Foto: {name}',
    creditsH2: 'Beispielfotos',
    credits: 'Beispielfotos unter freier Lizenz:',
  },
  services: {
    h2: 'Unsere weiteren Leistungen',
    workshop: {
      h3: 'Werkstatt',
      text: 'Wartung, Diagnose und Reparatur Ihres Autos oder Transporters. Nach einem Blechschaden reparieren und lackieren wir die Karosserie Ihres Fahrzeugs.',
      link: 'Mechanik und Karosserie',
    },
    sodablast: {
      h3: 'Sodastrahlen (Sodablast)',
      text: 'Beim Sodastrahlen (Sodablast) strahlen wir Natron auf die Oberfläche und entfernen so Lack, Fett und Schmutz. Das schonende Verfahren beschädigt empfindliche Oberflächen nicht: alte Karosserien, Felgen, mechanische Teile.',
      link: 'Sodastrahlen (Sodablast)',
    },
    garden: {
      h3: 'Garten & Forst',
      text: 'Wir verkaufen und reparieren Garten- und Forstgeräte, vor allem der Marken Honda und Stihl.',
      link: 'Garten- und Forstgeräte',
    },
    trailers: {
      h3: 'Anhänger kaufen',
      text: 'Wir verkaufen Anhänger von Saris, Humbaur und WM Meyer, für Privat- und Geschäftskunden. Wir helfen Ihnen, einen Anhänger zu wählen, den Ihr Auto ziehen darf und für den Ihr Führerschein reicht.',
      link: 'Unsere Anhänger zum Kauf',
    },
    photoMissing: '[FEHLT — Foto]',
  },

  reviews: {
    h2: 'Google-Bewertungen',
    link: 'Alle Bewertungen auf Google lesen',
    missing: '[FEHLT — 2–3 vom Kunden freigegebene Zitate aus dem Google-Profil, mit Vorname + Initiale und Monat/Jahr]',
  },

  faq: {
    h2: 'Häufige Fragen',
    rentalH2: 'Fragen zur Miete',
    items: {
      permis: {
        q: 'Welchen Führerschein brauche ich, um einen Anhänger zu ziehen?',
        a: 'Mit Führerschein B dürfen Sie einen Anhänger bis 750 kg zulässige Gesamtmasse ziehen. Ein schwererer Anhänger ist erlaubt, wenn Auto und Anhänger zusammen höchstens 3.500 kg wiegen. Mit Code 96 in Ihrem Führerschein B darf das Gespann bis 4.250 kg wiegen. Darüber brauchen Sie den Führerschein BE. Damit dürfen Sie einen Anhänger bis 3.500 kg ziehen.',
      },
      carte: {
        q: 'Wo sehe ich, was mein Auto ziehen darf?',
        a: 'In der Zulassungsbescheinigung: Feld O.1 zeigt die Anhängelast gebremst, Feld O.2 die Anhängelast ungebremst. Die zulässige Gesamtmasse Ihres Autos steht in Feld F.2.',
      },
      prix: {
        q: 'Was kostet es, einen Anhänger zu mieten?',
        a: 'Den Preis pro Tag und pro Wochenende finden Sie bei jedem Anhänger in unserer Anhängersuche. [FEHLT — Preise der Flotte]',
      },
      louer: {
        q: 'Was brauche ich zum Mieten?',
        a: '[FEHLT — Mietbedingungen: Ausweis, Führerschein, Kaution, Stecker 7- oder 13-polig]',
      },
      reserver: {
        q: 'Muss ich im Voraus reservieren?',
        a: '[FEHLT — Reservierung, Abhol- und Rückgabezeiten]',
      },
      dispo: {
        q: 'Sind die Autos in der Liste noch verfügbar?',
        a: 'Wir aktualisieren die Liste jeden Morgen. Ein Auto, das im Laufe des Tages verkauft wird, kann bis zum nächsten Tag noch in der Liste stehen. Rufen Sie uns an oder schreiben Sie uns auf WhatsApp, bevor Sie vorbeikommen.',
      },
      marques: {
        q: 'Reparieren Sie alle Marken?',
        a: 'Ja, unsere Werkstatt wartet und repariert Autos und Transporter aller Marken. [UNBESTÄTIGT — Werden alle Marken repariert?]',
      },
      depot: {
        q: 'Können Sie mein Auto für mich verkaufen?',
        a: 'Ja, im Kommissionsverkauf: Wir bieten Ihr Auto zum Verkauf an und bringen Sie mit Käufern in Kontakt. Fragen Sie uns in der Garage oder am Telefon nach den Konditionen.',
      },
      langues: {
        q: 'Welche Sprachen sprechen Sie?',
        a: 'Luxemburgisch, Französisch, Deutsch, Englisch und Portugiesisch.',
      },
      paiement: {
        q: 'Wie kann ich bezahlen?',
        a: 'Bar, mit Karte (Visa, Mastercard oder V PAY), mit Payconiq, Apple Pay oder PayPal oder per Überweisung. [UNBESTÄTIGT — Zahlungsmittel]',
      },
    },
  },

  access: {
    h2: 'So finden Sie uns',
    address: 'Adresse',
    landmark: 'Am Kreisel, neben der Aral-Tankstelle, zwischen Ettelbruck und Diekirch.',
    hoursH3: 'Öffnungszeiten',
    languagesH3: 'Sprachen',
    languages: 'Wir sprechen Luxemburgisch, Französisch, Deutsch, Englisch und Portugiesisch.',
    mapLink: 'Route in Google Maps',
    external: '(externe Website)',
    mapTitle: 'Der Kreisel in Erpeldange',
    osm: '© OpenStreetMap-Mitwirkende',
    osmLabel: 'Kartendaten',
    labels: {
      garage: 'Garage Um Rond Point',
      aral: 'Aral',
      ettelbruck: 'Ettelbruck',
      diekirch: 'Diekirch',
      erpeldange: 'Erpeldange',
      rail: 'Bahnlinie',
      sure: 'Sauer',
    },
  },

  hours: {
    caption: 'Öffnungszeiten der Garage Um Rond Point',
    day: 'Tag',
    time: 'Uhrzeit',
    days: {
      mo: 'Montag',
      tu: 'Dienstag',
      we: 'Mittwoch',
      th: 'Donnerstag',
      fr: 'Freitag',
      sa: 'Samstag',
      su: 'Sonntag',
    },
    closed: 'Geschlossen',
    today: 'heute',
    and: 'und',
    holidays: 'Feiertage: [UNBESTÄTIGT — Feiertage vermutlich geschlossen]',
    short: 'Montag bis Freitag {weekday}, Samstag {saturday}',
  },

  footer: {
    hoursH: 'Öffnungszeiten',
    followH: 'Folgen Sie uns',
    portals: 'Unsere Anzeigen finden Sie auch auf {luxauto} und {autoscout}',
    legal: 'Impressum',
    privacy: 'Datenschutz',
    tiktokMissing: 'TikTok [UNBESTÄTIGT — genaue URL]',
  },

  depot: {
    h2: 'Möchten Sie Ihr Auto verkaufen?',
    text: 'Im Kommissionsverkauf bieten wir Ihr Auto zum Verkauf an und bringen Sie mit Käufern in Kontakt. Erzählen Sie uns von Ihrem Auto, wir erklären Ihnen die Konditionen.',
    missing: '[FEHLT — Konditionen Kommissionsverkauf]',
    link: 'Mein Auto anbieten',
  },

  pages: {
    rental: {
      h1: 'Anhänger und Transporter mieten in Erpeldange',
      lead: 'Autotransporter und Motorradanhänger, Kipper, Kühlanhänger für Ihr Fest, Transporter. Für einen Tag oder fürs Wochenende.',
      durationsMissing: '[UNBESTÄTIGT — Mietdauern Tag / Wochenende]',
      conditionsH2: 'Mietbedingungen',
      conditionsMissing:
        '[FEHLT — Mietbedingungen: Ausweis, Führerschein, Kaution, Abhol- und Rückgabezeiten, Reservierung]',
      formH2: 'Mietanfrage',
      formIntro: 'Wählen Sie den Anhänger und die Daten. Wir rufen Sie zur Bestätigung zurück.',
    },
    category: {
      h1: {
        'porte-voiture': 'Autotransporter mieten in Erpeldange',
        'porte-moto': 'Motorradanhänger mieten in Erpeldange',
        benne: 'Kipper mieten in Erpeldange',
        frigorifique: 'Kühlanhänger mieten in Erpeldange',
        camionnette: 'Transporter mieten in Erpeldange',
      },
      intro: {
        'porte-voiture':
          'Mit dem Autotransporter transportieren Sie ein Auto mit Panne, einen Oldtimer oder ein Auto, das Sie gerade gekauft haben. Prüfen Sie vor der Abfahrt, ob Ihr Auto das Gespann ziehen darf und ob Ihr Führerschein reicht.',
        'porte-moto':
          'Mit dem Motorradanhänger bringen Sie ein Motorrad, einen Roller oder ein Quad in die Werkstatt, in den Urlaub oder auf die Rennstrecke. Sie ziehen ihn mit einem normalen Auto.',
        benne:
          'Mit dem Kipper transportieren Sie Erde, Bauschutt, Sand oder Grünschnitt und kippen die Ladung ab. Für die Baustelle, den Garten oder die Fahrt zum Recyclingcenter.',
        frigorifique:
          'Der Kühlanhänger hält Getränke und Essen während eines Fests, einer Hochzeit oder eines Festivals kühl. Sie stellen ihn für die Dauer der Veranstaltung vor Ort ab.',
        camionnette:
          'Mit dem Transporter ziehen Sie um oder transportieren Möbel oder Geräte. Bis 3.500 kg zulässige Gesamtmasse fahren Sie ihn mit Führerschein B.',
      },
      vehiclesH2: 'Unsere Fahrzeuge',
      licenceH2: 'Welcher Führerschein?',
      backToFinder: 'Mit allen unseren Anhängern vergleichen',
    },
    workshop: {
      h1: 'Mechanik und Karosserie in Erpeldange',
      lead: 'Wartung, Diagnose und Reparatur Ihres Autos oder Transporters. Nach einem Blechschaden reparieren und lackieren wir die Karosserie Ihres Fahrzeugs.',
      whatH2: 'Das macht unsere Werkstatt',
      items: {
        entretien: 'Wartung und Inspektion',
        diagnostic: 'Fehlerdiagnose',
        reparation: 'Mechanische Reparaturen',
        carrosserie: 'Karosserie und Lack',
      },
      extraMissing:
        '[UNBESTÄTIGT — weitere Leistungen laut Editus: Richtbank, Smart Repair, Ausbeulen, Turbo, 4x4, Restaurierung alter Autos; erst nach Bestätigung zeigen]',
      transparency: 'Vor jeder Arbeit erklären wir Ihnen, was wir machen. Sie erhalten eine detaillierte Rechnung.',
      transparencyMissing: '[UNBESTÄTIGT — Kostenvoranschlag vorher, detaillierte Rechnung?]',
      formH2: 'Termin anfragen',
      formIntro: 'Sagen Sie uns, um welches Fahrzeug es geht und was zu tun ist. Wir rufen Sie zurück, um den Termin zu vereinbaren.',
    },
    sodablast: {
      h1: 'Sodastrahlen (Sodablast) in Erpeldange',
      lead: 'Beim Sodastrahlen (Sodablast) strahlen wir Natron auf die Oberfläche und entfernen so Lack, Fett und Schmutz. Das schonende Verfahren beschädigt empfindliche Oberflächen nicht: alte Karosserien, Felgen, mechanische Teile.',
      whatH2: 'Wofür?',
      items: {
        carrosserie: 'Alte Karosserien, vor einer Restaurierung',
        jantes: 'Felgen',
        pieces: 'Mechanische Teile',
      },
      photosH2: 'Vorher und nachher',
      photosMissing: '[FEHLT — Vorher-nachher-Fotos Sodablast]',
      whatsapp: 'Schicken Sie uns Fotos auf WhatsApp für eine erste Einschätzung.',
      whatsappText: 'Guten Tag, hier sind Fotos für eine erste Einschätzung zum Sodastrahlen.',
      whatsappLink: 'Fotos auf WhatsApp senden',
      formH2: 'Termin anfragen',
    },
    trailersForSale: {
      h1: 'Anhänger kaufen in Erpeldange',
      lead: 'Wir verkaufen Anhänger von Saris, Humbaur und WM Meyer, für Privat- und Geschäftskunden.',
      dealerMissing: '[UNBESTÄTIGT — Händlerstatus Saris, Humbaur, WM Meyer; Logos nur mit Freigabe]',
      adviceH2: 'Welcher Führerschein für welchen Anhänger?',
      advice:
        'Wir helfen Ihnen, einen Anhänger zu wählen, den Ihr Auto ziehen darf und für den Ihr Führerschein reicht: Größe, zulässige Gesamtmasse, Bremse. Unsere Anhängersuche für die Miete zeigt Ihnen die Führerscheinregeln mit Beispielen.',
      adviceLink: 'Welcher Führerschein für welchen Anhänger?',
      stockH2: 'Anhänger auf Lager',
      stockMissing: '[FEHLT — Anhänger auf Lager]',
      formH2: 'Haben Sie eine Frage zu einem Anhänger?',
    },
    garden: {
      h1: 'Garten- und Forstgeräte in Erpeldange',
      lead: 'Wir verkaufen und reparieren Garten- und Forstgeräte, vor allem der Marken Honda und Stihl.',
      dealerMissing: '[UNBESTÄTIGT — Händlerstatus Honda und Stihl; Logos nur mit Freigabe]',
      whatH2: 'Verkauf und Reparatur',
      text: 'Rasenmäher, Freischneider, Motorsäge oder Heckenschere: Bringen Sie Ihr Gerät in die Werkstatt oder lassen Sie sich bei der Wahl eines neuen Geräts beraten.',
      formH2: 'Reparatur anfragen',
    },
    contact: {
      h1: 'Kontakt und Anfahrt',
      lead: 'Garage Um Rond Point, 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre. Am Kreisel, neben der Aral-Tankstelle. Telefon +352 81 05 41, WhatsApp +352 621 373 272, info@rondpoint.lu. Wir sprechen Luxemburgisch, Französisch, Deutsch, Englisch und Portugiesisch.',
      waysH2: 'So erreichen Sie uns',
      phone: 'Telefon',
      whatsapp: 'WhatsApp',
      email: 'E-Mail',
      paymentH2: 'Bezahlung',
      payment: 'Bar, mit Karte (Visa, Mastercard oder V PAY), mit Payconiq, Apple Pay oder PayPal oder per Überweisung.',
      paymentMissing: '[UNBESTÄTIGT — Zahlungsmittel]',
      formH2: 'Schreiben Sie uns',
    },
    thanks: {
      h1: 'Ihre Anfrage ist angekommen',
      text: 'Wir antworten Ihnen [FEHLT — Antwortzeit, z. B. « le jour ouvrable suivant »]. Ist es dringend? Rufen Sie +352 81 05 41 an.',
      back: 'Zur Startseite',
    },
    notFound: {
      h1: 'Seite nicht gefunden',
      text: 'Diese Seite gibt es nicht oder nicht mehr. Ein verkauftes Auto verschwindet aus unserer Liste.',
    },
  },

  forms: {
    optional: 'optional',
    name: 'Name',
    phone: 'Telefon',
    phoneHint: 'Wir rufen Sie zurück.',
    email: 'E-Mail',
    message: 'Nachricht',
    consent:
      'Ich bin einverstanden, dass Garage Um Rond Point meine Daten nutzt, um meine Anfrage zu beantworten. Mehr dazu in der {link}.',
    consentLink: 'Datenschutzerklärung',
    honeypot: 'Füllen Sie dieses Feld nicht aus',
    choose: 'Bitte wählen …',
    sending: 'Wird gesendet …',
    successH: 'Ihre Anfrage ist angekommen.',
    successText: 'Wir antworten Ihnen so bald wie möglich. Ist es dringend? Rufen Sie +352 81 05 41 an.',
    errorSummary: 'Prüfen Sie die markierten Felder.',
    errorSend: 'Die Anfrage wurde nicht gesendet. Versuchen Sie es noch einmal oder rufen Sie uns unter +352 81 05 41 an.',
    errorRate: 'Sie haben heute schon viele Anfragen gesendet. Rufen Sie uns unter +352 81 05 41 an.',
    errors: {
      name: 'Geben Sie Ihren Namen ein.',
      phone: 'Geben Sie eine Telefonnummer ein, damit wir Sie zurückrufen können.',
      phoneInvalid:
        'Diese Nummer scheint unvollständig. Geben Sie sie mit Ländervorwahl ein, zum Beispiel +352 621 123 456.',
      email: 'Diese E-Mail-Adresse ist ungültig. Sie muss ein @ enthalten, zum Beispiel name@beispiel.lu.',
      consent: 'Kreuzen Sie das Kästchen an, damit wir Ihre Daten nutzen dürfen, um Ihnen zu antworten.',
      vehicle: 'Wählen Sie einen Anhänger oder ein Fahrzeug.',
      from: 'Geben Sie das Anfangsdatum ein.',
      to: 'Geben Sie das Enddatum ein.',
      toBeforeFrom: 'Das Datum „Bis“ darf nicht vor dem Datum „Von“ liegen.',
      past: 'Wählen Sie ein Datum ab heute.',
      wish: 'Wählen Sie, was Sie möchten.',
      reason: 'Wählen Sie, wofür Sie kommen.',
      machine: 'Geben Sie das Fahrzeug oder Gerät an.',
      work: 'Beschreiben Sie, was zu tun ist.',
      subject: 'Wählen Sie ein Thema.',
      message: 'Schreiben Sie Ihre Nachricht.',
    },
    rental: {
      vehicle: 'Gewünschter Anhänger oder gewünschtes Fahrzeug',
      from: 'Von',
      to: 'Bis',
      licence: 'Ihr Führerschein',
      licenceNone: 'Keine Angabe',
      licenceB: 'B',
      licenceB96: 'B + Code 96',
      licenceBE: 'BE',
      submit: 'Mietanfrage senden',
      noFleet: 'Schreiben Sie uns in der Nachricht, was Sie mieten möchten.',
      other: 'Anderes, in der Nachricht beschrieben',
    },
    car: {
      carLabel: 'Auto',
      wish: 'Sie möchten',
      wishTest: 'Eine Probefahrt',
      wishInfo: 'Mehr Informationen',
      wishTradeIn: 'Mein Auto in Zahlung geben',
      tradeInH: 'Nur bei Inzahlungnahme',
      tradeMake: 'Marke und Modell',
      tradeYear: 'Jahr',
      tradeKm: 'Kilometerstand',
      title: 'Informationen anfragen',
      submit: 'Anfrage senden',
    },
    workshop: {
      reason: 'Wofür?',
      reasonMaintenance: 'Wartung',
      reasonRepair: 'Panne oder Reparatur',
      reasonBody: 'Karosserie',
      reasonSodablast: 'Sodastrahlen (Sodablast)',
      reasonGarden: 'Garten- oder Forstgerät',
      machine: 'Fahrzeug oder Gerät',
      machineHint: 'Marke, Modell und Jahr, zum Beispiel: VW Golf 2018.',
      work: 'Was ist zu tun?',
      date: 'Wunschtermin',
      photos: 'Für Karosserie oder Sodastrahlen schicken Sie uns Fotos auf WhatsApp: +352 621 373 272.',
      submit: 'Termin anfragen',
    },
    contact: {
      subject: 'Thema',
      subjectQuestion: 'Allgemeine Frage',
      subjectTrailer: 'Anhängerkauf',
      subjectDepot: 'Kommissionsverkauf',
      subjectOther: 'Anderes',
      submit: 'Nachricht senden',
    },
  },

  seo: {
    home: {
      title: 'Garage Um Rond Point Erpeldange – Anhänger, Autos, Werkstatt',
      description:
        'Am Kreisel in Erpeldange, zwischen Ettelbruck und Diekirch: Anhänger und Transporter mieten, Neu- und Gebrauchtwagen, Werkstatt für Mechanik und Karosserie.',
    },
    rental: {
      title: 'Anhänger mieten in Erpeldange bei Ettelbruck | Um Rond Point',
      description:
        'Autotransporter, Motorradanhänger, Kipper, Kühlanhänger oder Transporter: Sehen Sie, welcher Anhänger passt, was er kostet und ob Ihr Führerschein reicht.',
    },
    category: {
      title: {
        'porte-voiture': 'Autotransporter mieten in Erpeldange | Garage Um Rond Point',
        'porte-moto': 'Motorradanhänger mieten in Erpeldange | Garage Um Rond Point',
        benne: 'Kipper mieten in Erpeldange bei Ettelbruck | Um Rond Point',
        frigorifique: 'Kühlanhänger mieten in Erpeldange | Garage Um Rond Point',
        camionnette: 'Transporter mieten in Erpeldange | Garage Um Rond Point',
      },
      description: {
        'porte-voiture':
          'Mieten Sie einen Autotransporter am Kreisel in Erpeldange in der Nähe von Ettelbruck: Maße, Nutzlast, Preis und benötigter Führerschein für jeden Anhänger.',
        'porte-moto':
          'Mieten Sie einen Motorradanhänger am Kreisel in Erpeldange in der Nähe von Ettelbruck: Maße, Nutzlast, Preis und benötigter Führerschein für jeden Anhänger.',
        benne:
          'Mieten Sie einen Kipper für Erde, Bauschutt oder Grünschnitt am Kreisel in Erpeldange in der Nähe von Ettelbruck: Nutzlast, Preis und benötigter Führerschein.',
        frigorifique:
          'Mieten Sie einen Kühlanhänger für Ihr Fest oder Festival am Kreisel in Erpeldange bei Ettelbruck: Volumen, Temperatur, Preis und benötigter Führerschein.',
        camionnette:
          'Mieten Sie einen Transporter für einen Umzug oder Material am Kreisel in Erpeldange bei Ettelbruck. Bis 3.500 kg reicht Führerschein B. Preis pro Tag.',
      },
    },
    cars: {
      title: 'Gebrauchtwagen und Neuwagen bei Ettelbruck | Um Rond Point',
      description:
        'Alle Autos im Bestand der Garage Um Rond Point in Erpeldange: Preis, Kilometerstand und Fotos. Liste jeden Morgen aktualisiert. Probefahrt nach Vereinbarung.',
    },
    car: {
      suffixLong: ' | Garage Um Rond Point',
      suffixShort: ' | Um Rond Point',
      place: ' in Erpeldange',
      descTail: 'Zu sehen in der Garage Um Rond Point in Erpeldange.',
      descExtra: [' Probefahrt nach Vereinbarung.', ' Zwischen Ettelbruck und Diekirch.', ' Rufen Sie +352 81 05 41 an.'],
      descGearbox: 'Getriebe: {gearbox}',
      soldTitle: '{make} {model} verkauft | Garage Um Rond Point, Erpeldange',
      soldDescription:
        '{make} {model}: Dieses Auto wurde verkauft oder ist nicht mehr im Bestand. Sehen Sie sich die anderen Neu- und Gebrauchtwagen der Garage Um Rond Point in Erpeldange an.',
    },
    workshop: {
      title: 'Autowerkstatt bei Ettelbruck: Mechanik und Karosserie',
      description:
        'Wartung, Diagnose, Reparatur, Karosserie und Lackierung in der Garage am Kreisel in Erpeldange, bei Ettelbruck und Diekirch. Fragen Sie online einen Termin an.',
    },
    sodablast: {
      title: 'Sodastrahlen (Sodablast) in Luxemburg | Garage Um Rond Point',
      description:
        'Sodastrahlen entfernt Lack und Schmutz, ohne die Oberfläche zu beschädigen: Oldtimer, Felgen, mechanische Teile. In Erpeldange zwischen Ettelbruck und Diekirch.',
    },
    trailersForSale: {
      title: 'Anhänger kaufen in Luxemburg: Humbaur, Saris, WM Meyer',
      description:
        'Kaufen Sie Ihren Anhänger in Erpeldange: Humbaur, Saris oder WM Meyer. Wir helfen Ihnen, Größe und Gewicht passend zu Ihrem Auto und Führerschein zu wählen.',
    },
    garden: {
      title: 'Garten- und Forstgeräte von Honda und Stihl in Erpeldange',
      description:
        'Verkauf und Reparatur von Garten- und Forstgeräten, vor allem Honda und Stihl, in der Garage Um Rond Point in Erpeldange, zwischen Ettelbruck und Diekirch.',
    },
    contact: {
      title: 'Kontakt und Anfahrt | Garage Um Rond Point, Erpeldange',
      description:
        '1, rue du Viaduc in Erpeldange-sur-Sûre, am Kreisel neben der Aral-Tankstelle. Montag bis Freitag 7:45–12 und 13–18 Uhr, Samstag 8–12 Uhr. Tel. +352 81 05 41.',
    },
    thanks: {
      title: 'Anfrage gesendet | Garage Um Rond Point, Erpeldange-sur-Sûre',
      description:
        'Ihre Anfrage ist bei der Garage Um Rond Point in Erpeldange angekommen. Wir antworten Ihnen schnell. Ist es dringend? Rufen Sie uns unter +352 81 05 41 an.',
    },
    legal: {
      title: 'Impressum | Garage Um Rond Point, Erpeldange-sur-Sûre',
      description:
        'Impressum der Garage Um Rond Point S.à r.l., 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre: Herausgeber, Handelsregister B296148, MwSt. LU36559673, Hosting.',
    },
    privacy: {
      title: 'Datenschutzerklärung | Garage Um Rond Point, Erpeldange',
      description:
        'Welche Daten die Garage Um Rond Point verarbeitet, wenn Sie uns schreiben, warum, wie lange und welche Rechte Sie haben. Ohne Cookies, ohne Tracking-Tools.',
    },
  },

  legal: {
    h1: 'Impressum',
    publisherH2: 'Herausgeber der Website',
    company: 'Firmenname',
    legalForm: 'Rechtsform',
    address: 'Sitz',
    phone: 'Telefon',
    email: 'E-Mail',
    rcs: 'Handelsregister',
    vat: 'MwSt.-Nummer',
    registered: 'Eintragung',
    manager: 'Geschäftsführer',
    permit: 'Niederlassungsgenehmigung',
    capital: 'Gesellschaftskapital',
    managerMissing: '[UNBESTÄTIGT — Gérant David Moreira laut Editus]',
    permitMissing: '[FEHLT — Nummer der Gewerbegenehmigung]',
    capitalMissing: '[FEHLT — Gesellschaftskapital]',
    hostingH2: 'Hosting',
    hosting:
      'Die Website wird von GitHub Pages gehostet, einem Dienst der GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, Vereinigte Staaten.',
    contentH2: 'Inhalt',
    content:
      'Die Autoanzeigen übernehmen unsere eigenen Anzeigen auf LuxAuto und AutoScout24. Preise und technische Daten können sich ändern; maßgeblich ist allein das in der Garage bestätigte Angebot.',
    photosH2: 'Fotos und Plan',
    photos:
      'Plan des Kreisels gezeichnet nach Daten von OpenStreetMap (© OpenStreetMap-Mitwirkende, Lizenz ODbL). Fotos der Autos: unsere eigenen Anzeigen.',
    fontH2: 'Schriftart',
    font: 'Archivo, Omnibus-Type, SIL Open Font License 1.1.',
  },

  privacy: {
    h1: 'Datenschutzerklärung',
    intro:
      'Wir verarbeiten Ihre Daten nur, um Ihre Anfragen zu beantworten. Diese Website setzt keine Cookies und nutzt keine Tracking- oder Werbetools.',
    controllerH2: 'Verantwortlicher',
    controller:
      'Garage Um Rond Point S.à r.l., 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre, Luxemburg. Telefon +352 81 05 41, info@rondpoint.lu.',
    formsH2: 'Anfrageformulare',
    forms:
      'Wenn Sie ein Formular senden, erhalten wir die Daten, die Sie eingeben: Name, Telefon, E-Mail, falls Sie sie angeben, Ihre Nachricht und die Einzelheiten Ihrer Anfrage (zum Beispiel Mietzeitraum, Fahrzeug, Wunschtermin). Wir nutzen sie, um Ihnen zu antworten und ein Angebot oder einen Termin vorzubereiten.',
    legalBasis:
      'Rechtsgrundlage: Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die Sie durch Ankreuzen des Kästchens geben, und vorvertragliche Maßnahmen auf Ihre Anfrage (Art. 6 Abs. 1 lit. b DSGVO). Sie können Ihre Einwilligung jederzeit per E-Mail oder Telefon widerrufen.',
    storage:
      'Ihre Anfrage wird in einer Datenbank bei Supabase (Region Europäische Union) gespeichert und uns per E-Mail über [UNBESTÄTIGT — EU-Mailanbieter, mit Nave klären] zugestellt. Die Anfragen werden nach 90 Tagen automatisch gelöscht [UNBESTÄTIGT — Frist mit Kunde bestätigen]. Korrespondenz, die zu einem Vertrag führt, bewahren wir entsprechend den buchhalterischen Aufbewahrungspflichten auf.',
    abuse:
      'Um Missbrauch zu begrenzen, speichern wir 24 Stunden lang einen kryptografischen Hashwert Ihrer IP-Adresse. Daraus lässt sich Ihre Adresse nicht ermitteln.',
    hostingH2: 'Hosting und Server-Logdateien',
    hosting:
      'Die Website wird von GitHub Pages (GitHub, Inc., Vereinigte Staaten) gehostet. Bei jedem Besuch verarbeitet GitHub Ihre IP-Adresse und technische Daten, um die Seiten auszuliefern und die Sicherheit zu gewährleisten. GitHub ist nach dem EU-US-Datenschutzrahmen (EU-US Data Privacy Framework) zertifiziert. Rechtsgrundlage: unser berechtigtes Interesse an einer sicheren und verfügbaren Website (Art. 6 Abs. 1 lit. f DSGVO).',
    linksH2: 'Links zu anderen Diensten',
    links:
      'Die Website lädt keine externen Inhalte: Schriften, Fotos und Plan werden mit der Website gehostet. Links zu Google Maps, WhatsApp, Facebook, Instagram, TikTok, LuxAuto und AutoScout24 öffnen sich nur, wenn Sie darauf klicken. Diese Dienste verarbeiten Ihre Daten dann nach ihren eigenen Regeln. WhatsApp gehört zu Meta Platforms; wenn Sie uns auf WhatsApp schreiben, verarbeitet Meta Ihre Nummer und Ihre Nachrichten.',
    rightsH2: 'Ihre Rechte',
    rights:
      'Sie können Auskunft über Ihre Daten, ihre Berichtigung, ihre Löschung, die Einschränkung der Verarbeitung und die Datenübertragbarkeit verlangen und der Verarbeitung widersprechen. Schreiben Sie uns an info@rondpoint.lu. Sie können außerdem eine Beschwerde bei der Nationalen Kommission für den Datenschutz (CNPD) einreichen: 15, boulevard du Jazz, L-4370 Belvaux, cnpd.public.lu.',
    updated: 'Stand: {date}',
  },
  /** Leiste im Startbildschirm: alle Leistungen auf einen Blick (Titel aus nav.*) */
  offer: {
    label: 'Unsere Leistungen auf einen Blick',
    sub: {
      rental: 'Anhänger und Transporter',
      cars: 'Bestand jeden Morgen aktuell',
      workshop: 'Mechanik und Karosserie',
      trailers: 'Saris, Humbaur, WM Meyer',
      garden: 'Honda und Stihl',
      sodablast: 'Schonendes Entlacken',
    },
  },
  /** Kurzes „Über uns“ auf der Startseite (nur bestätigte Angaben: Lage, Leistungen, Sprachen, Öffnungstage) */
  about: {
    h2: 'Über uns',
    text: 'Garage Um Rond Point ist Ihre Garage am Kreisel in Erpeldange, zwischen Ettelbruck und Diekirch. Anhänger und Transporter mieten, Autos und Anhänger kaufen, Werkstatt und Gartenmaschinen: alles unter einer Adresse. Kommen Sie vorbei – wir sprechen Ihre Sprache.',
    link: 'So finden Sie uns',
    photoAlt: 'Mechaniker reicht einen Autoschlüssel',
  },
  /** Startseite: Stichpunkte; Unterseiten: ausführliche Erklärungen */
  details: {
    points: {
      workshop: [
        'Wartung und Inspektion',
        'Fehlerdiagnose',
        'Mechanische Reparatur',
        'Karosserie und Lack',
      ],
      sodablast: [
        'Schonendes Entlacken mit Natron',
        'Oldtimer-Karosserien, Felgen, mechanische Teile',
        'Erste Einschätzung per Foto über WhatsApp',
      ],
      garden: [
        'Verkauf von Garten- und Forstmaschinen',
        'Reparatur Ihrer Maschinen',
        'Vor allem Honda und Stihl',
      ],
      trailers: [
        'Anhänger von Saris, Humbaur und WM Meyer',
        'Für Privatleute und Betriebe',
        'Beratung zu Gewicht und Führerschein',
      ],
    },
    workshop: {
      entretienH: 'Wartung und Inspektion',
      entretien: 'Regelmäßige Wartung hält Ihr Auto zuverlässig und sicher: Ölwechsel, Filter, Bremsen, Füllstände und allgemeine Kontrolle. Nennen Sie uns in Ihrer Anfrage den Kilometerstand und das Datum der letzten Wartung.',
      diagnosticH: 'Fehlerdiagnose',
      diagnostic: 'Eine Warnleuchte geht an, ein ungewohntes Geräusch, das Auto springt schlecht an: Beschreiben Sie, was Sie bemerken und seit wann. Die Diagnose findet die Ursache, bevor repariert wird.',
      reparationH: 'Mechanische Reparatur',
      reparation: 'Nach der Diagnose reparieren wir Ihr Auto oder Ihren Transporter in unserer Werkstatt am Kreisel in Erpeldange.',
      carrosserieH: 'Karosserie und Lack',
      carrosserie: 'Nach einem Blechschaden reparieren wir die Karosserie und lackieren die beschädigten Teile neu. Schicken Sie uns Fotos der Schäden per WhatsApp für eine erste Einschätzung.',
      processH2: 'So bekommen Sie einen Termin',
      process: [
        'Beschreiben Sie Ihr Fahrzeug und was zu tun ist – im Formular, am Telefon oder per WhatsApp.',
        'Wir rufen Sie zurück und vereinbaren den Termin.',
        'Sie bringen Ihr Fahrzeug in die Garage, 1, rue du Viaduc.',
      ],
    },
    sodablast: {
      explainH2: 'Wie funktioniert Sodastrahlen?',
      explain: 'Natron (Natriumhydrogencarbonat) wird mit Druckluft auf die Oberfläche gestrahlt. Es ist weicher als Sand und entfernt Lack, Fett und Schmutz, ohne das Metall anzugreifen. Deshalb eignet es sich für empfindliche Teile und alte Karosserien.',
      explain2: 'Das Entlacken legt die ursprüngliche Oberfläche frei: Sie sehen den echten Zustand des Metalls vor einer Reparatur oder neuen Lackierung.',
      processH2: 'So läuft das Entlacken ab',
      process: [
        'Schicken Sie uns Fotos des Autos oder des Teils per WhatsApp.',
        'Sie bekommen eine erste Einschätzung.',
        'Wir vereinbaren gemeinsam einen Termin in der Garage.',
      ],
    },
    garden: {
      saleH2: 'Verkauf',
      sale: 'Rasenmäher, Freischneider, Motorsäge oder Heckenschere: Wir verkaufen Garten- und Forstmaschinen, vor allem der Marken Honda und Stihl. Sagen Sie uns, wie groß Ihr Grundstück ist und was Sie vorhaben, wir beraten Sie bei der Wahl.',
      repairH2: 'Reparatur',
      repair: 'Der Rasenmäher springt nicht mehr an, die Motorsäge schneidet schlecht, der Freischneider verliert Leistung? Bringen Sie Ihre Maschine in die Werkstatt oder beschreiben Sie das Problem im Formular.',
    },
    trailers: {
      chooseH2: 'Den richtigen Anhänger wählen',
      masseH: 'Zulässige Gesamtmasse',
      masse: 'Sie bestimmt den nötigen Führerschein. Bis 750 kg reicht Führerschein B, darüber hängt es von Ihrem Auto ab.',
      freinH: 'Bremsen',
      frein: 'Ein Anhänger mit mehr als 750 kg zulässiger Gesamtmasse muss gebremst sein.',
      chargeH: 'Anhängelast',
      charge: 'Ihr Auto darf nicht mehr ziehen als im Feld O.1 (gebremst) oder O.2 (ungebremst) der Zulassungsbescheinigung steht.',
      usageH: 'Bauart und Maße',
      usage: 'Hochlader, Kipper, Autotransporter oder Kofferanhänger: Der passende Anhänger hängt davon ab, was Sie am häufigsten transportieren und wo Sie ihn abstellen.',
    },
  },
};

export default de;
