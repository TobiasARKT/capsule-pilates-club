/* CAPSULE Pilates Club : consentement aux cookies, pixels publicitaires et suivi des conversions.
 *
 * Réglages : renseigner les identifiants ci-dessous. Tant qu'ils sont vides, aucun traceur n'est
 * chargé et aucun bandeau n'est affiché (le site n'a alors besoin d'aucun consentement).
 *
 * Conformité CNIL : rien n'est chargé avant l'accord du visiteur, « Tout refuser » est aussi simple
 * que « Tout accepter », le choix est conservé 6 mois et modifiable via « Gestion des cookies ».
 */
(function () {
  'use strict';

  var CONFIG = {
    // Meta (Instagram / Facebook) : Gestionnaire d'événements → ID du pixel, ex. '123456789012345'
    metaPixelId: '',
    // Google : ID Google Ads (AW-…) et/ou Google Analytics 4 (G-…), ex. ['AW-123456789', 'G-ABCDE12345']
    googleTagIds: [],
    // Facultatif : conversions Google Ads (ID/étiquette), ex. { reservation: 'AW-123456789/AbC-dEfGhIj' }
    googleAdsConversions: { reservation: '', contact: '', formulaire: '' }
  };

  var STORAGE_KEY = 'capsule-consent';
  var MAX_AGE = 182 * 24 * 3600 * 1000; // 6 mois
  var enabled = !!(CONFIG.metaPixelId || CONFIG.googleTagIds.length);
  var loaded = false;

  function readChoice() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || Date.now() - data.at > MAX_AGE) return null;
      return data.value;
    } catch (e) { return null; }
  }
  function saveChoice(value) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ value: value, at: Date.now() })); } catch (e) {}
  }

  /* ---------- Chargement des traceurs (uniquement après accord) ---------- */
  function loadTrackers() {
    if (loaded) return;
    loaded = true;

    if (CONFIG.googleTagIds.length) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('consent', 'default', { ad_storage: 'granted', analytics_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' });
      var g = document.createElement('script');
      g.async = true;
      g.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CONFIG.googleTagIds[0]);
      document.head.appendChild(g);
      window.gtag('js', new Date());
      CONFIG.googleTagIds.forEach(function (id) { window.gtag('config', id); });
    }

    if (CONFIG.metaPixelId) {
      /* Code officiel du Meta Pixel */
      !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
        t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
      }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', CONFIG.metaPixelId);
      window.fbq('track', 'PageView');
    }

    flushPending();
  }

  /* ---------- Événements de conversion ---------- */
  var pending = [];
  var EVENTS = {
    // clic vers bsport : réservation, formule, offre découverte, carte cadeau
    reservation: { meta: 'InitiateCheckout', google: 'begin_checkout' },
    // clic WhatsApp ou téléphone
    contact: { meta: 'Contact', google: 'contact' },
    // formulaire de contact envoyé (page merci.html)
    formulaire: { meta: 'Lead', google: 'generate_lead' }
  };

  function send(kind, label) {
    var ev = EVENTS[kind];
    if (!ev) return;
    if (window.fbq) window.fbq('track', ev.meta, label ? { content_name: label } : {});
    if (window.gtag) {
      window.gtag('event', ev.google, label ? { event_label: label } : {});
      var conv = CONFIG.googleAdsConversions[kind];
      if (conv) window.gtag('event', 'conversion', { send_to: conv });
    }
  }
  function track(kind, label) {
    if (!enabled) return;
    if (loaded) send(kind, label);
    else if (readChoice() !== 'denied') pending.push([kind, label]);
  }
  function flushPending() {
    var list = pending; pending = [];
    list.forEach(function (p) { send(p[0], p[1]); });
  }
  window.capsuleTrack = track;

  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var label = (a.textContent || '').trim().slice(0, 80);
    if (href.indexOf('bsport.io') !== -1) track('reservation', label);
    else if (href.indexOf('wa.me') !== -1 || href.indexOf('tel:') === 0) track('contact', label);
  }, true);

  /* ---------- Bandeau ---------- */
  var banner = null;
  function closeBanner() { if (banner) { banner.remove(); banner = null; } }
  function choose(value) {
    saveChoice(value);
    closeBanner();
    if (value === 'granted') loadTrackers();
    else pending = [];
  }
  function openBanner() {
    if (banner) return;
    banner = document.createElement('div');
    banner.className = 'consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Gestion des cookies');
    banner.innerHTML =
      '<p class="consent__text">Nous utilisons des cookies pour mesurer l’efficacité de nos publicités (Meta, Google). ' +
      'Ils ne sont déposés qu’avec votre accord. <a href="/mentions-legales.html#cookies">En savoir plus</a></p>' +
      '<div class="consent__actions">' +
      '<button type="button" class="consent__btn" data-consent="denied">Tout refuser</button>' +
      '<button type="button" class="consent__btn" data-consent="granted">Tout accepter</button>' +
      '</div>';
    banner.addEventListener('click', function (e) {
      var b = e.target.closest('[data-consent]');
      if (b) choose(b.getAttribute('data-consent'));
    });
    document.body.appendChild(banner);
  }
  window.capsuleConsent = { open: openBanner };

  function init() {
    // Lien « Gestion des cookies » : visible seulement si des traceurs sont configurés
    document.querySelectorAll('[data-consent-open]').forEach(function (el) {
      if (!enabled) { el.hidden = true; return; }
      el.hidden = false;
      el.addEventListener('click', function (e) { e.preventDefault(); openBanner(); });
    });
    if (!enabled) return;
    var choice = readChoice();
    if (choice === 'granted') loadTrackers();
    else if (choice !== 'denied') openBanner();
    // Page de remerciement après le formulaire de contact
    if (document.body.hasAttribute('data-track-lead')) track('formulaire', 'Formulaire de contact');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
