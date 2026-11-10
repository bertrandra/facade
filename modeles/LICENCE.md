# Modèle de détection des volets

`volets-yolov10n.onnx` : YOLOv10n (Ultralytics 8.4), entraîné à partir des poids COCO de
THU-MIG/yolov10 (v1.1), puis affiné sur des volets annotés (jeu public CMP Facade, et photos fournies par
l'auteur du dépôt).

- **Code et poids YOLO** : AGPL-3.0 (Ultralytics / YOLOv10). Le modèle distribué est un dérivé : la
  licence AGPL-3.0 s'applique à sa redistribution.
- **Jeu CMP Facade** : conditions de réutilisation vérifiées par l'auteur du dépôt.
- **Photos** : fournies par l'auteur, qui en détient les droits.

Entraînement : `banc/volets/yolo_entrainer.py` ; jeu : `banc/volets/yolo_jeu.py` ; mesures : `banc/volets/PROTOCOLE.md`.

## Modèle des fenêtres et portes

`fenetres-yolov10n.onnx` : YOLOv10n (Ultralytics 8.4), deux classes (fenêtre, porte), entraîné à partir des
poids COCO de THU-MIG/yolov10 (v1.1) sur le jeu public CMP Facade (labels `window` et `door`). Même licence :
AGPL-3.0 pour le modèle, conditions du jeu CMP vérifiées par l'auteur. Mesures : banc `banc/fenetres/`.

## Modèle COCO (généraliste)

`coco-yolov10n.onnx` : YOLOv10n d'origine (THU-MIG/yolov10 v1.1, entraîné sur COCO, 80 classes), exporté en
ONNX sans NMS. Licence : AGPL-3.0 (YOLO / Ultralytics) ; jeu COCO : CC BY 4.0 pour les annotations.
