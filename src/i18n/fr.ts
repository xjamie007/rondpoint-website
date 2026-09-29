/**
 * Französisch – Ausgangssprache und Standard.
 * Platzhalter: „[FEHLT — …]" und „[UNBESTÄTIGT — …]" erscheinen sichtbar markiert
 * und sind in OFFENE-PUNKTE.md gesammelt. Nichts davon wird erfunden.
 * Typografie (schmale geschützte Leerzeichen vor ? ! ; :) setzt i18n/typo.ts.
 */
const fr = {
  meta: {
    lang: 'français',
    siteName: 'Garage Um Rond Point',
    ogAlt: 'Garage Um Rond Point au rond-point d’Erpeldange',
  },

  nav: {
    skip: 'Aller au contenu',
    main: 'Navigation principale',
    rental: 'Location',
    cars: 'Voitures',
    workshop: 'Atelier',
    trailersForSale: 'Remorques à vendre',
    garden: 'Jardin & forêt',
    contact: 'Contact',
    menu: 'Menu',
    close: 'Fermer',
    langLabel: 'Langue',
    callAria: 'Appeler le +352 81 05 41',
    home: 'Accueil',
    breadcrumb: 'Fil d’Ariane',
    logoAria: 'Garage Um Rond Point, accueil',
  },

  contactBar: {
    label: 'Contact rapide',
    call: 'Appeler',
    whatsapp: 'WhatsApp',
    ask: 'Demander',
    whatsappText: 'Bonjour, j’ai une question pour le Garage Um Rond Point.',
  },

  status: {
    stock: { one: '{n} voiture en stock.', other: '{n} voitures en stock.' },
    updatedToday: 'Liste mise à jour aujourd’hui à {time}.',
    updatedYesterday: 'Liste mise à jour hier à {time}.',
    updatedOn: 'Liste mise à jour le {date} à {time}.',
    never: 'La liste de nos voitures arrive bientôt.',
    everyMorning: 'Liste des voitures mise à jour chaque matin.',
  },

  hero: {
    h1: 'Le garage du rond-point d’Erpeldange',
    sub: 'Louez une remorque ou une camionnette, trouvez votre prochaine voiture, faites entretenir et réparer la vôtre. Au 1, rue du Viaduc, à côté de la station Aral, entre Ettelbruck et Diekirch.',
    ctaFinder: 'Trouver une remorque',
    ctaCars: 'Voir les voitures',
    drawingAlt: 'Plan du rond-point d’Erpeldange avec l’emplacement du garage à côté de la station Aral',
  },

  finder: {
    h2: 'Quelle remorque vous faut-il ?',
    intro:
      'Dites-nous ce que vous transportez et quel permis vous avez. Vous voyez tout de suite les remorques qui conviennent, leur prix et si votre permis suffit.',
    cargoLegend: 'Que transportez-vous ?',
    cargo: {
      voiture: 'Une voiture',
      moto: 'Une moto',
      terre: 'Terre, gravats ou déchets verts',
      fete: 'Boissons et repas pour une fête',
      meubles: 'Meubles ou cartons',
      materiel: 'Matériel ou machines',
    },
    licenceLegend: 'Quel permis avez-vous ?',
    licence: {
      B: 'Permis B',
      B96: 'Permis B avec code 96',
      BE: 'Permis BE',
      unknown: 'Je ne sais pas',
    },
    exactSummary: 'Calcul exact pour votre voiture (facultatif)',
    f2: 'Masse maximale de votre voiture (champ F.2)',
    o1: 'Charge remorquable freinée (champ O.1)',
    o2: 'Charge remorquable non freinée (champ O.2)',
    kg: 'kg',
    exactHint: 'Ces chiffres figurent sur le certificat d’immatriculation de votre voiture.',
    fleetCount: { one: '{n} remorque dans notre flotte', other: '{n} remorques dans notre flotte' },
    matchCount: { one: '{n} remorque convient', other: '{n} remorques conviennent' },
    none: 'Aucune remorque ne convient pour cette combinaison. Appelez-nous au +352 81 05 41, nous vous conseillons.',
    vansHeading: 'Camionnettes',
    vanStatement: 'Une camionnette jusqu’à 3 500 kg de masse maximale se conduit avec le permis B.',
    specs: {
      payload: 'Charge utile',
      mma: 'Masse maximale',
      empty: 'Poids à vide',
      surface: 'Surface de chargement',
      height: 'Hauteur de chargement',
      braked: 'Freinée',
      yes: 'oui',
      no: 'non',
      socket: 'Prise',
      socketValue: '{n} broches',
      deposit: 'Caution',
      volume: 'Volume intérieur',
      temp: 'Température',
      power: 'Alimentation',
    },
    pallets: { one: '{n} palette Europe', other: '{n} palettes Europe' },
    volumeText: 'Volume intérieur {m3} m³',
    diagramLabel: 'Surface de chargement {l} × {w} m',
    diagramPallets: '{n} palettes Europe',
    verdict: {
      ok: 'Votre permis suffit.',
      needB96orBE: 'Il vous faut le code 96 ou le permis BE.',
      needBE: 'Il vous faut le permis BE.',
      dependsB:
        'Avec le permis B, voiture et remorque ensemble ne doivent pas dépasser 3 500 kg. Indiquez la masse de votre voiture (F.2) pour le savoir.',
      dependsB96:
        'Avec le code 96, voiture et remorque ensemble ne doivent pas dépasser 4 250 kg. Indiquez la masse de votre voiture (F.2) pour le savoir.',
      required: 'Permis nécessaire : {licence}',
      requiredDepends: 'Permis nécessaire : selon votre voiture, B, B96 ou BE',
      towLimit: 'Chargée au maximum, cette remorque dépasse ce que votre voiture peut tracter ({limite} kg).',
    },
    licenceShort: { B: 'B', B96: 'B avec code 96', BE: 'BE' },
    price: '{day} la journée, {weekend} le week-end',
    priceMissing: '[FEHLT — Preis pro Tag und Wochenende]',
    request: 'Demander cette remorque',
    requestVan: 'Demander cette camionnette',
    seeAll: 'Voir toute la flotte',
    finePrint:
      'Indication basée sur les règles du permis de conduire au Luxembourg (transports.public.lu). En cas de doute, demandez-nous avant de partir.',
    sourceLink: 'Règles du permis sur transports.public.lu',
    empty: 'La liste de nos remorques arrive bientôt. Appelez-nous au +352 81 05 41.',
    noJsRules:
      'Avec le permis B, vous pouvez tracter une remorque jusqu’à 750 kg de masse maximale, ou une remorque plus lourde si voiture et remorque ensemble ne dépassent pas 3 500 kg. Avec le code 96, l’ensemble peut aller jusqu’à 4 250 kg. Au-delà, il faut le permis BE.',
  },

  fleetTable: {
    h2: 'Toute notre flotte',
    caption: 'Nos remorques et camionnettes de location',
    kind: 'Type',
    payload: 'Charge utile',
    mma: 'Masse maximale',
    surface: 'Surface',
    licence: 'Permis nécessaire',
    day: 'Prix jour',
    weekend: 'Prix week-end',
    licenceDepends: 'selon la voiture',
  },

  categories: {
    'porte-voiture': 'Remorque porte-voiture',
    'porte-moto': 'Remorque porte-moto',
    benne: 'Benne basculante',
    frigorifique: 'Remorque frigorifique',
    plateau: 'Remorque plateau',
    fourgon: 'Remorque fourgon',
    camionnette: 'Camionnette',
    voiture: 'Voiture',
  },

  cars: {
    homeH2: 'Nos voitures en stock',
    h1: 'Voitures neuves et d’occasion',
    lead: 'Toutes les voitures en stock au Garage Um Rond Point, au rond-point d’Erpeldange. Appelez-nous ou écrivez-nous sur WhatsApp avant de passer, pour un essai sur rendez-vous.',
    seeAll: { one: 'Voir la voiture', other: 'Voir les {n} voitures' },
    year: 'Année',
    km: 'Kilomètres',
    fuel: 'Carburant',
    tagFresh: 'Nouveau',
    tagNew: 'Neuve',
    price: 'Prix',
    noPhoto: 'Photo à venir',
    empty: 'Aucune voiture en stock pour le moment. Appelez-nous au +352 81 05 41.',
    filter: {
      summary: 'Filtrer ({n})',
      legend: 'Filtrer les voitures',
      make: 'Marque',
      fuel: 'Carburant',
      gearbox: 'Boîte',
      maxPrice: 'Prix maximum',
      condition: 'État',
      sort: 'Tri',
      all: 'Toutes',
      any: 'Tous',
      conditionNew: 'Neuve',
      conditionUsed: 'Occasion',
      sortRecent: 'plus récentes',
      sortPriceAsc: 'prix croissant',
      sortPriceDesc: 'prix décroissant',
      sortKmAsc: 'kilométrage croissant',
      count: { one: '{n} voiture', other: '{n} voitures' },
      empty: 'Aucune voiture ne correspond.',
      reset: 'Réinitialiser les filtres',
      upTo: 'jusqu’à {price}',
    },
  },

  enums: {
    fuel: {
      petrol: 'Essence',
      diesel: 'Diesel',
      hybrid: 'Hybride',
      plugin_hybrid: 'Hybride rechargeable',
      electric: 'Électrique',
      lpg: 'GPL',
      other: 'Autre',
    },
    transmission: { automatic: 'Automatique', manual: 'Manuelle', other: 'Autre' },
    body: {
      estate: 'Break',
      saloon: 'Berline',
      suv: 'SUV / 4x4',
      city: 'Citadine',
      coupe: 'Coupé',
      convertible: 'Cabriolet',
      mpv: 'Monospace',
      van: 'Utilitaire',
      pickup: 'Pick-up',
      other: 'Autre',
    },
    condition: { new: 'Neuve', used: 'Occasion' },
    /** Farben aus den Inseraten (französisch) → Anzeige; unbekannte bleiben im Original */
    colors: {
      noir: 'Noir',
      blanc: 'Blanc',
      gris: 'Gris',
      argent: 'Argent',
      bleu: 'Bleu',
      rouge: 'Rouge',
      vert: 'Vert',
      jaune: 'Jaune',
      orange: 'Orange',
      marron: 'Marron',
      brun: 'Brun',
      beige: 'Beige',
      bordeaux: 'Bordeaux',
      violet: 'Violet',
      or: 'Or',
      anthracite: 'Anthracite',
    },
  },

  car: {
    specsH2: 'Caractéristiques',
    firstReg: 'Première immatriculation',
    mileage: 'Kilométrage',
    fuel: 'Carburant',
    gearbox: 'Boîte',
    power: 'Puissance',
    powerUnit: 'ch',
    displacement: 'Cylindrée',
    body: 'Carrosserie',
    seats: 'Places',
    colorExt: 'Couleur extérieure',
    colorInt: 'Couleur intérieure',
    euro: 'Norme Euro',
    wltp: 'Consommation et CO₂ (WLTP)',
    wltpMissing: 'informations au garage',
    ref: 'Réf.',
    notSpecified: 'non indiqué',
    condition: 'État',
    vatRecoverable: 'TVA récupérable',
    equipmentH2: 'Équipement',
    equipmentMore: 'Voir les {n} équipements',
    descriptionH2: 'Description',
    originalNote: 'Description d’origine en français',
    originalListNote: 'Liste d’origine en français',
    contactH2: 'Cette voiture vous intéresse ?',
    contactText: 'Appelez-nous, écrivez-nous sur WhatsApp ou envoyez-nous votre demande.',
    whatsappText: 'Bonjour, la {make} {model} (réf. {id}) est-elle encore disponible ?',
    similarH2: 'Voitures similaires',
    sodablast: 'Pour une voiture ancienne, nous proposons aussi le décapage sodablast.',
    sold: 'Cette voiture a été vendue ou n’est plus en stock.',
    backToList: 'Voir toutes nos voitures',
    gallery: {
      label: 'Photos de la {make} {model}',
      counter: '{i} / {n}',
      prev: 'Photo précédente',
      next: 'Photo suivante',
      open: 'Afficher les photos en grand',
      close: 'Fermer',
      thumbs: 'Miniatures',
      thumb: 'Photo {i}',
      alt: '{make} {model} {version}, photo {i} sur {n}',
    },
  },

  photos: {
    heroWorkshop: 'Voiture noire dans un atelier moderne et lumineux',
    workshop: 'Mécanicien au travail dans le compartiment moteur d’une voiture',
    sodablast: 'Voiture ancienne rouillée, peinture écaillée',
    bodywork: 'Voiture de sport rouge sur un pont élévateur dans un atelier',
    garden: 'Tondeuse à gazon thermique sur une pelouse',
    gardenPage: 'Tonte d’une pelouse au soleil',
    paint: 'Peinture d’une carrosserie au pistolet',
    rental: 'Pick-up blanc chargé sur un plateau',
    trailersSale: 'Remorque basculante avec ridelles grillagées',
    fleetAlt: 'Photo : {name}',
    creditsH2: 'Photos d’illustration',
    credits: 'Photos d’illustration sous licence libre :',
  },
  services: {
    h2: 'Nos autres services',
    workshop: {
      h3: 'Atelier',
      text: 'Entretien, diagnostic et réparation de votre voiture ou camionnette. En carrosserie, nous réparons et repeignons votre véhicule après un accrochage.',
      link: 'Mécanique et carrosserie',
    },
    sodablast: {
      h3: 'Sodablast',
      text: 'Le sodablast projette du bicarbonate de soude pour décaper peinture, graisse et saleté. Ce décapage doux n’abîme pas les surfaces délicates : carrosserie ancienne, jantes, pièces mécaniques.',
      link: 'Le décapage sodablast',
    },
    garden: {
      h3: 'Jardin & forêt',
      text: 'Nous vendons et réparons des machines de jardin et de forêt, principalement des marques Honda et Stihl.',
      link: 'Machines de jardin et de forêt',
    },
    trailers: {
      h3: 'Remorques à vendre',
      text: 'Nous vendons des remorques Saris, Humbaur et WM Meyer, pour les particuliers et les professionnels. Nous vous aidons à choisir une remorque que votre voiture peut tracter et que votre permis autorise.',
      link: 'Nos remorques à vendre',
    },
    photoMissing: '[FEHLT — Foto]',
  },

  reviews: {
    h2: 'Avis Google',
    link: 'Lire tous les avis sur Google',
    missing: '[FEHLT — 2–3 vom Kunden freigegebene Zitate aus dem Google-Profil, mit Vorname + Initiale und Monat/Jahr]',
  },

  faq: {
    h2: 'Questions fréquentes',
    rentalH2: 'Questions sur la location',
    items: {
      permis: {
        q: 'Quel permis faut-il pour tracter une remorque ?',
        a: 'Avec le permis B, vous pouvez tracter une remorque jusqu’à 750 kg de masse maximale. Une remorque plus lourde est permise si la voiture et la remorque ensemble ne dépassent pas 3 500 kg. Avec le code 96 sur votre permis B, l’ensemble peut aller jusqu’à 4 250 kg. Au-delà, il faut le permis BE, qui autorise une remorque jusqu’à 3 500 kg.',
      },
      carte: {
        q: 'Où voir ce que ma voiture peut tracter ?',
        a: 'Sur le certificat d’immatriculation : le champ O.1 indique la charge remorquable avec freins, le champ O.2 sans freins. La masse maximale de votre voiture figure au champ F.2.',
      },
      prix: {
        q: 'Combien coûte la location d’une remorque ?',
        a: 'Le prix à la journée et au week-end est indiqué pour chaque remorque dans notre guide. [FEHLT — Preise der Flotte]',
      },
      louer: {
        q: 'Que faut-il pour louer ?',
        a: '[FEHLT — Mietbedingungen: Ausweis, Führerschein, Kaution, Stecker 7- oder 13-polig]',
      },
      reserver: {
        q: 'Faut-il réserver à l’avance ?',
        a: '[FEHLT — Reservierung, Abhol- und Rückgabezeiten]',
      },
      dispo: {
        q: 'Les voitures de la liste sont-elles encore disponibles ?',
        a: 'Nous mettons la liste à jour chaque matin. Une voiture vendue dans la journée peut encore apparaître jusqu’au lendemain. Appelez-nous ou écrivez-nous sur WhatsApp avant de passer.',
      },
      marques: {
        q: 'Réparez-vous toutes les marques ?',
        a: 'Oui, notre atelier entretient et répare les voitures et camionnettes de toutes marques. [UNBESTÄTIGT — Werden alle Marken repariert?]',
      },
      depot: {
        q: 'Pouvez-vous vendre ma voiture pour moi ?',
        a: 'Oui, en dépôt-vente : nous mettons votre voiture en vente et vous mettons en relation avec les acheteurs. Parlez-nous des conditions au garage ou par téléphone.',
      },
      langues: {
        q: 'Quelles langues parlez-vous ?',
        a: 'Luxembourgeois, français, allemand, anglais et portugais.',
      },
      paiement: {
        q: 'Comment puis-je payer ?',
        a: 'En espèces, par carte Visa, Mastercard ou V PAY, avec Payconiq, Apple Pay ou PayPal, ou par virement. [UNBESTÄTIGT — Zahlungsmittel]',
      },
    },
  },

  access: {
    h2: 'Nous trouver',
    address: 'Adresse',
    landmark: 'Au rond-point, à côté de la station Aral, entre Ettelbruck et Diekirch.',
    hoursH3: 'Heures d’ouverture',
    languagesH3: 'Langues',
    languages: 'Nous parlons luxembourgeois, français, allemand, anglais et portugais.',
    mapLink: 'Itinéraire dans Google Maps',
    external: '(site externe)',
    mapTitle: 'Le rond-point d’Erpeldange',
    osm: '© les contributeurs d’OpenStreetMap',
    osmLabel: 'Données de carte',
    labels: {
      garage: 'Garage Um Rond Point',
      aral: 'Aral',
      ettelbruck: 'Ettelbruck',
      diekirch: 'Diekirch',
      erpeldange: 'Erpeldange',
      rail: 'Voie ferrée',
      sure: 'Sûre',
    },
  },

  hours: {
    caption: 'Heures d’ouverture du Garage Um Rond Point',
    day: 'Jour',
    time: 'Heures',
    days: {
      mo: 'Lundi',
      tu: 'Mardi',
      we: 'Mercredi',
      th: 'Jeudi',
      fr: 'Vendredi',
      sa: 'Samedi',
      su: 'Dimanche',
    },
    closed: 'Fermé',
    today: 'aujourd’hui',
    and: 'et',
    holidays: 'Jours fériés : [UNBESTÄTIGT — Feiertage vermutlich geschlossen]',
    short: 'Lundi à vendredi {weekday}, samedi {saturday}',
  },

  footer: {
    hoursH: 'Heures d’ouverture',
    followH: 'Suivez-nous',
    portals: 'Nos annonces aussi sur {luxauto} et {autoscout}',
    legal: 'Mentions légales',
    privacy: 'Protection des données',
    tiktokMissing: 'TikTok [UNBESTÄTIGT — genaue URL]',
  },

  depot: {
    h2: 'Vous vendez votre voiture ?',
    text: 'Avec notre service de dépôt-vente, nous mettons votre voiture en vente et vous mettons en relation avec les acheteurs. Parlez-nous de votre voiture, nous vous expliquons les conditions.',
    missing: '[FEHLT — Konditionen Kommissionsverkauf]',
    link: 'Proposer ma voiture',
  },

  pages: {
    rental: {
      h1: 'Location de remorques et camionnettes à Erpeldange',
      lead: 'Remorques porte-voiture et porte-moto, bennes basculantes, remorques frigorifiques pour vos fêtes, camionnettes. À la journée ou pour le week-end.',
      durationsMissing: '[UNBESTÄTIGT — Mietdauern Tag / Wochenende]',
      conditionsH2: 'Conditions de location',
      conditionsMissing:
        '[FEHLT — Mietbedingungen: Ausweis, Führerschein, Kaution, Abhol- und Rückgabezeiten, Reservierung]',
      formH2: 'Demande de location',
      formIntro: 'Choisissez la remorque et les dates. Nous vous rappelons pour confirmer.',
    },
    category: {
      h1: {
        'porte-voiture': 'Louer une remorque porte-voiture à Erpeldange',
        'porte-moto': 'Louer une remorque porte-moto à Erpeldange',
        benne: 'Louer une benne basculante à Erpeldange',
        frigorifique: 'Louer une remorque frigorifique à Erpeldange',
        camionnette: 'Louer une camionnette à Erpeldange',
      },
      intro: {
        'porte-voiture':
          'La remorque porte-voiture sert à transporter une voiture en panne, une voiture de collection ou une voiture que vous venez d’acheter. Vérifiez avant de partir que votre voiture peut tracter l’ensemble et que votre permis suffit.',
        'porte-moto':
          'La remorque porte-moto sert à emmener une moto, un scooter ou un quad à l’atelier, en vacances ou sur un circuit. Elle se tracte avec une voiture ordinaire.',
        benne:
          'La benne basculante sert à transporter terre, gravats, sable ou déchets verts, et se vide en basculant. Pour un chantier, le jardin ou un passage au parc à conteneurs.',
        frigorifique:
          'La remorque frigorifique garde boissons et repas au frais pendant une fête, un mariage ou un festival. Vous la garez sur place pour la durée de l’événement.',
        camionnette:
          'La camionnette sert à un déménagement, au transport de meubles ou de matériel. Jusqu’à 3 500 kg de masse maximale, elle se conduit avec le permis B.',
      },
      vehiclesH2: 'Nos véhicules',
      licenceH2: 'Quel permis ?',
      backToFinder: 'Comparer avec toutes nos remorques',
    },
    workshop: {
      h1: 'Mécanique et carrosserie à Erpeldange',
      lead: 'Entretien, diagnostic et réparation de votre voiture ou camionnette. En carrosserie, nous réparons et repeignons votre véhicule après un accrochage.',
      whatH2: 'Ce que fait notre atelier',
      items: {
        entretien: 'Entretien et révision',
        diagnostic: 'Diagnostic des pannes',
        reparation: 'Réparation mécanique',
        carrosserie: 'Carrosserie et peinture',
      },
      extraMissing:
        '[UNBESTÄTIGT — weitere Leistungen laut Editus: Richtbank, Smart Repair, Ausbeulen, Turbo, 4x4, Restaurierung alter Autos; erst nach Bestätigung zeigen]',
      transparency: 'Avant chaque travail, nous vous expliquons ce que nous allons faire. Vous recevez une facture détaillée.',
      transparencyMissing: '[UNBESTÄTIGT — Kostenvoranschlag vorher, detaillierte Rechnung?]',
      formH2: 'Demander un rendez-vous',
      formIntro: 'Dites-nous de quel véhicule il s’agit et ce qu’il faut faire. Nous vous rappelons pour fixer le rendez-vous.',
    },
    sodablast: {
      h1: 'Décapage sodablast à Erpeldange',
      lead: 'Le sodablast projette du bicarbonate de soude pour décaper peinture, graisse et saleté. Ce décapage doux n’abîme pas les surfaces délicates : carrosserie ancienne, jantes, pièces mécaniques.',
      whatH2: 'Pour quoi ?',
      items: {
        carrosserie: 'Carrosseries anciennes, avant une restauration',
        jantes: 'Jantes',
        pieces: 'Pièces mécaniques',
      },
      photosH2: 'Avant et après',
      photosMissing: '[FEHLT — Vorher-nachher-Fotos Sodablast]',
      whatsapp: 'Envoyez-nous des photos sur WhatsApp pour un premier avis.',
      whatsappText: 'Bonjour, voici des photos pour un premier avis sur un décapage sodablast.',
      whatsappLink: 'Envoyer des photos sur WhatsApp',
      formH2: 'Demander un rendez-vous',
    },
    trailersForSale: {
      h1: 'Remorques à vendre à Erpeldange',
      lead: 'Nous vendons des remorques Saris, Humbaur et WM Meyer, pour les particuliers et les professionnels.',
      dealerMissing: '[UNBESTÄTIGT — Händlerstatus Saris, Humbaur, WM Meyer; Logos nur mit Freigabe]',
      adviceH2: 'Quel permis pour quelle remorque ?',
      advice:
        'Nous vous aidons à choisir une remorque que votre voiture peut tracter et que votre permis autorise : taille, masse maximale, freinage. Notre guide de location vous montre les règles du permis avec des exemples.',
      adviceLink: 'Quel permis pour quelle remorque ?',
      stockH2: 'Remorques en stock',
      stockMissing: '[FEHLT — Anhänger auf Lager]',
      formH2: 'Une question sur une remorque ?',
    },
    garden: {
      h1: 'Machines de jardin et de forêt à Erpeldange',
      lead: 'Nous vendons et réparons des machines de jardin et de forêt, principalement des marques Honda et Stihl.',
      dealerMissing: '[UNBESTÄTIGT — Händlerstatus Honda und Stihl; Logos nur mit Freigabe]',
      whatH2: 'Vente et réparation',
      text: 'Tondeuse, débroussailleuse, tronçonneuse ou taille-haie : apportez votre machine à l’atelier ou demandez-nous conseil pour en choisir une nouvelle.',
      formH2: 'Demander une réparation',
    },
    contact: {
      h1: 'Contact et accès',
      lead: 'Garage Um Rond Point, 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre. Au rond-point, à côté de la station Aral. Téléphone +352 81 05 41, WhatsApp +352 621 373 272, info@rondpoint.lu. Nous parlons luxembourgeois, français, allemand, anglais et portugais.',
      waysH2: 'Nous joindre',
      phone: 'Téléphone',
      whatsapp: 'WhatsApp',
      email: 'E-mail',
      paymentH2: 'Paiement',
      payment: 'En espèces, par carte Visa, Mastercard ou V PAY, avec Payconiq, Apple Pay ou PayPal, ou par virement.',
      paymentMissing: '[UNBESTÄTIGT — Zahlungsmittel]',
      formH2: 'Nous écrire',
    },
    thanks: {
      h1: 'Votre demande est bien arrivée',
      text: 'Nous vous répondons [FEHLT — Antwortzeit, z. B. « le jour ouvrable suivant »]. C’est urgent ? Appelez le +352 81 05 41.',
      back: 'Retour à l’accueil',
    },
    notFound: {
      h1: 'Page introuvable',
      text: 'Cette page n’existe pas ou plus. Une voiture vendue disparaît de notre liste.',
    },
  },

  forms: {
    optional: 'facultatif',
    name: 'Nom',
    phone: 'Téléphone',
    phoneHint: 'Nous vous rappelons.',
    email: 'E-mail',
    message: 'Message',
    consent: 'J’accepte que Garage Um Rond Point utilise mes données pour répondre à ma demande. Plus d’informations dans la {link}.',
    consentLink: 'protection des données',
    honeypot: 'Ne remplissez pas ce champ',
    choose: 'Choisissez…',
    sending: 'Envoi en cours…',
    successH: 'Votre demande est bien arrivée.',
    successText: 'Nous vous répondons dès que possible. C’est urgent ? Appelez le +352 81 05 41.',
    errorSummary: 'Vérifiez les champs signalés.',
    errorSend: 'L’envoi n’a pas fonctionné. Réessayez ou appelez-nous au +352 81 05 41.',
    errorRate: 'Vous avez envoyé beaucoup de demandes aujourd’hui. Appelez-nous au +352 81 05 41.',
    errors: {
      name: 'Indiquez votre nom.',
      phone: 'Indiquez un numéro de téléphone pour que nous puissions vous rappeler.',
      phoneInvalid: 'Ce numéro semble incomplet. Indiquez-le avec l’indicatif, par exemple +352 621 123 456.',
      email: 'Cette adresse e-mail n’est pas valide. Elle doit contenir un @, par exemple nom@exemple.lu.',
      consent: 'Cochez la case pour que nous puissions utiliser vos données pour vous répondre.',
      vehicle: 'Choisissez une remorque ou un véhicule.',
      from: 'Indiquez la date de début.',
      to: 'Indiquez la date de fin.',
      toBeforeFrom: 'La date « Au » ne peut pas être avant la date « Du ».',
      past: 'Choisissez une date à partir d’aujourd’hui.',
      wish: 'Choisissez ce que vous souhaitez.',
      reason: 'Choisissez pour quoi vous venez.',
      machine: 'Indiquez le véhicule ou la machine.',
      work: 'Décrivez ce qu’il faut faire.',
      subject: 'Choisissez un sujet.',
      message: 'Écrivez votre message.',
    },
    rental: {
      vehicle: 'Remorque ou véhicule souhaité',
      from: 'Du',
      to: 'Au',
      licence: 'Votre permis',
      licenceNone: 'Pas précisé',
      licenceB: 'B',
      licenceB96: 'B + code 96',
      licenceBE: 'BE',
      submit: 'Envoyer la demande de location',
      noFleet: 'Dites-nous dans le message ce que vous souhaitez louer.',
      other: 'Autre, précisé dans le message',
    },
    car: {
      carLabel: 'Voiture',
      wish: 'Vous souhaitez',
      wishTest: 'Un essai',
      wishInfo: 'Plus d’informations',
      wishTradeIn: 'Faire reprendre ma voiture',
      tradeInH: 'Seulement pour une reprise',
      tradeMake: 'Marque et modèle',
      tradeYear: 'Année',
      tradeKm: 'Kilométrage',
      title: 'Demander des informations',
      submit: 'Envoyer ma demande',
    },
    workshop: {
      reason: 'Pour quoi ?',
      reasonMaintenance: 'Entretien',
      reasonRepair: 'Panne ou réparation',
      reasonBody: 'Carrosserie',
      reasonSodablast: 'Sodablast',
      reasonGarden: 'Machine de jardin ou forêt',
      machine: 'Véhicule ou machine',
      machineHint: 'Marque, modèle et année, par exemple : VW Golf 2018.',
      work: 'Que faut-il faire ?',
      date: 'Date souhaitée',
      photos: 'Pour la carrosserie ou le sodablast, envoyez-nous des photos sur WhatsApp : +352 621 373 272.',
      submit: 'Demander un rendez-vous',
    },
    contact: {
      subject: 'Sujet',
      subjectQuestion: 'Question générale',
      subjectTrailer: 'Achat de remorque',
      subjectDepot: 'Dépôt-vente',
      subjectOther: 'Autre',
      submit: 'Envoyer le message',
    },
  },

  seo: {
    home: {
      title: 'Garage Um Rond Point Erpeldange – remorques, autos, atelier',
      description:
        'Au rond-point d’Erpeldange, entre Ettelbruck et Diekirch : location de remorques et camionnettes, voitures neuves et d’occasion, mécanique et carrosserie.',
    },
    rental: {
      title: 'Location de remorques à Erpeldange, près d’Ettelbruck',
      description:
        'Porte-voiture, porte-moto, benne basculante, remorque frigorifique ou camionnette : voyez quelle remorque convient, son prix et si votre permis suffit.',
    },
    category: {
      title: {
        'porte-voiture': 'Location remorque porte-voiture à Erpeldange | Um Rond Point',
        'porte-moto': 'Location remorque porte-moto à Erpeldange | Um Rond Point',
        benne: 'Location benne basculante à Erpeldange | Um Rond Point',
        frigorifique: 'Location remorque frigorifique Erpeldange | Um Rond Point',
        camionnette: 'Location camionnette à Erpeldange | Garage Um Rond Point',
      },
      description: {
        'porte-voiture':
          'Louez une remorque porte-voiture au rond-point d’Erpeldange, près d’Ettelbruck : dimensions, charge utile, prix et permis nécessaire pour chaque remorque.',
        'porte-moto':
          'Louez une remorque porte-moto au rond-point d’Erpeldange, près d’Ettelbruck : dimensions, charge utile, prix et permis nécessaire pour chaque remorque.',
        benne:
          'Louez une benne basculante pour terre, gravats ou déchets verts au rond-point d’Erpeldange, près d’Ettelbruck : charge utile, prix et permis nécessaire.',
        frigorifique:
          'Louez une remorque frigorifique pour votre fête ou festival au rond-point d’Erpeldange, près d’Ettelbruck : volume, température, prix et permis nécessaire.',
        camionnette:
          'Louez une camionnette pour un déménagement ou du matériel au rond-point d’Erpeldange, près d’Ettelbruck. Jusqu’à 3 500 kg, le permis B suffit. Prix au jour.',
      },
    },
    cars: {
      title: 'Voitures neuves et d’occasion à Erpeldange | Um Rond Point',
      description:
        'Toutes les voitures en stock au Garage Um Rond Point à Erpeldange, avec prix, kilométrage et photos. Liste mise à jour chaque matin. Essai sur rendez-vous.',
    },
    car: {
      suffixLong: ' | Garage Um Rond Point',
      suffixShort: ' | Um Rond Point',
      place: ' à Erpeldange',
      descTail: 'À voir au Garage Um Rond Point à Erpeldange.',
      descExtra: [' Essai sur rendez-vous.', ' Entre Ettelbruck et Diekirch.', ' Appelez le +352 81 05 41.'],
      descGearbox: 'boîte {gearbox}',
      soldTitle: '{make} {model} vendue | Garage Um Rond Point, Erpeldange',
      soldDescription:
        'Cette {make} {model} a été vendue ou n’est plus en stock. Découvrez les autres voitures neuves et d’occasion du Garage Um Rond Point à Erpeldange.',
    },
    workshop: {
      title: 'Mécanique et carrosserie à Erpeldange | Garage Um Rond Point',
      description:
        'Entretien, diagnostic, réparation, carrosserie et peinture au rond-point d’Erpeldange, près d’Ettelbruck et Diekirch. Demandez un rendez-vous en ligne.',
    },
    sodablast: {
      title: 'Décapage sodablast au Luxembourg | Garage Um Rond Point',
      description:
        'Le sodablast décape peinture et saleté sans abîmer la surface : voiture ancienne, jantes, pièces mécaniques. À Erpeldange, entre Ettelbruck et Diekirch.',
    },
    trailersForSale: {
      title: 'Remorques à vendre : Humbaur, Saris, WM Meyer | Erpeldange',
      description:
        'Achetez votre remorque à Erpeldange : Humbaur, Saris ou WM Meyer. Nous vous aidons à choisir la taille et le poids adaptés à votre voiture et à votre permis.',
    },
    garden: {
      title: 'Machines de jardin et forêt Honda et Stihl à Erpeldange',
      description:
        'Vente et réparation de machines de jardin et de forêt, principalement Honda et Stihl, au Garage Um Rond Point à Erpeldange, entre Ettelbruck et Diekirch.',
    },
    contact: {
      title: 'Contact et accès | Garage Um Rond Point, Erpeldange',
      description:
        '1, rue du Viaduc à Erpeldange-sur-Sûre, au rond-point à côté de la station Aral. Lundi à vendredi 7h45–12h et 13h–18h, samedi 8h–12h. Tél. +352 81 05 41.',
    },
    thanks: {
      title: 'Demande envoyée | Garage Um Rond Point, Erpeldange-sur-Sûre',
      description:
        'Votre demande est bien arrivée au Garage Um Rond Point à Erpeldange. Nous vous répondons rapidement. C’est urgent ? Appelez-nous au +352 81 05 41, merci.',
    },
    legal: {
      title: 'Mentions légales | Garage Um Rond Point, Erpeldange-sur-Sûre',
      description:
        'Mentions légales du Garage Um Rond Point S.à r.l., 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre : éditeur, RCS B296148, TVA LU36559673, hébergement du site.',
    },
    privacy: {
      title: 'Protection des données | Garage Um Rond Point, Erpeldange',
      description:
        'Quelles données le Garage Um Rond Point traite quand vous nous écrivez, pourquoi, combien de temps et quels sont vos droits. Sans cookies, sans outil de suivi.',
    },
  },

  legal: {
    h1: 'Mentions légales',
    publisherH2: 'Éditeur du site',
    company: 'Raison sociale',
    legalForm: 'Forme juridique',
    address: 'Siège',
    phone: 'Téléphone',
    email: 'E-mail',
    rcs: 'Registre de commerce',
    vat: 'Numéro de TVA',
    registered: 'Immatriculation',
    manager: 'Gérant',
    permit: 'Autorisation d’établissement',
    capital: 'Capital social',
    managerMissing: '[UNBESTÄTIGT — Gérant David Moreira laut Editus]',
    permitMissing: '[FEHLT — Nummer der Gewerbegenehmigung]',
    capitalMissing: '[FEHLT — Gesellschaftskapital]',
    hostingH2: 'Hébergement',
    hosting:
      'Le site est hébergé par GitHub Pages, un service de GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis.',
    contentH2: 'Contenu',
    content:
      'Les annonces de voitures reprennent nos propres annonces publiées sur LuxAuto et AutoScout24. Les prix et caractéristiques peuvent changer ; seule l’offre confirmée au garage fait foi.',
    photosH2: 'Photos et plan',
    photos: 'Plan du rond-point dessiné d’après les données OpenStreetMap (© les contributeurs d’OpenStreetMap, licence ODbL). Photos des voitures : nos propres annonces.',
    fontH2: 'Police de caractères',
    font: 'Archivo, Omnibus-Type, SIL Open Font License 1.1.',
  },

  privacy: {
    h1: 'Protection des données',
    intro:
      'Nous traitons vos données uniquement pour répondre à vos demandes. Ce site ne dépose pas de cookies et n’utilise pas d’outil de suivi ni de publicité.',
    controllerH2: 'Responsable du traitement',
    controller: 'GARAGE UM ROND POINT S.à r.l., 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre, Luxembourg. Téléphone +352 81 05 41, info@rondpoint.lu.',
    formsH2: 'Formulaires de demande',
    forms:
      'Quand vous envoyez un formulaire, nous recevons les données que vous saisissez : nom, téléphone, e-mail si vous l’indiquez, votre message et les détails de votre demande (par exemple dates de location, véhicule, rendez-vous souhaité). Nous les utilisons pour vous répondre et préparer une offre ou un rendez-vous.',
    legalBasis:
      'Base légale : votre consentement (art. 6, paragraphe 1, point a du RGPD), que vous donnez en cochant la case, et les mesures précontractuelles à votre demande (art. 6, paragraphe 1, point b du RGPD). Vous pouvez retirer votre consentement à tout moment par e-mail ou par téléphone.',
    storage:
      'Votre demande est enregistrée dans une base de données chez Supabase (région Union européenne) et nous est transmise par e-mail via [UNBESTÄTIGT — EU-Mailanbieter, mit Nave klären]. Les demandes sont supprimées automatiquement après 90 jours [UNBESTÄTIGT — Frist mit Kunde bestätigen]. Les échanges qui mènent à un contrat sont conservés selon les obligations comptables.',
    abuse:
      'Pour limiter les abus, nous enregistrons une empreinte cryptographique (hachage) de votre adresse IP pendant 24 heures. Elle ne permet pas de retrouver votre adresse.',
    hostingH2: 'Hébergement et journaux du serveur',
    hosting:
      'Le site est hébergé par GitHub Pages (GitHub, Inc., États-Unis). À chaque visite, GitHub traite votre adresse IP et des données techniques pour livrer les pages et assurer la sécurité. GitHub est certifié selon le cadre de protection des données UE–États-Unis (EU-US Data Privacy Framework). Base légale : notre intérêt légitime à un site sûr et disponible (art. 6, paragraphe 1, point f du RGPD).',
    linksH2: 'Liens vers d’autres services',
    links:
      'Le site ne charge aucun contenu externe : polices, photos et plan sont hébergés avec le site. Les liens vers Google Maps, WhatsApp, Facebook, Instagram, TikTok, LuxAuto et AutoScout24 ne s’ouvrent que si vous cliquez. Ces services traitent alors vos données selon leurs propres règles. WhatsApp appartient à Meta Platforms ; si vous nous écrivez sur WhatsApp, Meta traite votre numéro et vos messages.',
    rightsH2: 'Vos droits',
    rights:
      'Vous pouvez demander l’accès à vos données, leur rectification, leur effacement, la limitation du traitement et la portabilité, et vous opposer au traitement. Écrivez-nous à info@rondpoint.lu. Vous pouvez aussi déposer une réclamation auprès de la Commission nationale pour la protection des données (CNPD), 15, boulevard du Jazz, L-4370 Belvaux, cnpd.public.lu.',
    updated: 'Mise à jour : {date}',
  },
  /** Leiste im Startbildschirm: alle Leistungen auf einen Blick (Titel aus nav.*) */
  offer: {
    label: 'Nos services en bref',
    sub: {
      rental: 'Remorques et camionnettes',
      cars: 'Stock à jour chaque matin',
      workshop: 'Mécanique et carrosserie',
      trailers: 'Saris, Humbaur, WM Meyer',
      garden: 'Honda et Stihl',
      sodablast: 'Décapage doux',
    },
  },
  /** Kurzes „Über uns“ auf der Startseite (nur bestätigte Angaben: Lage, Leistungen, Sprachen, Öffnungstage) */
  about: {
    h2: 'Qui sommes-nous ?',
    text: 'Le Garage Um Rond Point, c’est votre garage au rond-point d’Erpeldange, entre Ettelbruck et Diekirch. Location de remorques et de camionnettes, vente de voitures et de remorques, atelier et machines de jardin : tout se trouve à la même adresse. Passez nous voir, nous parlons votre langue.',
    link: 'Nous trouver',
    photoAlt: 'Mécanicien qui tend une clé de voiture',
  },
  /** Startseite: Stichpunkte; Unterseiten: ausführliche Erklärungen */
  details: {
    points: {
      workshop: [
        'Entretien et révision',
        'Diagnostic des pannes',
        'Réparation mécanique',
        'Carrosserie et peinture',
      ],
      sodablast: [
        'Décapage doux au bicarbonate de soude',
        'Carrosseries anciennes, jantes, pièces mécaniques',
        'Premier avis sur photos par WhatsApp',
      ],
      garden: [
        'Vente de machines de jardin et de forêt',
        'Réparation de vos machines',
        'Principalement Honda et Stihl',
      ],
      trailers: [
        'Remorques Saris, Humbaur et WM Meyer',
        'Pour particuliers et professionnels',
        'Conseil sur le poids et le permis',
      ],
    },
    workshop: {
      entretienH: 'Entretien et révision',
      entretien: 'Un entretien régulier garde votre voiture fiable et sûre : vidange, filtres, freins, niveaux et contrôle général. Indiquez-nous dans votre demande le kilométrage et la date du dernier entretien.',
      diagnosticH: 'Diagnostic des pannes',
      diagnostic: 'Un voyant s’allume, un bruit inhabituel, la voiture démarre mal : décrivez ce que vous remarquez et depuis quand. Le diagnostic permet de trouver la cause avant de réparer.',
      reparationH: 'Réparation mécanique',
      reparation: 'Après le diagnostic, nous réparons votre voiture ou votre camionnette dans notre atelier au rond-point d’Erpeldange.',
      carrosserieH: 'Carrosserie et peinture',
      carrosserie: 'Après un accrochage, nous réparons la carrosserie et repeignons les éléments abîmés. Envoyez-nous des photos des dégâts sur WhatsApp pour un premier avis.',
      processH2: 'Comment prendre rendez-vous',
      process: [
        'Décrivez votre véhicule et ce qu’il faut faire, dans le formulaire, par téléphone ou sur WhatsApp.',
        'Nous vous rappelons pour fixer la date.',
        'Vous déposez votre véhicule au garage, au 1, rue du Viaduc.',
      ],
    },
    sodablast: {
      explainH2: 'Comment fonctionne le sodablast ?',
      explain: 'Le bicarbonate de soude est projeté sur la surface avec de l’air comprimé. Plus tendre que le sable, il enlève la peinture, la graisse et la saleté sans creuser le métal. C’est pourquoi on l’utilise pour les pièces fragiles et les carrosseries anciennes.',
      explain2: 'Le décapage met à nu la surface d’origine : vous voyez l’état réel du métal avant une réparation ou une nouvelle peinture.',
      processH2: 'Comment se passe un décapage',
      process: [
        'Envoyez-nous des photos de la voiture ou de la pièce sur WhatsApp.',
        'Nous vous donnons un premier avis.',
        'Nous fixons ensemble un rendez-vous au garage.',
      ],
    },
    garden: {
      saleH2: 'Vente',
      sale: 'Tondeuse, débroussailleuse, tronçonneuse ou taille-haie : nous vendons des machines de jardin et de forêt, principalement des marques Honda et Stihl. Dites-nous la taille de votre terrain et ce que vous voulez faire, nous vous conseillons pour le choix.',
      repairH2: 'Réparation',
      repair: 'La tondeuse ne démarre plus, la tronçonneuse coupe mal, la débroussailleuse perd de la puissance ? Apportez votre machine à l’atelier ou décrivez le problème dans le formulaire.',
    },
    trailers: {
      chooseH2: 'Bien choisir sa remorque',
      masseH: 'Masse maximale',
      masse: 'Elle décide du permis nécessaire. Jusqu’à 750 kg, le permis B suffit ; au-delà, cela dépend de votre voiture.',
      freinH: 'Freinage',
      frein: 'Une remorque de plus de 750 kg de masse maximale doit être équipée de freins.',
      chargeH: 'Charge remorquable',
      charge: 'Votre voiture ne peut pas tracter plus que la valeur du champ O.1 (remorque freinée) ou O.2 (non freinée) du certificat d’immatriculation.',
      usageH: 'Forme et dimensions',
      usage: 'Plateau, benne, porte-voiture ou fourgon : la bonne remorque dépend de ce que vous transportez le plus souvent et de la place pour la ranger.',
    },
  },
};

export default fr;
export type Dict = typeof fr;
