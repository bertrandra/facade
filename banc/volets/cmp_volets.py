# Convertit le jeu CMP Facade en echantillons de volets pour le banc (meme format que cmp_convertir.py) :
# les volets (classe 8, « blind » dans label_names.txt) sont les boites a trouver. Selection
# reproductible : les images qui ont au moins un volet, melangees par graine, coupees en deux jeux :
#   volets-dev    : la mise au point (on y regarde, on y regle) ;
#   volets-final  : tenu a l'ecart (on ne le regarde qu'une fois la version figee) ;
#   volets-ctrl   : controle neuf, pris apres les deux autres (pour choisir un seuil sans toucher au final).
# Usage : python3 -I banc/volets/cmp_volets.py <dossier base/ du jeu CMP> <dossier de sortie> [n_dev] [n_final] [n_ctrl]
import re, sys, os, json, glob, random
import numpy as np
from PIL import Image

LABEL_VOLET = 8   # label_names.txt : 8 blind
LABEL_FENETRE = 3
base, sortie = sys.argv[1], sys.argv[2]
n_dev = int(sys.argv[3]) if len(sys.argv) > 3 else 40
n_fin = int(sys.argv[4]) if len(sys.argv) > 4 else 40
n_ctrl = int(sys.argv[5]) if len(sys.argv) > 5 else 40

def objets(xml):
    t = open(xml, encoding='latin-1').read()
    res = []
    for o in re.findall(r'<object>(.*?)</object>', t, re.S):
        xs = [float(v) for v in re.findall(r'<x>\s*([-\d.eE]+)\s*</x>', o)]
        ys = [float(v) for v in re.findall(r'<y>\s*([-\d.eE]+)\s*</y>', o)]
        lab = int(re.search(r'<label>\s*(\d+)\s*</label>', o).group(1))
        if len(xs) >= 2 and len(ys) >= 2:
            res.append((lab, min(ys), max(ys), min(xs), max(xs)))  # <x> = ligne, <y> = colonne
    return res

eligibles = []
for xml in sorted(glob.glob(os.path.join(base, '*.xml'))):
    nom = os.path.basename(xml)[:-4]
    if any(o[0] == LABEL_VOLET for o in objets(xml)) and os.path.exists(os.path.join(base, nom + '.jpg')):
        eligibles.append(nom)
random.Random(20261110).shuffle(eligibles)
lots = {'volets-dev': eligibles[:n_dev], 'volets-final': eligibles[n_dev:n_dev + n_fin], 'volets-ctrl': eligibles[n_dev + n_fin:n_dev + n_fin + n_ctrl]}
for nom_lot, noms in lots.items():
    d = os.path.join(sortie, nom_lot)
    os.makedirs(d, exist_ok=True)
    for nom in noms:
        im = Image.open(os.path.join(base, nom + '.jpg')).convert('RGBA')
        W, H = im.size
        gt = []
        for lab, c0, c1, l0, l1 in objets(os.path.join(base, nom + '.xml')):
            if lab != LABEL_VOLET: continue
            b = {'x': round(c0 * W), 'y': round(l0 * H), 'l': round((c1 - c0) * W), 'h': round((l1 - l0) * H)}
            if b['l'] < 3 or b['h'] < 3: continue
            b['classe'] = 'volet'
            if b['l'] < 14 or b['h'] < 14: b['difficile'] = True
            gt.append(b)
        open(os.path.join(d, nom + '.rgba'), 'wb').write(np.asarray(im).tobytes())
        json.dump({'nom': nom, 'groupe': 'cmp', 'largeur': W, 'hauteur': H, 'pxParM': None, 'gt': gt, 'ignorer': []},
                  open(os.path.join(d, nom + '.json'), 'w'))
    print(nom_lot, len(noms), 'images ; volets :', sum(len([g for g in json.load(open(os.path.join(d, n + '.json')))['gt']]) for n in noms))
print(len(eligibles), 'eligibles')
