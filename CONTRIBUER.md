# Modifier le site : marche à suivre

Le projet a deux branches :

| Branche | Rôle | Adresse |
|---|---|---|
| **`test`** | On y travaille. Chaque envoi (Push) met à jour le **site de test**. Gratuit, autant de fois qu'on veut. | https://test--capsulepilatesclub.netlify.app |
| **`branche-principale`** | Le site public. Chaque envoi le **met en ligne** et consomme des crédits Netlify. | https://capsulepilatesclub.com |

**Règle : on travaille toujours sur `test`.** On ne passe sur `branche-principale` que pour mettre en ligne une version validée.

## Une seule fois : installer

1. Accepte l'invitation GitHub reçue par mail.
2. Installe **GitHub Desktop** (gratuit) : https://desktop.github.com, puis connecte-toi avec ton compte GitHub.
3. Dans GitHub Desktop : *File → Clone repository* → choisis `capsule-pilates-club` → *Clone*.
4. En haut, dans *Current branch*, sélectionne **`test`**.

## Travailler

1. Vérifie que tu es sur **`test`** (en haut, *Current branch*).
2. **Avant de commencer :** clique sur *Fetch origin*, puis sur *Pull* s'il apparaît.
3. **Modifie les fichiers** avec ton éditeur (*Repository → Open in Visual Studio Code*, par exemple) :
   - `index.html` : textes, prix, liens, FAQ ;
   - `assets/img/` : photos (garde le même nom de fichier pour remplacer une image) ;
   - `css/style.css` : couleurs, tailles, mise en page.
   Pour un aperçu immédiat, ouvre `index.html` dans ton navigateur (double-clic).
4. **Enregistre :** écris en bas à gauche une phrase courte (ex. « Prix du pack 10 séances à 210 € »), puis *Commit to test*.
5. **Envoie :** *Push origin*. Une minute plus tard, le site de test est à jour : vérifie-le sur ordinateur et sur téléphone.

## Mettre en ligne une version validée

1. En haut, *Current branch* → sélectionne **`branche-principale`**, puis *Fetch origin* et *Pull* s'il apparaît.
2. Menu *Branch → Merge into current branch…* → choisis **`test`** → *Create a merge commit*.
3. *Push origin* : le site public est à jour en une minute.
4. **Repasse tout de suite sur `test`** (*Current branch*) pour la suite.

Chaque mise en ligne consomme des crédits : regroupe les modifications et ne mets en ligne qu'une version complète.

## Les règles

- **On ne modifie jamais directement `branche-principale`.**
- **Le planning et les réservations** se gèrent dans bsport, pas ici : ils se mettent à jour tout seuls sur le site.
- **En cas de doute ou d'erreur,** n'efface rien : tout est historisé et peut être récupéré. Écris à Tobias.
