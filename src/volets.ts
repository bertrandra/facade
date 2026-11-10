// Les volets de la facade redressee de facade.html : une bulle a part, qui ne connait ni les baies
// (`baies.ts`), ni la forme, ni les gouttieres. Elle ne regarde que l'image.
//
// Un volet est un bloc sombre, etroit et haut, plus sombre que le mur, a lames ou plein. Sur une
// facade on en trouve deux par baie (de part et d'autre), de meme hauteur que la baie. Methode :
//
//   1. la luminance du mur : la plus forte concentration de luminance hors ciel (histogramme lisse) ;
//      un pixel est « sombre » s'il est nettement plus sombre que ce mur ;
//   2. fermeture verticale (les lames, les lignes de joint, ne coupent pas le volet) puis ouverture
//      horizontale et verticale (un meneau ou une tablette, plus fin que le volet, disparait) ;
//   3. les composantes connexes du masque : une boite par bloc ;
//   4. tri : hauteur et largeur dans des bornes (en metres avec l'echelle, en part de l'image
//      sinon), forme haute et etroite, remplissage du bloc, et un jumeau de meme taille a cote ;
//   5. un seul bloc par endroit (le plus sur).
//
// Limites : un volet aussi clair que le mur est invisible ; une fenetre sombre, etroite, peut
// passer pour un volet (un jumeau la confirme) ; un volet ouvert (de biais) n'est pas redresse.

import type { Image } from './auto.js';

export interface Volet {
  /** Boite en pixels de l'image. */
  px: { x: number; y: number; l: number; h: number };
  /** `persienne` : a lames (des lames claires le traversent) ; `plein` : un panneau sombre. */
  type: 'persienne' | 'plein';
  /** Un volet jumeau lui fait face, de l'autre cote d'une baie. */
  paire: boolean;
  /** 0 a 1. */
  confiance: number;
}
export interface ResultatVolets {
  volets: Volet[];
}

const TRAVAIL = 1000;

interface Travail {
  W: number;
  H: number;
  s: number;
  L: Float32Array;
  ciel: Uint8Array;
  ok: Uint8Array;
}

function reduire(img: Image, vu: Uint8Array | null): Travail {
  const s = Math.min(1, TRAVAIL / Math.max(img.largeur, img.hauteur));
  const W = Math.max(1, Math.round(img.largeur * s)),
    H = Math.max(1, Math.round(img.hauteur * s));
  const L = new Float32Array(W * H),
    ciel = new Uint8Array(W * H),
    ok = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) {
    const y0 = Math.floor((y * img.hauteur) / H),
      y1 = Math.max(y0 + 1, Math.floor(((y + 1) * img.hauteur) / H));
    for (let x = 0; x < W; x++) {
      const x0 = Math.floor((x * img.largeur) / W),
        x1 = Math.max(x0 + 1, Math.floor(((x + 1) * img.largeur) / W));
      let r = 0,
        g = 0,
        b = 0,
        n = 0,
        v = 0;
      for (let j = y0; j < y1; j++)
        for (let i = x0; i < x1; i++) {
          const o = j * img.largeur + i;
          r += img.donnees[o * 4]!;
          g += img.donnees[o * 4 + 1]!;
          b += img.donnees[o * 4 + 2]!;
          v += vu ? vu[o]! : 1;
          n++;
        }
      r /= n;
      g /= n;
      b /= n;
      const k = y * W + x;
      L[k] = 0.299 * r + 0.587 * g + 0.114 * b;
      // Ciel : bleu et clair.
      ciel[k] = b - r > 25 && b > g && L[k]! > 120 ? 1 : 0;
      ok[k] = v * 2 >= n ? 1 : 0;
    }
  }
  return { W, H, s, L, ciel, ok };
}

/** Luminance du mur : un centile haut de la luminance hors ciel (le mur est le plus clair des plages larges ; les fenetres et les ombres sont dessous). */
function luminanceMur(t: Travail, centile = 0.7): number {
  const hist = new Float64Array(256);
  let n = 0;
  for (let i = 0; i < t.W * t.H; i++)
    if (t.ok[i] && !t.ciel[i]) {
      hist[Math.min(255, Math.max(0, Math.floor(t.L[i]!)))]! += 1;
      n++;
    }
  if (!n) return 128;
  let cum = 0;
  for (let v = 0; v < 256; v++) {
    cum += hist[v]!;
    if (cum >= centile * n) return v;
  }
  return 255;
}

/** Fermeture (dilatation puis erosion) le long d'un axe : comble les trous de moins de `r` pixels. */
function fermer(m: Uint8Array<ArrayBuffer>, W: number, H: number, r: number, vertical: boolean): Uint8Array<ArrayBuffer> {
  if (r <= 0) return m;
  const dil = new Uint8Array(W * H);
  // Dilatation : un pixel allume s'etend de r de chaque cote, sur l'axe.
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      if (!m[y * W + x]) continue;
      for (let d = -r; d <= r; d++) {
        const xx = vertical ? x : x + d,
          yy = vertical ? y + d : y;
        if (xx >= 0 && xx < W && yy >= 0 && yy < H) dil[yy * W + xx] = 1;
      }
    }
  // Erosion : un pixel reste allume si ses voisins sur l'axe le sont tous.
  const out = new Uint8Array(W * H);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      if (!dil[y * W + x]) continue;
      let plein = true;
      for (let d = -r; d <= r && plein; d++) {
        const xx = vertical ? x : x + d,
          yy = vertical ? y + d : y;
        if (xx < 0 || xx >= W || yy < 0 || yy >= H || !dil[yy * W + xx]) plein = false;
      }
      if (plein) out[y * W + x] = 1;
    }
  return out;
}

/** Ouverture (erosion puis dilatation) le long d'un axe : retire ce qui est plus fin que `r`. */
function ouvrir(m: Uint8Array<ArrayBuffer>, W: number, H: number, r: number, vertical: boolean): Uint8Array<ArrayBuffer> {
  if (r <= 0) return m;
  const ero = new Uint8Array(W * H);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      let plein = true;
      for (let d = -r; d <= r && plein; d++) {
        const xx = vertical ? x : x + d,
          yy = vertical ? y + d : y;
        if (xx < 0 || xx >= W || yy < 0 || yy >= H || !m[yy * W + xx]) plein = false;
      }
      if (plein) ero[y * W + x] = 1;
    }
  const out = new Uint8Array(W * H);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      if (!ero[y * W + x]) continue;
      for (let d = -r; d <= r; d++) {
        const xx = vertical ? x : x + d,
          yy = vertical ? y + d : y;
        if (xx >= 0 && xx < W && yy >= 0 && yy < H) out[yy * W + xx] = 1;
      }
    }
  return out;
}

interface Bloc {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  aire: number;
}

/** Composantes connexes (4-voisinage) : boite et aire. */
function blocs(m: Uint8Array<ArrayBuffer>, W: number, H: number): Bloc[] {
  const vu = new Uint8Array(W * H);
  const pile = new Int32Array(W * H);
  const res: Bloc[] = [];
  for (let i0 = 0; i0 < W * H; i0++) {
    if (!m[i0] || vu[i0]) continue;
    let sp = 0,
      aire = 0,
      x0 = W,
      y0 = H,
      x1 = 0,
      y1 = 0;
    pile[sp++] = i0;
    vu[i0] = 1;
    while (sp) {
      const i = pile[--sp]!;
      const x = i % W,
        y = (i - x) / W;
      aire++;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
      if (x > 0 && m[i - 1] && !vu[i - 1]) ((vu[i - 1] = 1), (pile[sp++] = i - 1));
      if (x < W - 1 && m[i + 1] && !vu[i + 1]) ((vu[i + 1] = 1), (pile[sp++] = i + 1));
      if (y > 0 && m[i - W] && !vu[i - W]) ((vu[i - W] = 1), (pile[sp++] = i - W));
      if (y < H - 1 && m[i + W] && !vu[i + W]) ((vu[i + W] = 1), (pile[sp++] = i + W));
    }
    res.push({ x0, y0, x1: x1 + 1, y1: y1 + 1, aire });
  }
  return res;
}

export function detecterVolets(img: Image, vu: Uint8Array | null, pxParM: number | null): ResultatVolets {
  if (img.largeur < 16 || img.hauteur < 16) return { volets: [] };
  const t = reduire(img, vu);
  const { W, H } = t;
  const n = W * H;
  const lm = luminanceMur(t);
  const DELTA = 60;
  // Sombre : nettement plus sombre que le mur, pas du ciel.
  let m = new Uint8Array(n);
  for (let i = 0; i < n; i++) if (t.ok[i] && !t.ciel[i] && t.L[i]! < lm - DELTA) m[i] = 1;
  m = fermer(m, W, H, Math.max(2, Math.round(H * 0.02)), true);
  m = ouvrir(m, W, H, Math.max(2, Math.round(W * 0.006)), false);
  m = ouvrir(m, W, H, Math.max(2, Math.round(H * 0.01)), true);

  // Tailles admises : en metres si l'echelle est connue (px de travail par metre), sinon en part de l'image.
  const pm = pxParM ? pxParM * t.s : null;
  const lMin = pm ? 0.2 * pm : W * 0.012,
    lMax = pm ? 1.1 * pm : W * 0.12,
    hMin = pm ? 0.8 * pm : H * 0.06,
    hMax = pm ? 3.2 * pm : H * 0.4;

  const candidats: { x0: number; y0: number; x1: number; y1: number; fill: number; score: number; paire: boolean }[] = [];
  for (const b of blocs(m, W, H)) {
    const l = b.x1 - b.x0,
      h = b.y1 - b.y0;
    if (l < lMin || l > lMax || h < hMin || h > hMax) continue;
    const fill = b.aire / (l * h);
    const asp = h / l;
    if (fill < 0.6 || asp < 1.3 || asp > 7) continue;
    candidats.push({ ...b, fill, score: fill, paire: false });
  }
  // Un jumeau : meme hauteur (a 15 % pres), bords alignes en haut, a moins d'une largeur d'ecart.
  for (const a of candidats)
    for (const c of candidats) {
      if (a === c) continue;
      const ha = a.y1 - a.y0,
        hc = c.y1 - c.y0;
      if (Math.abs(a.y0 - c.y0) > 0.1 * ha || Math.abs(ha - hc) > 0.15 * ha) continue;
      const ecart = Math.max(a.x0, c.x0) - Math.min(a.x1, c.x1);
      if (ecart >= 0 && ecart <= Math.max(a.x1 - a.x0, c.x1 - c.x0)) a.paire = true;
    }
  for (const a of candidats) a.score = 0.6 * a.fill + (a.paire ? 0.4 : 0);

  // Un seul bloc par endroit : le plus sur d'abord.
  const retenus: typeof candidats = [];
  for (const a of candidats.sort((p, q) => q.score - p.score)) {
    const aa = (a.x1 - a.x0) * (a.y1 - a.y0);
    const gene = retenus.some((b) => {
      const ix = Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0),
        iy = Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0);
      return ix > 0 && iy > 0 && (ix * iy) / Math.min(aa, (b.x1 - b.x0) * (b.y1 - b.y0)) > 0.3;
    });
    if (!gene) retenus.push(a);
  }
  retenus.sort((p, q) => p.y0 - q.y0 || p.x0 - q.x0);
  const k = 1 / t.s;
  return {
    volets: retenus.map((a) => ({
      px: { x: a.x0 * k, y: a.y0 * k, l: (a.x1 - a.x0) * k, h: (a.y1 - a.y0) * k },
      type: 'plein',
      paire: a.paire,
      confiance: Math.round(a.score * 100) / 100,
    })),
  };
}
