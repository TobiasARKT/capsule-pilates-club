# CAPSULE Pilates Club — site vitrine

Site statique (HTML/CSS/JS, sans build), reconstruit à partir de la maquette de la cliente
pour remplacer le site Framer (capsulepilatesclub.com, domaine chez OVH).

## Aperçu local

    python3 -m http.server 5200
    → http://localhost:5200/

## Structure

- `index.html` — la page d'accueil (one-page, comme le site Framer)
- `css/style.css` — tous les styles (couleurs en variables dans `:root`)
- `js/main.js` — menu mobile, masquage auto du Black Friday, carrousel, vidéo
- `assets/img`, `assets/video` — médias redimensionnés pour le web
- `merci.html` — page après envoi d'un formulaire (Netlify Forms)
- `mentions-legales.html`, `robots.txt`, `sitemap.xml`, `_redirects`, `netlify.toml`

## À faire avant la bascule

- [x] Liens bsport : chaque carte pointe vers sa formule du catalogue bsport (relevé du 13/11/2026 via l'API publique
      `buyable` de bsport, company 4121). Boutique complète : https://backoffice.bsport.io/m/CAPSULE%20PILATES%20CLUB/4121/subscription/
      (abonnements) et …/4121/pass/ (cartes)
- [ ] Lien bsport de l'offre Black Friday (aujourd'hui → Instagram)
- [x] Dossier `dev/` (pages de maquettes) exclu du dépôt via `.gitignore` : il reste en local, jamais publié
- [x] Photo de la fondatrice (assets/img/fondatrice-emmanuelle-berges.jpg)
- [x] Logos des partenaires (assets/img/partenaires/, repris du site Framer)
- [ ] Texte des mentions légales
- [ ] Outil newsletter (Brevo/Mailchimp) ou garder Netlify Forms
- [ ] Netlify : activer la détection des formulaires (Forms) et la notification e-mail des envois « contact »
- [x] Favicon (`favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, le « C » blanc sur bleu nuit)
- [ ] Image de partage (Open Graph) dédiée

## Bascule Framer → Netlify (sans coupure)

État du DNS chez OVH relevé le 13/11/2026 :
- `www` : CNAME → `sites.framer.app.` (Framer)
- `@` : 3 entrées A → `31.43.160.6`, `31.43.161.6` (Framer) **et `213.186.33.5`** (IP OVH par défaut,
  ne répond pas en HTTPS : ~1 visite sur 3 sans www tombe en erreur aujourd'hui) → à supprimer
- MX `mx1/mx2/mx3.mail.ovh.net`, SPF `v=spf1 include:mx.ovh.com ~all`, 2 TXT `google-site-verification` → **ne pas toucher**
- Framer n'a qu'une URL (`/`) : aucune redirection à prévoir

**J-2** : OVH, baisser le TTL des entrées A `@` et CNAME `www` à 300 s.

**Jour J (en soirée)**
1. Netlify : Domain management → ajouter `www.capsulepilatesclub.com` (domaine principal) puis `capsulepilatesclub.com`,
   **avant** de toucher au DNS.
2. Retirer l'en-tête `X-Robots-Tag: noindex` dans `netlify.toml`, pousser sur GitHub.
3. OVH (zone DNS) : supprimer les 3 A de `@` ; ajouter A `@` → IP indiquée par Netlify (normalement `75.2.60.5`) ;
   CNAME `www` → `<site>.netlify.app.`
4. Vérifier dans Netlify que le certificat HTTPS est actif.

**Après**
- J+1 : tester avec et sans www (mobile + ordinateur), envoyer un message test via le formulaire.
- Google Search Console : soumettre `sitemap.xml`.
- J+2 : retirer le domaine du projet Framer ; garder l'abonnement 1 à 2 semaines
  (retour arrière : CNAME `www` → `sites.framer.app.` et A `@` → IP Framer).
- Remettre le TTL à 3600.
