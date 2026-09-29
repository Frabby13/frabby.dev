/* Consenso a cookie e strumenti opzionali (GDPR / art. 122 Codice privacy).

   Oggi il sito usa solo strumenti tecnici (vedi /informativa-cookie), quindi non mostra nessun banner.
   Il sistema è pronto per quando servirà: ogni script NON strettamente necessario (statistiche, mappe,
   video incorporati...) va scritto così, e resta bloccato finché il visitatore non preme "Accetta":

     <script type="text/plain" data-consent="statistiche" data-src="https://esempio.it/script.js"></script>
     <script type="text/plain" data-consent="statistiche">…codice inline…</script>

   - Il banner compare solo se nella pagina c'è almeno uno script opzionale e non c'è ancora una scelta.
   - "Rifiuta" e "Accetta" hanno lo stesso peso visivo. Chi rifiuta non subisce nessun limite.
   - La scelta è salvata nel browser (localStorage, chiave "consent") e si può cambiare dal link
     "Preferenze cookie" nel footer, che compare solo quando ci sono script opzionali. */
(() => {
  const KEY = "consent";
  const VERSION = 1;

  const optionalScripts = () => Array.from(document.querySelectorAll('script[type="text/plain"][data-consent]'));

  const readChoice = () => {
    try {
      const v = JSON.parse(localStorage.getItem(KEY) || "null");
      return v && v.v === VERSION && typeof v.accepted === "boolean" ? v : null;
    } catch (e) {
      return null;
    }
  };
  const saveChoice = (accepted) => {
    try { localStorage.setItem(KEY, JSON.stringify({ v: VERSION, accepted, ts: Date.now() })); } catch (e) { /* storage non disponibile */ }
  };

  // Attiva gli script opzionali: crea un vero <script> equivalente accanto a quello bloccato.
  const activate = () => {
    optionalScripts().forEach((blocked) => {
      if (blocked.dataset.active) return;
      const live = document.createElement("script");
      Array.from(blocked.attributes).forEach((a) => {
        if (!["type", "data-src", "data-consent", "data-active"].includes(a.name)) live.setAttribute(a.name, a.value);
      });
      if (blocked.dataset.src) live.src = blocked.dataset.src;
      else live.text = blocked.textContent;
      blocked.dataset.active = "1";
      blocked.after(live);
    });
  };

  const closeBanner = () => {
    const el = document.getElementById("consent-banner");
    if (el) el.remove();
  };

  const decide = (accepted) => {
    const previous = readChoice();
    saveChoice(accepted);
    closeBanner();
    if (accepted) activate();
    // Se aveva già accettato e ora rifiuta, gli script partiti non si possono fermare: ricarico la pagina.
    else if (previous && previous.accepted) location.reload();
  };

  const showBanner = () => {
    if (document.getElementById("consent-banner")) return;
    const banner = document.createElement("div");
    banner.id = "consent-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-labelledby", "consent-title");
    banner.setAttribute("aria-describedby", "consent-text");
    banner.className = "fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-surface px-6 py-5 lg:px-8";
    banner.innerHTML =
      '<div class="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">' +
        '<div class="max-w-3xl text-sm text-text-dim">' +
          '<p id="consent-title" class="font-semibold text-text">Strumenti opzionali</p>' +
          '<p id="consent-text" class="mt-1">Questa pagina può caricare strumenti non necessari al funzionamento (per esempio statistiche) ' +
          'solo se dai il consenso. Puoi rifiutare senza perdere nulla e cambiare idea quando vuoi. ' +
          '<a href="/informativa-cookie" class="text-text underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">Leggi l\'informativa sui cookie</a>.</p>' +
        '</div>' +
        '<div class="flex shrink-0 gap-3">' +
          '<button type="button" data-consent-reject class="btn">Rifiuta</button>' +
          '<button type="button" data-consent-accept class="btn">Accetta</button>' +
        '</div>' +
      '</div>';
    banner.querySelector("[data-consent-reject]").addEventListener("click", () => decide(false));
    banner.querySelector("[data-consent-accept]").addEventListener("click", () => decide(true));
    document.body.appendChild(banner);
  };

  const init = () => {
    if (optionalScripts().length === 0) return; // niente di opzionale: nessun banner, nessun link nel footer

    document.querySelectorAll("[data-consent-open]").forEach((btn) => {
      btn.hidden = false;
      btn.addEventListener("click", showBanner);
    });

    const choice = readChoice();
    if (!choice) showBanner();
    else if (choice.accepted) activate();
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
