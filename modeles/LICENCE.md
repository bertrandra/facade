# Modèle de détection des volets

`volets-yolov10n.onnx` : YOLOv10n (Ultralytics 8.4), entraîné à partir des poids COCO de
THU-MIG/yolov10 (v1.1), puis affiné sur des volets annotés (jeu public CMP Facade, et photos fournies par
l'auteur du dépôt).

- **Code et poids YOLO** : AGPL-3.0 (Ultralytics / YOLOv10). Le modèle distribué est un dérivé : la
  licence AGPL-3.0 s'applique à sa redistribution.
- **Jeu CMP Facade** : conditions de réutilisation vérifiées par l'auteur du dépôt.
- **Photos** : fournies par l'auteur, qui en détient les droits.

Entraînement : `banc/volets/yolo_entrainer.py` ; jeu : `banc/volets/yolo_jeu.py` ; mesures : `banc/volets/PROTOCOLE.md`.
