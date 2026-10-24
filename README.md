# Garage Um Rond Point – Website

Die Website der Garage Um Rond Point am Kreisel in Erpeldange-sur-Sûre, in fünf Sprachen (FR Standard, LB, DE, EN, PT). Sie hat drei Besonderheiten:

- **„Quelle remorque ?"**: ein Anhänger-Finder mit Führerschein-Check und maßstäblichen Ladeflächen-Zeichnungen
- **Fahrzeugbestand**: kommt jeden Morgen automatisch aus MovingCar (Bestandsverwaltung der Garage, offizielle API)
- **Formulare**: gehen an eine Supabase Edge Function in der EU

Offene Punkte stehen in [`OFFENE-PUNKTE.md`](OFFENE-PUNKTE.md), die Texte zur Prüfung durch Muttersprachler in [`I18N-REVIEW.md`](I18N-REVIEW.md).

## Präsentationsversion

`presentation: true` in `src/content/site.json` schaltet die Version für den Kundentermin ein:

- **Stockfotos:** kommen aus `src/assets/demo/`, alle mit freier Lizenz; die Nachweise stehen in `src/assets/demo/CREDITS.md` und im Impressum.
- **Beispiel-Anhänger:** Die fünf Beispiele erscheinen auch im Produktions-Build, mit Fotos.
- **Platzhalter:** Die internen `[FEHLT]`/`[UNBESTÄTIGT]` sind ausgeblendet, unbestätigte Aussagen fehlen ganz.

Mit `false` ist die geprüfte Version mit allen Platzhaltern zurück. Echte Fotos haben immer Vorrang: Eine Datei in `src/assets/photos/` mit gleichem Namen (z. B. `hero-workshop.jpg`) ersetzt das Demo-Foto auch in der Präsentation.

Bewegung in der Präsentationsversion:

- **Lade-Moment:** Beim Laden der Startseite dreht sich das Kreisel-„O" des Logos, die h1 wird freigelegt, und ein oranger Vorhang gibt das Foto frei.
- **Beim Scrollen:** Überschriften und Autos blenden sanft ein, Fotos öffnen sich mit leichtem Zoom (CSS `animation-timeline: view()`, ohne JavaScript).
- **Interaktion:** Die Unterstreichung der Navigation wächst von links, sekundäre Buttons füllen sich beim Hover schwarz.

Das Foto selbst bewegt sich beim Laden nicht, damit das LCP nicht wartet. Bei reduzierter Bewegung ist alles aus.

## Technik

| Bereich | Umsetzung |
|---|---|
| Framework | Astro 7, statisch |
| Interaktiv | Finder als React-Island (`client:visible`); Menü, Filter, Galerie, Kontaktleiste und Formulare in Vanilla-TypeScript |
| Styling | Tailwind CSS 4 mit eigenen Tokens (`src/styles/global.css`) |
| Schrift | Archivo variabel, selbst gehostet (`public/fonts/`, OFL) |
| Daten | Content Collection `flotte`, `src/data/stock.json` (Abgleich), `src/content/*.json` |
| Formulare | Cloudflare Worker `/api/inquiry` mit D1 (EU), Löschung nach 90 Tagen; Alternative: Supabase Edge Function `inquiry` |
| Hosting | Cloudflare Worker mit statischen Assets (Variable `HOSTING=cloudflare`), sonst GitHub Pages; beides über GitHub Actions |
| Admin-Bereich | Editor auf der Seite (`src/edit/`), Anmeldung und Speichern über den Worker (`worker/`) |

## Starten

```bash
npm ci
npm run dev        # http://localhost:4321 – mit den _dev-Beispielen der Flotte
npm test           # Vitest: Parser, Lebenslauf, Abbruchregeln, Führerscheinlogik, Paletten, i18n, SEO-Längen
npm run build      # Produktions-Build nach dist/ (ohne _dev-Beispiele)
npm run preview    # dist/ lokal ansehen
```

Die Tests der Edge Function laufen mit Deno:

```bash
cd supabase/functions/inquiry && deno test --allow-env lib.test.ts
```

Der erste Build rechnet alle Autofotos in AVIF und WebP um (480, 800, 1200 und 1600 px) und braucht dafür einige Minuten. Danach liegen sie im Cache `node_modules/.astro`, den auch GitHub Actions zwischen den Läufen aufhebt. Im Repository liegen keine Fotos.

Wer die Beispiele der Flotte in einem Produktions-Build sehen will, zum Beispiel für Screenshots, baut mit `RONDPOINT_SAMPLES=1 npm run build`. **So nie deployen.**

## Aufbau

```
src/
  pages/[lang]/[...path].astro   ein Einstieg für alle Seiten und Sprachen (übersetzte Slugs)
  views/                         eine Datei pro Seite (Home, Rental, Car, …)
  components/                    Header, Footer, Finder, Galerie, Formulare, Kreisel-Zeichnung …
  i18n/                          config.ts (Sprachen, Slugs), fr.ts (Ausgangssprache), de/lb/en/pt.ts
  lib/                           permis.ts, pallets.ts, fleet.ts, stock.ts, jsonld.ts, seo.ts, format.ts
  content/flotte/                Mietflotte, eine JSON-Datei pro Fahrzeug (_dev/ = Beispiele)
  content/site.json              Stammdaten, Bestätigungen, Google-Zitate
  content/horaires.json          Öffnungszeiten – einzige Quelle für Tabelle, Footer und JSON-LD
  data/stock.json                Fahrzeugbestand (vom Abgleich geschrieben)
  data/sync-status.json          Stand des letzten Abgleichs
  data/vehicle-overrides.json    Ergänzungen von Hand (WLTP, ausblenden)
  data/map.json                  Kreisel-Geometrie aus OpenStreetMap
scripts/sync/                    der tägliche Abgleich (MovingCar)
supabase/                        Edge Function und Migration
tests/                           Vitest + Fixtures
```

## Inhalte ändern

- **Texte**: in `src/i18n/fr.ts` und denselben Schlüssel in `de.ts`, `lb.ts`, `en.ts` und `pt.ts` ändern. `npm test` prüft, dass alle Sprachen dieselben Schlüssel und Platzhalter haben und dass Title (50–60 Zeichen) und Description (150–160) passen.
- **Mietflotte**: eine Datei pro Fahrzeug in `src/content/flotte/`, zum Beispiel `porte-voiture-27.json`. Das Schema steht in `src/content.config.ts`. Aus dem Dateinamen wird die ID, die auch im Formular-Link steht (`?remorque=porte-voiture-27`). Die Kategorieseiten, etwa `/fr/location/remorque-porte-voiture/`, entstehen automatisch, sobald ein aktives Fahrzeug der Kategorie existiert. Sind die Maße eingetragen, wird die Ladefläche gezeichnet, sonst nicht. Die Führerscheinaussage rechnet `src/lib/permis.ts` aus `mmaKg`.
- **Öffnungszeiten**: `src/content/horaires.json`
- **Stammdaten und Bestätigungen**: `src/content/site.json`. Beispiele: `confirmations.workshopTransparency: true` zeigt den Transparenz-Satz in der Werkstatt, `payment.confirmed: true` nimmt die Zahlungsmittel ins JSON-LD auf, `reviews: [{ "quote": "…", "name": "Yves J.", "date": "09/2026" }]` füllt die Sektion „Avis Google".
- **Neuwagen (WLTP) und Ausblenden**: `src/data/vehicle-overrides.json`, Schlüssel ist die `stableId` (etwa `r141306`):
  ```json
  { "r139035": { "wltpConsumption": "8,1 l/100 km", "co2Gkm": 184, "note": "Werte laut Datenblatt, NN, 02.10.2026" } }
  ```
  Mit `"hide": true` verschwindet ein Auto, mit `"condition": "new"` wird es als Neuwagen geführt.

## Bestand-Abgleich (MovingCar)

Quelle ist die **MovingCar-API**, die Bestandsverwaltung der Garage (Dokumentation: https://api.movingcar.lu/fr/webservices). MovingCar verteilt die Inserate auch an LuxAuto und AutoScout24. Die Website liest sie direkt an der Quelle, nicht mehr bei den Portalen.

`.github/workflows/stock-sync.yml` läuft jeden Morgen um 04:17 UTC (06:17 Uhr Luxemburger Sommerzeit, 05:17 Uhr Winterzeit). Dabei geschieht Folgendes:
1. Er lädt die Liste der Inserate (Autos und Nutzfahrzeuge, „en ligne“ und „réservé“).
2. Er lädt die Details jedes Inserats auf Französisch, Deutsch und Englisch. Die beiden letzten werden nur für die Ausstattung gebraucht.
3. Er prüft die Daten und schreibt `src/data/stock.json` (nur bei Änderung) und **immer** `sync-status.json`.
4. Er baut die Seite und veröffentlicht sie.

- **Zugang:**
  - HTTP-Basic mit Benutzer und Passwort, die die Garage von MovingCar bekommen hat.
  - Auf GitHub liegen sie als Secret `MOVINGCAR_API_KEY` („benutzer:passwort“), dazu die Variable `MOVINGCAR_AUTH` = `basic`.
  - Lokal stehen sie in `.env`. Die Datei ist von Git ausgeschlossen, ebenso `requete_movingcar*`.
  - Optionale Variablen: `MOVINGCAR_PARTNER_ID` (der Zugang sieht heute nur den Partner 182) und `MOVINGCAR_VEHICLES` (Standard `1_3` = Voiture + Utilitaire, z. B. `1_3_12` mit Anhängern).
- **Von Hand starten:** GitHub → Actions → „Bestand-Sync und Deploy“ → „Run workflow“. Lokal geht es mit `npm run sync`; mit `npm run sync -- --dry-run` wird nichts geschrieben.
- **Daten:**
  - Preis, km, Erstzulassung, Kraftstoff, Getriebe, Leistung, Hubraum, Karosserie, Sitze und Farben
  - WLTP-Verbrauch und CO₂ (wenn in MovingCar eingetragen), Abgasnorm
  - Beschreibung, nur als Text, HTML wird nie übernommen
  - Ausstattung auf FR, DE und EN
  - Fotos in 1600 × 1200
- **Stabile Kennung:** `stableId = "r" + interne Referenz`. Die MovingCar-ID ist genau die Referenz, die auch auf LuxAuto als „Ref Interne“ stand, deshalb haben die Autoseiten beim Wechsel auf MovingCar ihre Adressen behalten. Die URL eines Autos ändert sich nie, solange es existiert.
- **Neuwagen:** MovingCar trägt bei Neuwagen ein Platzhalter-Zulassungsdatum ein. Die Seite zeigt „—“ statt einer Erstzulassung.
- **Plausibilität:** Unplausible Werte wie „1632 CV“ oder „1200 kW“ werden nicht angezeigt und im Bericht gemeldet, das Auto bleibt im Bestand.
- **Lebenslauf:**
  - neu → `active`
  - fehlt → `unavailable`: Die Seite bleibt mit `noindex` und „vendue“, das Auto verschwindet aus Liste und Sitemap.
  - nach 14 Tagen → entfernt, der Pfad liefert 404
  - taucht wieder auf → wieder `active` unter derselben URL
- **Sicherungen – lieber gestern als falsch:** Der Lauf bricht ab, wenn die Anmeldung fehlschlägt, wenn mehr als 30 % der Inserate ungültig sind, wenn er 0 Autos findet oder wenn die Anzahl um mehr als 50 % fällt (sofern vorher mindestens 4 da waren). Dann passiert Folgendes:
  - `stock.json` bleibt unverändert.
  - `sync-status.json` bekommt `status: "error"`.
  - Ein Issue „Bestand-Sync fehlgeschlagen“ wird angelegt oder ergänzt.
  - Es wird nicht deployt, und der Job endet mit Fehler (GitHub schickt eine Mail).
- **60-Tage-Regel:** GitHub schaltet geplante Workflows in öffentlichen Repositories nach 60 Tagen ohne Aktivität ab. Der tägliche Commit von `sync-status.json` hält das Repository aktiv.
- **Statuszeile:** Im HTML steht immer das echte Datum („mise à jour le 13 octobre 2026 à 06:17“). Ein kleines Skript macht daraus „aujourd'hui“/„hier“, aber nur, wenn der Abgleich höchstens 36 Stunden alt ist.

**Tests:**
- `tests/movingcar.test.ts` prüft die Umwandlung mit den Beispieldaten der MovingCar-Dokumentation.
- `tests/sync-run.test.ts` spielt ganze Läufe gegen eine nachgebildete API durch: den normalen Lauf, ein verschwundenes Auto, eine abgelehnte Anmeldung (Abbruch, Seite unverändert) und einen Einbruch der Anzahl (Abbruch).

**Alter Portal-Abgleich:** `scripts/sync/sources/luxauto.ts` und `autoscout24.ts` (mit `http.ts`, `robots.ts`, `crosscheck.ts`, `fetch-fixtures.ts` und ihren Tests) werden nicht mehr benutzt. Sie können gelöscht werden.

## Formulare

Alle vier Formulare senden per normalem POST an die Edge Function und funktionieren ohne JavaScript: Die Function antwortet mit 303 auf die Danke-Seite der Sprache. Mit JavaScript prüft das Formular im Browser, zeigt Fehler direkt am Feld und die Bestätigung direkt am Formular. Im Frontend liegen keine Schlüssel.

Einrichtung bei Supabase (Nave):

1. Projekt anlegen, **Region EU** (z. B. Frankfurt).
2. Migration einspielen: `supabase link --project-ref …` und `supabase db push`. Das legt die Tabellen `inquiries` und `inquiry_rate` mit RLS an und plant zwei `pg_cron`-Jobs: Anfragen werden nach 90 Tagen gelöscht, IP-Hashes nach 24 Stunden.
3. Secrets setzen:
   ```bash
   supabase secrets set FORM_RECIPIENT=info@rondpoint.lu MAIL_PROVIDER=brevo MAIL_API_KEY=… MAIL_FROM="rondpoint.lu <formulaire@rondpoint.lu>" IP_HASH_SALT=$(openssl rand -hex 16) SITE_ORIGIN=https://www.rondpoint.lu ALLOWED_ORIGINS=https://www.rondpoint.lu
   ```
   `MAIL_PROVIDER` kann `brevo` oder `scaleway` sein (beide EU); bei Scaleway kommt `SCALEWAY_PROJECT_ID` dazu.
4. `supabase functions deploy inquiry` (`verify_jwt = false` steht in `supabase/config.toml`).
5. In GitHub unter Settings → Variables die Variable `PUBLIC_INQUIRY_URL` auf `https://<projekt>.supabase.co/functions/v1/inquiry` setzen.

Scheitert die Mail, bleibt die Anfrage gespeichert (`mail_status = failed`) und lässt sich im Supabase-Dashboard nachlesen. Der Betreff ist sortierbar, zum Beispiel `[Location] Porte-voiture 2,7 t, 12.10.–13.10.2026 – Nom (PT)`.

Lokal testen, ohne Datenbank und ohne Mail:

```bash
cd supabase/functions/inquiry
INQUIRY_DRY_RUN=1 ALLOWED_ORIGINS=http://localhost:4321 SITE_ORIGIN=http://localhost:4321 deno run --allow-net --allow-env index.ts
# in einem zweiten Terminal, im Projektordner:
echo "PUBLIC_INQUIRY_URL=http://localhost:8000" > .env.development && npm run dev
```

## Livegang und Deploy

1. Repository auf GitHub anlegen und pushen. Unter Settings → Pages als Quelle „GitHub Actions" wählen.
2. Custom Domain `www.rondpoint.lu` eintragen und „Enforce HTTPS" aktivieren.
3. DNS beim Registrar:
   - `www` als CNAME auf `<account>.github.io`
   - Apex `rondpoint.lu` als A-Einträge auf 185.199.108.153, 185.199.109.153, 185.199.110.153 und 185.199.111.153
   GitHub leitet dann `rondpoint.lu` auf `www` um.
4. Die heutige Wix-Seite hat nur eine URL, Weiterleitungen braucht es deshalb nicht. `/` leitet per Meta-Refresh auf `/fr/`.
5. `showOpenPoints` in `src/content/site.json` auf `false` setzen, sobald die offenen Punkte erledigt sind.

## Schrift

Archivo stammt aus dem offiziellen Repository (github.com/Omnibus-Type/Archivo), Lizenz SIL OFL 1.1 in `public/fonts/OFL.txt`. `scripts/fonts/build-font.py` baut das Subset (Latin + Latin Extended-A) und schränkt die Achsen auf wght 400–800 und wdth 100–125 ein. Ergebnis: 68 KB WOFF2 statt 104 KB.

- **Tabellenziffern:** Archivo hat das Feature `tnum`, es kommt keine andere Schrift zum Einsatz.
- **Schmales geschütztes Leerzeichen:** Archivo hat kein U+202F, das `Intl.NumberFormat('fr')` als Tausendertrenner setzt. Das Skript legt es auf das Glyph des schmalen Leerzeichens U+2009.
- **Zahlenformat fr:** Die Website formatiert Französisch mit `fr` statt `fr-LU`, weil CLDR für fr-LU den Punkt als Trenner vorsieht („29.280"). Gewünscht ist „29 280 €".
- **Ausweichschrift:** Die Fallbacks auf Arial sind vermessen (`size-adjust` 98,92 % für Fließtext, 129,24 % für die breiten Überschriften).

## Kreisel-Zeichnung und Bilder

- **Kreisel-Zeichnung:** Die Geometrie stammt aus OpenStreetMap (© OpenStreetMap-Mitwirkende, ODbL). `node --experimental-strip-types scripts/map/build-map.ts` baut `src/data/map.json` neu, mit `--fetch` holt es die Daten frisch von Overpass. Die Website lädt keine Karte von außen.
- **Favicon, Apple-Touch-Icon, Open-Graph-Bild:** `python3 scripts/assets/build-assets.py && node scripts/assets/rasterize.mjs`. Der Text im OG-Bild ist in Pfade umgewandelt.

## Übersetzungen

- **Ausgangssprache ist Französisch**, und alle fünf Sprachen haben dieselben Schlüssel, was `tests/i18n.test.ts` prüft. Fehlt eine Übersetzung, erscheint die Stelle sichtbar als `[FEHLT — Übersetzung]`, nie still auf Französisch.
- **Prüfung durch Muttersprachler:** Jeder luxemburgische und portugiesische Text trägt `review: "native"`, bis er in `src/i18n/review.json` als geprüft eingetragen ist. `npm run i18n:review` schreibt die aktuelle Liste nach [`I18N-REVIEW.md`](I18N-REVIEW.md).
- **Inseratstexte:** Beschreibung und Ausstattung der Inserate bleiben französisch (`lang="fr"`). In den anderen Sprachen steht ein Hinweis darüber, zum Beispiel „Originalbeschreibung auf Französisch".

## Google-Unternehmensprofil (G4, Aufgabe für Nave und den Kunden)

- Website auf `https://www.rondpoint.lu/fr/` setzen
- Name einheitlich „Garage Um Rond Point" (heute „Garage um Rond Point Sàrl")
- Kategorien: Autowerkstatt als Hauptkategorie, dazu Anhängervermietung, Gebrauchtwagenhändler, Karosseriewerkstatt
- Fotos hochladen
- Öffnungszeiten und Feiertage genauso pflegen wie in `horaires.json`
- Doppelte oder veraltete Profile am Standort über „Änderung vorschlagen" zusammenführen oder als geschlossen melden lassen
- In OpenStreetMap steht am Standort noch „Remorque Center Leweck", bitte prüfen lassen (siehe `OFFENE-PUNKTE.md`)

## Entscheidungen und Abweichungen vom Briefing

- **Zahlenformat Französisch:** `fr` statt `fr-LU`. CLDR setzt für fr-LU den Punkt („29.280"), gewünscht ist „29 280 €".
- **MovingCar statt Portale (13.10.2026):** Der Bestand kommt direkt aus der Bestandsverwaltung der Garage, nicht mehr von LuxAuto oder AutoScout24. Daten und Fotos stammen von der Garage selbst, und die Ausstattung gibt es auf Französisch, Deutsch und Englisch. Für Lëtzebuergesch und Portugiesisch zeigt die Seite die französische Liste mit Hinweis.
- **Neuwagen ohne Erstzulassung:** MovingCar trägt bei Neuwagen ein Platzhalter-Datum ein. Die Seite schreibt dort „—" statt eines falschen Datums.
- **Plausibilitätsprüfung:** Unplausible Leistungs- und Hubraumwerte werden verworfen, das Auto aber nicht übersprungen. So verschwindet ein Oldtimer nicht wegen eines Tippfehlers.
- **„aujourd'hui" per Skript:** Eine statische Seite, die „aujourd'hui" fest ins HTML schreibt, ist am nächsten Tag falsch, wenn ein Lauf scheitert. Deshalb steht das echte Datum im HTML, und JavaScript ersetzt es nur innerhalb von 36 Stunden.
- **Heute in der Öffnungszeiten-Tabelle:** wird aus demselben Grund im Browser markiert, nicht im Build.
- **`stock.json` ändert sich täglich,** weil `lastSeen` das Datum des letzten Laufs trägt. Für die Sitemap zählt `lastChanged`, das sich nur ändert, wenn sich Inhalt, Preis oder Status ändern.
- **Vollbild der Galerie:** wird beim ersten Öffnen aus den Galeriebildern erzeugt. Das Vollbild braucht ohnehin JavaScript, so wird das HTML der Autoseite nicht verdreifacht.
- **Kategorieseiten:** Es gibt Slugs für Autotransporter, Motorradanhänger, Kipper, Kühlanhänger und Transporter. Pritschen- und Kofferanhänger (`plateau`, `fourgon`) erscheinen nur im Finder, bis es Slugs für sie gibt.
- **Formular-Fehler ohne JavaScript:** Die Function zeigt eine kurze Seite in der Sprache des Formulars mit den fehlerhaften Feldern und einem Link zurück. Ein reiner 303 würde die Fehler verschlucken.
- **Honeypot:** Bots bekommen dieselbe Erfolgsantwort wie Menschen, gespeichert wird nichts.
- **IP-Hash:** liegt in einer eigenen Tabelle und wird nach 24 Stunden gelöscht, nicht erst mit der Anfrage nach 90 Tagen.
- **TypeScript 6 statt 7:** `astro check` unterstützt TypeScript 7 noch nicht.
- **„Remorque Center Leweck" in OpenStreetMap:** Die Kreisel-Zeichnung zeigt nur Straßen, Bahn, Fluss, Aral und das Gebäude „Um Rondpoint", keine anderen Firmennamen. So bleibt die harte Regel „keine Vorgängerfirma" gewahrt.

## Prüfprotokoll (28.09.2026, lokale Vorschau)

| Prüfung | Ergebnis |
|---|---|
| Vitest | 254 Tests: Parser (LuxAuto, AutoScout24), Lebenslauf, Abbruchregeln, Simulation ganzer Läufe, Enums, robots.txt, Führerscheinlogik (750/751/3 500/3 501/4 250/4 251 kg), Paletten, i18n-Vollständigkeit, SEO-Längen aller Seiten und Autoseiten in fünf Sprachen |
| Deno | 9 Tests der Edge-Function-Logik; `deno check` ohne Fehler |
| `astro check` | 0 Fehler, 0 Warnungen (TypeScript 6; TypeScript 7 wird von `astro check` noch nicht unterstützt) |
| Lighthouse mobil (gedrosselt) | Startseite 99 / 100 / 100 / 100, Location 100 / 100 / 100 / 100, Voitures 100 / 100 / 100 / 100, Autoseite 99 / 100 / 100 / 100, Werkstatt (de) und Kontakt (pt) je 100 / 100 / 100 / 100 (Performance / Barrierefreiheit / Best Practices / SEO). LCP 1,4–2,2 s, CLS ≤ 0,05, TBT ≤ 80 ms |
| JavaScript (gzip) | Startseite 75 KB, Location 76 KB (davon React 65 KB, lädt erst, wenn der Finder sichtbar wird), Autoseiten 4 KB, übrige Seiten 2–4 KB. Bei leerer Flotte wird React gar nicht geladen. |
| Ohne JavaScript | Navigation offen, Finder als vollständige Liste mit „Permis nécessaire", Statuszeile mit echtem Datum, Formulare senden per POST (303 auf die Danke-Seite, bei Fehlern eine Seite in der richtigen Sprache) |
| Formulare | Versand lokal gegen die Function im Probelauf: ohne JS (303), mit JS (Bestätigung am Formular), Fehler am Feld, Honeypot, CORS |
| Tastatur | Reihenfolge logisch, Skip-Link, Menü mit Esc und Fokus-Rückgabe, Galerie mit Pfeiltasten, Vollbild mit Esc, Fokusfalle und Fokus-Rückgabe |
| Reduzierte Bewegung | Alle Übergänge und der Lade-Moment aus; Inhalte sofort sichtbar |
| 320 px Breite | 70 Seiten in fünf Sprachen ohne horizontales Überlaufen. Für Luxemburgisch setzt `src/i18n/index.ts` weiche Trennstriche an den Wortfugen langer Komposita (kein Browser hat ein lb-Trennwörterbuch). |
| Produktions-Build | keine `_dev`-Beispiele, Warnung „Mietflotte leer", Lighthouse Startseite fr 98 / 100 / 100 / 100, lb 100 / 100 / 100 / 100 |

**Noch zu tun:**
- auf einem echten Handy testen
- View Transitions in Chrome und Safari ansehen, Firefox ohne Unterstützung
- Formular nach dem Supabase-Setup echt abschicken, bis die Mail ankommt
- Rich-Results-Test von Google
- Lighthouse erneut messen, sobald echte Fotos und die Flotte da sind

## Veröffentlichung auf GitHub Pages

Der Workflow `.github/workflows/stock-sync.yml` baut die Website bei jedem Push auf `main` und jeden Morgen nach dem Bestand-Abgleich, dann veröffentlicht er sie auf GitHub Pages.

- Ohne eigene Domain liegt die Website unter `https://<konto>.github.io/<repo>/`. Der Workflow übergibt dafür `SITE_URL` und `BASE_PATH` an den Build. Alle Links laufen über `pathFor()` bzw. `withBase()` aus `src/i18n/config.ts`.
- Mit eigener Domain (Settings → Pages → Custom domain, z. B. `www.rondpoint.lu`) ist der Basis-Pfad leer. Der Workflow stellt das automatisch um.
- Solange `presentation: true` gilt, tragen alle Seiten `noindex`, und `robots.txt` sperrt Suchmaschinen. Damit taucht die Demo mit den Stockfotos nicht bei Google auf.
- Lokal den Build unter einem Unterpfad testen: `SITE_URL=https://example.github.io BASE_PATH=/rondpoint-website npm run build`.

## Älteres Admin-Dashboard (`/admin/`, gesperrt)

Abgelöst durch den Admin-Bereich auf der Seite (nächster Abschnitt). **Derzeit gesperrt:** `src/content/site.json` → `admin.enabled: false`. Dann zeigt `/admin/` nur eine „Am Opbau“-Seite, und `/admin/data.json` enthält keine Daten. Zum Freischalten auf `true` setzen. Der Link „Login“ im Footer öffnet inzwischen den Admin-Bereich direkt auf der Seite (siehe unten), das Dashboard bleibt unter `/admin/` erreichbar.

Die Garage pflegt ihre Website selbst, im Browser auf Handy oder Computer. Erreichbar ist es direkt unter `/admin/`. Die Oberfläche gibt es auf Deutsch und Französisch.

**Was man ändern kann**
- **Öffnungszeiten:** zwei Zeitfenster pro Tag. Website, Footer, FAQ-Antworten und Google-Daten übernehmen sie automatisch.
- **Hinweis oben auf der Website:** z. B. „Fermé le 1er novembre“, in allen fünf Sprachen, ein- und ausschaltbar.
- **Anhänger und Transporter zur Miete:** anlegen, ändern, ausblenden und löschen, mit Preisen, Maßen und Foto. Die Prüfregeln entsprechen `src/content.config.ts`, damit der Build nie an einer Eingabe scheitert.
- **Fotos der Seiten:** aus der Galerie wählen oder mit der Kamera aufnehmen. Das Foto wird im Browser auf 2400 px verkleinert und landet in `src/assets/photos/<platz>.jpg`. Eigene Fotos haben Vorrang vor den Beispielfotos.
- **Texte:** alle Texte in allen fünf Sprachen, nach Seiten gegliedert und durchsuchbar. Änderungen stehen in `src/content/texts.json` und gehen den Grundtexten in `src/i18n/*.ts` vor.
- **Google:** Titel und Beschreibung jeder Seite in jeder Sprache, mit Zeichenzähler und Vorschau des Suchergebnisses.
- **Google-Bewertungen** für die Startseite, nur freigegebene.
- **Einstellungen:** Kontaktdaten, soziale Netzwerke, Freigabe unbestätigter Aussagen (`confirmations`), Präsentationsmodus.

**So funktioniert das Speichern**

„Speichern & veröffentlichen“ schreibt alle Änderungen als einen Commit über die GitHub-API auf `main`. Danach baut der Workflow `stock-sync.yml` die Seite neu und veröffentlicht sie, meist in 2–4 Minuten. Das Dashboard zeigt den Fortschritt an. Hat der tägliche Bestand-Abgleich gleichzeitig gespeichert, setzt das Dashboard auf dem neuen Stand neu auf. Einen Server braucht es nicht.

**Zugangsschlüssel für die Garage erstellen** (macht Nave, einmal pro Person):
1. Als Inhaber des Repositorys auf GitHub: *Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token*.
2. Name z. B. „Dashboard Garage“. Ablaufdatum wählen, z. B. 1 Jahr, und im Kalender eintragen.
3. *Repository access:* „Only select repositories“, dann `rondpoint-website`.
4. *Permissions → Repository permissions:* **Contents: Read and write**, **Actions: Read-only**. „Metadata: Read-only“ setzt GitHub selbst.
5. Den Schlüssel (`github_pat_…`) der Garage geben. Er wird einmal pro Gerät eingegeben und dort gespeichert. Alternativ ein persönlicher Link: `https://…/admin/#key=github_pat_…`. Er meldet einmal an und entfernt den Schlüssel sofort aus der Adresszeile. Den Link nur direkt und vertraulich weitergeben.
6. Bei Verlust oder Personalwechsel den Schlüssel auf GitHub löschen. Damit ist der Zugang sofort gesperrt.

Ohne Schlüssel kann niemand speichern. Die Seite `/admin/` ist für Suchmaschinen gesperrt (`noindex`, `robots.txt`), und ihre Content-Security-Policy erlaubt Anfragen nur an die eigene Seite und an `api.github.com`.

**Demo:** „Demo ansehen“ auf der Anmeldeseite zeigt alles mit den Daten des letzten Builds. Änderungen bleiben in diesem Browser, für Präsentationen beim Kunden.

## Admin-Bereich direkt auf der Seite (Login im Footer)

**Das ist der Admin-Bereich für die Garage.** Der unauffällige Link „Login“ neben „Mentions légales“ öffnet ein Anmeldefenster. Danach bearbeitet man direkt auf der Seite, auf Handy und Computer. Ohne Login sieht die Seite genau so aus wie gebaut. Besucher laden nur einen kleinen Starter (`src/edit/boot.ts`), der Editor kommt erst nach dem Login.

**Was man ändern kann**
- **Texte:** antippen und lostippen, auf jeder Seite und in jeder Sprache (Sprache unter „Seiten“ wechseln). Texte mit Telefonnummer, Adresse oder Link öffnen ein kleines Fenster. Platzhalter wie `{phone}` müssen dabei bleiben, sonst übernimmt der Editor den Text nicht.
- **Bilder:** antippen → „Foto aus Galerie“ oder „Foto aufnehmen“. Das Foto wird im Browser auf 2400 px verkleinert (WebP). Dort gibt es auch die Bildbeschreibung und „Ausblenden“.
- **Listen** (Aufzählungen, Ablauf-Schritte, Absätze): einen Eintrag antippen → ↑ ↓ Kopieren Löschen.
- **Öffnungszeiten (unten „Zeiten“ oder auf die Zeiten auf der Seite tippen):**
  - Pro Tag geöffnet/geschlossen, bis zu zwei Zeitfenster (Mittagspause), dazu „Montag auf Dienstag–Freitag übertragen“.
  - Das ist **eine Stelle für die ganze Website:** Tabelle, Fußzeile, alle Texte mit `{hours}` (auch die Google-Beschreibung der Kontaktseite) und die Öffnungszeiten für Google (JSON-LD).
- **Mietanhänger & Transporter (unten „Anhänger“ oder auf eine Fahrzeug-Karte tippen):**
  - Anlegen, bearbeiten und löschen.
  - Felder: Art, Name in fünf Sprachen, Marke, Gewichte (Nutzlast auf Knopfdruck aus Gesamt- und Leergewicht), Ladefläche, Paletten, Preise, Kaution, „geeignet für“, Steckdose, Kühlung.
  - Eine kurze Beschreibung in fünf Sprachen, sie erscheint auf der Karte.
  - Ein Foto, „Auf der Website zeigen“ zum Ausblenden.
  - Die Prüfregeln sind dieselben wie beim Build (`supabase/functions/publish/convert.ts`, z. B. höchstens 3 500 kg). Ein gespeichertes Fahrzeug lässt den Build also nie scheitern.
  - Vorschau sofort auf der Startseite, der Seite „Mieten“ (Finder und Tabelle) und den Kategorieseiten.
- **Google (unter „Mehr“):** Titel und Beschreibung der Seite mit Zeichenzähler und Vorschau, dazu alle Bildbeschreibungen der Seite.
- **„Was transportieren Sie?“ (unter „Anhänger“ oder „Mehr“):**
  - Die Ladungsarten im Finder umbenennen, umsortieren, entfernen und neu anlegen, in fünf Sprachen. Sie stehen in `src/content/cargo.json`.
  - Beim Anhänger unter „Geeignet für“ ankreuzen.
- **Übersicht vor dem Speichern:**
  - „Speichern“ zeigt zuerst alle Änderungen seit dem letzten Speichern.
  - Texte lassen sich dort noch verbessern, jede Änderung einzeln verwerfen.
  - Öffnungszeiten, Anhänger und Ladungsarten öffnen ihr Fenster.
- **Automatisch übersetzen (nur auf Cloudflare):**
  - Ein geänderter Text wird im Hintergrund in die anderen vier Sprachen übersetzt.
  - Das macht Workers AI, Modell Gemma 3, über `/api/translate` im Worker (`worker/translate.ts`), im Free-Plan enthalten.
  - Platzhalter, Link-Ziele und „Um Rond Point“ bleiben. Eine Übersetzung, bei der sie fehlen, wird verworfen.
  - Übersetzte Texte sind in der Übersicht als „automatisch übersetzt – bitte prüfen“ markiert. Von Hand geänderte Sprachen werden nie überschrieben.
  - Abschaltbar unter „Mehr“. Für Namen und Beschreibungen der Anhänger und für die Ladungsarten gibt es den Knopf „Leere Sprachen automatisch übersetzen“.
- **Die Leiste unten:** **Speichern · Rückgängig · Seiten · Anhänger · Zeiten · Mehr**. Nicht gespeicherte Änderungen bleiben beim Seitenwechsel erhalten.

**Nicht hier:** Kontaktdaten und der Fahrzeugbestand (Autos kommen aus MovingCar).

### Demo und Betrieb

| | Demo (heute) | Betrieb auf Cloudflare (Standard) | Alternative: Supabase |
|---|---|---|---|
| Anmeldung | Benutzername `rondpoint`, Passwort bei Nave (nur als Hash in `src/edit/storage.ts`) | E-Mail und Passwort, Konten mit `npm run admin` | E-Mail und Passwort, Konten in Supabase |
| Speichern | nur in diesem Browser (IndexedDB) | für alle Besucher, nach wenigen Minuten | für alle Besucher, nach wenigen Minuten |
| Umgeschaltet durch | – | GitHub-Variable `HOSTING=cloudflare` | GitHub-Variablen `PUBLIC_SUPABASE_URL` und `PUBLIC_SUPABASE_ANON_KEY` |
| Kosten | – | 0 € (Free-Plan reicht) | 0 € (Free, pausiert) oder etwa 25 $ im Monat |

**So funktioniert das Speichern** (Cloudflare: `worker/index.ts` unter `/api/publish`; Supabase: Edge Function `publish`):
1. Der Editor schickt den Stand an die Edge Function `publish` (`supabase/functions/publish/`).
2. Die Function prüft die Anmeldung und den Inhalt und schreibt alles als **einen Commit** ins Repository.
   - Texte → `src/content/texts.json`
   - Listen → `src/content/lists.json`
   - Fotos → `src/assets/photos/`, ausgeblendete Fotos → `src/content/photos.json`
   - Öffnungszeiten → `src/content/horaires.json`
   - Anhänger → `src/content/flotte/<kennung>.json` und `src/assets/flotte/`
3. Der Push startet `stock-sync.yml`: Tests, Build, Veröffentlichung. Das dauert meist 2–5 Minuten.
4. Bis dahin zeigt der Browser der Person, die gespeichert hat, schon den neuen Stand. Er vergleicht dafür die Commit-Zeit im `<meta name="rp-build">`.

Das bringt folgende Vorteile:
- Jede Änderung ist im Git-Verlauf und lässt sich zurückholen.
- Die Website bleibt statisch, schnell und vollständig für Google lesbar.
- Supabase speichert keine Inhalte, nur die Konten und ein Protokoll (`admin_changes`: wer, wann, was).

### Cloudflare einrichten (Nave, einmalig)

Auf Cloudflare liegt alles an einem Ort, kostenlos:
- **Seiten:** Ein Worker liefert die gebauten Seiten aus `dist/` aus (`wrangler.jsonc`).
- **Admin-Bereich und Formulare:** Derselbe Worker beantwortet `/api/*` (`worker/`).
- **Datenbank:** D1 in der EU, die Datenbank-ID steht in `wrangler.jsonc`. Die Tabellen legt der Worker beim ersten Aufruf selbst an (`worker/schema.ts`).
- **Veröffentlichen:** Cloudflare baut selbst aus GitHub (Workers Builds, verbunden mit `xjamie007/rondpoint-website`, Branch `main`). Jeder Push wird veröffentlicht, auch der tägliche Bestand-Abgleich und das Speichern im Admin-Bereich.

**Einstellungen in Cloudflare** (Workers & Pages → `rondpoint-website` → Settings):
1. **Build:** Build command `npm run build`, Deploy command `npx wrangler deploy`. Unter Build → Variables `PUBLIC_HOSTING` = `cloudflare`. Später kommt `SITE_URL` = `https://www.rondpoint.lu` dazu, sobald die Domain verbunden ist; `PUBLIC_INQUIRY_URL` = `/api/inquiry`, sobald die Formulare per Mail gehen.
2. **Variables and Secrets** (Typ *Secret*):
   - `SESSION_SECRET`: ein langer Zufallswert, z. B. aus `openssl rand -base64 48`.
   - `GITHUB_TOKEN`: ein Fine-grained Token von GitHub, nur das Repository `rondpoint-website`, **Contents: Read and write**. Das Ablaufdatum im Kalender eintragen.
3. **Konten anlegen** (im Projektordner, einmal `npx wrangler login`):
   ```bash
   npm run admin -- add name@example.com
   ```
   Das Passwort (mindestens 12 Zeichen) wird nur auf dem eigenen Rechner verschlüsselt. Es gibt keine Registrierung, nur so angelegte Konten können sich anmelden. Weitere Befehle: `npm run admin -- list` und `npm run admin -- remove name@example.com`.
4. **Test:** auf der workers.dev-Adresse des Workers unten auf „Login“ → E-Mail und Passwort → einen Text ändern → Speichern. Nach einigen Minuten erscheint ein Commit „Website-Editor: …“ und ein neuer Build in Cloudflare.

Die GitHub-Variable `HOSTING` bleibt leer. Sonst würde zusätzlich GitHub Actions auf Cloudflare veröffentlichen; dieser Weg mit eigenem API-Token ist nur die Alternative zu Workers Builds.

**Eigene Domain (rondpoint.lu):**
- Die Domain in Cloudflare hinzufügen (**Add a domain**). Beim Registrar die Nameserver auf die zwei von Cloudflare umstellen. E-Mail-Einträge (MX) übernimmt Cloudflare beim Import, bitte trotzdem prüfen.
- Danach Workers & Pages → `rondpoint-website` → **Settings → Domains & Routes → Add → Custom domain** → `www.rondpoint.lu` und `rondpoint.lu`.
- Die Variable `SITE_URL` auf `https://www.rondpoint.lu` setzen und den Workflow erneut starten.

**Formulare direkt verschicken (statt WhatsApp/E-Mail-Knopf):**
- Mailanbieter ist Brevo (EU). Dort die Domain `rondpoint.lu` bestätigen: einen TXT-Eintrag `brevo-code:…` und zwei DKIM-CNAMEs `brevo1._domainkey` und `brevo2._domainkey`. Die CNAMEs in Cloudflare auf „DNS only“ stellen. DMARC gibt es schon, SPF braucht Brevo nicht.
- `MAIL_PROVIDER`, `MAIL_FROM` und `FORM_RECIPIENT` stehen in `wrangler.jsonc`. Nur den Schlüssel als Secret setzen: Dashboard → Worker → Settings → Variables and Secrets → `MAIL_API_KEY` (Typ *Secret*).
- Danach die Build-Variable `PUBLIC_INQUIRY_URL` = `/api/inquiry` setzen und neu bauen. Erst dann schicken die Formulare an `/api/inquiry`; vorher laufen sie über WhatsApp/E-Mail.
- Anfragen bleiben 90 Tage in D1 (Dashboard → D1 → `rondpoint` → `inquiries`). Scheitert eine Mail, steht dort `mail_status = failed`.

**Gut zu wissen**
- **Kosten:** Seiten und Bilder sind auf Cloudflare unbegrenzt kostenlos. Der Worker läuft nur für `/api` (Free: 100 000 Aufrufe pro Tag), D1 im Free-Plan reicht weit.
- **GitHub Pages abschalten,** sobald alles auf Cloudflare läuft: Settings → Pages → „Unpublish site“. Sonst bleibt der letzte Stand dort sichtbar.
- **Zurück zu GitHub Pages:** die Variable `HOSTING` löschen.
- **Lokal testen:**
  - Eine `.dev.vars` mit `SESSION_SECRET=…`, `GITHUB_TOKEN=…` und `MAIL_PROVIDER=log` anlegen; sie ist von Git ausgeschlossen.
  - Dann `PUBLIC_HOSTING=cloudflare npm run build`, `npx wrangler d1 migrations apply rondpoint --local` und `npx wrangler dev`.
- **Weitere Kunden-Websites:** dieselben Dateien (`worker/`, `wrangler.jsonc`) mit eigenem Worker-Namen, eigener Datenbank und eigenen Secrets. Pro Website 0 €.

### Alternative: Supabase einrichten (Nave, einmalig, ca. 30 Minuten)

Dasselbe Supabase-Projekt dient auch den Formularen (siehe oben).

1. **Projekt anlegen:** supabase.com → New project, Region **EU (Frankfurt)**. Ein starkes Datenbank-Passwort im Passwortmanager ablegen.
2. **Tabellen anlegen:** `supabase link --project-ref <ref>`, dann `supabase db push`. Das legt `inquiries`, `inquiry_rate` und `admin_changes` an, alle mit RLS gesperrt.
3. **Registrierung schließen:** Authentication → Sign In / Providers → „Allow new users to sign up“ **aus**. Neue Konten legt nur Nave an.
4. **Konten anlegen:** Authentication → Users → „Add user“ → „Create new user“. E-Mail und Passwort eingeben, „Auto Confirm User“ anhaken. Ein Konto pro Person, zum Beispiel für den Gérant und Nave.
5. **GitHub-Schlüssel für die Function:**
   - GitHub → Settings → Developer settings → Fine-grained tokens → Generate new token.
   - Nur das Repository `rondpoint-website`, Berechtigung **Contents: Read and write**.
   - Ablaufdatum im Kalender eintragen.
6. **Geheimnisse setzen:**
   ```bash
   supabase secrets set GITHUB_TOKEN=github_pat_… GITHUB_REPO=xjamie007/rondpoint-website GITHUB_BRANCH=main ALLOWED_ORIGINS=https://xjamie007.github.io,https://www.rondpoint.lu ADMIN_EMAILS=chef@…,info@nave.lu
   ```
   `ADMIN_EMAILS` ist **Pflicht**: Nur diese E-Mail-Adressen dürfen speichern. Ohne Liste lehnt die Function jedes Speichern ab. Das ist der zweite Schutz, falls die Registrierung in Schritt 3 doch offen ist. Ein neues Konto braucht also zwei Schritte: anlegen (Schritt 4) und hier eintragen.
7. **Function veröffentlichen:** `supabase functions deploy publish --no-verify-jwt`. Die Function prüft die Anmeldung selbst. `--no-verify-jwt` (wie `verify_jwt = false` in `supabase/config.toml`) ist nötig, sonst blockiert Supabase schon die Vorabfrage des Browsers.
8. **Website umschalten:**
   - GitHub → Settings → Secrets and variables → Actions → **Variables**: `PUBLIC_SUPABASE_URL` = `https://<ref>.supabase.co` und `PUBLIC_SUPABASE_ANON_KEY` = der „anon“/„publishable“ Schlüssel. Der ist für den Browser gedacht und öffentlich.
   - Danach den Workflow einmal starten.
9. **Test:** Auf der Website „Login“ → E-Mail und Passwort → einen Text ändern → Speichern. Nach wenigen Minuten erscheint ein Commit „Website-Editor: Texte DE“, und die Seite zeigt die Änderung.

**Gut zu wissen**
- **Konten verwalten:**
  - Passwort vergessen → in Supabase unter Users ein neues setzen.
  - Jemand verlässt die Firma → das Konto löschen und die Adresse aus `ADMIN_EMAILS` nehmen.
  - Läuft die Anmeldung beim Speichern ab, fragt der Editor erneut nach dem Passwort. Die Änderungen bleiben dabei erhalten.
- **Speichern:**
  - Gespeichert wird nur, was sich seit dem letzten Speichern geändert hat. Was man zurücknimmt, wird ausdrücklich wieder auf den alten Stand gesetzt.
  - „Rückgängig“ gilt bis zum letzten Speichern.
  - Ist eine Speicherung nach 20 Minuten noch nicht online, zeigt der Editor einen Hinweis. Dann unter GitHub → Actions nachsehen.
- **Free-Plan:** Supabase pausiert kostenlose Projekte nach 7 Tagen ohne Zugriff. Der tägliche Workflow fragt Supabase deshalb einmal am Tag an („Supabase aktiv halten“). Für einen Firmenauftritt ist der Pro-Plan die sichere Wahl, denn ein pausiertes Projekt sperrt Login und Formulare.
- **Eigene Domain:** zusätzlich in `ALLOWED_ORIGINS` eintragen (Schritt 6), sonst blockiert der Browser das Speichern.
- **Läuft der Build nach dem Speichern nicht durch** (z. B. GitHub-Störung): Der Commit liegt trotzdem im Repository. „Run workflow“ startet ihn erneut, es geht nichts verloren.

### Aufbau (`src/edit/`)
- `storage.ts`: **Speichern und Login: Demo, Cloudflare oder Supabase.** Sonst ändert sich beim Umschalten nichts.
- `worker/` (Cloudflare):
  - `index.ts`: Wegweiser für `/api`, tägliches Aufräumen.
  - `auth.ts`: PBKDF2-Passwörter und signiertes Cookie.
  - `inquiry.ts`: Formulare.
  - `migrations/`: Tabellen.
  - Getestet in `tests/worker.test.ts` mit echter SQLite-Datenbank.
  - Die Umwandlung in Dateien (`convert.ts`) und der GitHub-Commit (`makeGit` in `publish.ts`) sind dieselben wie bei Supabase.
- `match.ts`: ordnet sichtbaren Text seinem Schlüssel in `src/i18n/<sprache>.ts` zu (getestet in `tests/edit.test.ts`).
- `editor.ts`, `editor.css`, `ui.ts`: Bedienoberfläche und das Anwenden der Änderungen.
- `hours.ts`: Fenster „Öffnungszeiten“ und Vorschau (Tabelle `[data-hours=table]`, Fußzeile `[data-hours=sum]`, Texte mit `{hours}`).
- `fleet.ts`: Fenster „Anhänger“.
  - Die Daten kommen aus `/edit/fleet.json`, das beim Build entsteht.
  - Die Vorschau auf den Kategorieseiten macht `fleet.ts` selbst.
  - `fleet-preview.ts` zeichnet Finder und Tabelle neu. Es wird erst bei Änderungen geladen, weil es React braucht.
- `supabase/functions/publish/`:
  - `convert.ts`: Prüfregeln und Umwandlung in Dateien. Dieselbe Datei läuft im Editor, in der Function und in den Tests (`tests/publish.test.ts`).
  - `publish.ts`: Anmeldung, GitHub-Commit, Protokoll.
  - `index.ts`: Einstieg für Deno.
- Format der Änderungen (`EditState` in `convert.ts`):
  - `texts` wie `src/content/texts.json`
  - `lists` mit geänderten Listen als Ganzes
  - `photos` mit den Foto-Plätzen (`data-eimg`)
  - `hours` mit der Woche wie in `horaires.json`
  - `fleet` mit Kennung → Fahrzeugdaten, `null` heißt gelöscht

Das ältere Dashboard unter `/admin/` (Anmeldung mit GitHub-Schlüssel) bleibt gesperrt. Es wird nicht mehr gebraucht, sobald Supabase läuft.

## Formulare ohne Supabase

Solange `PUBLIC_INQUIRY_URL` fehlt, erscheinen nach dem Absenden zwei Knöpfe: „Envoyer par WhatsApp“ und „Envoyer par e-mail“. Beide enthalten die Anfrage fertig formuliert, mit allen ausgefüllten Feldern. Damit funktionieren alle Formulare auch ohne Server. Ist die Edge Function eingerichtet, läuft der normale Versand und diese Knöpfe verschwinden.

## Luxemburgische Texte prüfen

```bash
npm run lb:export
```

Schreibt nach `LB-TEXTE/`:
- **`lb-pruefen.txt`:** nur die luxemburgischen Texte, nummeriert, zum Einfügen in spellchecker.lu.
- **`lb-texte.txt`:** dieselben Texte mit Kennung. Hier werden die Korrekturen eingetragen.

```bash
npm run lb:import
```

Übernimmt geänderte Texte aus `LB-TEXTE/lb-texte.txt` nach `src/content/texts.json`. Texte mit veränderten Platzhaltern (`{address}`, `{phone}` …) werden übersprungen und gemeldet. Einzelne Texte lassen sich auch im Dashboard unter *Texte → LB* ändern.

## Ausführliche Seitentexte (SEO)

Jede Leistungsseite hat unter `t.content.<seite>` Abschnitte und eine eigene FAQ mit `FAQPage`-JSON-LD (`src/components/ContentSections.astro`, `src/components/FaqList.astro`, `src/lib/content.ts`). In den Texten gelten diese Platzhalter:
- `{address}`, `{phone}`, `{whatsapp}`, `{email}`: kommen aus `site.json`.
- `{hours}`: kommt aus `horaires.json`, gleiche Tage werden zusammengefasst.
- Interne Links schreibt man so: `[Text](page:workshop)` oder `[Text](cat:benne)`.

Inhaltlich stehen dort nur bestätigte Angaben aus dem Briefing und allgemeines Fachwissen (Führerscheinregeln, Ladetipps, Materialgewichte). Es gibt keine Preise, keine Erfahrungsjahre und kein „alle Marken“.
