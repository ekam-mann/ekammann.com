(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Assemble obfuscated mailto links at runtime.
  // Visible text (e.g. "ekammann [at] student.ubc.ca") stays in the HTML
  // as-is; only the href is built here, so the "@" never appears in
  // the page source for scrapers to harvest.
  document.querySelectorAll("[data-mail-user]").forEach(function (el) {
    var user = el.getAttribute("data-mail-user");
    var domain = el.getAttribute("data-mail-domain");
    if (user && domain) {
      el.setAttribute("href", "mailto:" + user + "@" + domain);
    }
  });

  // Tools marquee: each track starts as a single authored set of pills.
  // Short categories (e.g. 4 items) can be narrower than the visible
  // track, which would show a blank gap once the loop scrolled past
  // them. Pad each track with cloned copies until it's comfortably
  // wider than its container, then duplicate that whole padded set
  // once more so the 50%-translate loop has no seam, whatever the
  // item count. Only then is the CSS animation enabled.
  function initToolMarquees() {
    var reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    document.querySelectorAll(".tool-marquee-track").forEach(function (track) {
      var marquee = track.parentElement;
      var originals = Array.prototype.slice.call(track.children);
      if (!originals.length) return;

      // Force single-line layout for measurement. In the default/fallback
      // state the track wraps (flex-wrap: wrap), so scrollWidth would just
      // report the container's own width instead of true content width,
      // no matter how much content is appended.
      track.style.flexWrap = "nowrap";
      track.style.width = "max-content";

      var targetWidth = marquee.clientWidth;
      var unitWidth = track.scrollWidth;
      var safety = 0;
      while (unitWidth < targetWidth * 1.25 && safety < 12) {
        originals.forEach(function (el) {
          var clone = el.cloneNode(true);
          clone.setAttribute("aria-hidden", "true");
          track.appendChild(clone);
        });
        unitWidth = track.scrollWidth;
        safety++;
      }

      // Duplicate the whole padded set once more for the seamless loop.
      var unitChildren = Array.prototype.slice.call(track.children);
      unitChildren.forEach(function (el) {
        var clone = el.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
      });

      // The class now owns nowrap/max-content; drop the measurement
      // overrides so there's a single source of truth for that styling.
      track.style.flexWrap = "";
      track.style.width = "";

      var pxPerSecond = 40;
      track.style.animationDuration = unitWidth / pxPerSecond + "s";
      marquee.classList.add("is-marquee-ready");
    });
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(initToolMarquees);
  } else {
    initToolMarquees();
  }

  // Reveal-on-scroll: fade/slide content in as it enters the viewport.
  // Skipped entirely for reduced-motion or no IntersectionObserver support,
  // so the .reveal class (and its opacity: 0 default) never gets applied
  // and content just shows normally.
  function initScrollReveal() {
    var reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion || !("IntersectionObserver" in window)) return;

    var targets = document.querySelectorAll(
      ".threads-intro, .thread, .tool-group, .experience-item"
    );
    if (!targets.length) return;

    targets.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 3) * 80 + "ms";
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px 40px 0px" }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  initScrollReveal();
})();
