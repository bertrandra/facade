# Entrainement du detecteur YOLOv10n de volets (Ultralytics 8.4, CPU), a partir du jeu prepare par
# banc/volets/yolo_jeu.py. Poids initiaux : yolov10n.pt (COCO, release THU-MIG/yolov10 v1.1).
# Arret anticipe (patience 25) sur le lot de controle CMP. Le test n'intervient pas dans l'entrainement.
#   python3 -I banc/volets/yolo_entrainer.py <dossier du jeu YOLO> <yolov10n.pt> <dossier de sortie>
import sys
from ultralytics import YOLO

jeu, poids, sortie = sys.argv[1:4]
m = YOLO(poids)
m.train(data=f'{jeu}/volets.yaml', epochs=100, patience=25, imgsz=640, batch=8, device='cpu', workers=2,
        project=sortie, name='v1', exist_ok=True, plots=False, amp=False, seed=20261110, deterministic=True)
