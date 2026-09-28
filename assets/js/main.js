/*
  iamfrabby.it — shared front-end behaviour (prototype only).
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

  /* ---------- Active nav link (based on current pathname) ---------- */
  const currentFile = (location.pathname.split("/").pop() || "index.html") || "index.html";
  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    const target = link.getAttribute("href");
    if (target === currentFile || (currentFile === "" && target === "index.html")) {
      link.setAttribute("data-active", "true");
    }
  });

  /* ---------- Theme toggle (light / dark) ----------
     The choice is kept for the browser session (sessionStorage) and applied
     early by the inline script in <head>; without one, the system preference decides. */
  const root = document.documentElement;
  const systemLight = window.matchMedia("(prefers-color-scheme: light)");
  const currentTheme = () => root.getAttribute("data-theme") || (systemLight.matches ? "light" : "dark");

  function syncThemeIcons() {
    const isLight = currentTheme() === "light";
    // show the icon of the theme you would switch to
    document.querySelectorAll('[data-theme-icon="sun"]').forEach((el) => el.classList.toggle("hidden", isLight));
    document.querySelectorAll('[data-theme-icon="moon"]').forEach((el) => el.classList.toggle("hidden", !isLight));
  }

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = currentTheme() === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { sessionStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
      syncThemeIcons();
    });
  });
  systemLight.addEventListener("change", syncThemeIcons);
  syncThemeIcons();

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
        queue.push({ type: "open", tag: node.tagName.toLowerCase(), className: node.className });
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
        if (op.className) el.className = op.className;
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
