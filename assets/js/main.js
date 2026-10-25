// Tullymurry Equestrian Centre — site behaviour (no dependencies)
(function () {
  var body = document.body;
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");

  // Mobile menu: open below the header, wherever it currently sits
  function setNavTop() {
    if (header) {
      var bottom = header.getBoundingClientRect().bottom;
      document.documentElement.style.setProperty("--nav-top", bottom + "px");
    }
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      setNavTop();
      var open = body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".main-nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Header shadow once the page scrolls
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Fade sections in as they scroll into view
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // ---------- Gallery: filters + lightbox ----------
  var filterBtns = document.querySelectorAll(".filter-btn");
  var items = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.getAttribute("data-filter");
      filterBtns.forEach(function (b) { b.classList.toggle("active", b === btn); });
      items.forEach(function (item) {
        var show = f === "all" || item.getAttribute("data-cat") === f;
        item.classList.toggle("hidden", !show);
      });
    });
  });

  var lightbox = document.querySelector(".lightbox");
  if (lightbox && items.length) {
    var lbImg = lightbox.querySelector("img");
    var lbCap = lightbox.querySelector(".lightbox-caption");
    var current = 0;

    // Only photos that actually loaded can be opened
    function viewable() {
      return items.filter(function (item) {
        return !item.classList.contains("hidden") && item.querySelector("img");
      });
    }
    function show(i) {
      var list = viewable();
      if (!list.length) return;
      current = (i + list.length) % list.length;
      var item = list[current];
      var img = item.querySelector("img");
      var cap = item.querySelector("figcaption");
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = cap ? cap.textContent : "";
      lightbox.classList.add("open");
      lightbox.querySelector(".lb-close").focus();
    }
    function close() { lightbox.classList.remove("open"); }

    items.forEach(function (item) {
      item.setAttribute("tabindex", "0");
      function open() {
        if (!item.querySelector("img")) return;
        show(viewable().indexOf(item));
      }
      item.addEventListener("click", open);
      item.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });
    });
    lightbox.querySelector(".lb-close").addEventListener("click", close);
    lightbox.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
    lightbox.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
  }

  // ---------- Contact form ----------
  // Opens the visitor's email app with the enquiry filled in, so no server is
  // needed. Swap for a form service later if preferred (see README).
  var form = document.querySelector("#enquiry-form");
  if (form) {
    var params = new URLSearchParams(window.location.search);
    var preset = params.get("enquiry");
    if (preset && form.enquiry) form.enquiry.value = preset;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var to = form.getAttribute("data-email");
      var subject = "Website enquiry: " + form.enquiry.value;
      var lines = [
        "Name: " + form.name.value,
        "Email: " + form.email.value,
        "Phone: " + form.phone.value,
        "Enquiry about: " + form.enquiry.value,
        "",
        form.message.value
      ];
      window.location.href = "mailto:" + to +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(lines.join("\n"));
    });
  }
})();
