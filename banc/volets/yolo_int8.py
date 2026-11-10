# Quantification int8 (statique, QDQ) du modele ONNX des volets, et comparaison a la precision fp32.
# Calibration : images du lot de MISE AU POINT seulement. Comparaison : lot de CONTROLE (precision,
# rappel, F1 au seuil 0,30). Le lot de TEST n'est pas utilise ici.
#   python3 -I banc/volets/yolo_int8.py calibrer <dossier images dev> <fp32.onnx> <int8.onnx>
#   python3 -I banc/volets/yolo_int8.py comparer <dossier images> <labels> <modele.onnx> [seuil]
import sys, os, glob
import numpy as np
from PIL import Image

TAILLE = 640

def letterbox(img):
    W, H = img.size; k = min(TAILLE / W, TAILLE / H)
    nw, nh = round(W * k), round(H * k); px, py = (TAILLE - nw) // 2, (TAILLE - nh) // 2
    c = Image.new('RGB', (TAILLE, TAILLE), (114, 114, 114)); c.paste(img.resize((nw, nh), Image.BILINEAR), (px, py))
    x = np.asarray(c).astype(np.float32).transpose(2, 0, 1)[None] / 255.0
    return x, k, px, py

class Calib:
    def __init__(self, dossier, n=40):
        self.fichiers = sorted(glob.glob(os.path.join(dossier, '*.jpg')))[:n]; self.i = 0
    def get_next(self):
        if self.i >= len(self.fichiers): return None
        x, *_ = letterbox(Image.open(self.fichiers[self.i]).convert('RGB')); self.i += 1
        return {'images': x}

def calibrer(dossier, fp32, sortie):
    from onnxruntime.quantization import quantize_static, QuantType, QuantFormat, CalibrationMethod
    quantize_static(fp32, sortie, Calib(dossier), quant_format=QuantFormat.QDQ, per_channel=True,
                    weight_type=QuantType.QInt8, activation_type=QuantType.QUInt8,
                    calibrate_method=CalibrationMethod.MinMax)
    print('int8 ecrit :', sortie, os.path.getsize(sortie) // 1024, 'Ko')

def iou(a, b):
    x0 = max(a[0], b[0]); y0 = max(a[1], b[1]); x1 = min(a[2], b[2]); y1 = min(a[3], b[3])
    i = max(0, x1 - x0) * max(0, y1 - y0)
    return i / ((a[2] - a[0]) * (a[3] - a[1]) + (b[2] - b[0]) * (b[3] - b[1]) - i + 1e-9)

def comparer(dossier, labels, modele, seuil=0.30):
    import onnxruntime as ort
    s = ort.InferenceSession(modele, providers=['CPUExecutionProvider'])
    tp = fp = fn = 0
    for img in sorted(glob.glob(os.path.join(dossier, '*.jpg'))):
        im = Image.open(img).convert('RGB'); W, H = im.size
        x, k, px, py = letterbox(im)
        out = s.run(None, {s.get_inputs()[0].name: x})[0][0]
        dets = []
        for r in out:
            if r[4] < seuil: continue
            dets.append([(r[0] - px) / k, (r[1] - py) / k, (r[2] - px) / k, (r[3] - py) / k])
        gt = []
        lab = os.path.join(labels, os.path.basename(img)[:-4] + '.txt')
        for l in open(lab):
            c, cx, cy, w, h = map(float, l.split())
            gt.append([(cx - w / 2) * W, (cy - h / 2) * H, (cx + w / 2) * W, (cy + h / 2) * H])
        libre = set(range(len(gt)))
        for d in dets:
            best = max(libre, key=lambda j: iou(d, gt[j]), default=None)
            if best is not None and iou(d, gt[best]) >= 0.5: tp += 1; libre.discard(best)
            else: fp += 1
        fn += len(libre)
    p = tp / max(1, tp + fp); r = tp / max(1, tp + fn)
    print(f'{os.path.basename(modele)} seuil {seuil}: precision {p:.3f}, rappel {r:.3f}, F1 {2*p*r/max(1e-9,p+r):.3f}, justes {tp}, fausses {fp}, manques {fn}')

if __name__ == '__main__':
    if sys.argv[1] == 'calibrer': calibrer(*sys.argv[2:5])
    else: comparer(*sys.argv[2:5], *([float(sys.argv[5])] if len(sys.argv) > 5 else []))
