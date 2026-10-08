# Fahrzeugdaten per Schnittstelle: MovingCar und RCU

Stand: 08.10.2026, Recherche von Nave. Bestätigt ist nur, was eine Quelle hat. Alles andere ist als Annahme markiert.

## Heute

`scripts/sync/` liest jeden Morgen die öffentlichen Inserate der Garage auf LuxAuto, mit AutoScout24 als Ersatz. Diese Inserate stammen aus MovingCar, die Website zeigt also schon den MovingCar-Bestand, nur auf einem Umweg.

## MovingCar (movingcar.lu)

- **Was es ist:** Luxemburgische Plattform für die Bestandsverwaltung. Sie verteilt Inserate an LuxAuto, AutoScout24, mycar.lu, mobile.de und weitere Börsen. Die Garage Um Rond Point steht auf movingcar.lu als Kunde („Partenaire Um Rond Point“).
- **Schnittstelle:** Es gibt eine API (`api.movingcar.lu`), die eine Anmeldung verlangt. Eine öffentliche Dokumentation gibt es nicht. MovingCar baut selbst Händler-Websites und speist dort den Bestand ein.
- **Annahme:** MovingCar gibt Zugang auf Anfrage des Kunden, eventuell gegen Gebühr.
- **Ergebnis mit Zugang:** Der Bestand kommt direkt aus der Quelle, ohne Umweg über LuxAuto. Die Website wird dann bei jedem Build aktualisiert, statt nur einmal am Morgen. Auch Ausstattung, Fotos, WLTP-Werte und der Status (verkauft/reserviert) wären sauber, falls MovingCar sie liefert.

**Was die Garage bei MovingCar anfragen muss** (Mail unten):
1. Lesender API-Zugang zum eigenen Bestand, für die eigene Website, umgesetzt durch Nave
2. Zugangsdaten (API-Key/Token) und Händler-ID
3. Dokumentation mit Feldern, Bild-URLs, Status und Aktualisierung
4. Erlaubnis, die Fotos (webfiles.movingcar.lu) zu verwenden
5. Kosten
6. Falls es keine API gibt: einen täglichen Export (XML/CSV) per URL

## RCU

Welche Firma gemeint ist, ist **nicht bestätigt**. Der wahrscheinlichste Treffer ist die **RCU Handels KG** in Westendorf (Allgäu): Großhandel für EU-Neuwagen von Audi, Seat, Skoda und VW, nur an Händler. Ihr B2B-Portal liegt unter rcu.b2b-24.com.

- **Schnittstelle:** RCU dokumentiert keine API und keinen Feed. Die Website wirbt nur mit „Fahrzeugverlinkung für Ihre Website“.
- **Wichtig:** RCU wirbt mit „Fahrzeugfotos nicht in Endkundenbörsen“. Fotos und Daten von RCU dürfen nur mit **schriftlicher Erlaubnis** auf die Website.
- **Preise:** Die Händlerpreise sind B2B-Preise. Auf der Website stünde „Preis auf Anfrage“ oder ein eigener Endkundenpreis, und es muss klar sein, dass das Auto bestellt wird und nicht auf Lager steht.

**Geplante Darstellung, sobald Daten und Erlaubnis da sind:** ein eigener Bereich „Autoe op Bestellung / Voitures sur commande“ unter „Autoen“, deutlich getrennt vom Lagerbestand. Er bekommt den Hinweis „Lieferzeit auf Anfrage“ und ein Anfrageformular. Die technische Basis ist da: der Abgleich, die Autoseiten und die Formulare.

## Anfrage an MovingCar (zum Weiterleiten, Französisch)

> Objet : Accès API pour notre site internet – Garage Um Rond Point
>
> Bonjour,
>
> Nous sommes client MovingCar (Garage Um Rond Point, Erpeldange-sur-Sûre). Notre agence web, Nave, réalise notre nouveau site internet et souhaite y afficher automatiquement notre stock de véhicules à partir de MovingCar.
>
> Pourriez-vous nous indiquer :
> 1. si un accès en lecture à votre API (ou un export XML/CSV quotidien) est possible pour notre stock ;
> 2. les identifiants nécessaires (clé API / token, identifiant garage) et la documentation (champs, photos, statut vendu/réservé) ;
> 3. si nous pouvons utiliser les photos hébergées chez vous sur notre site ;
> 4. les éventuels frais.
>
> Nous autorisons Nave à utiliser cet accès pour notre compte. Contact technique : info@nave.lu.
>
> Merci d’avance et bien cordialement,
> Garage Um Rond Point

## Anfrage an RCU (zum Weiterleiten, Französisch, bei Bedarf auf Deutsch)

> Objet : Affichage de véhicules RCU sur notre site internet
>
> Bonjour,
>
> Nous travaillons avec vous pour des véhicules que nous pouvons commander pour nos clients. Nous aimerions présenter une sélection de ces véhicules sur notre site internet comme « véhicules sur commande », clairement séparés de notre stock.
>
> Pourriez-vous nous dire :
> 1. si vous proposez un export de votre stock disponible (XML/CSV/JSON ou interface) et sous quelles conditions ;
> 2. comment fonctionne la « liaison véhicules pour votre site » que vous proposez ;
> 3. si nous avons votre accord écrit pour publier les données et les photos sur notre site, et à quelles conditions (sans prix, sans votre nom, etc.) ;
> 4. si vous livrez au Luxembourg.
>
> Contact technique : notre agence Nave, info@nave.lu.
>
> Bien cordialement,
> Garage Um Rond Point
