# Calage du seuil de score du detecteur YOLO de volets, sur le lot de CONTROLE CMP seulement
# (jamais sur le test ni sur la reserve). Appariement glouton a IoU >= 0,5 (comme le banc).
#   python3 -I banc/volets/yolo_seuil.py <poids .pt> <dossier du jeu YOLO (images/val, labels/val)>
import sys, os, glob
import numpy as np
from ultralytics import YOLO

poids, jeu = sys.argv[1:3]
m = YOLO(poids)
imgs = sorted(glob.glob(os.path.join(jeu, 'images', 'val', '*.jpg')))

def lire_gt(img):
    lab = os.path.join(jeu, 'labels', 'val', os.path.basename(img)[:-4] + '.txt')
    from PIL import Image
    W, H = Image.open(img).size
    out = []
    for l in open(lab):
        c, cx, cy, w, h = map(float, l.split())
        out.append([(cx - w / 2) * W, (cy - h / 2) * H, (cx + w / 2) * W, (cy + h / 2) * H])
    return np.array(out).reshape(-1, 4)

def iou(a, b):
    x0 = np.maximum(a[:, None, 0], b[None, :, 0]); y0 = np.maximum(a[:, None, 1], b[None, :, 1])
    x1 = np.minimum(a[:, None, 2], b[None, :, 2]); y1 = np.minimum(a[:, None, 3], b[None, :, 3])
    inter = np.clip(x1 - x0, 0, None) * np.clip(y1 - y0, 0, None)
    aa = (a[:, 2] - a[:, 0]) * (a[:, 3] - a[:, 1]); bb = (b[:, 2] - b[:, 0]) * (b[:, 3] - b[:, 1])
    return inter / (aa[:, None] + bb[None, :] - inter + 1e-9)

seuils = [0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.5, 0.6]
res = {s: [0, 0, 0] for s in seuils}  # tp, fp, fn
resultats = {}
for img in imgs:
    gt = lire_gt(img)
    r = m.predict(img, imgsz=640, conf=0.05, device='cpu', verbose=False)[0]
    det = r.boxes.xyxy.cpu().numpy(); sc = r.boxes.conf.cpu().numpy()
    resultats[img] = (gt, det, sc)
for s in seuils:
    tp = fp = fn = 0
    for img, (gt, det, sc) in resultats.items():
        d = det[sc >= s]
        if len(gt) == 0: fp += len(d); continue
        if len(d) == 0: fn += len(gt); continue
        M = iou(d, gt)
        libre = set(range(len(gt))); paires = 0
        for i in np.argsort(-sc[sc >= s]):
            j = max(libre, key=lambda j: M[i, j], default=None) if libre else None
            if j is not None and M[i, j] >= 0.5:
                tp += 1; libre.discard(j)
            else:
                fp += 1
        fn += len(libre)
    print(f'seuil {s:.2f} : precision {tp / max(1, tp + fp):.3f}, rappel {tp / max(1, tp + fn):.3f}, justes {tp}, fausses {fp}, manques {fn}', flush=True)
