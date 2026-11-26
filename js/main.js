// CAPSULE Pilates Club — petits comportements de la page
(function () {
  // En-tête fixe : fond flouté dès que la page a défilé
  var topbar = document.querySelector('.topbar');
  if (topbar) {
    var setScrolled = function () { topbar.classList.toggle('is-scrolled', window.scrollY > 24); };
    window.addEventListener('scroll', setScrolled, { passive: true });
    setScrolled();
  }

  // Menu mobile : panneau latéral (ouvert par le burger, fermé par la croix, le fond, Échap ou un lien)
  var burger = document.querySelector('.topbar__burger');
  var mnav = document.getElementById('mobile-nav');
  if (burger && mnav) {
    var closeTimer = null;
    var openNav = function () {
      clearTimeout(closeTimer);
      mnav.hidden = false;
      document.documentElement.classList.add('mnav-open');
      burger.setAttribute('aria-expanded', 'true');
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () { mnav.classList.add('is-open'); });
      });
      mnav.querySelector('.mnav__close').focus();
    };
    var closeNav = function (keepFocus) {
      mnav.classList.remove('is-open');
      document.documentElement.classList.remove('mnav-open');
      burger.setAttribute('aria-expanded', 'false');
      closeTimer = setTimeout(function () { mnav.hidden = true; }, 400);
      if (!keepFocus) burger.focus();
    };
    burger.addEventListener('click', openNav);
    mnav.querySelectorAll('[data-mnav-close]').forEach(function (el) {
      el.addEventListener('click', function () { closeNav(false); });
    });
    mnav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { closeNav(true); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !mnav.hidden) closeNav(false);
    });
  }

  // Offres datées (Black Friday, Noël…) : masquées après data-hide-after
  // et avant data-show-from (AAAA-MM-JJ)
  var today = new Date();
  document.querySelectorAll('[data-hide-after]').forEach(function (el) {
    var limit = new Date(el.getAttribute('data-hide-after') + 'T00:00:00');
    if (!isNaN(limit) && today >= limit) el.setAttribute('data-hidden', '');
  });
  document.querySelectorAll('[data-show-from]').forEach(function (el) {
    var start = new Date(el.getAttribute('data-show-from') + 'T00:00:00');
    if (!isNaN(start) && today < start) el.setAttribute('data-hidden', '');
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
