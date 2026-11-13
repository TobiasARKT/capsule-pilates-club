// CAPSULE Pilates Club — petits comportements de la page
(function () {
  // Menu mobile
  var burger = document.querySelector('.topbar__burger');
  var nav = document.getElementById('main-nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Offres datées (Black Friday…) : masquées après data-hide-after (AAAA-MM-JJ)
  var today = new Date();
  document.querySelectorAll('[data-hide-after]').forEach(function (el) {
    var limit = new Date(el.getAttribute('data-hide-after') + 'T00:00:00');
    if (!isNaN(limit) && today >= limit) el.setAttribute('data-hidden', '');
  });

  // Carrousel « L'univers CAPSULE »
  var track = document.querySelector('.carousel');
  document.querySelectorAll('[data-carousel]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!track) return;
      var card = track.querySelector('.space');
      var step = card ? card.getBoundingClientRect().width + 20 : 400;
      track.scrollBy({ left: btn.dataset.carousel === 'next' ? step : -step, behavior: 'smooth' });
    });
  });

  // « Pourquoi CAPSULE » : la ligne se remplit au fil du défilement,
  // les arguments atteints par la ligne restent allumés, la photo suit le dernier
  var whyList = document.querySelector('.why__list');
  var whyItems = document.querySelectorAll('.why__item');
  var whyImgs = document.querySelectorAll('.why__media img');
  var whyFill = document.querySelector('.why__line i');
  var whyNum = document.querySelector('[data-why-num]');
  var whyBar = document.querySelector('.why__bar i');
  if (whyList && whyFill && whyNum && whyBar) {
    var whyCurrent = -1;
    var whyTicking = false;
    var updateWhy = function () {
      whyTicking = false;
      var box = whyList.getBoundingClientRect();
      // Repère : le milieu de l'écran
      var reached = window.innerHeight / 2 - box.top;
      var progress = Math.min(1, Math.max(0, reached / box.height));
      whyFill.style.height = (progress * 100) + '%';
      whyBar.style.width = (progress * 100) + '%';
      var active = 0;
      whyItems.forEach(function (el, k) { if (el.offsetTop <= reached) active = k; });
      if (active === whyCurrent) return;
      whyCurrent = active;
      whyItems.forEach(function (el, k) { el.classList.toggle('is-active', k <= active); });
      whyImgs.forEach(function (el, k) { el.classList.toggle('is-active', k === active); });
      whyNum.textContent = '0' + (active + 1);
    };
    var requestWhy = function () {
      if (!whyTicking) { whyTicking = true; window.requestAnimationFrame(updateWhy); }
    };
    window.addEventListener('scroll', requestWhy, { passive: true });
    window.addEventListener('resize', requestWhy);
    updateWhy();
  }

  // Onglets (tarifs)
  document.querySelectorAll('[data-tabs]').forEach(function (block) {
    var tabButtons = block.querySelectorAll('[role="tab"]');
    var tabPanels = block.querySelectorAll('[role="tabpanel"]');
    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        tabButtons.forEach(function (b) { b.setAttribute('aria-selected', String(b === btn)); });
        tabPanels.forEach(function (p, i) { p.hidden = i !== +btn.dataset.tab; });
      });
    });
  });

  // FAQ : une seule carte ouverte à la fois (relais de l'attribut name des navigateurs récents)
  var faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faqItems.forEach(function (other) { if (other !== item) other.open = false; });
    });
  });

  // Planning bsport : le script n'est chargé qu'à l'approche de la section
  var bsportEl = document.getElementById('bsport-widget-151525');
  if (bsportEl) {
    var bsportConfig = {
      parentElement: 'bsport-widget-151525',
      companyId: 4121,
      franchiseId: null,
      dialogMode: 1,
      widgetType: 'calendar',
      showFab: false,
      fullScreenPopup: false,
      styles: undefined,
      // Seuil très haut : bsport reste en vue « un jour à la fois » sur tous les écrans
      config: { calendar: { cardModeDisplayMinWidth: 100000 } }
    };
    // « lun. 09/11 - dim. 15/11 » devient « 9 – 15 novembre » / « 9 au 15 novembre » (data-week, data-week-long)
    var months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    var weekLabel = function (text, long) {
      var m = text.match(/(\d{1,2})\/(\d{1,2}).*?(\d{1,2})\/(\d{1,2})/);
      if (!m) return text;
      var d1 = +m[1], m1 = +m[2] - 1, d2 = +m[3], m2 = +m[4] - 1;
      if (m1 === m2) return d1 + (long ? ' au ' : ' – ') + d2 + ' ' + months[m1];
      return long ? d1 + ' ' + months[m1] + ' au ' + d2 + ' ' + months[m2]
        : d1 + ' ' + months[m1].slice(0, 4) + '. – ' + d2 + ' ' + months[m2].slice(0, 4) + '.';
    };
    new MutationObserver(function () {
      var el = bsportEl.querySelector('.bs-marketplace-date-picker__placeholder');
      if (el && el.dataset.src !== el.textContent) {
        el.dataset.src = el.textContent;
        el.dataset.week = weekLabel(el.textContent, false);
        el.dataset.weekLong = weekLabel(el.textContent, true);
      }
      // Couleur de l'activité réglée dans bsport (posée en bordure gauche) : copiée dans --c pour la pastille
      bsportEl.querySelectorAll('.bs-offer-list-item').forEach(function (item) {
        var c = item.style.borderLeftColor;
        if (c && item.style.getPropertyValue('--c') !== c) item.style.setProperty('--c', c);
      });
    }).observe(bsportEl, { subtree: true, childList: true, characterData: true });

    var mountBsport = function (attempt) {
      if (!window.BsportWidget) {
        if (attempt < 50) setTimeout(function () { mountBsport(attempt + 1); }, 100 * attempt);
        return;
      }
      if (!bsportEl.hasChildNodes()) window.BsportWidget.mount(bsportConfig);
    };
    var loadBsport = function () {
      var script = document.createElement('script');
      script.src = 'https://cdn.bsport.io/scripts/widget.js';
      script.async = true;
      script.onload = function () { mountBsport(1); };
      document.head.appendChild(script);
    };
    if ('IntersectionObserver' in window) {
      var bsportObserver = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        bsportObserver.disconnect();
        loadBsport();
      }, { rootMargin: '800px 0px' });
      bsportObserver.observe(bsportEl);
    } else {
      loadBsport();
    }
  }

  // Vidéo : relance la lecture muette si le navigateur l'a bloquée
  var video = document.querySelector('.strength__video');
  if (video) {
    video.muted = true;
    var playing = video.play();
    if (playing && playing.catch) playing.catch(function () {});
  }

  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(today.getFullYear());
})();
