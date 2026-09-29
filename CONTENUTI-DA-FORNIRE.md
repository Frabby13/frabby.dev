# Contenuti da fornire — frabby.dev

Checklist dei dati/testi ancora mancanti nel prototipo. Aggiornata dopo il giro di
conferme del 2026-09-04: le voci risolte sono spuntate, restano solo quelle
ancora aperte.

Legenda priorità: 🔴 blocca la pubblicazione · 🟡 consigliato · ⚪ opzionale

---

## Risolte in questo giro

- ✅ Email di contatto: `francesco@frabby.dev` (contatti diretti + footer di tutte le pagine)
- ✅ Telefono: rimosso, non pubblicato per ora
- ✅ GitHub: non esiste ancora — badge "Presto" in `contatti.html`, rimosso dai footer
- ✅ LinkedIn: `https://www.linkedin.com/in/francesco-alberto-352678270` (footer + contatti)
- ✅ Dev Blog: rimosso
- ✅ Meta description di tutte le pagine + tag Open Graph (anteprima `assets/img/og-cover.png`, 1200×630)
- ✅ Claim footer: non menziona più "API"
- ✅ Foto/avatar: placeholder con iniziali "FA" nell'header di `chi-sono.html`
- ✅ Home: headline hero, sottotitolo, teaser "Chi sono" — testi definitivi scritti
- ✅ Home: rimosso il badge tech TypeScript e l'intera sezione "Prodotto SaaS & API in arrivo"
- ✅ Chi Sono: timeline allineata alle 4 tappe reali (Tech11 GmbH → tirocinio Leonardo Web → apprendistato → impiegato qualificato)
- ✅ Chi Sono: specializzazione "Informatica e Telecomunicazioni" nella sezione Formazione
- ✅ Chi Sono: Core Skills ricategorizzate sullo stack reale (no TypeScript/Docker/EF Core non confermati)
- ✅ CV: date Tech11 GmbH corrette — Ago 2021 (1 mese) + Lug–Ago 2022 (2 mesi), non più "Giu–Ago 2023"
- ✅ CV: diploma "Informatica e Telecomunicazioni", anni 2018–2023 confermati
- ✅ CV: data di aggiornamento → Settembre 2026
- ✅ Contatti: stato disponibilità aggiornato ("Impiegato full-time come Full Stack Developer in Leonardo Web")
- ✅ Contatti: **form di contatto rimosso del tutto** (nessuna raccolta dati) — sostituito da una card con email/LinkedIn/località; di conseguenza non serve più una privacy policy dedicata

## Nuova sezione aggiunta: Progetti (`progetti/index.html`)

Pagina di portfolio aggiunta al menu (tra "Chi Sono" e "Curriculum"), con 3 card:
- una card reale ("frabby.dev — Portfolio personale", questo stesso sito)
- due card segnaposto ("Progetto professionale" / "Progetto personale") con testo che spiega che sono in arrivo (rimossi: per ora non ci sono lavori professionali in pagina)

## Immagini: spazi già pronti (segnaposto SVG in `assets/img/`)

Ogni spazio ha un `<img>` con un commento `IMG #n` nell'HTML. Per sostituire: salva l'immagine in **WebP**
(< 150 KB) con lo stesso nome base e cambia l'estensione `.svg` → `.webp` nello `src`.

| # | Dove | File | Dim. | Tipo | Stato |
|---|---|---|---|---|---|
| 1 | `chi-sono.html` monogramma "FA" in alto | `me/foto-profilo.webp` | 800×800 | **VERA** (mezzo busto, sfondo neutro) | ✅ |
| 3 | `progetti/index.html` (Gregory Jewels) + `progetti/gregory-jewels.html` Fase 1 | `projects/gregory-jewels.webp` | 1440×900 | **VERA** (screenshot desktop 1440px della pagina online) | ✅ |
| 4 | `progetti/index.html` (frabby.dev) | `projects/iamfrabby.webp` | 1440×900 | **VERA** (screenshot home, tema scuro) | ✅ |
| 7 | `chi-sono.html` banner tra Studi e Competenze | `deco/postazione.webp` | 1600×600 | **AI** | ✅ |
| 10 | Anteprima social (`og:image` in tutte le pagine) | `og-cover.png` | 1200×630 | prompt da terminale + nome (i social non leggono gli SVG) | ✅ |

Non previsti su questo branch: sfondo nell'hero (scelta voluta: il prompt da terminale animato è già
l'elemento visivo, un'immagine gli farebbe concorrenza), banner Fossano in `contatti` (Fossano non è più la base),
sezione "Progetti in evidenza" in home (la lista progetti è già breve), foto al lavoro in home (rimossa su richiesta).
Semmai, in hero ha senso solo la foto profilo vera (#1), quando esiste.


**Stock** (alternativa per #7; Unsplash/Pexels, licenza libera): "developer desk minimal / workspace dark" (niente
codice leggibile in primo piano).

### Prompt AI

Palette del sito: fondo scuro `#0e1013`, accento verde `#4ade80`.

**#7 · `deco/postazione` · 1600×600 (8:3) · banner in `chi-sono.html` tra Studi e Competenze**
```
Wide cinematic photograph of a minimal developer desk at dusk: a single monitor turned slightly away with a blurred, unreadable interface, a mechanical keyboard, a notebook and a coffee mug on a dark wooden desk. Low-key lighting, charcoal and warm grey tones with a faint emerald green light reflected on the desk. Shallow depth of field, calm and tidy, lots of negative space on the left. No people, no readable text on screen, no brand logos. Ultra-wide 8:3 aspect ratio.
```
Da escludere: `readable code, text on screen, apple logo, brand logos, people, hands, cluttered desk, RGB lights, neon, fisheye`

**Parametri per strumento**
- **ChatGPT, Gemini, Copilot**: incolla il prompt e aggiungi in fondo "Avoid: …" con la lista da escludere. Chiedi il formato
  più largo disponibile: poi lo ritaglio io a 1600×600.
- **Midjourney**: aggiungi `--ar 8:3 --style raw --no text,logo,people,neon`.
- **Stable Diffusion, Leonardo, Ideogram**: metti la lista nel campo "negative"; dimensioni 1536×576.

Regola: volto e progetti sempre **veri**; stock/AI solo per immagini d'atmosfera.

## Ancora aperte

- ⬜ **Titolo di impatto + paragrafo introduttivo** in `chi-sono.html` (hero) — quello attuale è già discreto, dimmi se va rifatto o va bene così
- ⬜ **Competenze chiave acquisite a scuola** (badge sotto Formazione in `chi-sono.html`: attualmente Programmazione/Basi di Dati/Reti/Sistemi & Reti/Project Work — generici, confermi o correggi?)
- ⬜ **Progetto professionale** in `progetti/index.html` — da aggiungere quando c'è un lavoro presentabile (screenshot, stack, link; dichiarare esplicitamente il ruolo e che è un lavoro in Leonardo Web)
- ⬜ **Pulsante di download del CV** — rimosso da `curriculum.html` per ora; da rimettere quando il PDF è pronto
- ⬜ **Foto reale** al posto dell'avatar placeholder "FA" quando sarà pronta
- ⬜ **Certificazioni/corsi aggiuntivi** — nessuno al momento; richiesta di consigli su corsi online da seguire (risposta fornita in chat, non ancora aggiunta al sito)
- ⬜ **Favicon definitivo**, hosting/DNS di frabby.dev, eventuale analytics privacy-friendly — opzionali, quando pronto
- ⬜ **Progetto personale** in `progetti/index.html` — idem, quando avrai un side project da mostrare
- ⬜ **Gregory Jewels** in `progetti/gregory-jewels.html` — descrizione fase 3 (e-commerce: stack, funzionalità, tempi) dopo lo studio, screenshot delle fasi 1–2 e link/date di rilascio

## Conformità (GDPR) e accessibilità — 29 settembre 2026

- ✅ Informativa privacy, informativa cookie, termini e condizioni: `/informativa-privacy`, `/informativa-cookie`, `/termini-e-condizioni` (link nel footer di ogni pagina)
- ✅ Titolare indicato come persona fisica (Francesco Alberto, `francesco@frabby.dev`): nessuna P.IVA, PEC o indirizzo
- ✅ Font ospitati sul sito (`assets/fonts`): nessun dato inviato a Google
- ✅ Consenso ai cookie: `assets/js/consent.js`, banner mostrato solo se la pagina contiene script opzionali (oggi nessuno)
- ✅ Form: il sito non ne ha, quindi niente checkbox né minimizzazione dei dati da gestire
- ✅ Accessibilità: `alt` su tutte le immagini (descrittivi, vuoti per le decorative); contrasto AA su testo in entrambi i temi; bordi dei controlli (selettore tema, pulsante menu) portati a ≥ 3:1
- ⬜ **Attivare la casella `francesco@frabby.dev`** (inoltro o mailbox sul dominio) prima di pubblicare: è l'unico contatto del sito
- ⬜ Rileggere le tre pagine legali e, se il sito cresce (form, analytics, newsletter), aggiornarle
- ⬜ Se hai un indirizzo di residenza da indicare o vuoi indicare altro nel footer, dimmelo
