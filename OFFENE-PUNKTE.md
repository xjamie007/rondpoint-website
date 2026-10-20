# Offene Punkte – Garage Um Rond Point

Stand: 28.09.2026. Nichts davon ist erfunden. Jede Stelle erscheint auf der Website als gelb markierter Platzhalter `[FEHLT — …]` oder `[UNBESTÄTIGT — …]`. Die markierten Übersetzungsschlüssel gelten in allen fünf Sprachen (`src/i18n/{fr,de,lb,en,pt}.ts`).

- Aktuelle Liste aus dem Build: `npm run build && npm run open-points` (oder `npm run open-points -- fr` für eine Sprache).
- Schalter für bestätigte Aussagen: `src/content/site.json` → `confirmations`, `manager.confirmed`, `payment.confirmed` usw.
- Vor Livegang `showOpenPoints` in `site.json` auf `false` setzen. Dann verschwinden Abschnitte, die ohne Daten keinen Sinn haben, zum Beispiel „Avis Google" oder die Foto-Hinweise. Platzhalter in Sätzen bleiben sichtbar, bis die Daten da sind.

## Stand 20.10.2026: Fahrzeug-Showroom von audaris (Partner-Zentrallager)

Eingebaut auf der Autos-Seite unter dem eigenen Bestand (MovingCar), als Abschnitt „Weitere Fahrzeuge auf Bestellung“:
- **Konfiguration:** `site.json` → `audaris` (cid 2765, wid …dfa2, `active`).
- **Laden:** Das Skript von audaris lädt erst, wenn man in die Nähe scrollt. Ein Direktlink auf ein Fahrzeug (`/de/autos/#/…`) öffnet es sofort.
- **Datenschutz:** Ein Abschnitt dazu steht in allen Sprachen in der Datenschutzerklärung. Der Showroom setzt keine Cookies; er speichert nur die Filter im Browser-Speicher.
- **Sprache:** Den Showroom gibt es nur auf Deutsch. Auf FR, EN, PT und LB steht ein kurzer Hinweis dazu.

**Bei audaris noch einzustellen** (Mail an Herrn Stollberg Mesquita):
1. **Empfänger für Anfragen:** `inqireEmailRecipient` ist leer. Er sollte auf info@rondpoint.lu gesetzt werden.
2. **MwSt.:** Die Preise stehen mit „inkl. 19 % MwSt.“ (deutsch) da. Für Kunden in Luxemburg sind es 17 %. Klären, wie audaris das für Luxemburg anzeigt.
3. **Andere Sprachen:** Gibt es den Showroom auch auf Französisch oder Englisch?
4. Optional: `baseUrl` auf `https://www.rondpoint.lu/de/autos/` setzen, damit „Teilen“-Links nach dem Umzug stimmen.

## Stand 16.10.2026: Antworten von David (Kunde)

Eingetragen:
- **Gesellschaftskapital:** 12.000 € (`site.json` → `shareCapital`). Erscheint im Impressum, je Sprache formatiert.
- **Offizieller Händler** von Saris, Humbaur, WM Meyer und **Tohaco** (neu). Steht so in allen Sprachen, auch in den SEO-Texten. Logos sind nicht freigegeben und deshalb nicht eingebaut.
- **Garten & Forst:** kein Händlerstatus nennen (Wunsch des Kunden). Der Platzhalter ist entfernt; „vor allem Honda und Stihl“ bleibt.
- **Feiertage geschlossen:** Unter den Öffnungszeiten steht „An Feiertagen geschlossen“ (`horaires.json` → `holidaysConfirmed`).
- **Formular-Empfänger** info@rondpoint.lu ist bestätigt. Beim Einrichten des Mailanbieters `FORM_RECIPIENT=info@rondpoint.lu` setzen (Punkt 6).
- **Autos:** Variante 1 gewählt, also der Audaris-Showroom als fertiger Block. Es fehlt der Einbau-Code von Audaris.

Noch offen von dieser Runde:
- ~~Autorisation d'établissement~~ **erledigt:** Nr. 10179686 laut öffentlichem Register auf guichet.lu (Suche mit RCS B296148), steht im Impressum.
- **Google-Bewertungen:** Die Startseite zeigt 4,6 ★ aus 10 Bewertungen (Stand 16.10.2026, `site.json` → `googleRating`, von Hand nachführen) und drei Zitate: Arslan C., Elvis D. und Smybbs, alle mit 5 ★. Bisher gibt es nur die deutsche Übersetzung von Google, gekennzeichnet; sie steht auf DE und LB. **Offen:** die Originaltexte (Arslan C. und Elvis D. auf Französisch, Smybbs auf Englisch) in `reviews[].quote` eintragen, dann erscheinen die Zitate auch auf FR, EN und PT. Bei Google gibt es kein genaues Datum, deshalb steht keins dabei.
- Unbeantwortet sind noch: Mietbedingungen (10, 11), Kommissionsverkauf (13), Preise TTC (14), Werkstatt (15–17), Anhänger auf Lager und Logos (18), Antwortzeit (21), Zahlungsmittel (22), TikTok (24), Logo-Vektordatei (30), Domain (7) und WLTP in MovingCar (3).

## Präsentationsversion (Stand 28.09.2026, abends)

Für den Kundentermin ist `presentation: true` in `src/content/site.json` gesetzt. Dabei gilt:

- **Stockfotos:** Freie Fotos aus `src/assets/demo/` stehen im Hero, bei den Leistungen, auf den Unterseiten und bei den Anhängern. Nachweise stehen in `src/assets/demo/CREDITS.md` und im Impressum.
- **Beispiel-Anhänger:** Die fünf Beispiele aus `src/content/flotte/_dev/` sind sichtbar, mit „(exemple)" im Namen. Maße und Gewichte sind Beispielwerte, Preise gibt es keine.
- **Platzhalter:** Interne Notizen `[FEHLT]`/`[UNBESTÄTIGT]` sind ausgeblendet. Unbestätigte Aussagen fehlen ganz, zum Beispiel Zahlungsmittel, „toutes marques" und der Transparenz-Satz. Impressum und Datenschutz zeigen ihre Lücken weiter.
- **Logo:** Das Original von rondpoint.lu ist eingebaut, als freigestelltes Raster. Das Kreisel-„O" dreht sich beim ersten Laden.

**Vor Livegang:**
- `presentation` auf `false` setzen. Damit verschwinden die Stockfotos und die Beispiele, und die Platzhalter werden wieder sichtbar.
- Echte Fotos nach `src/assets/photos/` legen, mit denselben Dateinamen wie in `demo/`, zum Beispiel `hero-workshop.jpg`. Anhängerfotos gehören nach `src/assets/flotte/`.
- Die Vektordatei des Logos besorgen.
- Die Kunden-Freigabe für das Logo auf der Website einholen, falls nötig.

## Stand 15.10.2026: Umzug auf Cloudflare vorbereitet

Website, Admin-Bereich und Formulare laufen auf Cloudflare, sobald die Variable `HOSTING=cloudflare` gesetzt ist. Supabase wird dafür nicht mehr gebraucht.
- Ein Worker liefert die Seiten aus und beantwortet `/api` (Anmeldung, Speichern, Formulare).
- Konten, Protokoll und Anfragen liegen in einer D1-Datenbank in der EU.
- Lokal im Cloudflare-Laufzeitsystem geprüft: Anmelden, Speichern, Formular, Schutz gegen fremde Seiten, 404-Seite.

**Für Nave:** die Schritte im README unter „Cloudflare einrichten“:
- Datenbank mit Jurisdiction EU anlegen.
- Zwei Schlüssel erstellen und in GitHub eintragen.
- Konten anlegen mit `npm run admin -- add …`.

**Offen:**
- Domain rondpoint.lu zu Cloudflare umziehen (Punkt 7).
- EU-Mailanbieter für die Formulare wählen (Punkt 6).
- Danach GitHub Pages abschalten.

## Stand 14.10.2026: Admin-Bereich auf der Seite

Neu im Admin-Bereich (Login im Footer):
- **Öffnungszeiten an einer Stelle:** Sie gelten für Tabelle, Fußzeile, Texte, Google-Beschreibung und Google-Daten.
- **Mietanhänger:** anlegen, bearbeiten (Daten, Preise, Beschreibung in fünf Sprachen, Foto), ausblenden, löschen.
- **Fotoänderung geprüft.** In der Demo bleibt ein neues Foto nach Speichern und Neuladen erhalten.

**Für den Livegang des Admin-Bereichs (Nave):** Supabase einrichten, wie im README unter „Supabase einrichten“ beschrieben (etwa 30 Minuten).
- Projekt in der EU anlegen und `supabase db push` ausführen.
- Registrierung schließen und ein Konto pro Person anlegen.
- GitHub-Schlüssel erstellen, `supabase secrets set` ausführen, `supabase functions deploy publish`.
- Die zwei GitHub-Variablen `PUBLIC_SUPABASE_URL` und `PUBLIC_SUPABASE_ANON_KEY` setzen.

Bis dahin läuft der Admin-Bereich als Demo und speichert nur im eigenen Browser.

**Offen:**
- Entscheidung Free- oder Pro-Plan bei Supabase. Der Free-Plan pausiert nach 7 Tagen ohne Zugriff, der tägliche Workflow fragt deshalb einmal am Tag an.
- Die echten Mietanhänger eintragen und die fünf Beispiele löschen. Das geht jetzt direkt im Admin-Bereich.

## Stand 13.10.2026: Bestand aus MovingCar

Der Abgleich liest den Bestand jetzt über die offizielle MovingCar-API, mit dem Zugang der Garage. LuxAuto und AutoScout24 werden nicht mehr ausgelesen. Damit sind die Punkte **1** (Einverständnis für die Übernahme der Portal-Inserate) und **2** (Nutzungsbedingungen der Portale) erledigt. Die Daten kommen von der Garage selbst über ihren Dienstleister. Die Punkte 32–35 („bitte in LuxAuto korrigieren“) gelten jetzt für **MovingCar**:
- Beim Austin-Healey (141522) stehen auch in MovingCar 1632 CV, 1200 kW und 21912 cm³. Die Website blendet diese Werte aus.
- **WLTP bei Neuwagen:** MovingCar hat Felder für Verbrauch und CO₂ (WLTP), sie sind bei den Neuwagen aber leer (Ausnahme: CO₂ beim Touareg). Trägt die Garage sie in MovingCar ein, erscheinen sie automatisch auf der Website. Das erledigt Punkt 3.
- **RCU** (Autos auf Bestellung): wartet auf Kontakt und Unterlagen, siehe `API-ANFRAGEN.md`.

## Stand 07.10.2026: Dashboard, Texte, Formulare

- **Admin-Dashboard** unter `/admin/`: inzwischen abgelöst durch den Admin-Bereich auf der Seite (siehe Stand 14.10.2026).
- **Formulare** funktionieren ohne Supabase über WhatsApp und E-Mail mit fertig formuliertem Text (siehe README). Punkt 6 bleibt für den Versand direkt aus der Website offen.
- **Seitentexte:** Alle Leistungs- und Kategorieseiten haben ausführliche Texte und eigene FAQs in fünf Sprachen. **LB und PT** von Muttersprachlern prüfen lassen: `npm run lb:export`, dann `LB-TEXTE/lb-pruefen.txt`.

## Blockiert den Livegang

| # | Thema | Was fehlt | Wo eintragen |
|---|---|---|---|
| 1 | ~~**Schriftliches Einverständnis**~~ **Erledigt 13.10.2026:** Der Bestand kommt über den MovingCar-Zugang der Garage. ~~der Garage, dass ihre Inserate und Fotos von LuxAuto/AutoScout24 auf der eigenen Website übernommen werden (B7.4, T2.8) | Dokument | Ablage bei Nave |
| 2 | ~~**Nutzungsbedingungen der Portale**~~ **Erledigt 13.10.2026** (MovingCar statt Portale). Alt: Das Einverständnis der Garage deckt ihre Inhalte ab, nicht aber das automatische Lesen von luxauto.lu und autoscout24.lu. Die `robots.txt` erlaubt unserem Bot die nötigen Seiten. AutoScout24 sperrt dort aber ausdrücklich KI-Crawler, und die AGB beider Portale können automatisiertes Auslesen untersagen. **Empfehlung:** Bei LuxAuto (atHome Group) nach einem offiziellen Export oder Feed für die Händler-Website fragen, oder eine schriftliche Erlaubnis einholen. | Klärung Nave, Kunde, Portal | – |
| 3 | **Neuwagen: WLTP-Verbrauch und CO₂** (Richtlinie 1999/94/EG). Heute sind 5 Neuwagen im Bestand, und keins der Portale liefert Werte. Die Seite zeigt „Consommation et CO₂ (WLTP) : informations au garage". Ob das rechtlich reicht, ist `[UNBESTÄTIGT]`. | Werte je Auto oder rechtliche Klärung | `src/data/vehicle-overrides.json` (`wltpConsumption`, `co2Gkm`); der Sync-Bericht listet die Autos |
| 4 | **Mietflotte**: Art, zulässiges Gesamtgewicht, Leergewicht, Nutzlast, gebremst, Innenmaße, bei Kühlanhängern Volumen, Temperatur und Strom; Preis pro Tag und Wochenende, Kaution, Stecker 7/13-polig, Fotos. Ohne Flotte zeigt der Finder im Produktions-Build „La liste de nos remorques arrive bientôt". Die Kategorieseiten entstehen erst mit Fahrzeugen. | Liste des Kunden | **Admin-Bereich → „Anhänger“** (oder `src/content/flotte/*.json`) |
| 5 | ~~**Impressum**~~ **Erledigt 16.10.2026:** Niederlassungsgenehmigung 10179686 (guichet.lu), Kapital 12.000 €, Gérant David Moreira. | Nummer, Betrag, Bestätigung | `site.json` → `businessPermit`, `shareCapital`, `manager.confirmed` · Schlüssel `legal.permitMissing`, `legal.capitalMissing`, `legal.managerMissing` |
| 6 | **Formular-Versand**: Auf Cloudflare vorbereitet (`/api/inquiry`, siehe README → „Cloudflare einrichten“); es fehlt der Mailanbieter in der EU. Alt: Supabase-Projekt in der EU anlegen, Migration und Function deployen, Mailanbieter in der EU wählen (Brevo oder Scaleway sind vorbereitet), Empfänger bestätigen (info@rondpoint.lu `[UNBESTÄTIGT]`) | Entscheidung Nave, Zugang | README → „Formulare"; GitHub-Variable `PUBLIC_INQUIRY_URL` |
| 7 | **Domain und DNS**: Wo ist rondpoint.lu registriert, wer hat Zugriff? Die heutige Wix-Seite hängt daran. | Zugang | README → „Livegang" |
| 8 | **Führerscheinregeln** vor Livegang noch einmal gegen transports.public.lu prüfen. Am 28.09.2026 geprüft: B bis 750 kg; darüber, wenn das Gespann ≤ 3 500 kg wiegt; ≤ 4 250 kg mit Schulung (Code 96). Die Feldcodes F.2, O.1 und O.2 am luxemburgischen Dokument bestätigen. | Prüfung | `src/lib/permis.ts`, Schlüssel `faq.items.permis.a`, `faq.items.carte.a` |
| 9 | **LB und PT** von Muttersprachlern prüfen lassen, jeder Text (je 541). Die unsichersten Stellen stehen oben in der Liste. | Prüfung | `I18N-REVIEW.md`; Geprüftes in `src/i18n/review.json` eintragen, dann `npm run i18n:review` |

## Inhalte vom Kunden

| # | Seite | Schlüssel | Was fehlt |
|---|---|---|---|
| 10 | Location, FAQ | `pages.rental.conditionsMissing`, `faq.items.louer.a`, `faq.items.reserver.a` | Mietbedingungen: Ausweis, Führerschein, Kaution, Abhol- und Rückgabezeiten, Reservierung |
| 11 | Location | `pages.rental.durationsMissing` (`site.json` → `confirmations.rentalDurations`) | Stimmt „à la journée ou pour le week-end"? |
| 12 | Location, Finder, FAQ | `finder.priceMissing`, `faq.items.prix.a` | Preise (kommen mit der Flotte, Punkt 4) |
| 13 | Voitures | `depot.missing` | Konditionen des Kommissionsverkaufs |
| 14 | Voitures, Autoseiten | `site.json` → `confirmations.pricesInclVat` | Sind die Preise aus MovingCar TTC? (Einige Inserate tragen „TVA récupérable"; das wird angezeigt.) |
| 15 | Atelier | `pages.workshop.transparencyMissing` (`confirmations.workshopTransparency`) | Kostenvoranschlag vorher und detaillierte Rechnung? Nur dann kommt der Satz auf die Seite. |
| 16 | Atelier, FAQ | `faq.items.marques.a` (`confirmations.workshopAllBrands`) | Werden alle Marken repariert? |
| 17 | Atelier | `pages.workshop.extraMissing` (`confirmations.workshopExtraKeywords`) | Richtbank, Smart Repair, Ausbeulen, Turbo, 4x4, Restaurierung: Was davon stimmt? |
| 18 | Remorques à vendre | `pages.trailersForSale.stockMissing` | ~~Händlerstatus~~ bestätigt (mit Tohaco). Offen: Logos nur mit Freigabe; Anhänger auf Lager |
| 19 | Jardin & forêt | – | ~~Erledigt 16.10.2026:~~ kein Händlerstatus nennen |
| 20 | Startseite | `reviews.missing` (`site.json` → `reviews`) | 2–3 freigegebene Google-Zitate: Text, Vorname + Initiale, Monat/Jahr. Ohne Freigabe entfällt die Sektion. |
| 21 | Danke-Seite | `pages.thanks.text` | Antwortzeit, z. B. „le jour ouvrable suivant" |
| 22 | Kontakt, FAQ | `pages.contact.paymentMissing`, `faq.items.paiement.a` (`site.json` → `payment.confirmed`) | Zahlungsmittel bestätigen. Erst danach kommt `paymentAccepted` ins JSON-LD. |
| 23 | Datenschutz | `privacy.storage` | EU-Mailanbieter nennen; Löschfrist 90 Tage bestätigen |
| 24 | Footer | `footer.tiktokMissing` (`site.json` → `social.tiktok`) | Genaue TikTok-URL |
| 25 | Öffnungszeiten | `hours.holidaysClosed` | ~~Erledigt 16.10.2026:~~ an Feiertagen geschlossen |
| 26 | Verkauf | – | Was von LuxAuto „Services du garage" stimmt wirklich: Leasing, Finanzierung, Import/Export, Fahrzeugsuche, Detailing, Zulassung, Transport? (steht nirgends auf der Seite) |

## Fotos und Marke

| # | Seite | Schlüssel / Stelle | Was fehlt |
|---|---|---|---|
| 27 | Startseite Hero | `Home.astro` (Platzhalter unter der Zeichnung) | Foto des Geländes am Kreisel bei Tageslicht, 16:10. Bis dahin steht die Kreisel-Zeichnung dort. |
| 28 | Startseite Leistungen | `services.photoMissing` | Fotos Werkstatt, Sodablast, Garten & Forst, Anhänger |
| 29 | Sodablast | `pages.sodablast.photosMissing` | Vorher-nachher-Fotos |
| 30 | Logo | `src/components/Logo.astro` | Vektordatei. Das „O" braucht eine eigene SVG-Gruppe `class="logo-o"`, dann läuft die Drehung beim Laden (C7). |
| 31 | Mietflotte | Admin-Bereich → „Anhänger“ → Foto | Fotos der Anhänger (optional) |

## Aus dem Abgleich (bitte in MovingCar korrigieren)

| # | Inserat | Befund |
|---|---|---|
| 32 | Austin-Healey 3000 (Ref 141522) | „Puissance 1632 CV" und „Cylindrée 21912 Cm³" sind offensichtlich Tippfehler im Inserat. Die Website zeigt beide Werte nicht an, und der Sync meldet es täglich. |
| 33 | ~~Audi A1, BMW 118i, VW T-Roc~~ **Erledigt:** Die Karosserie kommt jetzt aus der MovingCar-Kategorie. | Carrosserie „4/5 portes" ist eine Türenzahl, keine Karosserie. Die Website übernimmt die Karosserie von AutoScout24 („Citadine"). |
| 34 | Mehrere Autos | Hochformat-Fotos mit weißem Rand (z. B. Audi A4, VW T-Roc). Querformat 4:3 füllt die Liste besser. |
| 35 | ~~Neuwagen~~ **Erledigt:** MovingCar liefert den Zustand direkt. Alt: LuxAuto markiert Neuwagen im JSON-LD als „UsedCondition" und zeigt unter „Année" das Einstelldatum. Der Abgleich erkennt sie trotzdem (Merkmal `vehicule_neuf`, Abgleich mit AutoScout24) und setzt keine Erstzulassung. |

## Für Nave

| # | Thema |
|---|---|
| 36 | **OpenStreetMap**: Am Standort steht noch ein Punkt „Remorque Center Leweck" (shop=trailer). Er kommt nicht auf die Website. Nave oder der Kunde sollte ihn in OSM prüfen und entfernen lassen. |
| 37 | **Google-Unternehmensprofil**: siehe README → „Google-Unternehmensprofil" (G4) |
| 38 | **MwSt-Nummer** LU36559673 vor Livegang in VIES prüfen |
| 39 | **„Nouveau"** steht in der ersten Woche an allen 10 Autos, weil der erste Abgleich alle als neu sieht. Das erledigt sich nach 7 Tagen von selbst. |
| 40 | **Lighthouse, Tastatur, reduzierte Bewegung, echtes Handy**: siehe README → „Prüfung". Die Messwerte stammen aus der lokalen Vorschau; auf dem echten Handy muss noch getestet werden. |
