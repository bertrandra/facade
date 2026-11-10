# Entraine la regression logistique du detecteur de volets (pixels : volet ou non).
# Donnees : un lot du banc (rgba + json) et les ouvertures trouvees par le code de facade
# (un json par image, dans <baies>/), produites une fois par banc/volets/dump_baies.ts.
# Moitie A du lot : entrainement. Moitie B : controle, jamais vue pendant l'entrainement.
#   python3 -I banc/volets/entrainer.py <lot> <baies> <sortie.json>
import sys, os, json, glob
import numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from caracteristiques import caracteristiques, NB_CARACTERISTIQUES

lot, baies_dir, sortie = sys.argv[1:4]
noms = sorted(os.path.basename(f)[:-5] for f in glob.glob(os.path.join(lot, '*.json')))
moitie_a, moitie_b = noms[0::2], noms[1::2]

def charger(nom):
    J = json.load(open(os.path.join(lot, nom + '.json')))
    W, H = J['largeur'], J['hauteur']
    rgb = np.frombuffer(open(os.path.join(lot, nom + '.rgba'), 'rb').read(), dtype=np.uint8).reshape(H, W, 4)[..., :3]
    baies = [(b['x'], b['y'], b['l'], b['h']) for b in json.load(open(os.path.join(baies_dir, nom + '.json')))]
    F = caracteristiques(rgb, baies)
    y = np.zeros((H, W), dtype=np.int8)
    ignore = np.zeros((H, W), dtype=bool)
    for g in J['gt']:
        x0, y0 = max(0, g['x']), max(0, g['y']); x1, y1 = min(W, g['x'] + g['l']), min(H, g['y'] + g['h'])
        if g.get('difficile'):
            ignore[y0:y1, x0:x1] = True
        else:
            y[y0:y1, x0:x1] = 1
    return F, y, ignore

def echantillon(noms_, rng, par_image=4000):
    X, Y = [], []
    for nom in noms_:
        F, y, ignore = charger(nom)
        Fm = F.reshape(-1, NB_CARACTERISTIQUES); ym = y.reshape(-1); im = ignore.reshape(-1)
        pos = np.flatnonzero((ym == 1) & ~im); neg = np.flatnonzero((ym == 0) & ~im)
        k = par_image // 2
        pos = rng.choice(pos, min(k, len(pos)), replace=False) if len(pos) else pos
        neg = rng.choice(neg, min(par_image - len(pos), len(neg)), replace=False)
        idx = np.concatenate([pos, neg])
        X.append(Fm[idx]); Y.append(ym[idx])
    return np.concatenate(X).astype(np.float64), np.concatenate(Y).astype(np.float64)

def sigmoide(z):
    return 1 / (1 + np.exp(-np.clip(z, -30, 30)))

rng = np.random.default_rng(20261110)
X, Y = echantillon(moitie_a, rng)
# Regression logistique : une probabilite par pixel, sans couche cachee (un reseau a 16 neurones
# n'a pas fait mieux sur le controle, et son poids est plus difficile a relire dans src/volets.ts).
poids = np.zeros(NB_CARACTERISTIQUES)
w_cls = np.where(Y == 1, 0.5 / Y.mean(), 0.5 / (1 - Y.mean()))
lr = 1.0
for it in range(1500):
    p = sigmoide(X @ poids)
    grad = X.T @ (w_cls * (p - Y)) / w_cls.sum() + 1e-4 * poids
    poids -= lr * grad
    if it % 500 == 499: lr *= 0.5

def prob(F):
    return sigmoide(F @ poids)

# Controle sur la moitie B : F1 des pixels, a plusieurs seuils.
for seuil in (0.5, 0.85):
    tp = fp = fn = 0
    for nom in moitie_b:
        F, y, ignore = charger(nom)
        pp = prob(F.reshape(-1, NB_CARACTERISTIQUES).astype(np.float64)).reshape(y.shape)
        pr = (pp > seuil) & ~ignore; vr = (y == 1) & ~ignore
        tp += (pr & vr).sum(); fp += (pr & ~vr).sum(); fn += (~pr & vr).sum()
    f1 = 2 * tp / max(1, 2 * tp + fp + fn)
    print(f'controle (moitie B, {len(moitie_b)} images), seuil {seuil} : F1 pixels {f1:.3f}, precision {tp / max(1, tp + fp):.3f}, rappel {tp / max(1, tp + fn):.3f}')
json.dump({'poids': [float(v) for v in poids], 'entrainement': moitie_a, 'controle': moitie_b}, open(sortie, 'w'), indent=1)
print('poids :', ', '.join(f'{v:.4f}' for v in poids))
