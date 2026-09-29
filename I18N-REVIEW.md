# Übersetzungen zur Prüfung durch Muttersprachler

Jeder Text hier hat den Status `review: "native"`. Nach der Prüfung den Schlüssel in `src/i18n/review.json` eintragen und `npm run i18n:review` neu laufen lassen.

## Wo die Prüfung anfangen sollte

Die Übersetzungen sind Entwürfe. Diese Stellen waren beim Übersetzen am unsichersten.

### Lëtzebuergesch

- **Schreibweise:** „Rond-point" oder „Rondpoint", „um Rond-point"; Garage als feminin („an der Garage"), Foto als feminin
- **Verben:** „entretenéieren" (Hero), „Lackéierung" (Werkstatt-SEO)
- **Fahrzeuge und Karosserie:** „Neiwon" (Neuwagen), „Nei am Stock" (neu im Bestand), „Klengwon" (Citadine), „Notzfuerzeug" (Utilitaire), „Brennstoff" (Kraftstoff)
- **Anhänger-Daten:** „Unhängelaascht gebremst/ongebremst" (O.1/O.2), „Eidelgewiicht", „Luedfläch", „Luedhéicht", „Bannevolumen", „Stroumversuergung", „{n}-poleg", „Plattformunhänger", „Kofferunhänger"
- **Ladung:** „Gréngschnëtt", „Bauschutt", „Recyclingcenter", „e futtisen Auto"
- **Finder:** „Unhängersich", Überschrift „Wéi en Unhänger mat wéi engem Führerschäin?"
- **Garten:** „Rasemeeër", „Fräischneider", „Motorsee", „Heckeschéier"
- **Formulare:** „Landesvirwiel", „d'Këschtchen ukräizen", „Reprise vu mengem Auto", „Wonschdatum", „Navigatiounspad"
- **Werkstatt:** „TVA ofsetzbar", „No engem klengen Accident", „Éischt Zouloossung"
- **Recht:** „Niederlassungserlaabnes", „Geschäftsféierer", „Erausgeber", „Awëllegung", „virvertraglech Moossnamen", „EU-US-Dateschutzrumm", „Nationaler Kommissioun fir den Dateschutz" (CNPD); Zitierweise „Art. 6 Abs. 1 Buchst. a DSGVO", vielleicht lieber „RGPD"
- **n-Regel:** „Autoe kucken", „Fotoe grouss weisen", „Donnéeë benotzt", „Zuele fannt", „Occasioune vun", „Bëschmaschinne vun"
- **Karte:** Die Beschriftung nutzt Ettelbréck, Dikrech, Ierpeldeng und Sauer.

### Português (pt-PT)

- **Karosserie:** „Carrinha" für Break (kollidiert mit carrinha = Transporter), „Comercial" (Utilitaire), „Sedan", „SUV / TT", „Descapotável"
- **Kraftstoff:** „Diesel" statt „Gasóleo"?
- **Filter:** „Todas"/„Qualquer" (Genus passt nicht zu jedem Feld)
- **Finder:** „Massa rebocável com / sem travão" (O.1/O.2); „Atrelado de plataforma", „Atrelado fechado"
- **Ladung:** „restos de jardim", „ecocentro", „moto-quatro"
- **Beschriftungen:** „A garagem da rotunda de Erpeldange" (h1), „Perguntar" (Kontaktleiste), „Caminho de navegação", „Informação legal", „Dar o meu carro para retoma"
- **Uhrzeit:** „às {time}" ist zwischen 1:00 und 1:59 falsch („à")
- **SEO:** Die Descriptions sind auf die Länge gebracht und klingen teils knapp; „stand automóvel Ettelbruck" kommt nicht vor.

## Lëtzebuergesch: 609 Texte offen

| Schlüssel | Französisch | LB |
|---|---|---|
| `meta.lang` | français | Lëtzebuergesch |
| `meta.siteName` | Garage Um Rond Point | Garage Um Rond Point |
| `meta.ogAlt` | Garage Um Rond Point au rond-point d’Erpeldange | Garage Um Rond Point um Rond-point zu Ierpeldeng |
| `nav.skip` | Aller au contenu | Direkt bei den Inhalt |
| `nav.main` | Navigation principale | Haaptnavigatioun |
| `nav.rental` | Location | Lounen |
| `nav.cars` | Voitures | Autoen |
| `nav.workshop` | Atelier | Atelier |
| `nav.trailersForSale` | Remorques à vendre | Unhänger kafen |
| `nav.garden` | Jardin & forêt | Gaart & Bësch |
| `nav.contact` | Contact | Kontakt |
| `nav.menu` | Menu | Menü |
| `nav.close` | Fermer | Zoumaachen |
| `nav.langLabel` | Langue | Sprooch |
| `nav.callAria` | Appeler le +352 81 05 41 | +352 81 05 41 uruffen |
| `nav.home` | Accueil | Startsäit |
| `nav.breadcrumb` | Fil d’Ariane | Navigatiounspad |
| `nav.logoAria` | Garage Um Rond Point, accueil | Garage Um Rond Point, Startsäit |
| `contactBar.label` | Contact rapide | Direktkontakt |
| `contactBar.call` | Appeler | Uruffen |
| `contactBar.whatsapp` | WhatsApp | WhatsApp |
| `contactBar.ask` | Demander | Ufroen |
| `contactBar.whatsappText` | Bonjour, j’ai une question pour le Garage Um Rond Point. | Moien, ech hunn eng Fro un d’Garage Um Rond Point. |
| `status.stock.one` | {n} voiture en stock. | {n} Auto am Stock. |
| `status.stock.other` | {n} voitures en stock. | {n} Autoen am Stock. |
| `status.updatedToday` | Liste mise à jour aujourd’hui à {time}. | Lëscht haut ëm {time} aktualiséiert. |
| `status.updatedYesterday` | Liste mise à jour hier à {time}. | Lëscht gëschter ëm {time} aktualiséiert. |
| `status.updatedOn` | Liste mise à jour le {date} à {time}. | Lëscht aktualiséiert: {date} ëm {time}. |
| `status.never` | La liste de nos voitures arrive bientôt. | D’Lëscht mat eisen Autoen ass geschwënn do. |
| `status.everyMorning` | Liste des voitures mise à jour chaque matin. | D’Lëscht vun den Autoe gëtt all Moien aktualiséiert. |
| `hero.h1` | Le garage du rond-point d’Erpeldange | D’Garage um Rond-point zu Ierpeldeng |
| `hero.sub` | Louez une remorque ou une camionnette, trouvez votre prochaine voiture, faites entretenir et réparer la vôtre. Au 1, rue du Viaduc, à côté de la station Aral, entre Ettelbruck et Diekirch. | Lount en Unhänger oder eng Camionnette, fannt Ären nächsten Auto a loosst Ären eegenen entretenéieren a reparéieren. Um 1, rue du Viaduc, nieft der Aral-Tankstell, tëscht Ettelbréck an Dikrech. |
| `hero.ctaFinder` | Trouver une remorque | Unhänger fannen |
| `hero.ctaCars` | Voir les voitures | Autoe kucken |
| `hero.drawingAlt` | Plan du rond-point d’Erpeldange avec l’emplacement du garage à côté de la station Aral | Plang vum Rond-point zu Ierpeldeng mat der Plaz vun der Garage nieft der Aral-Tankstell |
| `finder.h2` | Quelle remorque vous faut-il ? | Wat fir en Unhänger braucht Dir? |
| `finder.intro` | Dites-nous ce que vous transportez et quel permis vous avez. Vous voyez tout de suite les remorques qui conviennent, leur prix et si votre permis suffit. | Sot eis, wat Dir transportéiert a wat fir e Führerschäin Dir hutt. Dir gesitt direkt, wéi eng Unhänger passen, wat se kaschten an ob Äre Führerschäin duergeet. |
| `finder.cargoLegend` | Que transportez-vous ? | Wat transportéiert Dir? |
| `finder.cargo.voiture` | Une voiture | En Auto |
| `finder.cargo.moto` | Une moto | Eng Moto |
| `finder.cargo.terre` | Terre, gravats ou déchets verts | Äerd, Bauschutt oder Gréngschnëtt |
| `finder.cargo.fete` | Boissons et repas pour une fête | Gedrénks an Iessen fir e Fest |
| `finder.cargo.meubles` | Meubles ou cartons | Miwwelen oder Kartongen |
| `finder.cargo.materiel` | Matériel ou machines | Material oder Maschinnen |
| `finder.licenceLegend` | Quel permis avez-vous ? | Wat fir e Führerschäin hutt Dir? |
| `finder.licence.B` | Permis B | Führerschäin B |
| `finder.licence.B96` | Permis B avec code 96 | Führerschäin B mam Code 96 |
| `finder.licence.BE` | Permis BE | Führerschäin BE |
| `finder.licence.unknown` | Je ne sais pas | Ech weess et net |
| `finder.exactSummary` | Calcul exact pour votre voiture (facultatif) | Genee fir Ären Auto ausrechnen (fakultativ) |
| `finder.f2` | Masse maximale de votre voiture (champ F.2) | Zulässegt Gesamtgewiicht vun Ärem Auto (Feld F.2) |
| `finder.o1` | Charge remorquable freinée (champ O.1) | Unhängelaascht gebremst (Feld O.1) |
| `finder.o2` | Charge remorquable non freinée (champ O.2) | Unhängelaascht ongebremst (Feld O.2) |
| `finder.kg` | kg | kg |
| `finder.exactHint` | Ces chiffres figurent sur le certificat d’immatriculation de votre voiture. | Dës Zuele fannt Dir op der Carte grise vun Ärem Auto. |
| `finder.fleetCount.one` | {n} remorque dans notre flotte | {n} Unhänger an eiser Flott |
| `finder.fleetCount.other` | {n} remorques dans notre flotte | {n} Unhänger an eiser Flott |
| `finder.matchCount.one` | {n} remorque convient | {n} Unhänger passt |
| `finder.matchCount.other` | {n} remorques conviennent | {n} Unhänger passen |
| `finder.none` | Aucune remorque ne convient pour cette combinaison. Appelez-nous au +352 81 05 41, nous vous conseillons. | Fir dës Kombinatioun passt keen Unhänger. Rufft eis un op +352 81 05 41, mir beroden Iech. |
| `finder.vansHeading` | Camionnettes | Camionnetten |
| `finder.vanStatement` | Une camionnette jusqu’à 3 500 kg de masse maximale se conduit avec le permis B. | Eng Camionnette bis 3.500 kg zulässegt Gesamtgewiicht fuert Dir mam Führerschäin B. |
| `finder.specs.payload` | Charge utile | Notzlaascht |
| `finder.specs.mma` | Masse maximale | Zulässegt Gesamtgewiicht |
| `finder.specs.empty` | Poids à vide | Eidelgewiicht |
| `finder.specs.surface` | Surface de chargement | Luedfläch |
| `finder.specs.height` | Hauteur de chargement | Luedhéicht |
| `finder.specs.braked` | Freinée | Gebremst |
| `finder.specs.yes` | oui | jo |
| `finder.specs.no` | non | nee |
| `finder.specs.socket` | Prise | Stecker |
| `finder.specs.socketValue` | {n} broches | {n}-poleg |
| `finder.specs.deposit` | Caution | Kautioun |
| `finder.specs.volume` | Volume intérieur | Bannevolumen |
| `finder.specs.temp` | Température | Temperatur |
| `finder.specs.power` | Alimentation | Stroumversuergung |
| `finder.pallets.one` | {n} palette Europe | {n} Europalett |
| `finder.pallets.other` | {n} palettes Europe | {n} Europaletten |
| `finder.volumeText` | Volume intérieur {m3} m³ | Bannevolumen {m3} m³ |
| `finder.diagramLabel` | Surface de chargement {l} × {w} m | Luedfläch {l} × {w} m |
| `finder.diagramPallets` | {n} palettes Europe | {n} Europaletten |
| `finder.verdict.ok` | Votre permis suffit. | Äre Führerschäin geet duer. |
| `finder.verdict.needB96orBE` | Il vous faut le code 96 ou le permis BE. | Dir braucht de Code 96 oder de Führerschäin BE. |
| `finder.verdict.needBE` | Il vous faut le permis BE. | Dir braucht de Führerschäin BE. |
| `finder.verdict.dependsB` | Avec le permis B, voiture et remorque ensemble ne doivent pas dépasser 3 500 kg. Indiquez la masse de votre voiture (F.2) pour le savoir. | Mam Führerschäin B dierfen Auto an Unhänger zesummen net méi wéi 3.500 kg weien. Gitt d’Gewiicht vun Ärem Auto (F.2) un, da wësst Dir et. |
| `finder.verdict.dependsB96` | Avec le code 96, voiture et remorque ensemble ne doivent pas dépasser 4 250 kg. Indiquez la masse de votre voiture (F.2) pour le savoir. | Mam Code 96 dierfen Auto an Unhänger zesummen net méi wéi 4.250 kg weien. Gitt d’Gewiicht vun Ärem Auto (F.2) un, da wësst Dir et. |
| `finder.verdict.required` | Permis nécessaire : {licence} | Néidege Führerschäin: {licence} |
| `finder.verdict.requiredDepends` | Permis nécessaire : selon votre voiture, B, B96 ou BE | Néidege Führerschäin: je no Auto B, B96 oder BE |
| `finder.verdict.towLimit` | Chargée au maximum, cette remorque dépasse ce que votre voiture peut tracter ({limite} kg). | Voll gelueden ass dësen Unhänger méi schwéier, wéi Ären Auto zéien däerf ({limite} kg). |
| `finder.licenceShort.B` | B | B |
| `finder.licenceShort.B96` | B avec code 96 | B mam Code 96 |
| `finder.licenceShort.BE` | BE | BE |
| `finder.price` | {day} la journée, {weekend} le week-end | {day} pro Dag, {weekend} pro Weekend |
| `finder.priceMissing` | [FEHLT — Preis pro Tag und Wochenende] | [FEHLT — Preis pro Tag und Wochenende] |
| `finder.request` | Demander cette remorque | Dësen Unhänger ufroen |
| `finder.requestVan` | Demander cette camionnette | Dës Camionnette ufroen |
| `finder.seeAll` | Voir toute la flotte | Déi ganz Flott kucken |
| `finder.finePrint` | Indication basée sur les règles du permis de conduire au Luxembourg (transports.public.lu). En cas de doute, demandez-nous avant de partir. | Dës Angab baséiert op de Führerschäinreegelen zu Lëtzebuerg (transports.public.lu). Wann Dir net sécher sidd, frot eis, ier Dir lassfuert. |
| `finder.sourceLink` | Règles du permis sur transports.public.lu | Führerschäinreegelen op transports.public.lu |
| `finder.empty` | La liste de nos remorques arrive bientôt. Appelez-nous au +352 81 05 41. | D’Lëscht mat eisen Unhänger kënnt geschwënn. Rufft eis un op +352 81 05 41. |
| `finder.noJsRules` | Avec le permis B, vous pouvez tracter une remorque jusqu’à 750 kg de masse maximale, ou une remorque plus lourde si voiture et remorque ensemble ne dépassent pas 3 500 kg. Avec le code 96, l’ensemble peut aller jusqu’à 4 250 kg. Au-delà, il faut le permis BE. | Mam Führerschäin B dierft Dir en Unhänger bis 750 kg zulässegt Gesamtgewiicht zéien, oder e méi schwéieren Unhänger, wann Auto an Unhänger zesummen net méi wéi 3.500 kg weien. Mam Code 96 sinn zesumme bis zu 4.250 kg erlaabt. Doriwwer braucht Dir de Führerschäin BE. |
| `fleetTable.h2` | Toute notre flotte | Eis ganz Flott |
| `fleetTable.caption` | Nos remorques et camionnettes de location | Eis Unhänger a Camionnetten fir ze lounen |
| `fleetTable.kind` | Type | Typ |
| `fleetTable.payload` | Charge utile | Notzlaascht |
| `fleetTable.mma` | Masse maximale | Zulässegt Gesamtgewiicht |
| `fleetTable.surface` | Surface | Luedfläch |
| `fleetTable.licence` | Permis nécessaire | Néidege Führerschäin |
| `fleetTable.day` | Prix jour | Präis pro Dag |
| `fleetTable.weekend` | Prix week-end | Präis pro Weekend |
| `fleetTable.licenceDepends` | selon la voiture | je no Auto |
| `categories.porte-voiture` | Remorque porte-voiture | Autosunhänger |
| `categories.porte-moto` | Remorque porte-moto | Motosunhänger |
| `categories.benne` | Benne basculante | Kipper |
| `categories.frigorifique` | Remorque frigorifique | Killunhänger |
| `categories.plateau` | Remorque plateau | Plattformunhänger |
| `categories.fourgon` | Remorque fourgon | Kofferunhänger |
| `categories.camionnette` | Camionnette | Camionnette |
| `categories.voiture` | Voiture | Auto |
| `cars.homeH2` | Nos voitures en stock | Eis Autoen am Stock |
| `cars.h1` | Voitures neuves et d’occasion | Nei Autoen an Occasiounen |
| `cars.lead` | Toutes les voitures en stock au Garage Um Rond Point, au rond-point d’Erpeldange. Appelez-nous ou écrivez-nous sur WhatsApp avant de passer, pour un essai sur rendez-vous. | All d’Autoen am Stock vun der Garage Um Rond Point, um Rond-point zu Ierpeldeng. Rufft eis un oder schreift eis op WhatsApp, ier Dir laanschtkommt. Probefahrten op Rendez-vous. |
| `cars.seeAll.one` | Voir la voiture | Den Auto kucken |
| `cars.seeAll.other` | Voir les {n} voitures | All {n} Autoe kucken |
| `cars.year` | Année | Joer |
| `cars.km` | Kilomètres | Kilometer |
| `cars.fuel` | Carburant | Brennstoff |
| `cars.tagFresh` | Nouveau | Nei am Stock |
| `cars.tagNew` | Neuve | Neiwon |
| `cars.price` | Prix | Präis |
| `cars.noPhoto` | Photo à venir | Foto kënnt nach |
| `cars.empty` | Aucune voiture en stock pour le moment. Appelez-nous au +352 81 05 41. | Am Moment ass keen Auto am Stock. Rufft eis un op +352 81 05 41. |
| `cars.filter.summary` | Filtrer ({n}) | Filter ({n}) |
| `cars.filter.legend` | Filtrer les voitures | Autoe filteren |
| `cars.filter.make` | Marque | Mark |
| `cars.filter.fuel` | Carburant | Brennstoff |
| `cars.filter.gearbox` | Boîte | Schaltung |
| `cars.filter.maxPrice` | Prix maximum | Maximalpräis |
| `cars.filter.condition` | État | Zoustand |
| `cars.filter.sort` | Tri | Sortéierung |
| `cars.filter.all` | Toutes | All |
| `cars.filter.any` | Tous | All |
| `cars.filter.conditionNew` | Neuve | Nei |
| `cars.filter.conditionUsed` | Occasion | Occasioun |
| `cars.filter.sortRecent` | plus récentes | Neiste fir d’éischt |
| `cars.filter.sortPriceAsc` | prix croissant | Präis: bëllegst fir d’éischt |
| `cars.filter.sortPriceDesc` | prix décroissant | Präis: deierst fir d’éischt |
| `cars.filter.sortKmAsc` | kilométrage croissant | Kilometer: mannst fir d’éischt |
| `cars.filter.count.one` | {n} voiture | {n} Auto |
| `cars.filter.count.other` | {n} voitures | {n} Autoen |
| `cars.filter.empty` | Aucune voiture ne correspond. | Keen Auto passt zu dëse Filteren. |
| `cars.filter.reset` | Réinitialiser les filtres | Filteren zrécksetzen |
| `cars.filter.upTo` | jusqu’à {price} | bis {price} |
| `enums.fuel.petrol` | Essence | Bensin |
| `enums.fuel.diesel` | Diesel | Diesel |
| `enums.fuel.hybrid` | Hybride | Hybrid |
| `enums.fuel.plugin_hybrid` | Hybride rechargeable | Plug-in-Hybrid |
| `enums.fuel.electric` | Électrique | Elektresch |
| `enums.fuel.lpg` | GPL | Autogas |
| `enums.fuel.other` | Autre | Aner |
| `enums.transmission.automatic` | Automatique | Automatesch |
| `enums.transmission.manual` | Manuelle | Manuell |
| `enums.transmission.other` | Autre | Aner |
| `enums.body.estate` | Break | Break |
| `enums.body.saloon` | Berline | Limousine |
| `enums.body.suv` | SUV / 4x4 | SUV / 4x4 |
| `enums.body.city` | Citadine | Klengwon |
| `enums.body.coupe` | Coupé | Coupé |
| `enums.body.convertible` | Cabriolet | Cabriolet |
| `enums.body.mpv` | Monospace | Monospace |
| `enums.body.van` | Utilitaire | Notzfuerzeug |
| `enums.body.pickup` | Pick-up | Pick-up |
| `enums.body.other` | Autre | Aner |
| `enums.condition.new` | Neuve | Nei |
| `enums.condition.used` | Occasion | Occasioun |
| `enums.colors.noir` | Noir | Schwaarz |
| `enums.colors.blanc` | Blanc | Wäiss |
| `enums.colors.gris` | Gris | Gro |
| `enums.colors.argent` | Argent | Sëlwer |
| `enums.colors.bleu` | Bleu | Blo |
| `enums.colors.rouge` | Rouge | Rout |
| `enums.colors.vert` | Vert | Gréng |
| `enums.colors.jaune` | Jaune | Giel |
| `enums.colors.orange` | Orange | Orange |
| `enums.colors.marron` | Marron | Brong |
| `enums.colors.brun` | Brun | Brong |
| `enums.colors.beige` | Beige | Beige |
| `enums.colors.bordeaux` | Bordeaux | Bordeaux |
| `enums.colors.violet` | Violet | Mof |
| `enums.colors.or` | Or | Gold |
| `enums.colors.anthracite` | Anthracite | Anthrazit |
| `car.specsH2` | Caractéristiques | Technesch Donnéeën |
| `car.firstReg` | Première immatriculation | Éischt Zouloossung |
| `car.mileage` | Kilométrage | Kilometerstand |
| `car.fuel` | Carburant | Brennstoff |
| `car.gearbox` | Boîte | Schaltung |
| `car.power` | Puissance | Leeschtung |
| `car.powerUnit` | ch | PS |
| `car.displacement` | Cylindrée | Hubraum |
| `car.body` | Carrosserie | Karosserie |
| `car.seats` | Places | Sëtzplazen |
| `car.colorExt` | Couleur extérieure | Faarf baussen |
| `car.colorInt` | Couleur intérieure | Faarf bannen |
| `car.euro` | Norme Euro | Euro-Norm |
| `car.wltp` | Consommation et CO₂ (WLTP) | Verbrauch an CO₂ (WLTP) |
| `car.wltpMissing` | informations au garage | Informatiounen an der Garage |
| `car.ref` | Réf. | Ref. |
| `car.notSpecified` | non indiqué | net uginn |
| `car.condition` | État | Zoustand |
| `car.vatRecoverable` | TVA récupérable | TVA ofsetzbar |
| `car.equipmentH2` | Équipement | Ausstattung |
| `car.equipmentMore` | Voir les {n} équipements | Ganz Ausstattung kucken ({n}) |
| `car.descriptionH2` | Description | Beschreiwung |
| `car.originalNote` | Description d’origine en français | Original-Beschreiwung op Franséisch |
| `car.originalListNote` | Liste d’origine en français | Original-Lëscht op Franséisch |
| `car.contactH2` | Cette voiture vous intéresse ? | Interesséiert Dir Iech fir dësen Auto? |
| `car.contactText` | Appelez-nous, écrivez-nous sur WhatsApp ou envoyez-nous votre demande. | Rufft eis un, schreift eis op WhatsApp oder schéckt eis Är Ufro. |
| `car.whatsappText` | Bonjour, la {make} {model} (réf. {id}) est-elle encore disponible ? | Moien, ass dësen Auto nach disponibel: {make} {model} (Ref. {id})? |
| `car.similarH2` | Voitures similaires | Ähnlech Autoen |
| `car.sodablast` | Pour une voiture ancienne, nous proposons aussi le décapage sodablast. | Fir en alen Auto bidde mir och Sodablast un. |
| `car.sold` | Cette voiture a été vendue ou n’est plus en stock. | Dësen Auto ass verkaaft oder net méi am Stock. |
| `car.backToList` | Voir toutes nos voitures | All eis Autoe kucken |
| `car.gallery.label` | Photos de la {make} {model} | Fotoen: {make} {model} |
| `car.gallery.counter` | {i} / {n} | {i} / {n} |
| `car.gallery.prev` | Photo précédente | Vireg Foto |
| `car.gallery.next` | Photo suivante | Nächst Foto |
| `car.gallery.open` | Afficher les photos en grand | Fotoe grouss weisen |
| `car.gallery.close` | Fermer | Zoumaachen |
| `car.gallery.thumbs` | Miniatures | Miniaturen |
| `car.gallery.thumb` | Photo {i} | Foto {i} |
| `car.gallery.alt` | {make} {model} {version}, photo {i} sur {n} | {make} {model} {version}, Foto {i} vun {n} |
| `photos.heroWorkshop` | Voiture noire dans un atelier moderne et lumineux | Schwaarzen Auto an engem modernen, hellen Atelier |
| `photos.workshop` | Mécanicien au travail dans le compartiment moteur d’une voiture | Mecanicien bei der Aarbecht am Motorraum vun engem Auto |
| `photos.sodablast` | Voiture ancienne rouillée, peinture écaillée | Rustegen Oldtimer mat ofblätterndem Lack |
| `photos.bodywork` | Voiture de sport rouge sur un pont élévateur dans un atelier | Rouden Sportsauto op enger Hiefbün an engem Atelier |
| `photos.garden` | Tondeuse à gazon thermique sur une pelouse | Benzinsrasemeeër op engem Rasen |
| `photos.gardenPage` | Tonte d’une pelouse au soleil | Gras méien an der Sonn |
| `photos.paint` | Peinture d’une carrosserie au pistolet | Lackéiere vun enger Karosserie mat der Sprëtzpistoul |
| `photos.rental` | Pick-up blanc chargé sur un plateau | Wäisse Pick-up op engem Plateau |
| `photos.trailersSale` | Remorque basculante avec ridelles grillagées | Kippunhänger mat Gitteropsaz |
| `photos.fleetAlt` | Photo : {name} | Foto: {name} |
| `photos.creditsH2` | Photos d’illustration | Beispillfotoen |
| `photos.credits` | Photos d’illustration sous licence libre : | Beispillfotoen ënner fräier Lizenz: |
| `services.h2` | Nos autres services | Eis aner Servicer |
| `services.workshop.h3` | Atelier | Atelier |
| `services.workshop.text` | Entretien, diagnostic et réparation de votre voiture ou camionnette. En carrosserie, nous réparons et repeignons votre véhicule après un accrochage. | Entretien, Diagnos a Reparatur vun Ärem Auto oder Ärer Camionnette. No engem klengen Accident reparéiere mir Äert Gefier a lackéieren et nei. |
| `services.workshop.link` | Mécanique et carrosserie | Mechanik a Karosserie |
| `services.sodablast.h3` | Sodablast | Sodablast |
| `services.sodablast.text` | Le sodablast projette du bicarbonate de soude pour décaper peinture, graisse et saleté. Ce décapage doux n’abîme pas les surfaces délicates : carrosserie ancienne, jantes, pièces mécaniques. | Beim Sodablast sprëtze mir Natron op d’Uewerfläch a maachen esou Lack, Fett an Dreck ewech. Dës mëll Method beschiedegt keng empfindlech Uewerflächen: al Karosserien, Felgen, mechanesch Deeler. |
| `services.sodablast.link` | Le décapage sodablast | Méi iwwer Sodablast |
| `services.garden.h3` | Jardin & forêt | Gaart & Bësch |
| `services.garden.text` | Nous vendons et réparons des machines de jardin et de forêt, principalement des marques Honda et Stihl. | Mir verkafen a reparéieren Gaart- a Bëschmaschinnen, virun allem vun de Marken Honda a Stihl. |
| `services.garden.link` | Machines de jardin et de forêt | Gaart- a Bëschmaschinnen |
| `services.trailers.h3` | Remorques à vendre | Unhänger kafen |
| `services.trailers.text` | Nous vendons des remorques Saris, Humbaur et WM Meyer, pour les particuliers et les professionnels. Nous vous aidons à choisir une remorque que votre voiture peut tracter et que votre permis autorise. | Mir verkafen Unhänger vu Saris, Humbaur a WM Meyer, fir Privatleit a Betriber. Mir hëllefen Iech, en Unhänger ze wielen, deen Ären Auto zéie kann an deen Dir mat Ärem Führerschäin fueren dierft. |
| `services.trailers.link` | Nos remorques à vendre | Eis Unhänger zum Verkaf |
| `services.photoMissing` | [FEHLT — Foto] | [FEHLT — Foto] |
| `reviews.h2` | Avis Google | Google-Bewäertungen |
| `reviews.link` | Lire tous les avis sur Google | All Bewäertungen op Google liesen |
| `reviews.missing` | [FEHLT — 2–3 vom Kunden freigegebene Zitate aus dem Google-Profil, mit Vorname + Initiale und Monat/Jahr] | [FEHLT — 2–3 vom Kunden freigegebene Zitate aus dem Google-Profil, mit Vorname + Initiale und Monat/Jahr] |
| `faq.h2` | Questions fréquentes | Heefeg Froen |
| `faq.rentalH2` | Questions sur la location | Froen zum Lounen |
| `faq.items.permis.q` | Quel permis faut-il pour tracter une remorque ? | Wat fir e Führerschäin brauch ech, fir en Unhänger ze zéien? |
| `faq.items.permis.a` | Avec le permis B, vous pouvez tracter une remorque jusqu’à 750 kg de masse maximale. Une remorque plus lourde est permise si la voiture et la remorque ensemble ne dépassent pas 3 500 kg. Avec le code 96 sur votre permis B, l’ensemble peut aller jusqu’à 4 250 kg. Au-delà, il faut le permis BE, qui autorise une remorque jusqu’à 3 500 kg. | Mam Führerschäin B dierft Dir en Unhänger bis 750 kg zulässegt Gesamtgewiicht zéien. E méi schwéieren Unhänger ass erlaabt, wann Auto an Unhänger zesummen net méi wéi 3.500 kg weien. Mam Code 96 op Ärem Führerschäin B dierfen Auto an Unhänger zesumme bis zu 4.250 kg weien. Doriwwer braucht Dir de Führerschäin BE. Domat dierft Dir en Unhänger bis 3.500 kg zéien. |
| `faq.items.carte.q` | Où voir ce que ma voiture peut tracter ? | Wou gesinn ech, wat mäin Auto zéien däerf? |
| `faq.items.carte.a` | Sur le certificat d’immatriculation : le champ O.1 indique la charge remorquable avec freins, le champ O.2 sans freins. La masse maximale de votre voiture figure au champ F.2. | Op der Carte grise: D’Feld O.1 weist d’Unhängelaascht mat Bremsen, d’Feld O.2 d’Unhängelaascht ouni Bremsen. Dat zulässegt Gesamtgewiicht vun Ärem Auto steet am Feld F.2. |
| `faq.items.prix.q` | Combien coûte la location d’une remorque ? | Wat kascht et, en Unhänger ze lounen? |
| `faq.items.prix.a` | Le prix à la journée et au week-end est indiqué pour chaque remorque dans notre guide. [FEHLT — Preise der Flotte] | De Präis pro Dag a pro Weekend steet bei all Unhänger an eiser Unhängersich. [FEHLT — Preise der Flotte] |
| `faq.items.louer.q` | Que faut-il pour louer ? | Wat brauch ech, fir ze lounen? |
| `faq.items.louer.a` | [FEHLT — Mietbedingungen: Ausweis, Führerschein, Kaution, Stecker 7- oder 13-polig] | [FEHLT — Mietbedingungen: Ausweis, Führerschein, Kaution, Stecker 7- oder 13-polig] |
| `faq.items.reserver.q` | Faut-il réserver à l’avance ? | Muss ech am Viraus reservéieren? |
| `faq.items.reserver.a` | [FEHLT — Reservierung, Abhol- und Rückgabezeiten] | [FEHLT — Reservierung, Abhol- und Rückgabezeiten] |
| `faq.items.dispo.q` | Les voitures de la liste sont-elles encore disponibles ? | Sinn d’Autoen op der Lëscht nach disponibel? |
| `faq.items.dispo.a` | Nous mettons la liste à jour chaque matin. Une voiture vendue dans la journée peut encore apparaître jusqu’au lendemain. Appelez-nous ou écrivez-nous sur WhatsApp avant de passer. | Mir aktualiséieren d’Lëscht all Moien. En Auto, deen am Laf vum Dag verkaaft gëtt, kann nach bis den Dag drop op der Lëscht stoen. Rufft eis un oder schreift eis op WhatsApp, ier Dir laanschtkommt. |
| `faq.items.marques.q` | Réparez-vous toutes les marques ? | Reparéiert Dir all Marken? |
| `faq.items.marques.a` | Oui, notre atelier entretient et répare les voitures et camionnettes de toutes marques. [UNBESTÄTIGT — Werden alle Marken repariert?] | Jo, eisen Atelier mécht den Entretien an d’Reparatur vun Autoen a Camionnetten, egal vu wéi enger Mark. [UNBESTÄTIGT — Werden alle Marken repariert?] |
| `faq.items.depot.q` | Pouvez-vous vendre ma voiture pour moi ? | Kënnt Dir mäin Auto fir mech verkafen? |
| `faq.items.depot.a` | Oui, en dépôt-vente : nous mettons votre voiture en vente et vous mettons en relation avec les acheteurs. Parlez-nous des conditions au garage ou par téléphone. | Jo, am Kommissiounsverkaf: Mir bidden Ären Auto zum Verkaf un a bréngen Iech mat Keefer a Kontakt. Schwätzt mat eis iwwer d’Konditiounen, an der Garage oder um Telefon. |
| `faq.items.langues.q` | Quelles langues parlez-vous ? | Wéi eng Sprooche schwätzt Dir? |
| `faq.items.langues.a` | Luxembourgeois, français, allemand, anglais et portugais. | Lëtzebuergesch, Franséisch, Däitsch, Englesch a Portugisesch. |
| `faq.items.paiement.q` | Comment puis-je payer ? | Wéi kann ech bezuelen? |
| `faq.items.paiement.a` | En espèces, par carte Visa, Mastercard ou V PAY, avec Payconiq, Apple Pay ou PayPal, ou par virement. [UNBESTÄTIGT — Zahlungsmittel] | Bar, mat Kaart (Visa, Mastercard oder V PAY), mat Payconiq, Apple Pay oder PayPal oder per Iwwerweisung. [UNBESTÄTIGT — Zahlungsmittel] |
| `access.h2` | Nous trouver | Esou fannt Dir eis |
| `access.address` | Adresse | Adress |
| `access.landmark` | Au rond-point, à côté de la station Aral, entre Ettelbruck et Diekirch. | Um Rond-point, nieft der Aral-Tankstell, tëscht Ettelbréck an Dikrech. |
| `access.hoursH3` | Heures d’ouverture | Ëffnungszäiten |
| `access.languagesH3` | Langues | Sproochen |
| `access.languages` | Nous parlons luxembourgeois, français, allemand, anglais et portugais. | Mir schwätze Lëtzebuergesch, Franséisch, Däitsch, Englesch a Portugisesch. |
| `access.mapLink` | Itinéraire dans Google Maps | Route an Google Maps |
| `access.external` | (site externe) | (extern Websäit) |
| `access.mapTitle` | Le rond-point d’Erpeldange | De Rond-point zu Ierpeldeng |
| `access.osm` | © les contributeurs d’OpenStreetMap | © OpenStreetMap-Mataarbechter |
| `access.osmLabel` | Données de carte | Kaartendaten |
| `access.labels.garage` | Garage Um Rond Point | Garage Um Rond Point |
| `access.labels.aral` | Aral | Aral |
| `access.labels.ettelbruck` | Ettelbruck | Ettelbréck |
| `access.labels.diekirch` | Diekirch | Dikrech |
| `access.labels.erpeldange` | Erpeldange | Ierpeldeng |
| `access.labels.rail` | Voie ferrée | Eisebunn |
| `access.labels.sure` | Sûre | Sauer |
| `hours.caption` | Heures d’ouverture du Garage Um Rond Point | Ëffnungszäite vun der Garage Um Rond Point |
| `hours.day` | Jour | Dag |
| `hours.time` | Heures | Zäiten |
| `hours.days.mo` | Lundi | Méindeg |
| `hours.days.tu` | Mardi | Dënschdeg |
| `hours.days.we` | Mercredi | Mëttwoch |
| `hours.days.th` | Jeudi | Donneschdeg |
| `hours.days.fr` | Vendredi | Freideg |
| `hours.days.sa` | Samedi | Samschdeg |
| `hours.days.su` | Dimanche | Sonndeg |
| `hours.closed` | Fermé | Zou |
| `hours.today` | aujourd’hui | haut |
| `hours.and` | et | an |
| `hours.holidays` | Jours fériés : [UNBESTÄTIGT — Feiertage vermutlich geschlossen] | Feierdeeg: [UNBESTÄTIGT — Feiertage vermutlich geschlossen] |
| `hours.short` | Lundi à vendredi {weekday}, samedi {saturday} | Méindeg bis Freideg {weekday}, Samschdeg {saturday} |
| `footer.hoursH` | Heures d’ouverture | Ëffnungszäiten |
| `footer.followH` | Suivez-nous | Follegt eis |
| `footer.portals` | Nos annonces aussi sur {luxauto} et {autoscout} | Eis Annoncen och op {luxauto} an {autoscout} |
| `footer.legal` | Mentions légales | Impressum |
| `footer.privacy` | Protection des données | Dateschutz |
| `footer.tiktokMissing` | TikTok [UNBESTÄTIGT — genaue URL] | TikTok [UNBESTÄTIGT — genaue URL] |
| `depot.h2` | Vous vendez votre voiture ? | Wëllt Dir Ären Auto verkafen? |
| `depot.text` | Avec notre service de dépôt-vente, nous mettons votre voiture en vente et vous mettons en relation avec les acheteurs. Parlez-nous de votre voiture, nous vous expliquons les conditions. | Am Kommissiounsverkaf bidde mir Ären Auto zum Verkaf un a bréngen Iech mat Keefer a Kontakt. Erzielt eis vun Ärem Auto, mir erklären Iech d’Konditiounen. |
| `depot.missing` | [FEHLT — Konditionen Kommissionsverkauf] | [FEHLT — Konditionen Kommissionsverkauf] |
| `depot.link` | Proposer ma voiture | Mäin Auto ubidden |
| `pages.rental.h1` | Location de remorques et camionnettes à Erpeldange | Unhänger a Camionnetten zu Ierpeldeng lounen |
| `pages.rental.lead` | Remorques porte-voiture et porte-moto, bennes basculantes, remorques frigorifiques pour vos fêtes, camionnettes. À la journée ou pour le week-end. | Autos- a Motosunhänger, Kipper, Killunhänger fir Äert Fest, Camionnetten. Fir een Dag oder fir de Weekend. |
| `pages.rental.durationsMissing` | [UNBESTÄTIGT — Mietdauern Tag / Wochenende] | [UNBESTÄTIGT — Mietdauern Tag / Wochenende] |
| `pages.rental.conditionsH2` | Conditions de location | Lounbedéngungen |
| `pages.rental.conditionsMissing` | [FEHLT — Mietbedingungen: Ausweis, Führerschein, Kaution, Abhol- und Rückgabezeiten, Reservierung] | [FEHLT — Mietbedingungen: Ausweis, Führerschein, Kaution, Abhol- und Rückgabezeiten, Reservierung] |
| `pages.rental.formH2` | Demande de location | Lounufro |
| `pages.rental.formIntro` | Choisissez la remorque et les dates. Nous vous rappelons pour confirmer. | Wielt den Unhänger an d’Datumer. Mir ruffen Iech zréck, fir ze bestätegen. |
| `pages.category.h1.porte-voiture` | Louer une remorque porte-voiture à Erpeldange | Autosunhänger lounen zu Ierpeldeng |
| `pages.category.h1.porte-moto` | Louer une remorque porte-moto à Erpeldange | Motosunhänger lounen zu Ierpeldeng |
| `pages.category.h1.benne` | Louer une benne basculante à Erpeldange | Kipper lounen zu Ierpeldeng |
| `pages.category.h1.frigorifique` | Louer une remorque frigorifique à Erpeldange | Killunhänger lounen zu Ierpeldeng |
| `pages.category.h1.camionnette` | Louer une camionnette à Erpeldange | Camionnette lounen zu Ierpeldeng |
| `pages.category.intro.porte-voiture` | La remorque porte-voiture sert à transporter une voiture en panne, une voiture de collection ou une voiture que vous venez d’acheter. Vérifiez avant de partir que votre voiture peut tracter l’ensemble et que votre permis suffit. | Mam Autosunhänger transportéiert Dir e futtisen Auto, en Oldtimer oder en Auto, deen Dir grad kaaft hutt. Kuckt, ier Dir lassfuert, ob Ären Auto den Unhänger mat der Luedung zéien däerf an ob Äre Führerschäin duergeet. |
| `pages.category.intro.porte-moto` | La remorque porte-moto sert à emmener une moto, un scooter ou un quad à l’atelier, en vacances ou sur un circuit. Elle se tracte avec une voiture ordinaire. | Mam Motosunhänger bréngt Dir eng Moto, e Scooter oder e Quad an den Atelier, an d’Vakanz oder op d’Rennstreck. Fir en ze zéien, geet en normalen Auto duer. |
| `pages.category.intro.benne` | La benne basculante sert à transporter terre, gravats, sable ou déchets verts, et se vide en basculant. Pour un chantier, le jardin ou un passage au parc à conteneurs. | Mam Kipper transportéiert Dir Äerd, Bauschutt, Sand oder Gréngschnëtt a kippt d’Luedung of. Fir e Chantier, fir de Gaart oder fir an de Recyclingcenter. |
| `pages.category.intro.frigorifique` | La remorque frigorifique garde boissons et repas au frais pendant une fête, un mariage ou un festival. Vous la garez sur place pour la durée de l’événement. | De Killunhänger hält Gedrénks an Iessen während engem Fest, enger Hochzäit oder engem Festival frësch. Dir stellt de Killunhänger fir d’Dauer vum Fest op der Plaz of. |
| `pages.category.intro.camionnette` | La camionnette sert à un déménagement, au transport de meubles ou de matériel. Jusqu’à 3 500 kg de masse maximale, elle se conduit avec le permis B. | Mat der Camionnette plënnert Dir oder transportéiert Miwwelen oder Material. Bis 3.500 kg zulässegt Gesamtgewiicht fuert Dir se mam Führerschäin B. |
| `pages.category.vehiclesH2` | Nos véhicules | Eis Gefierer |
| `pages.category.licenceH2` | Quel permis ? | Wat fir e Führerschäin? |
| `pages.category.backToFinder` | Comparer avec toutes nos remorques | Mat all eisen Unhänger vergläichen |
| `pages.workshop.h1` | Mécanique et carrosserie à Erpeldange | Mechanik a Karosserie zu Ierpeldeng |
| `pages.workshop.lead` | Entretien, diagnostic et réparation de votre voiture ou camionnette. En carrosserie, nous réparons et repeignons votre véhicule après un accrochage. | Entretien, Diagnos a Reparatur vun Ärem Auto oder Ärer Camionnette. No engem klengen Accident reparéiere mir Äert Gefier a lackéieren et nei. |
| `pages.workshop.whatH2` | Ce que fait notre atelier | Dat mécht eisen Atelier |
| `pages.workshop.items.entretien` | Entretien et révision | Entretien a Revisioun |
| `pages.workshop.items.diagnostic` | Diagnostic des pannes | Feelerdiagnos |
| `pages.workshop.items.reparation` | Réparation mécanique | Mechanesch Reparaturen |
| `pages.workshop.items.carrosserie` | Carrosserie et peinture | Karosserie a Lack |
| `pages.workshop.extraMissing` | [UNBESTÄTIGT — weitere Leistungen laut Editus: Richtbank, Smart Repair, Ausbeulen, Turbo, 4x4, Restaurierung alter Autos; erst nach Bestätigung zeigen] | [UNBESTÄTIGT — weitere Leistungen laut Editus: Richtbank, Smart Repair, Ausbeulen, Turbo, 4x4, Restaurierung alter Autos; erst nach Bestätigung zeigen] |
| `pages.workshop.transparency` | Avant chaque travail, nous vous expliquons ce que nous allons faire. Vous recevez une facture détaillée. | Virun all Aarbecht erkläre mir Iech, wat mir maachen. Dir kritt eng detailléiert Rechnung. |
| `pages.workshop.transparencyMissing` | [UNBESTÄTIGT — Kostenvoranschlag vorher, detaillierte Rechnung?] | [UNBESTÄTIGT — Kostenvoranschlag vorher, detaillierte Rechnung?] |
| `pages.workshop.formH2` | Demander un rendez-vous | Rendez-vous ufroen |
| `pages.workshop.formIntro` | Dites-nous de quel véhicule il s’agit et ce qu’il faut faire. Nous vous rappelons pour fixer le rendez-vous. | Sot eis, ëm wat fir e Gefier et geet a wat ze maachen ass. Mir ruffen Iech zréck, fir e Rendez-vous auszemaachen. |
| `pages.sodablast.h1` | Décapage sodablast à Erpeldange | Sodablast zu Ierpeldeng |
| `pages.sodablast.lead` | Le sodablast projette du bicarbonate de soude pour décaper peinture, graisse et saleté. Ce décapage doux n’abîme pas les surfaces délicates : carrosserie ancienne, jantes, pièces mécaniques. | Beim Sodablast sprëtze mir Natron op d’Uewerfläch a maachen esou Lack, Fett an Dreck ewech. Dës mëll Method beschiedegt keng empfindlech Uewerflächen: al Karosserien, Felgen, mechanesch Deeler. |
| `pages.sodablast.whatH2` | Pour quoi ? | Fir wat? |
| `pages.sodablast.items.carrosserie` | Carrosseries anciennes, avant une restauration | Al Karosserien, virun enger Restauratioun |
| `pages.sodablast.items.jantes` | Jantes | Felgen |
| `pages.sodablast.items.pieces` | Pièces mécaniques | Mechanesch Deeler |
| `pages.sodablast.photosH2` | Avant et après | Virdrun an duerno |
| `pages.sodablast.photosMissing` | [FEHLT — Vorher-nachher-Fotos Sodablast] | [FEHLT — Vorher-nachher-Fotos Sodablast] |
| `pages.sodablast.whatsapp` | Envoyez-nous des photos sur WhatsApp pour un premier avis. | Schéckt eis Fotoen op WhatsApp fir eng éischt Aschätzung. |
| `pages.sodablast.whatsappText` | Bonjour, voici des photos pour un premier avis sur un décapage sodablast. | Moien, hei sinn e puer Fotoe fir eng éischt Aschätzung fir e Sodablast. |
| `pages.sodablast.whatsappLink` | Envoyer des photos sur WhatsApp | Fotoen op WhatsApp schécken |
| `pages.sodablast.formH2` | Demander un rendez-vous | Rendez-vous ufroen |
| `pages.trailersForSale.h1` | Remorques à vendre à Erpeldange | Unhänger kafen zu Ierpeldeng |
| `pages.trailersForSale.lead` | Nous vendons des remorques Saris, Humbaur et WM Meyer, pour les particuliers et les professionnels. | Mir verkafen Unhänger vu Saris, Humbaur a WM Meyer, fir Privatleit a Betriber. |
| `pages.trailersForSale.dealerMissing` | [UNBESTÄTIGT — Händlerstatus Saris, Humbaur, WM Meyer; Logos nur mit Freigabe] | [UNBESTÄTIGT — Händlerstatus Saris, Humbaur, WM Meyer; Logos nur mit Freigabe] |
| `pages.trailersForSale.adviceH2` | Quel permis pour quelle remorque ? | Wéi en Unhänger mat wéi engem Führerschäin? |
| `pages.trailersForSale.advice` | Nous vous aidons à choisir une remorque que votre voiture peut tracter et que votre permis autorise : taille, masse maximale, freinage. Notre guide de location vous montre les règles du permis avec des exemples. | Mir hëllefen Iech, en Unhänger ze wielen, deen Ären Auto zéie kann an deen Dir mat Ärem Führerschäin fueren dierft: Gréisst, zulässegt Gesamtgewiicht, Bremsen. Eis Unhängersich fir d’Lounen weist Iech d’Führerschäinreegele mat Beispiller. |
| `pages.trailersForSale.adviceLink` | Quel permis pour quelle remorque ? | Wéi en Unhänger mat wéi engem Führerschäin? |
| `pages.trailersForSale.stockH2` | Remorques en stock | Unhänger am Stock |
| `pages.trailersForSale.stockMissing` | [FEHLT — Anhänger auf Lager] | [FEHLT — Anhänger auf Lager] |
| `pages.trailersForSale.formH2` | Une question sur une remorque ? | Hutt Dir eng Fro zu engem Unhänger? |
| `pages.garden.h1` | Machines de jardin et de forêt à Erpeldange | Gaart- a Bëschmaschinnen zu Ierpeldeng |
| `pages.garden.lead` | Nous vendons et réparons des machines de jardin et de forêt, principalement des marques Honda et Stihl. | Mir verkafen a reparéieren Gaart- a Bëschmaschinnen, virun allem vun de Marken Honda a Stihl. |
| `pages.garden.dealerMissing` | [UNBESTÄTIGT — Händlerstatus Honda und Stihl; Logos nur mit Freigabe] | [UNBESTÄTIGT — Händlerstatus Honda und Stihl; Logos nur mit Freigabe] |
| `pages.garden.whatH2` | Vente et réparation | Verkaf a Reparatur |
| `pages.garden.text` | Tondeuse, débroussailleuse, tronçonneuse ou taille-haie : apportez votre machine à l’atelier ou demandez-nous conseil pour en choisir une nouvelle. | Rasemeeër, Fräischneider, Motorsee oder Heckeschéier: Bréngt Är Maschinn an den Atelier oder loosst Iech vun eis beroden, fir eng nei auszesichen. |
| `pages.garden.formH2` | Demander une réparation | Reparatur ufroen |
| `pages.contact.h1` | Contact et accès | Kontakt a Wee bei eis |
| `pages.contact.lead` | Garage Um Rond Point, 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre. Au rond-point, à côté de la station Aral. Téléphone +352 81 05 41, WhatsApp +352 621 373 272, info@rondpoint.lu. Nous parlons luxembourgeois, français, allemand, anglais et portugais. | Garage Um Rond Point, 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre. Um Rond-point, nieft der Aral-Tankstell. Telefon +352 81 05 41, WhatsApp +352 621 373 272, info@rondpoint.lu. Mir schwätze Lëtzebuergesch, Franséisch, Däitsch, Englesch a Portugisesch. |
| `pages.contact.waysH2` | Nous joindre | Esou erreecht Dir eis |
| `pages.contact.phone` | Téléphone | Telefon |
| `pages.contact.whatsapp` | WhatsApp | WhatsApp |
| `pages.contact.email` | E-mail | E-Mail |
| `pages.contact.paymentH2` | Paiement | Bezuelen |
| `pages.contact.payment` | En espèces, par carte Visa, Mastercard ou V PAY, avec Payconiq, Apple Pay ou PayPal, ou par virement. | Bar, mat Kaart (Visa, Mastercard oder V PAY), mat Payconiq, Apple Pay oder PayPal oder per Iwwerweisung. |
| `pages.contact.paymentMissing` | [UNBESTÄTIGT — Zahlungsmittel] | [UNBESTÄTIGT — Zahlungsmittel] |
| `pages.contact.formH2` | Nous écrire | Schreift eis |
| `pages.thanks.h1` | Votre demande est bien arrivée | Är Ufro ass ukomm |
| `pages.thanks.text` | Nous vous répondons [FEHLT — Antwortzeit, z. B. « le jour ouvrable suivant »]. C’est urgent ? Appelez le +352 81 05 41. | Mir äntweren Iech [FEHLT — Antwortzeit, z. B. « le jour ouvrable suivant »]. Ass et dréngend? Rufft +352 81 05 41 un. |
| `pages.thanks.back` | Retour à l’accueil | Zréck op d’Startsäit |
| `pages.notFound.h1` | Page introuvable | Säit net fonnt |
| `pages.notFound.text` | Cette page n’existe pas ou plus. Une voiture vendue disparaît de notre liste. | Dës Säit gëtt et net oder net méi. E verkaaften Auto verschwënnt vun eiser Lëscht. |
| `forms.optional` | facultatif | fakultativ |
| `forms.name` | Nom | Numm |
| `forms.phone` | Téléphone | Telefon |
| `forms.phoneHint` | Nous vous rappelons. | Mir ruffen Iech zréck. |
| `forms.email` | E-mail | E-Mail |
| `forms.message` | Message | Message |
| `forms.consent` | J’accepte que Garage Um Rond Point utilise mes données pour répondre à ma demande. Plus d’informations dans la {link}. | Ech sinn domat averstanen, datt Garage Um Rond Point meng Donnéeë benotzt, fir op meng Ufro z’äntweren. Méi Informatiounen an der {link}. |
| `forms.consentLink` | protection des données | Dateschutzerklärung |
| `forms.honeypot` | Ne remplissez pas ce champ | Fëllt dëst Feld net aus |
| `forms.choose` | Choisissez… | Wielt … |
| `forms.sending` | Envoi en cours… | Gëtt geschéckt … |
| `forms.successH` | Votre demande est bien arrivée. | Är Ufro ass ukomm. |
| `forms.successText` | Nous vous répondons dès que possible. C’est urgent ? Appelez le +352 81 05 41. | Mir äntweren Iech sou séier wéi méiglech. Ass et dréngend? Rufft +352 81 05 41 un. |
| `forms.errorSummary` | Vérifiez les champs signalés. | Iwwerpréift déi markéiert Felder. |
| `forms.errorSend` | L’envoi n’a pas fonctionné. Réessayez ou appelez-nous au +352 81 05 41. | D’Ufro gouf net geschéckt. Probéiert et nach eng Kéier oder rufft eis un op +352 81 05 41. |
| `forms.errorRate` | Vous avez envoyé beaucoup de demandes aujourd’hui. Appelez-nous au +352 81 05 41. | Dir hutt haut scho vill Ufroe geschéckt. Rufft eis un op +352 81 05 41. |
| `forms.errors.name` | Indiquez votre nom. | Gitt Ären Numm un. |
| `forms.errors.phone` | Indiquez un numéro de téléphone pour que nous puissions vous rappeler. | Gitt eng Telefonsnummer un, fir datt mir Iech zréckruffe kënnen. |
| `forms.errors.phoneInvalid` | Ce numéro semble incomplet. Indiquez-le avec l’indicatif, par exemple +352 621 123 456. | Dës Nummer schéngt net komplett ze sinn. Gitt se mat der Landesvirwiel un, zum Beispill +352 621 123 456. |
| `forms.errors.email` | Cette adresse e-mail n’est pas valide. Elle doit contenir un @, par exemple nom@exemple.lu. | Dës E-Mail-Adress ass net gëlteg. Si muss en @ enthalen, zum Beispill numm@beispill.lu. |
| `forms.errors.consent` | Cochez la case pour que nous puissions utiliser vos données pour vous répondre. | Kräizt d’Këschtchen un, fir datt mir Är Donnéeë benotzen dierfen, fir Iech z’äntweren. |
| `forms.errors.vehicle` | Choisissez une remorque ou un véhicule. | Wielt en Unhänger oder e Gefier. |
| `forms.errors.from` | Indiquez la date de début. | Gitt den Ufanksdatum un. |
| `forms.errors.to` | Indiquez la date de fin. | Gitt den Enddatum un. |
| `forms.errors.toBeforeFrom` | La date « Au » ne peut pas être avant la date « Du ». | Den Datum „Bis“ däerf net virum Datum „Vun“ leien. |
| `forms.errors.past` | Choisissez une date à partir d’aujourd’hui. | Wielt en Datum vun haut un. |
| `forms.errors.wish` | Choisissez ce que vous souhaitez. | Wielt, wat Dir wëllt. |
| `forms.errors.reason` | Choisissez pour quoi vous venez. | Wielt, fir wat Dir kommt. |
| `forms.errors.machine` | Indiquez le véhicule ou la machine. | Gitt d’Gefier oder d’Maschinn un. |
| `forms.errors.work` | Décrivez ce qu’il faut faire. | Beschreift, wat ze maachen ass. |
| `forms.errors.subject` | Choisissez un sujet. | Wielt en Theema. |
| `forms.errors.message` | Écrivez votre message. | Schreift Äre Message. |
| `forms.rental.vehicle` | Remorque ou véhicule souhaité | Gewënschten Unhänger oder Gefier |
| `forms.rental.from` | Du | Vun |
| `forms.rental.to` | Au | Bis |
| `forms.rental.licence` | Votre permis | Äre Führerschäin |
| `forms.rental.licenceNone` | Pas précisé | Keng Angab |
| `forms.rental.licenceB` | B | B |
| `forms.rental.licenceB96` | B + code 96 | B + Code 96 |
| `forms.rental.licenceBE` | BE | BE |
| `forms.rental.submit` | Envoyer la demande de location | Lounufro schécken |
| `forms.rental.noFleet` | Dites-nous dans le message ce que vous souhaitez louer. | Schreift eis am Message, wat Dir wëllt lounen. |
| `forms.rental.other` | Autre, précisé dans le message | Eppes anescht, am Message beschriwwen |
| `forms.car.carLabel` | Voiture | Auto |
| `forms.car.wish` | Vous souhaitez | Dir wëllt |
| `forms.car.wishTest` | Un essai | Eng Probefahrt |
| `forms.car.wishInfo` | Plus d’informations | Méi Informatiounen |
| `forms.car.wishTradeIn` | Faire reprendre ma voiture | Reprise vu mengem Auto |
| `forms.car.tradeInH` | Seulement pour une reprise | Nëmme fir eng Reprise |
| `forms.car.tradeMake` | Marque et modèle | Mark a Modell |
| `forms.car.tradeYear` | Année | Joer |
| `forms.car.tradeKm` | Kilométrage | Kilometerstand |
| `forms.car.title` | Demander des informations | Informatiounen ufroen |
| `forms.car.submit` | Envoyer ma demande | Ufro schécken |
| `forms.workshop.reason` | Pour quoi ? | Fir wat? |
| `forms.workshop.reasonMaintenance` | Entretien | Entretien |
| `forms.workshop.reasonRepair` | Panne ou réparation | Pann oder Reparatur |
| `forms.workshop.reasonBody` | Carrosserie | Karosserie |
| `forms.workshop.reasonSodablast` | Sodablast | Sodablast |
| `forms.workshop.reasonGarden` | Machine de jardin ou forêt | Gaart- oder Bëschmaschinn |
| `forms.workshop.machine` | Véhicule ou machine | Gefier oder Maschinn |
| `forms.workshop.machineHint` | Marque, modèle et année, par exemple : VW Golf 2018. | Mark, Modell a Joer, zum Beispill: VW Golf 2018. |
| `forms.workshop.work` | Que faut-il faire ? | Wat ass ze maachen? |
| `forms.workshop.date` | Date souhaitée | Wonschdatum |
| `forms.workshop.photos` | Pour la carrosserie ou le sodablast, envoyez-nous des photos sur WhatsApp : +352 621 373 272. | Fir Karosserie oder Sodablast schéckt eis Fotoen op WhatsApp: +352 621 373 272. |
| `forms.workshop.submit` | Demander un rendez-vous | Rendez-vous ufroen |
| `forms.contact.subject` | Sujet | Theema |
| `forms.contact.subjectQuestion` | Question générale | Allgemeng Fro |
| `forms.contact.subjectTrailer` | Achat de remorque | Unhänger kafen |
| `forms.contact.subjectDepot` | Dépôt-vente | Kommissiounsverkaf |
| `forms.contact.subjectOther` | Autre | Soss eppes |
| `forms.contact.submit` | Envoyer le message | Message schécken |
| `seo.home.title` | Garage Um Rond Point Erpeldange – remorques, autos, atelier | Garage Um Rond Point Erpeldange – Unhänger, Autoen, Atelier |
| `seo.home.description` | Au rond-point d’Erpeldange, entre Ettelbruck et Diekirch : location de remorques et camionnettes, voitures neuves et d’occasion, mécanique et carrosserie. | Garage um Rond-point zu Ierpeldeng (Erpeldange), tëscht Ettelbréck an Dikrech: Unhänger a Camionnetten lounen, nei Autoen an Occasiounen, Mechanik a Karosserie. |
| `seo.rental.title` | Location de remorques à Erpeldange, près d’Ettelbruck | Unhänger lounen zu Erpeldange bei Ettelbréck \| Um Rond Point |
| `seo.rental.description` | Porte-voiture, porte-moto, benne basculante, remorque frigorifique ou camionnette : voyez quelle remorque convient, son prix et si votre permis suffit. | Autosunhänger, Motosunhänger, Kipper, Killunhänger oder Camionnette zu Erpeldange: Kuckt, wéi en Unhänger passt, wat e kascht an ob Äre Führerschäin duergeet. |
| `seo.category.title.porte-voiture` | Location remorque porte-voiture à Erpeldange \| Um Rond Point | Autosunhänger lounen zu Erpeldange \| Garage Um Rond Point |
| `seo.category.title.porte-moto` | Location remorque porte-moto à Erpeldange \| Um Rond Point | Motosunhänger lounen zu Erpeldange \| Garage Um Rond Point |
| `seo.category.title.benne` | Location benne basculante à Erpeldange \| Um Rond Point | Kipper lounen zu Erpeldange bei Ettelbréck \| Um Rond Point |
| `seo.category.title.frigorifique` | Location remorque frigorifique Erpeldange \| Um Rond Point | Killunhänger lounen zu Erpeldange \| Garage Um Rond Point |
| `seo.category.title.camionnette` | Location camionnette à Erpeldange \| Garage Um Rond Point | Camionnette lounen zu Erpeldange \| Garage Um Rond Point |
| `seo.category.description.porte-voiture` | Louez une remorque porte-voiture au rond-point d’Erpeldange, près d’Ettelbruck : dimensions, charge utile, prix et permis nécessaire pour chaque remorque. | Lount en Autosunhänger um Rond-point zu Erpeldange, no bei Ettelbréck: Moossen, Notzlaascht, Präis an néidege Führerschäin fir all Unhänger an eiser Flott. |
| `seo.category.description.porte-moto` | Louez une remorque porte-moto au rond-point d’Erpeldange, près d’Ettelbruck : dimensions, charge utile, prix et permis nécessaire pour chaque remorque. | Lount e Motosunhänger um Rond-point zu Erpeldange, no bei Ettelbréck: Moossen, Notzlaascht, Präis an néidege Führerschäin fir all Unhänger an eiser Flott. |
| `seo.category.description.benne` | Louez une benne basculante pour terre, gravats ou déchets verts au rond-point d’Erpeldange, près d’Ettelbruck : charge utile, prix et permis nécessaire. | Lount e Kipper fir Äerd, Bauschutt oder Gréngschnëtt um Rond-point zu Erpeldange, no bei Ettelbréck: Notzlaascht, Präis a wat fir e Führerschäin Dir braucht. |
| `seo.category.description.frigorifique` | Louez une remorque frigorifique pour votre fête ou festival au rond-point d’Erpeldange, près d’Ettelbruck : volume, température, prix et permis nécessaire. | Lount e Killunhänger fir Äert Fest oder Festival um Rond-point zu Erpeldange, no bei Ettelbréck: Bannevolumen, Temperatur, Präis an néidege Führerschäin. |
| `seo.category.description.camionnette` | Louez une camionnette pour un déménagement ou du matériel au rond-point d’Erpeldange, près d’Ettelbruck. Jusqu’à 3 500 kg, le permis B suffit. Prix au jour. | Lount eng Camionnette fir en Ëmzug oder Material um Rond-point zu Erpeldange, no bei Ettelbréck. Bis 3.500 kg geet de Führerschäin B duer. Präis pro Dag. |
| `seo.cars.title` | Voitures neuves et d’occasion à Erpeldange \| Um Rond Point | Nei Autoen an Occasiounen zu Erpeldange \| Um Rond Point |
| `seo.cars.description` | Toutes les voitures en stock au Garage Um Rond Point à Erpeldange, avec prix, kilométrage et photos. Liste mise à jour chaque matin. Essai sur rendez-vous. | All d’Autoen am Stock vun der Garage Um Rond Point zu Erpeldange, mat Präis, Kilometerstand a Fotoen. Lëscht all Moien aktualiséiert. Probefahrt op Rendez-vous. |
| `seo.car.suffixLong` |  \| Garage Um Rond Point |  \| Garage Um Rond Point |
| `seo.car.suffixShort` |  \| Um Rond Point |  \| Um Rond Point |
| `seo.car.place` |  à Erpeldange |  zu Ierpeldeng |
| `seo.car.descTail` | À voir au Garage Um Rond Point à Erpeldange. | Ze gesinn an der Garage Um Rond Point zu Ierpeldeng. |
| `seo.car.descExtra[0]` |  Essai sur rendez-vous. |  Probefahrt op Rendez-vous. |
| `seo.car.descExtra[1]` |  Entre Ettelbruck et Diekirch. |  Tëscht Ettelbréck an Dikrech. |
| `seo.car.descExtra[2]` |  Appelez le +352 81 05 41. |  Rufft +352 81 05 41 un. |
| `seo.car.descGearbox` | boîte {gearbox} | Schaltung: {gearbox} |
| `seo.car.soldTitle` | {make} {model} vendue \| Garage Um Rond Point, Erpeldange | {make} {model} verkaaft \| Garage Um Rond Point, Erpeldange |
| `seo.car.soldDescription` | Cette {make} {model} a été vendue ou n’est plus en stock. Découvrez les autres voitures neuves et d’occasion du Garage Um Rond Point à Erpeldange. | {make} {model}: Dësen Auto ass verkaaft oder net méi am Stock. Kuckt déi aner nei Autoen an Occasioune vun der Garage Um Rond Point zu Erpeldange. |
| `seo.workshop.title` | Mécanique et carrosserie à Erpeldange \| Garage Um Rond Point | Mechanik a Karosserie zu Erpeldange \| Garage Um Rond Point |
| `seo.workshop.description` | Entretien, diagnostic, réparation, carrosserie et peinture au rond-point d’Erpeldange, près d’Ettelbruck et Diekirch. Demandez un rendez-vous en ligne. | Entretien, Diagnos, Reparatur, Karosserie a Lackéierung an der Garage um Rond-point zu Erpeldange, bei Ettelbréck an Dikrech. Frot online e Rendez-vous un. |
| `seo.sodablast.title` | Décapage sodablast au Luxembourg \| Garage Um Rond Point | Sodablast zu Lëtzebuerg \| Garage Um Rond Point, Erpeldange |
| `seo.sodablast.description` | Le sodablast décape peinture et saleté sans abîmer la surface : voiture ancienne, jantes, pièces mécaniques. À Erpeldange, entre Ettelbruck et Diekirch. | Sodablast mécht Lack an Dreck ewech, ouni d’Uewerfläch ze beschiedegen: al Autoen, Felgen, mechanesch Deeler. Zu Erpeldange, tëscht Ettelbréck an Dikrech. |
| `seo.trailersForSale.title` | Remorques à vendre : Humbaur, Saris, WM Meyer \| Erpeldange | Unhänger kafen: Humbaur, Saris, WM Meyer \| Erpeldange |
| `seo.trailersForSale.description` | Achetez votre remorque à Erpeldange : Humbaur, Saris ou WM Meyer. Nous vous aidons à choisir la taille et le poids adaptés à votre voiture et à votre permis. | Kaaft Ären Unhänger zu Erpeldange: Humbaur, Saris oder WM Meyer. Mir hëllefen Iech, Gréisst a Gewiicht passend zu Ärem Auto an Ärem Führerschäin ze wielen. |
| `seo.garden.title` | Machines de jardin et forêt Honda et Stihl à Erpeldange | Gaart- a Bëschmaschinne vun Honda a Stihl zu Erpeldange |
| `seo.garden.description` | Vente et réparation de machines de jardin et de forêt, principalement Honda et Stihl, au Garage Um Rond Point à Erpeldange, entre Ettelbruck et Diekirch. | Verkaf a Reparatur vu Gaart- a Bëschmaschinnen, virun allem vun Honda a Stihl, an der Garage Um Rond Point zu Erpeldange, tëscht Ettelbréck an Dikrech. |
| `seo.contact.title` | Contact et accès \| Garage Um Rond Point, Erpeldange | Kontakt a Wee bei eis \| Garage Um Rond Point, Erpeldange |
| `seo.contact.description` | 1, rue du Viaduc à Erpeldange-sur-Sûre, au rond-point à côté de la station Aral. Lundi à vendredi 7h45–12h et 13h–18h, samedi 8h–12h. Tél. +352 81 05 41. | 1, rue du Viaduc zu Erpeldange-sur-Sûre, um Rond-point nieft der Aral. Méindeg bis Freideg 7:45–12 an 13–18 Auer, Samschdeg 8–12 Auer. Tel. +352 81 05 41. |
| `seo.thanks.title` | Demande envoyée \| Garage Um Rond Point, Erpeldange-sur-Sûre | Ufro geschéckt \| Garage Um Rond Point, Erpeldange-sur-Sûre |
| `seo.thanks.description` | Votre demande est bien arrivée au Garage Um Rond Point à Erpeldange. Nous vous répondons rapidement. C’est urgent ? Appelez-nous au +352 81 05 41, merci. | Är Ufro ass bei der Garage Um Rond Point zu Erpeldange ukomm. Mir äntweren Iech séier. Ass et dréngend? Rufft eis un op +352 81 05 41. Merci villmools! |
| `seo.legal.title` | Mentions légales \| Garage Um Rond Point, Erpeldange-sur-Sûre | Impressum \| Garage Um Rond Point, Erpeldange-sur-Sûre |
| `seo.legal.description` | Mentions légales du Garage Um Rond Point S.à r.l., 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre : éditeur, RCS B296148, TVA LU36559673, hébergement du site. | Impressum vun der Garage Um Rond Point S.à r.l., 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre: Erausgeber, Handelsregister B296148, TVA LU36559673, Hosting. |
| `seo.privacy.title` | Protection des données \| Garage Um Rond Point, Erpeldange | Dateschutzerklärung \| Garage Um Rond Point, Erpeldange |
| `seo.privacy.description` | Quelles données le Garage Um Rond Point traite quand vous nous écrivez, pourquoi, combien de temps et quels sont vos droits. Sans cookies, sans outil de suivi. | Wéi eng Donnéeën d’Garage Um Rond Point veraarbecht, wann Dir eis schreift, firwat, wéi laang a wéi eng Rechter Dir hutt. Ouni Cookies, ouni Tracking-Tools. |
| `legal.h1` | Mentions légales | Impressum |
| `legal.publisherH2` | Éditeur du site | Erausgeber vun der Websäit |
| `legal.company` | Raison sociale | Firmennumm |
| `legal.legalForm` | Forme juridique | Rechtsform |
| `legal.address` | Siège | Sëtz |
| `legal.phone` | Téléphone | Telefon |
| `legal.email` | E-mail | E-Mail |
| `legal.rcs` | Registre de commerce | Handelsregister |
| `legal.vat` | Numéro de TVA | TVA-Nummer |
| `legal.registered` | Immatriculation | Androung |
| `legal.manager` | Gérant | Geschäftsféierer |
| `legal.permit` | Autorisation d’établissement | Niederlassungserlaabnes (Autorisation d’établissement) |
| `legal.capital` | Capital social | Gesellschaftskapital |
| `legal.managerMissing` | [UNBESTÄTIGT — Gérant David Moreira laut Editus] | [UNBESTÄTIGT — Gérant David Moreira laut Editus] |
| `legal.permitMissing` | [FEHLT — Nummer der Gewerbegenehmigung] | [FEHLT — Nummer der Gewerbegenehmigung] |
| `legal.capitalMissing` | [FEHLT — Gesellschaftskapital] | [FEHLT — Gesellschaftskapital] |
| `legal.hostingH2` | Hébergement | Hosting |
| `legal.hosting` | Le site est hébergé par GitHub Pages, un service de GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis. | D’Websäit gëtt vu GitHub Pages gehost, engem Service vu GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, Vereenegt Staaten. |
| `legal.contentH2` | Contenu | Inhalt |
| `legal.content` | Les annonces de voitures reprennent nos propres annonces publiées sur LuxAuto et AutoScout24. Les prix et caractéristiques peuvent changer ; seule l’offre confirmée au garage fait foi. | D’Autosannoncen iwwerhuelen eis eegen Annoncen op LuxAuto an AutoScout24. Präisser an technesch Donnéeë kënne sech änneren; verbindlech ass eleng d’Offer, déi an der Garage bestätegt gëtt. |
| `legal.photosH2` | Photos et plan | Fotoen a Plang |
| `legal.photos` | Plan du rond-point dessiné d’après les données OpenStreetMap (© les contributeurs d’OpenStreetMap, licence ODbL). Photos des voitures : nos propres annonces. | Plang vum Rond-point, gezeechent no Date vun OpenStreetMap (© OpenStreetMap-Mataarbechter, Lizenz ODbL). Fotoe vun den Autoen: eis eegen Annoncen. |
| `legal.fontH2` | Police de caractères | Schrëft |
| `legal.font` | Archivo, Omnibus-Type, SIL Open Font License 1.1. | Archivo, Omnibus-Type, SIL Open Font License 1.1. |
| `privacy.h1` | Protection des données | Dateschutzerklärung |
| `privacy.intro` | Nous traitons vos données uniquement pour répondre à vos demandes. Ce site ne dépose pas de cookies et n’utilise pas d’outil de suivi ni de publicité. | Mir veraarbechten Är Donnéeën nëmmen, fir op Är Ufroen z’äntweren. Dës Websäit setzt keng Cookies a benotzt keng Tools fir Tracking oder Reklamm. |
| `privacy.controllerH2` | Responsable du traitement | Verantwortlechen |
| `privacy.controller` | GARAGE UM ROND POINT S.à r.l., 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre, Luxembourg. Téléphone +352 81 05 41, info@rondpoint.lu. | Garage Um Rond Point S.à r.l., 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre, Lëtzebuerg. Telefon +352 81 05 41, info@rondpoint.lu. |
| `privacy.formsH2` | Formulaires de demande | Ufroformulairen |
| `privacy.forms` | Quand vous envoyez un formulaire, nous recevons les données que vous saisissez : nom, téléphone, e-mail si vous l’indiquez, votre message et les détails de votre demande (par exemple dates de location, véhicule, rendez-vous souhaité). Nous les utilisons pour vous répondre et préparer une offre ou un rendez-vous. | Wann Dir e Formulaire schéckt, kréie mir d’Donnéeën, déi Dir agitt: Numm, Telefon, E-Mail, wann Dir se ugitt, Äre Message an d’Detailer vun Ärer Ufro (zum Beispill Lounzäit, Gefier, gewënschte Rendez-vous). Mir benotzen se, fir Iech z’äntweren an eng Offer oder e Rendez-vous virzebereeden. |
| `privacy.legalBasis` | Base légale : votre consentement (art. 6, paragraphe 1, point a du RGPD), que vous donnez en cochant la case, et les mesures précontractuelles à votre demande (art. 6, paragraphe 1, point b du RGPD). Vous pouvez retirer votre consentement à tout moment par e-mail ou par téléphone. | Rechtsgrondlag: Är Awëllegung (Art. 6 Abs. 1 Buchst. a DSGVO), déi Dir gitt, wann Dir d’Këschtchen ukräizt, a virvertraglech Moossnamen op Är Ufro (Art. 6 Abs. 1 Buchst. b DSGVO). Dir kënnt Är Awëllegung all Moment per E-Mail oder Telefon zréckzéien. |
| `privacy.storage` | Votre demande est enregistrée dans une base de données chez Supabase (région Union européenne) et nous est transmise par e-mail via [UNBESTÄTIGT — EU-Mailanbieter, mit Nave klären]. Les demandes sont supprimées automatiquement après 90 jours [UNBESTÄTIGT — Frist mit Kunde bestätigen]. Les échanges qui mènent à un contrat sont conservés selon les obligations comptables. | Är Ufro gëtt an enger Datebank bei Supabase (Regioun Europäesch Unioun) gespäichert an eis per E-Mail iwwer [UNBESTÄTIGT — EU-Mailanbieter, mit Nave klären] zougestallt. D’Ufroe ginn no 90 Deeg automatesch geläscht [UNBESTÄTIGT — Frist mit Kunde bestätigen]. Korrespondenz, déi zu engem Kontrakt féiert, bewahre mir no de Buchhaltungsflichten op. |
| `privacy.abuse` | Pour limiter les abus, nous enregistrons une empreinte cryptographique (hachage) de votre adresse IP pendant 24 heures. Elle ne permet pas de retrouver votre adresse. | Fir Mëssbrauch ze begrenzen, späichere mir 24 Stonnen laang e kryptografeschen Hashwäert vun Ärer IP-Adress. Doraus kann een Är Adress net erëmfannen. |
| `privacy.hostingH2` | Hébergement et journaux du serveur | Hosting a Server-Protokoller |
| `privacy.hosting` | Le site est hébergé par GitHub Pages (GitHub, Inc., États-Unis). À chaque visite, GitHub traite votre adresse IP et des données techniques pour livrer les pages et assurer la sécurité. GitHub est certifié selon le cadre de protection des données UE–États-Unis (EU-US Data Privacy Framework). Base légale : notre intérêt légitime à un site sûr et disponible (art. 6, paragraphe 1, point f du RGPD). | D’Websäit gëtt vu GitHub Pages (GitHub, Inc., Vereenegt Staaten) gehost. Bei all Besuch veraarbecht GitHub Är IP-Adress an technesch Donnéeën, fir d’Säiten auszeliwweren an d’Sécherheet ze garantéieren. GitHub ass nom EU-US-Dateschutzrumm (EU-US Data Privacy Framework) zertifiéiert. Rechtsgrondlag: eist berechtegt Interessi un enger Websäit, déi sécher an erreechbar ass (Art. 6 Abs. 1 Buchst. f DSGVO). |
| `privacy.linksH2` | Liens vers d’autres services | Linken op aner Servicer |
| `privacy.links` | Le site ne charge aucun contenu externe : polices, photos et plan sont hébergés avec le site. Les liens vers Google Maps, WhatsApp, Facebook, Instagram, TikTok, LuxAuto et AutoScout24 ne s’ouvrent que si vous cliquez. Ces services traitent alors vos données selon leurs propres règles. WhatsApp appartient à Meta Platforms ; si vous nous écrivez sur WhatsApp, Meta traite votre numéro et vos messages. | D’Websäit lued keen externen Inhalt: Schrëften, Fotoen a Plang sinn zesumme mat der Websäit gehost. D’Linken op Google Maps, WhatsApp, Facebook, Instagram, TikTok, LuxAuto an AutoScout24 ginn nëmmen op, wann Dir drop klickt. Dës Servicer veraarbechten Är Donnéeën dann no hiren eegene Reegelen. WhatsApp gehéiert zu Meta Platforms; wann Dir eis op WhatsApp schreift, veraarbecht Meta Är Nummer an Är Messagen. |
| `privacy.rightsH2` | Vos droits | Är Rechter |
| `privacy.rights` | Vous pouvez demander l’accès à vos données, leur rectification, leur effacement, la limitation du traitement et la portabilité, et vous opposer au traitement. Écrivez-nous à info@rondpoint.lu. Vous pouvez aussi déposer une réclamation auprès de la Commission nationale pour la protection des données (CNPD), 15, boulevard du Jazz, L-4370 Belvaux, cnpd.public.lu. | Dir kënnt Accès op Är Donnéeën, hir Korrektur, hir Läschung, d’Aschränkung vun der Veraarbechtung an d’Portabilitéit vun den Donnéeë verlaangen an der Veraarbechtung widderspriechen. Schreift eis op info@rondpoint.lu. Dir kënnt och eng Reklamatioun bei der Nationaler Kommissioun fir den Dateschutz (CNPD) aginn: 15, boulevard du Jazz, L-4370 Belvaux, cnpd.public.lu. |
| `privacy.updated` | Mise à jour : {date} | Stand: {date} |
| `offer.label` | Nos services en bref | Eis Servicer op ee Bléck |
| `offer.sub.rental` | Remorques et camionnettes | Unhänger a Camionnetten |
| `offer.sub.cars` | Stock à jour chaque matin | All Moien aktualiséiert |
| `offer.sub.workshop` | Mécanique et carrosserie | Mechanik a Karosserie |
| `offer.sub.trailers` | Saris, Humbaur, WM Meyer | Saris, Humbaur, WM Meyer |
| `offer.sub.garden` | Honda et Stihl | Honda a Stihl |
| `offer.sub.sodablast` | Décapage doux | Schounend ofbeizen |
| `about.h2` | Qui sommes-nous ? | Iwwer eis |
| `about.text` | Le Garage Um Rond Point, c’est votre garage au rond-point d’Erpeldange, entre Ettelbruck et Diekirch. Location de remorques et de camionnettes, vente de voitures et de remorques, atelier et machines de jardin : tout se trouve à la même adresse. Passez nous voir, nous parlons votre langue. | D’Garage Um Rond Point ass Är Garage um Rond-point zu Ierpeldeng, tëscht Ettelbréck an Dikrech. Unhänger a Camionnetten lounen, Autoen an Unhänger kafen, Atelier a Gaartmaschinnen: alles op enger Adress. Kommt laanscht – mir schwätzen Är Sprooch. |
| `about.link` | Nous trouver | Esou fannt Dir eis |
| `about.photoAlt` | Mécanicien qui tend une clé de voiture | Mecanicien reecht en Autosschlëssel |
| `details.points.workshop[0]` | Entretien et révision | Entretien a Revisioun |
| `details.points.workshop[1]` | Diagnostic des pannes | Feelerdiagnos |
| `details.points.workshop[2]` | Réparation mécanique | Mechanesch Reparatur |
| `details.points.workshop[3]` | Carrosserie et peinture | Karosserie a Lack |
| `details.points.sodablast[0]` | Décapage doux au bicarbonate de soude | Schounend Ofbeizen mat Natron |
| `details.points.sodablast[1]` | Carrosseries anciennes, jantes, pièces mécaniques | Al Karosserien, Felgen, mechanesch Deeler |
| `details.points.sodablast[2]` | Premier avis sur photos par WhatsApp | Éischt Aschätzung per Foto iwwer WhatsApp |
| `details.points.garden[0]` | Vente de machines de jardin et de forêt | Verkaf vu Gaart- a Bëschmaschinnen |
| `details.points.garden[1]` | Réparation de vos machines | Reparatur vun Äre Maschinnen |
| `details.points.garden[2]` | Principalement Honda et Stihl | Virun allem Honda a Stihl |
| `details.points.trailers[0]` | Remorques Saris, Humbaur et WM Meyer | Unhänger vu Saris, Humbaur a WM Meyer |
| `details.points.trailers[1]` | Pour particuliers et professionnels | Fir Privatleit a Betriber |
| `details.points.trailers[2]` | Conseil sur le poids et le permis | Berodung zu Gewiicht a Führerschäin |
| `details.workshop.entretienH` | Entretien et révision | Entretien a Revisioun |
| `details.workshop.entretien` | Un entretien régulier garde votre voiture fiable et sûre : vidange, filtres, freins, niveaux et contrôle général. Indiquez-nous dans votre demande le kilométrage et la date du dernier entretien. | E reegelméissegen Entretien hält Ären Auto zouverlässeg a sécher: Uelegwiessel, Filteren, Bremsen, Niveauen an allgemeng Kontroll. Sot eis an Ärer Ufro de Kilometerstand an den Datum vum leschten Entretien. |
| `details.workshop.diagnosticH` | Diagnostic des pannes | Feelerdiagnos |
| `details.workshop.diagnostic` | Un voyant s’allume, un bruit inhabituel, la voiture démarre mal : décrivez ce que vous remarquez et depuis quand. Le diagnostic permet de trouver la cause avant de réparer. | Eng Warnlut geet un, en ongewinnte Geräisch, den Auto spréngt schlecht un: Beschreift, wat Dir mierkt a zënter wéini. D’Diagnos fënnt d’Ursaach, ier reparéiert gëtt. |
| `details.workshop.reparationH` | Réparation mécanique | Mechanesch Reparatur |
| `details.workshop.reparation` | Après le diagnostic, nous réparons votre voiture ou votre camionnette dans notre atelier au rond-point d’Erpeldange. | No der Diagnos reparéiere mir Ären Auto oder Är Camionnette an eisem Atelier um Rond-point zu Ierpeldeng. |
| `details.workshop.carrosserieH` | Carrosserie et peinture | Karosserie a Lack |
| `details.workshop.carrosserie` | Après un accrochage, nous réparons la carrosserie et repeignons les éléments abîmés. Envoyez-nous des photos des dégâts sur WhatsApp pour un premier avis. | No engem klengen Accident reparéiere mir d’Karosserie a lackéieren déi beschiedegt Deeler nei. Schéckt eis Fotoe vum Schued iwwer WhatsApp fir eng éischt Aschätzung. |
| `details.workshop.processH2` | Comment prendre rendez-vous | Esou kritt Dir e Rendez-vous |
| `details.workshop.process[0]` | Décrivez votre véhicule et ce qu’il faut faire, dans le formulaire, par téléphone ou sur WhatsApp. | Beschreift Äert Gefier a wat ze maachen ass – am Formulaire, um Telefon oder iwwer WhatsApp. |
| `details.workshop.process[1]` | Nous vous rappelons pour fixer la date. | Mir ruffen Iech zréck fir den Datum ofzemaachen. |
| `details.workshop.process[2]` | Vous déposez votre véhicule au garage, au 1, rue du Viaduc. | Dir bréngt Äert Gefier an d’Garage, 1, rue du Viaduc. |
| `details.sodablast.explainH2` | Comment fonctionne le sodablast ? | Wéi funktionéiert Sodablast? |
| `details.sodablast.explain` | Le bicarbonate de soude est projeté sur la surface avec de l’air comprimé. Plus tendre que le sable, il enlève la peinture, la graisse et la saleté sans creuser le métal. C’est pourquoi on l’utilise pour les pièces fragiles et les carrosseries anciennes. | Natron gëtt mat Drockloft op d’Uewerfläch gestraalt. Et ass méi mëll wéi Sand an hëlt Lack, Fett a Knascht ewech, ouni d’Metall unzegräifen. Dofir gëtt et fir empfindlech Deeler an al Karosserien benotzt. |
| `details.sodablast.explain2` | Le décapage met à nu la surface d’origine : vous voyez l’état réel du métal avant une réparation ou une nouvelle peinture. | D’Ofbeizen leet déi ursprénglech Uewerfläch fräi: Dir gesitt de richtegen Zoustand vum Metall virun enger Reparatur oder engem neie Lack. |
| `details.sodablast.processH2` | Comment se passe un décapage | Esou leeft d’Ofbeizen of |
| `details.sodablast.process[0]` | Envoyez-nous des photos de la voiture ou de la pièce sur WhatsApp. | Schéckt eis Fotoe vum Auto oder vum Deel iwwer WhatsApp. |
| `details.sodablast.process[1]` | Nous vous donnons un premier avis. | Dir kritt eng éischt Aschätzung. |
| `details.sodablast.process[2]` | Nous fixons ensemble un rendez-vous au garage. | Mir maachen zesummen e Rendez-vous an der Garage. |
| `details.garden.saleH2` | Vente | Verkaf |
| `details.garden.sale` | Tondeuse, débroussailleuse, tronçonneuse ou taille-haie : nous vendons des machines de jardin et de forêt, principalement des marques Honda et Stihl. Dites-nous la taille de votre terrain et ce que vous voulez faire, nous vous conseillons pour le choix. | Rasemeeër, Fräischneider, Motorsee oder Heckeschéier: Mir verkafe Gaart- a Bëschmaschinnen, virun allem vun de Marken Honda a Stihl. Sot eis, wéi grouss Ären Terrain ass a wat Dir wëllt maachen, mir beroden Iech beim Wielen. |
| `details.garden.repairH2` | Réparation | Reparatur |
| `details.garden.repair` | La tondeuse ne démarre plus, la tronçonneuse coupe mal, la débroussailleuse perd de la puissance ? Apportez votre machine à l’atelier ou décrivez le problème dans le formulaire. | De Rasemeeër spréngt net méi un, d’Motorsee schneit schlecht, de Fräischneider verléiert Kraaft? Bréngt Är Maschinn an den Atelier oder beschreift de Problem am Formulaire. |
| `details.trailers.chooseH2` | Bien choisir sa remorque | De richtegen Unhänger wielen |
| `details.trailers.masseH` | Masse maximale | Zulässegt Gesamtgewiicht |
| `details.trailers.masse` | Elle décide du permis nécessaire. Jusqu’à 750 kg, le permis B suffit ; au-delà, cela dépend de votre voiture. | Et bestëmmt, wéi e Führerschäin Dir braucht. Bis 750 kg geet de Führerschäin B duer, doriwwer hänkt et vun Ärem Auto of. |
| `details.trailers.freinH` | Freinage | Bremsen |
| `details.trailers.frein` | Une remorque de plus de 750 kg de masse maximale doit être équipée de freins. | En Unhänger mat méi wéi 750 kg zulässegt Gesamtgewiicht muss gebremst sinn. |
| `details.trailers.chargeH` | Charge remorquable | Unhängelaascht |
| `details.trailers.charge` | Votre voiture ne peut pas tracter plus que la valeur du champ O.1 (remorque freinée) ou O.2 (non freinée) du certificat d’immatriculation. | Ären Auto dierf net méi zéie wéi am Feld O.1 (gebremst) oder O.2 (ongebremst) vun der Carte grise steet. |
| `details.trailers.usageH` | Forme et dimensions | Bauaart a Moossen |
| `details.trailers.usage` | Plateau, benne, porte-voiture ou fourgon : la bonne remorque dépend de ce que vous transportez le plus souvent et de la place pour la ranger. | Plateau, Kipper, Autosunhänger oder Kofferunhänger: De passenden Unhänger hänkt dovun of, wat Dir am meeschte transportéiert a wou Dir en ofstellt. |

## Português (pt-PT): 609 Texte offen

| Schlüssel | Französisch | PT |
|---|---|---|
| `meta.lang` | français | Português |
| `meta.siteName` | Garage Um Rond Point | Garage Um Rond Point |
| `meta.ogAlt` | Garage Um Rond Point au rond-point d’Erpeldange | Garage Um Rond Point na rotunda de Erpeldange |
| `nav.skip` | Aller au contenu | Ir para o conteúdo |
| `nav.main` | Navigation principale | Navegação principal |
| `nav.rental` | Location | Aluguer |
| `nav.cars` | Voitures | Carros |
| `nav.workshop` | Atelier | Oficina |
| `nav.trailersForSale` | Remorques à vendre | Atrelados à venda |
| `nav.garden` | Jardin & forêt | Jardim e floresta |
| `nav.contact` | Contact | Contacto |
| `nav.menu` | Menu | Menu |
| `nav.close` | Fermer | Fechar |
| `nav.langLabel` | Langue | Idioma |
| `nav.callAria` | Appeler le +352 81 05 41 | Ligar para o +352 81 05 41 |
| `nav.home` | Accueil | Início |
| `nav.breadcrumb` | Fil d’Ariane | Caminho de navegação |
| `nav.logoAria` | Garage Um Rond Point, accueil | Garage Um Rond Point, página inicial |
| `contactBar.label` | Contact rapide | Contacto rápido |
| `contactBar.call` | Appeler | Ligar |
| `contactBar.whatsapp` | WhatsApp | WhatsApp |
| `contactBar.ask` | Demander | Perguntar |
| `contactBar.whatsappText` | Bonjour, j’ai une question pour le Garage Um Rond Point. | Olá, tenho uma pergunta para a Garage Um Rond Point. |
| `status.stock.one` | {n} voiture en stock. | {n} carro em stock. |
| `status.stock.other` | {n} voitures en stock. | {n} carros em stock. |
| `status.updatedToday` | Liste mise à jour aujourd’hui à {time}. | Lista atualizada hoje às {time}. |
| `status.updatedYesterday` | Liste mise à jour hier à {time}. | Lista atualizada ontem às {time}. |
| `status.updatedOn` | Liste mise à jour le {date} à {time}. | Lista atualizada em {date} às {time}. |
| `status.never` | La liste de nos voitures arrive bientôt. | A lista dos nossos carros estará disponível em breve. |
| `status.everyMorning` | Liste des voitures mise à jour chaque matin. | Lista de carros atualizada todas as manhãs. |
| `hero.h1` | Le garage du rond-point d’Erpeldange | A garagem da rotunda de Erpeldange |
| `hero.sub` | Louez une remorque ou une camionnette, trouvez votre prochaine voiture, faites entretenir et réparer la vôtre. Au 1, rue du Viaduc, à côté de la station Aral, entre Ettelbruck et Diekirch. | Alugue um atrelado ou uma carrinha, encontre o seu próximo carro ou traga o seu para manutenção e reparação. Estamos em 1, rue du Viaduc, ao lado do posto de abastecimento Aral, entre Ettelbruck e Diekirch. |
| `hero.ctaFinder` | Trouver une remorque | Encontrar um atrelado |
| `hero.ctaCars` | Voir les voitures | Ver os carros |
| `hero.drawingAlt` | Plan du rond-point d’Erpeldange avec l’emplacement du garage à côté de la station Aral | Planta da rotunda de Erpeldange com a localização da garagem ao lado do posto de abastecimento Aral |
| `finder.h2` | Quelle remorque vous faut-il ? | De que atrelado precisa? |
| `finder.intro` | Dites-nous ce que vous transportez et quel permis vous avez. Vous voyez tout de suite les remorques qui conviennent, leur prix et si votre permis suffit. | Indique o que vai transportar e que carta de condução tem. Fica logo a saber que atrelados servem, quanto custam e se a sua carta é suficiente. |
| `finder.cargoLegend` | Que transportez-vous ? | O que vai transportar? |
| `finder.cargo.voiture` | Une voiture | Um carro |
| `finder.cargo.moto` | Une moto | Uma mota |
| `finder.cargo.terre` | Terre, gravats ou déchets verts | Terra, entulho ou restos de jardim |
| `finder.cargo.fete` | Boissons et repas pour une fête | Bebidas e comida para uma festa |
| `finder.cargo.meubles` | Meubles ou cartons | Móveis ou caixas |
| `finder.cargo.materiel` | Matériel ou machines | Material ou máquinas |
| `finder.licenceLegend` | Quel permis avez-vous ? | Que carta de condução tem? |
| `finder.licence.B` | Permis B | Carta B |
| `finder.licence.B96` | Permis B avec code 96 | Carta B com código 96 |
| `finder.licence.BE` | Permis BE | Carta BE |
| `finder.licence.unknown` | Je ne sais pas | Não sei |
| `finder.exactSummary` | Calcul exact pour votre voiture (facultatif) | Cálculo exato para o seu carro (opcional) |
| `finder.f2` | Masse maximale de votre voiture (champ F.2) | Massa máxima autorizada do seu carro (campo F.2) |
| `finder.o1` | Charge remorquable freinée (champ O.1) | Massa rebocável com travão (campo O.1) |
| `finder.o2` | Charge remorquable non freinée (champ O.2) | Massa rebocável sem travão (campo O.2) |
| `finder.kg` | kg | kg |
| `finder.exactHint` | Ces chiffres figurent sur le certificat d’immatriculation de votre voiture. | Estes valores constam do certificado de matrícula do seu carro. |
| `finder.fleetCount.one` | {n} remorque dans notre flotte | {n} atrelado na nossa frota |
| `finder.fleetCount.other` | {n} remorques dans notre flotte | {n} atrelados na nossa frota |
| `finder.matchCount.one` | {n} remorque convient | {n} atrelado serve |
| `finder.matchCount.other` | {n} remorques conviennent | {n} atrelados servem |
| `finder.none` | Aucune remorque ne convient pour cette combinaison. Appelez-nous au +352 81 05 41, nous vous conseillons. | Nenhum atrelado serve para esta combinação. Ligue para o +352 81 05 41 e ajudamos a escolher. |
| `finder.vansHeading` | Camionnettes | Carrinhas |
| `finder.vanStatement` | Une camionnette jusqu’à 3 500 kg de masse maximale se conduit avec le permis B. | Uma carrinha até 3500 kg de massa máxima autorizada pode ser conduzida com a carta B. |
| `finder.specs.payload` | Charge utile | Carga útil |
| `finder.specs.mma` | Masse maximale | Massa máxima autorizada |
| `finder.specs.empty` | Poids à vide | Peso em vazio |
| `finder.specs.surface` | Surface de chargement | Superfície de carga |
| `finder.specs.height` | Hauteur de chargement | Altura de carga |
| `finder.specs.braked` | Freinée | Com travão |
| `finder.specs.yes` | oui | sim |
| `finder.specs.no` | non | não |
| `finder.specs.socket` | Prise | Tomada |
| `finder.specs.socketValue` | {n} broches | {n} pinos |
| `finder.specs.deposit` | Caution | Caução |
| `finder.specs.volume` | Volume intérieur | Volume interior |
| `finder.specs.temp` | Température | Temperatura |
| `finder.specs.power` | Alimentation | Alimentação elétrica |
| `finder.pallets.one` | {n} palette Europe | {n} palete europeia |
| `finder.pallets.other` | {n} palettes Europe | {n} paletes europeias |
| `finder.volumeText` | Volume intérieur {m3} m³ | Volume interior {m3} m³ |
| `finder.diagramLabel` | Surface de chargement {l} × {w} m | Superfície de carga {l} × {w} m |
| `finder.diagramPallets` | {n} palettes Europe | {n} paletes europeias |
| `finder.verdict.ok` | Votre permis suffit. | A sua carta é suficiente. |
| `finder.verdict.needB96orBE` | Il vous faut le code 96 ou le permis BE. | Precisa do código 96 ou da carta BE. |
| `finder.verdict.needBE` | Il vous faut le permis BE. | Precisa da carta BE. |
| `finder.verdict.dependsB` | Avec le permis B, voiture et remorque ensemble ne doivent pas dépasser 3 500 kg. Indiquez la masse de votre voiture (F.2) pour le savoir. | Com a carta B, carro e atrelado juntos não podem ultrapassar 3500 kg. Indique a massa do seu carro (F.2) para saber. |
| `finder.verdict.dependsB96` | Avec le code 96, voiture et remorque ensemble ne doivent pas dépasser 4 250 kg. Indiquez la masse de votre voiture (F.2) pour le savoir. | Com o código 96, carro e atrelado juntos não podem ultrapassar 4250 kg. Indique a massa do seu carro (F.2) para saber. |
| `finder.verdict.required` | Permis nécessaire : {licence} | Carta necessária: {licence} |
| `finder.verdict.requiredDepends` | Permis nécessaire : selon votre voiture, B, B96 ou BE | Carta necessária: B, B96 ou BE, conforme o seu carro |
| `finder.verdict.towLimit` | Chargée au maximum, cette remorque dépasse ce que votre voiture peut tracter ({limite} kg). | Com a carga máxima, este atrelado ultrapassa o que o seu carro pode rebocar ({limite} kg). |
| `finder.licenceShort.B` | B | B |
| `finder.licenceShort.B96` | B avec code 96 | B com código 96 |
| `finder.licenceShort.BE` | BE | BE |
| `finder.price` | {day} la journée, {weekend} le week-end | {day} por dia, {weekend} por fim de semana |
| `finder.priceMissing` | [FEHLT — Preis pro Tag und Wochenende] | [FEHLT — Preis pro Tag und Wochenende] |
| `finder.request` | Demander cette remorque | Pedir este atrelado |
| `finder.requestVan` | Demander cette camionnette | Pedir esta carrinha |
| `finder.seeAll` | Voir toute la flotte | Ver toda a frota |
| `finder.finePrint` | Indication basée sur les règles du permis de conduire au Luxembourg (transports.public.lu). En cas de doute, demandez-nous avant de partir. | Indicação baseada nas regras da carta de condução no Luxemburgo (transports.public.lu). Em caso de dúvida, pergunte-nos antes de partir. |
| `finder.sourceLink` | Règles du permis sur transports.public.lu | Regras da carta de condução em transports.public.lu |
| `finder.empty` | La liste de nos remorques arrive bientôt. Appelez-nous au +352 81 05 41. | A lista dos nossos atrelados estará disponível em breve. Ligue para o +352 81 05 41. |
| `finder.noJsRules` | Avec le permis B, vous pouvez tracter une remorque jusqu’à 750 kg de masse maximale, ou une remorque plus lourde si voiture et remorque ensemble ne dépassent pas 3 500 kg. Avec le code 96, l’ensemble peut aller jusqu’à 4 250 kg. Au-delà, il faut le permis BE. | Com a carta B, pode rebocar um atrelado até 750 kg de massa máxima autorizada, ou um atrelado mais pesado se carro e atrelado juntos não ultrapassarem 3500 kg. Com o código 96, o conjunto pode ir até 4250 kg. Acima disso, é necessária a carta BE. |
| `fleetTable.h2` | Toute notre flotte | Toda a nossa frota |
| `fleetTable.caption` | Nos remorques et camionnettes de location | Os nossos atrelados e carrinhas de aluguer |
| `fleetTable.kind` | Type | Tipo |
| `fleetTable.payload` | Charge utile | Carga útil |
| `fleetTable.mma` | Masse maximale | Massa máxima autorizada |
| `fleetTable.surface` | Surface | Superfície |
| `fleetTable.licence` | Permis nécessaire | Carta necessária |
| `fleetTable.day` | Prix jour | Preço por dia |
| `fleetTable.weekend` | Prix week-end | Preço por fim de semana |
| `fleetTable.licenceDepends` | selon la voiture | conforme o carro |
| `categories.porte-voiture` | Remorque porte-voiture | Atrelado porta-carros |
| `categories.porte-moto` | Remorque porte-moto | Atrelado porta-motos |
| `categories.benne` | Benne basculante | Atrelado basculante |
| `categories.frigorifique` | Remorque frigorifique | Atrelado frigorífico |
| `categories.plateau` | Remorque plateau | Atrelado de plataforma |
| `categories.fourgon` | Remorque fourgon | Atrelado fechado |
| `categories.camionnette` | Camionnette | Carrinha |
| `categories.voiture` | Voiture | Carro |
| `cars.homeH2` | Nos voitures en stock | Os nossos carros em stock |
| `cars.h1` | Voitures neuves et d’occasion | Carros novos e usados |
| `cars.lead` | Toutes les voitures en stock au Garage Um Rond Point, au rond-point d’Erpeldange. Appelez-nous ou écrivez-nous sur WhatsApp avant de passer, pour un essai sur rendez-vous. | Todos os carros em stock na Garage Um Rond Point, na rotunda de Erpeldange. Ligue ou escreva-nos pelo WhatsApp antes de vir, para um test drive por marcação. |
| `cars.seeAll.one` | Voir la voiture | Ver o carro |
| `cars.seeAll.other` | Voir les {n} voitures | Ver os {n} carros |
| `cars.year` | Année | Ano |
| `cars.km` | Kilomètres | Quilómetros |
| `cars.fuel` | Carburant | Combustível |
| `cars.tagFresh` | Nouveau | Novidade |
| `cars.tagNew` | Neuve | Novo |
| `cars.price` | Prix | Preço |
| `cars.noPhoto` | Photo à venir | Foto em breve |
| `cars.empty` | Aucune voiture en stock pour le moment. Appelez-nous au +352 81 05 41. | De momento não há carros em stock. Ligue para o +352 81 05 41. |
| `cars.filter.summary` | Filtrer ({n}) | Filtrar ({n}) |
| `cars.filter.legend` | Filtrer les voitures | Filtrar carros |
| `cars.filter.make` | Marque | Marca |
| `cars.filter.fuel` | Carburant | Combustível |
| `cars.filter.gearbox` | Boîte | Caixa |
| `cars.filter.maxPrice` | Prix maximum | Preço máximo |
| `cars.filter.condition` | État | Estado |
| `cars.filter.sort` | Tri | Ordenar |
| `cars.filter.all` | Toutes | Todas |
| `cars.filter.any` | Tous | Qualquer |
| `cars.filter.conditionNew` | Neuve | Novo |
| `cars.filter.conditionUsed` | Occasion | Usado |
| `cars.filter.sortRecent` | plus récentes | mais recentes |
| `cars.filter.sortPriceAsc` | prix croissant | preço crescente |
| `cars.filter.sortPriceDesc` | prix décroissant | preço decrescente |
| `cars.filter.sortKmAsc` | kilométrage croissant | quilometragem crescente |
| `cars.filter.count.one` | {n} voiture | {n} carro |
| `cars.filter.count.other` | {n} voitures | {n} carros |
| `cars.filter.empty` | Aucune voiture ne correspond. | Nenhum carro corresponde aos filtros. |
| `cars.filter.reset` | Réinitialiser les filtres | Repor filtros |
| `cars.filter.upTo` | jusqu’à {price} | até {price} |
| `enums.fuel.petrol` | Essence | Gasolina |
| `enums.fuel.diesel` | Diesel | Diesel |
| `enums.fuel.hybrid` | Hybride | Híbrido |
| `enums.fuel.plugin_hybrid` | Hybride rechargeable | Híbrido plug-in |
| `enums.fuel.electric` | Électrique | Elétrico |
| `enums.fuel.lpg` | GPL | GPL |
| `enums.fuel.other` | Autre | Outro |
| `enums.transmission.automatic` | Automatique | Automática |
| `enums.transmission.manual` | Manuelle | Manual |
| `enums.transmission.other` | Autre | Outra |
| `enums.body.estate` | Break | Carrinha |
| `enums.body.saloon` | Berline | Sedan |
| `enums.body.suv` | SUV / 4x4 | SUV / TT |
| `enums.body.city` | Citadine | Citadino |
| `enums.body.coupe` | Coupé | Coupé |
| `enums.body.convertible` | Cabriolet | Descapotável |
| `enums.body.mpv` | Monospace | Monovolume |
| `enums.body.van` | Utilitaire | Comercial |
| `enums.body.pickup` | Pick-up | Pick-up |
| `enums.body.other` | Autre | Outro |
| `enums.condition.new` | Neuve | Novo |
| `enums.condition.used` | Occasion | Usado |
| `enums.colors.noir` | Noir | Preto |
| `enums.colors.blanc` | Blanc | Branco |
| `enums.colors.gris` | Gris | Cinzento |
| `enums.colors.argent` | Argent | Prateado |
| `enums.colors.bleu` | Bleu | Azul |
| `enums.colors.rouge` | Rouge | Vermelho |
| `enums.colors.vert` | Vert | Verde |
| `enums.colors.jaune` | Jaune | Amarelo |
| `enums.colors.orange` | Orange | Laranja |
| `enums.colors.marron` | Marron | Castanho |
| `enums.colors.brun` | Brun | Castanho |
| `enums.colors.beige` | Beige | Bege |
| `enums.colors.bordeaux` | Bordeaux | Bordô |
| `enums.colors.violet` | Violet | Roxo |
| `enums.colors.or` | Or | Dourado |
| `enums.colors.anthracite` | Anthracite | Antracite |
| `car.specsH2` | Caractéristiques | Características |
| `car.firstReg` | Première immatriculation | Primeira matrícula |
| `car.mileage` | Kilométrage | Quilometragem |
| `car.fuel` | Carburant | Combustível |
| `car.gearbox` | Boîte | Caixa |
| `car.power` | Puissance | Potência |
| `car.powerUnit` | ch | cv |
| `car.displacement` | Cylindrée | Cilindrada |
| `car.body` | Carrosserie | Carroçaria |
| `car.seats` | Places | Lugares |
| `car.colorExt` | Couleur extérieure | Cor exterior |
| `car.colorInt` | Couleur intérieure | Cor interior |
| `car.euro` | Norme Euro | Norma Euro |
| `car.wltp` | Consommation et CO₂ (WLTP) | Consumo e CO₂ (WLTP) |
| `car.wltpMissing` | informations au garage | informações na garagem |
| `car.ref` | Réf. | Ref. |
| `car.notSpecified` | non indiqué | não indicado |
| `car.condition` | État | Estado |
| `car.vatRecoverable` | TVA récupérable | IVA dedutível |
| `car.equipmentH2` | Équipement | Equipamento |
| `car.equipmentMore` | Voir les {n} équipements | Ver os {n} equipamentos |
| `car.descriptionH2` | Description | Descrição |
| `car.originalNote` | Description d’origine en français | Descrição original em francês |
| `car.originalListNote` | Liste d’origine en français | Lista original em francês |
| `car.contactH2` | Cette voiture vous intéresse ? | Tem interesse neste carro? |
| `car.contactText` | Appelez-nous, écrivez-nous sur WhatsApp ou envoyez-nous votre demande. | Ligue, escreva-nos pelo WhatsApp ou envie-nos o seu pedido. |
| `car.whatsappText` | Bonjour, la {make} {model} (réf. {id}) est-elle encore disponible ? | Olá, o {make} {model} (ref. {id}) ainda está disponível? |
| `car.similarH2` | Voitures similaires | Carros semelhantes |
| `car.sodablast` | Pour une voiture ancienne, nous proposons aussi le décapage sodablast. | Para um carro antigo, também fazemos decapagem com bicarbonato (sodablast). |
| `car.sold` | Cette voiture a été vendue ou n’est plus en stock. | Este carro foi vendido ou já não está em stock. |
| `car.backToList` | Voir toutes nos voitures | Ver todos os nossos carros |
| `car.gallery.label` | Photos de la {make} {model} | Fotos do {make} {model} |
| `car.gallery.counter` | {i} / {n} | {i} / {n} |
| `car.gallery.prev` | Photo précédente | Foto anterior |
| `car.gallery.next` | Photo suivante | Foto seguinte |
| `car.gallery.open` | Afficher les photos en grand | Ver as fotos em tamanho grande |
| `car.gallery.close` | Fermer | Fechar |
| `car.gallery.thumbs` | Miniatures | Miniaturas |
| `car.gallery.thumb` | Photo {i} | Foto {i} |
| `car.gallery.alt` | {make} {model} {version}, photo {i} sur {n} | {make} {model} {version}, foto {i} de {n} |
| `photos.heroWorkshop` | Voiture noire dans un atelier moderne et lumineux | Carro preto numa oficina moderna e iluminada |
| `photos.workshop` | Mécanicien au travail dans le compartiment moteur d’une voiture | Mecânico a trabalhar no compartimento do motor de um carro |
| `photos.sodablast` | Voiture ancienne rouillée, peinture écaillée | Carro clássico enferrujado, com a pintura a descascar |
| `photos.bodywork` | Voiture de sport rouge sur un pont élévateur dans un atelier | Carro desportivo vermelho num elevador de oficina |
| `photos.garden` | Tondeuse à gazon thermique sur une pelouse | Corta-relva a gasolina sobre a relva |
| `photos.gardenPage` | Tonte d’une pelouse au soleil | Cortar a relva ao sol |
| `photos.paint` | Peinture d’une carrosserie au pistolet | Pintura de uma carroçaria à pistola |
| `photos.rental` | Pick-up blanc chargé sur un plateau | Pick-up branca carregada numa plataforma |
| `photos.trailersSale` | Remorque basculante avec ridelles grillagées | Atrelado basculante com taipais em rede |
| `photos.fleetAlt` | Photo : {name} | Foto: {name} |
| `photos.creditsH2` | Photos d’illustration | Fotos ilustrativas |
| `photos.credits` | Photos d’illustration sous licence libre : | Fotos ilustrativas com licença livre: |
| `services.h2` | Nos autres services | Os nossos outros serviços |
| `services.workshop.h3` | Atelier | Oficina |
| `services.workshop.text` | Entretien, diagnostic et réparation de votre voiture ou camionnette. En carrosserie, nous réparons et repeignons votre véhicule après un accrochage. | Manutenção, diagnóstico e reparação do seu carro ou carrinha. Em carroçaria, reparamos e voltamos a pintar o seu veículo depois de uma pequena colisão. |
| `services.workshop.link` | Mécanique et carrosserie | Mecânica e carroçaria |
| `services.sodablast.h3` | Sodablast | Sodablast |
| `services.sodablast.text` | Le sodablast projette du bicarbonate de soude pour décaper peinture, graisse et saleté. Ce décapage doux n’abîme pas les surfaces délicates : carrosserie ancienne, jantes, pièces mécaniques. | O sodablast projeta bicarbonato de sódio para remover tinta, gordura e sujidade. Esta decapagem suave não danifica superfícies delicadas: carroçarias antigas, jantes, peças mecânicas. |
| `services.sodablast.link` | Le décapage sodablast | A decapagem com bicarbonato (sodablast) |
| `services.garden.h3` | Jardin & forêt | Jardim e floresta |
| `services.garden.text` | Nous vendons et réparons des machines de jardin et de forêt, principalement des marques Honda et Stihl. | Vendemos e reparamos máquinas de jardim e floresta, sobretudo das marcas Honda e Stihl. |
| `services.garden.link` | Machines de jardin et de forêt | Máquinas de jardim e floresta |
| `services.trailers.h3` | Remorques à vendre | Atrelados à venda |
| `services.trailers.text` | Nous vendons des remorques Saris, Humbaur et WM Meyer, pour les particuliers et les professionnels. Nous vous aidons à choisir une remorque que votre voiture peut tracter et que votre permis autorise. | Vendemos atrelados Saris, Humbaur e WM Meyer, para particulares e profissionais. Ajudamos a escolher um atrelado que o seu carro possa rebocar e que a sua carta de condução permita. |
| `services.trailers.link` | Nos remorques à vendre | Os nossos atrelados à venda |
| `services.photoMissing` | [FEHLT — Foto] | [FEHLT — Foto] |
| `reviews.h2` | Avis Google | Avaliações no Google |
| `reviews.link` | Lire tous les avis sur Google | Ler todas as avaliações no Google |
| `reviews.missing` | [FEHLT — 2–3 vom Kunden freigegebene Zitate aus dem Google-Profil, mit Vorname + Initiale und Monat/Jahr] | [FEHLT — 2–3 vom Kunden freigegebene Zitate aus dem Google-Profil, mit Vorname + Initiale und Monat/Jahr] |
| `faq.h2` | Questions fréquentes | Perguntas frequentes |
| `faq.rentalH2` | Questions sur la location | Perguntas sobre o aluguer |
| `faq.items.permis.q` | Quel permis faut-il pour tracter une remorque ? | Que carta de condução é necessária para rebocar um atrelado? |
| `faq.items.permis.a` | Avec le permis B, vous pouvez tracter une remorque jusqu’à 750 kg de masse maximale. Une remorque plus lourde est permise si la voiture et la remorque ensemble ne dépassent pas 3 500 kg. Avec le code 96 sur votre permis B, l’ensemble peut aller jusqu’à 4 250 kg. Au-delà, il faut le permis BE, qui autorise une remorque jusqu’à 3 500 kg. | Com a carta B, pode rebocar um atrelado até 750 kg de massa máxima autorizada. Um atrelado mais pesado é permitido se o carro e o atrelado juntos não ultrapassarem 3500 kg. Com o código 96 na sua carta B, o conjunto pode ir até 4250 kg. Acima disso, é necessária a carta BE, que permite um atrelado até 3500 kg. |
| `faq.items.carte.q` | Où voir ce que ma voiture peut tracter ? | Onde posso ver o que o meu carro pode rebocar? |
| `faq.items.carte.a` | Sur le certificat d’immatriculation : le champ O.1 indique la charge remorquable avec freins, le champ O.2 sans freins. La masse maximale de votre voiture figure au champ F.2. | No certificado de matrícula: o campo O.1 indica a massa rebocável com travão e o campo O.2 sem travão. A massa máxima autorizada do seu carro consta do campo F.2. |
| `faq.items.prix.q` | Combien coûte la location d’une remorque ? | Quanto custa alugar um atrelado? |
| `faq.items.prix.a` | Le prix à la journée et au week-end est indiqué pour chaque remorque dans notre guide. [FEHLT — Preise der Flotte] | O preço por dia e por fim de semana está indicado para cada atrelado no nosso guia. [FEHLT — Preise der Flotte] |
| `faq.items.louer.q` | Que faut-il pour louer ? | O que é preciso para alugar? |
| `faq.items.louer.a` | [FEHLT — Mietbedingungen: Ausweis, Führerschein, Kaution, Stecker 7- oder 13-polig] | [FEHLT — Mietbedingungen: Ausweis, Führerschein, Kaution, Stecker 7- oder 13-polig] |
| `faq.items.reserver.q` | Faut-il réserver à l’avance ? | É preciso reservar com antecedência? |
| `faq.items.reserver.a` | [FEHLT — Reservierung, Abhol- und Rückgabezeiten] | [FEHLT — Reservierung, Abhol- und Rückgabezeiten] |
| `faq.items.dispo.q` | Les voitures de la liste sont-elles encore disponibles ? | Os carros da lista ainda estão disponíveis? |
| `faq.items.dispo.a` | Nous mettons la liste à jour chaque matin. Une voiture vendue dans la journée peut encore apparaître jusqu’au lendemain. Appelez-nous ou écrivez-nous sur WhatsApp avant de passer. | Atualizamos a lista todas as manhãs. Um carro vendido durante o dia pode continuar a aparecer até ao dia seguinte. Ligue ou escreva-nos pelo WhatsApp antes de vir. |
| `faq.items.marques.q` | Réparez-vous toutes les marques ? | Reparam todas as marcas? |
| `faq.items.marques.a` | Oui, notre atelier entretient et répare les voitures et camionnettes de toutes marques. [UNBESTÄTIGT — Werden alle Marken repariert?] | Sim, a nossa oficina faz a manutenção e a reparação de carros e carrinhas de todas as marcas. [UNBESTÄTIGT — Werden alle Marken repariert?] |
| `faq.items.depot.q` | Pouvez-vous vendre ma voiture pour moi ? | Podem vender o meu carro por mim? |
| `faq.items.depot.a` | Oui, en dépôt-vente : nous mettons votre voiture en vente et vous mettons en relation avec les acheteurs. Parlez-nous des conditions au garage ou par téléphone. | Sim, em venda à consignação: pomos o seu carro à venda e fazemos o contacto com os compradores. Fale connosco sobre as condições na garagem ou por telefone. |
| `faq.items.langues.q` | Quelles langues parlez-vous ? | Que línguas falam? |
| `faq.items.langues.a` | Luxembourgeois, français, allemand, anglais et portugais. | Luxemburguês, francês, alemão, inglês e português. |
| `faq.items.paiement.q` | Comment puis-je payer ? | Como posso pagar? |
| `faq.items.paiement.a` | En espèces, par carte Visa, Mastercard ou V PAY, avec Payconiq, Apple Pay ou PayPal, ou par virement. [UNBESTÄTIGT — Zahlungsmittel] | Em numerário, com cartão Visa, Mastercard ou V PAY, com Payconiq, Apple Pay ou PayPal, ou por transferência bancária. [UNBESTÄTIGT — Zahlungsmittel] |
| `access.h2` | Nous trouver | Onde estamos |
| `access.address` | Adresse | Morada |
| `access.landmark` | Au rond-point, à côté de la station Aral, entre Ettelbruck et Diekirch. | Na rotunda, ao lado do posto de abastecimento Aral, entre Ettelbruck e Diekirch. |
| `access.hoursH3` | Heures d’ouverture | Horário de funcionamento |
| `access.languagesH3` | Langues | Línguas |
| `access.languages` | Nous parlons luxembourgeois, français, allemand, anglais et portugais. | Falamos luxemburguês, francês, alemão, inglês e português. |
| `access.mapLink` | Itinéraire dans Google Maps | Itinerário no Google Maps |
| `access.external` | (site externe) | (site externo) |
| `access.mapTitle` | Le rond-point d’Erpeldange | A rotunda de Erpeldange |
| `access.osm` | © les contributeurs d’OpenStreetMap | © contribuidores do OpenStreetMap |
| `access.osmLabel` | Données de carte | Dados do mapa |
| `access.labels.garage` | Garage Um Rond Point | Garage Um Rond Point |
| `access.labels.aral` | Aral | Aral |
| `access.labels.ettelbruck` | Ettelbruck | Ettelbruck |
| `access.labels.diekirch` | Diekirch | Diekirch |
| `access.labels.erpeldange` | Erpeldange | Erpeldange |
| `access.labels.rail` | Voie ferrée | Via férrea |
| `access.labels.sure` | Sûre | Sûre |
| `hours.caption` | Heures d’ouverture du Garage Um Rond Point | Horário de funcionamento da Garage Um Rond Point |
| `hours.day` | Jour | Dia |
| `hours.time` | Heures | Horário |
| `hours.days.mo` | Lundi | Segunda-feira |
| `hours.days.tu` | Mardi | Terça-feira |
| `hours.days.we` | Mercredi | Quarta-feira |
| `hours.days.th` | Jeudi | Quinta-feira |
| `hours.days.fr` | Vendredi | Sexta-feira |
| `hours.days.sa` | Samedi | Sábado |
| `hours.days.su` | Dimanche | Domingo |
| `hours.closed` | Fermé | Fechado |
| `hours.today` | aujourd’hui | hoje |
| `hours.and` | et | e |
| `hours.holidays` | Jours fériés : [UNBESTÄTIGT — Feiertage vermutlich geschlossen] | Feriados: [UNBESTÄTIGT — Feiertage vermutlich geschlossen] |
| `hours.short` | Lundi à vendredi {weekday}, samedi {saturday} | De segunda a sexta {weekday}, sábado {saturday} |
| `footer.hoursH` | Heures d’ouverture | Horário de funcionamento |
| `footer.followH` | Suivez-nous | Siga-nos |
| `footer.portals` | Nos annonces aussi sur {luxauto} et {autoscout} | Os nossos anúncios também em {luxauto} e {autoscout} |
| `footer.legal` | Mentions légales | Informação legal |
| `footer.privacy` | Protection des données | Proteção de dados |
| `footer.tiktokMissing` | TikTok [UNBESTÄTIGT — genaue URL] | TikTok [UNBESTÄTIGT — genaue URL] |
| `depot.h2` | Vous vendez votre voiture ? | Quer vender o seu carro? |
| `depot.text` | Avec notre service de dépôt-vente, nous mettons votre voiture en vente et vous mettons en relation avec les acheteurs. Parlez-nous de votre voiture, nous vous expliquons les conditions. | Com o nosso serviço de venda à consignação, pomos o seu carro à venda e fazemos o contacto com os compradores. Fale-nos do seu carro e explicamos as condições. |
| `depot.missing` | [FEHLT — Konditionen Kommissionsverkauf] | [FEHLT — Konditionen Kommissionsverkauf] |
| `depot.link` | Proposer ma voiture | Propor o meu carro |
| `pages.rental.h1` | Location de remorques et camionnettes à Erpeldange | Aluguer de atrelados e carrinhas em Erpeldange |
| `pages.rental.lead` | Remorques porte-voiture et porte-moto, bennes basculantes, remorques frigorifiques pour vos fêtes, camionnettes. À la journée ou pour le week-end. | Atrelados porta-carros e porta-motos, atrelados basculantes, atrelados frigoríficos para as suas festas, carrinhas. Por dia ou para o fim de semana. |
| `pages.rental.durationsMissing` | [UNBESTÄTIGT — Mietdauern Tag / Wochenende] | [UNBESTÄTIGT — Mietdauern Tag / Wochenende] |
| `pages.rental.conditionsH2` | Conditions de location | Condições de aluguer |
| `pages.rental.conditionsMissing` | [FEHLT — Mietbedingungen: Ausweis, Führerschein, Kaution, Abhol- und Rückgabezeiten, Reservierung] | [FEHLT — Mietbedingungen: Ausweis, Führerschein, Kaution, Abhol- und Rückgabezeiten, Reservierung] |
| `pages.rental.formH2` | Demande de location | Pedido de aluguer |
| `pages.rental.formIntro` | Choisissez la remorque et les dates. Nous vous rappelons pour confirmer. | Escolha o atrelado e as datas. Ligamos-lhe de volta para confirmar. |
| `pages.category.h1.porte-voiture` | Louer une remorque porte-voiture à Erpeldange | Alugar um atrelado porta-carros em Erpeldange |
| `pages.category.h1.porte-moto` | Louer une remorque porte-moto à Erpeldange | Alugar um atrelado porta-motos em Erpeldange |
| `pages.category.h1.benne` | Louer une benne basculante à Erpeldange | Alugar um atrelado basculante em Erpeldange |
| `pages.category.h1.frigorifique` | Louer une remorque frigorifique à Erpeldange | Alugar um atrelado frigorífico em Erpeldange |
| `pages.category.h1.camionnette` | Louer une camionnette à Erpeldange | Alugar uma carrinha em Erpeldange |
| `pages.category.intro.porte-voiture` | La remorque porte-voiture sert à transporter une voiture en panne, une voiture de collection ou une voiture que vous venez d’acheter. Vérifiez avant de partir que votre voiture peut tracter l’ensemble et que votre permis suffit. | O atrelado porta-carros serve para transportar um carro avariado, um carro clássico ou um carro que acabou de comprar. Antes de partir, confirme que o seu carro pode rebocar o conjunto e que a sua carta é suficiente. |
| `pages.category.intro.porte-moto` | La remorque porte-moto sert à emmener une moto, un scooter ou un quad à l’atelier, en vacances ou sur un circuit. Elle se tracte avec une voiture ordinaire. | O atrelado porta-motos serve para levar uma mota, uma scooter ou uma moto-quatro à oficina, de férias ou a um circuito. Pode ser rebocado por um carro comum. |
| `pages.category.intro.benne` | La benne basculante sert à transporter terre, gravats, sable ou déchets verts, et se vide en basculant. Pour un chantier, le jardin ou un passage au parc à conteneurs. | O atrelado basculante serve para transportar terra, entulho, areia ou restos de jardim, e descarrega-se por basculamento. Para uma obra, para o jardim ou para uma ida ao ecocentro. |
| `pages.category.intro.frigorifique` | La remorque frigorifique garde boissons et repas au frais pendant une fête, un mariage ou un festival. Vous la garez sur place pour la durée de l’événement. | O atrelado frigorífico mantém bebidas e comida frescas durante uma festa, um casamento ou um festival. Fica estacionado no local durante todo o evento. |
| `pages.category.intro.camionnette` | La camionnette sert à un déménagement, au transport de meubles ou de matériel. Jusqu’à 3 500 kg de masse maximale, elle se conduit avec le permis B. | A carrinha serve para uma mudança de casa ou para transportar móveis ou material. Até 3500 kg de massa máxima autorizada, pode ser conduzida com a carta B. |
| `pages.category.vehiclesH2` | Nos véhicules | Os nossos veículos |
| `pages.category.licenceH2` | Quel permis ? | Que carta de condução? |
| `pages.category.backToFinder` | Comparer avec toutes nos remorques | Comparar com todos os nossos atrelados |
| `pages.workshop.h1` | Mécanique et carrosserie à Erpeldange | Mecânica e carroçaria em Erpeldange |
| `pages.workshop.lead` | Entretien, diagnostic et réparation de votre voiture ou camionnette. En carrosserie, nous réparons et repeignons votre véhicule après un accrochage. | Manutenção, diagnóstico e reparação do seu carro ou carrinha. Em carroçaria, reparamos e voltamos a pintar o seu veículo depois de uma pequena colisão. |
| `pages.workshop.whatH2` | Ce que fait notre atelier | O que faz a nossa oficina |
| `pages.workshop.items.entretien` | Entretien et révision | Manutenção e revisão |
| `pages.workshop.items.diagnostic` | Diagnostic des pannes | Diagnóstico de avarias |
| `pages.workshop.items.reparation` | Réparation mécanique | Reparação mecânica |
| `pages.workshop.items.carrosserie` | Carrosserie et peinture | Carroçaria e pintura |
| `pages.workshop.extraMissing` | [UNBESTÄTIGT — weitere Leistungen laut Editus: Richtbank, Smart Repair, Ausbeulen, Turbo, 4x4, Restaurierung alter Autos; erst nach Bestätigung zeigen] | [UNBESTÄTIGT — weitere Leistungen laut Editus: Richtbank, Smart Repair, Ausbeulen, Turbo, 4x4, Restaurierung alter Autos; erst nach Bestätigung zeigen] |
| `pages.workshop.transparency` | Avant chaque travail, nous vous expliquons ce que nous allons faire. Vous recevez une facture détaillée. | Antes de cada trabalho, explicamos o que vamos fazer. Recebe uma fatura detalhada. |
| `pages.workshop.transparencyMissing` | [UNBESTÄTIGT — Kostenvoranschlag vorher, detaillierte Rechnung?] | [UNBESTÄTIGT — Kostenvoranschlag vorher, detaillierte Rechnung?] |
| `pages.workshop.formH2` | Demander un rendez-vous | Pedir marcação |
| `pages.workshop.formIntro` | Dites-nous de quel véhicule il s’agit et ce qu’il faut faire. Nous vous rappelons pour fixer le rendez-vous. | Indique de que veículo se trata e o que é preciso fazer. Ligamos-lhe de volta para combinar a marcação. |
| `pages.sodablast.h1` | Décapage sodablast à Erpeldange | Decapagem com bicarbonato (sodablast) em Erpeldange |
| `pages.sodablast.lead` | Le sodablast projette du bicarbonate de soude pour décaper peinture, graisse et saleté. Ce décapage doux n’abîme pas les surfaces délicates : carrosserie ancienne, jantes, pièces mécaniques. | O sodablast projeta bicarbonato de sódio para remover tinta, gordura e sujidade. Esta decapagem suave não danifica superfícies delicadas: carroçarias antigas, jantes, peças mecânicas. |
| `pages.sodablast.whatH2` | Pour quoi ? | Para quê? |
| `pages.sodablast.items.carrosserie` | Carrosseries anciennes, avant une restauration | Carroçarias antigas, antes de um restauro |
| `pages.sodablast.items.jantes` | Jantes | Jantes |
| `pages.sodablast.items.pieces` | Pièces mécaniques | Peças mecânicas |
| `pages.sodablast.photosH2` | Avant et après | Antes e depois |
| `pages.sodablast.photosMissing` | [FEHLT — Vorher-nachher-Fotos Sodablast] | [FEHLT — Vorher-nachher-Fotos Sodablast] |
| `pages.sodablast.whatsapp` | Envoyez-nous des photos sur WhatsApp pour un premier avis. | Envie-nos fotos pelo WhatsApp para uma primeira avaliação. |
| `pages.sodablast.whatsappText` | Bonjour, voici des photos pour un premier avis sur un décapage sodablast. | Olá, envio fotos para uma primeira avaliação de uma decapagem com bicarbonato (sodablast). |
| `pages.sodablast.whatsappLink` | Envoyer des photos sur WhatsApp | Enviar fotos pelo WhatsApp |
| `pages.sodablast.formH2` | Demander un rendez-vous | Pedir marcação |
| `pages.trailersForSale.h1` | Remorques à vendre à Erpeldange | Atrelados à venda em Erpeldange |
| `pages.trailersForSale.lead` | Nous vendons des remorques Saris, Humbaur et WM Meyer, pour les particuliers et les professionnels. | Vendemos atrelados Saris, Humbaur e WM Meyer, para particulares e profissionais. |
| `pages.trailersForSale.dealerMissing` | [UNBESTÄTIGT — Händlerstatus Saris, Humbaur, WM Meyer; Logos nur mit Freigabe] | [UNBESTÄTIGT — Händlerstatus Saris, Humbaur, WM Meyer; Logos nur mit Freigabe] |
| `pages.trailersForSale.adviceH2` | Quel permis pour quelle remorque ? | Que carta para que atrelado? |
| `pages.trailersForSale.advice` | Nous vous aidons à choisir une remorque que votre voiture peut tracter et que votre permis autorise : taille, masse maximale, freinage. Notre guide de location vous montre les règles du permis avec des exemples. | Ajudamos a escolher um atrelado que o seu carro possa rebocar e que a sua carta de condução permita: tamanho, massa máxima autorizada, travões. O nosso guia de aluguer mostra as regras da carta de condução com exemplos. |
| `pages.trailersForSale.adviceLink` | Quel permis pour quelle remorque ? | Que carta para que atrelado? |
| `pages.trailersForSale.stockH2` | Remorques en stock | Atrelados em stock |
| `pages.trailersForSale.stockMissing` | [FEHLT — Anhänger auf Lager] | [FEHLT — Anhänger auf Lager] |
| `pages.trailersForSale.formH2` | Une question sur une remorque ? | Tem uma pergunta sobre um atrelado? |
| `pages.garden.h1` | Machines de jardin et de forêt à Erpeldange | Máquinas de jardim e floresta em Erpeldange |
| `pages.garden.lead` | Nous vendons et réparons des machines de jardin et de forêt, principalement des marques Honda et Stihl. | Vendemos e reparamos máquinas de jardim e floresta, sobretudo das marcas Honda e Stihl. |
| `pages.garden.dealerMissing` | [UNBESTÄTIGT — Händlerstatus Honda und Stihl; Logos nur mit Freigabe] | [UNBESTÄTIGT — Händlerstatus Honda und Stihl; Logos nur mit Freigabe] |
| `pages.garden.whatH2` | Vente et réparation | Venda e reparação |
| `pages.garden.text` | Tondeuse, débroussailleuse, tronçonneuse ou taille-haie : apportez votre machine à l’atelier ou demandez-nous conseil pour en choisir une nouvelle. | Corta-relva, roçadora, motosserra ou corta-sebes: traga a sua máquina à oficina ou peça-nos conselho para escolher uma nova. |
| `pages.garden.formH2` | Demander une réparation | Pedir reparação |
| `pages.contact.h1` | Contact et accès | Contacto e localização |
| `pages.contact.lead` | Garage Um Rond Point, 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre. Au rond-point, à côté de la station Aral. Téléphone +352 81 05 41, WhatsApp +352 621 373 272, info@rondpoint.lu. Nous parlons luxembourgeois, français, allemand, anglais et portugais. | Garage Um Rond Point, 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre. Na rotunda, ao lado do posto de abastecimento Aral. Telefone +352 81 05 41, WhatsApp +352 621 373 272, info@rondpoint.lu. Falamos luxemburguês, francês, alemão, inglês e português. |
| `pages.contact.waysH2` | Nous joindre | Como nos contactar |
| `pages.contact.phone` | Téléphone | Telefone |
| `pages.contact.whatsapp` | WhatsApp | WhatsApp |
| `pages.contact.email` | E-mail | E-mail |
| `pages.contact.paymentH2` | Paiement | Pagamento |
| `pages.contact.payment` | En espèces, par carte Visa, Mastercard ou V PAY, avec Payconiq, Apple Pay ou PayPal, ou par virement. | Em numerário, com cartão Visa, Mastercard ou V PAY, com Payconiq, Apple Pay ou PayPal, ou por transferência bancária. |
| `pages.contact.paymentMissing` | [UNBESTÄTIGT — Zahlungsmittel] | [UNBESTÄTIGT — Zahlungsmittel] |
| `pages.contact.formH2` | Nous écrire | Escreva-nos |
| `pages.thanks.h1` | Votre demande est bien arrivée | O seu pedido foi recebido |
| `pages.thanks.text` | Nous vous répondons [FEHLT — Antwortzeit, z. B. « le jour ouvrable suivant »]. C’est urgent ? Appelez le +352 81 05 41. | Respondemos [FEHLT — Antwortzeit, z. B. « le jour ouvrable suivant »]. É urgente? Ligue para o +352 81 05 41. |
| `pages.thanks.back` | Retour à l’accueil | Voltar à página inicial |
| `pages.notFound.h1` | Page introuvable | Página não encontrada |
| `pages.notFound.text` | Cette page n’existe pas ou plus. Une voiture vendue disparaît de notre liste. | Esta página não existe ou já foi removida. Quando um carro é vendido, sai da nossa lista. |
| `forms.optional` | facultatif | opcional |
| `forms.name` | Nom | Nome |
| `forms.phone` | Téléphone | Telefone |
| `forms.phoneHint` | Nous vous rappelons. | Ligamos-lhe de volta. |
| `forms.email` | E-mail | E-mail |
| `forms.message` | Message | Mensagem |
| `forms.consent` | J’accepte que Garage Um Rond Point utilise mes données pour répondre à ma demande. Plus d’informations dans la {link}. | Aceito que a Garage Um Rond Point utilize os meus dados para responder ao meu pedido. Mais informações na {link}. |
| `forms.consentLink` | protection des données | política de proteção de dados |
| `forms.honeypot` | Ne remplissez pas ce champ | Não preencha este campo |
| `forms.choose` | Choisissez… | Escolha… |
| `forms.sending` | Envoi en cours… | A enviar… |
| `forms.successH` | Votre demande est bien arrivée. | O seu pedido foi recebido. |
| `forms.successText` | Nous vous répondons dès que possible. C’est urgent ? Appelez le +352 81 05 41. | Respondemos o mais rapidamente possível. É urgente? Ligue para o +352 81 05 41. |
| `forms.errorSummary` | Vérifiez les champs signalés. | Verifique os campos assinalados. |
| `forms.errorSend` | L’envoi n’a pas fonctionné. Réessayez ou appelez-nous au +352 81 05 41. | O envio não funcionou. Tente novamente ou ligue para o +352 81 05 41. |
| `forms.errorRate` | Vous avez envoyé beaucoup de demandes aujourd’hui. Appelez-nous au +352 81 05 41. | Já enviou muitos pedidos hoje. Ligue para o +352 81 05 41. |
| `forms.errors.name` | Indiquez votre nom. | Indique o seu nome. |
| `forms.errors.phone` | Indiquez un numéro de téléphone pour que nous puissions vous rappeler. | Indique um número de telefone para podermos ligar-lhe de volta. |
| `forms.errors.phoneInvalid` | Ce numéro semble incomplet. Indiquez-le avec l’indicatif, par exemple +352 621 123 456. | Este número parece incompleto. Indique-o com o indicativo, por exemplo +352 621 123 456. |
| `forms.errors.email` | Cette adresse e-mail n’est pas valide. Elle doit contenir un @, par exemple nom@exemple.lu. | Este endereço de e-mail não é válido. Tem de conter um @, por exemplo nome@exemplo.lu. |
| `forms.errors.consent` | Cochez la case pour que nous puissions utiliser vos données pour vous répondre. | Assinale a caixa para podermos usar os seus dados para lhe responder. |
| `forms.errors.vehicle` | Choisissez une remorque ou un véhicule. | Escolha um atrelado ou um veículo. |
| `forms.errors.from` | Indiquez la date de début. | Indique a data de início. |
| `forms.errors.to` | Indiquez la date de fin. | Indique a data de fim. |
| `forms.errors.toBeforeFrom` | La date « Au » ne peut pas être avant la date « Du ». | A data «Até» não pode ser anterior à data «De». |
| `forms.errors.past` | Choisissez une date à partir d’aujourd’hui. | Escolha uma data a partir de hoje. |
| `forms.errors.wish` | Choisissez ce que vous souhaitez. | Escolha o que pretende. |
| `forms.errors.reason` | Choisissez pour quoi vous venez. | Escolha o motivo da visita. |
| `forms.errors.machine` | Indiquez le véhicule ou la machine. | Indique o veículo ou a máquina. |
| `forms.errors.work` | Décrivez ce qu’il faut faire. | Descreva o que é preciso fazer. |
| `forms.errors.subject` | Choisissez un sujet. | Escolha um assunto. |
| `forms.errors.message` | Écrivez votre message. | Escreva a sua mensagem. |
| `forms.rental.vehicle` | Remorque ou véhicule souhaité | Atrelado ou veículo pretendido |
| `forms.rental.from` | Du | De |
| `forms.rental.to` | Au | Até |
| `forms.rental.licence` | Votre permis | A sua carta de condução |
| `forms.rental.licenceNone` | Pas précisé | Não indicada |
| `forms.rental.licenceB` | B | B |
| `forms.rental.licenceB96` | B + code 96 | B + código 96 |
| `forms.rental.licenceBE` | BE | BE |
| `forms.rental.submit` | Envoyer la demande de location | Enviar pedido de aluguer |
| `forms.rental.noFleet` | Dites-nous dans le message ce que vous souhaitez louer. | Indique na mensagem o que pretende alugar. |
| `forms.rental.other` | Autre, précisé dans le message | Outro, indicado na mensagem |
| `forms.car.carLabel` | Voiture | Carro |
| `forms.car.wish` | Vous souhaitez | Pretende |
| `forms.car.wishTest` | Un essai | Um test drive |
| `forms.car.wishInfo` | Plus d’informations | Mais informações |
| `forms.car.wishTradeIn` | Faire reprendre ma voiture | Dar o meu carro para retoma |
| `forms.car.tradeInH` | Seulement pour une reprise | Só para retoma |
| `forms.car.tradeMake` | Marque et modèle | Marca e modelo |
| `forms.car.tradeYear` | Année | Ano |
| `forms.car.tradeKm` | Kilométrage | Quilometragem |
| `forms.car.title` | Demander des informations | Pedir informações |
| `forms.car.submit` | Envoyer ma demande | Enviar o meu pedido |
| `forms.workshop.reason` | Pour quoi ? | Motivo da visita |
| `forms.workshop.reasonMaintenance` | Entretien | Manutenção |
| `forms.workshop.reasonRepair` | Panne ou réparation | Avaria ou reparação |
| `forms.workshop.reasonBody` | Carrosserie | Carroçaria |
| `forms.workshop.reasonSodablast` | Sodablast | Sodablast |
| `forms.workshop.reasonGarden` | Machine de jardin ou forêt | Máquina de jardim ou floresta |
| `forms.workshop.machine` | Véhicule ou machine | Veículo ou máquina |
| `forms.workshop.machineHint` | Marque, modèle et année, par exemple : VW Golf 2018. | Marca, modelo e ano, por exemplo: VW Golf 2018. |
| `forms.workshop.work` | Que faut-il faire ? | O que é preciso fazer? |
| `forms.workshop.date` | Date souhaitée | Data pretendida |
| `forms.workshop.photos` | Pour la carrosserie ou le sodablast, envoyez-nous des photos sur WhatsApp : +352 621 373 272. | Para carroçaria ou sodablast, envie-nos fotos pelo WhatsApp: +352 621 373 272. |
| `forms.workshop.submit` | Demander un rendez-vous | Pedir marcação |
| `forms.contact.subject` | Sujet | Assunto |
| `forms.contact.subjectQuestion` | Question générale | Pergunta geral |
| `forms.contact.subjectTrailer` | Achat de remorque | Compra de atrelado |
| `forms.contact.subjectDepot` | Dépôt-vente | Venda à consignação |
| `forms.contact.subjectOther` | Autre | Outro |
| `forms.contact.submit` | Envoyer le message | Enviar mensagem |
| `seo.home.title` | Garage Um Rond Point Erpeldange – remorques, autos, atelier | Garage Um Rond Point Erpeldange – atrelados, carros, oficina |
| `seo.home.description` | Au rond-point d’Erpeldange, entre Ettelbruck et Diekirch : location de remorques et camionnettes, voitures neuves et d’occasion, mécanique et carrosserie. | Na rotunda de Erpeldange, entre Ettelbruck e Diekirch: aluguer de atrelados e carrinhas, carros novos e usados, oficina automóvel, mecânica e carroçaria. |
| `seo.rental.title` | Location de remorques à Erpeldange, près d’Ettelbruck | Aluguer de atrelados no Luxemburgo \| Erpeldange, Ettelbruck |
| `seo.rental.description` | Porte-voiture, porte-moto, benne basculante, remorque frigorifique ou camionnette : voyez quelle remorque convient, son prix et si votre permis suffit. | Alugar atrelado perto de Ettelbruck: porta-carros, porta-motos, basculante, frigorífico ou carrinha. Veja que atrelado serve, o preço e se a sua carta basta. |
| `seo.category.title.porte-voiture` | Location remorque porte-voiture à Erpeldange \| Um Rond Point | Alugar atrelado porta-carros em Erpeldange \| Um Rond Point |
| `seo.category.title.porte-moto` | Location remorque porte-moto à Erpeldange \| Um Rond Point | Alugar atrelado porta-motos em Erpeldange \| Um Rond Point |
| `seo.category.title.benne` | Location benne basculante à Erpeldange \| Um Rond Point | Alugar atrelado basculante em Erpeldange \| Um Rond Point |
| `seo.category.title.frigorifique` | Location remorque frigorifique Erpeldange \| Um Rond Point | Aluguer atrelado frigorífico Erpeldange \| Um Rond Point |
| `seo.category.title.camionnette` | Location camionnette à Erpeldange \| Garage Um Rond Point | Aluguer de carrinha em Erpeldange, perto de Ettelbruck |
| `seo.category.description.porte-voiture` | Louez une remorque porte-voiture au rond-point d’Erpeldange, près d’Ettelbruck : dimensions, charge utile, prix et permis nécessaire pour chaque remorque. | Alugue um atrelado porta-carros na rotunda de Erpeldange, perto de Ettelbruck: dimensões, carga útil, preço e carta de condução necessária para cada atrelado. |
| `seo.category.description.porte-moto` | Louez une remorque porte-moto au rond-point d’Erpeldange, près d’Ettelbruck : dimensions, charge utile, prix et permis nécessaire pour chaque remorque. | Alugue um atrelado porta-motos na rotunda de Erpeldange, perto de Ettelbruck: dimensões, carga útil, preço e carta de condução necessária para cada atrelado. |
| `seo.category.description.benne` | Louez une benne basculante pour terre, gravats ou déchets verts au rond-point d’Erpeldange, près d’Ettelbruck : charge utile, prix et permis nécessaire. | Alugue um atrelado basculante para terra, entulho ou restos de jardim na rotunda de Erpeldange, perto de Ettelbruck: carga útil, preço e carta necessária. |
| `seo.category.description.frigorifique` | Louez une remorque frigorifique pour votre fête ou festival au rond-point d’Erpeldange, près d’Ettelbruck : volume, température, prix et permis nécessaire. | Alugue um atrelado frigorífico para a sua festa ou festival na rotunda de Erpeldange, perto de Ettelbruck: volume, temperatura, preço e carta necessária. |
| `seo.category.description.camionnette` | Louez une camionnette pour un déménagement ou du matériel au rond-point d’Erpeldange, près d’Ettelbruck. Jusqu’à 3 500 kg, le permis B suffit. Prix au jour. | Alugue uma carrinha para mudanças ou transporte de material na rotunda de Erpeldange, perto de Ettelbruck. Até 3500 kg, basta a carta B. Veja o preço por dia. |
| `seo.cars.title` | Voitures neuves et d’occasion à Erpeldange \| Um Rond Point | Carros novos e usados em Erpeldange \| Garage Um Rond Point |
| `seo.cars.description` | Toutes les voitures en stock au Garage Um Rond Point à Erpeldange, avec prix, kilométrage et photos. Liste mise à jour chaque matin. Essai sur rendez-vous. | Carros usados no Luxemburgo: stock da Garage Um Rond Point em Erpeldange, com preço, quilómetros e fotos. Atualizado todas as manhãs. Test drive por marcação. |
| `seo.car.suffixLong` |  \| Garage Um Rond Point |  \| Garage Um Rond Point |
| `seo.car.suffixShort` |  \| Um Rond Point |  \| Um Rond Point |
| `seo.car.place` |  à Erpeldange |  em Erpeldange |
| `seo.car.descTail` | À voir au Garage Um Rond Point à Erpeldange. | Para ver na Garage Um Rond Point em Erpeldange. |
| `seo.car.descExtra[0]` |  Essai sur rendez-vous. |  Test drive por marcação. |
| `seo.car.descExtra[1]` |  Entre Ettelbruck et Diekirch. |  Entre Ettelbruck e Diekirch. |
| `seo.car.descExtra[2]` |  Appelez le +352 81 05 41. |  Ligue +352 81 05 41. |
| `seo.car.descGearbox` | boîte {gearbox} | caixa {gearbox} |
| `seo.car.soldTitle` | {make} {model} vendue \| Garage Um Rond Point, Erpeldange | {make} {model} vendido \| Garage Um Rond Point, Erpeldange |
| `seo.car.soldDescription` | Cette {make} {model} a été vendue ou n’est plus en stock. Découvrez les autres voitures neuves et d’occasion du Garage Um Rond Point à Erpeldange. | Este {make} {model} foi vendido ou já não está em stock. Veja os outros carros novos e usados da Garage Um Rond Point em Erpeldange. |
| `seo.workshop.title` | Mécanique et carrosserie à Erpeldange \| Garage Um Rond Point | Oficina automóvel em Erpeldange \| Garage Um Rond Point |
| `seo.workshop.description` | Entretien, diagnostic, réparation, carrosserie et peinture au rond-point d’Erpeldange, près d’Ettelbruck et Diekirch. Demandez un rendez-vous en ligne. | Oficina automóvel perto de Ettelbruck e Diekirch: manutenção, diagnóstico, reparação, carroçaria e pintura na rotunda de Erpeldange. Peça marcação online. |
| `seo.sodablast.title` | Décapage sodablast au Luxembourg \| Garage Um Rond Point | Decapagem com bicarbonato (sodablast) no Luxemburgo |
| `seo.sodablast.description` | Le sodablast décape peinture et saleté sans abîmer la surface : voiture ancienne, jantes, pièces mécaniques. À Erpeldange, entre Ettelbruck et Diekirch. | O sodablast remove tinta, gordura e sujidade sem danificar a superfície: carro antigo, jantes, peças mecânicas. Em Erpeldange, entre Ettelbruck e Diekirch. |
| `seo.trailersForSale.title` | Remorques à vendre : Humbaur, Saris, WM Meyer \| Erpeldange | Atrelados à venda: Humbaur, Saris, WM Meyer \| Erpeldange |
| `seo.trailersForSale.description` | Achetez votre remorque à Erpeldange : Humbaur, Saris ou WM Meyer. Nous vous aidons à choisir la taille et le poids adaptés à votre voiture et à votre permis. | Compre o seu atrelado em Erpeldange: Humbaur, Saris ou WM Meyer. Ajudamos a escolher o tamanho e o peso adequados ao seu carro e à sua carta de condução. |
| `seo.garden.title` | Machines de jardin et forêt Honda et Stihl à Erpeldange | Máquinas de jardim e floresta Honda e Stihl em Erpeldange |
| `seo.garden.description` | Vente et réparation de machines de jardin et de forêt, principalement Honda et Stihl, au Garage Um Rond Point à Erpeldange, entre Ettelbruck et Diekirch. | Venda e reparação de máquinas de jardim e floresta, sobretudo das marcas Honda e Stihl, na Garage Um Rond Point em Erpeldange, entre Ettelbruck e Diekirch. |
| `seo.contact.title` | Contact et accès \| Garage Um Rond Point, Erpeldange | Contacto e localização \| Garage Um Rond Point, Erpeldange |
| `seo.contact.description` | 1, rue du Viaduc à Erpeldange-sur-Sûre, au rond-point à côté de la station Aral. Lundi à vendredi 7h45–12h et 13h–18h, samedi 8h–12h. Tél. +352 81 05 41. | 1, rue du Viaduc em Erpeldange-sur-Sûre, na rotunda, ao lado do posto Aral. De segunda a sexta 7h45–12h e 13h–18h, sábado 8h–12h. Telefone +352 81 05 41. |
| `seo.thanks.title` | Demande envoyée \| Garage Um Rond Point, Erpeldange-sur-Sûre | Pedido enviado \| Garage Um Rond Point, Erpeldange-sur-Sûre |
| `seo.thanks.description` | Votre demande est bien arrivée au Garage Um Rond Point à Erpeldange. Nous vous répondons rapidement. C’est urgent ? Appelez-nous au +352 81 05 41, merci. | O seu pedido foi recebido pela Garage Um Rond Point em Erpeldange. Respondemos rapidamente. É urgente? Ligue para o +352 81 05 41. Obrigado pelo seu contacto. |
| `seo.legal.title` | Mentions légales \| Garage Um Rond Point, Erpeldange-sur-Sûre | Informação legal \| Garage Um Rond Point, Erpeldange-sur-Sûre |
| `seo.legal.description` | Mentions légales du Garage Um Rond Point S.à r.l., 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre : éditeur, RCS B296148, TVA LU36559673, hébergement du site. | Informação legal da Garage Um Rond Point S.à r.l., 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre: editor, RCS B296148, IVA LU36559673, alojamento do site. |
| `seo.privacy.title` | Protection des données \| Garage Um Rond Point, Erpeldange | Proteção de dados \| Garage Um Rond Point, Erpeldange |
| `seo.privacy.description` | Quelles données le Garage Um Rond Point traite quand vous nous écrivez, pourquoi, combien de temps et quels sont vos droits. Sans cookies, sans outil de suivi. | Que dados a Garage Um Rond Point trata quando nos escreve, porquê, durante quanto tempo e quais são os seus direitos. Sem cookies, sem ferramentas de rastreio. |
| `legal.h1` | Mentions légales | Informação legal |
| `legal.publisherH2` | Éditeur du site | Editor do site |
| `legal.company` | Raison sociale | Denominação social |
| `legal.legalForm` | Forme juridique | Forma jurídica |
| `legal.address` | Siège | Sede |
| `legal.phone` | Téléphone | Telefone |
| `legal.email` | E-mail | E-mail |
| `legal.rcs` | Registre de commerce | Registo comercial |
| `legal.vat` | Numéro de TVA | Número de IVA |
| `legal.registered` | Immatriculation | Data de registo |
| `legal.manager` | Gérant | Gerente |
| `legal.permit` | Autorisation d’établissement | Autorização de estabelecimento |
| `legal.capital` | Capital social | Capital social |
| `legal.managerMissing` | [UNBESTÄTIGT — Gérant David Moreira laut Editus] | [UNBESTÄTIGT — Gérant David Moreira laut Editus] |
| `legal.permitMissing` | [FEHLT — Nummer der Gewerbegenehmigung] | [FEHLT — Nummer der Gewerbegenehmigung] |
| `legal.capitalMissing` | [FEHLT — Gesellschaftskapital] | [FEHLT — Gesellschaftskapital] |
| `legal.hostingH2` | Hébergement | Alojamento |
| `legal.hosting` | Le site est hébergé par GitHub Pages, un service de GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis. | O site está alojado no GitHub Pages, um serviço da GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, Estados Unidos. |
| `legal.contentH2` | Contenu | Conteúdo |
| `legal.content` | Les annonces de voitures reprennent nos propres annonces publiées sur LuxAuto et AutoScout24. Les prix et caractéristiques peuvent changer ; seule l’offre confirmée au garage fait foi. | Os anúncios de carros reproduzem os nossos próprios anúncios publicados no LuxAuto e no AutoScout24. Os preços e as características podem mudar; só a oferta confirmada na garagem é vinculativa. |
| `legal.photosH2` | Photos et plan | Fotos e planta |
| `legal.photos` | Plan du rond-point dessiné d’après les données OpenStreetMap (© les contributeurs d’OpenStreetMap, licence ODbL). Photos des voitures : nos propres annonces. | Planta da rotunda desenhada a partir dos dados do OpenStreetMap (© contribuidores do OpenStreetMap, licença ODbL). Fotos dos carros: os nossos próprios anúncios. |
| `legal.fontH2` | Police de caractères | Tipo de letra |
| `legal.font` | Archivo, Omnibus-Type, SIL Open Font License 1.1. | Archivo, Omnibus-Type, SIL Open Font License 1.1. |
| `privacy.h1` | Protection des données | Proteção de dados |
| `privacy.intro` | Nous traitons vos données uniquement pour répondre à vos demandes. Ce site ne dépose pas de cookies et n’utilise pas d’outil de suivi ni de publicité. | Tratamos os seus dados apenas para responder aos seus pedidos. Este site não instala cookies e não utiliza ferramentas de rastreio nem de publicidade. |
| `privacy.controllerH2` | Responsable du traitement | Responsável pelo tratamento |
| `privacy.controller` | GARAGE UM ROND POINT S.à r.l., 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre, Luxembourg. Téléphone +352 81 05 41, info@rondpoint.lu. | GARAGE UM ROND POINT S.à r.l., 1, rue du Viaduc, L-9147 Erpeldange-sur-Sûre, Luxemburgo. Telefone +352 81 05 41, info@rondpoint.lu. |
| `privacy.formsH2` | Formulaires de demande | Formulários de pedido |
| `privacy.forms` | Quand vous envoyez un formulaire, nous recevons les données que vous saisissez : nom, téléphone, e-mail si vous l’indiquez, votre message et les détails de votre demande (par exemple dates de location, véhicule, rendez-vous souhaité). Nous les utilisons pour vous répondre et préparer une offre ou un rendez-vous. | Quando envia um formulário, recebemos os dados que introduz: nome, telefone, e-mail se o indicar, a sua mensagem e os pormenores do seu pedido (por exemplo, datas de aluguer, veículo, marcação pretendida). Utilizamos esses dados para lhe responder e preparar uma proposta ou uma marcação. |
| `privacy.legalBasis` | Base légale : votre consentement (art. 6, paragraphe 1, point a du RGPD), que vous donnez en cochant la case, et les mesures précontractuelles à votre demande (art. 6, paragraphe 1, point b du RGPD). Vous pouvez retirer votre consentement à tout moment par e-mail ou par téléphone. | Fundamento jurídico: o seu consentimento (artigo 6.º, n.º 1, alínea a), do RGPD), que dá ao assinalar a caixa, e as diligências pré-contratuais a seu pedido (artigo 6.º, n.º 1, alínea b), do RGPD). Pode retirar o seu consentimento a qualquer momento por e-mail ou por telefone. |
| `privacy.storage` | Votre demande est enregistrée dans une base de données chez Supabase (région Union européenne) et nous est transmise par e-mail via [UNBESTÄTIGT — EU-Mailanbieter, mit Nave klären]. Les demandes sont supprimées automatiquement après 90 jours [UNBESTÄTIGT — Frist mit Kunde bestätigen]. Les échanges qui mènent à un contrat sont conservés selon les obligations comptables. | O seu pedido é guardado numa base de dados da Supabase (região União Europeia) e é-nos transmitido por e-mail através de [UNBESTÄTIGT — EU-Mailanbieter, mit Nave klären]. Os pedidos são apagados automaticamente após 90 dias [UNBESTÄTIGT — Frist mit Kunde bestätigen]. As comunicações que levem à celebração de um contrato são conservadas de acordo com as obrigações contabilísticas. |
| `privacy.abuse` | Pour limiter les abus, nous enregistrons une empreinte cryptographique (hachage) de votre adresse IP pendant 24 heures. Elle ne permet pas de retrouver votre adresse. | Para limitar abusos, registamos durante 24 horas um resumo criptográfico (hash) do seu endereço IP. Esse valor não permite descobrir o seu endereço. |
| `privacy.hostingH2` | Hébergement et journaux du serveur | Alojamento e registos do servidor |
| `privacy.hosting` | Le site est hébergé par GitHub Pages (GitHub, Inc., États-Unis). À chaque visite, GitHub traite votre adresse IP et des données techniques pour livrer les pages et assurer la sécurité. GitHub est certifié selon le cadre de protection des données UE–États-Unis (EU-US Data Privacy Framework). Base légale : notre intérêt légitime à un site sûr et disponible (art. 6, paragraphe 1, point f du RGPD). | O site está alojado no GitHub Pages (GitHub, Inc., Estados Unidos). Em cada visita, a GitHub trata o seu endereço IP e dados técnicos para entregar as páginas e garantir a segurança. A GitHub está certificada ao abrigo do Quadro de Privacidade de Dados UE-EUA (EU-US Data Privacy Framework). Fundamento jurídico: o nosso interesse legítimo em ter um site seguro e disponível (artigo 6.º, n.º 1, alínea f), do RGPD). |
| `privacy.linksH2` | Liens vers d’autres services | Ligações para outros serviços |
| `privacy.links` | Le site ne charge aucun contenu externe : polices, photos et plan sont hébergés avec le site. Les liens vers Google Maps, WhatsApp, Facebook, Instagram, TikTok, LuxAuto et AutoScout24 ne s’ouvrent que si vous cliquez. Ces services traitent alors vos données selon leurs propres règles. WhatsApp appartient à Meta Platforms ; si vous nous écrivez sur WhatsApp, Meta traite votre numéro et vos messages. | O site não carrega conteúdos externos: tipos de letra, fotos e planta estão alojados com o site. As ligações para Google Maps, WhatsApp, Facebook, Instagram, TikTok, LuxAuto e AutoScout24 só se abrem se clicar nelas. Esses serviços tratam então os seus dados segundo as suas próprias regras. O WhatsApp pertence à Meta Platforms; se nos escrever pelo WhatsApp, a Meta trata o seu número e as suas mensagens. |
| `privacy.rightsH2` | Vos droits | Os seus direitos |
| `privacy.rights` | Vous pouvez demander l’accès à vos données, leur rectification, leur effacement, la limitation du traitement et la portabilité, et vous opposer au traitement. Écrivez-nous à info@rondpoint.lu. Vous pouvez aussi déposer une réclamation auprès de la Commission nationale pour la protection des données (CNPD), 15, boulevard du Jazz, L-4370 Belvaux, cnpd.public.lu. | Pode pedir o acesso aos seus dados, a sua retificação, o seu apagamento, a limitação do tratamento e a portabilidade, e opor-se ao tratamento. Escreva-nos para info@rondpoint.lu. Pode também apresentar uma reclamação à Comissão Nacional para a Proteção de Dados (CNPD), 15, boulevard du Jazz, L-4370 Belvaux, cnpd.public.lu. |
| `privacy.updated` | Mise à jour : {date} | Última atualização: {date} |
| `offer.label` | Nos services en bref | Os nossos serviços num relance |
| `offer.sub.rental` | Remorques et camionnettes | Atrelados e carrinhas |
| `offer.sub.cars` | Stock à jour chaque matin | Stock atualizado todas as manhãs |
| `offer.sub.workshop` | Mécanique et carrosserie | Mecânica e chaparia |
| `offer.sub.trailers` | Saris, Humbaur, WM Meyer | Saris, Humbaur, WM Meyer |
| `offer.sub.garden` | Honda et Stihl | Honda e Stihl |
| `offer.sub.sodablast` | Décapage doux | Decapagem suave |
| `about.h2` | Qui sommes-nous ? | Quem somos |
| `about.text` | Le Garage Um Rond Point, c’est votre garage au rond-point d’Erpeldange, entre Ettelbruck et Diekirch. Location de remorques et de camionnettes, vente de voitures et de remorques, atelier et machines de jardin : tout se trouve à la même adresse. Passez nous voir, nous parlons votre langue. | A Garage Um Rond Point é a sua garagem na rotunda de Erpeldange, entre Ettelbruck e Diekirch. Aluguer de atrelados e carrinhas, venda de carros e atrelados, oficina e máquinas de jardim: tudo no mesmo endereço. Passe por cá – falamos a sua língua. |
| `about.link` | Nous trouver | Como chegar |
| `about.photoAlt` | Mécanicien qui tend une clé de voiture | Mecânico a entregar uma chave de carro |
| `details.points.workshop[0]` | Entretien et révision | Manutenção e revisão |
| `details.points.workshop[1]` | Diagnostic des pannes | Diagnóstico de avarias |
| `details.points.workshop[2]` | Réparation mécanique | Reparação mecânica |
| `details.points.workshop[3]` | Carrosserie et peinture | Chaparia e pintura |
| `details.points.sodablast[0]` | Décapage doux au bicarbonate de soude | Decapagem suave com bicarbonato de sódio |
| `details.points.sodablast[1]` | Carrosseries anciennes, jantes, pièces mécaniques | Carroçarias antigas, jantes, peças mecânicas |
| `details.points.sodablast[2]` | Premier avis sur photos par WhatsApp | Primeira opinião por fotos no WhatsApp |
| `details.points.garden[0]` | Vente de machines de jardin et de forêt | Venda de máquinas de jardim e floresta |
| `details.points.garden[1]` | Réparation de vos machines | Reparação das suas máquinas |
| `details.points.garden[2]` | Principalement Honda et Stihl | Sobretudo Honda e Stihl |
| `details.points.trailers[0]` | Remorques Saris, Humbaur et WM Meyer | Atrelados Saris, Humbaur e WM Meyer |
| `details.points.trailers[1]` | Pour particuliers et professionnels | Para particulares e profissionais |
| `details.points.trailers[2]` | Conseil sur le poids et le permis | Conselhos sobre peso e carta de condução |
| `details.workshop.entretienH` | Entretien et révision | Manutenção e revisão |
| `details.workshop.entretien` | Un entretien régulier garde votre voiture fiable et sûre : vidange, filtres, freins, niveaux et contrôle général. Indiquez-nous dans votre demande le kilométrage et la date du dernier entretien. | Uma manutenção regular mantém o carro fiável e seguro: mudança de óleo, filtros, travões, níveis e verificação geral. Indique no pedido os quilómetros e a data da última revisão. |
| `details.workshop.diagnosticH` | Diagnostic des pannes | Diagnóstico de avarias |
| `details.workshop.diagnostic` | Un voyant s’allume, un bruit inhabituel, la voiture démarre mal : décrivez ce que vous remarquez et depuis quand. Le diagnostic permet de trouver la cause avant de réparer. | Uma luz de aviso acende-se, um ruído estranho, o carro custa a pegar: descreva o que nota e desde quando. O diagnóstico encontra a causa antes da reparação. |
| `details.workshop.reparationH` | Réparation mécanique | Reparação mecânica |
| `details.workshop.reparation` | Après le diagnostic, nous réparons votre voiture ou votre camionnette dans notre atelier au rond-point d’Erpeldange. | Depois do diagnóstico, reparamos o seu carro ou a sua carrinha na nossa oficina, na rotunda de Erpeldange. |
| `details.workshop.carrosserieH` | Carrosserie et peinture | Chaparia e pintura |
| `details.workshop.carrosserie` | Après un accrochage, nous réparons la carrosserie et repeignons les éléments abîmés. Envoyez-nous des photos des dégâts sur WhatsApp pour un premier avis. | Depois de um pequeno toque, reparamos a carroçaria e pintamos as peças danificadas. Envie-nos fotos dos danos pelo WhatsApp para uma primeira opinião. |
| `details.workshop.processH2` | Comment prendre rendez-vous | Como marcar |
| `details.workshop.process[0]` | Décrivez votre véhicule et ce qu’il faut faire, dans le formulaire, par téléphone ou sur WhatsApp. | Descreva o veículo e o que é preciso fazer – no formulário, por telefone ou pelo WhatsApp. |
| `details.workshop.process[1]` | Nous vous rappelons pour fixer la date. | Ligamos-lhe de volta para marcar a data. |
| `details.workshop.process[2]` | Vous déposez votre véhicule au garage, au 1, rue du Viaduc. | Traz o veículo à garagem, no 1, rue du Viaduc. |
| `details.sodablast.explainH2` | Comment fonctionne le sodablast ? | Como funciona o sodablast? |
| `details.sodablast.explain` | Le bicarbonate de soude est projeté sur la surface avec de l’air comprimé. Plus tendre que le sable, il enlève la peinture, la graisse et la saleté sans creuser le métal. C’est pourquoi on l’utilise pour les pièces fragiles et les carrosseries anciennes. | O bicarbonato de sódio é projetado sobre a superfície com ar comprimido. É mais macio do que a areia e retira tinta, gordura e sujidade sem desgastar o metal. Por isso usa-se em peças delicadas e carroçarias antigas. |
| `details.sodablast.explain2` | Le décapage met à nu la surface d’origine : vous voyez l’état réel du métal avant une réparation ou une nouvelle peinture. | A decapagem deixa a superfície original à vista: vê o estado real do metal antes de uma reparação ou de uma nova pintura. |
| `details.sodablast.processH2` | Comment se passe un décapage | Como decorre uma decapagem |
| `details.sodablast.process[0]` | Envoyez-nous des photos de la voiture ou de la pièce sur WhatsApp. | Envie-nos fotos do carro ou da peça pelo WhatsApp. |
| `details.sodablast.process[1]` | Nous vous donnons un premier avis. | Damos-lhe uma primeira opinião. |
| `details.sodablast.process[2]` | Nous fixons ensemble un rendez-vous au garage. | Marcamos juntos uma data na garagem. |
| `details.garden.saleH2` | Vente | Venda |
| `details.garden.sale` | Tondeuse, débroussailleuse, tronçonneuse ou taille-haie : nous vendons des machines de jardin et de forêt, principalement des marques Honda et Stihl. Dites-nous la taille de votre terrain et ce que vous voulez faire, nous vous conseillons pour le choix. | Corta-relva, roçadora, motosserra ou corta-sebes: vendemos máquinas de jardim e floresta, sobretudo das marcas Honda e Stihl. Diga-nos o tamanho do terreno e o que quer fazer, e ajudamos na escolha. |
| `details.garden.repairH2` | Réparation | Reparação |
| `details.garden.repair` | La tondeuse ne démarre plus, la tronçonneuse coupe mal, la débroussailleuse perd de la puissance ? Apportez votre machine à l’atelier ou décrivez le problème dans le formulaire. | O corta-relva não pega, a motosserra corta mal, a roçadora perde força? Traga a máquina à oficina ou descreva o problema no formulário. |
| `details.trailers.chooseH2` | Bien choisir sa remorque | Escolher bem o atrelado |
| `details.trailers.masseH` | Masse maximale | Massa máxima autorizada |
| `details.trailers.masse` | Elle décide du permis nécessaire. Jusqu’à 750 kg, le permis B suffit ; au-delà, cela dépend de votre voiture. | Define a carta de condução necessária. Até 750 kg, a carta B chega; acima disso, depende do seu carro. |
| `details.trailers.freinH` | Freinage | Travões |
| `details.trailers.frein` | Une remorque de plus de 750 kg de masse maximale doit être équipée de freins. | Um atrelado com mais de 750 kg de massa máxima autorizada tem de ter travões. |
| `details.trailers.chargeH` | Charge remorquable | Carga rebocável |
| `details.trailers.charge` | Votre voiture ne peut pas tracter plus que la valeur du champ O.1 (remorque freinée) ou O.2 (non freinée) du certificat d’immatriculation. | O seu carro não pode rebocar mais do que o valor do campo O.1 (atrelado com travões) ou O.2 (sem travões) do certificado de matrícula. |
| `details.trailers.usageH` | Forme et dimensions | Tipo e dimensões |
| `details.trailers.usage` | Plateau, benne, porte-voiture ou fourgon : la bonne remorque dépend de ce que vous transportez le plus souvent et de la place pour la ranger. | Plataforma, basculante, porta-carros ou fechado: o atrelado certo depende do que transporta com mais frequência e de onde o vai guardar. |

