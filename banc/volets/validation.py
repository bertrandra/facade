# Validation croisee du detecteur de volets : CMP (mise au point) + photos fournies, en trois plis.
# Pour chaque pli de photos : entrainement sur le CMP de mise au point et les deux autres plis, puis
# mesure du pli laisse de cote avec le detecteur reel (banc/volets/evaluer.mjs). Le modele n'est
# jamais entraine sur les photos du pli mesure.
#   python3 -I banc/volets/validation.py <lot CMP dev> <baies CMP> <lot photos> <baies photos> <dossier de travail> <plis.json>
import sys, os, json, subprocess, re, shutil
import numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from caracteristiques import caracteristiques, NB_CARACTERISTIQUES

cmp_lot, cmp_baies, pho_lot, pho_baies, travail, plis_f = sys.argv[1:7]
plis = json.load(open(plis_f))
RACINE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
DET = os.path.join(RACINE, 'src', 'volets.ts')
SEUILS = [0.6, 0.7, 0.8, 0.9]

def charger(lot, baies_dir, nom):
    J = json.load(open(os.path.join(lot, nom + '.json')))
    W, H = J['largeur'], J['hauteur']
    rgb = np.frombuffer(open(os.path.join(lot, nom + '.rgba'), 'rb').read(), dtype=np.uint8).reshape(H, W, 4)[..., :3]
    baies = [(b['x'], b['y'], b['l'], b['h']) for b in json.load(open(os.path.join(baies_dir, nom + '.json')))]
    F = caracteristiques(rgb, baies)
    y = np.zeros((H, W), dtype=np.int8); ign = np.zeros((H, W), dtype=bool)
    for g in J['gt']:
        x0, y0 = max(0, g['x']), max(0, g['y']); x1, y1 = min(W, g['x'] + g['l']), min(H, g['y'] + g['h'])
        if g.get('difficile'): ign[y0:y1, x0:x1] = True
        else: y[y0:y1, x0:x1] = 1
    return F, y, ign

def echantillon(sources, rng, par_image=4000):
    X, Y = [], []
    for lot, bd, nom in sources:
        F, y, ign = charger(lot, bd, nom)
        Fm = F.reshape(-1, NB_CARACTERISTIQUES); ym = y.reshape(-1); im = ign.reshape(-1)
        pos = np.flatnonzero((ym == 1) & ~im); neg = np.flatnonzero((ym == 0) & ~im)
        k = par_image // 2
        pos = rng.choice(pos, min(k, len(pos)), replace=False) if len(pos) else pos
        neg = rng.choice(neg, min(par_image - len(pos), len(neg)), replace=False)
        idx = np.concatenate([pos, neg]); X.append(Fm[idx]); Y.append(ym[idx])
    return np.concatenate(X).astype(np.float64), np.concatenate(Y).astype(np.float64)

def entrainer(X, Y, iters=1500):
    sig = lambda z: 1 / (1 + np.exp(-np.clip(z, -30, 30)))
    poids = np.zeros(NB_CARACTERISTIQUES)
    w = np.where(Y == 1, 0.5 / Y.mean(), 0.5 / (1 - Y.mean())); lr = 1.0
    for it in range(iters):
        p = sig(X @ poids)
        poids -= lr * (X.T @ (w * (p - Y)) / w.sum() + 1e-4 * poids)
        if it % 500 == 499: lr *= 0.5
    return poids

def poser(poids):
    src = open(DET).read()
    lit = ', '.join(f'{v:.4f}' for v in poids)
    new = re.sub(r"export const POIDS: number\[\] = \[[^\]]*\];", "export const POIDS: number[] = [" + lit + "];", src, count=1)
    open(DET, 'w').write(new)

def bench(dossier, seuil):
    env = dict(os.environ, VOLETS_SEUIL=str(seuil))
    r = subprocess.run(['node', 'banc/volets/evaluer.mjs', 'banc/volets/detecteur.ts', dossier], cwd=RACINE, env=env, capture_output=True, text=True)
    tp = fp = fn = 0
    for ligne in r.stdout.splitlines():
        m = re.match(r'^(u\d+)\s+\S+\s+\S+\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+', ligne)
        if m:
            tp += int(m.group(4)); fp += int(m.group(5)); fn += int(m.group(6))
    return tp, fp, fn

sauvegarde = open(DET).read()
rng = np.random.default_rng(20261110)
resultats = {s: [0, 0, 0] for s in SEUILS}
try:
    for k, tests in plis.items():
        entr = [(cmp_lot, cmp_baies, n) for n in sorted(f[:-5] for f in os.listdir(cmp_lot) if f.endswith('.json'))]
        entr += [(pho_lot, pho_baies, n) for n in sum([v for kk, v in plis.items() if kk != k], [])]
        X, Y = echantillon(entr, rng)
        poids = entrainer(X, Y)
        poser(poids)
        dossier = os.path.join(travail, 'pli' + k)
        shutil.rmtree(dossier, ignore_errors=True); os.makedirs(dossier)
        for n in tests:
            for ext in ('.json', '.rgba'): shutil.copy(os.path.join(pho_lot, n + ext), dossier)
        for s in SEUILS:
            tp, fp, fn = bench(dossier, s)
            resultats[s][0] += tp; resultats[s][1] += fp; resultats[s][2] += fn
            print(f'pli {k} seuil {s} : justes {tp}, fausses {fp}, manques {fn}', flush=True)
finally:
    open(DET, 'w').write(sauvegarde)
print('--- total des trois plis (volets de photos jamais vus a l entrainement)')
for s, (tp, fp, fn) in resultats.items():
    print(f'seuil {s} : rappel {tp / max(1, tp + fn):.1%}, precision {tp / max(1, tp + fp):.1%}, justes {tp}/{tp + fn}, fausses {fp}')
