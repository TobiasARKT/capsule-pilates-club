# CAPSULE Pilates Club — site vitrine

Site statique (HTML/CSS/JS, sans build), reconstruit à partir de la maquette de la cliente
pour remplacer le site Framer (capsulepilatesclub.com, domaine chez OVH).

## Branches et mise en ligne

Hébergement Netlify (compte de la cliente, équipe « Capsule », projet `capsulepilatesclub`), relié à ce dépôt GitHub.

| Branche | Netlify | Adresse | Coût |
|---|---|---|---|
| `branche-principale` | Production : chaque push met le site en ligne | https://capsulepilatesclub.netlify.app (puis capsulepilatesclub.com) | 15 crédits par mise en ligne (offre gratuite : 300 crédits par mois) |
| `test` | Déploiement de branche (*branch deploy*) | https://test--capsulepilatesclub.netlify.app, visible uniquement connecté à l'équipe Netlify | Gratuit |

Fonctionnement :
1. On travaille sur `test` : commit puis push, et on vérifie sur le site de test.
2. On met en ligne avec une pull request `test` → `branche-principale` sur github.com, puis *Merge*.
   Les aperçus de pull request sont désactivés, donc la fusion ne coûte qu'une mise en ligne.
3. **Ne pousser sur `test` que du publiable** : la prochaine fusion envoie tout son contenu en ligne.
4. On ne commite jamais directement sur `branche-principale`, sauf urgence. Dans ce cas, refusionner `branche-principale` dans `test` aussitôt après.
5. Retour arrière : Netlify → *Deploys* → version précédente → *Publish deploy* (sans crédit).

Marche à suivre pas à pas pour la cliente (GitHub Desktop) : [CONTRIBUER.md](CONTRIBUER.md).

Réglages Netlify, si l'on doit les refaire par l'API (`netlify api updateSite`) :
- `allowed_branches = [branche-principale, test]` et `skip_prs = true` ;
- changer `repo_branch` exige d'envoyer l'objet `repo` complet. Ce changement remet `skip_prs` à zéro et
  déclenche une mise en ligne de production.

README.md et CONTRIBUER.md ne sont jamais servis en ligne : ils renvoient une 404 via `_redirects`.

## Aperçu local

    python3 -m http.server 5200
    → http://localhost:5200/

Ouvrir directement `index.html` (double-clic) suffit aussi pour un aperçu rapide.
Après toute modification de `css/style.css` ou `js/main.js`, incrémenter le `?v=` de leurs liens dans `index.html`,
pour que les navigateurs ne gardent pas l'ancienne version en cache.

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
- [x] Netlify : détection des formulaires activée (`contact` et `newsletter` détectés)
- [ ] Netlify : notification e-mail des envois « contact » (adresse de la cliente à renseigner)
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
1. Netlify : Domain management → `www.capsulepilatesclub.com` en domaine principal, avec `capsulepilatesclub.com`
   (déjà ajouté) en alias, **avant** de toucher au DNS.
2. Retirer l'en-tête `X-Robots-Tag: noindex` dans `netlify.toml` sur `test`, puis fusionner dans `branche-principale`.
   Les deux branches en sont ainsi débarrassées, et une fusion ultérieure ne le remettra pas.
   Le site de test reste protégé par la connexion Netlify.
3. OVH (zone DNS) : supprimer les 3 A de `@` ; ajouter A `@` → IP indiquée par Netlify (normalement `75.2.60.5`) ;
   CNAME `www` → `<site>.netlify.app.`
4. Vérifier dans Netlify que le certificat HTTPS est actif.

**Après**
- J+1 : tester avec et sans www (mobile + ordinateur), envoyer un message test via le formulaire.
- Google Search Console : soumettre `sitemap.xml`.
- J+2 : retirer le domaine du projet Framer ; garder l'abonnement 1 à 2 semaines
  (retour arrière : CNAME `www` → `sites.framer.app.` et A `@` → IP Framer).
- Remettre le TTL à 3600.
