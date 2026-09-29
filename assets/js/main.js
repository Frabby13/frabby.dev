/*
  frabby.dev — shared front-end behaviour (prototype only).
  In futuro .NET porting: questa logica resta invariata (asset statico
  servito da wwwroot/js/main.js), nessuna dipendenza da build tool.
*/
(() => {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector("[data-nav-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("flex");
      mobileNav.classList.toggle("hidden");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  /* ---------- Clean URLs + active nav link ----------
     GitHub Pages serves /pagina.html anche come /pagina, ma non reindirizza: se qualcuno apre
     la versione con l'estensione, mostriamo comunque l'indirizzo pulito (il canonical fa il resto). */
  const cleanPath = (p) => p.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
  if (location.protocol.startsWith("http") && cleanPath(location.pathname) !== location.pathname) {
    try { history.replaceState(null, "", cleanPath(location.pathname) + location.search + location.hash); } catch (e) {}
  }

  // La voce attiva si decide dal primo segmento: /progetti/gregory-jewels evidenzia "Progetti".
  const firstSegment = (p) => cleanPath(p).split("/").filter(Boolean)[0] || "";
  const currentSection = firstSegment(location.pathname);
  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    if (firstSegment(link.getAttribute("href") || "") === currentSection) {
      link.setAttribute("data-active", "true");
    }
  });

  /* ---------- Theme toggle (light / dark) ----------
     The choice is kept for the browser session (sessionStorage) and applied
     early by the inline script in <head>; without one, the system preference decides. */
  const root = document.documentElement;
  const systemLight = window.matchMedia("(prefers-color-scheme: light)");
  const currentTheme = () => root.getAttribute("data-theme") || (systemLight.matches ? "light" : "dark");

  // switch: sun (left) = light, moon (right) = dark; aria-checked="true" means dark
  function syncThemeSwitch() {
    const isDark = currentTheme() === "dark";
    document.querySelectorAll("[data-theme-toggle]").forEach((el) => el.setAttribute("aria-checked", String(isDark)));
  }

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = currentTheme() === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { sessionStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
      syncThemeSwitch();
    });
  });
  systemLight.addEventListener("change", syncThemeSwitch);
  syncThemeSwitch();
  // enable the thumb slide only after the initial state is set (no animation on page load)
  requestAnimationFrame(() => {
    document.querySelectorAll("[data-theme-toggle]").forEach((el) => el.setAttribute("data-animate", ""));
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("reveal-visible"));
  }

  /* ---------- Code typewriter (scroll-triggered "writing code" effect) ----------
     Elements marked [data-typewriter] have their markup typed in character by
     character, preserving nested tags/classes (e.g. syntax-highlight spans),
     the first time they scroll into view. A blinking caret trails the text. */
  function typeMarkup(sourceRoot, liveRoot, speedMs, onDone) {
    const queue = [];
    (function walk(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        for (const char of node.textContent) queue.push({ type: "char", char });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        queue.push({ type: "open", tag: node.tagName.toLowerCase(), attrs: Array.from(node.attributes) });
        node.childNodes.forEach(walk);
        queue.push({ type: "close" });
      }
    })(sourceRoot);

    const cursor = document.createElement("span");
    cursor.className = "typewriter-cursor";
    liveRoot.appendChild(cursor);

    const stack = [liveRoot];
    let i = 0;

    function step() {
      if (i >= queue.length) {
        if (typeof onDone === "function") onDone(cursor);
        return;
      }
      const op = queue[i++];
      const parent = stack[stack.length - 1];

      if (op.type === "open") {
        const el = document.createElement(op.tag);
        op.attrs.forEach((attr) => el.setAttribute(attr.name, attr.value)); // keeps class, href, …
        parent.appendChild(el);
        stack.push(el);
        step();
        return;
      }
      if (op.type === "close") {
        stack.pop();
        step();
        return;
      }
      parent.appendChild(document.createTextNode(op.char));
      liveRoot.appendChild(cursor); // keep the caret trailing the last typed char
      setTimeout(step, speedMs);
    }
    step();
  }

  const typewriterEls = document.querySelectorAll("[data-typewriter]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typewriterEls.length) {
    typewriterEls.forEach((el) => {
      const source = el.cloneNode(true);
      const speed = Number(el.dataset.typewriterSpeed) || 20;

      const start = () => {
        if (el.dataset.typed === "true") return;
        el.dataset.typed = "true";
        if (prefersReducedMotion) return; // leave the static markup as-is
        el.style.minHeight = el.offsetHeight + "px"; // reserve the final height: no layout jump while typing
        el.innerHTML = "";
        typeMarkup(source, el, speed);
      };

      if (!prefersReducedMotion && "IntersectionObserver" in window) {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                start();
                io.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.4 }
        );
        io.observe(el);
      } else {
        start();
      }
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-current-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
