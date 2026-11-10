# Jeu YOLO des fenetres et portes (CMP Facade) : deux classes, 0 = fenetre (label 3), 1 = porte (label 4).
# Decoupage fixe dans split.json : train / val (controle) / test (lot final et reserve des volets, jamais
# utilises pour entrainer ce modele). Les etiquettes CMP : <y> = colonne (fraction de la largeur),
# <x> = ligne (fraction de la hauteur).
#   python3 -I banc/fenetres/yolo_jeu.py <dossier base/ CMP> <dossier de sortie>
import sys, os, re, json, shutil
from PIL import Image

base, sortie = sys.argv[1:3]
split = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'split.json')))
CLASSES = {3: 0, 4: 1}

def objets(xml):
    t = open(xml, encoding='latin-1').read(); out = []
    for o in re.findall(r'<object>(.*?)</object>', t, re.S):
        lab = int(re.search(r'<label>\s*(\d+)\s*</label>', o).group(1))
        xs = [float(v) for v in re.findall(r'<x>\s*([-\d.eE]+)\s*</x>', o)]
        ys = [float(v) for v in re.findall(r'<y>\s*([-\d.eE]+)\s*</y>', o)]
        if lab in CLASSES and len(xs) >= 2 and len(ys) >= 2:
            out.append((CLASSES[lab], min(ys), max(ys), min(xs), max(xs)))
    return out

compte = {}
for lot in ('train', 'val', 'test'):
    d_img = os.path.join(sortie, 'images', lot); d_lab = os.path.join(sortie, 'labels', lot)
    os.makedirs(d_img, exist_ok=True); os.makedirs(d_lab, exist_ok=True)
    for nom in split[lot]:
        src = os.path.join(base, nom + '.jpg')
        W, H = Image.open(src).size
        shutil.copy(src, os.path.join(d_img, nom + '.jpg'))
        with open(os.path.join(d_lab, nom + '.txt'), 'w') as f:
            for c, c0, c1, l0, l1 in objets(os.path.join(base, nom + '.xml')):
                x0, x1, y0, y1 = c0 * W, c1 * W, l0 * H, l1 * H
                if x1 - x0 < 3 or y1 - y0 < 3: continue
                f.write(f"{c} {(x0 + x1) / 2 / W:.6f} {(y0 + y1) / 2 / H:.6f} {(x1 - x0) / W:.6f} {(y1 - y0) / H:.6f}\n")
        compte[lot] = compte.get(lot, 0) + 1
with open(os.path.join(sortie, 'fenetres.yaml'), 'w') as f:
    f.write(f"path: {os.path.abspath(sortie)}\ntrain: images/train\nval: images/val\ntest: images/test\nnames:\n  0: fenetre\n  1: porte\n")
print(compte)
