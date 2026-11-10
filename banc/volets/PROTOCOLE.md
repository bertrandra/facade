# Banc des volets

Banc **séparé** de celui des fenêtres et des portes (`banc/`). Il ne lit ni ne modifie
`banc/evaluer.mjs`, `banc/annotations/` ni les détecteurs de baies. Il reprend seulement la même
notation (copie de `evaluer.mjs` et `noter.mjs`), pour que les notes restent comparables.

## Données

Le jeu public CMP Facade (`CMP_facade_DB_base.zip`, cmp.felk.cvut.cz/~tylecr1/facade/), dossier `base/`.
Les volets sont la classe 8 (`blind`) de `label_names.txt`.

```bash
S=<dossier de travail> ; CMP=<…>/base
python3 -I banc/volets/cmp_volets.py $CMP $S/jeux 40 40
# -> $S/jeux/volets-dev (mise au point)   et   $S/jeux/volets-final (tenu à l'écart)
```

La sélection est reproductible (graine 20261110) : parmi les 145 images qui ont un volet, les 40
premières forment `volets-dev`, les 40 suivantes `volets-final`.

## Lancer la mesure

```bash
node banc/volets/evaluer.mjs banc/volets/detecteur.ts $S/jeux/volets-dev
```

Règles : une boîte rendue et un volet annoté s'apparient à IoU ≥ 0,5 ; un volet `difficile`
(moins de 14 px) ne compte ni pour ni contre ; note d'image = 0,5 × F1 objets + 0,5 × F1 pixels.

## Règles de décision

- Le réglage ne se fait que sur `volets-dev`.
- `volets-final` n'est ouvert qu'une fois la version figée, et une seule fois.

## Résultats

| Version | volets-dev | volets-final |
|---|---|---|
| couleur du mur, première version (teinte) | 0,064 | — |
| couleur du mur, mode lissé | 0,097 | — |
| luminance du mur (mode), différence 40 | 0,076 | — |
| luminance du mur (centile 0,5), différence 40 | 0,108 | — |
| luminance du mur (centile 0,7), différence 60 | 0,114 | — |

### Classifieur de pixels (régression logistique) et ouvertures voisines

Le détecteur ne seuille plus la luminance : il calcule une probabilité par pixel, à partir de 12
caractéristiques (`caracteristiques.py`, reprises à l'identique dans `src/volets.ts`, écart 1e-7),
dont deux viennent des **ouvertures trouvées par le code de façade** (dedans / proximité d'une baie,
dans sa bande verticale). Les poids (`POIDS` dans `src/volets.ts`) sortent de `entrainer.py`.

```bash
# 1. les ouvertures du code de facade, une par image du lot
npx esbuild banc/volets/dump_baies.ts --bundle --platform=node --format=esm --outfile=$S/dump.mjs
node $S/dump.mjs $S/jeux/volets-dev $S/baies_dev
# 2. l'entrainement : moitie A des images (noms pairs) ; controle sur la moitie B
python3 -I banc/volets/entrainer.py $S/jeux/volets-dev $S/baies_dev $S/poids.json
```

Mesures (note du banc, `volets-dev`, seuil de probabilité 0,85) :

| Ensemble | Note | Remarque |
|---|---|---|
| volets-dev, 40 images | 0,242 | |
| moitié A, 20 images | 0,307 | entraînement : optimiste |
| moitié B, 20 images | 0,177 | **le seuil 0,85 a été choisi en regardant B** : B n'est plus un contrôle propre |
| volets-final, 40 images | non ouvert | seul juge encore intact |

Seuil : 0,5 donne 0,06 sur B ; 0,7 donne 0,12 ; 0,85 donne 0,18 ; 0,9 donne 0,04. La courbe est
pointue : le réglage est fragile. Un réseau à 16 neurones (même entrée) n'a pas fait mieux (F1 pixel
0,26 sur B, comme le modèle linéaire).

Limites connues : le temps passe la borne du banc (le code de façade pèse ~1 s à lui seul) ; les
images CMP sont peu nombreuses (40) ; la proximité des baies dépend de la qualité de leur détection.

### Deuxième version : 20 caractéristiques, lot de contrôle neuf

Ajouts : densité d'arêtes à plus grande échelle (lames), saturation, luminosité relative au voisinage,
bande verticale d'une baie. Toujours une régression logistique ; poids dans `POIDS` (`src/volets.ts`).

Protocole de ce tour :
- entraînement : moitié A du lot dev (`entrainer.py`) ;
- choix du seuil : moitié B du lot dev, par la note du banc (`VOLETS_SEUIL=… evaluer.mjs`) ;
- **contrôle : `volets-ctrl`**, 40 images CMP neuves (indices 80 à 119 de la liste reproductible),
  mesuré **une seule fois** avec le seuil choisi sur B.

| Ensemble | Seuil | Note | Rappel | Précision |
|---|---|---|---|---|
| moitié B (choix du seuil) | 0,60 / 0,70 / **0,80** / 0,85 / 0,90 | 0,062 / 0,124 / **0,200** / 0,179 / 0,107 | | |
| **volets-ctrl** (une seule mesure) | 0,80 | **0,233** | 27 % | 21 % |
| volets-final | non ouvert | | | |

Le lot de contrôle n'est plus neuf après ce tour : il ne doit pas servir à re-régler. `volets-final`
reste le seul juge intact.

### Sources de données (vérifiées)

- **CMP, classe `blind`** : le rapport CMP la définit comme « tout obstacle fonctionnel à la lumière sur
  la fenêtre, ouvert ou fermé » : volets et stores, extérieurs comme intérieurs. Ce n'est donc pas
  une classe « volet » stricte ; le détecteur n'en voit que la part extérieure et sombre.
  Source : [rapport CMP 2013](https://cmp.felk.cvut.cz/~tylecr1/facade/CMP_facade_DB_2013.pdf).
- **Images CMP restantes** : 25 images (417 volets) ne servent ni à la mise au point, ni au contrôle,
  ni au lot final. Elles forment une réserve à garder pour un second contrôle, à ouvrir une seule fois.
- **ADE20K** (liste à 150 classes, [objectInfo150](https://raw.githubusercontent.com/CSAILVision/sceneparsing/master/objectInfo150.csv)) :
  `blind;screen` (store de fenêtre) et `awning;sunshade;sunblind` (banne). Aucune classe volet extérieur.
- **RobotCar Facade, ECP, CFP** : pas de classe volet (voir les résumés des jeux).
- **Photos de la maison** : hors dépôt ; il faut les fournir pour les annoter.

### Lot pilote Wikimedia Commons (annoté à la main, licences libres)

Fichier : `banc/volets/annotations/commons-volets.json` (44 volets sur 4 images, avec titre, URL et
licence de chaque photo). Les images ne sont pas dans le dépôt : elles se téléchargent depuis Commons.

| Image | Licence | Volets |
|---|---|---|
| Lisbonne, fenêtre à volets bleus | CC BY-SA 4.0 | 2 |
| Esino Lario, immeuble | CC BY-SA 3.0 | 22 |
| Bitolska kukja (balcon) | CC BY-SA 3.0 | 12 |
| Pontoise, immeuble voisin | CC BY-SA 2.0 fr | 8 |

Mesure (une seule, seuil 0,80) : **0 détection juste sur les 44 volets** (note 0,000). Le détecteur
ne trouve rien sur ces photos ; cela confirme que ses réglages ne sont pas transférables hors CMP. Le
lot est trop petit (4 images) pour servir de contrôle ; il sert d'avertissement. Temps : 1,2 à 2 s
par image, au-dessus du budget du banc (le code de façade y pèse).


### Lot Commons complété : 8 images, 96 volets (une seule mesure)

Ajouts (même méthode, boîtes à la main sur grille, échelle relue sur la largeur réelle du fichier) :
Riga (domaine public), Amiens (CC BY-SA 3.0), Barcelone (CC0), hôpital (CC BY-SA 2.0 fr).
Trois autres candidats (Estambul, Marseille, Roussillon) ont renvoyé des erreurs de débit de Wikimedia ;
ils sont à reprendre plus tard.

Mesure (seuil 0,80) : **0 volet juste sur 96**. Une seule image produit des détections (3, toutes
fausses, sur la maison de Riga). Les notes par image sont à 0 ; la note globale est aussi à 0 parce que
le groupe `commons` n'a pas de poids dans la notation globale (0,55 maison, 0,35 cmp, 0,10 synthétique).

Conclusion : le détecteur ne se transfère pas hors du jeu CMP. Il ne faut pas s'appuyer sur ses cases
« Volets » tant qu'il n'a pas été refait sur des données plus variées.

### Photos fournies par l'auteur (6 images, 51 volets)

Fichiers : `banc/volets/photos/u1.jpg` à `u6.jpg` (240 Ko), annotations dans
`banc/volets/annotations/photos-volets.json`. Droits : confirmés par l'auteur du dépôt.
Les images sont petites (225 à 588 px) : hors de la plage pour laquelle le détecteur est réglé.

Mesure unique (seuil 0,80) : 14 volets justes sur 51, 34 fausses détections. Pas un contrôle
propre : le détecteur n'a pas été réglé sur ces photos, mais elles n'ont pas non plus servi à
choisir le seuil, et leur taille est hors plage.

### Deux photos supplémentaires (u7, u8 : 20 volets)

Ajoutées au même lot, dans le même dossier `banc/volets/photos/`. Droits : supposés identiques à ceux des
six premières, à confirmer par l'auteur. Lot total : 8 photos, 71 volets, toutes mesurées une seule fois
ou jamais, aucune pour régler le seuil.

### Photo u9 (polyhabitat.fr, droits confirmés par l'auteur)

Une photo de plus : 8 volets, lot total 79 volets sur 9 photos. Source : polyhabitat.fr, droits
confirmés par l'auteur du dépôt.

### Deux photos supplémentaires (u10, u11 : 18 volets), droits confirmés par l'auteur

Lot total : 11 photos, 97 volets. Les boîtes ont été vérifiées sur l'image pour u10.

### Photo u12 (volets violets), droits confirmés par l'auteur

6 volets, lot total 12 photos et 103 volets. Photo de stock (filigrane visible) : droits confirmés par l'auteur.
Boîtes vérifiées sur l'image ; les feuilles partiellement cachées par les pots de fleurs ne sont pas toutes annotées.

### Photos u13, u14, u15 (droits confirmés par l'auteur)

u13 : façade à colombages (banque d'images, filigrane) ; u14 : maison aux volets verts ; u15 : façade d'angle.
Les boîtes de u15 ont été vérifiées sur l'image. Lot total : 15 photos, 140 volets.

### Mesure sur le lot de photos (15 photos, 140 volets), seuil 0,80, une seule fois

| Indicateur | Valeur |
|---|---|
| Volets reconnus justes (rappel, « taux de reconnaissance ») | **29 / 140 = 21 %** |
| Détections fausses | 53 |
| Précision (justes / détections) | 29 / 82 = 35 % |
| Photos sans aucune détection juste | 9 sur 15 (u6, u8, u9, u10 à u14 : 0 juste) |

Meilleures photos : u7 (9 justes sur 10), u5 (7 sur 14), u15 (6 sur 16). Le temps dépasse le budget du banc
sur la plupart des photos (0,4 à 2,7 s). La note globale reste à 0 : le groupe `photos` n'a pas de poids
dans la notation globale.

### Validation croisée sur les photos (trois plis de cinq photos)

Chaque pli de photos est mesuré avec un modèle entraîné sur le CMP de mise au point et sur les deux
autres plis ; les photos mesurées ne servent jamais à leur propre entraînement.

| Seuil | Rappel | Précision | Justes | Fausses |
|---|---|---|---|---|
| 0,60 | 3,6 % | 25,0 % | 5 / 140 | 15 |
| 0,70 | 3,6 % | 18,5 % | 5 / 140 | 22 |
| **0,80** | **22,9 %** | **35,2 %** | **32 / 140** | **59** |
| 0,90 | 2,1 % | 75,0 % | 3 / 140 | 1 |

Comparé à la mesure sans photos à l'entraînement (29 / 140 au seuil 0,80) : **gain négligeable (+3)**.
Le modèle linéaire sur ces 20 caractéristiques plafonne autour de 21–23 % de rappel. Le seuil reste
très sensible (de 4 % à 23 % de rappel entre 0,7 et 0,8).

### Détecteur YOLOv10n (Ultralytics 8.4, CPU) : première version

Jeu : entraînement = CMP de mise au point (40 images) + photos des plis 0 et 1 (10 photos) ;
validation (arrêt anticipé) = CMP de contrôle (40) ; test = photos du pli 2 (5) + CMP final (40).
Réserve de 25 images CMP : intacte. Poids initiaux : YOLOv10n COCO.

| Mesure | mAP50 | mAP50-95 | Précision | Rappel |
|---|---|---|---|---|
| Validation (CMP contrôle, 685 volets) | 0,562 | 0,333 | 0,708 | 0,467 |
| Test (CMP final + photos pli 2, 901 volets) | 0,774 | 0,477 | 0,792 | 0,682 |
| Photos du pli 2 seules (5 photos, 44 volets) | 0,926 | 0,610 | 1,000 | 0,840 |

Export ONNX : 9,4 Mo, entrée `[1,3,640,640]`, sortie `[1,300,6]` (sans NMS).
Le petit échantillon de photos (5) rend le chiffre 0,93 très incertain.
Les poids ne sont pas commités tant que la licence des données CMP n'est pas vérifiée.

### Calage du seuil du détecteur YOLO (lot de contrôle CMP seulement)

`banc/volets/yolo_seuil.py`, appariement glouton à IoU ≥ 0,5, sur les 40 images de contrôle (685 volets) :

| Seuil | Précision | Rappel | F1 |
|---|---|---|---|
| 0,25 | 0,607 | 0,555 | 0,579 |
| 0,30 | 0,641 | 0,537 | **0,584** |
| 0,40 | 0,703 | 0,483 | 0,580 |
| 0,50 | 0,777 | 0,438 | 0,550 |

Seuil retenu : **0,30** (F1 le plus haut, plateau entre 0,25 et 0,40). Le lot de test et la réserve
n'ont pas servi à ce choix.
