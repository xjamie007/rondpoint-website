# Umzug auf rondpoint.lu: Plan

Stand: 18.10.2026. Die Werte unten habe ich am 18.10. direkt bei den Nameservern und im .lu-Register abgefragt.

**Ziel:**
- **Website:** läuft auf Cloudflare (der Worker gibt es schon).
- **Domain:** liegt bei my.lu.
- **E-Mail:** bleibt, wo sie ist (Intecsoft).

Dabei darf keine einzige E-Mail verloren gehen, und die Website soll höchstens ein paar Minuten weg sein.

---

## 1. Ist-Zustand (geprüft)

| Was | Heute | Bedeutung |
|---|---|---|
| Registrar (Verwalter der Domain) | **EuroDNS SA**, nicht my.lu | Die Domain muss zu my.lu umziehen (Transfer). |
| Nameserver (wo die DNS-Einträge stehen) | **Wix**: `ns6.wixdns.net`, `ns7.wixdns.net` | Alle Einträge stehen heute bei Wix und müssen zu Cloudflare kopiert werden. |
| E-Mail | **Intecsoft**: MX `ihe.intecsoft.com` (81.246.20.180) | Postfächer, Passwörter und Outlook/Handy bleiben gleich. Nur die DNS-Einträge ziehen mit. |
| Website heute | Wix, `www.rondpoint.lu` (Hauptadresse), `rondpoint.lu` → 301 auf www | Unsere neue Seite nutzt dieselbe Hauptadresse www.rondpoint.lu. |
| DNSSEC | **aus** (kein DS-Eintrag im Register) | Gut: beim Wechsel der Nameserver muss nichts abgeschaltet werden. |
| Wartezeit im .lu-Register | 12 Stunden (TTL 43200) | Nach dem Nameserver-Wechsel bis etwa 12 h, bis alle Server weltweit umgestellt haben. |
| TTL der Einträge bei Wix | 1 Stunde | |
| Alte Wix-Seiten | `/`, `/privacy-policy`, `/accessibility-statement` | Die beiden Unterseiten bekommen eine Weiterleitung. |

### Alle DNS-Einträge heute (vollständig)

Abgefragt bei `ns6.wixdns.net`. Geprüft wurden außerdem 60 übliche Unter-Adressen (autodiscover, mail, webmail, DKIM-Selektoren, _dmarc, SRV usw.). Dort gibt es nichts, auch keinen Platzhalter-Eintrag (`*`).

| Typ | Name | Inhalt | TTL |
|---|---|---|---|
| A | `rondpoint.lu` | 185.230.63.107 | 3600 |
| A | `rondpoint.lu` | 185.230.63.171 | 3600 |
| A | `rondpoint.lu` | 185.230.63.186 | 3600 |
| CNAME | `www` | cdn3.wixdns.net | 3600 |
| MX | `rondpoint.lu` | 10 ihe.intecsoft.com | 3600 |
| TXT | `rondpoint.lu` | `v=spf1 a mx include:ihe.intecsoft.com -all` | 3600 |

**Für die E-Mail zählen nur die MX- und die TXT-Zeile (SPF).** Die A- und CNAME-Zeilen sind die alte Wix-Website.

### Website: schon bereit für www.rondpoint.lu

Diese Teile der Seite verwenden schon heute `https://www.rondpoint.lu`:
- Canonical (die Hauptadresse jeder Seite für Google),
- hreflang (die Sprachversionen),
- Sitemap, robots.txt und die strukturierten Daten.

Für die Domain selbst muss die Seite deshalb nicht umgebaut werden.

---

## 2. Was ich noch brauche

| # | Was | Von wem | Warum |
|---|---|---|---|
| 1 | **Zugang zum Wix-Konto**, in dem rondpoint.lu liegt (oder ein Screenshot von „Domains“ und „DNS-Einträge“) | David | Klären, ob die Domain **über Wix gekauft** wurde. Wenn ja, lässt Wix das Ändern der Nameserver nicht zu, dann ist der Transfer Pflicht. Außerdem gegenprüfen, dass ich keinen Eintrag übersehen habe. |
| 2 | **Wer ist Inhaber der Domain**, und welche **E-Mail-Adresse** steht als Kontakt drin? (steht im Wix- bzw. EuroDNS-Konto) | David | Bei .lu gibt es keinen Transfer-Code. Die Bestätigung geht per E-Mail an den eingetragenen Kontakt, mit **15 Tagen** Zeit. Diese Adresse muss jemand lesen können. Inhaber sollte die GARAGE UM ROND POINT S.à r.l. sein. |
| 3 | Falls die Domain **nicht** über Wix gekauft wurde: **Login bei EuroDNS** | David | Dann ginge es auch ohne Transfer (siehe 4.2, Weg B). |
| 4 | **Kurze Bestätigung von Intecsoft**, dass für die E-Mail nur MX `ihe.intecsoft.com` und der SPF-Eintrag nötig sind, und eine Kontaktperson für den Umzugstag | David oder Nave | Sicherheit, dass kein besonderer Eintrag fehlt (z. B. DKIM mit eigenem Namen). |
| 5 | **Entscheidung, wer das my.lu-Konto hat** (Vorschlag: Inhaber die Garage, Nave als technischer Kontakt info@nave.lu) | du und David | Damit später nicht nur eine Person an die Domain kommt. |
| 6 | **Die zwei Cloudflare-Nameserver**, sobald du rondpoint.lu in Cloudflare angelegt hast (Phase 1) | du | Damit prüfe ich, ob alles 1:1 stimmt, bevor umgestellt wird. |
| 7 | **Termin für den Go-Live** (Phase 3) | du und David | Erst wenn der Inhalt bereit ist (siehe Phase 3, Voraussetzungen). |

---

## 3. Grundregel, damit die E-Mail sicher bleibt

Bevor bei my.lu die Nameserver umgestellt werden, stehen **MX und SPF bei Cloudflare schon genau so wie heute bei Wix**. Während der bis zu 12 Stunden fragt dann ein Teil der Welt noch bei Wix und ein Teil schon bei Cloudflare nach, und beide geben dieselbe Antwort. So geht keine E-Mail verloren.

Weitere Regeln:
- **MX und SPF werden nie angefasst.** Auch nicht am Go-Live-Tag.
- **Nicht einschalten:** In Cloudflare **„Email Routing“ nicht aktivieren**. Es würde die MX-Einträge ersetzen.
- **Proxy nur für die Website:** Alles, was nicht die Website ist, bleibt auf „DNS only“ (graue Wolke).
- **Wix erst spät kündigen:** frühestens eine Woche nach dem Go-Live. Bis dahin ist die alte Seite der Notfall-Plan.

---

## 4. Ablauf

### Phase 0: Klären (vor allem anderen)
- [ ] Punkte 1 bis 5 aus Abschnitt 2 erledigen.
- [ ] Test-E-Mail von einer fremden Adresse (z. B. Gmail) an info@rondpoint.lu schicken und Antwort zurück. Damit ist bekannt: Heute funktioniert es.

### Phase 1: Cloudflare vorbereiten (ohne jede Auswirkung, etwa 15 Minuten)

> **Erledigt am 18.10.2026.** Die Cloudflare-Nameserver sind **`bella.ns.cloudflare.com`** und **`chad.ns.cloudflare.com`**. Ich habe bei beiden geprüft: Alle 6 Einträge sind identisch mit Wix, die Proxy-Wolke ist grau. Das .lu-Register zeigt noch auf Wix (richtig so, die Nameserver werden erst in Phase 2 geändert).
1. Im **Nave-Cloudflare-Konto** (dort liegt der Worker, und dort muss auch die Domain liegen): „Add a domain“ → `rondpoint.lu` → Plan **Free**.
2. Cloudflare liest die Einträge selbst ein. Prüfen, dass genau diese da sind, und **bei allen die Wolke grau („DNS only“) stellen**:

   | Typ | Name | Inhalt | Proxy |
   |---|---|---|---|
   | A | `@` | 185.230.63.107 | DNS only |
   | A | `@` | 185.230.63.171 | DNS only |
   | A | `@` | 185.230.63.186 | DNS only |
   | CNAME | `www` | cdn3.wixdns.net | DNS only |
   | MX | `@` | ihe.intecsoft.com, Priorität 10 | – |
   | TXT | `@` | `v=spf1 a mx include:ihe.intecsoft.com -all` | – |

   Fehlende Einträge von Hand ergänzen und zusätzliche löschen. Die Wolke muss grau sein, weil Wix keinen Cloudflare-Proxy verträgt.
3. Die **zwei Nameserver** von Cloudflare notieren (Muster: `xxx.ns.cloudflare.com`) und mir schicken. **Noch nirgends eintragen.**
4. **Ich prüfe** direkt bei den Cloudflare-Nameservern, dass jeder Eintrag 1:1 mit Wix übereinstimmt (vor allem MX und SPF).

### Phase 2: Domain zu my.lu, Nameserver auf Cloudflare
Die Website und die E-Mail laufen dabei unverändert weiter. Die alte Wix-Seite bleibt sichtbar.

**Weg A: Transfer zu my.lu.** Das ist Pflicht, wenn die Domain über Wix gekauft wurde, und auch sonst empfohlen.
1. Bei Wix unter Domains → rondpoint.lu nachsehen, was „Transfer away from Wix“ verlangt. Gibt es dort eine Sperre, diese aufheben.
2. Bei **my.lu** ein Konto anlegen (Punkt 5) und den **Transfer** von rondpoint.lu beantragen. Als Nameserver **gleich die zwei Cloudflare-Nameserver** angeben. my.lu prüft, ob sie richtig antworten. Das klappt, weil die Domain in Phase 1 bei Cloudflare angelegt wurde.
3. Die **Bestätigungs-E-Mail** (an den Kontakt aus Punkt 2) bestätigen. Das muss innerhalb von 15 Tagen passieren.
4. Sobald der Transfer durch ist: Cloudflare meldet „rondpoint.lu ist aktiv“. Danach bis zu 12 Stunden warten.
5. **Ich prüfe** über mehrere öffentliche DNS-Server, dass MX und SPF überall von Cloudflare kommen. Danach noch einmal eine Test-E-Mail hin und zurück schicken.

**Weg B: Domain bleibt bei EuroDNS, nur die Nameserver ändern.** Geht nur, wenn sie nicht über Wix gekauft wurde.
- Im EuroDNS-Konto die Nameserver auf die zwei Cloudflare-Nameserver ändern, dann wie bei Weg A ab Schritt 4.
- Den Transfer zu my.lu später in Ruhe machen. Dabei die Nameserver gleich lassen.

Hinweis: Nach dem Transfer weg von Wix kann die alte Wix-Seite kurz ausfallen, falls Wix sie nur für eigene Domains ausliefert. Die E-Mail ist davon nicht betroffen. Notfalls ziehen wir Phase 3 dann vor.

### Phase 3: Umschalten auf die neue Website (Go-Live, etwa 30 Minuten, am besten abends)

**Voraussetzungen, bevor die echte Domain die neue Seite zeigt:**
- [ ] Echte Mietanhänger eingetragen, die Beispiel-Anhänger gelöscht.
- [ ] Echte Fotos hochgeladen, wo heute Stockfotos sind (ohne Präsentationsmodus verschwinden die Stockfotos).
- [ ] Präsentationsmodus aus: `presentation: false` und `showOpenPoints: false`. Erst dann darf Google die Seite aufnehmen; heute steht in robots.txt noch „Disallow“.
- [ ] Optional, aber empfohlen: Mailanbieter für die Formulare (siehe Phase 4). Bis dahin laufen die Formulare über WhatsApp und E-Mail mit vorbereitetem Text.

**Schritte:**
1. In Cloudflare → DNS: die **drei A-Einträge** und den **www-CNAME** von Wix **löschen**. **MX und SPF bleiben.**
2. In Cloudflare → Workers → `rondpoint-website` → „Domains & Routes“ → **Custom Domain** hinzufügen: `www.rondpoint.lu` und `rondpoint.lu`. Cloudflare legt die Einträge und das HTTPS-Zertifikat selbst an, das dauert ein paar Minuten.
3. In Cloudflare → Rules → **Redirect Rule** mit der Vorlage „Redirect from root to WWW“: `rondpoint.lu/*` → `https://www.rondpoint.lu/${1}`, 301, Pfad und Parameter behalten.
4. In SSL/TLS → Edge Certificates **„Always Use HTTPS“** einschalten.
5. **Ich committe gleichzeitig:**
   - Custom Domains fest in `wrangler.jsonc` (`routes` mit `custom_domain: true`), damit ein späteres Deploy sie nicht verliert.
   - `public/_redirects`: `/` → `/lb/` (echte 301 statt Meta-Refresh), `/privacy-policy` → `/lb/dateschutz/`, `/accessibility-statement` → `/lb/`.
   - Präsentationsmodus aus.
   - `workers_dev: false`, damit es keine Doppel-Seite unter workers.dev mehr gibt.
6. **Gemeinsamer Test** (ich gehe die Liste durch):
   - [ ] `https://www.rondpoint.lu/` → /lb/, Zertifikat gültig.
   - [ ] `http://rondpoint.lu/beliebig` → `https://www.rondpoint.lu/beliebig`.
   - [ ] Alle 5 Sprachen, Finder, Autos, Formulare.
   - [ ] Admin-Login unter www.rondpoint.lu. **Alle müssen sich einmal neu anmelden**, denn die Anmeldung gilt pro Adresse.
   - [ ] Speichern im Admin-Bereich: nach 1 bis 3 Minuten online.
   - [ ] robots.txt zeigt „Allow“, Sitemap erreichbar.
   - [ ] **Test-E-Mail** an info@rondpoint.lu hin und zurück.

**Notfall-Plan:** Wenn etwas nicht geht, die Custom Domains im Worker entfernen und die drei A-Einträge plus den www-CNAME von Wix (Tabelle oben) wieder anlegen. Nach ein paar Minuten ist die alte Wix-Seite zurück. MX und SPF wurden nie geändert, die E-Mail läuft also ohnehin weiter.

### Phase 4: Nacharbeiten (in den Tagen danach)
- [ ] **Google Search Console:** Domain-Property `rondpoint.lu` anlegen. Den TXT-Eintrag von Google bei Cloudflare zusätzlich eintragen (die SPF-Zeile nicht ändern). Dann die Sitemap `https://www.rondpoint.lu/sitemap.xml` einreichen.
- [ ] **Google-Unternehmensprofil:** Website-Adresse auf `https://www.rondpoint.lu/` prüfen.
- [ ] **GitHub Pages abschalten:** den Workflow `stock-sync.yml` auf „nur Bestand abgleichen und committen“ kürzen, denn Cloudflare baut bei jedem Commit selbst. Danach im Repository unter Settings → Pages die Seite abschalten.
- [ ] **Formulare per Mail** (Brevo oder Scaleway):
  - Der Anbieter verlangt eigene DNS-Einträge (DKIM, Bestätigung).
  - **SPF nur ergänzen, nicht doppelt anlegen.** Es darf nur eine SPF-Zeile geben, z. B. `v=spf1 a mx include:ihe.intecsoft.com include:spf.brevo.com -all`.
  - Danach im Worker `MAIL_PROVIDER`, `MAIL_API_KEY`, `MAIL_FROM` und `FORM_RECIPIENT=info@rondpoint.lu` setzen.
- [ ] **Wix kündigen:** frühestens eine Woche nach dem Go-Live und erst, wenn der Domain-Transfer abgeschlossen ist. Vorher prüfen, dass bei Wix keine Domain-Verlängerung mehr läuft.
- [ ] Optional mit Intecsoft: DKIM und DMARC für bessere Zustellbarkeit der E-Mails.

---

## 5. Zeitplan

| Wann | Was | Sichtbar für Besucher? |
|---|---|---|
| sofort | Phase 0 und 1 | nein |
| danach | Phase 2 (Transfer: meist 1 bis 3 Tage, Bestätigung bis zu 15 Tage möglich) | nein, alte Seite bleibt |
| wenn der Inhalt bereit ist | Phase 3 (30 Minuten) | ja, die neue Seite ist online |
| die Woche danach | Phase 4 | nein |

Kosten: Cloudflare bleibt kostenlos. Für die Domain fällt die Jahresgebühr bei my.lu an (siehe Preisliste dort), Wix fällt nach der Kündigung weg.
