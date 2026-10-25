// Events and gallery are loaded from data/events.json and data/gallery.json,
// which are edited through Pages CMS (see README).
(function () {
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function load(url) {
    return fetch(url, { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw r; return r.json(); });
  }
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // ---------- Events
  var list = document.getElementById('event-list');
  if (list) {
    load(list.getAttribute('data-src')).then(function (items) {
      var today = new Date(); today.setHours(0, 0, 0, 0);
      var dated = [], undated = [];
      (items || []).forEach(function (e) {
        if (!e || !e.title) return;
        var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(e.date || '');
        if (m) {
          var d = new Date(+m[1], +m[2] - 1, +m[3]);
          if (d >= today) { e._d = d; dated.push(e); }
        } else {
          undated.push(e);
        }
      });
      dated.sort(function (a, b) { return a._d - b._d; });
      var notice = '<div class="event-notice"><strong>Dates coming soon</strong><p>We’re preparing the next programme. Follow our Facebook group or contact us for updates.</p></div>';
      var confirmed = dated.map(function (e) {
        var btn = e.link ? '<a class="btn dark-ghost" href="' + esc(e.link) + '" target="_blank" rel="noopener">' + esc(e.link_label || 'More info') + '</a>' : '<a class="btn dark-ghost" href="tel:+442844811880">Enquire</a>';
        return '<article class="event"><div class="when"><b>' + e._d.getDate() + '</b><small>' + MONTHS[e._d.getMonth()] + ' ' + e._d.getFullYear() + '</small></div><div><span class="event-day">' + DAYS[e._d.getDay()] + '</span><h3>' + esc(e.title) + '</h3>' + (e.description ? '<p>' + esc(e.description) + '</p>' : '') + '</div>' + btn + '</article>';
      }).join('');
      var regular = undated.length ? '<div class="regular-events"><h3>Events at Tullymurry</h3><p class="note">An introduction to our programme; dates and entries are announced separately.</p><div class="cards">' + undated.map(function (e) {
        return '<article class="card"><span class="meta">' + esc(e.when || 'Programme') + '</span><h4>' + esc(e.title) + '</h4>' + (e.description ? '<p>' + esc(e.description) + '</p>' : '') + '</article>';
      }).join('') + '</div></div>' : '';
      list.innerHTML = (confirmed || notice) + regular;
    }).catch(function () {
      list.innerHTML = '<p class="note center">Event dates are posted on our Facebook page, or call us on 028 4481 1880.</p>';
    });
  }

  // ---------- Gallery
  var gal = document.getElementById('gallery');
  if (gal) {
    var empty = document.getElementById('gallery-empty');
    var filters = document.querySelector('.gallery-filters');
    load(gal.getAttribute('data-src')).then(function (items) {
      items = (items || []).filter(function (g) { return g && g.image; });
      if (!items.length) {
        if (empty) empty.hidden = false;
        if (filters) filters.hidden = true;
        return;
      }
      gal.innerHTML = items.map(function (g) {
        var src = String(g.image).replace(/^\//, '');
        return '<figure data-cat="' + esc(g.category || '') + '"><img src="' + esc(src) + '" alt="' +
          esc(g.caption || 'Tullymurry Equestrian Centre') + '" loading="lazy">' +
          (g.caption ? '<figcaption>' + esc(g.caption) + '</figcaption>' : '') + '</figure>';
      }).join('');
      setupGallery();
    }).catch(function () { if (empty) empty.hidden = false; if (filters) filters.hidden = true; });
  }

  function setupGallery() {
    var figs = [].slice.call(gal.querySelectorAll('figure'));
    document.querySelectorAll('.gallery-filters button').forEach(function (b) {
      b.addEventListener('click', function () {
        document.querySelectorAll('.gallery-filters button').forEach(function (x) { x.classList.remove('active'); });
        b.classList.add('active');
        var c = b.getAttribute('data-filter');
        figs.forEach(function (f) { f.style.display = (c === 'all' || f.getAttribute('data-cat') === c) ? '' : 'none'; });
      });
    });
    var lb = document.getElementById('lightbox');
    if (!lb) return;
    var lbImg = lb.querySelector('img'), cur = 0;
    function shown() { return figs.filter(function (f) { return f.style.display !== 'none'; }); }
    function open(i) {
      var s = shown(); if (!s.length) return;
      cur = (i + s.length) % s.length;
      var im = s[cur].querySelector('img');
      lbImg.src = im.src; lbImg.alt = im.alt;
      lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
    }
    function close() { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); }
    figs.forEach(function (f) { f.addEventListener('click', function () { open(shown().indexOf(f)); }); });
    lb.querySelector('.close').onclick = close;
    lb.querySelector('.prev').onclick = function (e) { e.stopPropagation(); open(cur - 1); };
    lb.querySelector('.next').onclick = function (e) { e.stopPropagation(); open(cur + 1); };
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') open(cur - 1);
      if (e.key === 'ArrowRight') open(cur + 1);
    });
  }
})();
