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

- [ ] Liens bsport des nouvelles formules : 4, 6, 12 cours, Day Club, Abonnement Studio 4 séances
      (pour l'instant → page d'inscription bsport). Le 8 cours (32001) et les cartes sont branchés.
- [ ] Lien bsport de l'offre Black Friday (aujourd'hui → Instagram)
- [x] Dossier `dev/` (pages de maquettes) exclu du dépôt via `.gitignore` : il reste en local, jamais publié
- [x] Photo de la fondatrice (assets/img/fondatrice-emmanuelle-berges.jpg)
- [x] Logos des partenaires (assets/img/partenaires/, repris du site Framer)
- [ ] Texte des mentions légales
- [ ] Outil newsletter (Brevo/Mailchimp) ou garder Netlify Forms
- [ ] Netlify : activer la détection des formulaires (Forms) et la notification e-mail des envois « contact »
- [x] Favicon (`favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, le « C » blanc sur bleu nuit)
- [ ] Image de partage (Open Graph) dédiée

## Bascule (le jour J)

1. Retirer l'en-tête `X-Robots-Tag: noindex` dans `netlify.toml`.
2. Netlify : ajouter `capsulepilatesclub.com` et `www` au site.
3. OVH (zone DNS) : baisser le TTL 24-48 h avant, puis A `@` → 75.2.60.5 et CNAME `www` → `<site>.netlify.app`.
   Ne pas toucher aux enregistrements MX / mail.
4. Framer : déconnecter le domaine, garder l'abonnement 1 à 2 semaines.
5. Google Search Console : soumettre le sitemap.
