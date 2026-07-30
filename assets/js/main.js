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
})();
