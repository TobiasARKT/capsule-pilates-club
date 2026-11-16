# Modifier le site : marche à suivre

On travaille tous **en local**, sur son ordinateur. Le site public est relié à la branche **`production-site-web`** : **chaque envoi sur GitHub (Push) met le site en ligne automatiquement**, environ une minute plus tard.
Chaque mise en ligne consomme des crédits Netlify. On regroupe donc les modifications : **une séance de travail, un seul envoi**, quand tout est vérifié.

## Une seule fois : installer

1. Accepte l'invitation GitHub reçue par mail.
2. Installe **GitHub Desktop** (gratuit) : https://desktop.github.com, puis connecte-toi avec ton compte GitHub.
3. Dans GitHub Desktop : *File → Clone repository* → choisis `capsule-pilates-club` → *Clone*.

## À chaque séance de travail

1. **Avant de commencer, toujours :** clique sur *Fetch origin*, puis sur *Pull* s'il apparaît. Tu récupères ainsi la dernière version, y compris les modifications de Tobias.
2. **Modifie les fichiers** avec ton éditeur (*Repository → Open in Visual Studio Code*, par exemple) :
   - `index.html` : textes, prix, liens, FAQ ;
   - `assets/img/` : photos (garde le même nom de fichier pour remplacer une image) ;
   - `css/style.css` : couleurs, tailles, mise en page.
3. **Vérifie le résultat en local :** ouvre `index.html` dans ton navigateur (double-clic) et recharge la page après chaque modification. Pense à regarder aussi en version mobile.
4. **Enregistre :** dans GitHub Desktop, écris en bas à gauche une phrase courte qui décrit le changement (ex. « Prix du pack 10 séances à 210 € »), puis clique sur *Commit to production-site-web*. Tu peux faire plusieurs enregistrements dans la séance : rien ne part en ligne tant que tu n'as pas envoyé.
5. **Mets en ligne, une fois tout terminé :** clique sur *Push origin*. Le site est à jour en une minute environ.

## Les règles

- **Toujours faire *Pull* avant de commencer**, sinon on travaille sur une version dépassée.
- **Ne pas faire *Push* pour une modification à moitié finie** : elle partirait en ligne.
- **Le planning et les réservations** se gèrent dans bsport, pas ici : ils se mettent à jour tout seuls sur le site.
- **En cas de doute ou d'erreur,** n'efface rien : tout est historisé et peut être récupéré. Écris à Tobias.
