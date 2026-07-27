/* FTC 23405 "Crash Out!" — site interactions. No dependencies. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- current year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- mobile nav ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  function closeNav() {
    if (!links || !links.classList.contains("is-open")) return;
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  /* ---------- sticky nav shadow + scroll progress ---------- */
  var nav = document.getElementById("nav");
  var progress = document.getElementById("navProgress");
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY || document.documentElement.scrollTop;
      if (nav) nav.classList.toggle("is-stuck", y > 8);

      if (progress) {
        var doc = document.documentElement;
        var max = doc.scrollHeight - window.innerHeight;
        progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
      }
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- scroll spy ---------- */
  var navAnchors = Array.prototype.slice.call(
    document.querySelectorAll('.nav__links a[href^="#"]')
  );
  var sections = navAnchors
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navAnchors.forEach(function (a) {
            a.classList.toggle(
              "is-active",
              a.getAttribute("href") === "#" + entry.target.id
            );
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- reveal on scroll ---------- */
  var revealables = document.querySelectorAll(".reveal");

  function revealAll() {
    revealables.forEach(function (el) { el.classList.add("is-in"); });
  }

  // Safety net: if the observer never fires for any reason, show everything anyway.
  // Content being readable always wins over the animation.
  var revealFailsafe = window.setTimeout(revealAll, 3000);

  if (reduceMotion || !("IntersectionObserver" in window)) {
    window.clearTimeout(revealFailsafe);
    revealAll();
  } else {
    var revealObs = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry, i) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          // slight stagger for siblings entering together
          el.style.transitionDelay = Math.min(i * 70, 280) + "ms";
          el.classList.add("is-in");
          obs.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );
    revealables.forEach(function (el) { revealObs.observe(el); });
  }

  /* ---------- animated counters ---------- */
  var counters = document.querySelectorAll("[data-count]");

  function formatCount(value, suffix) {
    var text = value.toLocaleString("en-US");
    if (suffix === "~") return "~" + text;
    return text + (suffix || "");
  }

  function snapCounter(el) {
    el.textContent = formatCount(
      parseFloat(el.getAttribute("data-count")) || 0,
      el.getAttribute("data-suffix") || ""
    );
    el.dataset.done = "1";
  }

  function runCounter(el) {
    if (el.dataset.done) return;
    el.dataset.done = "1";

    var target = parseFloat(el.getAttribute("data-count")) || 0;
    var suffix = el.getAttribute("data-suffix") || "";

    if (reduceMotion) {
      el.textContent = formatCount(target, suffix);
      return;
    }

    var duration = 1400;
    var start = null;

    function frame(ts) {
      if (start === null) start = ts;
      var t = Math.min((ts - start) / duration, 1);
      // easeOutExpo
      var eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      el.textContent = formatCount(Math.round(target * eased), suffix);
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if (!("IntersectionObserver" in window)) {
    counters.forEach(runCounter);
  } else {
    var countObs = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          runCounter(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach(function (el) { countObs.observe(el); });

    // Never leave a real number rendered as "0". If the observer hasn't reached a
    // counter in a few seconds, write the final value without the count-up.
    window.setTimeout(function () {
      counters.forEach(function (el) {
        if (!el.dataset.done) snapCounter(el);
      });
    }, 3000);
  }

  /* ---------- season progression tabs ---------- */
  var tabsRoot = document.getElementById("seasonTabs");

  if (tabsRoot) {
    var tabButtons = Array.prototype.slice.call(
      tabsRoot.querySelectorAll('[role="tab"]')
    );

    function selectTab(btn, focus) {
      tabButtons.forEach(function (b) {
        var selected = b === btn;
        b.setAttribute("aria-selected", String(selected));
        b.tabIndex = selected ? 0 : -1;
        var panel = document.getElementById(b.getAttribute("aria-controls"));
        if (panel) panel.hidden = !selected;
      });
      if (focus) btn.focus();
    }

    tabButtons.forEach(function (btn, i) {
      btn.tabIndex = btn.getAttribute("aria-selected") === "true" ? 0 : -1;

      btn.addEventListener("click", function () { selectTab(btn, false); });

      btn.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowRight") next = tabButtons[(i + 1) % tabButtons.length];
        else if (e.key === "ArrowLeft") next = tabButtons[(i - 1 + tabButtons.length) % tabButtons.length];
        else if (e.key === "Home") next = tabButtons[0];
        else if (e.key === "End") next = tabButtons[tabButtons.length - 1];
        if (next) {
          e.preventDefault();
          selectTab(next, true);
        }
      });
    });
  }

  /* ---------- sponsor logo fallback ---------- */
  /* A missing logo file degrades to the sponsor's name in text instead of a broken image.
     The name comes from the img's alt, so alt text is the single source of truth. */
  function sponsorFallback(img) {
    var name = document.createElement("span");
    name.className = "sponsor__fallback";
    name.textContent = img.getAttribute("alt") || "";
    img.replaceWith(name);
  }

  document.querySelectorAll(".sponsor img").forEach(function (img) {
    img.addEventListener("error", function () { sponsorFallback(img); });
    // Catch images that already failed before this script ran.
    if (img.complete && img.naturalWidth === 0) sponsorFallback(img);
  });

  /* ---------- accordion: one open at a time ---------- */
  var accordion = document.getElementById("subsystems");

  if (accordion) {
    var panels = Array.prototype.slice.call(accordion.querySelectorAll("details"));
    panels.forEach(function (panel) {
      panel.addEventListener("toggle", function () {
        if (!panel.open) return;
        panels.forEach(function (other) {
          if (other !== panel) other.open = false;
        });
      });
    });
  }
})();
