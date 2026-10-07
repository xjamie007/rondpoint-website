import type { Dict } from './fr.ts';

/** English (British). */
const en: Dict = {
  meta: {
    lang: 'English',
    siteName: 'Garage Um Rond Point',
    ogAlt: 'Garage Um Rond Point at the Erpeldange roundabout',
  },

  nav: {
    skip: 'Skip to content',
    main: 'Main navigation',
    rental: 'Hire',
    cars: 'Cars',
    workshop: 'Workshop',
    trailersForSale: 'Trailers for sale',
    garden: 'Garden & forestry',
    contact: 'Contact',
    menu: 'Menu',
    close: 'Close',
    langLabel: 'Language',
    callAria: 'Call +352 81 05 41',
    home: 'Home',
    breadcrumb: 'Breadcrumb',
    logoAria: 'Garage Um Rond Point, home',
  },

  contactBar: {
    label: 'Quick contact',
    call: 'Call',
    whatsapp: 'WhatsApp',
    ask: 'Ask',
    whatsappText: 'Hello, I have a question for Garage Um Rond Point.',
  },

  status: {
    stock: { one: '{n} car in stock.', other: '{n} cars in stock.' },
    updatedToday: 'List updated today at {time}.',
    updatedYesterday: 'List updated yesterday at {time}.',
    updatedOn: 'List updated on {date} at {time}.',
    never: 'Our list of cars is coming soon.',
    everyMorning: 'Car list updated every morning.',
  },

  hero: {
    h1: 'The garage at the Erpeldange roundabout',
    sub: 'Hire a trailer or a van, find your next car, have yours serviced and repaired. At 1, rue du Viaduc, next to the Aral station, between Ettelbruck and Diekirch.',
    ctaFinder: 'Find a trailer',
    ctaCars: 'See the cars',
    drawingAlt: 'Map of the Erpeldange roundabout showing the garage next to the Aral station',
  },

  finder: {
    h2: 'Which trailer do you need?',
    intro:
      'Tell us what you are carrying and which licence you have. You will see straight away which trailers fit, what they cost and whether your licence is enough.',
    cargoLegend: 'What are you carrying?',
    cargo: {
      voiture: 'A car',
      moto: 'A motorbike',
      terre: 'Soil, rubble or garden waste',
      fete: 'Drinks and food for a party',
      meubles: 'Furniture or boxes',
      materiel: 'Equipment or machinery',
    },
    licenceLegend: 'Which licence do you have?',
    licence: {
      B: 'B licence',
      B96: 'B licence with code 96',
      BE: 'BE licence',
      unknown: 'I don’t know',
    },
    exactSummary: 'Exact calculation for your car (optional)',
    f2: 'Maximum authorised mass of your car (field F.2)',
    o1: 'Braked towing capacity (field O.1)',
    o2: 'Unbraked towing capacity (field O.2)',
    kg: 'kg',
    exactHint: 'You will find these figures on your car’s registration certificate.',
    fleetCount: { one: '{n} trailer in our fleet', other: '{n} trailers in our fleet' },
    matchCount: { one: '{n} trailer fits', other: '{n} trailers fit' },
    none: 'No trailer fits this combination. Call us on +352 81 05 41 and we will advise you.',
    vansHeading: 'Vans',
    vanStatement: 'You can drive a van with a maximum authorised mass of up to 3,500 kg on a B licence.',
    specs: {
      payload: 'Payload',
      mma: 'Maximum authorised mass',
      empty: 'Unladen weight',
      surface: 'Load area',
      height: 'Loading height',
      braked: 'Braked',
      yes: 'yes',
      no: 'no',
      socket: 'Socket',
      socketValue: '{n}-pin',
      deposit: 'Deposit',
      volume: 'Internal volume',
      temp: 'Temperature',
      power: 'Power supply',
    },
    pallets: { one: '{n} Euro pallet', other: '{n} Euro pallets' },
    volumeText: 'Internal volume {m3} m³',
    diagramLabel: 'Load area {l} × {w} m',
    diagramPallets: '{n} Euro pallets',
    verdict: {
      ok: 'Your licence is enough.',
      needB96orBE: 'You need code 96 or a BE licence.',
      needBE: 'You need a BE licence.',
      dependsB:
        'With a B licence, the car and trailer together must not exceed 3,500 kg. Enter the mass of your car (F.2) to find out.',
      dependsB96:
        'With code 96, the car and trailer together must not exceed 4,250 kg. Enter the mass of your car (F.2) to find out.',
      required: 'Licence required: {licence}',
      requiredDepends: 'Licence required: B, B96 or BE, depending on your car',
      towLimit: 'Fully loaded, this trailer exceeds what your car can tow ({limite} kg).',
    },
    licenceShort: { B: 'B', B96: 'B with code 96', BE: 'BE' },
    price: '{day} per day, {weekend} per weekend',
    priceMissing: '[FEHLT — Preis pro Tag und Wochenende]',
    request: 'Request this trailer',
    requestVan: 'Request this van',
    seeAll: 'See the whole fleet',
    finePrint:
      'This guidance is based on the driving licence rules in Luxembourg (transports.public.lu). If in doubt, ask us before you set off.',
    sourceLink: 'Licence rules on transports.public.lu',
    empty: 'Our list of trailers is coming soon. Call us on +352 81 05 41.',
    noJsRules:
      'With a B licence, you can tow a trailer with a maximum authorised mass of up to 750 kg, or a heavier trailer if the car and trailer together do not exceed 3,500 kg. With code 96, the combination can go up to 4,250 kg. Above that, you need a BE licence.',
  },

  fleetTable: {
    h2: 'Our whole fleet',
    caption: 'Our trailers and vans for hire',
    kind: 'Type',
    payload: 'Payload',
    mma: 'Maximum authorised mass',
    surface: 'Load area',
    licence: 'Licence required',
    day: 'Price per day',
    weekend: 'Price per weekend',
    licenceDepends: 'depends on the car',
  },

  categories: {
    'porte-voiture': 'Car trailer',
    'porte-moto': 'Motorbike trailer',
    benne: 'Tipper trailer',
    frigorifique: 'Refrigerated trailer',
    plateau: 'Flatbed trailer',
    fourgon: 'Box trailer',
    camionnette: 'Van',
    voiture: 'Car',
  },

  cars: {
    homeH2: 'Our cars in stock',
    h1: 'New and used cars',
    lead: 'All the cars in stock at Garage Um Rond Point, at the Erpeldange roundabout. Call us or message us on WhatsApp before you come. Test drives by appointment.',
    seeAll: { one: 'See the car', other: 'See all {n} cars' },
    year: 'Year',
    km: 'Kilometres',
    fuel: 'Fuel',
    tagFresh: 'Just in',
    tagNew: 'New',
    price: 'Price',
    noPhoto: 'Photo coming soon',
    empty: 'No cars in stock at the moment. Call us on +352 81 05 41.',
    filter: {
      summary: 'Filter ({n})',
      legend: 'Filter the cars',
      make: 'Make',
      fuel: 'Fuel',
      gearbox: 'Gearbox',
      maxPrice: 'Maximum price',
      condition: 'Condition',
      sort: 'Sort by',
      all: 'All',
      any: 'Any',
      conditionNew: 'New',
      conditionUsed: 'Used',
      sortRecent: 'newest first',
      sortPriceAsc: 'price, low to high',
      sortPriceDesc: 'price, high to low',
      sortKmAsc: 'mileage, low to high',
      count: { one: '{n} car', other: '{n} cars' },
      empty: 'No cars match your filters.',
      reset: 'Reset filters',
      apply: 'Show results',
      upTo: 'up to {price}',
    },
  },

  enums: {
    fuel: {
      petrol: 'Petrol',
      diesel: 'Diesel',
      hybrid: 'Hybrid',
      plugin_hybrid: 'Plug-in hybrid',
      electric: 'Electric',
      lpg: 'LPG',
      other: 'Other',
    },
    transmission: { automatic: 'Automatic', manual: 'Manual', other: 'Other' },
    body: {
      estate: 'Estate',
      saloon: 'Saloon',
      suv: 'SUV / 4x4',
      city: 'City car',
      coupe: 'Coupé',
      convertible: 'Convertible',
      mpv: 'MPV',
      van: 'Van',
      pickup: 'Pick-up',
      other: 'Other',
    },
    condition: { new: 'New', used: 'Used' },
    /** Farben aus den Inseraten (französisch) → Anzeige; unbekannte bleiben im Original */
    colors: {
      noir: 'Black',
      blanc: 'White',
      gris: 'Grey',
      argent: 'Silver',
      bleu: 'Blue',
      rouge: 'Red',
      vert: 'Green',
      jaune: 'Yellow',
      orange: 'Orange',
      marron: 'Brown',
      brun: 'Brown',
      beige: 'Beige',
      bordeaux: 'Burgundy',
      violet: 'Purple',
      or: 'Gold',
      anthracite: 'Anthracite',
    },
  },

  car: {
    specsH2: 'Specifications',
    firstReg: 'First registration',
    mileage: 'Mileage',
    fuel: 'Fuel',
    gearbox: 'Gearbox',
    power: 'Power',
    powerUnit: 'hp',
    displacement: 'Engine size',
    body: 'Body type',
    seats: 'Seats',
    colorExt: 'Exterior colour',
    colorInt: 'Interior colour',
    euro: 'Euro emissions standard',
    wltp: 'Consumption and CO₂ (WLTP)',
    wltpMissing: 'information available at the garage',
    ref: 'Ref.',
    notSpecified: 'not specified',
    condition: 'Condition',
    vatRecoverable: 'VAT reclaimable',
    equipmentH2: 'Equipment',
    equipmentMore: 'See all {n} features',
    descriptionH2: 'Description',
    originalNote: 'Original description in French',
    originalListNote: 'Original list in French',
    contactH2: 'Interested in this car?',
    contactText: 'Call us, message us on WhatsApp or send us your request.',
    whatsappText: 'Hello, is the {make} {model} (ref. {id}) still available?',
    similarH2: 'Similar cars',
    sodablast: 'For a classic car, we also offer soda blasting.',
    sold: 'This car has been sold or is no longer in stock.',
    backToList: 'See all our cars',
    gallery: {
      label: 'Photos of the {make} {model}',
      counter: '{i} / {n}',
      prev: 'Previous photo',
      next: 'Next photo',
      open: 'View the photos full size',
      close: 'Close',
      thumbs: 'Thumbnails',
      thumb: 'Photo {i}',
      alt: '{make} {model} {version}, photo {i} of {n}',
    },
  },

  photos: {
    heroWorkshop: 'Black car in a bright, modern workshop',
    workshop: 'Mechanic working in a car’s engine bay',
    sodablast: 'Rusty classic car with peeling paint',
    bodywork: 'Red sports car on a lift in a workshop',
    garden: 'Petrol lawn mower on a lawn',
    gardenPage: 'Mowing a lawn in the sun',
    paint: 'Spray-painting a car body',
    rental: 'White pick-up loaded on a flatbed',
    trailersSale: 'Tipper trailer with mesh sides',
    fleetAlt: 'Photo: {name}',
    creditsH2: 'Illustration photos',
    credits: 'Illustration photos under free licences:',
  },
  services: {
    h2: 'Our other services',
    workshop: {
      h3: 'Workshop',
      text: 'Servicing, diagnostics and repairs for your car or van. In our body shop, we repair and repaint your vehicle after a minor collision.',
      link: 'Mechanical and body repairs',
    },
    sodablast: {
      h3: 'Soda blasting',
      text: 'Soda blasting sprays sodium bicarbonate to strip paint, grease and dirt. This gentle method does not damage delicate surfaces: classic bodywork, wheel rims, mechanical parts.',
      link: 'About soda blasting',
    },
    garden: {
      h3: 'Garden & forestry',
      text: 'We sell and repair garden and forestry machinery, mainly from Honda and Stihl.',
      link: 'Garden and forestry machinery',
    },
    trailers: {
      h3: 'Trailers for sale',
      text: 'We sell Saris, Humbaur and WM Meyer trailers to private and business customers. We help you choose a trailer that your car can tow and that your licence allows.',
      link: 'Our trailers for sale',
    },
    photoMissing: '[FEHLT — Foto]',
  },

  reviews: {
    h2: 'Google reviews',
    link: 'Read all the reviews on Google',
    missing: '[FEHLT — 2–3 vom Kunden freigegebene Zitate aus dem Google-Profil, mit Vorname + Initiale und Monat/Jahr]',
  },

  faq: {
    h2: 'Frequently asked questions',
    rentalH2: 'Questions about hire',
    items: {
      permis: {
        q: 'Which licence do I need to tow a trailer?',
        a: 'With a B licence, you can tow a trailer with a maximum authorised mass of up to 750 kg. A heavier trailer is allowed if the car and trailer together do not exceed 3,500 kg. With code 96 on your B licence, the combination can go up to 4,250 kg. Above that, you need a BE licence, which allows a trailer of up to 3,500 kg.',
      },
      carte: {
        q: 'Where can I see what my car can tow?',
        a: 'On the registration certificate: field O.1 shows the braked towing capacity, field O.2 the unbraked towing capacity. The maximum authorised mass of your car is in field F.2.',
      },
      prix: {
        q: 'How much does it cost to hire a trailer?',
        a: 'Our guide shows the price per day and per weekend for each trailer. [FEHLT — Preise der Flotte]',
      },
      louer: {
        q: 'What do I need to hire a trailer?',
        a: '[FEHLT — Mietbedingungen: Ausweis, Führerschein, Kaution, Stecker 7- oder 13-polig]',
      },
      reserver: {
        q: 'Do I need to book in advance?',
        a: '[FEHLT — Reservierung, Abhol- und Rückgabezeiten]',
      },
      dispo: {
        q: 'Are the cars on the list still available?',
        a: 'We update the list every morning. A car sold during the day may still appear until the next day. Call us or message us on WhatsApp before you come.',
      },
      marques: {
        q: 'Do you repair all makes?',
        a: 'Yes, our workshop services and repairs cars and vans of all makes. [UNBESTÄTIGT — Werden alle Marken repariert?]',
      },
      depot: {
        q: 'Can you sell my car for me?',
        a: 'Yes, as a consignment sale: we put your car up for sale and put you in touch with buyers. Ask us about the terms at the garage or by phone.',
      },
      langues: {
        q: 'Which languages do you speak?',
        a: 'Luxembourgish, French, German, English and Portuguese.',
      },
      paiement: {
        q: 'How can I pay?',
        a: 'In cash, by Visa, Mastercard or V PAY card, with Payconiq, Apple Pay or PayPal, or by bank transfer. [UNBESTÄTIGT — Zahlungsmittel]',
      },
    },
  },

  access: {
    h2: 'Find us',
    address: 'Address',
    landmark: 'At the roundabout, next to the Aral station, between Ettelbruck and Diekirch.',
    hoursH3: 'Opening hours',
    languagesH3: 'Languages',
    languages: 'We speak Luxembourgish, French, German, English and Portuguese.',
    mapLink: 'Directions in Google Maps',
    external: '(external site)',
    mapTitle: 'The Erpeldange roundabout',
    osm: '© OpenStreetMap contributors',
    osmLabel: 'Map data',
    labels: {
      garage: 'Garage Um Rond Point',
      aral: 'Aral',
      ettelbruck: 'Ettelbruck',
      diekirch: 'Diekirch',
      erpeldange: 'Erpeldange',
      rail: 'Railway',
      sure: 'Sûre',
    },
  },

  hours: {
    caption: 'Opening hours of Garage Um Rond Point',
    day: 'Day',
    time: 'Hours',
    days: {
      mo: 'Monday',
      tu: 'Tuesday',
      we: 'Wednesday',
      th: 'Thursday',
      fr: 'Friday',
      sa: 'Saturday',
      su: 'Sunday',
    },
    closed: 'Closed',
    today: 'today',
    and: 'and',
    holidays: 'Public holidays: [UNBESTÄTIGT — Feiertage vermutlich geschlossen]',
    short: 'Monday to Friday {weekday}, Saturday {saturday}',
  },

  footer: {
    hoursH: 'Opening hours',
    followH: 'Follow us',
    portals: 'Our listings are also on {luxauto} and {autoscout}',
    legal: 'Legal notice',
    privacy: 'Privacy policy',
    tiktokMissing: 'TikTok [UNBESTÄTIGT — genaue URL]',
  },

  depot: {
    h2: 'Selling your car?',
    text: 'With our consignment sale service, we put your car up for sale and put you in touch with buyers. Tell us about your car and we will explain the terms.',
    missing: '[FEHLT — Konditionen Kommissionsverkauf]',
    link: 'Offer my car',
  },

  pages: {
    rental: {
      h1: 'Trailer and van hire in Erpeldange',
      lead: 'Car trailers and motorbike trailers, tipper trailers, refrigerated trailers for your parties, and vans. By the day or for the weekend.',
      durationsMissing: '[UNBESTÄTIGT — Mietdauern Tag / Wochenende]',
      conditionsH2: 'Hire conditions',
      conditionsMissing:
        '[FEHLT — Mietbedingungen: Ausweis, Führerschein, Kaution, Abhol- und Rückgabezeiten, Reservierung]',
      formH2: 'Hire request',
      formIntro: 'Choose the trailer and the dates. We will call you back to confirm.',
    },
    category: {
      h1: {
        'porte-voiture': 'Hire a car trailer in Erpeldange',
        'porte-moto': 'Hire a motorbike trailer in Erpeldange',
        benne: 'Hire a tipper trailer in Erpeldange',
        frigorifique: 'Hire a refrigerated trailer in Erpeldange',
        camionnette: 'Hire a van in Erpeldange',
      },
      intro: {
        'porte-voiture':
          'A car trailer lets you transport a broken-down car, a classic car or a car you have just bought. Before you set off, check that your car can tow the combination and that your licence is enough.',
        'porte-moto':
          'A motorbike trailer lets you take a motorbike, a scooter or a quad to the workshop, on holiday or to a race track. You can tow it with an ordinary car.',
        benne:
          'A tipper trailer carries soil, rubble, sand or garden waste and empties by tipping. Use it on a building site, in the garden or for a trip to the recycling centre.',
        frigorifique:
          'A refrigerated trailer keeps drinks and food cool during a party, a wedding or a festival. You park it on site for the duration of the event.',
        camionnette:
          'A van is useful for moving house or transporting furniture or equipment. With a maximum authorised mass of up to 3,500 kg, you can drive it on a B licence.',
      },
      vehiclesH2: 'Our vehicles',
      licenceH2: 'Which licence?',
      backToFinder: 'Compare with all our trailers',
    },
    workshop: {
      h1: 'Mechanical and body repairs in Erpeldange',
      lead: 'Servicing, diagnostics and repairs for your car or van. In our body shop, we repair and repaint your vehicle after a minor collision.',
      whatH2: 'What our workshop does',
      items: {
        entretien: 'Servicing and inspections',
        diagnostic: 'Fault diagnosis',
        reparation: 'Mechanical repairs',
        carrosserie: 'Bodywork and paintwork',
      },
      extraMissing:
        '[UNBESTÄTIGT — weitere Leistungen laut Editus: Richtbank, Smart Repair, Ausbeulen, Turbo, 4x4, Restaurierung alter Autos; erst nach Bestätigung zeigen]',
      transparency: 'Before any work, we explain what we are going to do. You receive a detailed invoice.',
      transparencyMissing: '[UNBESTÄTIGT — Kostenvoranschlag vorher, detaillierte Rechnung?]',
      formH2: 'Request an appointment',
      formIntro: 'Tell us which vehicle it is and what needs doing. We will call you back to arrange the appointment.',
    },
    sodablast: {
      h1: 'Soda blasting in Erpeldange',
      lead: 'Soda blasting sprays sodium bicarbonate to strip paint, grease and dirt. This gentle method does not damage delicate surfaces: classic bodywork, wheel rims, mechanical parts.',
      whatH2: 'What is it for?',
      items: {
        carrosserie: 'Classic car bodies, before restoration',
        jantes: 'Wheel rims',
        pieces: 'Mechanical parts',
      },
      photosH2: 'Before and after',
      photosMissing: '[FEHLT — Vorher-nachher-Fotos Sodablast]',
      whatsapp: 'Send us photos on WhatsApp for an initial opinion.',
      whatsappText: 'Hello, here are some photos for an initial opinion on soda blasting.',
      whatsappLink: 'Send photos on WhatsApp',
      formH2: 'Request an appointment',
    },
    trailersForSale: {
      h1: 'Trailers for sale in Erpeldange',
      lead: 'We sell Saris, Humbaur and WM Meyer trailers to private and business customers.',
      dealerMissing: '[UNBESTÄTIGT — Händlerstatus Saris, Humbaur, WM Meyer; Logos nur mit Freigabe]',
      adviceH2: 'Which licence for which trailer?',
      advice:
        'We help you choose a trailer that your car can tow and that your licence allows: size, maximum authorised mass, brakes. Our hire guide shows you the licence rules with examples.',
      adviceLink: 'Which licence for which trailer?',
      stockH2: 'Trailers in stock',
      stockMissing: '[FEHLT — Anhänger auf Lager]',
      formH2: 'A question about a trailer?',
    },
    garden: {
      h1: 'Garden and forestry machinery in Erpeldange',
      lead: 'We sell and repair garden and forestry machinery, mainly from Honda and Stihl.',
      dealerMissing: '[UNBESTÄTIGT — Händlerstatus Honda und Stihl; Logos nur mit Freigabe]',
      whatH2: 'Sales and repairs',
      text: 'Lawnmower, brushcutter, chainsaw or hedge trimmer: bring your machine to the workshop or ask us for advice on choosing a new one.',
      formH2: 'Request a repair',
    },
    contact: {
      h1: 'Contact and directions',
      lead: 'Garage Um Rond Point, 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre. At the roundabout, next to the Aral station. Phone +352 81 05 41, WhatsApp +352 621 373 272, info@rondpoint.lu. We speak Luxembourgish, French, German, English and Portuguese.',
      waysH2: 'How to reach us',
      phone: 'Phone',
      whatsapp: 'WhatsApp',
      email: 'Email',
      paymentH2: 'Payment',
      payment: 'In cash, by Visa, Mastercard or V PAY card, with Payconiq, Apple Pay or PayPal, or by bank transfer.',
      paymentMissing: '[UNBESTÄTIGT — Zahlungsmittel]',
      formH2: 'Write to us',
    },
    thanks: {
      h1: 'We have received your request',
      text: 'We will reply [FEHLT — Antwortzeit, z. B. « le jour ouvrable suivant »]. Is it urgent? Call +352 81 05 41.',
      back: 'Back to the home page',
    },
    notFound: {
      h1: 'Page not found',
      text: 'This page does not exist, or no longer exists. When a car is sold, it disappears from our list.',
    },
  },

  forms: {
    optional: 'optional',
    name: 'Name',
    phone: 'Phone',
    phoneHint: 'We will call you back.',
    email: 'Email',
    message: 'Message',
    consent: 'I agree that Garage Um Rond Point may use my data to reply to my request. More information in the {link}.',
    consentLink: 'privacy policy',
    honeypot: 'Do not fill in this field',
    choose: 'Choose…',
    sending: 'Sending…',
    successH: 'We have received your request.',
    successText: 'We will reply as soon as possible. Is it urgent? Call +352 81 05 41.',
    errorSummary: 'Check the highlighted fields.',
    errorSend: 'Your request was not sent. Try again or call us on +352 81 05 41.',
    errorRate: 'You have sent a lot of requests today. Call us on +352 81 05 41.',
    fallbackH: 'Last step: send your request',
    fallbackText: 'Choose how to send it to us. Your message is already written, you just need to send it.',
    fallbackWhatsapp: 'Send via WhatsApp',
    fallbackMail: 'Send by email',
    fallbackEdit: 'Edit request',
    fallbackSubject: 'Request from the website',
    fallbackIntro: 'Hello, here is my request:',
    errors: {
      name: 'Enter your name.',
      phone: 'Enter a phone number so that we can call you back.',
      phoneInvalid: 'This number looks incomplete. Enter it with the country code, for example +352 621 123 456.',
      email: 'This email address is not valid. It must contain an @, for example name@example.lu.',
      consent: 'Tick the box so that we can use your data to reply to you.',
      vehicle: 'Choose a trailer or a vehicle.',
      from: 'Enter the start date.',
      to: 'Enter the end date.',
      toBeforeFrom: 'The ‘To’ date cannot be before the ‘From’ date.',
      past: 'Choose a date from today onwards.',
      wish: 'Choose what you would like.',
      reason: 'Choose what your visit is for.',
      machine: 'Enter the vehicle or machine.',
      work: 'Describe what needs doing.',
      subject: 'Choose a subject.',
      message: 'Write your message.',
    },
    rental: {
      vehicle: 'Trailer or vehicle you want',
      from: 'From',
      to: 'To',
      licence: 'Your licence',
      licenceNone: 'Not specified',
      licenceB: 'B',
      licenceB96: 'B + code 96',
      licenceBE: 'BE',
      submit: 'Send hire request',
      noFleet: 'Tell us in the message what you would like to hire.',
      other: 'Other, specified in the message',
    },
    car: {
      carLabel: 'Car',
      wish: 'You would like',
      wishTest: 'A test drive',
      wishInfo: 'More information',
      wishTradeIn: 'To part-exchange my car',
      tradeInH: 'Only for a part-exchange',
      tradeMake: 'Make and model',
      tradeYear: 'Year',
      tradeKm: 'Mileage',
      title: 'Request information',
      submit: 'Send my request',
    },
    workshop: {
      reason: 'What for?',
      reasonMaintenance: 'Servicing',
      reasonRepair: 'Breakdown or repair',
      reasonBody: 'Bodywork',
      reasonSodablast: 'Soda blasting',
      reasonGarden: 'Garden or forestry machine',
      machine: 'Vehicle or machine',
      machineHint: 'Make, model and year, for example: VW Golf 2018.',
      work: 'What needs doing?',
      date: 'Preferred date',
      photos: 'For bodywork or soda blasting, send us photos on WhatsApp: +352 621 373 272.',
      submit: 'Request an appointment',
    },
    contact: {
      subject: 'Subject',
      subjectQuestion: 'General question',
      subjectTrailer: 'Buying a trailer',
      subjectDepot: 'Consignment sale',
      subjectOther: 'Other',
      submit: 'Send message',
    },
  },

  seo: {
    home: {
      title: 'Garage Um Rond Point Erpeldange – trailers, cars, workshop',
      description:
        'At the Erpeldange roundabout, between Ettelbruck and Diekirch: trailer hire in Luxembourg, van hire, new and used cars, mechanical repairs and bodywork.',
    },
    rental: {
      title: 'Trailer hire Luxembourg – Erpeldange, near Ettelbruck',
      description:
        'Car trailer, motorbike trailer, tipper trailer, refrigerated trailer or van: see which trailer fits, what it costs and whether your licence is enough.',
    },
    category: {
      title: {
        'porte-voiture': 'Car trailer rental in Erpeldange | Garage Um Rond Point',
        'porte-moto': 'Motorbike trailer hire in Erpeldange | Um Rond Point',
        benne: 'Tipper trailer hire in Erpeldange | Garage Um Rond Point',
        frigorifique: 'Refrigerated trailer hire in Erpeldange | Um Rond Point',
        camionnette: 'Van hire near Ettelbruck in Erpeldange | Um Rond Point',
      },
      description: {
        'porte-voiture':
          'Car trailer rental at the Erpeldange roundabout in Luxembourg, near Ettelbruck: dimensions, payload, price and the driving licence required for each trailer.',
        'porte-moto':
          'Hire a motorbike trailer at the roundabout in Erpeldange, near Ettelbruck: dimensions, payload, price and the driving licence required for each trailer.',
        benne:
          'Hire a tipper trailer for soil, rubble, sand or garden waste at the Erpeldange roundabout, near Ettelbruck: payload, price and the driving licence required.',
        frigorifique:
          'Refrigerated trailer hire for your party or festival at the Erpeldange roundabout, near Ettelbruck: volume, temperature, price and the licence you need.',
        camionnette:
          'Van hire near Ettelbruck for moving house or transporting equipment, at the Erpeldange roundabout. Up to 3,500 kg, a B licence is enough. Price per day.',
      },
    },
    cars: {
      title: 'New and used cars in Erpeldange | Garage Um Rond Point',
      description:
        'All the cars in stock at Garage Um Rond Point in Erpeldange, with prices, mileage and photos. The list is updated every morning. Test drive by appointment.',
    },
    car: {
      suffixLong: ' | Garage Um Rond Point',
      suffixShort: ' | Um Rond Point',
      place: ' in Erpeldange',
      descTail: 'See it at Garage Um Rond Point in Erpeldange.',
      descExtra: [' Test drive by appointment.', ' Between Ettelbruck and Diekirch.', ' Call +352 81 05 41.'],
      descGearbox: '{gearbox} gearbox',
      soldTitle: '{make} {model} sold | Garage Um Rond Point, Erpeldange',
      soldDescription:
        'This {make} {model} has been sold or is no longer in stock. See the other new and used cars at Garage Um Rond Point in Erpeldange.',
    },
    workshop: {
      title: 'Car repair and bodywork in Erpeldange | Um Rond Point',
      description:
        'Car servicing, diagnostics, repairs, bodywork and paintwork at the Erpeldange roundabout, near Ettelbruck and Diekirch. Request your appointment online.',
    },
    sodablast: {
      title: 'Soda blasting in Luxembourg | Garage Um Rond Point',
      description:
        'Soda blasting strips paint and dirt without damaging the surface: classic cars, wheel rims, mechanical parts. In Erpeldange, between Ettelbruck and Diekirch.',
    },
    trailersForSale: {
      title: 'Trailers for sale: Humbaur, Saris, WM Meyer | Erpeldange',
      description:
        'Buy your trailer in Erpeldange: Humbaur, Saris or WM Meyer. We help you choose the right size and the right weight to suit your car and your driving licence.',
    },
    garden: {
      title: 'Honda and Stihl garden and forestry machinery in Erpeldange',
      description:
        'Sales and repairs of garden and forestry machinery, mainly from Honda and Stihl, at Garage Um Rond Point in Erpeldange, between Ettelbruck and Diekirch.',
    },
    contact: {
      title: 'Contact and directions | Garage Um Rond Point, Erpeldange',
      description:
        '1, rue du Viaduc in Erpeldange-sur-Sûre, at the roundabout next to the Aral station. Mon–Fri 7.45am–12pm and 1pm–6pm, Sat 8am–12pm. Phone +352 81 05 41.',
    },
    thanks: {
      title: 'Request sent | Garage Um Rond Point, Erpeldange-sur-Sûre',
      description:
        'Your request has reached Garage Um Rond Point in Erpeldange-sur-Sûre. We will reply to you quickly. If it is urgent, call us on +352 81 05 41. Thank you.',
    },
    legal: {
      title: 'Legal notice | Garage Um Rond Point, Erpeldange-sur-Sûre',
      description:
        'Legal notice of Garage Um Rond Point S.à r.l., 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre: publisher, RCS B296148, VAT no. LU36559673, website hosting.',
    },
    privacy: {
      title: 'Privacy policy | Garage Um Rond Point, Erpeldange-sur-Sûre',
      description:
        'Which data Garage Um Rond Point processes when you write to us, why, for how long and what your rights are. This site uses no cookies and no tracking tools.',
    },
  },

  legal: {
    h1: 'Legal notice',
    publisherH2: 'Website publisher',
    company: 'Company name',
    legalForm: 'Legal form',
    address: 'Registered office',
    phone: 'Phone',
    email: 'Email',
    rcs: 'Trade and Companies Register',
    vat: 'VAT number',
    registered: 'Registration',
    manager: 'Manager',
    permit: 'Business permit',
    capital: 'Share capital',
    managerMissing: '[UNBESTÄTIGT — Gérant David Moreira laut Editus]',
    permitMissing: '[FEHLT — Nummer der Gewerbegenehmigung]',
    capitalMissing: '[FEHLT — Gesellschaftskapital]',
    hostingH2: 'Hosting',
    hosting:
      'The website is hosted by GitHub Pages, a service of GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, United States.',
    contentH2: 'Content',
    content:
      'The car listings are taken from our own listings published on LuxAuto and AutoScout24. Prices and specifications may change; only the offer confirmed at the garage is binding.',
    photosH2: 'Photos and map',
    photos: 'Roundabout map drawn from OpenStreetMap data (© OpenStreetMap contributors, ODbL licence). Car photos: our own listings.',
    fontH2: 'Typeface',
    font: 'Archivo, Omnibus-Type, SIL Open Font License 1.1.',
  },

  privacy: {
    h1: 'Privacy policy',
    intro:
      'We process your data only to reply to your requests. This website does not set cookies and does not use any tracking or advertising tools.',
    controllerH2: 'Data controller',
    controller: 'GARAGE UM ROND POINT S.à r.l., 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre, Luxembourg. Phone +352 81 05 41, info@rondpoint.lu.',
    formsH2: 'Request forms',
    forms:
      'When you send a form, we receive the data you enter: your name, phone number, email address if you provide it, your message and the details of your request (for example hire dates, vehicle, preferred appointment). We use this data to reply to you and to prepare an offer or an appointment.',
    legalBasis:
      'Legal basis: your consent (Art. 6(1)(a) GDPR), which you give by ticking the box, and steps taken at your request prior to entering into a contract (Art. 6(1)(b) GDPR). You can withdraw your consent at any time by email or by phone.',
    storage:
      'Your request is stored in a database at Supabase (European Union region) and sent to us by email via [UNBESTÄTIGT — EU-Mailanbieter, mit Nave klären]. Requests are deleted automatically after 90 days [UNBESTÄTIGT — Frist mit Kunde bestätigen]. Correspondence that leads to a contract is kept in accordance with accounting obligations.',
    abuse:
      'To limit misuse, we store a cryptographic hash of your IP address for 24 hours. It cannot be used to recover your address.',
    hostingH2: 'Hosting and server logs',
    hosting:
      'The website is hosted by GitHub Pages (GitHub, Inc., United States). On every visit, GitHub processes your IP address and technical data to deliver the pages and to ensure security. GitHub is certified under the EU-US Data Privacy Framework. Legal basis: our legitimate interest in a secure and available website (Art. 6(1)(f) GDPR).',
    linksH2: 'Links to other services',
    links:
      'The website does not load any external content: fonts, photos and the map are hosted with the website. Links to Google Maps, WhatsApp, Facebook, Instagram, TikTok, LuxAuto and AutoScout24 only open if you click them. These services then process your data according to their own rules. WhatsApp belongs to Meta Platforms; if you write to us on WhatsApp, Meta processes your number and your messages.',
    rightsH2: 'Your rights',
    rights:
      'You can request access to your data, rectification, erasure, restriction of processing and data portability, and you can object to processing. Write to us at info@rondpoint.lu. You can also lodge a complaint with the National Commission for Data Protection (Commission nationale pour la protection des données, CNPD), 15, boulevard du Jazz, L-4370 Belvaux, cnpd.public.lu.',
    updated: 'Last updated: {date}',
  },
  /** Leiste im Startbildschirm: alle Leistungen auf einen Blick (Titel aus nav.*) */
  offer: {
    label: 'Our services at a glance',
    sub: {
      rental: 'Trailers and vans',
      cars: 'Stock updated every morning',
      workshop: 'Mechanics and bodywork',
      trailers: 'Saris, Humbaur, WM Meyer',
      garden: 'Honda and Stihl',
      sodablast: 'Gentle paint stripping',
    },
  },
  /** Kurzes „Über uns“ auf der Startseite (nur bestätigte Angaben: Lage, Leistungen, Sprachen, Öffnungstage) */
  about: {
    h2: 'About us',
    text: 'Garage Um Rond Point is your garage on the Erpeldange roundabout, between Ettelbruck and Diekirch. Trailer and van hire, cars and trailers for sale, workshop and garden machinery: all at one address. Drop by – we speak your language.',
    link: 'How to find us',
    photoAlt: 'Mechanic holding out a car key',
  },
  /** Startseite: Stichpunkte; Unterseiten: ausführliche Erklärungen */
  details: {
    points: {
      workshop: [
        'Servicing and maintenance',
        'Fault diagnosis',
        'Mechanical repairs',
        'Bodywork and paint',
      ],
      sodablast: [
        'Gentle stripping with bicarbonate of soda',
        'Classic car bodies, wheels, mechanical parts',
        'First opinion from photos on WhatsApp',
      ],
      garden: [
        'Garden and forestry machines for sale',
        'Repairs to your machines',
        'Mainly Honda and Stihl',
      ],
      trailers: [
        'Saris, Humbaur and WM Meyer trailers',
        'For private customers and businesses',
        'Advice on weight and licence',
      ],
    },
    workshop: {
      entretienH: 'Servicing and maintenance',
      entretien: 'Regular servicing keeps your car reliable and safe: oil change, filters, brakes, fluid levels and a general check. Tell us the mileage and the date of the last service in your request.',
      diagnosticH: 'Fault diagnosis',
      diagnostic: 'A warning light comes on, an unusual noise, the car is hard to start: describe what you notice and since when. Diagnosis finds the cause before anything is repaired.',
      reparationH: 'Mechanical repairs',
      reparation: 'After the diagnosis, we repair your car or van in our workshop at the Erpeldange roundabout.',
      carrosserieH: 'Bodywork and paint',
      carrosserie: 'After a minor collision, we repair the bodywork and repaint the damaged parts. Send us photos of the damage on WhatsApp for a first opinion.',
      processH2: 'How to book an appointment',
      process: [
        'Describe your vehicle and what needs doing – in the form, by phone or on WhatsApp.',
        'We call you back to set the date.',
        'You bring your vehicle to the garage at 1, rue du Viaduc.',
      ],
    },
    sodablast: {
      explainH2: 'How does soda blasting work?',
      explain: 'Bicarbonate of soda is blasted onto the surface with compressed air. It is softer than sand and removes paint, grease and dirt without eating into the metal. That is why it is used for delicate parts and classic car bodies.',
      explain2: 'Stripping exposes the original surface, so you see the real condition of the metal before a repair or a new paint job.',
      processH2: 'How a soda blasting job works',
      process: [
        'Send us photos of the car or the part on WhatsApp.',
        'We give you a first opinion.',
        'Together we set an appointment at the garage.',
      ],
    },
    garden: {
      saleH2: 'Sales',
      sale: 'Lawn mower, brush cutter, chainsaw or hedge trimmer: we sell garden and forestry machines, mainly Honda and Stihl. Tell us the size of your land and what you want to do, and we will help you choose.',
      repairH2: 'Repairs',
      repair: 'The mower won’t start, the chainsaw cuts badly, the brush cutter is losing power? Bring your machine to the workshop or describe the problem in the form.',
    },
    trailers: {
      chooseH2: 'Choosing the right trailer',
      masseH: 'Maximum authorised mass',
      masse: 'It decides which licence you need. Up to 750 kg a B licence is enough; above that it depends on your car.',
      freinH: 'Brakes',
      frein: 'A trailer with a maximum authorised mass above 750 kg must have brakes.',
      chargeH: 'Towing capacity',
      charge: 'Your car may not tow more than the value in field O.1 (braked trailer) or O.2 (unbraked) of the registration certificate.',
      usageH: 'Type and size',
      usage: 'Flatbed, tipper, car trailer or box trailer: the right one depends on what you carry most often and where you will park it.',
    },
  },
  /** Ausführliche Seitentexte (SEO): Abschnitte und FAQ je Seite, siehe src/lib/content.ts */
  content: {
    workshop: {
      sections: {
        s1: {
          h: 'Your local car garage between Ettelbruck and Diekirch',
          p: [
            'Garage Um Rond Point is at {address}, right at the Erpeldange roundabout, next to the Aral station. If you live in Erpeldange-sur-Sûre, Ettelbruck, Diekirch or anywhere in the Nordstad, the workshop is just a few minutes from home.',
            'We speak Luxembourgish, French, German, English and Portuguese, so you can explain the problem with your car in whichever language suits you best.',
          ],
        },
        s2: {
          h: 'Car servicing: why follow the manufacturer’s schedule',
          p: [
            'Every manufacturer sets a service schedule, based on mileage or on the time since the last service. You will find it in the service book or on your car’s dashboard display.',
            'Sticking to these intervals limits wear, prevents costly breakdowns and helps your car hold its resale value. Depending on the schedule, a service includes, for example, the oil change, filters, a check of the brakes and fluid levels, the lights and the wipers.',
          ],
        },
        s3: {
          h: 'Signs it’s time to bring your car to the workshop',
          items: [
            'A warning light stays lit on the dashboard.',
            'The brakes squeal, vibrate or pull to one side.',
            'The engine lacks power or is hard to start.',
            'A burning smell, a leak or unusual smoke.',
            'A new noise when driving or turning the steering wheel.',
          ],
          p: [
            'The sooner a fault is found, the simpler the repair. Describe in the form what you have noticed and since when: that is the best starting point for the diagnosis.',
          ],
        },
        s4: {
          h: 'Bodywork and paint after a minor collision',
          p: [
            'Scratch, dent or damaged bumper: send us photos of the damage on WhatsApp at {whatsapp}. You get a first opinion before you even come in. We then repair the bodywork and repaint the damaged parts in our workshop.',
            'If another vehicle is involved, fill in the European accident statement (constat amiable) at the scene and take your own photos of the accident. These documents are useful for your insurer.',
          ],
        },
        s5: {
          h: 'Cars and vans',
          p: [
            'The workshop looks after cars and vans. For a lawn mower, a chainsaw or another machine, see our [Garden & forestry](page:garden) page. To strip a car body or a part back to bare metal, find out about [soda blasting](page:sodablast).',
          ],
        },
      },
      faqH: 'Questions about the workshop',
      faq: {
        q1: {
          q: 'How do I book an appointment at the workshop?',
          a: 'Describe your vehicle and what needs doing in the form on this page, by phone on {phone} or on WhatsApp at {whatsapp}. We will call you back to arrange the appointment.',
        },
        q2: {
          q: 'When is the garage open?',
          a: '{hours}',
        },
        q3: {
          q: 'Can I send photos before I come in?',
          a: 'Yes. For bodywork or soda blasting, send us photos on WhatsApp at {whatsapp} and you will get a first opinion.',
        },
        q4: {
          q: 'Where is the workshop?',
          a: 'At {address}, at the Erpeldange roundabout, next to the Aral station, between Ettelbruck and Diekirch.',
        },
        q5: {
          q: 'Which languages can I explain the problem in?',
          a: 'In Luxembourgish, French, German, English or Portuguese.',
        },
      },
    },
    sodablast: {
      sections: {
        s1: {
          h: 'Soda blasting or sandblasting: what’s the difference?',
          p: [
            'Traditional sandblasting fires a hard abrasive, such as sand or corundum. It strips quickly, but it also attacks the metal and can heat up and warp thin sheet metal.',
            'Bicarbonate of soda is much softer than metal. It removes paint, grease and dirt without eating into the surface and without heating it. That is why soda blasting is suitable for delicate parts and classic car bodies.',
          ],
        },
        s2: {
          h: 'Which projects is soda blasting for?',
          items: [
            'Classic car restoration: strip the body back to bare metal before repair and painting.',
            'Wheel rims: remove old paint and ingrained dirt before repainting.',
            'Mechanical parts: clean a casing, an engine block or a cylinder head before inspection or reassembly.',
          ],
          p: [
            'Not sure whether your part is suitable? Send a photo on WhatsApp at {whatsapp} and we will tell you.',
          ],
        },
        s3: {
          h: 'After stripping: protect the metal',
          p: [
            'A stripped surface is bare metal. In contact with air and moisture, it oxidises quickly. So plan the next step from the start: primer, repair or paint. Bicarbonate residue rinses off with water before painting.',
            'For a car, our workshop can then repair and repaint the bodywork: see [mechanical and body repairs](page:workshop).',
          ],
        },
        s4: {
          h: 'Soda blasting in Erpeldange, Luxembourg',
          p: [
            'Our workshop is at the Erpeldange-sur-Sûre roundabout, between Ettelbruck and Diekirch, easy to reach from anywhere in the north of Luxembourg. Whether it is a single part or a complete car, we arrange an appointment at the garage together.',
          ],
        },
      },
      faqH: 'Questions about soda blasting',
      faq: {
        q1: {
          q: 'Does soda blasting damage the metal?',
          a: 'No. Bicarbonate of soda is softer than metal: it removes paint, grease and dirt without eating into the surface. That is what sets it apart from sandblasting.',
        },
        q2: {
          q: 'How much does soda blasting cost?',
          a: 'It depends on the size of the part and the layers to be removed. Send photos on WhatsApp at {whatsapp} and you will get a first opinion.',
        },
        q3: {
          q: 'Does the part need treating after stripping?',
          a: 'Yes. Bare metal must be protected quickly with primer or paint, otherwise it oxidises.',
        },
        q4: {
          q: 'Can wheel rims be soda blasted?',
          a: 'Yes, wheel rims are among the parts we soda blast, along with classic car bodies and mechanical parts.',
        },
      },
    },
    garden: {
      sections: {
        s1: {
          h: 'Garden and forestry machinery in the Nordstad',
          p: [
            'To look after your garden, your land or your woodland, you will find machines at Garage Um Rond Point, mainly from Honda and Stihl, plus a workshop to repair them. The garage is at the Erpeldange roundabout, between Ettelbruck and Diekirch.',
          ],
        },
        s2: {
          h: 'Choosing the right machine',
          items: [
            'Lawn mower: the size of the lawn, the slope and any obstacles decide the cutting width and the type of drive.',
            'Brush cutter: for edges, banks and long grass that the mower cannot reach.',
            'Chainsaw: the guide bar length depends on the diameter of the wood you cut most often.',
            'Hedge trimmer: blade length and weight matter if you trim for long periods or at height.',
          ],
          p: [
            'Petrol or battery? A battery machine is quieter and starts effortlessly. A petrol machine keeps going on large plots. Tell us how you will use it and we will advise you.',
          ],
        },
        s3: {
          h: 'Repairs: when to bring your machine in',
          items: [
            'The engine won’t start or it stalls.',
            'The machine is losing power or smoking.',
            'The chain or blade cuts badly.',
            'You notice unusual noises or vibrations.',
          ],
          p: [
            'Describe the fault in the form or call us on {phone}. Give us the make and model of the machine: that way we know straight away what we are dealing with.',
          ],
        },
        s4: {
          h: 'Tips for winter storage',
          p: [
            'Before putting a petrol machine away for the winter, clean it, empty the tank or let the engine run until it stops, then store it somewhere dry. A machine that has been stored properly starts more easily in spring.',
            'Store batteries somewhere frost-free, ideally half charged.',
          ],
        },
      },
      faqH: 'Questions about garden machinery',
      faq: {
        q1: {
          q: 'Which brands of machinery do you sell?',
          a: 'Mainly Honda and Stihl machines.',
        },
        q2: {
          q: 'How do I get my lawn mower or chainsaw repaired?',
          a: 'Bring the machine to the workshop or describe the fault in the form on this page. We will call you back.',
        },
        q3: {
          q: 'When can I come to the garage?',
          a: '{hours}',
        },
        q4: {
          q: 'Where is the garage?',
          a: 'At {address}, at the Erpeldange roundabout, next to the Aral station.',
        },
      },
    },
    trailersForSale: {
      sections: {
        s1: {
          h: 'Saris, Humbaur and WM Meyer trailers in Erpeldange',
          p: [
            'We sell Saris, Humbaur and WM Meyer trailers to private and business customers. Tell us what you carry and we will help you find the model that suits your car and your licence.',
            'The garage is at the Erpeldange-sur-Sûre roundabout, between Ettelbruck and Diekirch.',
          ],
        },
        s2: {
          h: 'The right questions to ask before you buy',
          items: [
            'What do I carry most often, and how heavy is it?',
            'What length and width of load area do I need?',
            'Can my car tow this trailer (fields O.1 and O.2 on the registration certificate)?',
            'Is my licence enough: B, B with code 96, or BE?',
            'Where will I park the trailer when I am not using it?',
          ],
        },
        s3: {
          h: 'Private and business customers',
          p: [
            'For a private customer, a trailer is used for the garden, for moving house or for transporting a leisure vehicle. For a tradesperson or a business, it carries equipment and machinery every day, so the payload, a sturdy load bed and the tie-down points matter more.',
          ],
        },
        s4: {
          h: 'Buy or hire?',
          p: [
            'If you only need a trailer now and then, [hiring one](page:rental) may be enough. Our guide also shows you which trailer your licence allows.',
          ],
        },
      },
      faqH: 'Questions about buying a trailer',
      faq: {
        q1: {
          q: 'Which trailer brands do you sell?',
          a: 'Saris, Humbaur and WM Meyer.',
        },
        q2: {
          q: 'Do you also sell to businesses?',
          a: 'Yes, we sell trailers to private and business customers.',
        },
      },
    },
    cars: {
      sections: {
        s1: {
          h: 'Buying a car at Garage Um Rond Point',
          p: [
            'All the cars on this page are in stock with us, at the Erpeldange roundabout. The list is updated every morning from our listings: you can see the price, mileage, year and photos of each car.',
          ],
          items: [
            'Choose a car from the list and open its details page.',
            'Call us or message us on WhatsApp to check that it is still available.',
            'Come and see it at the garage and take a test drive by appointment.',
          ],
        },
        s2: {
          h: 'New and used cars near Ettelbruck and Diekirch',
          p: [
            'Our stock includes new and used cars. It changes often: each day, the list shows what was in stock that morning. Our listings are also published on LuxAuto and AutoScout24.',
          ],
        },
        s3: {
          h: 'What about your current car?',
          p: [
            'Would you like to part-exchange your car? Mention it in the form for the car you are interested in. Would you rather sell without having to deal with it yourself? Find out about our consignment sale service further down this page.',
          ],
        },
      },
      faqH: 'Questions about our cars',
      faq: {
        q1: {
          q: 'Can I test drive a car?',
          a: 'Yes, by appointment. Call us on {phone} or message us on WhatsApp at {whatsapp}.',
        },
        q2: {
          q: 'Where can I see the cars?',
          a: 'At the garage, {address}, at the Erpeldange roundabout. {hours}',
        },
        q3: {
          q: 'Are your cars also on LuxAuto and AutoScout24?',
          a: 'Yes, our listings are also published on LuxAuto and AutoScout24. Here, you can see all our stock in one place.',
        },
      },
    },
    contact: {
      sections: {
        s1: {
          h: 'Which way to contact us?',
          items: [
            'A quick question or photos to show us: WhatsApp at {whatsapp}.',
            'An appointment or an immediate answer: phone us on {phone}.',
            'A detailed request: the form below or an email to {email}.',
          ],
        },
        s2: {
          h: 'Getting to the garage',
          p: [
            'The garage is at {address}, at the Erpeldange-sur-Sûre roundabout, next to the Aral station. Coming from Ettelbruck or Diekirch? The roundabout is on your way. For exact directions, open Google Maps from this page.',
          ],
        },
      },
      faqH: 'Practical questions',
      faq: {
        q1: {
          q: 'When is the garage open?',
          a: '{hours}',
        },
        q2: {
          q: 'Which languages do you speak?',
          a: 'We speak Luxembourgish, French, German, English and Portuguese.',
        },
      },
    },
    rental: {
      sections: {
        s1: {
          h: 'Trailer hire in the Nordstad',
          p: [
            'At the Erpeldange roundabout, between Ettelbruck and Diekirch, you can hire a trailer or a van close to home. Our guide above shows you in a few clicks which trailer suits what you are carrying and whether your licence is enough.',
          ],
        },
        s2: {
          h: 'Tips for loading correctly',
          items: [
            'Never exceed the trailer’s maximum authorised mass or your car’s towing capacity.',
            'Spread the load: heavy items over the axle and a little weight on the drawbar, as stated in the instructions.',
            'Secure the load with straps and cover loose material with a tarpaulin or a net.',
            'Before setting off, check the coupling, the lights and the tyre pressures.',
            'Drive more slowly than when empty: the combination does not brake as well and needs more room on bends.',
          ],
        },
      },
    },
    category: {
      'porte-voiture': {
        sections: {
          s1: {
            h: 'When should you hire a car trailer?',
            p: [
              'To bring back a car that no longer runs, to transport a classic car without adding kilometres, or to collect a car you have bought far from home. With a car trailer, the car being transported does not have to be driven.',
            ],
          },
          s2: {
            h: 'Loading a car safely',
            items: [
              'Check that the car being transported does not exceed the trailer’s payload.',
              'Drive up slowly, keeping straight in line with the ramps, with someone guiding you.',
              'Position the car so that a little weight rests on the front of the trailer, as stated in the instructions.',
              'Strap down each wheel with suitable straps and check them after the first few kilometres.',
            ],
          },
        },
      },
      'porte-moto': {
        sections: {
          s1: {
            h: 'Transporting a motorbike',
            p: [
              'Whether you are heading to a race track, taking a motorbike in for repair or bringing it home after buying it, a motorbike trailer is simpler than a van: the bike goes up the ramp and sits firmly in the wheel chock.',
            ],
          },
          s2: {
            h: 'Securing a motorbike properly',
            items: [
              'Wedge the front wheel in the wheel chock.',
              'Use four straps, two at the front and two at the back, on solid points of the frame.',
              'Compress the suspension slightly, but not all the way.',
              'Check the strap tension after the first few kilometres.',
            ],
          },
        },
      },
      benne: {
        sections: {
          s1: {
            h: 'Watch the weight of bulk materials',
            p: [
              'Loose materials are heavy. One cubic metre of damp soil weighs around 1.5 to 1.8 tonnes, and one cubic metre of gravel around 1.5 tonnes. A tipper filled to the brim can therefore quickly exceed its payload.',
              'Check the payload on the trailer’s details page and load accordingly: two trips are better than one overloaded trailer.',
            ],
          },
          s2: {
            h: 'Building site, garden, recycling centre',
            items: [
              'Cover the load with a tarpaulin or a net so that nothing falls onto the road.',
              'Sort your waste before you set off: you will save time at the recycling centre.',
              'Only tip on flat, firm ground, with the trailer still hitched to the car.',
            ],
          },
        },
      },
      frigorifique: {
        sections: {
          s1: {
            h: 'Which occasions is it for?',
            p: [
              'Family celebration, wedding, birthday, village fête, market or club party: a refrigerated trailer keeps drinks and food cool on site for the whole event.',
            ],
          },
          s2: {
            h: 'Tips for using the trailer',
            items: [
              'Plug the trailer in a few hours before you load it, so that it is cold.',
              'Ideally, load products that are already cold: chilling a large quantity of lukewarm drinks takes time.',
              'Leave room for air to circulate between the crates.',
              'Make sure there is a suitable power connection close to where the trailer will stand.',
            ],
          },
        },
      },
      camionnette: {
        sections: {
          s1: {
            h: 'Moving house, furniture, equipment',
            p: [
              'A van is suitable for moving house, furniture, household appliances or bulky equipment, without having to hitch up a trailer. Your load stays protected from the rain.',
            ],
          },
          s2: {
            h: 'Tips for transporting your load',
            items: [
              'Measure large furniture before you book.',
              'Place heavy items at the far end, against the bulkhead, and strap the load down.',
              'Protect furniture with blankets to avoid scratches.',
              'Remember the height of the vehicle before driving into an underground car park.',
            ],
          },
        },
      },
    },
  },
};

export default en;
