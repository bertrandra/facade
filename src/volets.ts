// Les volets de la facade redressee de facade.html : une bulle a part, qui ne connait ni les baies
// (`baies.ts`), ni la forme, ni les gouttieres. Elle ne regarde que l'image.
//
// Un volet rabattu sur le mur est un rectangle haut et etroit, d'une couleur que le mur n'a pas,
// d'une seule teinte (peint) et, le plus souvent, a lames : des aretes horizontales regulieres.
// Il vient par deux, de part et d'autre d'une baie, de meme taille et de meme hauteur, et se
// repete d'une travee a l'autre. D'ou, sur une image de travail d'un millier de pixels :
//
//   1. la couleur du mur : le mode de l'histogramme (ce que la facade a le plus) ; tout ce qui s'en
//      ecarte est « hors mur » ;
//   2. des plages d'une seule teinte : le hors-mur est classe par teinte et clarte ; dans chaque
//      classe, les lames (interstices clairs) sont refermees verticalement, les filets
//      horizontaux effaces, et les composantes connexes sont des candidats ;
//   3. le tri : un candidat plein (remplissage >= 0,72), haut (1,7 a 9 fois sa largeur), de taille
//      d'un volet (en metres avec l'echelle, en part de l'image sinon) ;
//   4. les indices : les lames (autocorrelation du profil des lignes), la paire (un voisin de meme
//      taille et de meme linteau, a au moins une demi-largeur), la repetition (un semblable dans
//      la meme rangee). Un volet est retenu s'il a des lames, ou une paire, ou une repetition et
//      une forme tres etroite ;
//   5. un seul candidat par endroit (le plus sur).
//
// Limites : un volet de la couleur du mur (blanc sur crepi blanc) est invisible ; une fenetre
// etroite sombre, doublee d'une voisine, peut passer pour une paire de volets pleins (confiance
// moindre : la page laisse retirer) ; un volet ouvert (de biais) n'est pas redresse.

import type { Image } from './auto.js';

export interface Volet {
  /** Boite en pixels de l'image. */
  px: { x: number; y: number; l: number; h: number };
  /** `persienne` : a lames ; `plein` : un panneau d'une teinte. */
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

interface Candidat {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  fill: number;
  slat: number;
  classe: number;
  paire: boolean;
  rep: number;
  note: number;
}

/** Couleur du mur : le centre de la plus forte concentration de teintes (voisinage 3 × 3 × 3 des cases de 32 niveaux), moyenne de ses pixels. */
function couleurMur(t: Travail): [number, number, number] {
  const n = t.W * t.H;
  const cnt = new Int32Array(512),
    sr = new Float64Array(512),
    sg = new Float64Array(512),
    sb = new Float64Array(512);
  for (let i = 0; i < n; i++) {
    if (!t.ok[i]) continue;
    const k = ((t.r[i]! >> 5) << 6) | ((t.g[i]! >> 5) << 3) | (t.b[i]! >> 5);
    cnt[k]!++;
    sr[k]! += t.r[i]!;
    sg[k]! += t.g[i]!;
    sb[k]! += t.b[i]!;
  }
  let meilleur = -1,
    m = 0;
  for (let k = 0; k < 512; k++) {
    const r0 = k >> 6,
      g0 = (k >> 3) & 7,
      b0 = k & 7;
    let s = 0;
    for (let dr = -1; dr <= 1; dr++)
      for (let dg = -1; dg <= 1; dg++)
        for (let db = -1; db <= 1; db++) {
          const r1 = r0 + dr,
            g1 = g0 + dg,
            b1 = b0 + db;
          if (r1 < 0 || r1 > 7 || g1 < 0 || g1 > 7 || b1 < 0 || b1 > 7) continue;
          s += cnt[(r1 << 6) | (g1 << 3) | b1]!;
        }
    if (s > meilleur) ((meilleur = s), (m = k));
  }
  let a = 0,
    c = 0,
    d = 0,
    q = 0;
  for (let dr = -1; dr <= 1; dr++)
    for (let dg = -1; dg <= 1; dg++)
      for (let db = -1; db <= 1; db++) {
        const r1 = (m >> 6) + dr,
          g1 = ((m >> 3) & 7) + dg,
          b1 = (m & 7) + db;
        if (r1 < 0 || r1 > 7 || g1 < 0 || g1 > 7 || b1 < 0 || b1 > 7) continue;
        const k = (r1 << 6) | (g1 << 3) | b1;
        a += sr[k]!;
        c += sg[k]!;
        d += sb[k]!;
        q += cnt[k]!;
      }
  q = Math.max(1, q);
  return [a / q, c / q, d / q];
}

/** Classe de teinte et de clarte d'un pixel (0..35). */
function classeDe(r: number, g: number, b: number): number {
  const mx = Math.max(r, g, b),
    mn = Math.min(r, g, b),
    ch = mx - mn,
    L = 0.299 * r + 0.587 * g + 0.114 * b;
  if (ch < 28) return 24 + Math.min(3, Math.floor(L / 64));
  let h: number;
  if (mx === r) h = ((g - b) / ch + 6) % 6;
  else if (mx === g) h = (b - r) / ch + 2;
  else h = (r - g) / ch + 4;
  return Math.floor(h * 2) * 2 + (L < 110 ? 1 : 0);
}

export function detecterVolets(img: Image, vu: Uint8Array | null, pxParM: number | null): ResultatVolets {
  if (img.largeur < 16 || img.hauteur < 16) return { volets: [] };
  const t = reduire(img, vu);
  const { W, H } = t;
  const n = W * H;
  const mur = couleurMur(t);
  const classes = new Uint8Array(n);
  const horsMur = new Uint8Array(n);
  const compte = new Int32Array(40);
  for (let i = 0; i < n; i++) {
    if (!t.ok[i]) continue;
    const d = Math.hypot(t.r[i]! - mur[0], t.g[i]! - mur[1], t.b[i]! - mur[2]);
    if (d < 40) continue;
    horsMur[i] = 1;
    const c = classeDe(t.r[i]!, t.g[i]!, t.b[i]!);
    classes[i] = c;
    compte[c]!++;
  }
  // Tailles admises : en metres si l'echelle est connue (px de travail par metre), sinon en part de l'image.
  const pm = pxParM ? pxParM * t.s : null;
  const lMin = pm ? 0.2 * pm : W * 0.012,
    lMax = pm ? 1.1 * pm : W * 0.2,
    hMin = pm ? 0.8 * pm : H * 0.06,
    hMax = pm ? 3.2 * pm : H * 0.65;
  const trou = Math.max(2, Math.round(H * 0.006));
  const filet = Math.max(3, Math.round(W * 0.006));
  const gris = new Float32Array(n);
  for (let i = 0; i < n; i++) gris[i] = 0.299 * t.r[i]! + 0.587 * t.g[i]! + 0.114 * t.b[i]!;

  const candidats: Candidat[] = [];
  const masque = new Uint8Array(n),
    vus = new Uint8Array(n);
  const pile = new Int32Array(n);
  for (let c = 0; c < 40; c++) {
    if (compte[c]! < Math.max(40, n * 0.0004)) continue;
    // Les pixels de la classe, lames refermees.
    for (let i = 0; i < n; i++) masque[i] = horsMur[i] && classes[i] === c ? 1 : 0;
    for (let x = 0; x < W; x++) {
      let dernier = -1;
      for (let y = 0; y < H; y++)
        if (masque[y * W + x]) {
          if (dernier >= 0 && y - dernier > 1 && y - dernier <= trou + 1) for (let k = dernier + 1; k < y; k++) masque[k * W + x] = 1;
          dernier = y;
        }
    }
    // Les filets horizontaux (corniche, bandeau, trait) sont effaces.
    for (let y = 0; y < H; y++) {
      let x = 0;
      while (x < W) {
        if (!masque[y * W + x]) {
          x++;
          continue;
        }
        let e = x;
        while (e < W && masque[y * W + e]) e++;
        if (e - x < filet) for (let k = x; k < e; k++) masque[y * W + k] = 0;
        x = e;
      }
    }
    vus.fill(0);
    for (let i0 = 0; i0 < n; i0++) {
      if (!masque[i0] || vus[i0]) continue;
      let sp = 0,
        aire = 0,
        x0 = W,
        y0 = H,
        x1 = 0,
        y1 = 0;
      pile[sp++] = i0;
      vus[i0] = 1;
      while (sp) {
        const i = pile[--sp]!;
        const x = i % W,
          y = (i / W) | 0;
        aire++;
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
        if (x > 0 && masque[i - 1] && !vus[i - 1]) ((vus[i - 1] = 1), (pile[sp++] = i - 1));
        if (x < W - 1 && masque[i + 1] && !vus[i + 1]) ((vus[i + 1] = 1), (pile[sp++] = i + 1));
        if (y > 0 && masque[i - W] && !vus[i - W]) ((vus[i - W] = 1), (pile[sp++] = i - W));
        if (y < H - 1 && masque[i + W] && !vus[i + W]) ((vus[i + W] = 1), (pile[sp++] = i + W));
      }
      const l = x1 - x0 + 1,
        h = y1 - y0 + 1;
      if (l < lMin || l > lMax || h < hMin || h > hMax) continue;
      const fill = aire / (l * h);
      const asp = h / l;
      if (fill < 0.72 || asp < 1.7 || asp > 9) continue;
      candidats.push({ x0, y0, x1: x1 + 1, y1: y1 + 1, fill, slat: lames(gris, W, x0, y0, x1 + 1, y1 + 1), classe: c, paire: false, rep: 0, note: 0 });
    }
  }

  // La paire et la repetition.
  for (const a of candidats) {
    const la = a.x1 - a.x0,
      ha = a.y1 - a.y0;
    for (const b of candidats) {
      if (a === b) continue;
      const lb = b.x1 - b.x0,
        hb = b.y1 - b.y0;
      if (Math.abs(la - lb) > 0.2 * la || Math.abs(ha - hb) > 0.15 * ha) continue;
      if (Math.abs(a.y0 - b.y0) <= 0.08 * ha) {
        a.rep++;
        const ecart = Math.max(a.x0, b.x0) - Math.min(a.x1, b.x1);
        if (ecart >= 0.5 * la && ecart <= 6 * la) a.paire = true;
      }
    }
  }
  for (const a of candidats) {
    const asp = (a.y1 - a.y0) / (a.x1 - a.x0);
    const aLames = a.slat >= 0.45;
    const ok = aLames || (a.paire && asp >= 2.2) || (a.rep >= 1 && asp >= 3);
    a.note = ok ? Math.min(1, 0.35 * a.fill + 0.35 * (aLames ? Math.min(1, a.slat + 0.2) : 0) + 0.3 * (a.paire ? 1 : a.rep ? 0.5 : 0)) : 0;
  }
  // Un seul candidat par endroit : le plus sur.
  const retenus: Candidat[] = [];
  for (const a of candidats.filter((c) => c.note > 0).sort((p, q) => q.note - p.note || (q.x1 - q.x0) * (q.y1 - q.y0) - (p.x1 - p.x0) * (p.y1 - p.y0))) {
    const aa = (a.x1 - a.x0) * (a.y1 - a.y0);
    const gene = retenus.some((b) => {
      const ix = Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0),
        iy = Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0);
      return ix > 0 && iy > 0 && (ix * iy) / Math.min(aa, (b.x1 - b.x0) * (b.y1 - b.y0)) > 0.4;
    });
    if (!gene) retenus.push(a);
  }
  retenus.sort((p, q) => p.y0 - q.y0 || p.x0 - q.x0);
  const k = 1 / t.s;
  return {
    volets: retenus.map((a) => ({
      px: { x: a.x0 * k, y: a.y0 * k, l: (a.x1 - a.x0) * k, h: (a.y1 - a.y0) * k },
      type: a.slat >= 0.45 ? 'persienne' : 'plein',
      paire: a.paire,
      confiance: Math.round(a.note * 100) / 100,
    })),
  };
}

/** Lames : regularite du profil des lignes dans la boite (0 : aucune, 1 : tres reguliere). */
function lames(gris: Float32Array, W: number, x0: number, y0: number, x1: number, y1: number): number {
  const ix = Math.max(1, Math.round((x1 - x0) * 0.12)),
    iy = Math.round((y1 - y0) * 0.04);
  const xa = x0 + ix,
    xb = x1 - ix,
    ya = y0 + iy,
    yb = y1 - iy;
  const m = yb - ya;
  if (m < 14 || xb <= xa) return 0;
  const prof = new Float64Array(m);
  for (let y = 0; y < m; y++) {
    let s = 0;
    for (let x = xa; x < xb; x++) s += gris[(ya + y) * W + x]!;
    prof[y] = s / (xb - xa);
  }
  const hp = new Float64Array(m);
  for (let y = 0; y < m; y++) {
    let s = 0,
      c = 0;
    for (let j = Math.max(0, y - 4); j <= Math.min(m - 1, y + 4); j++) ((s += prof[j]!), c++);
    hp[y] = prof[y]! - s / c;
  }
  let e = 0;
  for (let y = 0; y < m; y++) e += hp[y]! * hp[y]!;
  const ecart = Math.sqrt(e / m);
  if (ecart < 1.5) return 0;
  let meilleur = 0;
  for (let lag = 3; lag <= Math.floor(m / 4); lag++) {
    let s = 0;
    for (let y = 0; y + lag < m; y++) s += hp[y]! * hp[y + lag]!;
    meilleur = Math.max(meilleur, s / e);
  }
  return Math.max(0, Math.min(1, meilleur));
}
