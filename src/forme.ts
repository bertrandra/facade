// La forme de la facade redressee de facade.html : le sol, l'egout, le pignon et le contour haut du
// toit, quand ils sont visibles. Une bulle a part : elle ne connait ni les baies, ni les volets, ni les
// gouttieres ; elle ne regarde que l'image.
//
// Principe : le mur est la plage de la couleur la plus frequente, hors ciel. Ses bords sont des
// profils (une valeur par colonne) :
//   - le haut du mur (profil haut) : l'egout est sa plus longue portion horizontale ; le pignon, la
//     partie au-dessus de l'egout, en deux pans qui se rejoignent au faite ;
//   - le bas du mur (profil bas) : le sol, quand il est une ligne horizontale qui ne touche pas le
//     bord de l'image ;
//   - le contour haut du toit : le haut de tout ce qui n'est pas ciel, quand il passe au-dessus du mur.
// Un profil ne retient une valeur que si la plage du mur y est dense (un trou de fenetre ne coupe
// pas le contour). Chaque trait est simplifie (Douglas-Peucker) et noté.
//
// Limites : un mur de la couleur du ciel ou du toit n'est pas vu ; un pignon a l'ombre d'un toit
// deborde n'est vu qu'en partie ; sans ciel, le toit n'est pas cherche (le bord de l'image est le haut).

import type { Image } from './auto.js';

export type TypeForme = 'sol' | 'egout' | 'pignon' | 'toit';
export interface Forme {
  type: TypeForme;
  /** Points en pixels de l'image (une polyligne). */
  points: { x: number; y: number }[];
  /** 0 a 1. */
  confiance: number;
}
export interface ResultatFormes {
  formes: Forme[];
}

const TRAVAIL = 600;

interface Travail {
  W: number;
  H: number;
  s: number;
  r: Float32Array;
  g: Float32Array;
  b: Float32Array;
  ok: Uint8Array;
}

function reduire(img: Image, vu: Uint8Array | null): Travail {
  const s = Math.min(1, TRAVAIL / Math.max(img.largeur, img.hauteur));
  const W = Math.max(1, Math.round(img.largeur * s)),
    H = Math.max(1, Math.round(img.hauteur * s));
  const r = new Float32Array(W * H),
    g = new Float32Array(W * H),
    b = new Float32Array(W * H),
    ok = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) {
    const y0 = Math.floor((y * img.hauteur) / H),
      y1 = Math.max(y0 + 1, Math.floor(((y + 1) * img.hauteur) / H));
    for (let x = 0; x < W; x++) {
      const x0 = Math.floor((x * img.largeur) / W),
        x1 = Math.max(x0 + 1, Math.floor(((x + 1) * img.largeur) / W));
      let a = 0,
        c = 0,
        d = 0,
        n = 0,
        v = 0;
      for (let j = y0; j < y1; j++)
        for (let i = x0; i < x1; i++) {
          const o = j * img.largeur + i;
          a += img.donnees[o * 4]!;
          c += img.donnees[o * 4 + 1]!;
          d += img.donnees[o * 4 + 2]!;
          v += vu ? vu[o]! : 1;
          n++;
        }
      const k = y * W + x;
      r[k] = a / n;
      g[k] = c / n;
      b[k] = d / n;
      ok[k] = v * 2 >= n ? 1 : 0;
    }
  }
  return { W, H, s, r, g, b, ok };
}

/** Ciel : bleu et clair. */
const estCiel = (r: number, g: number, b: number) => b - r > 35 && b > g && 0.299 * r + 0.587 * g + 0.114 * b > 110;

/** Couleur du mur : la plus frequente parmi les pixels qui ne sont pas du ciel. */
function couleurMur(t: Travail): [number, number, number] {
  const n = t.W * t.H;
  const cnt = new Int32Array(512),
    sr = new Float64Array(512),
    sg = new Float64Array(512),
    sb = new Float64Array(512);
  for (let i = 0; i < n; i++) {
    if (!t.ok[i] || estCiel(t.r[i]!, t.g[i]!, t.b[i]!)) continue;
    const k = ((t.r[i]! >> 5) << 6) | ((t.g[i]! >> 5) << 3) | (t.b[i]! >> 5);
    cnt[k]!++;
    sr[k]! += t.r[i]!;
    sg[k]! += t.g[i]!;
    sb[k]! += t.b[i]!;
  }
  let m = 0;
  for (let k = 1; k < 512; k++) if (cnt[k]! > cnt[m]!) m = k;
  const c = Math.max(1, cnt[m]!);
  return [sr[m]! / c, sg[m]! / c, sb[m]! / c];
}

/** Profil d'une plage de pixels (masque) : haut (dessus = true) ou bas, une valeur par colonne, -1 si absente. */
function profil(masque: Uint8Array, valide: Uint8Array, W: number, H: number, fenetre: number, dessus: boolean, seuil = 0.5): Int32Array {
  const P = new Int32Array(W); // P[x] : colonne, valeur de y
  // Sommes verticales cumulees par colonne.
  const cum = new Int32Array((H + 1) * W);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) cum[(y + 1) * W + x] = cum[y * W + x]! + (masque[y * W + x] ? 1 : 0);
  for (let x = 0; x < W; x++) {
    P[x] = -1;
    if (dessus) {
      for (let y = 0; y + fenetre <= H; y++) {
        if (!masque[y * W + x] || !valide[y * W + x]) continue;
        const dens = (cum[(y + fenetre) * W + x]! - cum[y * W + x]!) / fenetre;
        if (dens >= seuil) {
          P[x] = y;
          break;
        }
      }
    } else {
      for (let y = H - 1; y - fenetre >= -1; y--) {
        if (!masque[y * W + x] || !valide[y * W + x]) continue;
        const dens = (cum[(y + 1) * W + x]! - cum[(y + 1 - fenetre) * W + x]!) / fenetre;
        if (dens >= seuil) {
          P[x] = y;
          break;
        }
      }
    }
  }
  return P;
}

/** Toutes les suites de colonnes dont la valeur varie de moins de `tol` (les trous de `pont` colonnes sont franchis), d'au moins `minLong` colonnes. */
function platsTous(P: Int32Array, W: number, tol: number, pont: number, minLong: number): { x0: number; x1: number; y: number }[] {
  const runs: { x0: number; x1: number; y: number }[] = [];
  let x0 = -1,
    x1 = -1,
    ys: number[] = [];
  const fermer = () => {
    if (x0 >= 0 && x1 - x0 + 1 >= minLong) {
      ys.sort((a, b) => a - b);
      runs.push({ x0, x1, y: ys[ys.length >> 1]! });
    }
    x0 = -1;
    ys = [];
  };
  let dernierValide = -1;
  for (let x = 0; x < W; x++) {
    const y = P[x]!;
    if (y < 0) continue;
    if (x0 >= 0 && (x - dernierValide > pont + 1 || Math.abs(y - ys[ys.length >> 1]!) > tol)) fermer();
    if (x0 < 0) x0 = x;
    ys.push(y);
    x1 = x;
    dernierValide = x;
  }
  fermer();
  return runs;
}

/** Douglas-Peucker sur une suite de points (x, y). */
function simplifier(pts: { x: number; y: number }[], eps: number): { x: number; y: number }[] {
  if (pts.length < 3) return pts;
  const a = pts[0]!,
    b = pts[pts.length - 1]!;
  let imax = 0,
    dmax = -1;
  const dx = b.x - a.x,
    dy = b.y - a.y,
    n = Math.hypot(dx, dy) || 1;
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i]!;
    const d = Math.abs(dy * (p.x - a.x) - dx * (p.y - a.y)) / n;
    if (d > dmax) ((dmax = d), (imax = i));
  }
  if (dmax <= eps) return [a, b];
  const g = simplifier(pts.slice(0, imax + 1), eps),
    d = simplifier(pts.slice(imax), eps);
  return [...g.slice(0, -1), ...d];
}

/** Moindres carres y = a x + b sur des points. */
function droiteMC(pts: { x: number; y: number }[]): { a: number; b: number; rms: number } {
  const n = pts.length;
  let sx = 0,
    sy = 0,
    sxx = 0,
    sxy = 0;
  for (const p of pts) {
    sx += p.x;
    sy += p.y;
    sxx += p.x * p.x;
    sxy += p.x * p.y;
  }
  const den = n * sxx - sx * sx || 1;
  const a = (n * sxy - sx * sy) / den,
    b = (sy - a * sx) / n;
  let e = 0;
  for (const p of pts) e += (p.y - a * p.x - b) ** 2;
  return { a, b, rms: Math.sqrt(e / n) };
}

export function detecterFormes(img: Image, vu: Uint8Array | null, _pxParM: number | null): ResultatFormes {
  if (img.largeur < 16 || img.hauteur < 16) return { formes: [] };
  const t = reduire(img, vu);
  const { W, H } = t;
  const n = W * H;
  const mur = couleurMur(t);
  const estMur = new Uint8Array(n),
    estNonCiel = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    if (!t.ok[i]) continue;
    const r = t.r[i]!,
      g = t.g[i]!,
      b = t.b[i]!;
    if (!estCiel(r, g, b)) estNonCiel[i] = 1;
    if (!estCiel(r, g, b) && Math.hypot(r - mur[0], g - mur[1], b - mur[2]) < 40) estMur[i] = 1;
  }
  const fenetre = Math.max(3, Math.round(H * 0.05));
  const tol = 0.012 * H;
  const formes: Forme[] = [];
  const k = 1 / t.s;
  const versImage = (pts: { x: number; y: number }[]) => pts.map((p) => ({ x: p.x * k, y: p.y * k }));

  // Profils du mur.
  const haut = profil(estMur, t.ok, W, H, fenetre, true);
  const bas = profil(estMur, t.ok, W, H, fenetre, false);
  const couvert = haut.filter((y) => y >= 0).length / W;
  if (couvert < 0.2) return { formes };

  // Egout : les portions horizontales du haut du mur, au niveau de la plus longue (un egout de chaque cote
  // d'un pignon), sur au moins un sixieme de la largeur chacune.
  const portions = platsTous(haut, W, tol, 3, 0.15 * W);
  const egouts = portions.length ? portions.filter((p) => Math.abs(p.y - (portions.reduce((a, b) => (b.x1 - b.x0 > a.x1 - a.x0 ? b : a)).y)) <= tol) : [];
  const egout = egouts.length ? egouts.reduce((a, b) => (b.x1 - b.x0 > a.x1 - a.x0 ? b : a)) : null;
  for (const e of egouts) {
    const conf = Math.min(1, (e.x1 - e.x0) / W + 0.3);
    formes.push({ type: 'egout', points: versImage([{ x: e.x0, y: e.y }, { x: e.x1, y: e.y }]), confiance: Math.round(conf * 100) / 100 });
  }

  // Sol : la plus longue portion horizontale du bas du mur, qui ne touche pas le bord de l'image.
  const sol = platsTous(bas, W, tol, 3, 0.3 * W).reduce<{ x0: number; x1: number; y: number } | null>((a, b) => (!a || b.x1 - b.x0 > a.x1 - a.x0 ? b : a), null);
  if (sol && sol.y < H - 0.03 * H && sol.y > 0.03 * H) {
    const L = sol.x1 - sol.x0;
    const conf = Math.min(1, L / W + 0.2);
    formes.push({ type: 'sol', points: versImage([{ x: sol.x0, y: sol.y }, { x: sol.x1, y: sol.y }]), confiance: Math.round(conf * 100) / 100 });
  }

  // Pignon : ce qui depasse de l'egout, en deux pans qui se rejoignent au faite.
  if (egout) {
    const niveau = egout.y;
    const dessus: { x: number; y: number }[] = [];
    for (let x = 0; x < W; x++) if (haut[x]! >= 0 && haut[x]! < niveau - 0.03 * H) dessus.push({ x, y: haut[x]! });
    if (dessus.length > 0.08 * W) {
      const xa = dessus[0]!.x,
        xb = dessus[dessus.length - 1]!.x;
      let pic = dessus[0]!;
      for (const p of dessus) if (p.y < pic.y) pic = p;
      const gauche = dessus.filter((p) => p.x <= pic.x),
        droite = dessus.filter((p) => p.x >= pic.x);
      const pans: { x: number; y: number }[][] = [];
      const pan = (pts: { x: number; y: number }[], cote: 'g' | 'd') => {
        if (pts.length < 0.3 * (cote === 'g' ? pic.x - xa : xb - pic.x) || pts.length < 4) return null;
        const d = droiteMC(pts);
        if (Math.abs(d.a) < 0.1 || d.rms > 0.02 * H) return null;
        const xe = (niveau - d.b) / d.a;
        const xbord = cote === 'g' ? Math.max(0, Math.min(pic.x, xe)) : Math.min(W - 1, Math.max(pic.x, xe));
        return [{ x: xbord, y: d.a * xbord + d.b }, { x: pic.x, y: pic.y }];
      };
      const g = pan(gauche, 'g'),
        d = pan(droite, 'd');
      if (g && d) pans.push([g[0]!, pic, d[0]!]);
      else if (g) pans.push(g);
      else if (d) pans.push(d);
      for (const p of pans) {
        const couverture = dessus.length / (xb - xa + 1);
        formes.push({ type: 'pignon', points: versImage(p), confiance: Math.round(Math.min(1, couverture + (g && d ? 0.2 : 0)) * 100) / 100 });
      }
    }
  }

  // Contour haut du toit : le haut de ce qui n'est pas ciel, quand il passe au-dessus du mur.
  const toit = profil(estNonCiel, t.ok, W, H, fenetre, true);
  const haute = toit.filter((y) => y >= 0);
  const sansCiel = haute.length > 0.5 * W && [...haute].sort((a, b) => a - b)[haute.length >> 1]! < 0.03 * H;
  if (!sansCiel && haute.length > 0.2 * W) {
    const au = [];
    for (let x = 0; x < W; x++) if (toit[x]! >= 0 && haut[x]! >= 0 && toit[x]! < haut[x]! - 0.03 * H) au.push({ x, y: toit[x]! });
    if (au.length > 0.2 * W) {
      const pts = simplifier(au, 0.012 * H);
      formes.push({ type: 'toit', points: versImage(pts), confiance: Math.round(Math.min(1, au.length / W) * 100) / 100 });
    }
  }
  return { formes };
}
