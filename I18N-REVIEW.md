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

## Lëtzebuergesch: 782 Texte offen

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
| `cars.filter.apply` | Voir les résultats | Resultater weisen |
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
| `forms.fallbackH` | Dernière étape : envoyez votre demande | Leschte Schrëtt: Är Ufro schécken |
| `forms.fallbackText` | Choisissez comment nous la transmettre. Votre message est déjà rédigé, il suffit de l’envoyer. | Wielt, wéi Dir eis d’Ufro schéckt. Äre Message ass scho fäerdeg geschriwwen, Dir musst en just nach schécken. |
| `forms.fallbackWhatsapp` | Envoyer par WhatsApp | Iwwer WhatsApp schécken |
| `forms.fallbackMail` | Envoyer par e-mail | Per E-Mail schécken |
| `forms.fallbackEdit` | Modifier la demande | Ufro änneren |
| `forms.fallbackSubject` | Demande depuis le site | Ufro iwwer de Site |
| `forms.fallbackIntro` | Bonjour, voici ma demande : | Moien, hei ass meng Ufro: |
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
| `content.workshop.sections.s1.h` | Votre garage de proximité entre Ettelbruck et Diekirch | Är Garage no bei Iech, tëscht Ettelbréck an Dikrech |
| `content.workshop.sections.s1.p[0]` | Le Garage Um Rond Point se trouve au {address}, directement au rond-point d’Erpeldange, à côté de la station Aral. Pour les habitants d’Erpeldange-sur-Sûre, d’Ettelbruck, de Diekirch et de toute la Nordstad, l’atelier est à quelques minutes de chez vous. | D’Garage Um Rond Point ass um {address}, direkt um Rond-point zu Ierpeldeng, nieft der Aral-Tankstell. Wann Dir zu Ierpeldeng, Ettelbréck, Dikrech oder soss iergendwou an der Nordstad wunnt, ass eisen Atelier just e puer Minutten ewech. |
| `content.workshop.sections.s1.p[1]` | Nous parlons luxembourgeois, français, allemand, anglais et portugais. Vous pouvez donc nous expliquer le problème de votre voiture dans la langue qui vous convient le mieux. | Mir schwätze Lëtzebuergesch, Franséisch, Däitsch, Englesch a Portugisesch. Dir kënnt eis de Problem mat Ärem Auto also an der Sprooch erklären, déi Iech am léifsten ass. |
| `content.workshop.sections.s2.h` | Entretien : pourquoi suivre le plan du constructeur | Entretien: firwat de Plang vum Hiersteller wichteg ass |
| `content.workshop.sections.s2.p[0]` | Chaque constructeur fixe un plan d’entretien, selon le kilométrage ou le temps écoulé depuis le dernier passage. Vous le trouvez dans le carnet d’entretien ou sur l’écran de bord de votre voiture. | All Hiersteller leet en Entretiensplang fest, nom Kilometerstand oder no der Zäit zënter dem leschte Besuch an der Garage. Dir fannt en am Carnet d’entretien oder um Écran vun Ärem Auto. |
| `content.workshop.sections.s2.p[1]` | Respecter ces échéances limite l’usure, évite des pannes coûteuses et aide à garder la valeur de la voiture à la revente. Selon le plan, un entretien comprend par exemple la vidange, les filtres, le contrôle des freins et des niveaux, l’éclairage et les essuie-glaces. | Wann Dir Iech un dëse Plang haalt, gëtt Ären Auto manner ofgenotzt, Dir vermeit deier Pannen an den Auto behält beim Verkaf besser säi Wäert. Wat zu engem Entretien gehéiert, hänkt vum Plang of. Dozou gehéieren zum Beispill den Uelegwiessel, d’Filteren, d’Kontroll vun de Bremsen an den Niveauen, d’Luuchten an d’Scheiwewëscher. |
| `content.workshop.sections.s3.h` | Les signes qui doivent vous faire venir à l’atelier | Bei dësen Zeeche sollt Dir an den Atelier kommen |
| `content.workshop.sections.s3.items[0]` | Un voyant reste allumé au tableau de bord. | Eng Warnluucht am Cockpit geet net méi aus. |
| `content.workshop.sections.s3.items[1]` | Le freinage grince, vibre ou tire d’un côté. | D’Bremse jäizen, vibréieren oder zéien op eng Säit. |
| `content.workshop.sections.s3.items[2]` | Le moteur manque de puissance ou démarre mal. | De Motor huet ze wéineg Kraaft oder spréngt schlecht un. |
| `content.workshop.sections.s3.items[3]` | Une odeur de brûlé, une fuite ou une fumée inhabituelle. | Et richt verbrannt, eppes leeft aus oder et kënnt ongewéinlechen Damp. |
| `content.workshop.sections.s3.items[4]` | Un bruit nouveau en roulant ou en tournant le volant. | En neie Geräisch beim Fueren oder wann Dir d’Steierrad dréit. |
| `content.workshop.sections.s3.p[0]` | Plus tôt un défaut est trouvé, plus la réparation reste simple. Décrivez dans le formulaire ce que vous remarquez et depuis quand : c’est la meilleure base pour le diagnostic. | Gëtt e Feeler fréi fonnt, bleift d’Reparatur méi einfach. Beschreift am Formulaire, wat Dir mierkt a zënter wéini: Dat ass déi bescht Basis fir d’Diagnos. |
| `content.workshop.sections.s4.h` | Carrosserie et peinture après un accrochage | Karosserie a Lack no engem klengen Accident |
| `content.workshop.sections.s4.p[0]` | Rayure, bosse ou pare-chocs abîmé : envoyez-nous des photos des dégâts sur WhatsApp au {whatsapp}. Vous recevez un premier avis avant même de venir. Ensuite, nous réparons la carrosserie et repeignons les éléments abîmés dans notre atelier. | Ass d’Karosserie verkraazt oder agedréckt, oder ass de Pare-choc beschiedegt? Da schéckt eis Fotoe vum Schued iwwer WhatsApp op {whatsapp}. Dir kritt eng éischt Aschätzung, nach ier Dir bei eis kommt. Duerno reparéiere mir an eisem Atelier d’Karosserie a lackéieren déi beschiedegt Deeler nei. |
| `content.workshop.sections.s4.p[1]` | Si un autre véhicule est en cause, remplissez le constat amiable sur place et prenez vous-même des photos de l’accident. Ces documents sont utiles pour votre assurance. | Wann en anert Gefier bedeelegt ass, fëllt de Constat amiable op der Plaz aus a maacht selwer Fotoe vum Accident. Dës Dokumenter sinn nëtzlech fir Är Versécherung. |
| `content.workshop.sections.s5.h` | Voitures et camionnettes | Autoen a Camionnetten |
| `content.workshop.sections.s5.p[0]` | L’atelier s’occupe des voitures et des camionnettes. Pour une tondeuse, une tronçonneuse ou une autre machine, voyez notre page [Jardin & forêt](page:garden). Pour mettre une carrosserie ou une pièce à nu, découvrez le [décapage sodablast](page:sodablast). | Eisen Atelier këmmert sech ëm Autoen a Camionnetten. Fir e Rasemeeër, eng Motorsee oder eng aner Maschinn kuckt op eiser Säit [Gaart & Bësch](page:garden). Fir eng Karosserie oder en Deel bis op d’Metall ofzebeizen, entdeckt eist [Ofbeize mat Sodablast](page:sodablast). |
| `content.workshop.faqH` | Questions sur l’atelier | Froen zum Atelier |
| `content.workshop.faq.q1.q` | Comment prendre rendez-vous à l’atelier ? | Wéi maachen ech e Rendez-vous am Atelier aus? |
| `content.workshop.faq.q1.a` | Décrivez votre véhicule et ce qu’il faut faire dans le formulaire de cette page, par téléphone au {phone} ou sur WhatsApp au {whatsapp}. Nous vous rappelons pour fixer le rendez-vous. | Beschreift Äert Gefier a wat ze maachen ass: am Formulaire op dëser Säit, um Telefon op {phone} oder iwwer WhatsApp op {whatsapp}. Mir ruffen Iech zréck, fir de Rendez-vous auszemaachen. |
| `content.workshop.faq.q2.q` | Quand le garage est-il ouvert ? | Wéini ass d’Garage op? |
| `content.workshop.faq.q2.a` | {hours} | {hours} |
| `content.workshop.faq.q3.q` | Puis-je envoyer des photos avant de venir ? | Kann ech Fotoe schécken, ier ech kommen? |
| `content.workshop.faq.q3.a` | Oui. Pour la carrosserie ou le sodablast, envoyez-nous des photos sur WhatsApp au {whatsapp} : vous recevez un premier avis. | Jo. Fir Karosserie oder Sodablast schéckt eis Fotoen iwwer WhatsApp op {whatsapp}: Dir kritt eng éischt Aschätzung. |
| `content.workshop.faq.q4.q` | Où se trouve l’atelier ? | Wou ass den Atelier? |
| `content.workshop.faq.q4.a` | Au {address}, au rond-point d’Erpeldange, à côté de la station Aral, entre Ettelbruck et Diekirch. | Um {address}, um Rond-point zu Ierpeldeng, nieft der Aral-Tankstell, tëscht Ettelbréck an Dikrech. |
| `content.workshop.faq.q5.q` | Dans quelles langues puis-je expliquer le problème ? | A wéi enge Sprooche kann ech de Problem erklären? |
| `content.workshop.faq.q5.a` | En luxembourgeois, en français, en allemand, en anglais ou en portugais. | Op Lëtzebuergesch, Franséisch, Däitsch, Englesch oder Portugisesch. |
| `content.sodablast.sections.s1.h` | Sodablast ou sablage : quelle différence ? | Sodablast oder Sandstralen: wat ass den Ënnerscheed? |
| `content.sodablast.sections.s1.p[0]` | Le sablage classique projette un abrasif dur, comme le sable ou le corindon. Il décape vite, mais il attaque aussi le métal et peut chauffer et déformer les tôles fines. | Beim klassesche Sandstrale gëtt en haart Material wéi Sand oder Korund op d’Uewerfläch gestraalt. Dat beizt séier of, mä et gräift och d’Metall un a kann dënn Blecher erhëtzen an deforméieren. |
| `content.sodablast.sections.s1.p[1]` | Le bicarbonate de soude est beaucoup plus tendre que le métal. Il enlève la peinture, la graisse et la saleté sans creuser la surface et sans la chauffer. C’est pourquoi le sodablast convient aux pièces fragiles et aux carrosseries anciennes. | Natron ass vill méi mëll wéi Metall. Et hëlt Lack, Fett an Dreck ewech, ouni d’Uewerfläch ofzedroen an ouni se z’erhëtzen. Dofir passt Sodablast gutt fir empfindlech Deeler an al Karosserien. |
| `content.sodablast.sections.s2.h` | Pour quels projets ? | Fir wéi eng Projeten? |
| `content.sodablast.sections.s2.items[0]` | Restauration d’une voiture ancienne : mettre la carrosserie à nu avant la réparation et la peinture. | Restauratioun vun engem alen Auto: d’Karosserie bis op d’Metall fräileeën, ier se reparéiert a lackéiert gëtt. |
| `content.sodablast.sections.s2.items[1]` | Jantes : enlever l’ancienne peinture et la saleté incrustée avant une remise en peinture. | Felgen: den ale Lack an de festsëtzenden Dreck ewechmaachen, ier se nei lackéiert ginn. |
| `content.sodablast.sections.s2.items[2]` | Pièces mécaniques : nettoyer un carter, un bloc ou une culasse avant le contrôle ou le remontage. | Mechanesch Deeler: e Carter, e Motorblock oder en Zylinderkapp botzen, ier se kontrolléiert oder erëm zesummegebaut ginn. |
| `content.sodablast.sections.s2.p[0]` | Vous ne savez pas si votre pièce s’y prête ? Envoyez une photo sur WhatsApp au {whatsapp}, nous vous le disons. | Dir wësst net, ob Ären Deel sech dofir eegent? Schéckt eis eng Foto iwwer WhatsApp op {whatsapp}, mir soen Iech et. |
| `content.sodablast.sections.s3.h` | Après le décapage : protéger le métal | Nom Ofbeizen: d’Metall schützen |
| `content.sodablast.sections.s3.p[0]` | Une surface décapée est du métal nu. Au contact de l’air et de l’humidité, elle s’oxyde vite. Prévoyez donc l’étape suivante dès le départ : apprêt, réparation ou peinture. Les résidus de bicarbonate se rincent à l’eau avant la mise en peinture. | Eng ofgebeizt Uewerfläch ass blankt Metall. Am Kontakt mat Loft a Fiichtegkeet oxydéiert se séier. Plangt dofir den nächste Schrëtt vun Ufank un: Grondéierung, Reparatur oder Lack. D’Natronreschter gi virum Lackéiere mat Waasser ofgespullt. |
| `content.sodablast.sections.s3.p[1]` | Pour une voiture, notre atelier peut ensuite réparer la carrosserie et la repeindre : voyez [mécanique et carrosserie](page:workshop). | Bei engem Auto kann eisen Atelier duerno d’Karosserie reparéieren an nei lackéieren: Kuckt [Mechanik a Karosserie](page:workshop). |
| `content.sodablast.sections.s4.h` | Sodablast au Luxembourg, à Erpeldange | Sodablast zu Lëtzebuerg, zu Ierpeldeng |
| `content.sodablast.sections.s4.p[0]` | Notre atelier se trouve au rond-point d’Erpeldange-sur-Sûre, entre Ettelbruck et Diekirch, facile d’accès depuis tout le nord du Luxembourg. Pour une pièce comme pour une voiture complète, nous fixons ensemble un rendez-vous au garage. | Eisen Atelier ass um Rond-point zu Ierpeldeng, tëscht Ettelbréck an Dikrech, an aus dem ganzen Norde vu Lëtzebuerg einfach z’erreechen. Ob fir en eenzelnen Deel oder fir e ganzen Auto: Mir maachen zesummen e Rendez-vous an der Garage aus. |
| `content.sodablast.faqH` | Questions sur le sodablast | Froen zum Sodablast |
| `content.sodablast.faq.q1.q` | Le sodablast abîme-t-il le métal ? | Beschiedegt Sodablast d’Metall? |
| `content.sodablast.faq.q1.a` | Non. Le bicarbonate de soude est plus tendre que le métal : il enlève la peinture, la graisse et la saleté sans creuser la surface. C’est ce qui le distingue du sablage. | Nee. Natron ass méi mëll wéi Metall: Et hëlt Lack, Fett an Dreck ewech, ouni d’Uewerfläch ofzedroen. Dat ass den Ënnerscheed zum Sandstralen. |
| `content.sodablast.faq.q2.q` | Combien coûte un décapage sodablast ? | Wat kascht d’Ofbeize mat Sodablast? |
| `content.sodablast.faq.q2.a` | Cela dépend de la taille de la pièce et des couches à enlever. Envoyez des photos sur WhatsApp au {whatsapp} : vous recevez un premier avis. | Dat hänkt dovun of, wéi grouss den Deel ass a wéi vill Schichten ewech mussen. Schéckt eis Fotoen iwwer WhatsApp op {whatsapp}: Dir kritt eng éischt Aschätzung. |
| `content.sodablast.faq.q3.q` | Faut-il traiter la pièce après le décapage ? | Muss den Deel nom Ofbeize behandelt ginn? |
| `content.sodablast.faq.q3.a` | Oui. Le métal mis à nu doit être protégé rapidement par un apprêt ou une peinture, sinon il s’oxyde. | Jo. Dat blankt Metall muss séier mat enger Grondéierung oder engem Lack geschützt ginn, soss oxydéiert et. |
| `content.sodablast.faq.q4.q` | Peut-on décaper des jantes au sodablast ? | Kann een och Felge mat Sodablast ofbeizen? |
| `content.sodablast.faq.q4.a` | Oui, les jantes font partie des pièces que nous décapons au sodablast, comme les carrosseries anciennes et les pièces mécaniques. | Jo, Felge gehéieren zu den Deeler, déi mir mat Sodablast ofbeizen, sou wéi al Karosserien a mechanesch Deeler. |
| `content.garden.sections.s1.h` | Machines de jardin et de forêt dans la Nordstad | Gaart- a Bëschmaschinnen an der Nordstad |
| `content.garden.sections.s1.p[0]` | Pour entretenir votre jardin, votre terrain ou votre bois, vous trouvez au Garage Um Rond Point des machines principalement des marques Honda et Stihl, et un atelier pour les réparer. Le garage se trouve au rond-point d’Erpeldange, entre Ettelbruck et Diekirch. | Fir Äre Gaart, Ären Terrain oder Äre Bësch ze fleegen, fannt Dir an der Garage Um Rond Point Maschinnen, virun allem vun de Marken Honda a Stihl, an en Atelier, fir se ze reparéieren. D’Garage ass um Rond-point zu Ierpeldeng, tëscht Ettelbréck an Dikrech. |
| `content.garden.sections.s2.h` | Bien choisir sa machine | Déi richteg Maschinn wielen |
| `content.garden.sections.s2.items[0]` | Tondeuse : la surface de la pelouse, la pente et les obstacles décident de la largeur de coupe et du type d’entraînement. | Rasemeeër: D’Gréisst vum Rasen, d’Steigung an d’Hindernisser bestëmmen d’Schnëttbreet an d’Aart vum Undriff. |
| `content.garden.sections.s2.items[1]` | Débroussailleuse : pour les bordures, les talus et l’herbe haute que la tondeuse n’atteint pas. | Fräischneider: fir Kanten, Häng an héicht Gras, wou de Rasemeeër net hikënnt. |
| `content.garden.sections.s2.items[2]` | Tronçonneuse : la longueur du guide dépend du diamètre du bois que vous coupez le plus souvent. | Motorsee: D’Längt vum Schwäert hänkt vum Duerchmiesser vum Holz of, dat Dir am meeschte schneit. |
| `content.garden.sections.s2.items[3]` | Taille-haie : la longueur de la lame et le poids comptent si vous taillez longtemps ou en hauteur. | Heckeschéier: D’Längt vum Messer an d’Gewiicht zielen, wann Dir laang oder an der Héicht schneit. |
| `content.garden.sections.s2.p[0]` | Thermique ou à batterie ? Une machine à batterie est plus silencieuse et démarre sans effort. Une machine thermique garde son autonomie sur les grands terrains. Dites-nous comment vous l’utilisez, nous vous conseillons. | Bensin oder Akku? Eng Maschinn mat Akku ass méi roueg a spréngt ouni Méi un. Eng Maschinn mat Bensinsmotor hält och op grousse Flächen duer. Sot eis, wéi Dir se benotzt, mir beroden Iech. |
| `content.garden.sections.s3.h` | Réparation : quand apporter votre machine | Reparatur: wéini Dir Är Maschinn brénge sollt |
| `content.garden.sections.s3.items[0]` | Le moteur ne démarre plus ou cale. | De Motor spréngt net méi un oder geet aus. |
| `content.garden.sections.s3.items[1]` | La machine perd de la puissance ou fume. | D’Maschinn verléiert Kraaft oder fëmmt. |
| `content.garden.sections.s3.items[2]` | La chaîne ou la lame coupe mal. | D’Kett oder d’Messer schneit schlecht. |
| `content.garden.sections.s3.items[3]` | Des bruits ou des vibrations inhabituels apparaissent. | Dir héiert ongewéinlech Geräischer oder spiert Vibratiounen. |
| `content.garden.sections.s3.p[0]` | Décrivez la panne dans le formulaire ou appelez-nous au {phone}. Indiquez la marque et le modèle de la machine : nous savons tout de suite de quoi il s’agit. | Beschreift d’Pann am Formulaire oder rufft eis un op {phone}. Gitt d’Mark an de Modell vun der Maschinn un: Da wësse mir direkt, ëm wat et geet. |
| `content.garden.sections.s4.h` | Conseils pour passer l’hiver | Esou kënnt Är Maschinn gutt duerch de Wanter |
| `content.garden.sections.s4.p[0]` | Avant de ranger une machine thermique pour l’hiver, nettoyez-la, videz le réservoir ou laissez le moteur tourner jusqu’à l’arrêt, puis rangez-la au sec. Une machine bien rangée redémarre plus facilement au printemps. | Ier Dir eng Maschinn mat Bensinsmotor fir de Wanter ewechstellt, botzt se, maacht den Tank eidel oder loosst de Motor lafen, bis hien ausgeet. Stellt se duerno am Dréchenen of. Esou spréngt d’Maschinn am Fréijoer méi einfach erëm un. |
| `content.garden.sections.s4.p[1]` | Les batteries se stockent à l’abri du gel, de préférence à moitié chargées. | Den Akku gehéiert op eng frostfräi Plaz, am beschten hallef gelueden. |
| `content.garden.faqH` | Questions sur les machines de jardin | Froen zu de Gaartmaschinnen |
| `content.garden.faq.q1.q` | Quelles marques de machines vendez-vous ? | Vu wéi enge Marke verkaaft Dir Maschinnen? |
| `content.garden.faq.q1.a` | Principalement des machines Honda et Stihl. | Virun allem Maschinne vun Honda a Stihl. |
| `content.garden.faq.q2.q` | Comment faire réparer ma tondeuse ou ma tronçonneuse ? | Wéi loossen ech mäi Rasemeeër oder meng Motorsee reparéieren? |
| `content.garden.faq.q2.a` | Apportez la machine à l’atelier ou décrivez la panne dans le formulaire de cette page. Nous vous rappelons. | Bréngt d’Maschinn an den Atelier oder beschreift d’Pann am Formulaire op dëser Säit. Mir ruffen Iech zréck. |
| `content.garden.faq.q3.q` | Quand puis-je passer au garage ? | Wéini kann ech an der Garage laanschtkommen? |
| `content.garden.faq.q3.a` | {hours} | {hours} |
| `content.garden.faq.q4.q` | Où se trouve le garage ? | Wou ass d’Garage? |
| `content.garden.faq.q4.a` | Au {address}, au rond-point d’Erpeldange, à côté de la station Aral. | Um {address}, um Rond-point zu Ierpeldeng, nieft der Aral-Tankstell. |
| `content.trailersForSale.sections.s1.h` | Saris, Humbaur et WM Meyer à Erpeldange | Saris, Humbaur a WM Meyer zu Ierpeldeng |
| `content.trailersForSale.sections.s1.p[0]` | Nous vendons des remorques des marques Saris, Humbaur et WM Meyer, pour les particuliers comme pour les professionnels. Dites-nous ce que vous transportez : nous vous aidons à trouver le modèle qui convient à votre voiture et à votre permis. | Mir verkafen Unhänger vu Saris, Humbaur a WM Meyer, fir Privatleit a fir Betriber. Sot eis, wat Dir transportéiert: Mir hëllefen Iech, de Modell ze fannen, deen zu Ärem Auto an zu Ärem Führerschäin passt. |
| `content.trailersForSale.sections.s1.p[1]` | Le garage se trouve au rond-point d’Erpeldange-sur-Sûre, entre Ettelbruck et Diekirch. | D’Garage ass um Rond-point zu Ierpeldeng, tëscht Ettelbréck an Dikrech. |
| `content.trailersForSale.sections.s2.h` | Les bonnes questions avant d’acheter | Déi richteg Froe virum Kaf |
| `content.trailersForSale.sections.s2.items[0]` | Qu’est-ce que je transporte le plus souvent, et quel poids ? | Wat transportéieren ech am meeschten, a wéi vill weit et? |
| `content.trailersForSale.sections.s2.items[1]` | Quelle longueur et quelle largeur de plateau me faut-il ? | Wéi laang a wéi breet muss d’Luedfläch sinn? |
| `content.trailersForSale.sections.s2.items[2]` | Ma voiture peut-elle tracter cette remorque (champs O.1 et O.2 du certificat d’immatriculation) ? | Ka mäin Auto dësen Unhänger zéien (Felder O.1 an O.2 vun der Carte grise)? |
| `content.trailersForSale.sections.s2.items[3]` | Mon permis suffit-il : B, B avec le code 96 ou BE ? | Geet mäi Führerschäin duer: B, B mam Code 96 oder BE? |
| `content.trailersForSale.sections.s2.items[4]` | Où vais-je garer la remorque quand je ne m’en sers pas ? | Wou stellen ech den Unhänger of, wann ech en net brauch? |
| `content.trailersForSale.sections.s3.h` | Particuliers et professionnels | Privatleit a Betriber |
| `content.trailersForSale.sections.s3.p[0]` | Pour un particulier, la remorque sert au jardin, au déménagement ou au transport d’un véhicule de loisir. Pour un artisan ou une entreprise, elle transporte chaque jour du matériel et des machines : la charge utile, la robustesse du plateau et les points d’arrimage comptent alors davantage. | Privatleit brauchen den Unhänger fir de Gaart, fir ze plënneren oder fir e Fräizäitgefier ze transportéieren. En Handwierker oder e Betrib transportéiert domat all Dag Material a Maschinnen: Do zielen d’Notzlaascht, eng robust Luedfläch an d’Befestegungspunkten nach méi. |
| `content.trailersForSale.sections.s4.h` | Acheter ou louer ? | Kafen oder lounen? |
| `content.trailersForSale.sections.s4.p[0]` | Si vous n’avez besoin d’une remorque que de temps en temps, la [location](page:rental) peut suffire. Notre guide vous montre aussi quelle remorque votre permis autorise. | Wann Dir nëmmen heiansdo en Unhänger braucht, kann et duergoen, een ze [lounen](page:rental). Eis Unhängersich weist Iech och, wéi en Unhänger Dir mat Ärem Führerschäin zéien dierft. |
| `content.trailersForSale.faqH` | Questions sur l’achat d’une remorque | Froen zum Kaf vun engem Unhänger |
| `content.trailersForSale.faq.q1.q` | Quelles marques de remorques vendez-vous ? | Vu wéi enge Marke verkaaft Dir Unhänger? |
| `content.trailersForSale.faq.q1.a` | Saris, Humbaur et WM Meyer. | Saris, Humbaur a WM Meyer. |
| `content.trailersForSale.faq.q2.q` | Vendez-vous aussi aux professionnels ? | Verkaaft Dir och u Betriber? |
| `content.trailersForSale.faq.q2.a` | Oui, nous vendons des remorques aux particuliers et aux professionnels. | Jo, mir verkafen Unhänger u Privatleit an u Betriber. |
| `content.cars.sections.s1.h` | Acheter une voiture au Garage Um Rond Point | En Auto kafen an der Garage Um Rond Point |
| `content.cars.sections.s1.p[0]` | Toutes les voitures de cette page sont en stock chez nous, au rond-point d’Erpeldange. La liste est mise à jour chaque matin à partir de nos annonces : vous voyez le prix, le kilométrage, l’année et les photos de chaque voiture. | All d’Autoen op dëser Säit si bei eis am Stock, um Rond-point zu Ierpeldeng. D’Lëscht gëtt all Moien op Basis vun eisen Annoncen aktualiséiert: Dir gesitt de Präis, de Kilometerstand, d’Joer an d’Fotoe vun all Auto. |
| `content.cars.sections.s1.items[0]` | Choisissez une voiture dans la liste et ouvrez sa fiche. | Wielt en Auto aus der Lëscht a maacht seng Detailsäit op. |
| `content.cars.sections.s1.items[1]` | Appelez-nous ou écrivez-nous sur WhatsApp pour vérifier qu’elle est encore disponible. | Rufft eis un oder schreift eis op WhatsApp, fir nozefroen, ob en nach disponibel ass. |
| `content.cars.sections.s1.items[2]` | Venez la voir au garage et faites un essai sur rendez-vous. | Kommt den Auto an der Garage kucken a maacht eng Probefahrt op Rendez-vous. |
| `content.cars.sections.s2.h` | Voitures neuves et d’occasion près d’Ettelbruck et de Diekirch | Nei Autoen an Occasiounen no bei Ettelbréck an Dikrech |
| `content.cars.sections.s2.p[0]` | Le stock comprend des voitures neuves et des voitures d’occasion. Il change souvent : la liste vous montre chaque jour l’état du matin. Nos annonces sont aussi publiées sur LuxAuto et AutoScout24. | Am Stock sinn nei Autoen an Occasiounen. De Stock ännert sech dacks: D’Lëscht weist Iech all Dag de Stand vum Moien. Dir fannt eis Annoncen och op LuxAuto an AutoScout24. |
| `content.cars.sections.s3.h` | Et votre voiture actuelle ? | Wat ass mat Ärem aktuellen Auto? |
| `content.cars.sections.s3.p[0]` | Vous souhaitez faire reprendre votre voiture ? Indiquez-le dans le formulaire de la voiture qui vous intéresse. Vous préférez vendre sans vous en occuper ? Découvrez notre service de dépôt-vente plus bas sur cette page. | Wëllt Dir Ären Auto a Reprise ginn? Sot et eis am Formulaire vum Auto, deen Iech interesséiert. Wëllt Dir léiwer verkafen, ouni Iech selwer drëm ze këmmeren? Entdeckt eise Kommissiounsverkaf méi ënnen op dëser Säit. |
| `content.cars.faqH` | Questions sur nos voitures | Froen zu eisen Autoen |
| `content.cars.faq.q1.q` | Puis-je essayer une voiture ? | Kann ech eng Probefahrt maachen? |
| `content.cars.faq.q1.a` | Oui, sur rendez-vous. Appelez-nous au {phone} ou écrivez-nous sur WhatsApp au {whatsapp}. | Jo, op Rendez-vous. Rufft eis un op {phone} oder schreift eis iwwer WhatsApp op {whatsapp}. |
| `content.cars.faq.q2.q` | Où puis-je voir les voitures ? | Wou kann ech d’Autoe kucken? |
| `content.cars.faq.q2.a` | Au garage, au {address}, au rond-point d’Erpeldange. {hours} | An der Garage, um {address}, um Rond-point zu Ierpeldeng. {hours} |
| `content.cars.faq.q3.q` | Vos voitures sont-elles aussi sur LuxAuto et AutoScout24 ? | Sinn Är Autoen och op LuxAuto an AutoScout24? |
| `content.cars.faq.q3.a` | Oui, nos annonces sont aussi publiées sur LuxAuto et AutoScout24. Ici, vous voyez tout notre stock au même endroit. | Jo, Dir fannt eis Annoncen och op LuxAuto an AutoScout24. Hei gesitt Dir eise ganze Stock op enger Plaz. |
| `content.contact.sections.s1.h` | Quel moyen choisir ? | Wéi erreecht Dir eis am beschten? |
| `content.contact.sections.s1.items[0]` | Une question rapide ou des photos à nous montrer : WhatsApp au {whatsapp}. | Eng kuerz Fro oder Fotoen, déi Dir eis weise wëllt: WhatsApp op {whatsapp}. |
| `content.contact.sections.s1.items[1]` | Un rendez-vous ou une réponse tout de suite : téléphone au {phone}. | E Rendez-vous oder eng direkt Äntwert: Telefon op {phone}. |
| `content.contact.sections.s1.items[2]` | Une demande détaillée : le formulaire ci-dessous ou un e-mail à {email}. | Eng detailléiert Ufro: de Formulaire hei ënnen oder eng E-Mail un {email}. |
| `content.contact.sections.s2.h` | Venir au garage | De Wee bei eis an d’Garage |
| `content.contact.sections.s2.p[0]` | Le garage se trouve au {address}, au rond-point d’Erpeldange-sur-Sûre, à côté de la station Aral. Vous venez d’Ettelbruck ou de Diekirch ? Le rond-point est sur votre route. Pour l’itinéraire exact, ouvrez Google Maps depuis cette page. | D’Garage ass um {address}, um Rond-point zu Ierpeldeng, nieft der Aral-Tankstell. Kommt Dir vun Ettelbréck oder vun Dikrech? Da läit de Rond-point op Ärem Wee. Fir déi genee Route maacht Google Maps iwwer dës Säit op. |
| `content.contact.faqH` | Questions pratiques | Praktesch Froen |
| `content.contact.faq.q1.q` | Quand le garage est-il ouvert ? | Wéini ass d’Garage op? |
| `content.contact.faq.q1.a` | {hours} | {hours} |
| `content.contact.faq.q2.q` | Quelles langues parlez-vous ? | Wéi eng Sprooche schwätzt Dir? |
| `content.contact.faq.q2.a` | Nous parlons luxembourgeois, français, allemand, anglais et portugais. | Mir schwätze Lëtzebuergesch, Franséisch, Däitsch, Englesch a Portugisesch. |
| `content.rental.sections.s1.h` | Location de remorques dans la Nordstad | Unhänger lounen an der Nordstad |
| `content.rental.sections.s1.p[0]` | Au rond-point d’Erpeldange, entre Ettelbruck et Diekirch, vous louez une remorque ou une camionnette tout près de chez vous. Notre guide ci-dessus vous montre en quelques clics quelle remorque convient à ce que vous transportez et si votre permis suffit. | Um Rond-point zu Ierpeldeng, tëscht Ettelbréck an Dikrech, lount Dir en Unhänger oder eng Camionnette ganz no bei Iech doheem. Eis Unhängersich hei uewe weist Iech mat e puer Klicks, wéi en Unhänger zu deem passt, wat Dir transportéiert, an ob Äre Führerschäin duergeet. |
| `content.rental.sections.s2.h` | Conseils pour bien charger | Tipps fir richteg ze lueden |
| `content.rental.sections.s2.items[0]` | Ne dépassez jamais la masse maximale de la remorque, ni la charge remorquable de votre voiture. | Iwwerschreit ni dat zulässegt Gesamtgewiicht vum Unhänger an och net d’Unhängelaascht vun Ärem Auto. |
| `content.rental.sections.s2.items[1]` | Répartissez la charge : les objets lourds au-dessus de l’essieu, un peu de poids sur la flèche, comme l’indique la notice. | Verdeelt d’Luedung: schwéier Saachen iwwer d’Achs, e bësse Gewiicht op d’Kupplung, sou wéi et an der Uleedung steet. |
| `content.rental.sections.s2.items[2]` | Arrimez le chargement avec des sangles et couvrez le vrac avec une bâche ou un filet. | Sécheert d’Luedung mat Spannrimmen an deckt alles, wat lass ass, mat enger Bâche oder engem Netz of. |
| `content.rental.sections.s2.items[3]` | Avant de partir, vérifiez l’attelage, les feux et la pression des pneus. | Ier Dir lassfuert, kontrolléiert d’Kupplung, d’Luuchten an den Drock vun de Pneuen. |
| `content.rental.sections.s2.items[4]` | Roulez plus doucement qu’à vide : l’ensemble freine moins bien et prend plus de place dans les virages. | Fuert méi lues wéi ouni Luedung: Auto an Unhänger bremse manner gutt a brauche méi Plaz an de Kéieren. |
| `content.category.porte-voiture.sections.s1.h` | Quand louer un porte-voiture ? | Wéini en Autosunhänger lounen? |
| `content.category.porte-voiture.sections.s1.p[0]` | Pour ramener une voiture qui ne roule plus, transporter une voiture de collection sans ajouter de kilomètres, ou aller chercher une voiture achetée loin de chez vous. Le porte-voiture évite de faire rouler la voiture transportée. | Fir en Auto heemzebréngen, deen net méi fiert, fir en Oldtimer ze transportéieren, ouni Kilometer dobäizefueren, oder fir en Auto ofzehuelen, deen Dir wäit vun doheem kaaft hutt. Mam Autosunhänger muss den transportéierten Auto net selwer fueren. |
| `content.category.porte-voiture.sections.s2.h` | Charger une voiture en sécurité | En Auto sécher lueden |
| `content.category.porte-voiture.sections.s2.items[0]` | Vérifiez que la voiture transportée ne dépasse pas la charge utile de la remorque. | Kontrolléiert, datt den Auto net méi weit wéi d’Notzlaascht vum Unhänger. |
| `content.category.porte-voiture.sections.s2.items[1]` | Montez lentement, bien dans l’axe des rampes, avec quelqu’un qui vous guide. | Fuert lues a riicht op d’Rampen erop, mat engem, deen Iech aweist. |
| `content.category.porte-voiture.sections.s2.items[2]` | Placez la voiture pour qu’un peu de poids repose sur l’avant de la remorque, comme l’indique la notice. | Stellt den Auto esou, datt e bësse Gewiicht op de viischten Deel vum Unhänger läit, sou wéi et an der Uleedung steet. |
| `content.category.porte-voiture.sections.s2.items[3]` | Arrimez chaque roue avec des sangles adaptées et contrôlez-les après les premiers kilomètres. | Sécheert all Rad mat passende Spannrimmen a kontrolléiert se no den éischte Kilometer. |
| `content.category.porte-moto.sections.s1.h` | Transporter une moto | Eng Moto transportéieren |
| `content.category.porte-moto.sections.s1.p[0]` | Pour aller sur un circuit, faire réparer une moto ou la ramener après un achat, la remorque porte-moto est plus simple qu’une camionnette : la moto monte par la rampe et se cale dans le support de roue. | Fir op eng Rennstreck ze fueren, eng Moto reparéieren ze loossen oder se nom Kaf heemzebréngen, ass de Motosunhänger méi einfach wéi eng Camionnette: D’Moto kënnt iwwer d’Ramp erop a steet da fest am Radhalter. |
| `content.category.porte-moto.sections.s2.h` | Bien attacher une moto | D’Moto richteg festmaachen |
| `content.category.porte-moto.sections.s2.items[0]` | Calez la roue avant dans le support. | Setzt d’Viischtrad fest an de Radhalter. |
| `content.category.porte-moto.sections.s2.items[1]` | Utilisez quatre sangles, deux à l’avant et deux à l’arrière, sur des points solides du cadre. | Benotzt véier Spannrimmen, zwee vir an zwee hannen, u stabile Punkte vum Rumm. |
| `content.category.porte-moto.sections.s2.items[2]` | Comprimez légèrement la suspension, sans l’écraser. | Dréckt d’Fiederung e bëssen zesummen, awer net ze vill. |
| `content.category.porte-moto.sections.s2.items[3]` | Contrôlez la tension des sangles après les premiers kilomètres. | Kontrolléiert no den éischte Kilometer, ob d’Spannrimmen nach fest sinn. |
| `content.category.benne.sections.s1.h` | Attention au poids des matériaux | Opgepasst mam Gewiicht vum Material |
| `content.category.benne.sections.s1.p[0]` | Les matériaux en vrac sont lourds. Un mètre cube de terre humide pèse environ 1,5 à 1,8 tonne, un mètre cube de gravier environ 1,5 tonne. Une benne remplie à ras bord dépasse donc vite sa charge utile. | Material, dat lass gelueden ass, weit vill. E Kubikmeter fiicht Äerd weit ongeféier 1,5 bis 1,8 Tonnen, e Kubikmeter Kis ongeféier 1,5 Tonnen. E Kipper, dee bis un de Rand voll ass, iwwerschreit also séier seng Notzlaascht. |
| `content.category.benne.sections.s1.p[1]` | Regardez la charge utile dans la fiche de la remorque et remplissez en conséquence : mieux vaut deux trajets qu’une remorque surchargée. | Kuckt d’Notzlaascht an den Detailer vum Unhänger no a luet deementspriechend: Léiwer zweemol fueren, wéi den Unhänger z’iwwerlueden. |
| `content.category.benne.sections.s2.h` | Chantier, jardin, parc à conteneurs | Chantier, Gaart, Recyclingszenter |
| `content.category.benne.sections.s2.items[0]` | Couvrez le chargement avec une bâche ou un filet pour que rien ne tombe sur la route. | Deckt d’Luedung mat enger Bâche oder engem Netz of, fir datt näischt op d’Strooss fält. |
| `content.category.benne.sections.s2.items[1]` | Triez les déchets avant de partir : au parc à conteneurs, vous gagnez du temps. | Sortéiert den Offall, ier Dir lassfuert: Am Recyclingszenter spuert Dir esou Zäit. |
| `content.category.benne.sections.s2.items[2]` | Basculez uniquement sur un sol plat et stable, la remorque attelée. | Kippt nëmmen op flaachem, festem Buedem of, wann den Unhänger ugekuppelt ass. |
| `content.category.frigorifique.sections.s1.h` | Pour quelles occasions ? | Fir wéi eng Geleeënheeten? |
| `content.category.frigorifique.sections.s1.p[0]` | Fête de famille, mariage, anniversaire, kermesse, marché ou fête d’association : la remorque frigorifique garde les boissons et les plats au frais sur place, pendant toute la durée de l’événement. | Familljefest, Hochzäit, Gebuertsdag, Kiermes, Maart oder Veräinsfest: De Killunhänger hält Gedrénks an Iessen op der Plaz frësch, während der ganzer Dauer vum Evenement. |
| `content.category.frigorifique.sections.s2.h` | Conseils d’utilisation | Esou benotzt Dir de Killunhänger |
| `content.category.frigorifique.sections.s2.items[0]` | Branchez la remorque quelques heures avant de la charger pour qu’elle soit froide. | Schléisst den Unhänger e puer Stonne virum Lueden un, fir datt e scho kal ass. |
| `content.category.frigorifique.sections.s2.items[1]` | Chargez de préférence des produits déjà froids : refroidir un grand volume de boissons tièdes prend du temps. | Luet am beschte Produiten, déi scho kal sinn: Et brauch Zäit, fir vill lauwarmt Gedrénks ofzekillen. |
| `content.category.frigorifique.sections.s2.items[2]` | Laissez l’air circuler entre les caisses. | Loosst tëscht de Keesse Plaz, fir datt d’Loft zirkuléiere kann. |
| `content.category.frigorifique.sections.s2.items[3]` | Prévoyez un branchement électrique adapté près de l’emplacement de la remorque. | Suergt fir e passende Stroumuschloss no bei der Plaz, wou den Unhänger steet. |
| `content.category.camionnette.sections.s1.h` | Déménagement, meubles, matériel | Plënneren, Miwwelen, Material |
| `content.category.camionnette.sections.s1.p[0]` | Une camionnette convient pour un déménagement, des meubles, de l’électroménager ou du matériel encombrant, sans avoir à atteler une remorque. Le chargement reste à l’abri de la pluie. | Eng Camionnette passt fir ze plënneren, fir Miwwelen, Haushaltsapparater oder voluminéist Material, ouni datt Dir en Unhänger ukuppele musst. D’Luedung bleift och bei Reen dréchen. |
| `content.category.camionnette.sections.s2.h` | Conseils pour votre transport | Tipps fir Ären Transport |
| `content.category.camionnette.sections.s2.items[0]` | Mesurez les gros meubles avant de réserver. | Moosst grouss Miwwelen, ier Dir reservéiert. |
| `content.category.camionnette.sections.s2.items[1]` | Placez les objets lourds au fond, contre la cloison, et sanglez le chargement. | Stellt schwéier Saache ganz no bannen, géint d’Trennwand, a sécheert d’Luedung mat Spannrimmen. |
| `content.category.camionnette.sections.s2.items[2]` | Protégez les meubles avec des couvertures pour éviter les rayures. | Schützt d’Miwwele mat Decken, fir datt se net verkraazt ginn. |
| `content.category.camionnette.sections.s2.items[3]` | Pensez à la hauteur du véhicule avant d’entrer dans un parking souterrain. | Denkt un d’Héicht vum Gefier, ier Dir an en ënnerierdesche Parking fuert. |

## Português (pt-PT): 782 Texte offen

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
| `cars.filter.apply` | Voir les résultats | Ver resultados |
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
| `forms.fallbackH` | Dernière étape : envoyez votre demande | Último passo: envie o seu pedido |
| `forms.fallbackText` | Choisissez comment nous la transmettre. Votre message est déjà rédigé, il suffit de l’envoyer. | Escolha como nos quer enviar o pedido. A mensagem já está escrita, só precisa de a enviar. |
| `forms.fallbackWhatsapp` | Envoyer par WhatsApp | Enviar pelo WhatsApp |
| `forms.fallbackMail` | Envoyer par e-mail | Enviar por e-mail |
| `forms.fallbackEdit` | Modifier la demande | Alterar o pedido |
| `forms.fallbackSubject` | Demande depuis le site | Pedido através do site |
| `forms.fallbackIntro` | Bonjour, voici ma demande : | Olá, aqui está o meu pedido: |
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
| `content.workshop.sections.s1.h` | Votre garage de proximité entre Ettelbruck et Diekirch | A sua garagem de proximidade entre Ettelbruck e Diekirch |
| `content.workshop.sections.s1.p[0]` | Le Garage Um Rond Point se trouve au {address}, directement au rond-point d’Erpeldange, à côté de la station Aral. Pour les habitants d’Erpeldange-sur-Sûre, d’Ettelbruck, de Diekirch et de toute la Nordstad, l’atelier est à quelques minutes de chez vous. | A Garage Um Rond Point fica no {address}, mesmo na rotunda de Erpeldange, ao lado do posto Aral. Para quem vive em Erpeldange-sur-Sûre, Ettelbruck, Diekirch e em toda a Nordstad, a oficina fica a poucos minutos de casa. |
| `content.workshop.sections.s1.p[1]` | Nous parlons luxembourgeois, français, allemand, anglais et portugais. Vous pouvez donc nous expliquer le problème de votre voiture dans la langue qui vous convient le mieux. | Falamos luxemburguês, francês, alemão, inglês e português. Assim, pode explicar-nos o problema do seu carro na língua em que se sente mais à vontade. |
| `content.workshop.sections.s2.h` | Entretien : pourquoi suivre le plan du constructeur | Manutenção: porque deve seguir o plano do fabricante |
| `content.workshop.sections.s2.p[0]` | Chaque constructeur fixe un plan d’entretien, selon le kilométrage ou le temps écoulé depuis le dernier passage. Vous le trouvez dans le carnet d’entretien ou sur l’écran de bord de votre voiture. | Cada fabricante define um plano de manutenção, consoante os quilómetros percorridos ou o tempo decorrido desde a última revisão. Encontra-o no livro de revisões ou no ecrã do painel de instrumentos do seu carro. |
| `content.workshop.sections.s2.p[1]` | Respecter ces échéances limite l’usure, évite des pannes coûteuses et aide à garder la valeur de la voiture à la revente. Selon le plan, un entretien comprend par exemple la vidange, les filtres, le contrôle des freins et des niveaux, l’éclairage et les essuie-glaces. | Cumprir estes prazos reduz o desgaste, evita avarias dispendiosas e ajuda a manter o valor do carro na revenda. Consoante o plano, uma manutenção inclui, por exemplo, a mudança de óleo, os filtros, a verificação dos travões e dos níveis, as luzes e as escovas do limpa-para-brisas. |
| `content.workshop.sections.s3.h` | Les signes qui doivent vous faire venir à l’atelier | Sinais de que está na hora de vir à oficina |
| `content.workshop.sections.s3.items[0]` | Un voyant reste allumé au tableau de bord. | Uma luz de aviso continua acesa no painel de instrumentos. |
| `content.workshop.sections.s3.items[1]` | Le freinage grince, vibre ou tire d’un côté. | Os travões chiam, vibram ou puxam para um lado. |
| `content.workshop.sections.s3.items[2]` | Le moteur manque de puissance ou démarre mal. | O motor tem falta de potência ou custa a pegar. |
| `content.workshop.sections.s3.items[3]` | Une odeur de brûlé, une fuite ou une fumée inhabituelle. | Um cheiro a queimado, uma fuga ou fumo fora do normal. |
| `content.workshop.sections.s3.items[4]` | Un bruit nouveau en roulant ou en tournant le volant. | Um ruído novo ao conduzir ou ao virar o volante. |
| `content.workshop.sections.s3.p[0]` | Plus tôt un défaut est trouvé, plus la réparation reste simple. Décrivez dans le formulaire ce que vous remarquez et depuis quand : c’est la meilleure base pour le diagnostic. | Quanto mais cedo um problema for detetado, mais simples é a reparação. Descreva no formulário o que nota e desde quando: é a melhor base para o diagnóstico. |
| `content.workshop.sections.s4.h` | Carrosserie et peinture après un accrochage | Chaparia e pintura depois de um pequeno toque |
| `content.workshop.sections.s4.p[0]` | Rayure, bosse ou pare-chocs abîmé : envoyez-nous des photos des dégâts sur WhatsApp au {whatsapp}. Vous recevez un premier avis avant même de venir. Ensuite, nous réparons la carrosserie et repeignons les éléments abîmés dans notre atelier. | Um risco, uma amolgadela ou um para-choques danificado: envie-nos fotos dos danos pelo WhatsApp, para o {whatsapp}. Recebe uma primeira opinião antes mesmo de vir. Depois, reparamos a carroçaria e voltamos a pintar as peças danificadas na nossa oficina. |
| `content.workshop.sections.s4.p[1]` | Si un autre véhicule est en cause, remplissez le constat amiable sur place et prenez vous-même des photos de l’accident. Ces documents sont utiles pour votre assurance. | Se houver outro veículo envolvido, preencha a declaração amigável no local e tire as suas próprias fotos do acidente. Estes documentos são úteis para o seu seguro. |
| `content.workshop.sections.s5.h` | Voitures et camionnettes | Carros e carrinhas |
| `content.workshop.sections.s5.p[0]` | L’atelier s’occupe des voitures et des camionnettes. Pour une tondeuse, une tronçonneuse ou une autre machine, voyez notre page [Jardin & forêt](page:garden). Pour mettre une carrosserie ou une pièce à nu, découvrez le [décapage sodablast](page:sodablast). | A oficina trata de carros e carrinhas. Para um corta-relva, uma motosserra ou outra máquina, veja a nossa página [Jardim e floresta](page:garden). Para decapar uma carroçaria ou uma peça até ao metal nu, conheça a [decapagem com sodablast](page:sodablast). |
| `content.workshop.faqH` | Questions sur l’atelier | Perguntas sobre a oficina |
| `content.workshop.faq.q1.q` | Comment prendre rendez-vous à l’atelier ? | Como faço uma marcação na oficina? |
| `content.workshop.faq.q1.a` | Décrivez votre véhicule et ce qu’il faut faire dans le formulaire de cette page, par téléphone au {phone} ou sur WhatsApp au {whatsapp}. Nous vous rappelons pour fixer le rendez-vous. | Descreva o seu veículo e o que é preciso fazer no formulário desta página, por telefone, para o {phone}, ou pelo WhatsApp, para o {whatsapp}. Ligamos-lhe de volta para combinar a marcação. |
| `content.workshop.faq.q2.q` | Quand le garage est-il ouvert ? | Quando é que a garagem está aberta? |
| `content.workshop.faq.q2.a` | {hours} | {hours} |
| `content.workshop.faq.q3.q` | Puis-je envoyer des photos avant de venir ? | Posso enviar fotos antes de vir? |
| `content.workshop.faq.q3.a` | Oui. Pour la carrosserie ou le sodablast, envoyez-nous des photos sur WhatsApp au {whatsapp} : vous recevez un premier avis. | Sim. Para chaparia ou sodablast, envie-nos fotos pelo WhatsApp, para o {whatsapp}: recebe uma primeira opinião. |
| `content.workshop.faq.q4.q` | Où se trouve l’atelier ? | Onde fica a oficina? |
| `content.workshop.faq.q4.a` | Au {address}, au rond-point d’Erpeldange, à côté de la station Aral, entre Ettelbruck et Diekirch. | No {address}, na rotunda de Erpeldange, ao lado do posto Aral, entre Ettelbruck e Diekirch. |
| `content.workshop.faq.q5.q` | Dans quelles langues puis-je expliquer le problème ? | Em que línguas posso explicar o problema? |
| `content.workshop.faq.q5.a` | En luxembourgeois, en français, en allemand, en anglais ou en portugais. | Em luxemburguês, francês, alemão, inglês ou português. |
| `content.sodablast.sections.s1.h` | Sodablast ou sablage : quelle différence ? | Sodablast ou jato de areia: qual é a diferença? |
| `content.sodablast.sections.s1.p[0]` | Le sablage classique projette un abrasif dur, comme le sable ou le corindon. Il décape vite, mais il attaque aussi le métal et peut chauffer et déformer les tôles fines. | A decapagem clássica com jato de areia projeta um abrasivo duro, como areia ou corindo. Decapa depressa, mas também ataca o metal e pode aquecer e deformar as chapas finas. |
| `content.sodablast.sections.s1.p[1]` | Le bicarbonate de soude est beaucoup plus tendre que le métal. Il enlève la peinture, la graisse et la saleté sans creuser la surface et sans la chauffer. C’est pourquoi le sodablast convient aux pièces fragiles et aux carrosseries anciennes. | O bicarbonato de sódio é muito mais macio do que o metal. Remove tinta, gordura e sujidade sem desgastar a superfície e sem a aquecer. É por isso que o sodablast é indicado para peças delicadas e carroçarias antigas. |
| `content.sodablast.sections.s2.h` | Pour quels projets ? | Para que projetos? |
| `content.sodablast.sections.s2.items[0]` | Restauration d’une voiture ancienne : mettre la carrosserie à nu avant la réparation et la peinture. | Restauro de um carro antigo: decapar a carroçaria até ao metal nu antes da reparação e da pintura. |
| `content.sodablast.sections.s2.items[1]` | Jantes : enlever l’ancienne peinture et la saleté incrustée avant une remise en peinture. | Jantes: remover a tinta antiga e a sujidade incrustada antes de voltar a pintar. |
| `content.sodablast.sections.s2.items[2]` | Pièces mécaniques : nettoyer un carter, un bloc ou une culasse avant le contrôle ou le remontage. | Peças mecânicas: limpar um cárter, um bloco ou uma cabeça do motor antes da verificação ou da remontagem. |
| `content.sodablast.sections.s2.p[0]` | Vous ne savez pas si votre pièce s’y prête ? Envoyez une photo sur WhatsApp au {whatsapp}, nous vous le disons. | Não sabe se a sua peça é adequada? Envie uma foto pelo WhatsApp, para o {whatsapp}, e nós dizemos-lhe. |
| `content.sodablast.sections.s3.h` | Après le décapage : protéger le métal | Depois da decapagem: proteger o metal |
| `content.sodablast.sections.s3.p[0]` | Une surface décapée est du métal nu. Au contact de l’air et de l’humidité, elle s’oxyde vite. Prévoyez donc l’étape suivante dès le départ : apprêt, réparation ou peinture. Les résidus de bicarbonate se rincent à l’eau avant la mise en peinture. | Uma superfície decapada é metal nu. Em contacto com o ar e a humidade, oxida depressa. Por isso, preveja o passo seguinte logo desde o início: primário, reparação ou pintura. Antes da pintura, os resíduos de bicarbonato retiram-se com água. |
| `content.sodablast.sections.s3.p[1]` | Pour une voiture, notre atelier peut ensuite réparer la carrosserie et la repeindre : voyez [mécanique et carrosserie](page:workshop). | No caso de um carro, a nossa oficina pode depois reparar a carroçaria e voltar a pintá-la: veja [mecânica e carroçaria](page:workshop). |
| `content.sodablast.sections.s4.h` | Sodablast au Luxembourg, à Erpeldange | Sodablast no Luxemburgo, em Erpeldange |
| `content.sodablast.sections.s4.p[0]` | Notre atelier se trouve au rond-point d’Erpeldange-sur-Sûre, entre Ettelbruck et Diekirch, facile d’accès depuis tout le nord du Luxembourg. Pour une pièce comme pour une voiture complète, nous fixons ensemble un rendez-vous au garage. | A nossa oficina fica na rotunda de Erpeldange-sur-Sûre, entre Ettelbruck e Diekirch, com acesso fácil a partir de todo o norte do Luxemburgo. Seja para uma peça ou para um carro completo, marcamos juntos uma data na garagem. |
| `content.sodablast.faqH` | Questions sur le sodablast | Perguntas sobre o sodablast |
| `content.sodablast.faq.q1.q` | Le sodablast abîme-t-il le métal ? | O sodablast danifica o metal? |
| `content.sodablast.faq.q1.a` | Non. Le bicarbonate de soude est plus tendre que le métal : il enlève la peinture, la graisse et la saleté sans creuser la surface. C’est ce qui le distingue du sablage. | Não. O bicarbonato de sódio é mais macio do que o metal: remove tinta, gordura e sujidade sem desgastar a superfície. É isso que o distingue da decapagem com jato de areia. |
| `content.sodablast.faq.q2.q` | Combien coûte un décapage sodablast ? | Quanto custa uma decapagem com sodablast? |
| `content.sodablast.faq.q2.a` | Cela dépend de la taille de la pièce et des couches à enlever. Envoyez des photos sur WhatsApp au {whatsapp} : vous recevez un premier avis. | Depende do tamanho da peça e das camadas a remover. Envie fotos pelo WhatsApp, para o {whatsapp}: recebe uma primeira opinião. |
| `content.sodablast.faq.q3.q` | Faut-il traiter la pièce après le décapage ? | É preciso tratar a peça depois da decapagem? |
| `content.sodablast.faq.q3.a` | Oui. Le métal mis à nu doit être protégé rapidement par un apprêt ou une peinture, sinon il s’oxyde. | Sim. O metal a nu tem de ser protegido rapidamente com primário ou tinta; caso contrário, oxida. |
| `content.sodablast.faq.q4.q` | Peut-on décaper des jantes au sodablast ? | É possível decapar jantes com sodablast? |
| `content.sodablast.faq.q4.a` | Oui, les jantes font partie des pièces que nous décapons au sodablast, comme les carrosseries anciennes et les pièces mécaniques. | Sim, as jantes fazem parte das peças que decapamos com sodablast, tal como as carroçarias antigas e as peças mecânicas. |
| `content.garden.sections.s1.h` | Machines de jardin et de forêt dans la Nordstad | Máquinas de jardim e floresta na Nordstad |
| `content.garden.sections.s1.p[0]` | Pour entretenir votre jardin, votre terrain ou votre bois, vous trouvez au Garage Um Rond Point des machines principalement des marques Honda et Stihl, et un atelier pour les réparer. Le garage se trouve au rond-point d’Erpeldange, entre Ettelbruck et Diekirch. | Para cuidar do seu jardim, do seu terreno ou da sua mata, encontra na Garage Um Rond Point máquinas sobretudo das marcas Honda e Stihl, e uma oficina para as reparar. A garagem fica na rotunda de Erpeldange, entre Ettelbruck e Diekirch. |
| `content.garden.sections.s2.h` | Bien choisir sa machine | Escolher bem a sua máquina |
| `content.garden.sections.s2.items[0]` | Tondeuse : la surface de la pelouse, la pente et les obstacles décident de la largeur de coupe et du type d’entraînement. | Corta-relva: a área do relvado, a inclinação e os obstáculos determinam a largura de corte e o tipo de tração. |
| `content.garden.sections.s2.items[1]` | Débroussailleuse : pour les bordures, les talus et l’herbe haute que la tondeuse n’atteint pas. | Roçadora: para as bordas, os taludes e a erva alta onde o corta-relva não chega. |
| `content.garden.sections.s2.items[2]` | Tronçonneuse : la longueur du guide dépend du diamètre du bois que vous coupez le plus souvent. | Motosserra: o comprimento do sabre depende do diâmetro da madeira que corta com mais frequência. |
| `content.garden.sections.s2.items[3]` | Taille-haie : la longueur de la lame et le poids comptent si vous taillez longtemps ou en hauteur. | Corta-sebes: o comprimento da lâmina e o peso contam se cortar durante muito tempo ou em altura. |
| `content.garden.sections.s2.p[0]` | Thermique ou à batterie ? Une machine à batterie est plus silencieuse et démarre sans effort. Une machine thermique garde son autonomie sur les grands terrains. Dites-nous comment vous l’utilisez, nous vous conseillons. | Motor de combustão ou bateria? Uma máquina a bateria é mais silenciosa e arranca sem esforço. Uma máquina com motor de combustão não perde autonomia em terrenos grandes. Diga-nos como a vai usar e nós aconselhamos. |
| `content.garden.sections.s3.h` | Réparation : quand apporter votre machine | Reparação: quando trazer a sua máquina |
| `content.garden.sections.s3.items[0]` | Le moteur ne démarre plus ou cale. | O motor já não pega ou vai abaixo. |
| `content.garden.sections.s3.items[1]` | La machine perd de la puissance ou fume. | A máquina perde força ou deita fumo. |
| `content.garden.sections.s3.items[2]` | La chaîne ou la lame coupe mal. | A corrente ou a lâmina corta mal. |
| `content.garden.sections.s3.items[3]` | Des bruits ou des vibrations inhabituels apparaissent. | Surgem ruídos ou vibrações fora do normal. |
| `content.garden.sections.s3.p[0]` | Décrivez la panne dans le formulaire ou appelez-nous au {phone}. Indiquez la marque et le modèle de la machine : nous savons tout de suite de quoi il s’agit. | Descreva a avaria no formulário ou ligue-nos para o {phone}. Indique a marca e o modelo da máquina: assim sabemos logo do que se trata. |
| `content.garden.sections.s4.h` | Conseils pour passer l’hiver | Conselhos para guardar a máquina no inverno |
| `content.garden.sections.s4.p[0]` | Avant de ranger une machine thermique pour l’hiver, nettoyez-la, videz le réservoir ou laissez le moteur tourner jusqu’à l’arrêt, puis rangez-la au sec. Une machine bien rangée redémarre plus facilement au printemps. | Antes de guardar uma máquina com motor de combustão durante o inverno, limpe-a, esvazie o depósito ou deixe o motor trabalhar até parar e guarde-a num local seco. Uma máquina bem guardada volta a pegar mais facilmente na primavera. |
| `content.garden.sections.s4.p[1]` | Les batteries se stockent à l’abri du gel, de préférence à moitié chargées. | As baterias devem ser guardadas num local protegido do gelo, de preferência com meia carga. |
| `content.garden.faqH` | Questions sur les machines de jardin | Perguntas sobre máquinas de jardim |
| `content.garden.faq.q1.q` | Quelles marques de machines vendez-vous ? | Que marcas de máquinas vendem? |
| `content.garden.faq.q1.a` | Principalement des machines Honda et Stihl. | Sobretudo máquinas Honda e Stihl. |
| `content.garden.faq.q2.q` | Comment faire réparer ma tondeuse ou ma tronçonneuse ? | Como posso mandar reparar o meu corta-relva ou a minha motosserra? |
| `content.garden.faq.q2.a` | Apportez la machine à l’atelier ou décrivez la panne dans le formulaire de cette page. Nous vous rappelons. | Traga a máquina à oficina ou descreva a avaria no formulário desta página. Nós ligamos-lhe de volta. |
| `content.garden.faq.q3.q` | Quand puis-je passer au garage ? | Quando posso passar pela garagem? |
| `content.garden.faq.q3.a` | {hours} | {hours} |
| `content.garden.faq.q4.q` | Où se trouve le garage ? | Onde fica a garagem? |
| `content.garden.faq.q4.a` | Au {address}, au rond-point d’Erpeldange, à côté de la station Aral. | No {address}, na rotunda de Erpeldange, ao lado do posto Aral. |
| `content.trailersForSale.sections.s1.h` | Saris, Humbaur et WM Meyer à Erpeldange | Saris, Humbaur e WM Meyer em Erpeldange |
| `content.trailersForSale.sections.s1.p[0]` | Nous vendons des remorques des marques Saris, Humbaur et WM Meyer, pour les particuliers comme pour les professionnels. Dites-nous ce que vous transportez : nous vous aidons à trouver le modèle qui convient à votre voiture et à votre permis. | Vendemos atrelados das marcas Saris, Humbaur e WM Meyer, tanto para particulares como para profissionais. Diga-nos o que transporta: ajudamos a encontrar o modelo adequado ao seu carro e à sua carta de condução. |
| `content.trailersForSale.sections.s1.p[1]` | Le garage se trouve au rond-point d’Erpeldange-sur-Sûre, entre Ettelbruck et Diekirch. | A garagem fica na rotunda de Erpeldange-sur-Sûre, entre Ettelbruck e Diekirch. |
| `content.trailersForSale.sections.s2.h` | Les bonnes questions avant d’acheter | As perguntas certas antes de comprar |
| `content.trailersForSale.sections.s2.items[0]` | Qu’est-ce que je transporte le plus souvent, et quel poids ? | O que transporto com mais frequência, e com que peso? |
| `content.trailersForSale.sections.s2.items[1]` | Quelle longueur et quelle largeur de plateau me faut-il ? | De que comprimento e largura de plataforma preciso? |
| `content.trailersForSale.sections.s2.items[2]` | Ma voiture peut-elle tracter cette remorque (champs O.1 et O.2 du certificat d’immatriculation) ? | O meu carro pode rebocar este atrelado (campos O.1 e O.2 do certificado de matrícula)? |
| `content.trailersForSale.sections.s2.items[3]` | Mon permis suffit-il : B, B avec le code 96 ou BE ? | A minha carta é suficiente: B, B com o código 96 ou BE? |
| `content.trailersForSale.sections.s2.items[4]` | Où vais-je garer la remorque quand je ne m’en sers pas ? | Onde vou guardar o atrelado quando não o estiver a usar? |
| `content.trailersForSale.sections.s3.h` | Particuliers et professionnels | Particulares e profissionais |
| `content.trailersForSale.sections.s3.p[0]` | Pour un particulier, la remorque sert au jardin, au déménagement ou au transport d’un véhicule de loisir. Pour un artisan ou une entreprise, elle transporte chaque jour du matériel et des machines : la charge utile, la robustesse du plateau et les points d’arrimage comptent alors davantage. | Para um particular, o atrelado serve para o jardim, para mudanças de casa ou para transportar um veículo de lazer. Para um profissional independente ou uma empresa, transporta todos os dias material e máquinas: aí, a carga útil, a robustez da plataforma e os pontos de amarração contam ainda mais. |
| `content.trailersForSale.sections.s4.h` | Acheter ou louer ? | Comprar ou alugar? |
| `content.trailersForSale.sections.s4.p[0]` | Si vous n’avez besoin d’une remorque que de temps en temps, la [location](page:rental) peut suffire. Notre guide vous montre aussi quelle remorque votre permis autorise. | Se só precisa de um atrelado de vez em quando, o [aluguer](page:rental) pode bastar. O nosso guia também lhe mostra que atrelado a sua carta de condução permite. |
| `content.trailersForSale.faqH` | Questions sur l’achat d’une remorque | Perguntas sobre a compra de um atrelado |
| `content.trailersForSale.faq.q1.q` | Quelles marques de remorques vendez-vous ? | Que marcas de atrelados vendem? |
| `content.trailersForSale.faq.q1.a` | Saris, Humbaur et WM Meyer. | Saris, Humbaur e WM Meyer. |
| `content.trailersForSale.faq.q2.q` | Vendez-vous aussi aux professionnels ? | Também vendem a profissionais? |
| `content.trailersForSale.faq.q2.a` | Oui, nous vendons des remorques aux particuliers et aux professionnels. | Sim, vendemos atrelados a particulares e a profissionais. |
| `content.cars.sections.s1.h` | Acheter une voiture au Garage Um Rond Point | Comprar um carro na Garage Um Rond Point |
| `content.cars.sections.s1.p[0]` | Toutes les voitures de cette page sont en stock chez nous, au rond-point d’Erpeldange. La liste est mise à jour chaque matin à partir de nos annonces : vous voyez le prix, le kilométrage, l’année et les photos de chaque voiture. | Todos os carros desta página estão em stock na nossa garagem, na rotunda de Erpeldange. A lista é atualizada todas as manhãs a partir dos nossos anúncios: vê o preço, os quilómetros, o ano e as fotos de cada carro. |
| `content.cars.sections.s1.items[0]` | Choisissez une voiture dans la liste et ouvrez sa fiche. | Escolha um carro na lista e abra a respetiva ficha. |
| `content.cars.sections.s1.items[1]` | Appelez-nous ou écrivez-nous sur WhatsApp pour vérifier qu’elle est encore disponible. | Ligue-nos ou escreva-nos pelo WhatsApp para confirmar se ainda está disponível. |
| `content.cars.sections.s1.items[2]` | Venez la voir au garage et faites un essai sur rendez-vous. | Venha vê-lo à garagem e faça um test drive por marcação. |
| `content.cars.sections.s2.h` | Voitures neuves et d’occasion près d’Ettelbruck et de Diekirch | Carros novos e usados perto de Ettelbruck e Diekirch |
| `content.cars.sections.s2.p[0]` | Le stock comprend des voitures neuves et des voitures d’occasion. Il change souvent : la liste vous montre chaque jour l’état du matin. Nos annonces sont aussi publiées sur LuxAuto et AutoScout24. | O stock inclui carros novos e carros usados. Muda com frequência: a lista mostra-lhe, todos os dias, o stock dessa manhã. Os nossos anúncios também estão publicados no LuxAuto e no AutoScout24. |
| `content.cars.sections.s3.h` | Et votre voiture actuelle ? | E o seu carro atual? |
| `content.cars.sections.s3.p[0]` | Vous souhaitez faire reprendre votre voiture ? Indiquez-le dans le formulaire de la voiture qui vous intéresse. Vous préférez vendre sans vous en occuper ? Découvrez notre service de dépôt-vente plus bas sur cette page. | Quer dar o seu carro para retoma? Indique-o no formulário do carro que lhe interessa. Prefere vender sem ter de se preocupar com nada? Conheça o nosso serviço de venda à consignação mais abaixo nesta página. |
| `content.cars.faqH` | Questions sur nos voitures | Perguntas sobre os nossos carros |
| `content.cars.faq.q1.q` | Puis-je essayer une voiture ? | Posso fazer um test drive? |
| `content.cars.faq.q1.a` | Oui, sur rendez-vous. Appelez-nous au {phone} ou écrivez-nous sur WhatsApp au {whatsapp}. | Sim, por marcação. Ligue-nos para o {phone} ou escreva-nos pelo WhatsApp, para o {whatsapp}. |
| `content.cars.faq.q2.q` | Où puis-je voir les voitures ? | Onde posso ver os carros? |
| `content.cars.faq.q2.a` | Au garage, au {address}, au rond-point d’Erpeldange. {hours} | Na garagem, no {address}, na rotunda de Erpeldange. {hours} |
| `content.cars.faq.q3.q` | Vos voitures sont-elles aussi sur LuxAuto et AutoScout24 ? | Os vossos carros também estão no LuxAuto e no AutoScout24? |
| `content.cars.faq.q3.a` | Oui, nos annonces sont aussi publiées sur LuxAuto et AutoScout24. Ici, vous voyez tout notre stock au même endroit. | Sim, os nossos anúncios também estão publicados no LuxAuto e no AutoScout24. Aqui vê todo o nosso stock num só lugar. |
| `content.contact.sections.s1.h` | Quel moyen choisir ? | Que meio de contacto escolher? |
| `content.contact.sections.s1.items[0]` | Une question rapide ou des photos à nous montrer : WhatsApp au {whatsapp}. | Uma pergunta rápida ou fotos para nos mostrar: pelo WhatsApp, para o {whatsapp}. |
| `content.contact.sections.s1.items[1]` | Un rendez-vous ou une réponse tout de suite : téléphone au {phone}. | Uma marcação ou uma resposta imediata: por telefone, para o {phone}. |
| `content.contact.sections.s1.items[2]` | Une demande détaillée : le formulaire ci-dessous ou un e-mail à {email}. | Um pedido detalhado: o formulário abaixo ou um e-mail para {email}. |
| `content.contact.sections.s2.h` | Venir au garage | Como chegar à garagem |
| `content.contact.sections.s2.p[0]` | Le garage se trouve au {address}, au rond-point d’Erpeldange-sur-Sûre, à côté de la station Aral. Vous venez d’Ettelbruck ou de Diekirch ? Le rond-point est sur votre route. Pour l’itinéraire exact, ouvrez Google Maps depuis cette page. | A garagem fica no {address}, na rotunda de Erpeldange-sur-Sûre, ao lado do posto Aral. Vem de Ettelbruck ou de Diekirch? A rotunda fica no seu caminho. Para o itinerário exato, abra o Google Maps a partir desta página. |
| `content.contact.faqH` | Questions pratiques | Perguntas práticas |
| `content.contact.faq.q1.q` | Quand le garage est-il ouvert ? | Quando é que a garagem está aberta? |
| `content.contact.faq.q1.a` | {hours} | {hours} |
| `content.contact.faq.q2.q` | Quelles langues parlez-vous ? | Que línguas falam? |
| `content.contact.faq.q2.a` | Nous parlons luxembourgeois, français, allemand, anglais et portugais. | Falamos luxemburguês, francês, alemão, inglês e português. |
| `content.rental.sections.s1.h` | Location de remorques dans la Nordstad | Aluguer de atrelados na Nordstad |
| `content.rental.sections.s1.p[0]` | Au rond-point d’Erpeldange, entre Ettelbruck et Diekirch, vous louez une remorque ou une camionnette tout près de chez vous. Notre guide ci-dessus vous montre en quelques clics quelle remorque convient à ce que vous transportez et si votre permis suffit. | Na rotunda de Erpeldange, entre Ettelbruck e Diekirch, aluga um atrelado ou uma carrinha muito perto de casa. O nosso guia, mais acima, mostra-lhe em poucos cliques que atrelado serve para o que vai transportar e se a sua carta é suficiente. |
| `content.rental.sections.s2.h` | Conseils pour bien charger | Conselhos para carregar corretamente |
| `content.rental.sections.s2.items[0]` | Ne dépassez jamais la masse maximale de la remorque, ni la charge remorquable de votre voiture. | Nunca ultrapasse a massa máxima autorizada do atrelado, nem a carga rebocável do seu carro. |
| `content.rental.sections.s2.items[1]` | Répartissez la charge : les objets lourds au-dessus de l’essieu, un peu de poids sur la flèche, comme l’indique la notice. | Distribua a carga: os objetos pesados por cima do eixo e um pouco de peso sobre a lança, como indica o manual. |
| `content.rental.sections.s2.items[2]` | Arrimez le chargement avec des sangles et couvrez le vrac avec une bâche ou un filet. | Prenda a carga com cintas e cubra os materiais a granel com uma lona ou uma rede. |
| `content.rental.sections.s2.items[3]` | Avant de partir, vérifiez l’attelage, les feux et la pression des pneus. | Antes de partir, verifique o engate, as luzes e a pressão dos pneus. |
| `content.rental.sections.s2.items[4]` | Roulez plus doucement qu’à vide : l’ensemble freine moins bien et prend plus de place dans les virages. | Conduza mais devagar do que sem carga: o conjunto trava pior e ocupa mais espaço nas curvas. |
| `content.category.porte-voiture.sections.s1.h` | Quand louer un porte-voiture ? | Quando alugar um atrelado porta-carros? |
| `content.category.porte-voiture.sections.s1.p[0]` | Pour ramener une voiture qui ne roule plus, transporter une voiture de collection sans ajouter de kilomètres, ou aller chercher une voiture achetée loin de chez vous. Le porte-voiture évite de faire rouler la voiture transportée. | Para trazer de volta um carro que já não anda, transportar um carro de coleção sem lhe somar quilómetros ou ir buscar um carro comprado longe de casa. O porta-carros evita que o carro transportado tenha de circular. |
| `content.category.porte-voiture.sections.s2.h` | Charger une voiture en sécurité | Carregar um carro em segurança |
| `content.category.porte-voiture.sections.s2.items[0]` | Vérifiez que la voiture transportée ne dépasse pas la charge utile de la remorque. | Confirme que o carro transportado não ultrapassa a carga útil do atrelado. |
| `content.category.porte-voiture.sections.s2.items[1]` | Montez lentement, bien dans l’axe des rampes, avec quelqu’un qui vous guide. | Suba devagar, bem alinhado com as rampas, com alguém a orientá-lo. |
| `content.category.porte-voiture.sections.s2.items[2]` | Placez la voiture pour qu’un peu de poids repose sur l’avant de la remorque, comme l’indique la notice. | Posicione o carro de modo a que um pouco de peso assente na parte da frente do atrelado, como indica o manual. |
| `content.category.porte-voiture.sections.s2.items[3]` | Arrimez chaque roue avec des sangles adaptées et contrôlez-les après les premiers kilomètres. | Prenda cada roda com cintas adequadas e verifique-as após os primeiros quilómetros. |
| `content.category.porte-moto.sections.s1.h` | Transporter une moto | Transportar uma mota |
| `content.category.porte-moto.sections.s1.p[0]` | Pour aller sur un circuit, faire réparer une moto ou la ramener après un achat, la remorque porte-moto est plus simple qu’une camionnette : la moto monte par la rampe et se cale dans le support de roue. | Para ir a um circuito, levar uma mota à reparação ou trazê-la depois de uma compra, o atrelado porta-motos é mais simples do que uma carrinha: a mota sobe pela rampa e fica encaixada no suporte da roda. |
| `content.category.porte-moto.sections.s2.h` | Bien attacher une moto | Prender bem uma mota |
| `content.category.porte-moto.sections.s2.items[0]` | Calez la roue avant dans le support. | Encaixe a roda da frente no suporte. |
| `content.category.porte-moto.sections.s2.items[1]` | Utilisez quatre sangles, deux à l’avant et deux à l’arrière, sur des points solides du cadre. | Use quatro cintas, duas à frente e duas atrás, em pontos sólidos do quadro. |
| `content.category.porte-moto.sections.s2.items[2]` | Comprimez légèrement la suspension, sans l’écraser. | Baixe ligeiramente a suspensão, sem a comprimir por completo. |
| `content.category.porte-moto.sections.s2.items[3]` | Contrôlez la tension des sangles après les premiers kilomètres. | Verifique a tensão das cintas após os primeiros quilómetros. |
| `content.category.benne.sections.s1.h` | Attention au poids des matériaux | Atenção ao peso dos materiais |
| `content.category.benne.sections.s1.p[0]` | Les matériaux en vrac sont lourds. Un mètre cube de terre humide pèse environ 1,5 à 1,8 tonne, un mètre cube de gravier environ 1,5 tonne. Une benne remplie à ras bord dépasse donc vite sa charge utile. | Os materiais a granel são pesados. Um metro cúbico de terra húmida pesa cerca de 1,5 a 1,8 toneladas, um metro cúbico de gravilha cerca de 1,5 toneladas. Um atrelado basculante cheio até à borda ultrapassa, por isso, rapidamente a sua carga útil. |
| `content.category.benne.sections.s1.p[1]` | Regardez la charge utile dans la fiche de la remorque et remplissez en conséquence : mieux vaut deux trajets qu’une remorque surchargée. | Consulte a carga útil na ficha do atrelado e encha-o em conformidade: mais vale fazer duas viagens do que levar um atrelado sobrecarregado. |
| `content.category.benne.sections.s2.h` | Chantier, jardin, parc à conteneurs | Obras, jardim, ecocentro |
| `content.category.benne.sections.s2.items[0]` | Couvrez le chargement avec une bâche ou un filet pour que rien ne tombe sur la route. | Cubra a carga com uma lona ou uma rede para que nada caia na estrada. |
| `content.category.benne.sections.s2.items[1]` | Triez les déchets avant de partir : au parc à conteneurs, vous gagnez du temps. | Separe os resíduos antes de sair: no ecocentro, poupa tempo. |
| `content.category.benne.sections.s2.items[2]` | Basculez uniquement sur un sol plat et stable, la remorque attelée. | Faça o basculamento só em piso plano e estável, com o atrelado engatado. |
| `content.category.frigorifique.sections.s1.h` | Pour quelles occasions ? | Para que ocasiões? |
| `content.category.frigorifique.sections.s1.p[0]` | Fête de famille, mariage, anniversaire, kermesse, marché ou fête d’association : la remorque frigorifique garde les boissons et les plats au frais sur place, pendant toute la durée de l’événement. | Festa de família, casamento, aniversário, quermesse, mercado ou festa de associação: o atrelado frigorífico mantém as bebidas e a comida frescas no local, durante todo o evento. |
| `content.category.frigorifique.sections.s2.h` | Conseils d’utilisation | Conselhos de utilização |
| `content.category.frigorifique.sections.s2.items[0]` | Branchez la remorque quelques heures avant de la charger pour qu’elle soit froide. | Ligue o atrelado à corrente algumas horas antes de o carregar, para que já esteja frio. |
| `content.category.frigorifique.sections.s2.items[1]` | Chargez de préférence des produits déjà froids : refroidir un grand volume de boissons tièdes prend du temps. | Carregue de preferência produtos já frios: arrefecer um grande volume de bebidas mornas leva tempo. |
| `content.category.frigorifique.sections.s2.items[2]` | Laissez l’air circuler entre les caisses. | Deixe o ar circular entre as caixas. |
| `content.category.frigorifique.sections.s2.items[3]` | Prévoyez un branchement électrique adapté près de l’emplacement de la remorque. | Preveja uma ligação elétrica adequada perto do local onde o atrelado vai ficar. |
| `content.category.camionnette.sections.s1.h` | Déménagement, meubles, matériel | Mudanças, móveis, material |
| `content.category.camionnette.sections.s1.p[0]` | Une camionnette convient pour un déménagement, des meubles, de l’électroménager ou du matériel encombrant, sans avoir à atteler une remorque. Le chargement reste à l’abri de la pluie. | Uma carrinha é indicada para uma mudança de casa, móveis, eletrodomésticos ou material volumoso, sem ter de engatar um atrelado. A carga fica protegida da chuva. |
| `content.category.camionnette.sections.s2.h` | Conseils pour votre transport | Conselhos para o seu transporte |
| `content.category.camionnette.sections.s2.items[0]` | Mesurez les gros meubles avant de réserver. | Meça os móveis grandes antes de reservar. |
| `content.category.camionnette.sections.s2.items[1]` | Placez les objets lourds au fond, contre la cloison, et sanglez le chargement. | Coloque os objetos pesados ao fundo, encostados à divisória, e prenda a carga com cintas. |
| `content.category.camionnette.sections.s2.items[2]` | Protégez les meubles avec des couvertures pour éviter les rayures. | Proteja os móveis com mantas para evitar riscos. |
| `content.category.camionnette.sections.s2.items[3]` | Pensez à la hauteur du véhicule avant d’entrer dans un parking souterrain. | Tenha em conta a altura do veículo antes de entrar num parque de estacionamento subterrâneo. |

