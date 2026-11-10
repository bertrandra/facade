# Caracteristiques par pixel du detecteur de volets (src/volets.ts, fonction `caracteristiques`).
# Les deux versions doivent donner les memes valeurs : `verifier` compare un dump TypeScript.
# Entree : RGB uint8 (H, W, 3) ; sortie : (H, W, N) float32, N = NB_CARACTERISTIQUES.
import numpy as np

NB_CARACTERISTIQUES = 12

def moyenne_locale(A, r):
    """Moyenne de A sur la fenetre 2r+1 tronquee aux bords (la meme que la version TypeScript)."""
    H, W = A.shape
    I = np.zeros((H + 1, W + 1), dtype=np.float64)
    I[1:, 1:] = A.cumsum(0).cumsum(1)
    y = np.arange(H); x = np.arange(W)
    y0 = np.maximum(0, y - r); y1 = np.minimum(H, y + r + 1)
    x0 = np.maximum(0, x - r); x1 = np.minimum(W, x + r + 1)
    S = I[y1][:, x1] - I[y0][:, x1] - I[y1][:, x0] + I[y0][:, x0]
    aire = ((y1 - y0)[:, None] * (x1 - x0)[None, :]).astype(np.float64)
    return S / aire

def caracteristiques(rgb, baies):
    """baies : liste de (x, y, l, h) en pixels de l'image de travail."""
    r = rgb[..., 0].astype(np.float64); g = rgb[..., 1].astype(np.float64); b = rgb[..., 2].astype(np.float64)
    L = 0.299 * r + 0.587 * g + 0.114 * b
    H, W = L.shape
    m5 = moyenne_locale(L, 2); m15 = moyenne_locale(L, 7); m41 = moyenne_locale(L, 20)
    sd5 = np.sqrt(np.maximum(0, moyenne_locale(L * L, 2) - m5 * m5))
    # Gradients centres, bords tronques.
    gx = np.zeros_like(L); gy = np.zeros_like(L)
    gx[:, 1:-1] = (L[:, 2:] - L[:, :-2]) / 2; gx[:, 0] = L[:, 1] - L[:, 0]; gx[:, -1] = L[:, -1] - L[:, -2]
    gy[1:-1, :] = (L[2:, :] - L[:-2, :]) / 2; gy[0, :] = L[1, :] - L[0, :]; gy[-1, :] = L[-1, :] - L[-2, :]
    gxm = moyenne_locale(np.abs(gx), 1); gym = moyenne_locale(np.abs(gy), 1)
    # Proximite d'une baie : 1 dans une baie, sinon decroit avec la distance horizontale a sa bordure,
    # dans la bande verticale de la baie (distance normalisee par sa largeur).
    yy, xx = np.mgrid[0:H, 0:W]
    dedans = np.zeros((H, W)); pres = np.zeros((H, W))
    for (bx, by, bl, bh) in baies:
        if bl <= 0 or bh <= 0: continue
        dans = (xx >= bx) & (xx < bx + bl) & (yy >= by) & (yy < by + bh)
        dedans = np.maximum(dedans, dans.astype(np.float64))
        vert = (yy >= by) & (yy < by + bh)
        d = np.where(xx < bx, bx - xx, np.where(xx >= bx + bl, xx - (bx + bl - 1), 0)).astype(np.float64)
        pres = np.maximum(pres, np.where(vert, np.exp(-d / (0.5 * bl)), 0.0))
    F = np.stack([
        L / 255, (r - g) / 255, (b - g) / 255,
        (L - m5) / 255, (L - m15) / 255, (L - m41) / 255,
        sd5 / 255, gxm / 255, gym / 255,
        dedans, pres, np.ones_like(L),
    ], axis=-1)
    return F.astype(np.float32)
