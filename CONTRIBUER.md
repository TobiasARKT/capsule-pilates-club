# Modifier le site : marche à suivre

Le projet a deux branches :

| Branche | Rôle | Adresse |
|---|---|---|
| **`test`** | On y travaille. Chaque envoi (*Push*) met à jour le **site de test**. Gratuit, autant de fois qu'on veut. | https://test--capsulepilatesclub.netlify.app (visible une fois connectée à Netlify) |
| **`branche-principale`** | Le **site public**. On n'y touche jamais directement : on y envoie `test` une fois validé. Chaque mise en ligne consomme 15 crédits Netlify. | https://capsulepilatesclub.com |

## Une seule fois : installer

1. Accepte l'invitation GitHub reçue par mail.
2. Installe **GitHub Desktop** (gratuit) : https://desktop.github.com, puis connecte-toi avec ton compte GitHub.
3. Dans GitHub Desktop : *File → Clone repository* → choisis `capsule-pilates-club` → *Clone*.
4. En haut, dans *Current branch*, sélectionne **`test`**. Tu n'en changeras plus.

## 1. Modifier (sur `test`)

1. **Avant de commencer :** clique sur *Fetch origin*, puis sur *Pull* s'il apparaît.
2. **Modifie les fichiers** avec ton éditeur (*Repository → Open in Visual Studio Code*, par exemple) :
   - `index.html` : textes, prix, liens, FAQ ;
   - `assets/img/` : photos (garde le même nom de fichier pour remplacer une image, moins de 500 Ko par photo) ;
   - `css/style.css` : couleurs, tailles, mise en page.
3. **Enregistre :** écris en bas à gauche une phrase courte (ex. « Prix du pack 10 séances à 210 € »), puis *Commit to test*.
4. **Envoie :** *Push origin*.

## 2. Vérifier (site de test)

Une minute après l'envoi, ouvre https://test--capsulepilatesclub.netlify.app (connectée à ton compte Netlify).
Vérifie sur **ordinateur et téléphone**. Si quelque chose ne va pas, corrige et renvoie : c'est gratuit.

## 3. Mettre en ligne (sur github.com)

Une fois tout validé, en regroupant les modifications :

1. Va sur https://github.com/TobiasARKT/capsule-pilates-club → onglet *Pull requests* → *New pull request*.
2. Règle **base : `branche-principale`** ← **compare : `test`**, puis *Create pull request* (deux fois).
3. Clique sur *Merge pull request* → *Confirm merge*.
4. Le site public est à jour en une minute environ.

Si GitHub affiche « There isn't anything to compare », c'est que tout est déjà en ligne.

## En cas de problème sur le site public

Netlify → projet `capsulepilatesclub` → *Deploys* → clique sur la version précédente (marquée *Published* avant la tienne) → *Publish deploy*.
Le site revient en arrière en quelques secondes, **sans consommer de crédits**. Préviens ensuite Tobias.

## Les règles

- **Toujours travailler sur `test`**, jamais directement sur `branche-principale`.
- **Toujours *Pull* avant de commencer.**
- **Regrouper les modifications** avant une mise en ligne (environ 15 par mois maximum).
- **Le planning et les réservations** se gèrent dans bsport : ils se mettent à jour tout seuls sur le site.
- **En cas de doute, de conflit ou d'erreur,** n'insiste pas et n'efface rien : tout est historisé. Écris à Tobias.
