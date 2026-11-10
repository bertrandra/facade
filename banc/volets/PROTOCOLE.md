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
