# Prepare le jeu YOLO (format Ultralytics) du detecteur de volets : une classe, « volet ».
# Decoupage (une seule fois, fixe) :
#   entrainement : CMP de mise au point + photos des plis 0 et 1
#   validation   : CMP de controle (arret de l'entrainement)
#   test         : photos du pli 2 + CMP final (jamais vus a l'entrainement)
#   reserve      : 25 images CMP non utilisees (non touchees)
#   python3 -I banc/volets/yolo_jeu.py <dossier base/ CMP> <lots CMP: dossier> <dossier de sortie>
import sys, os, json, shutil
from PIL import Image

base, lots, sortie = sys.argv[1:4]
PLIS = json.load(open(sys.argv[4])) if len(sys.argv) > 4 else None
ph = json.load(open('banc/volets/annotations/photos-volets.json'))['images']
photos = {i['nom']: i for i in ph}

def ecrire(nom, img_src, gt, W, H, dossier, split):
    dst = os.path.join(sortie, 'images', split); lab = os.path.join(sortie, 'labels', split)
    os.makedirs(dst, exist_ok=True); os.makedirs(lab, exist_ok=True)
    shutil.copy(img_src, os.path.join(dst, nom + '.jpg'))
    with open(os.path.join(lab, nom + '.txt'), 'w') as f:
        for g in gt:
            cx = (g['x'] + g['l'] / 2) / W; cy = (g['y'] + g['h'] / 2) / H
            f.write(f"0 {cx:.6f} {cy:.6f} {g['l'] / W:.6f} {g['h'] / H:.6f}\n")

def lot_cmp(nom_lot):
    for f in sorted(os.listdir(os.path.join(lots, nom_lot))):
        if not f.endswith('.json'): continue
        J = json.load(open(os.path.join(lots, nom_lot, f)))
        yield J['nom'], os.path.join(base, J['nom'] + '.jpg'), J['gt'], J['largeur'], J['hauteur']

os.makedirs(sortie, exist_ok=True)
compte = {}
for nom, src, gt, W, H in lot_cmp('volets-dev'):
    ecrire('cmp_' + nom, src, gt, W, H, sortie, 'train'); compte['train_cmp'] = compte.get('train_cmp', 0) + 1
for nom, src, gt, W, H in lot_cmp('volets-ctrl'):
    ecrire('cmp_' + nom, src, gt, W, H, sortie, 'val'); compte['val_cmp'] = compte.get('val_cmp', 0) + 1
for nom, src, gt, W, H in lot_cmp('volets-final'):
    ecrire('cmp_' + nom, src, gt, W, H, sortie, 'test'); compte['test_cmp'] = compte.get('test_cmp', 0) + 1
folds = json.load(open(sys.argv[5])) if len(sys.argv) > 5 else {'0': [], '1': [], '2': []}
for k, noms in folds.items():
    split = 'test' if k == '2' else 'train'
    for n in noms:
        i = photos[n]
        ecrire('pho_' + n, i['fichier'], i['gt'], i['largeur'], i['hauteur'], sortie, split)
        compte[split + '_photos'] = compte.get(split + '_photos', 0) + 1
with open(os.path.join(sortie, 'volets.yaml'), 'w') as f:
    f.write(f"path: {os.path.abspath(sortie)}\ntrain: images/train\nval: images/val\ntest: images/test\nnames:\n  0: volet\n")
print(compte)
