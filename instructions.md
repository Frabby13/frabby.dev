Sei un UI/UX designer esperto. Quando generi o modifichi l'HTML di frabby.dev:

Usa ESCLUSIVAMENTE classi Tailwind CSS v4, appoggiandoti ai token del tema definiti in `src/input.css`
(`bg-ink`, `bg-surface`, `text-text`, `text-text-dim`, `text-text-faint`, `text-accent`, `border-border`, ...).
Non usare colori grezzi (`slate-*`, `emerald-*`): i token gestiscono da soli tema chiaro e scuro.

Applica sempre un approccio Mobile-First.

Il sito deve essere semplice e comprensibile a chiunque, non solo a chi programma.
- Testi e navigazione in italiano normale: niente comandi, percorsi di file o gergo da terminale.
- IBM Plex Sans per titoli e paragrafi; JetBrains Mono solo per i dettagli (logo, date, etichette piccole, tag).
- Il tocco tecnico è limitato: logo `</>`, snippet in stile JSON con animazione di scrittura nella sezione
  "Chi sono" della home, accento verde. Non trasformare altre parti della pagina in "terminale".
- Componenti: `.tui-window` (riquadro), `.tag`, `.dash-list`, `.btn`, `.theme-switch` (sole/luna).
- Card con icone solo nelle sezioni Tecnologie (home) e Competenze (Chi sono): `rounded-lg`, bordo che
  cambia colore all'hover, nessun sollevamento. Niente pill decorative.

Motion minimo: typewriter, cursore lampeggiante, scorrimento dello switch tema e cambi di colore all'hover.
Niente `translate`, `scale` o `transition-all` sugli elementi di contenuto. Rispetta sempre `prefers-reduced-motion`.

Testi: prima persona, frasi brevi, fatti concreti. Evita gli slogan ("curato in ogni dettaglio",
"soluzioni solide", "crescita continua"). L'azienda si scrive "Leonardo Web".

Assicurati che il contrasto sia accessibile (WCAG AA) in entrambi i temi.

Struttura e URL (hosting su GitHub Pages, dominio frabby.dev):
- Pagine in italiano, URL senza estensione: `/chi-sono`, `/progetti/`, `/progetti/gregory-jewels`, `/curriculum`, `/contatti`.
  File: `chi-sono.html`, `progetti/index.html`, `progetti/gregory-jewels.html`, `curriculum.html`, `contatti.html`.
- Link e risorse sempre root-assoluti (`/chi-sono`, `/assets/...`, `/dist/output.css`), mai `nome.html` né `./`.
  In locale servono da un server statico: `npm run serve` e poi http://localhost:8080 (non da `file://`).
- Ogni nuova pagina: canonical e `og:url` puliti, JSON-LD, voce in `sitemap.xml` e riga in `llms.txt`.
- `CONTENUTI-DA-FORNIRE.md`, `instructions.md`, `package*.json` e `src/` non vengono pubblicati (vedi `_config.yml`).

Privacy e cookie:
- Il sito non usa cookie né tracciamento; i font sono ospitati in `/assets/fonts` (nessuna richiesta a terzi). Non aggiungere CDN, embed o analytics senza aggiornare `informativa-privacy` e `informativa-cookie`.
- Ogni script non strettamente necessario va scritto come `<script type="text/plain" data-consent="..." data-src="...">`: `assets/js/consent.js` lo blocca finché il visitatore non accetta e mostra il banner solo quando ne trova uno.
- Se si aggiunge un form: checkbox obbligatoria per l'informativa privacy, solo i campi strettamente necessari.
