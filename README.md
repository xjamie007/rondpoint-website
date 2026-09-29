# Garage Um Rond Point – Website

Die Website der Garage Um Rond Point am Kreisel in Erpeldange-sur-Sûre, in fünf Sprachen (FR Standard, LB, DE, EN, PT). Sie hat drei Besonderheiten:

- **„Quelle remorque ?"**: ein Anhänger-Finder mit Führerschein-Check und maßstäblichen Ladeflächen-Zeichnungen
- **Fahrzeugbestand**: kommt jeden Morgen automatisch von LuxAuto, AutoScout24 dient als Ersatz
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
| Formulare | Supabase Edge Function `inquiry` (EU), Tabelle `inquiries`, Löschung nach 90 Tagen |
| Hosting | GitHub Pages über GitHub Actions |

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
scripts/sync/                    der tägliche Abgleich (LuxAuto, AutoScout24)
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

## Bestand-Abgleich

`.github/workflows/stock-sync.yml` läuft jeden Morgen um 04:17 UTC, das ist 06:17 Uhr Luxemburger Sommerzeit und 05:17 Uhr Winterzeit. Er lädt `robots.txt`, dann die LuxAuto-Garagenseite mit allen Unterseiten und jedes Inserat. Danach prüft er die Daten, schreibt `src/data/stock.json` (nur bei Änderung) und **immer** `sync-status.json`, baut die Seite und veröffentlicht sie.

- **Von Hand starten:** GitHub → Actions → „Bestand-Sync und Deploy" → „Run workflow". Lokal geht es mit `npm run sync`; mit `npm run sync -- --dry-run` wird nichts geschrieben.
- **Höflich:** eigener User-Agent `RondPointStockSync/1.0 (+https://www.rondpoint.lu/fr/contact/)`, jede Anfrage wird gegen `robots.txt` geprüft, 2 s Abstand, höchstens 80 Anfragen pro Lauf, Timeout 20 s, zwei Wiederholungen. Bei 403, 429 oder einer Bot-Abfrage wird die Quelle für diesen Lauf aufgegeben; es wird nichts umgangen.
- **Gelesen wird über sichtbare Labels** („Kilométrage", „Année" …) und über das JSON-LD, nie über CSS-Klassen. Neuwagen erkennt der Parser am Merkmal `vehicule_neuf` im Datenstrom, denn das JSON-LD sagt bei allen Autos „UsedCondition". Für Neuwagen wird keine Erstzulassung gesetzt, weil LuxAuto dort das Einstelldatum zeigt.
- **Fotos:** LuxAuto-Variante `x` = 2048 × 1536 px, die größte (gemessen am 28.09.2026; `b` = 400 × 300, `r` = 530 × 350). AutoScout24 rechnet die Größe auf Anfrage um, genutzt wird 1920 × 1440.
- **Plausibilität:** Unplausible Werte wie „1632 CV" werden nicht angezeigt und im Bericht gemeldet, das Auto bleibt im Bestand.
- **Abgleich mit AutoScout24:** Nach einem erfolgreichen LuxAuto-Lauf wird die AutoScout24-Händlerseite gelesen, das ist eine einzige Anfrage. Der Lauf vergleicht die Anzahl und übernimmt zwei Dinge:
  - „neu", wenn AutoScout24 ein Auto als Neuwagen führt (wegen der WLTP-Pflicht)
  - die Karosserie, wenn LuxAuto keine brauchbare liefert („4/5 portes")

  Das geht über das Briefing hinaus, das AutoScout24 nur als Ersatz und zum Zählen vorsieht.
- **Stabile Kennung:** `stableId = "r" + Ref Interne` aus der Beschreibung (in beiden Portalen gleich), sonst `lx…`/`as…`. Die URL eines Autos ändert sich nie, solange es existiert.
- **Lebenslauf:**
  - neu → `active`
  - fehlt → `unavailable`: Die Seite bleibt mit `noindex` und „vendue", das Auto verschwindet aus Liste und Sitemap.
  - nach 14 Tagen → entfernt, der Pfad liefert die 404
  - taucht wieder auf → wieder `active` unter derselben URL
- **Sicherungen – lieber gestern als falsch:** Der Lauf bricht ab, wenn mehr als 30 % der Inserate ungültig sind, wenn er 0 Autos findet oder wenn die Anzahl um mehr als 50 % fällt (sofern vorher mindestens 4 da waren). Dann passiert Folgendes:
  - `stock.json` bleibt unverändert.
  - `sync-status.json` bekommt `status: "error"`.
  - Ein Issue „Bestand-Sync fehlgeschlagen" wird angelegt oder ergänzt.
  - Es wird nicht deployt, und der Job endet mit Fehler (GitHub schickt eine Mail).
- **60-Tage-Regel:** GitHub schaltet geplante Workflows in öffentlichen Repositories nach 60 Tagen ohne Aktivität ab. Der tägliche Commit von `sync-status.json` hält das Repository aktiv.
- **Statuszeile:** Im HTML steht immer das echte Datum („mise à jour le 28 septembre 2026 à 06:17"). Ein kleines Skript macht daraus „aujourd'hui"/„hier", aber nur, wenn der Abgleich höchstens 36 Stunden alt ist.

### Wenn LuxAuto das Layout ändert

1. `npm run fixtures` holt die Garagenseite, das Referenzinserat 1930044 und die AutoScout24-Händlerseite neu nach `tests/fixtures/`. Weitere Inserate gehen mit `npm run fixtures -- 1931062 1916354`.
2. `npm test` zeigt, welche Parser-Tests scheitern.
3. Den Parser in `scripts/sync/sources/luxauto.ts` anpassen, nie die Erwartungen in den Tests an einen kaputten Parser.
4. `npm run sync -- --dry-run` gegen die echten Seiten laufen lassen, danach committen.

`tests/sync-run.test.ts` spielt ganze Läufe mit Fixtures durch: den normalen Lauf, ein verschwundenes Auto, ein kaputtes Layout (Abbruch, Seite unverändert) und einen Einbruch der Anzahl (Abbruch).

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
- **AutoScout24 im Normalbetrieb:** Außer dem Zählen übernimmt der Abgleich von AutoScout24 den Zustand „neu" und fehlende Karosserien, siehe oben. Beides ist vorsichtiger als die LuxAuto-Daten allein.
- **Neuwagen ohne Erstzulassung:** LuxAuto zeigt bei Neuwagen unter „Année" das Einstelldatum. Die Seite schreibt dort „—" statt eines falschen Datums.
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
