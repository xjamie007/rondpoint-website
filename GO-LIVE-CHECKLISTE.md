# Go-Live-Checkliste: Termin mit David (Samstag)

Stand: 22.10.2026 (nach der Antwort von Intec). Die Details zum Domain-Umzug stehen in `UMZUG-DOMAIN.md`, alle offenen Inhalte in `OFFENE-PUNKTE.md`.

**Ziel:** Nach dem Termin sind die Zugänge geklärt, die Domain zeigt auf Cloudflare, und alle Inhalte, die noch fehlen, sind bekannt. Danach folgt der Go-Live-Abend (etwa 30 Minuten).

---

## 1. Vor Samstag vorbereiten (du)

- [ ] **Laptop mit Logins:** Cloudflare (Nave-Konto, Zone `rondpoint.lu` steht schon), Admin-Bereich der Website und diese Checkliste.
- [ ] **Kreditkarte**, falls du am Samstag schon zu my.lu umziehst: Transfer 28 € inkl. MwSt.
- [ ] **David um Zugänge bitten:** Wix, und EuroDNS, falls er ein eigenes Konto hat.
- [ ] **Intec vorab fragen**, ob rondpoint.lu in ihrem EuroDNS-Konto liegt (Antwort-Entwurf in Abschnitt 8). Dann weißt du am Samstag schon, wer die Nameserver umstellt.
- [ ] **Mail an audaris** schicken (Entwurf siehe unten, Abschnitt 7).
- [ ] **Google-Bewertungen:** die drei Originaltexte kopieren (bei Google „Original ansehen“). Arslan C. und Elvis D. auf Französisch, Smybbs auf Englisch. Dann stehen sie auf Luxemburgisch im Original.
- [ ] **Diese Liste ausdrucken** oder auf dem Tablet öffnen. Abschnitt 4 sind die Fragen an David.

## 2. Am Samstag: Zugänge und Domain (zuerst, etwa 30 Minuten)

**Stand 22.10. (Antwort von Intec):**
- Intec hat **keinen Zugang zu Wix**, und die DNS-Zone wird **nicht** über ihr EuroDNS-Konto verwaltet.
- Ihr Rat: alle Einstellungen 1:1 von Wix übernehmen. Das ist erledigt; Cloudflare ist identisch mit Wix (geprüft am 18.10.).
- Andere E-Mail-Einträge wie DKIM gibt es nicht. MX und SPF bleiben unverändert.
- **Noch unklar ist, wo die Domain selbst verwaltet wird.** Laut .lu-Register ist der Registrar EuroDNS. Möglich sind drei Fälle:
  - **A:** Davids eigenes EuroDNS-Konto.
  - **B:** Intecs EuroDNS-Konto. Intecs Antwort deutet darauf hin.
  - **C:** über Wix gekauft (Wix nutzt einen Partner-Registrar).

### Schritt 1: Herausfinden, wo die Domain liegt (5 Minuten)
- [ ] Bei **Wix** einloggen → „Domains“ → rondpoint.lu.
  - Steht dort „Bei Wix gekauft“ → **Fall C**.
  - Steht dort „Verbunden“ (Connected) → **Fall A oder B**.
- [ ] Fragen, ob David ein **eigenes EuroDNS-Login** hat und rondpoint.lu darin steht → **Fall A**.
- [ ] Sonst: **Fall B**. Intec anrufen (+352 978 087) oder vorab mailen (Antwort-Entwurf in Abschnitt 8).
- [ ] Bei Wix gleich die DNS-Einträge abfotografieren (Domains → rondpoint.lu → DNS-Einträge). Damit lässt sich gegenprüfen, dass Cloudflare 1:1 gleich ist.

### Schritt 2: Nameserver auf Cloudflare umstellen
- [ ] **Vorher:** von deinem Handy eine Test-Mail an info@rondpoint.lu schicken und David antworten lassen.
- [ ] **Neue Nameserver**, je nach Fall:
  - **Fall A:** Im eigenen EuroDNS-Konto die Nameserver `ns6.wixdns.net` und `ns7.wixdns.net` ersetzen durch **`bella.ns.cloudflare.com`** und **`chad.ns.cloudflare.com`**. DNSSEC bleibt aus.
  - **Fall B:** Intec bitten, genau diese Änderung in ihrem EuroDNS-Konto zu machen.
  - **Fall C:** Bei Wix lassen sich die Nameserver nicht ändern. Dann gleich den Umzug zu my.lu machen und dabei die Cloudflare-Nameserver angeben (Schritt 3).
- [ ] **Danach mir Bescheid geben.** Ich prüfe das .lu-Register (bis zu 12 Stunden), ob Cloudflare „Active“ meldet und ob MX und SPF überall stimmen.
- [ ] **Abends oder am nächsten Tag:** noch eine Test-Mail an info@rondpoint.lu, hin und zurück.
- Das ist ungefährlich: Bei Cloudflare stehen dieselben Einträge wie bei Wix. Die alte Wix-Seite und die E-Mail laufen unverändert weiter.

### Schritt 3: Umzug zu my.lu (darf auch nach Samstag sein)
- [ ] **Inhaber der Domain notieren.** Er muss GARAGE UM ROND POINT S.à r.l. sein. Steht dort Intec oder jemand anderes, ist das ein Inhaberwechsel (trade) und kein einfacher Umzug.
- [ ] **Kontakt-E-Mail notieren.** An diese Adresse geht die Bestätigung. Bei Fall B ist das wohl eine Adresse von Intec; dann Intec vorwarnen, damit sie bestätigen.
- [ ] Bei my.lu ein Konto anlegen: Inhaber die Garage, technischer Kontakt Nave. Kreditkarte nötig, 28 €.
- [ ] Transfer von rondpoint.lu beantragen, Nameserver `bella.ns.cloudflare.com` und `chad.ns.cloudflare.com`. Die Bestätigungs-Mail muss innerhalb von 15 Tagen bestätigt werden.
- [ ] Bei Fall C (Wix): vorher bei Wix „Domain übertragen“ bzw. „Transfer away“ auslösen, falls Wix das verlangt.

### Wix
- [ ] Einloggen. Notieren: welcher Plan und wann er sich verlängert.
- [ ] **Noch nicht kündigen.** Die alte Seite ist bis eine Woche nach dem Go-Live der Notfall-Plan.
- [ ] Falls auf der Wix-Seite Formulare oder Kontaktanfragen gespeichert sind: exportieren.

### Intec (E-Mail)
- [x] Angefragt am 22.10.: Es braucht keine weiteren Einträge. MX und SPF übernehmen wir unverändert.
- [ ] Nur bei Fall B: Intec stellt die Nameserver in ihrem EuroDNS-Konto um bzw. bestätigt den Umzug zu my.lu.

### Google
- [ ] **Google-Unternehmensprofil:** Wer ist Inhaber oder Verwalter? Nave als Verwalter hinzufügen lassen, damit wir die Website-Adresse und Fotos pflegen können.
- [ ] **Google Search Console:** Davids Zustimmung, dass wir sie für rondpoint.lu einrichten. Die Bestätigung läuft über einen DNS-Eintrag bei Cloudflare; den mache ich.

## 3. Admin-Bereich mit David durchgehen (15 Minuten)

- [ ] David meldet sich an (david@rondpoint.lu). Er hat das Passwort per SMS bekommen.
- [ ] Zeigen:
  - **Texte:** Text antippen, ändern, „Speichern“. In der Übersicht prüfen, was **gelb** markiert ist (automatisch übersetzt), und bei Bedarf verbessern.
  - **Fotos:** antippen, dann „Foto aus Galerie“.
  - **Anhänger:** neu anlegen, mit Preisen für ½ Tag, Tag, Wochenende und Woche. **Transporter:** Art „Transporter“ wählen, dann die Kilometer inklusive eintragen.
  - **„Was transportieren Sie?“:** passende Anhänger ankreuzen.
  - **Öffnungszeiten:** über „Zeiten“.
  - **Nach dem Speichern:** Es steht „Wird veröffentlicht …“, und nach 1 bis 3 Minuten ist alles online.
- [ ] Fragen: Braucht noch jemand ein eigenes Konto, z. B. ein Mitarbeiter? Ich lege es an.

## 4. Inhalte, die David liefern oder bestätigen muss

**Ohne diese Punkte bleiben auf der Seite Lücken.**

### Pflicht vor dem Go-Live
- [ ] **Mietbedingungen:**
  - Was braucht der Kunde: Ausweis, Führerschein?
  - Kaution: heute sind bei allen Anhängern 300 € eingetragen. Stimmt das?
  - Abhol- und Rückgabezeiten.
  - **Was heißt „½ Tag“ genau?** Zum Beispiel 8–12 oder 13–18 Uhr?
  - **Wie reserviert man?** Anruf, WhatsApp oder Formular, und wie weit im Voraus?
- [ ] **Antwortzeit** auf Anfragen über die Website, z. B. „am nächsten Werktag“.
- [ ] **Zahlungsmittel bestätigen:** Bargeld, Visa, Mastercard, V Pay, Payconiq, Apple Pay, PayPal, Überweisung.
- [ ] **Werkstatt:**
  - Gibt es vorher einen Kostenvoranschlag und danach eine detaillierte Rechnung?
  - Werden **alle Marken** repariert?
  - Welche Zusatzleistungen stimmen: Richtbank, Smart Repair, Ausbeulen, Turbo, 4x4, Restaurierung alter Autos? Wegen „Carrosserie“ im neuen Logo wichtig.
- [ ] **Kommissionsverkauf:** Konditionen (Provision, Dauer, wer macht Fotos und Inserat).
- [ ] **Datenschutz:** Ist es in Ordnung, dass Anfragen aus den Formularen nach **90 Tagen** automatisch gelöscht werden?

### Fotos
Bis jetzt sind echt: Startbild, Vermietung, Sodablast, Garten und Anhängerverkauf.
- [ ] Werkstatt (innen, bei der Arbeit).
- [ ] Karosserie und Lackierung.
- [ ] „Über uns“ auf der Startseite: Team oder Gebäude.
- [ ] Garten & Forst (zweites Bild für die eigene Seite).
- [ ] Sodablast vorher und nachher (am besten 2–3 Paare).

### Vermietung
- [ ] **Transporter** (Camionnetten):
  - Welche gibt es: Gesamtgewicht, Nutzlast, Laderaum-Maße?
  - Preise und **inklusive Kilometer** je ½ Tag, Tag, Wochenende und Woche.
  - Preis je weiterem Kilometer.
- [ ] **Auf der Preisliste, aber noch nicht auf der Website:** Caisse 1300 kg, Plateau 2000 kg, Pferdeanhänger, Kühlanhänger 1300 und 2000 kg, Grillanhänger. Dafür braucht es je Anhänger Nutzlast, Leergewicht, gebremst ja/nein, Stecker 7- oder 13-polig und ein Foto.
- [ ] **Vertikutierer und Freischneider zum Mieten:** Sollen die auf die Website, z. B. auf die Seite Garten & Forst?
- [ ] **Unterschiede zwischen Liste und Website klären:**
  - Motorradanhänger: Maße 2,20 × 1,30 m (Liste) oder 2,50 × 1,56 m (Website)?
  - Kastenanhänger: 1300 oder 1350 kg?
  - Pkw-Anhänger 2700 kg: Preise für ½ Tag und Woche?

### Verkauf
- [ ] **In MovingCar korrigieren:**
  - WLTP-Verbrauch und CO₂ bei den 5 Neuwagen (DFSK K01, VW T-Roc, Cupra Terramar, VW Touareg, Audi A1).
  - Austin-Healey: 1632 CV, 1200 kW und 21912 cm³ sind Tippfehler.
- [ ] **Preise in MovingCar:** Sind sie inklusive MwSt.?
- [ ] **Anhänger auf Lager** (Seite „Anhänger kaufen“): Gibt es welche zu zeigen? Sonst lassen wir den Abschnitt weg.

### Kleinigkeiten
- [ ] Link zum **TikTok-Konto**, falls es eins gibt.
- [ ] **Texte gegenlesen:** Wer prüft die luxemburgischen und portugiesischen Texte als Muttersprachler? David für Luxemburgisch?

## 5. Was ich (Nave/Claude) vorbereite

- [ ] **Umschalt-Paket** als fertiger Branch, aber noch nicht live:
  - Custom Domains `www.rondpoint.lu` und `rondpoint.lu` im Worker.
  - Weiterleitungen: `/` → `/lb/`, die alten Wix-Adressen `/privacy-policy` und `/accessibility-statement`, und `rondpoint.lu` → `www`.
  - Präsentationsmodus aus.
  - workers.dev-Adresse aus.
  - GitHub Pages aus.
- [ ] **Formulare per E-Mail** mit Brevo (EU-Anbieter, kostenlos bis 300 Mails pro Tag), sobald der DNS bei Cloudflare liegt:
  - Brevo verlangt zwei DNS-Einträge (DKIM und eine Bestätigung). Den SPF-Eintrag **ergänzen**, nicht doppelt anlegen.
  - Danach setze ich beim Worker den Mailanbieter, den Schlüssel, den Absender und `FORM_RECIPIENT=info@rondpoint.lu`, und beim Build `PUBLIC_INQUIRY_URL=/api/inquiry`.
  - Anschließend die Datenschutzerklärung anpassen.
- [x] MwSt-Nummer LU36559673 im EU-Register (VIES) geprüft: **gültig**, „GARAGE UM ROND POINT S.A R.L.“ (22.10.2026).

## 6. Go-Live-Abend (wenn Abschnitt 4 „Pflicht“ erledigt ist, etwa 30 Minuten)

Ablauf wie in `UMZUG-DOMAIN.md`, Phase 3:
1. In Cloudflare die Wix-Einträge (3 A-Einträge und www-CNAME) löschen. **MX und SPF bleiben.**
2. Im Worker Custom Domains `www.rondpoint.lu` und `rondpoint.lu` anlegen. Das Zertifikat kommt automatisch.
3. Redirect Rule `rondpoint.lu` → `https://www.rondpoint.lu` und „Always Use HTTPS“ einschalten.
4. Das Umschalt-Paket mergen; Cloudflare baut in 1 bis 3 Minuten.
5. **Gemeinsam testen:**
   - Alle Sprachen, Finder, Autos, Showroom.
   - Formulare, Admin-Login (einmal neu anmelden) und Speichern.
   - Test-Mail an info@rondpoint.lu.
6. **Notfall:** Custom Domains entfernen und die Wix-Einträge wieder anlegen. Nach wenigen Minuten ist die alte Seite zurück.

## 7. Nach dem Go-Live

- [ ] Google Search Console: Domain bestätigen, Sitemap einreichen.
- [ ] Google-Unternehmensprofil: Website-Adresse `https://www.rondpoint.lu/` eintragen.
- [ ] audaris: Startadresse auf `https://www.rondpoint.lu/de/autos/` setzen lassen.
- [ ] Wix frühestens nach einer Woche kündigen. Vorher prüfen, dass keine Domain-Verlängerung über Wix mehr läuft.
- [ ] Alter OpenStreetMap-Eintrag des Vorgängers am Standort entfernen lassen.
- [ ] Test auf einem echten Handy (iPhone und Android) und Messung mit Lighthouse.
- [ ] Nach 1 bis 2 Wochen in der Search Console prüfen, ob die Seiten aufgenommen werden.

### Mail an audaris (Entwurf)

> Guten Tag Herr Stollberg Mesquita,
>
> vielen Dank, der Showroom ist eingebunden. Drei Bitten:
> 1. Bitte tragen Sie als Empfänger für Anfragen aus dem Showroom info@rondpoint.lu ein (inqireEmailRecipient ist derzeit leer).
> 2. Die Preise werden mit „inkl. 19 % MwSt.“ angezeigt. Für Kunden in Luxemburg gelten 17 %. Wie lässt sich das einstellen?
> 3. Gibt es den Showroom auch auf Französisch oder Englisch? Die Website ist mehrsprachig.
>
> Sobald die Website auf www.rondpoint.lu umgestellt ist (in Kürze), melde ich mich wegen der Basis-Adresse (baseUrl).
>
> Mit freundlichen Grüßen
> Jamie Ley, Nave

## 8. Antwort an Intec (Entwurf)

> Guten Tag,
>
> vielen Dank für Ihre schnelle Antwort. Die Einträge haben wir 1:1 von Wix übernommen.
>
> Eine Frage noch: Laut .lu-Register ist die Domain rondpoint.lu bei EuroDNS registriert. Liegt die **Registrierung der Domain** (nicht die DNS-Zone) in Ihrem EuroDNS-Konto? Falls ja:
> 1. Könnten Sie die Nameserver am Samstag, 24.10.2026, auf **bella.ns.cloudflare.com** und **chad.ns.cloudflare.com** ändern? Wir geben Ihnen kurz vorher telefonisch Bescheid.
> 2. Wir möchten die Domain anschließend zu my.lu (DNS-LU) übertragen, auf die Garage Um Rond Point als Inhaber. Wer ist heute als Inhaber und als Kontakt eingetragen, und würden Sie die Bestätigung des Transfers freigeben?
>
> Herr Moreira ist in Kopie.
>
> Mit freundlichen Grüßen
> Jamie Ley, Nave · +352 621 467 821 · info@nave.lu
