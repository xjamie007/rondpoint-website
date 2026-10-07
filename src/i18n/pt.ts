import type { Dict } from './fr.ts';

/** Português (pt-PT). review: "native" – jeder Text muss von einer Muttersprachlerin/einem Muttersprachler geprüft werden. */
const pt: Dict = {
  meta: {
    lang: 'Português',
    siteName: 'Garage Um Rond Point',
    ogAlt: 'Garage Um Rond Point na rotunda de Erpeldange',
  },

  nav: {
    skip: 'Ir para o conteúdo',
    main: 'Navegação principal',
    rental: 'Aluguer',
    cars: 'Carros',
    workshop: 'Oficina',
    trailersForSale: 'Atrelados à venda',
    garden: 'Jardim e floresta',
    contact: 'Contacto',
    menu: 'Menu',
    close: 'Fechar',
    langLabel: 'Idioma',
    callAria: 'Ligar para o +352 81 05 41',
    home: 'Início',
    breadcrumb: 'Caminho de navegação',
    logoAria: 'Garage Um Rond Point, página inicial',
  },

  contactBar: {
    label: 'Contacto rápido',
    call: 'Ligar',
    whatsapp: 'WhatsApp',
    ask: 'Perguntar',
    whatsappText: 'Olá, tenho uma pergunta para a Garage Um Rond Point.',
  },

  status: {
    stock: { one: '{n} carro em stock.', other: '{n} carros em stock.' },
    updatedToday: 'Lista atualizada hoje às {time}.',
    updatedYesterday: 'Lista atualizada ontem às {time}.',
    updatedOn: 'Lista atualizada em {date} às {time}.',
    never: 'A lista dos nossos carros estará disponível em breve.',
    everyMorning: 'Lista de carros atualizada todas as manhãs.',
  },

  hero: {
    h1: 'A garagem da rotunda de Erpeldange',
    sub: 'Alugue um atrelado ou uma carrinha, encontre o seu próximo carro ou traga o seu para manutenção e reparação. Estamos em 1, rue du Viaduc, ao lado do posto de abastecimento Aral, entre Ettelbruck e Diekirch.',
    ctaFinder: 'Encontrar um atrelado',
    ctaCars: 'Ver os carros',
    drawingAlt: 'Planta da rotunda de Erpeldange com a localização da garagem ao lado do posto de abastecimento Aral',
  },

  finder: {
    h2: 'De que atrelado precisa?',
    intro:
      'Indique o que vai transportar e que carta de condução tem. Fica logo a saber que atrelados servem, quanto custam e se a sua carta é suficiente.',
    cargoLegend: 'O que vai transportar?',
    cargo: {
      voiture: 'Um carro',
      moto: 'Uma mota',
      terre: 'Terra, entulho ou restos de jardim',
      fete: 'Bebidas e comida para uma festa',
      meubles: 'Móveis ou caixas',
      materiel: 'Material ou máquinas',
    },
    licenceLegend: 'Que carta de condução tem?',
    licence: {
      B: 'Carta B',
      B96: 'Carta B com código 96',
      BE: 'Carta BE',
      unknown: 'Não sei',
    },
    exactSummary: 'Cálculo exato para o seu carro (opcional)',
    f2: 'Massa máxima autorizada do seu carro (campo F.2)',
    o1: 'Massa rebocável com travão (campo O.1)',
    o2: 'Massa rebocável sem travão (campo O.2)',
    kg: 'kg',
    exactHint: 'Estes valores constam do certificado de matrícula do seu carro.',
    fleetCount: { one: '{n} atrelado na nossa frota', other: '{n} atrelados na nossa frota' },
    matchCount: { one: '{n} atrelado serve', other: '{n} atrelados servem' },
    none: 'Nenhum atrelado serve para esta combinação. Ligue para o +352 81 05 41 e ajudamos a escolher.',
    vansHeading: 'Carrinhas',
    vanStatement: 'Uma carrinha até 3500 kg de massa máxima autorizada pode ser conduzida com a carta B.',
    specs: {
      payload: 'Carga útil',
      mma: 'Massa máxima autorizada',
      empty: 'Peso em vazio',
      surface: 'Superfície de carga',
      height: 'Altura de carga',
      braked: 'Com travão',
      yes: 'sim',
      no: 'não',
      socket: 'Tomada',
      socketValue: '{n} pinos',
      deposit: 'Caução',
      volume: 'Volume interior',
      temp: 'Temperatura',
      power: 'Alimentação elétrica',
    },
    pallets: { one: '{n} palete europeia', other: '{n} paletes europeias' },
    volumeText: 'Volume interior {m3} m³',
    diagramLabel: 'Superfície de carga {l} × {w} m',
    diagramPallets: '{n} paletes europeias',
    verdict: {
      ok: 'A sua carta é suficiente.',
      needB96orBE: 'Precisa do código 96 ou da carta BE.',
      needBE: 'Precisa da carta BE.',
      dependsB:
        'Com a carta B, carro e atrelado juntos não podem ultrapassar 3500 kg. Indique a massa do seu carro (F.2) para saber.',
      dependsB96:
        'Com o código 96, carro e atrelado juntos não podem ultrapassar 4250 kg. Indique a massa do seu carro (F.2) para saber.',
      required: 'Carta necessária: {licence}',
      requiredDepends: 'Carta necessária: B, B96 ou BE, conforme o seu carro',
      towLimit: 'Com a carga máxima, este atrelado ultrapassa o que o seu carro pode rebocar ({limite} kg).',
    },
    licenceShort: { B: 'B', B96: 'B com código 96', BE: 'BE' },
    price: '{day} por dia, {weekend} por fim de semana',
    priceMissing: '[FEHLT — Preis pro Tag und Wochenende]',
    request: 'Pedir este atrelado',
    requestVan: 'Pedir esta carrinha',
    seeAll: 'Ver toda a frota',
    finePrint:
      'Indicação baseada nas regras da carta de condução no Luxemburgo (transports.public.lu). Em caso de dúvida, pergunte-nos antes de partir.',
    sourceLink: 'Regras da carta de condução em transports.public.lu',
    empty: 'A lista dos nossos atrelados estará disponível em breve. Ligue para o +352 81 05 41.',
    noJsRules:
      'Com a carta B, pode rebocar um atrelado até 750 kg de massa máxima autorizada, ou um atrelado mais pesado se carro e atrelado juntos não ultrapassarem 3500 kg. Com o código 96, o conjunto pode ir até 4250 kg. Acima disso, é necessária a carta BE.',
  },

  fleetTable: {
    h2: 'Toda a nossa frota',
    caption: 'Os nossos atrelados e carrinhas de aluguer',
    kind: 'Tipo',
    payload: 'Carga útil',
    mma: 'Massa máxima autorizada',
    surface: 'Superfície',
    licence: 'Carta necessária',
    day: 'Preço por dia',
    weekend: 'Preço por fim de semana',
    licenceDepends: 'conforme o carro',
  },

  categories: {
    'porte-voiture': 'Atrelado porta-carros',
    'porte-moto': 'Atrelado porta-motos',
    benne: 'Atrelado basculante',
    frigorifique: 'Atrelado frigorífico',
    plateau: 'Atrelado de plataforma',
    fourgon: 'Atrelado fechado',
    camionnette: 'Carrinha',
    voiture: 'Carro',
  },

  cars: {
    homeH2: 'Os nossos carros em stock',
    h1: 'Carros novos e usados',
    lead: 'Todos os carros em stock na Garage Um Rond Point, na rotunda de Erpeldange. Ligue ou escreva-nos pelo WhatsApp antes de vir, para um test drive por marcação.',
    seeAll: { one: 'Ver o carro', other: 'Ver os {n} carros' },
    year: 'Ano',
    km: 'Quilómetros',
    fuel: 'Combustível',
    tagFresh: 'Novidade',
    tagNew: 'Novo',
    price: 'Preço',
    noPhoto: 'Foto em breve',
    empty: 'De momento não há carros em stock. Ligue para o +352 81 05 41.',
    filter: {
      summary: 'Filtrar ({n})',
      legend: 'Filtrar carros',
      make: 'Marca',
      fuel: 'Combustível',
      gearbox: 'Caixa',
      maxPrice: 'Preço máximo',
      condition: 'Estado',
      sort: 'Ordenar',
      all: 'Todas',
      any: 'Qualquer',
      conditionNew: 'Novo',
      conditionUsed: 'Usado',
      sortRecent: 'mais recentes',
      sortPriceAsc: 'preço crescente',
      sortPriceDesc: 'preço decrescente',
      sortKmAsc: 'quilometragem crescente',
      count: { one: '{n} carro', other: '{n} carros' },
      empty: 'Nenhum carro corresponde aos filtros.',
      reset: 'Repor filtros',
      apply: 'Ver resultados',
      upTo: 'até {price}',
    },
  },

  enums: {
    fuel: {
      petrol: 'Gasolina',
      diesel: 'Diesel',
      hybrid: 'Híbrido',
      plugin_hybrid: 'Híbrido plug-in',
      electric: 'Elétrico',
      lpg: 'GPL',
      other: 'Outro',
    },
    transmission: { automatic: 'Automática', manual: 'Manual', other: 'Outra' },
    body: {
      estate: 'Carrinha',
      saloon: 'Sedan',
      suv: 'SUV / TT',
      city: 'Citadino',
      coupe: 'Coupé',
      convertible: 'Descapotável',
      mpv: 'Monovolume',
      van: 'Comercial',
      pickup: 'Pick-up',
      other: 'Outro',
    },
    condition: { new: 'Novo', used: 'Usado' },
    /** Farben aus den Inseraten (französisch) → Anzeige; unbekannte bleiben im Original */
    colors: {
      noir: 'Preto',
      blanc: 'Branco',
      gris: 'Cinzento',
      argent: 'Prateado',
      bleu: 'Azul',
      rouge: 'Vermelho',
      vert: 'Verde',
      jaune: 'Amarelo',
      orange: 'Laranja',
      marron: 'Castanho',
      brun: 'Castanho',
      beige: 'Bege',
      bordeaux: 'Bordô',
      violet: 'Roxo',
      or: 'Dourado',
      anthracite: 'Antracite',
    },
  },

  car: {
    specsH2: 'Características',
    firstReg: 'Primeira matrícula',
    mileage: 'Quilometragem',
    fuel: 'Combustível',
    gearbox: 'Caixa',
    power: 'Potência',
    powerUnit: 'cv',
    displacement: 'Cilindrada',
    body: 'Carroçaria',
    seats: 'Lugares',
    colorExt: 'Cor exterior',
    colorInt: 'Cor interior',
    euro: 'Norma Euro',
    wltp: 'Consumo e CO₂ (WLTP)',
    wltpMissing: 'informações na garagem',
    ref: 'Ref.',
    notSpecified: 'não indicado',
    condition: 'Estado',
    vatRecoverable: 'IVA dedutível',
    equipmentH2: 'Equipamento',
    equipmentMore: 'Ver os {n} equipamentos',
    descriptionH2: 'Descrição',
    originalNote: 'Descrição original em francês',
    originalListNote: 'Lista original em francês',
    contactH2: 'Tem interesse neste carro?',
    contactText: 'Ligue, escreva-nos pelo WhatsApp ou envie-nos o seu pedido.',
    whatsappText: 'Olá, o {make} {model} (ref. {id}) ainda está disponível?',
    similarH2: 'Carros semelhantes',
    sodablast: 'Para um carro antigo, também fazemos decapagem com bicarbonato (sodablast).',
    sold: 'Este carro foi vendido ou já não está em stock.',
    backToList: 'Ver todos os nossos carros',
    gallery: {
      label: 'Fotos do {make} {model}',
      counter: '{i} / {n}',
      prev: 'Foto anterior',
      next: 'Foto seguinte',
      open: 'Ver as fotos em tamanho grande',
      close: 'Fechar',
      thumbs: 'Miniaturas',
      thumb: 'Foto {i}',
      alt: '{make} {model} {version}, foto {i} de {n}',
    },
  },

  photos: {
    heroWorkshop: 'Carro preto numa oficina moderna e iluminada',
    workshop: 'Mecânico a trabalhar no compartimento do motor de um carro',
    sodablast: 'Carro clássico enferrujado, com a pintura a descascar',
    bodywork: 'Carro desportivo vermelho num elevador de oficina',
    garden: 'Corta-relva a gasolina sobre a relva',
    gardenPage: 'Cortar a relva ao sol',
    paint: 'Pintura de uma carroçaria à pistola',
    rental: 'Pick-up branca carregada numa plataforma',
    trailersSale: 'Atrelado basculante com taipais em rede',
    fleetAlt: 'Foto: {name}',
    creditsH2: 'Fotos ilustrativas',
    credits: 'Fotos ilustrativas com licença livre:',
  },
  services: {
    h2: 'Os nossos outros serviços',
    workshop: {
      h3: 'Oficina',
      text: 'Manutenção, diagnóstico e reparação do seu carro ou carrinha. Em carroçaria, reparamos e voltamos a pintar o seu veículo depois de uma pequena colisão.',
      link: 'Mecânica e carroçaria',
    },
    sodablast: {
      h3: 'Sodablast',
      text: 'O sodablast projeta bicarbonato de sódio para remover tinta, gordura e sujidade. Esta decapagem suave não danifica superfícies delicadas: carroçarias antigas, jantes, peças mecânicas.',
      link: 'A decapagem com bicarbonato (sodablast)',
    },
    garden: {
      h3: 'Jardim e floresta',
      text: 'Vendemos e reparamos máquinas de jardim e floresta, sobretudo das marcas Honda e Stihl.',
      link: 'Máquinas de jardim e floresta',
    },
    trailers: {
      h3: 'Atrelados à venda',
      text: 'Vendemos atrelados Saris, Humbaur e WM Meyer, para particulares e profissionais. Ajudamos a escolher um atrelado que o seu carro possa rebocar e que a sua carta de condução permita.',
      link: 'Os nossos atrelados à venda',
    },
    photoMissing: '[FEHLT — Foto]',
  },

  reviews: {
    h2: 'Avaliações no Google',
    link: 'Ler todas as avaliações no Google',
    missing: '[FEHLT — 2–3 vom Kunden freigegebene Zitate aus dem Google-Profil, mit Vorname + Initiale und Monat/Jahr]',
  },

  faq: {
    h2: 'Perguntas frequentes',
    rentalH2: 'Perguntas sobre o aluguer',
    items: {
      permis: {
        q: 'Que carta de condução é necessária para rebocar um atrelado?',
        a: 'Com a carta B, pode rebocar um atrelado até 750 kg de massa máxima autorizada. Um atrelado mais pesado é permitido se o carro e o atrelado juntos não ultrapassarem 3500 kg. Com o código 96 na sua carta B, o conjunto pode ir até 4250 kg. Acima disso, é necessária a carta BE, que permite um atrelado até 3500 kg.',
      },
      carte: {
        q: 'Onde posso ver o que o meu carro pode rebocar?',
        a: 'No certificado de matrícula: o campo O.1 indica a massa rebocável com travão e o campo O.2 sem travão. A massa máxima autorizada do seu carro consta do campo F.2.',
      },
      prix: {
        q: 'Quanto custa alugar um atrelado?',
        a: 'O preço por dia e por fim de semana está indicado para cada atrelado no nosso guia. [FEHLT — Preise der Flotte]',
      },
      louer: {
        q: 'O que é preciso para alugar?',
        a: '[FEHLT — Mietbedingungen: Ausweis, Führerschein, Kaution, Stecker 7- oder 13-polig]',
      },
      reserver: {
        q: 'É preciso reservar com antecedência?',
        a: '[FEHLT — Reservierung, Abhol- und Rückgabezeiten]',
      },
      dispo: {
        q: 'Os carros da lista ainda estão disponíveis?',
        a: 'Atualizamos a lista todas as manhãs. Um carro vendido durante o dia pode continuar a aparecer até ao dia seguinte. Ligue ou escreva-nos pelo WhatsApp antes de vir.',
      },
      marques: {
        q: 'Reparam todas as marcas?',
        a: 'Sim, a nossa oficina faz a manutenção e a reparação de carros e carrinhas de todas as marcas. [UNBESTÄTIGT — Werden alle Marken repariert?]',
      },
      depot: {
        q: 'Podem vender o meu carro por mim?',
        a: 'Sim, em venda à consignação: pomos o seu carro à venda e fazemos o contacto com os compradores. Fale connosco sobre as condições na garagem ou por telefone.',
      },
      langues: {
        q: 'Que línguas falam?',
        a: 'Luxemburguês, francês, alemão, inglês e português.',
      },
      paiement: {
        q: 'Como posso pagar?',
        a: 'Em numerário, com cartão Visa, Mastercard ou V PAY, com Payconiq, Apple Pay ou PayPal, ou por transferência bancária. [UNBESTÄTIGT — Zahlungsmittel]',
      },
    },
  },

  access: {
    h2: 'Onde estamos',
    address: 'Morada',
    landmark: 'Na rotunda, ao lado do posto de abastecimento Aral, entre Ettelbruck e Diekirch.',
    hoursH3: 'Horário de funcionamento',
    languagesH3: 'Línguas',
    languages: 'Falamos luxemburguês, francês, alemão, inglês e português.',
    mapLink: 'Itinerário no Google Maps',
    external: '(site externo)',
    mapTitle: 'A rotunda de Erpeldange',
    osm: '© contribuidores do OpenStreetMap',
    osmLabel: 'Dados do mapa',
    labels: {
      garage: 'Garage Um Rond Point',
      aral: 'Aral',
      ettelbruck: 'Ettelbruck',
      diekirch: 'Diekirch',
      erpeldange: 'Erpeldange',
      rail: 'Via férrea',
      sure: 'Sûre',
    },
  },

  hours: {
    caption: 'Horário de funcionamento da Garage Um Rond Point',
    day: 'Dia',
    time: 'Horário',
    days: {
      mo: 'Segunda-feira',
      tu: 'Terça-feira',
      we: 'Quarta-feira',
      th: 'Quinta-feira',
      fr: 'Sexta-feira',
      sa: 'Sábado',
      su: 'Domingo',
    },
    closed: 'Fechado',
    today: 'hoje',
    and: 'e',
    holidays: 'Feriados: [UNBESTÄTIGT — Feiertage vermutlich geschlossen]',
    short: 'De segunda a sexta {weekday}, sábado {saturday}',
  },

  footer: {
    hoursH: 'Horário de funcionamento',
    followH: 'Siga-nos',
    portals: 'Os nossos anúncios também em {luxauto} e {autoscout}',
    legal: 'Informação legal',
    privacy: 'Proteção de dados',
    tiktokMissing: 'TikTok [UNBESTÄTIGT — genaue URL]',
  },

  depot: {
    h2: 'Quer vender o seu carro?',
    text: 'Com o nosso serviço de venda à consignação, pomos o seu carro à venda e fazemos o contacto com os compradores. Fale-nos do seu carro e explicamos as condições.',
    missing: '[FEHLT — Konditionen Kommissionsverkauf]',
    link: 'Propor o meu carro',
  },

  pages: {
    rental: {
      h1: 'Aluguer de atrelados e carrinhas em Erpeldange',
      lead: 'Atrelados porta-carros e porta-motos, atrelados basculantes, atrelados frigoríficos para as suas festas, carrinhas. Por dia ou para o fim de semana.',
      durationsMissing: '[UNBESTÄTIGT — Mietdauern Tag / Wochenende]',
      conditionsH2: 'Condições de aluguer',
      conditionsMissing:
        '[FEHLT — Mietbedingungen: Ausweis, Führerschein, Kaution, Abhol- und Rückgabezeiten, Reservierung]',
      formH2: 'Pedido de aluguer',
      formIntro: 'Escolha o atrelado e as datas. Ligamos-lhe de volta para confirmar.',
    },
    category: {
      h1: {
        'porte-voiture': 'Alugar um atrelado porta-carros em Erpeldange',
        'porte-moto': 'Alugar um atrelado porta-motos em Erpeldange',
        benne: 'Alugar um atrelado basculante em Erpeldange',
        frigorifique: 'Alugar um atrelado frigorífico em Erpeldange',
        camionnette: 'Alugar uma carrinha em Erpeldange',
      },
      intro: {
        'porte-voiture':
          'O atrelado porta-carros serve para transportar um carro avariado, um carro clássico ou um carro que acabou de comprar. Antes de partir, confirme que o seu carro pode rebocar o conjunto e que a sua carta é suficiente.',
        'porte-moto':
          'O atrelado porta-motos serve para levar uma mota, uma scooter ou uma moto-quatro à oficina, de férias ou a um circuito. Pode ser rebocado por um carro comum.',
        benne:
          'O atrelado basculante serve para transportar terra, entulho, areia ou restos de jardim, e descarrega-se por basculamento. Para uma obra, para o jardim ou para uma ida ao ecocentro.',
        frigorifique:
          'O atrelado frigorífico mantém bebidas e comida frescas durante uma festa, um casamento ou um festival. Fica estacionado no local durante todo o evento.',
        camionnette:
          'A carrinha serve para uma mudança de casa ou para transportar móveis ou material. Até 3500 kg de massa máxima autorizada, pode ser conduzida com a carta B.',
      },
      vehiclesH2: 'Os nossos veículos',
      licenceH2: 'Que carta de condução?',
      backToFinder: 'Comparar com todos os nossos atrelados',
    },
    workshop: {
      h1: 'Mecânica e carroçaria em Erpeldange',
      lead: 'Manutenção, diagnóstico e reparação do seu carro ou carrinha. Em carroçaria, reparamos e voltamos a pintar o seu veículo depois de uma pequena colisão.',
      whatH2: 'O que faz a nossa oficina',
      items: {
        entretien: 'Manutenção e revisão',
        diagnostic: 'Diagnóstico de avarias',
        reparation: 'Reparação mecânica',
        carrosserie: 'Carroçaria e pintura',
      },
      extraMissing:
        '[UNBESTÄTIGT — weitere Leistungen laut Editus: Richtbank, Smart Repair, Ausbeulen, Turbo, 4x4, Restaurierung alter Autos; erst nach Bestätigung zeigen]',
      transparency: 'Antes de cada trabalho, explicamos o que vamos fazer. Recebe uma fatura detalhada.',
      transparencyMissing: '[UNBESTÄTIGT — Kostenvoranschlag vorher, detaillierte Rechnung?]',
      formH2: 'Pedir marcação',
      formIntro: 'Indique de que veículo se trata e o que é preciso fazer. Ligamos-lhe de volta para combinar a marcação.',
    },
    sodablast: {
      h1: 'Decapagem com bicarbonato (sodablast) em Erpeldange',
      lead: 'O sodablast projeta bicarbonato de sódio para remover tinta, gordura e sujidade. Esta decapagem suave não danifica superfícies delicadas: carroçarias antigas, jantes, peças mecânicas.',
      whatH2: 'Para quê?',
      items: {
        carrosserie: 'Carroçarias antigas, antes de um restauro',
        jantes: 'Jantes',
        pieces: 'Peças mecânicas',
      },
      photosH2: 'Antes e depois',
      photosMissing: '[FEHLT — Vorher-nachher-Fotos Sodablast]',
      whatsapp: 'Envie-nos fotos pelo WhatsApp para uma primeira avaliação.',
      whatsappText: 'Olá, envio fotos para uma primeira avaliação de uma decapagem com bicarbonato (sodablast).',
      whatsappLink: 'Enviar fotos pelo WhatsApp',
      formH2: 'Pedir marcação',
    },
    trailersForSale: {
      h1: 'Atrelados à venda em Erpeldange',
      lead: 'Vendemos atrelados Saris, Humbaur e WM Meyer, para particulares e profissionais.',
      dealerMissing: '[UNBESTÄTIGT — Händlerstatus Saris, Humbaur, WM Meyer; Logos nur mit Freigabe]',
      adviceH2: 'Que carta para que atrelado?',
      advice:
        'Ajudamos a escolher um atrelado que o seu carro possa rebocar e que a sua carta de condução permita: tamanho, massa máxima autorizada, travões. O nosso guia de aluguer mostra as regras da carta de condução com exemplos.',
      adviceLink: 'Que carta para que atrelado?',
      stockH2: 'Atrelados em stock',
      stockMissing: '[FEHLT — Anhänger auf Lager]',
      formH2: 'Tem uma pergunta sobre um atrelado?',
    },
    garden: {
      h1: 'Máquinas de jardim e floresta em Erpeldange',
      lead: 'Vendemos e reparamos máquinas de jardim e floresta, sobretudo das marcas Honda e Stihl.',
      dealerMissing: '[UNBESTÄTIGT — Händlerstatus Honda und Stihl; Logos nur mit Freigabe]',
      whatH2: 'Venda e reparação',
      text: 'Corta-relva, roçadora, motosserra ou corta-sebes: traga a sua máquina à oficina ou peça-nos conselho para escolher uma nova.',
      formH2: 'Pedir reparação',
    },
    contact: {
      h1: 'Contacto e localização',
      lead: 'Garage Um Rond Point, 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre. Na rotunda, ao lado do posto de abastecimento Aral. Telefone +352 81 05 41, WhatsApp +352 621 373 272, info@rondpoint.lu. Falamos luxemburguês, francês, alemão, inglês e português.',
      waysH2: 'Como nos contactar',
      phone: 'Telefone',
      whatsapp: 'WhatsApp',
      email: 'E-mail',
      paymentH2: 'Pagamento',
      payment: 'Em numerário, com cartão Visa, Mastercard ou V PAY, com Payconiq, Apple Pay ou PayPal, ou por transferência bancária.',
      paymentMissing: '[UNBESTÄTIGT — Zahlungsmittel]',
      formH2: 'Escreva-nos',
    },
    thanks: {
      h1: 'O seu pedido foi recebido',
      text: 'Respondemos [FEHLT — Antwortzeit, z. B. « le jour ouvrable suivant »]. É urgente? Ligue para o +352 81 05 41.',
      back: 'Voltar à página inicial',
    },
    notFound: {
      h1: 'Página não encontrada',
      text: 'Esta página não existe ou já foi removida. Quando um carro é vendido, sai da nossa lista.',
    },
  },

  forms: {
    optional: 'opcional',
    name: 'Nome',
    phone: 'Telefone',
    phoneHint: 'Ligamos-lhe de volta.',
    email: 'E-mail',
    message: 'Mensagem',
    consent: 'Aceito que a Garage Um Rond Point utilize os meus dados para responder ao meu pedido. Mais informações na {link}.',
    consentLink: 'política de proteção de dados',
    honeypot: 'Não preencha este campo',
    choose: 'Escolha…',
    sending: 'A enviar…',
    successH: 'O seu pedido foi recebido.',
    successText: 'Respondemos o mais rapidamente possível. É urgente? Ligue para o +352 81 05 41.',
    errorSummary: 'Verifique os campos assinalados.',
    errorSend: 'O envio não funcionou. Tente novamente ou ligue para o +352 81 05 41.',
    errorRate: 'Já enviou muitos pedidos hoje. Ligue para o +352 81 05 41.',
    fallbackH: 'Último passo: envie o seu pedido',
    fallbackText: 'Escolha como nos quer enviar o pedido. A mensagem já está escrita, só precisa de a enviar.',
    fallbackWhatsapp: 'Enviar pelo WhatsApp',
    fallbackMail: 'Enviar por e-mail',
    fallbackEdit: 'Alterar o pedido',
    fallbackSubject: 'Pedido através do site',
    fallbackIntro: 'Olá, aqui está o meu pedido:',
    errors: {
      name: 'Indique o seu nome.',
      phone: 'Indique um número de telefone para podermos ligar-lhe de volta.',
      phoneInvalid: 'Este número parece incompleto. Indique-o com o indicativo, por exemplo +352 621 123 456.',
      email: 'Este endereço de e-mail não é válido. Tem de conter um @, por exemplo nome@exemplo.lu.',
      consent: 'Assinale a caixa para podermos usar os seus dados para lhe responder.',
      vehicle: 'Escolha um atrelado ou um veículo.',
      from: 'Indique a data de início.',
      to: 'Indique a data de fim.',
      toBeforeFrom: 'A data «Até» não pode ser anterior à data «De».',
      past: 'Escolha uma data a partir de hoje.',
      wish: 'Escolha o que pretende.',
      reason: 'Escolha o motivo da visita.',
      machine: 'Indique o veículo ou a máquina.',
      work: 'Descreva o que é preciso fazer.',
      subject: 'Escolha um assunto.',
      message: 'Escreva a sua mensagem.',
    },
    rental: {
      vehicle: 'Atrelado ou veículo pretendido',
      from: 'De',
      to: 'Até',
      licence: 'A sua carta de condução',
      licenceNone: 'Não indicada',
      licenceB: 'B',
      licenceB96: 'B + código 96',
      licenceBE: 'BE',
      submit: 'Enviar pedido de aluguer',
      noFleet: 'Indique na mensagem o que pretende alugar.',
      other: 'Outro, indicado na mensagem',
    },
    car: {
      carLabel: 'Carro',
      wish: 'Pretende',
      wishTest: 'Um test drive',
      wishInfo: 'Mais informações',
      wishTradeIn: 'Dar o meu carro para retoma',
      tradeInH: 'Só para retoma',
      tradeMake: 'Marca e modelo',
      tradeYear: 'Ano',
      tradeKm: 'Quilometragem',
      title: 'Pedir informações',
      submit: 'Enviar o meu pedido',
    },
    workshop: {
      reason: 'Motivo da visita',
      reasonMaintenance: 'Manutenção',
      reasonRepair: 'Avaria ou reparação',
      reasonBody: 'Carroçaria',
      reasonSodablast: 'Sodablast',
      reasonGarden: 'Máquina de jardim ou floresta',
      machine: 'Veículo ou máquina',
      machineHint: 'Marca, modelo e ano, por exemplo: VW Golf 2018.',
      work: 'O que é preciso fazer?',
      date: 'Data pretendida',
      photos: 'Para carroçaria ou sodablast, envie-nos fotos pelo WhatsApp: +352 621 373 272.',
      submit: 'Pedir marcação',
    },
    contact: {
      subject: 'Assunto',
      subjectQuestion: 'Pergunta geral',
      subjectTrailer: 'Compra de atrelado',
      subjectDepot: 'Venda à consignação',
      subjectOther: 'Outro',
      submit: 'Enviar mensagem',
    },
  },

  seo: {
    home: {
      title: 'Garage Um Rond Point Erpeldange – atrelados, carros, oficina',
      description:
        'Na rotunda de Erpeldange, entre Ettelbruck e Diekirch: aluguer de atrelados e carrinhas, carros novos e usados, oficina automóvel, mecânica e carroçaria.',
    },
    rental: {
      title: 'Aluguer de atrelados no Luxemburgo | Erpeldange, Ettelbruck',
      description:
        'Alugar atrelado perto de Ettelbruck: porta-carros, porta-motos, basculante, frigorífico ou carrinha. Veja que atrelado serve, o preço e se a sua carta basta.',
    },
    category: {
      title: {
        'porte-voiture': 'Alugar atrelado porta-carros em Erpeldange | Um Rond Point',
        'porte-moto': 'Alugar atrelado porta-motos em Erpeldange | Um Rond Point',
        benne: 'Alugar atrelado basculante em Erpeldange | Um Rond Point',
        frigorifique: 'Aluguer atrelado frigorífico Erpeldange | Um Rond Point',
        camionnette: 'Aluguer de carrinha em Erpeldange, perto de Ettelbruck',
      },
      description: {
        'porte-voiture':
          'Alugue um atrelado porta-carros na rotunda de Erpeldange, perto de Ettelbruck: dimensões, carga útil, preço e carta de condução necessária para cada atrelado.',
        'porte-moto':
          'Alugue um atrelado porta-motos na rotunda de Erpeldange, perto de Ettelbruck: dimensões, carga útil, preço e carta de condução necessária para cada atrelado.',
        benne:
          'Alugue um atrelado basculante para terra, entulho ou restos de jardim na rotunda de Erpeldange, perto de Ettelbruck: carga útil, preço e carta necessária.',
        frigorifique:
          'Alugue um atrelado frigorífico para a sua festa ou festival na rotunda de Erpeldange, perto de Ettelbruck: volume, temperatura, preço e carta necessária.',
        camionnette:
          'Alugue uma carrinha para mudanças ou transporte de material na rotunda de Erpeldange, perto de Ettelbruck. Até 3500 kg, basta a carta B. Veja o preço por dia.',
      },
    },
    cars: {
      title: 'Carros novos e usados em Erpeldange | Garage Um Rond Point',
      description:
        'Carros usados no Luxemburgo: stock da Garage Um Rond Point em Erpeldange, com preço, quilómetros e fotos. Atualizado todas as manhãs. Test drive por marcação.',
    },
    car: {
      suffixLong: ' | Garage Um Rond Point',
      suffixShort: ' | Um Rond Point',
      place: ' em Erpeldange',
      descTail: 'Para ver na Garage Um Rond Point em Erpeldange.',
      descExtra: [' Test drive por marcação.', ' Entre Ettelbruck e Diekirch.', ' Ligue +352 81 05 41.'],
      descGearbox: 'caixa {gearbox}',
      soldTitle: '{make} {model} vendido | Garage Um Rond Point, Erpeldange',
      soldDescription:
        'Este {make} {model} foi vendido ou já não está em stock. Veja os outros carros novos e usados da Garage Um Rond Point em Erpeldange.',
    },
    workshop: {
      title: 'Oficina automóvel em Erpeldange | Garage Um Rond Point',
      description:
        'Oficina automóvel perto de Ettelbruck e Diekirch: manutenção, diagnóstico, reparação, carroçaria e pintura na rotunda de Erpeldange. Peça marcação online.',
    },
    sodablast: {
      title: 'Decapagem com bicarbonato (sodablast) no Luxemburgo',
      description:
        'O sodablast remove tinta, gordura e sujidade sem danificar a superfície: carro antigo, jantes, peças mecânicas. Em Erpeldange, entre Ettelbruck e Diekirch.',
    },
    trailersForSale: {
      title: 'Atrelados à venda: Humbaur, Saris, WM Meyer | Erpeldange',
      description:
        'Compre o seu atrelado em Erpeldange: Humbaur, Saris ou WM Meyer. Ajudamos a escolher o tamanho e o peso adequados ao seu carro e à sua carta de condução.',
    },
    garden: {
      title: 'Máquinas de jardim e floresta Honda e Stihl em Erpeldange',
      description:
        'Venda e reparação de máquinas de jardim e floresta, sobretudo das marcas Honda e Stihl, na Garage Um Rond Point em Erpeldange, entre Ettelbruck e Diekirch.',
    },
    contact: {
      title: 'Contacto e localização | Garage Um Rond Point, Erpeldange',
      description:
        '1, rue du Viaduc em Erpeldange-sur-Sûre, na rotunda, ao lado do posto Aral. De segunda a sexta 7h45–12h e 13h–18h, sábado 8h–12h. Telefone +352 81 05 41.',
    },
    thanks: {
      title: 'Pedido enviado | Garage Um Rond Point, Erpeldange-sur-Sûre',
      description:
        'O seu pedido foi recebido pela Garage Um Rond Point em Erpeldange. Respondemos rapidamente. É urgente? Ligue para o +352 81 05 41. Obrigado pelo seu contacto.',
    },
    legal: {
      title: 'Informação legal | Garage Um Rond Point, Erpeldange-sur-Sûre',
      description:
        'Informação legal da Garage Um Rond Point S.à r.l., 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre: editor, RCS B296148, IVA LU36559673, alojamento do site.',
    },
    privacy: {
      title: 'Proteção de dados | Garage Um Rond Point, Erpeldange',
      description:
        'Que dados a Garage Um Rond Point trata quando nos escreve, porquê, durante quanto tempo e quais são os seus direitos. Sem cookies, sem ferramentas de rastreio.',
    },
  },

  legal: {
    h1: 'Informação legal',
    publisherH2: 'Editor do site',
    company: 'Denominação social',
    legalForm: 'Forma jurídica',
    address: 'Sede',
    phone: 'Telefone',
    email: 'E-mail',
    rcs: 'Registo comercial',
    vat: 'Número de IVA',
    registered: 'Data de registo',
    manager: 'Gerente',
    permit: 'Autorização de estabelecimento',
    capital: 'Capital social',
    managerMissing: '[UNBESTÄTIGT — Gérant David Moreira laut Editus]',
    permitMissing: '[FEHLT — Nummer der Gewerbegenehmigung]',
    capitalMissing: '[FEHLT — Gesellschaftskapital]',
    hostingH2: 'Alojamento',
    hosting:
      'O site está alojado no GitHub Pages, um serviço da GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, Estados Unidos.',
    contentH2: 'Conteúdo',
    content:
      'Os anúncios de carros reproduzem os nossos próprios anúncios publicados no LuxAuto e no AutoScout24. Os preços e as características podem mudar; só a oferta confirmada na garagem é vinculativa.',
    photosH2: 'Fotos e planta',
    photos: 'Planta da rotunda desenhada a partir dos dados do OpenStreetMap (© contribuidores do OpenStreetMap, licença ODbL). Fotos dos carros: os nossos próprios anúncios.',
    fontH2: 'Tipo de letra',
    font: 'Archivo, Omnibus-Type, SIL Open Font License 1.1.',
  },

  privacy: {
    h1: 'Proteção de dados',
    intro:
      'Tratamos os seus dados apenas para responder aos seus pedidos. Este site não instala cookies e não utiliza ferramentas de rastreio nem de publicidade.',
    controllerH2: 'Responsável pelo tratamento',
    controller: 'GARAGE UM ROND POINT S.à r.l., 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre, Luxemburgo. Telefone +352 81 05 41, info@rondpoint.lu.',
    formsH2: 'Formulários de pedido',
    forms:
      'Quando envia um formulário, recebemos os dados que introduz: nome, telefone, e-mail se o indicar, a sua mensagem e os pormenores do seu pedido (por exemplo, datas de aluguer, veículo, marcação pretendida). Utilizamos esses dados para lhe responder e preparar uma proposta ou uma marcação.',
    legalBasis:
      'Fundamento jurídico: o seu consentimento (artigo 6.º, n.º 1, alínea a), do RGPD), que dá ao assinalar a caixa, e as diligências pré-contratuais a seu pedido (artigo 6.º, n.º 1, alínea b), do RGPD). Pode retirar o seu consentimento a qualquer momento por e-mail ou por telefone.',
    storage:
      'O seu pedido é guardado numa base de dados da Supabase (região União Europeia) e é-nos transmitido por e-mail através de [UNBESTÄTIGT — EU-Mailanbieter, mit Nave klären]. Os pedidos são apagados automaticamente após 90 dias [UNBESTÄTIGT — Frist mit Kunde bestätigen]. As comunicações que levem à celebração de um contrato são conservadas de acordo com as obrigações contabilísticas.',
    abuse:
      'Para limitar abusos, registamos durante 24 horas um resumo criptográfico (hash) do seu endereço IP. Esse valor não permite descobrir o seu endereço.',
    hostingH2: 'Alojamento e registos do servidor',
    hosting:
      'O site está alojado no GitHub Pages (GitHub, Inc., Estados Unidos). Em cada visita, a GitHub trata o seu endereço IP e dados técnicos para entregar as páginas e garantir a segurança. A GitHub está certificada ao abrigo do Quadro de Privacidade de Dados UE-EUA (EU-US Data Privacy Framework). Fundamento jurídico: o nosso interesse legítimo em ter um site seguro e disponível (artigo 6.º, n.º 1, alínea f), do RGPD).',
    linksH2: 'Ligações para outros serviços',
    links:
      'O site não carrega conteúdos externos: tipos de letra, fotos e planta estão alojados com o site. As ligações para Google Maps, WhatsApp, Facebook, Instagram, TikTok, LuxAuto e AutoScout24 só se abrem se clicar nelas. Esses serviços tratam então os seus dados segundo as suas próprias regras. O WhatsApp pertence à Meta Platforms; se nos escrever pelo WhatsApp, a Meta trata o seu número e as suas mensagens.',
    rightsH2: 'Os seus direitos',
    rights:
      'Pode pedir o acesso aos seus dados, a sua retificação, o seu apagamento, a limitação do tratamento e a portabilidade, e opor-se ao tratamento. Escreva-nos para info@rondpoint.lu. Pode também apresentar uma reclamação à Comissão Nacional para a Proteção de Dados (CNPD), 15, boulevard du Jazz, L-4370 Belvaux, cnpd.public.lu.',
    updated: 'Última atualização: {date}',
  },
  /** Leiste im Startbildschirm: alle Leistungen auf einen Blick (Titel aus nav.*) */
  offer: {
    label: 'Os nossos serviços num relance',
    sub: {
      rental: 'Atrelados e carrinhas',
      cars: 'Stock atualizado todas as manhãs',
      workshop: 'Mecânica e chaparia',
      trailers: 'Saris, Humbaur, WM Meyer',
      garden: 'Honda e Stihl',
      sodablast: 'Decapagem suave',
    },
  },
  /** Kurzes „Über uns“ auf der Startseite (nur bestätigte Angaben: Lage, Leistungen, Sprachen, Öffnungstage) */
  about: {
    h2: 'Quem somos',
    text: 'A Garage Um Rond Point é a sua garagem na rotunda de Erpeldange, entre Ettelbruck e Diekirch. Aluguer de atrelados e carrinhas, venda de carros e atrelados, oficina e máquinas de jardim: tudo no mesmo endereço. Passe por cá – falamos a sua língua.',
    link: 'Como chegar',
    photoAlt: 'Mecânico a entregar uma chave de carro',
  },
  /** Startseite: Stichpunkte; Unterseiten: ausführliche Erklärungen */
  details: {
    points: {
      workshop: [
        'Manutenção e revisão',
        'Diagnóstico de avarias',
        'Reparação mecânica',
        'Chaparia e pintura',
      ],
      sodablast: [
        'Decapagem suave com bicarbonato de sódio',
        'Carroçarias antigas, jantes, peças mecânicas',
        'Primeira opinião por fotos no WhatsApp',
      ],
      garden: [
        'Venda de máquinas de jardim e floresta',
        'Reparação das suas máquinas',
        'Sobretudo Honda e Stihl',
      ],
      trailers: [
        'Atrelados Saris, Humbaur e WM Meyer',
        'Para particulares e profissionais',
        'Conselhos sobre peso e carta de condução',
      ],
    },
    workshop: {
      entretienH: 'Manutenção e revisão',
      entretien: 'Uma manutenção regular mantém o carro fiável e seguro: mudança de óleo, filtros, travões, níveis e verificação geral. Indique no pedido os quilómetros e a data da última revisão.',
      diagnosticH: 'Diagnóstico de avarias',
      diagnostic: 'Uma luz de aviso acende-se, um ruído estranho, o carro custa a pegar: descreva o que nota e desde quando. O diagnóstico encontra a causa antes da reparação.',
      reparationH: 'Reparação mecânica',
      reparation: 'Depois do diagnóstico, reparamos o seu carro ou a sua carrinha na nossa oficina, na rotunda de Erpeldange.',
      carrosserieH: 'Chaparia e pintura',
      carrosserie: 'Depois de um pequeno toque, reparamos a carroçaria e pintamos as peças danificadas. Envie-nos fotos dos danos pelo WhatsApp para uma primeira opinião.',
      processH2: 'Como marcar',
      process: [
        'Descreva o veículo e o que é preciso fazer – no formulário, por telefone ou pelo WhatsApp.',
        'Ligamos-lhe de volta para marcar a data.',
        'Traz o veículo à garagem, no 1, rue du Viaduc.',
      ],
    },
    sodablast: {
      explainH2: 'Como funciona o sodablast?',
      explain: 'O bicarbonato de sódio é projetado sobre a superfície com ar comprimido. É mais macio do que a areia e retira tinta, gordura e sujidade sem desgastar o metal. Por isso usa-se em peças delicadas e carroçarias antigas.',
      explain2: 'A decapagem deixa a superfície original à vista: vê o estado real do metal antes de uma reparação ou de uma nova pintura.',
      processH2: 'Como decorre uma decapagem',
      process: [
        'Envie-nos fotos do carro ou da peça pelo WhatsApp.',
        'Damos-lhe uma primeira opinião.',
        'Marcamos juntos uma data na garagem.',
      ],
    },
    garden: {
      saleH2: 'Venda',
      sale: 'Corta-relva, roçadora, motosserra ou corta-sebes: vendemos máquinas de jardim e floresta, sobretudo das marcas Honda e Stihl. Diga-nos o tamanho do terreno e o que quer fazer, e ajudamos na escolha.',
      repairH2: 'Reparação',
      repair: 'O corta-relva não pega, a motosserra corta mal, a roçadora perde força? Traga a máquina à oficina ou descreva o problema no formulário.',
    },
    trailers: {
      chooseH2: 'Escolher bem o atrelado',
      masseH: 'Massa máxima autorizada',
      masse: 'Define a carta de condução necessária. Até 750 kg, a carta B chega; acima disso, depende do seu carro.',
      freinH: 'Travões',
      frein: 'Um atrelado com mais de 750 kg de massa máxima autorizada tem de ter travões.',
      chargeH: 'Carga rebocável',
      charge: 'O seu carro não pode rebocar mais do que o valor do campo O.1 (atrelado com travões) ou O.2 (sem travões) do certificado de matrícula.',
      usageH: 'Tipo e dimensões',
      usage: 'Plataforma, basculante, porta-carros ou fechado: o atrelado certo depende do que transporta com mais frequência e de onde o vai guardar.',
    },
  },
  /** Ausführliche Seitentexte (SEO): Abschnitte und FAQ je Seite, siehe src/lib/content.ts */
  content: {
    workshop: {
      sections: {
        s1: {
          h: 'A sua garagem de proximidade entre Ettelbruck e Diekirch',
          p: [
            'A Garage Um Rond Point fica no {address}, mesmo na rotunda de Erpeldange, ao lado do posto Aral. Para quem vive em Erpeldange-sur-Sûre, Ettelbruck, Diekirch e em toda a Nordstad, a oficina fica a poucos minutos de casa.',
            'Falamos luxemburguês, francês, alemão, inglês e português. Assim, pode explicar-nos o problema do seu carro na língua em que se sente mais à vontade.',
          ],
        },
        s2: {
          h: 'Manutenção: porque deve seguir o plano do fabricante',
          p: [
            'Cada fabricante define um plano de manutenção, consoante os quilómetros percorridos ou o tempo decorrido desde a última revisão. Encontra-o no livro de revisões ou no ecrã do painel de instrumentos do seu carro.',
            'Cumprir estes prazos reduz o desgaste, evita avarias dispendiosas e ajuda a manter o valor do carro na revenda. Consoante o plano, uma manutenção inclui, por exemplo, a mudança de óleo, os filtros, a verificação dos travões e dos níveis, as luzes e as escovas do limpa-para-brisas.',
          ],
        },
        s3: {
          h: 'Sinais de que está na hora de vir à oficina',
          items: [
            'Uma luz de aviso continua acesa no painel de instrumentos.',
            'Os travões chiam, vibram ou puxam para um lado.',
            'O motor tem falta de potência ou custa a pegar.',
            'Um cheiro a queimado, uma fuga ou fumo fora do normal.',
            'Um ruído novo ao conduzir ou ao virar o volante.',
          ],
          p: [
            'Quanto mais cedo um problema for detetado, mais simples é a reparação. Descreva no formulário o que nota e desde quando: é a melhor base para o diagnóstico.',
          ],
        },
        s4: {
          h: 'Chaparia e pintura depois de um pequeno toque',
          p: [
            'Um risco, uma amolgadela ou um para-choques danificado: envie-nos fotos dos danos pelo WhatsApp, para o {whatsapp}. Recebe uma primeira opinião antes mesmo de vir. Depois, reparamos a carroçaria e voltamos a pintar as peças danificadas na nossa oficina.',
            'Se houver outro veículo envolvido, preencha a declaração amigável no local e tire as suas próprias fotos do acidente. Estes documentos são úteis para o seu seguro.',
          ],
        },
        s5: {
          h: 'Carros e carrinhas',
          p: [
            'A oficina trata de carros e carrinhas. Para um corta-relva, uma motosserra ou outra máquina, veja a nossa página [Jardim e floresta](page:garden). Para decapar uma carroçaria ou uma peça até ao metal nu, conheça a [decapagem com sodablast](page:sodablast).',
          ],
        },
      },
      faqH: 'Perguntas sobre a oficina',
      faq: {
        q1: {
          q: 'Como faço uma marcação na oficina?',
          a: 'Descreva o seu veículo e o que é preciso fazer no formulário desta página, por telefone, para o {phone}, ou pelo WhatsApp, para o {whatsapp}. Ligamos-lhe de volta para combinar a marcação.',
        },
        q2: {
          q: 'Quando é que a garagem está aberta?',
          a: '{hours}',
        },
        q3: {
          q: 'Posso enviar fotos antes de vir?',
          a: 'Sim. Para chaparia ou sodablast, envie-nos fotos pelo WhatsApp, para o {whatsapp}: recebe uma primeira opinião.',
        },
        q4: {
          q: 'Onde fica a oficina?',
          a: 'No {address}, na rotunda de Erpeldange, ao lado do posto Aral, entre Ettelbruck e Diekirch.',
        },
        q5: {
          q: 'Em que línguas posso explicar o problema?',
          a: 'Em luxemburguês, francês, alemão, inglês ou português.',
        },
      },
    },
    sodablast: {
      sections: {
        s1: {
          h: 'Sodablast ou jato de areia: qual é a diferença?',
          p: [
            'A decapagem clássica com jato de areia projeta um abrasivo duro, como areia ou corindo. Decapa depressa, mas também ataca o metal e pode aquecer e deformar as chapas finas.',
            'O bicarbonato de sódio é muito mais macio do que o metal. Remove tinta, gordura e sujidade sem desgastar a superfície e sem a aquecer. É por isso que o sodablast é indicado para peças delicadas e carroçarias antigas.',
          ],
        },
        s2: {
          h: 'Para que projetos?',
          items: [
            'Restauro de um carro antigo: decapar a carroçaria até ao metal nu antes da reparação e da pintura.',
            'Jantes: remover a tinta antiga e a sujidade incrustada antes de voltar a pintar.',
            'Peças mecânicas: limpar um cárter, um bloco ou uma cabeça do motor antes da verificação ou da remontagem.',
          ],
          p: [
            'Não sabe se a sua peça é adequada? Envie uma foto pelo WhatsApp, para o {whatsapp}, e nós dizemos-lhe.',
          ],
        },
        s3: {
          h: 'Depois da decapagem: proteger o metal',
          p: [
            'Uma superfície decapada é metal nu. Em contacto com o ar e a humidade, oxida depressa. Por isso, preveja o passo seguinte logo desde o início: primário, reparação ou pintura. Antes da pintura, os resíduos de bicarbonato retiram-se com água.',
            'No caso de um carro, a nossa oficina pode depois reparar a carroçaria e voltar a pintá-la: veja [mecânica e carroçaria](page:workshop).',
          ],
        },
        s4: {
          h: 'Sodablast no Luxemburgo, em Erpeldange',
          p: [
            'A nossa oficina fica na rotunda de Erpeldange-sur-Sûre, entre Ettelbruck e Diekirch, com acesso fácil a partir de todo o norte do Luxemburgo. Seja para uma peça ou para um carro completo, marcamos juntos uma data na garagem.',
          ],
        },
      },
      faqH: 'Perguntas sobre o sodablast',
      faq: {
        q1: {
          q: 'O sodablast danifica o metal?',
          a: 'Não. O bicarbonato de sódio é mais macio do que o metal: remove tinta, gordura e sujidade sem desgastar a superfície. É isso que o distingue da decapagem com jato de areia.',
        },
        q2: {
          q: 'Quanto custa uma decapagem com sodablast?',
          a: 'Depende do tamanho da peça e das camadas a remover. Envie fotos pelo WhatsApp, para o {whatsapp}: recebe uma primeira opinião.',
        },
        q3: {
          q: 'É preciso tratar a peça depois da decapagem?',
          a: 'Sim. O metal a nu tem de ser protegido rapidamente com primário ou tinta; caso contrário, oxida.',
        },
        q4: {
          q: 'É possível decapar jantes com sodablast?',
          a: 'Sim, as jantes fazem parte das peças que decapamos com sodablast, tal como as carroçarias antigas e as peças mecânicas.',
        },
      },
    },
    garden: {
      sections: {
        s1: {
          h: 'Máquinas de jardim e floresta na Nordstad',
          p: [
            'Para cuidar do seu jardim, do seu terreno ou da sua mata, encontra na Garage Um Rond Point máquinas sobretudo das marcas Honda e Stihl, e uma oficina para as reparar. A garagem fica na rotunda de Erpeldange, entre Ettelbruck e Diekirch.',
          ],
        },
        s2: {
          h: 'Escolher bem a sua máquina',
          items: [
            'Corta-relva: a área do relvado, a inclinação e os obstáculos determinam a largura de corte e o tipo de tração.',
            'Roçadora: para as bordas, os taludes e a erva alta onde o corta-relva não chega.',
            'Motosserra: o comprimento do sabre depende do diâmetro da madeira que corta com mais frequência.',
            'Corta-sebes: o comprimento da lâmina e o peso contam se cortar durante muito tempo ou em altura.',
          ],
          p: [
            'Motor de combustão ou bateria? Uma máquina a bateria é mais silenciosa e arranca sem esforço. Uma máquina com motor de combustão não perde autonomia em terrenos grandes. Diga-nos como a vai usar e nós aconselhamos.',
          ],
        },
        s3: {
          h: 'Reparação: quando trazer a sua máquina',
          items: [
            'O motor já não pega ou vai abaixo.',
            'A máquina perde força ou deita fumo.',
            'A corrente ou a lâmina corta mal.',
            'Surgem ruídos ou vibrações fora do normal.',
          ],
          p: [
            'Descreva a avaria no formulário ou ligue-nos para o {phone}. Indique a marca e o modelo da máquina: assim sabemos logo do que se trata.',
          ],
        },
        s4: {
          h: 'Conselhos para guardar a máquina no inverno',
          p: [
            'Antes de guardar uma máquina com motor de combustão durante o inverno, limpe-a, esvazie o depósito ou deixe o motor trabalhar até parar e guarde-a num local seco. Uma máquina bem guardada volta a pegar mais facilmente na primavera.',
            'As baterias devem ser guardadas num local protegido do gelo, de preferência com meia carga.',
          ],
        },
      },
      faqH: 'Perguntas sobre máquinas de jardim',
      faq: {
        q1: {
          q: 'Que marcas de máquinas vendem?',
          a: 'Sobretudo máquinas Honda e Stihl.',
        },
        q2: {
          q: 'Como posso mandar reparar o meu corta-relva ou a minha motosserra?',
          a: 'Traga a máquina à oficina ou descreva a avaria no formulário desta página. Nós ligamos-lhe de volta.',
        },
        q3: {
          q: 'Quando posso passar pela garagem?',
          a: '{hours}',
        },
        q4: {
          q: 'Onde fica a garagem?',
          a: 'No {address}, na rotunda de Erpeldange, ao lado do posto Aral.',
        },
      },
    },
    trailersForSale: {
      sections: {
        s1: {
          h: 'Saris, Humbaur e WM Meyer em Erpeldange',
          p: [
            'Vendemos atrelados das marcas Saris, Humbaur e WM Meyer, tanto para particulares como para profissionais. Diga-nos o que transporta: ajudamos a encontrar o modelo adequado ao seu carro e à sua carta de condução.',
            'A garagem fica na rotunda de Erpeldange-sur-Sûre, entre Ettelbruck e Diekirch.',
          ],
        },
        s2: {
          h: 'As perguntas certas antes de comprar',
          items: [
            'O que transporto com mais frequência, e com que peso?',
            'De que comprimento e largura de plataforma preciso?',
            'O meu carro pode rebocar este atrelado (campos O.1 e O.2 do certificado de matrícula)?',
            'A minha carta é suficiente: B, B com o código 96 ou BE?',
            'Onde vou guardar o atrelado quando não o estiver a usar?',
          ],
        },
        s3: {
          h: 'Particulares e profissionais',
          p: [
            'Para um particular, o atrelado serve para o jardim, para mudanças de casa ou para transportar um veículo de lazer. Para um profissional independente ou uma empresa, transporta todos os dias material e máquinas: aí, a carga útil, a robustez da plataforma e os pontos de amarração contam ainda mais.',
          ],
        },
        s4: {
          h: 'Comprar ou alugar?',
          p: [
            'Se só precisa de um atrelado de vez em quando, o [aluguer](page:rental) pode bastar. O nosso guia também lhe mostra que atrelado a sua carta de condução permite.',
          ],
        },
      },
      faqH: 'Perguntas sobre a compra de um atrelado',
      faq: {
        q1: {
          q: 'Que marcas de atrelados vendem?',
          a: 'Saris, Humbaur e WM Meyer.',
        },
        q2: {
          q: 'Também vendem a profissionais?',
          a: 'Sim, vendemos atrelados a particulares e a profissionais.',
        },
      },
    },
    cars: {
      sections: {
        s1: {
          h: 'Comprar um carro na Garage Um Rond Point',
          p: [
            'Todos os carros desta página estão em stock na nossa garagem, na rotunda de Erpeldange. A lista é atualizada todas as manhãs a partir dos nossos anúncios: vê o preço, os quilómetros, o ano e as fotos de cada carro.',
          ],
          items: [
            'Escolha um carro na lista e abra a respetiva ficha.',
            'Ligue-nos ou escreva-nos pelo WhatsApp para confirmar se ainda está disponível.',
            'Venha vê-lo à garagem e faça um test drive por marcação.',
          ],
        },
        s2: {
          h: 'Carros novos e usados perto de Ettelbruck e Diekirch',
          p: [
            'O stock inclui carros novos e carros usados. Muda com frequência: a lista mostra-lhe, todos os dias, o stock dessa manhã. Os nossos anúncios também estão publicados no LuxAuto e no AutoScout24.',
          ],
        },
        s3: {
          h: 'E o seu carro atual?',
          p: [
            'Quer dar o seu carro para retoma? Indique-o no formulário do carro que lhe interessa. Prefere vender sem ter de se preocupar com nada? Conheça o nosso serviço de venda à consignação mais abaixo nesta página.',
          ],
        },
      },
      faqH: 'Perguntas sobre os nossos carros',
      faq: {
        q1: {
          q: 'Posso fazer um test drive?',
          a: 'Sim, por marcação. Ligue-nos para o {phone} ou escreva-nos pelo WhatsApp, para o {whatsapp}.',
        },
        q2: {
          q: 'Onde posso ver os carros?',
          a: 'Na garagem, no {address}, na rotunda de Erpeldange. {hours}',
        },
        q3: {
          q: 'Os vossos carros também estão no LuxAuto e no AutoScout24?',
          a: 'Sim, os nossos anúncios também estão publicados no LuxAuto e no AutoScout24. Aqui vê todo o nosso stock num só lugar.',
        },
      },
    },
    contact: {
      sections: {
        s1: {
          h: 'Que meio de contacto escolher?',
          items: [
            'Uma pergunta rápida ou fotos para nos mostrar: pelo WhatsApp, para o {whatsapp}.',
            'Uma marcação ou uma resposta imediata: por telefone, para o {phone}.',
            'Um pedido detalhado: o formulário abaixo ou um e-mail para {email}.',
          ],
        },
        s2: {
          h: 'Como chegar à garagem',
          p: [
            'A garagem fica no {address}, na rotunda de Erpeldange-sur-Sûre, ao lado do posto Aral. Vem de Ettelbruck ou de Diekirch? A rotunda fica no seu caminho. Para o itinerário exato, abra o Google Maps a partir desta página.',
          ],
        },
      },
      faqH: 'Perguntas práticas',
      faq: {
        q1: {
          q: 'Quando é que a garagem está aberta?',
          a: '{hours}',
        },
        q2: {
          q: 'Que línguas falam?',
          a: 'Falamos luxemburguês, francês, alemão, inglês e português.',
        },
      },
    },
    rental: {
      sections: {
        s1: {
          h: 'Aluguer de atrelados na Nordstad',
          p: [
            'Na rotunda de Erpeldange, entre Ettelbruck e Diekirch, aluga um atrelado ou uma carrinha muito perto de casa. O nosso guia, mais acima, mostra-lhe em poucos cliques que atrelado serve para o que vai transportar e se a sua carta é suficiente.',
          ],
        },
        s2: {
          h: 'Conselhos para carregar corretamente',
          items: [
            'Nunca ultrapasse a massa máxima autorizada do atrelado, nem a carga rebocável do seu carro.',
            'Distribua a carga: os objetos pesados por cima do eixo e um pouco de peso sobre a lança, como indica o manual.',
            'Prenda a carga com cintas e cubra os materiais a granel com uma lona ou uma rede.',
            'Antes de partir, verifique o engate, as luzes e a pressão dos pneus.',
            'Conduza mais devagar do que sem carga: o conjunto trava pior e ocupa mais espaço nas curvas.',
          ],
        },
      },
    },
    category: {
      'porte-voiture': {
        sections: {
          s1: {
            h: 'Quando alugar um atrelado porta-carros?',
            p: [
              'Para trazer de volta um carro que já não anda, transportar um carro de coleção sem lhe somar quilómetros ou ir buscar um carro comprado longe de casa. O porta-carros evita que o carro transportado tenha de circular.',
            ],
          },
          s2: {
            h: 'Carregar um carro em segurança',
            items: [
              'Confirme que o carro transportado não ultrapassa a carga útil do atrelado.',
              'Suba devagar, bem alinhado com as rampas, com alguém a orientá-lo.',
              'Posicione o carro de modo a que um pouco de peso assente na parte da frente do atrelado, como indica o manual.',
              'Prenda cada roda com cintas adequadas e verifique-as após os primeiros quilómetros.',
            ],
          },
        },
      },
      'porte-moto': {
        sections: {
          s1: {
            h: 'Transportar uma mota',
            p: [
              'Para ir a um circuito, levar uma mota à reparação ou trazê-la depois de uma compra, o atrelado porta-motos é mais simples do que uma carrinha: a mota sobe pela rampa e fica encaixada no suporte da roda.',
            ],
          },
          s2: {
            h: 'Prender bem uma mota',
            items: [
              'Encaixe a roda da frente no suporte.',
              'Use quatro cintas, duas à frente e duas atrás, em pontos sólidos do quadro.',
              'Baixe ligeiramente a suspensão, sem a comprimir por completo.',
              'Verifique a tensão das cintas após os primeiros quilómetros.',
            ],
          },
        },
      },
      benne: {
        sections: {
          s1: {
            h: 'Atenção ao peso dos materiais',
            p: [
              'Os materiais a granel são pesados. Um metro cúbico de terra húmida pesa cerca de 1,5 a 1,8 toneladas, um metro cúbico de gravilha cerca de 1,5 toneladas. Um atrelado basculante cheio até à borda ultrapassa, por isso, rapidamente a sua carga útil.',
              'Consulte a carga útil na ficha do atrelado e encha-o em conformidade: mais vale fazer duas viagens do que levar um atrelado sobrecarregado.',
            ],
          },
          s2: {
            h: 'Obras, jardim, ecocentro',
            items: [
              'Cubra a carga com uma lona ou uma rede para que nada caia na estrada.',
              'Separe os resíduos antes de sair: no ecocentro, poupa tempo.',
              'Faça o basculamento só em piso plano e estável, com o atrelado engatado.',
            ],
          },
        },
      },
      frigorifique: {
        sections: {
          s1: {
            h: 'Para que ocasiões?',
            p: [
              'Festa de família, casamento, aniversário, quermesse, mercado ou festa de associação: o atrelado frigorífico mantém as bebidas e a comida frescas no local, durante todo o evento.',
            ],
          },
          s2: {
            h: 'Conselhos de utilização',
            items: [
              'Ligue o atrelado à corrente algumas horas antes de o carregar, para que já esteja frio.',
              'Carregue de preferência produtos já frios: arrefecer um grande volume de bebidas mornas leva tempo.',
              'Deixe o ar circular entre as caixas.',
              'Preveja uma ligação elétrica adequada perto do local onde o atrelado vai ficar.',
            ],
          },
        },
      },
      camionnette: {
        sections: {
          s1: {
            h: 'Mudanças, móveis, material',
            p: [
              'Uma carrinha é indicada para uma mudança de casa, móveis, eletrodomésticos ou material volumoso, sem ter de engatar um atrelado. A carga fica protegida da chuva.',
            ],
          },
          s2: {
            h: 'Conselhos para o seu transporte',
            items: [
              'Meça os móveis grandes antes de reservar.',
              'Coloque os objetos pesados ao fundo, encostados à divisória, e prenda a carga com cintas.',
              'Proteja os móveis com mantas para evitar riscos.',
              'Tenha em conta a altura do veículo antes de entrar num parque de estacionamento subterrâneo.',
            ],
          },
        },
      },
    },
  },
};

export default pt;
