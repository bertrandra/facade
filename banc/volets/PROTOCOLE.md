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
