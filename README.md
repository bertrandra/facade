# facade — façade redressée et ouvertures repérées

Ce dépôt contient **`facade.html`**, une page autonome pour téléphone, ses sources (`src/`) et son banc d'essai (`banc/`).
Il est né dans [Plan](https://github.com/bertrandra/plan) (`outils/facade/`, PR 656 et 657) et en a été déplacé ; la chaîne de
calibration de Plan qu'il utilise (EXIF, champ par défaut, homographie, `classer`) est copiée dans `src/plan/`, avec le commit
d'origine (`9002208d`) en tête de chaque fichier. Plan, de son côté, porte sa propre copie du repérage des ouvertures
(`src/facade/detection/baies/`) : les deux se suivent à la main, voir « Lien avec Plan » ci-dessous.

Documentation : ce fichier (ce que fait la page), [`banc/README.md`](banc/README.md) (l'histoire des détecteurs et leurs mesures),
[`banc/PROTOCOLE.md`](banc/PROTOCOLE.md) (le test complet : jeux, commandes, règles de décision, résultats de référence, comment
lancer un nouveau jeu), [`CHANGELOG.md`](CHANGELOG.md).

Page unique pour téléphone, construite à la racine du dépôt (`facade.html`). Aucun réseau, aucun
serveur, aucune saisie : on prend ses photos, on touche « Redresser et fusionner », on enregistre.

1. **Objectif** : champ lu dans l'EXIF (`FocalLengthIn35mmFilm`, via `src/plan/exif.ts`) ; 0,5×
   donne environ 108°. Sans EXIF (photo transférée par une messagerie), il est estimé : les points
   de fuite des verticales et des horizontales du mur, orthogonales, vérifient (v − c)·(h − c) = −f².
2. **Redressement** (`auto.ts`) : segments de droite (croissance de régions de même orientation du
   gradient), point de fuite vertical puis horizontal sur la sphère de Gauss, rotation qui met
   l'appareil face au mur ; le cadre retenu est celui des lignes trouvées.
3. **Fusion** : deux vues redressées d'un même mur ne diffèrent que d'une similitude ; coins de
   Harris, descripteurs cherchés à neuf échelles, RANSAC. Fondu progressif et gain par photo.
4. **Coutures** : chaque jointure entre deux photos suit le chemin où elles se ressemblent le plus
   (programmation dynamique sur la bande commune), adoucie sur quelques pixels ; une saillie (porche,
   pignon) n'apparaît donc pas en double. Les photos s'assemblent côte à côte ou l'une au-dessus de
   l'autre.
5. **Rendu** : chaque pixel est repris sur la photo d'origine, à pleine résolution (16 Mpx au plus).

En plus :

- **Repli manuel** (« Ajuster ») : quatre coins d'un rectangle du mur posés au doigt, avec loupe ;
  ou « Autre façade » sur une photo d'angle ; ou retour à l'automatique. Sans EXIF, les coins
  donnent aussi l'objectif.
- **Grand-angle non corrigé** (certains Android) : la distorsion radiale est estimée sur la photo
  (celle qui rend les droites du bâtiment le plus concourantes) et corrigée ; un iPhone rend 0.
- **Photos gardées sur l'appareil** (IndexedDB) : elles reviennent si Safari recharge la page.
- **Échelle facultative** : une longueur connue posée sur le résultat donne les px/m, puis des
  mesures et une barre d'échelle sur l'image enregistrée.
- **Fenêtres et portes** (case à cocher, `baies.ts`) : trois détecteurs indépendants cherchent les
  baies sur la façade redressée, chacun à sa façon — des rectangles d'arêtes notés par une
  vingtaine d'indices (`baies/propositions.ts`), les mailles fermées de la menuiserie
  (`baies/mailles.ts`), les travées et les alignements (`baies/travees.ts`) — et un vote retient ce
  sur quoi deux d'entre eux s'accordent, réunit les parties d'une même baie, écarte ce qui est posé
  au sol sans la hauteur d'une porte. La boîte est le hors-tout de la menuiserie, cadre compris.
  Type selon la règle de Plan (`classer`, `src/plan/classement.ts`) une fois le sol situé par une porte ; le sol suit les
  corrections faites à la main. Cotes avec l'échelle ; ajout, recadrage, retrait, changement de
  type au doigt ; export CSV. Mesuré sur un banc de façades annotées (`banc/README.md`) : 0,87 sur
  1 sur 221 images, contre 0,34 pour le premier détecteur (régions lisses), 0,83 à 0,85 sur des
  images tenues à l'écart, et 0,94 sur l'élévation que la page produit elle-même.
- **Calcul en arrière-plan** (Web Worker lancé depuis le texte embarqué), avec repli sur la page.

Fichiers de `src/` : `auto.ts` (calcul pur), `baies.ts` et `baies/` (fenêtres et portes), `operations.ts` (les opérations,
appelables par message), `travail.ts` (le Worker), `editeur.ts` (poignées, loupe), `stockage.ts` (IndexedDB), `main.ts`
(l'interface), `modele.html`, `verifier.ts` (banc synthétique), `plan/` (les modules copiés de Plan). `banc/` : le banc d'essai des
détecteurs. `construire.mjs` : le build.

Limite : un seul plan est redressé exactement ; ce qui avance ou recule reste droit mais n'est pas
à la même échelle que le mur.

```bash
npm install                      # esbuild, typescript
node construire.mjs              # reconstruit facade.html
node construire.mjs --verifier   # banc synthétique (une minute environ) : 13 contrôles « ok »
npx tsc --noEmit                 # types stricts
node construire.mjs --artifact <fichier>   # variante sans squelette, pour claude.ai
```

## Lien avec Plan

- **Ce dépôt → Plan** : le repérage des ouvertures de Plan (`src/facade/detection/baies/`) est un port de `src/baies.ts` et
  `src/baies/` : les `!` y sont remplacés (`as number` ou `au`), trois fonctions trop longues sont découpées, sorties identiques
  sur les 327 images du banc. Un changement du vote ou d'un détecteur se fait ici (le banc est ici), puis se reporte dans Plan.
- **Plan → ce dépôt** : `src/plan/` copie quelques modules de Plan ; s'ils changent (la règle `classer`, la lecture de l'EXIF), les
  recopier et refaire le build.
