# Go-Live-Checkliste: Termin mit David (Samstag)

Stand: 22.10.2026. Die Details zum Domain-Umzug stehen in `UMZUG-DOMAIN.md`, alle offenen Inhalte in `OFFENE-PUNKTE.md`.

**Ziel:** Nach dem Termin sind die Zugänge geklärt, die Domain zeigt auf Cloudflare, und alle Inhalte, die noch fehlen, sind bekannt. Danach folgt der Go-Live-Abend (etwa 30 Minuten).

---

## 1. Vor Samstag vorbereiten (du)

- [ ] **Laptop mit Logins:** Cloudflare (Nave-Konto, Zone `rondpoint.lu` steht schon), Admin-Bereich der Website und diese Checkliste.
- [ ] **Kreditkarte**, falls du am Samstag schon zu my.lu umziehst: Transfer 28 € inkl. MwSt.
- [ ] **David um Zugänge bitten:** EuroDNS und Wix, außerdem Name und Telefon seines Ansprechpartners bei Intecsoft.
- [ ] **Mail an audaris** schicken (Entwurf siehe unten, Abschnitt 7).
- [ ] **Google-Bewertungen:** die drei Originaltexte kopieren (bei Google „Original ansehen“). Arslan C. und Elvis D. auf Französisch, Smybbs auf Englisch. Dann stehen sie auf Luxemburgisch im Original.
- [ ] **Diese Liste ausdrucken** oder auf dem Tablet öffnen. Abschnitt 4 sind die Fragen an David.

## 2. Am Samstag: Zugänge und Domain (zuerst, etwa 30 Minuten)

### EuroDNS (Domain rondpoint.lu)
- [ ] Einloggen und prüfen, ob `rondpoint.lu` **im EuroDNS-Konto** liegt. Dann wurde sie nicht über Wix gekauft, und wir können die Nameserver direkt ändern.
- [ ] Notieren, falls nötig per Foto:
  - **Inhaber:** muss GARAGE UM ROND POINT S.à r.l. sein.
  - **Kontakt-E-Mail:** an diese Adresse geht beim Umzug zu my.lu die Bestätigung.
  - **Ablaufdatum und automatische Verlängerung.**
- [ ] **DNSSEC** muss **aus** bleiben. Laut Register ist es heute aus.
- [ ] **Vorher:** von deinem Handy eine Test-Mail an info@rondpoint.lu schicken und David antworten lassen.
- [ ] **Nameserver ändern:** `ns6.wixdns.net` und `ns7.wixdns.net` ersetzen durch **`bella.ns.cloudflare.com`** und **`chad.ns.cloudflare.com`**, dann speichern.
  - Das ist ungefährlich: Bei Cloudflare stehen dieselben Einträge wie bei Wix (geprüft am 18.10.).
  - Die alte Wix-Seite und die E-Mail laufen unverändert weiter.
- [ ] **Mir Bescheid geben.** Ich prüfe, ob die Umstellung im .lu-Register angekommen ist (bis zu 12 Stunden), ob Cloudflare „Active“ meldet und ob MX und SPF überall stimmen.
- [ ] **Abends oder am nächsten Tag:** noch eine Test-Mail an info@rondpoint.lu, hin und zurück.
- [ ] **Umzug zu my.lu:**
  - Er kann danach in Ruhe passieren; die Nameserver bleiben dabei auf Cloudflare.
  - Bei my.lu ein Konto anlegen, Inhaber die Garage, technischer Kontakt Nave.
  - Transfer beantragen und die Bestätigungs-Mail innerhalb von 15 Tagen bestätigen.
- **Falls die Domain nicht bei EuroDNS liegt, sondern über Wix gekauft wurde:** Bei Wix lassen sich die Nameserver nicht ändern. Dann den Umzug zu my.lu gleich mit den Cloudflare-Nameservern beantragen (`UMZUG-DOMAIN.md`, Phase 2, Weg A).

### Wix
- [ ] Einloggen. Notieren: welcher Plan und wann er sich verlängert.
- [ ] **Noch nicht kündigen.** Die alte Seite ist bis eine Woche nach dem Go-Live der Notfall-Plan.
- [ ] Falls auf der Wix-Seite Formulare oder Kontaktanfragen gespeichert sind: exportieren.

### Intecsoft (E-Mail)
- [ ] Name und Telefon des Ansprechpartners notieren.
- [ ] Kurz fragen bzw. ausrichten lassen:
  - Wir ziehen den DNS zu Cloudflare um und kopieren MX `ihe.intecsoft.com` und SPF 1:1.
  - Braucht Intecsoft sonst noch einen Eintrag (DKIM, Autodiscover)?
  - Für Intecsoft ändert sich sonst nichts.

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
