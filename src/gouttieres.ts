// Les gouttieres de la facade redressee de facade.html : une bulle a part, qui ne connait ni les
// baies, ni les volets, ni la forme. Elle ne regarde que l'image.
//
// Une gouttiere est une bande horizontale longue et fine a l'egout (zinc, PVC, cuivre : d'une
// teinte unie, plus claire ou plus sombre que ce qu'elle a au-dessus et en dessous), et sa
// descente un tube vertical fin, de la gouttiere au sol. Dans les deux cas c'est une « bande
// contrastee de chaque cote » : pour une epaisseur t, la moyenne des t lignes (ou colonnes) de la
// bande differe de celle des t d'avant et des t d'apres. Sur une image de travail de 800 px :
//
//   1. pour chaque epaisseur et chaque position, les colonnes (ou lignes) ou le contraste des deux
//      cotes depasse le seuil (ecart de couleur, par images integrales : un balayage par epaisseur) ;
//   2. les plus longs troncons de ces colonnes, en tolerant des trous de quelques pixels (une
//      attache, un crochet) ; horizontale : 35 % de la largeur au moins ; descente : 25 % de la
//      hauteur au moins ;
//   3. un seul resultat par endroit, le plus long puis le plus net ;
//   4. une descente dont la tete touche une gouttiere trouvee (a 8 % de la hauteur) est plus sure.
//
// Limites : une gouttiere de la couleur du mur est invisible ; un pignon a rives inclinees (gouttiere
// de rive) n'est pas cherche : seules les bandes horizontales et verticales le sont ; une
// descente derriere un arbre est coupee ou manquee.

import type { Image } from './auto.js';

export interface Gouttiere {
  type: 'horizontale' | 'descente';
  /** Boite en pixels de l'image. */
  px: { x: number; y: number; l: number; h: number };
  /** 0 a 1. */
  confiance: number;
}
export interface ResultatGouttieres {
  gouttieres: Gouttiere[];
}

const TRAVAIL = 800;
const SEUIL = 22;

export function detecterGouttieres(img: Image, vu: Uint8Array | null, pxParM: number | null): ResultatGouttieres {
  if (img.largeur < 16 || img.hauteur < 16) return { gouttieres: [] };
  const s = Math.min(1, TRAVAIL / Math.max(img.largeur, img.hauteur));
  const W = Math.max(1, Math.round(img.largeur * s)),
    H = Math.max(1, Math.round(img.hauteur * s));
  // Image de travail : trois canaux et masque, par moyenne de blocs.
  const c = [new Float32Array(W * H), new Float32Array(W * H), new Float32Array(W * H)];
  const ok = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) {
    const y0 = Math.floor((y * img.hauteur) / H),
      y1 = Math.max(y0 + 1, Math.floor(((y + 1) * img.hauteur) / H));
    for (let x = 0; x < W; x++) {
      const x0 = Math.floor((x * img.largeur) / W),
        x1 = Math.max(x0 + 1, Math.floor(((x + 1) * img.largeur) / W));
      const a = [0, 0, 0];
      let nn = 0,
        v = 0;
      for (let j = y0; j < y1; j++)
        for (let i = x0; i < x1; i++) {
          const o = j * img.largeur + i;
          for (let q = 0; q < 3; q++) a[q]! += img.donnees[o * 4 + q]!;
          v += vu ? vu[o]! : 1;
          nn++;
        }
      const k = y * W + x;
      for (let q = 0; q < 3; q++) c[q]![k] = a[q]! / nn;
      ok[k] = v * 2 >= nn ? 1 : 0;
    }
  }
  // Images integrales par canal, ligne par ligne (somme de x) et colonne par colonne (somme de y).
  const lignes = c.map((ch) => integrale(ch, W, H, true));
  const colonnes = c.map((ch) => integrale(ch, W, H, false));
  const somme = (I: Float64Array[], pos: number, a: number, b: number, long: number, q: number) => I[q]![pos * (long + 1) + b]! - I[q]![pos * (long + 1) + a]!;

  // Horizontales : l'axe est y ; on parcourt les colonnes x. Pour chaque (y, t) : colonne marquee
  // si la moyenne des t lignes y..y+t differe des t d'avant ET des t d'apres.
  const tMaxH = Math.max(3, Math.round(H * 0.035));
  const tMinH = 2;
  const res: Gouttiere[] = [];
  const horizontales: { y: number; t: number; x0: number; x1: number; contraste: number }[] = [];
  const colMarque = new Uint8Array(W);
  const colForce = new Float32Array(W);
  for (let t = tMinH; t <= tMaxH; t++) {
    for (let y = t; y + 2 * t <= H; y++) {
      for (let x = 0; x < W; x++) {
        colMarque[x] = 0;
        if (!ok[y * W + x] || !ok[(y + t) * W + x]) continue;
        let dh = 0,
          db = 0;
        for (let q = 0; q < 3; q++) {
          const mi = somme(colonnes, x, y, y + t, H, q) / t,
            ha = somme(colonnes, x, y - t, y, H, q) / t,
            ba = somme(colonnes, x, y + t, y + 2 * t, H, q) / t;
          dh += (mi - ha) * (mi - ha);
          db += (mi - ba) * (mi - ba);
        }
        const f = Math.min(Math.sqrt(dh), Math.sqrt(db));
        if (f > SEUIL) ((colMarque[x] = 1), (colForce[x] = f));
      }
      troncons(colMarque, colForce, W, 3, W * 0.35, (a, b, f) => horizontales.push({ y, t, x0: a, x1: b, contraste: f }));
    }
  }
  // Le plus long puis le plus net, un seul par endroit (meme bande a quelques lignes pres).
  horizontales.sort((p, q) => q.x1 - q.x0 - (p.x1 - p.x0) || q.contraste - p.contraste);
  const gardees: typeof horizontales = [];
  for (const h of horizontales) {
    if (gardees.some((g) => Math.abs(g.y - h.y) <= Math.max(g.t, h.t) + 2 && Math.min(g.x1, h.x1) - Math.max(g.x0, h.x0) > 0.5 * Math.min(g.x1 - g.x0, h.x1 - h.x0))) continue;
    gardees.push(h);
    if (gardees.length >= 6) break;
  }
  // La bande est la plus mince qui porte le contraste : on garde l'epaisseur de la meilleure note.
  for (const g of gardees) {
    const conf = Math.min(1, 0.5 * ((g.x1 - g.x0) / W) + 0.5 * Math.min(1, g.contraste / 80));
    res.push({ type: 'horizontale', px: { x: g.x0 / s, y: g.y / s, l: (g.x1 - g.x0) / s, h: g.t / s }, confiance: Math.round(conf * 100) / 100 });
  }

  // Descentes : l'axe est x ; on parcourt les lignes y.
  const tMaxV = Math.max(2, Math.round(W * 0.02));
  const ligMarque = new Uint8Array(H);
  const ligForce = new Float32Array(H);
  const verticales: { x: number; t: number; y0: number; y1: number; contraste: number }[] = [];
  for (let t = 2; t <= tMaxV; t++) {
    for (let x = t; x + 2 * t <= W; x++) {
      for (let y = 0; y < H; y++) {
        ligMarque[y] = 0;
        if (!ok[y * W + x] || !ok[y * W + x + t]) continue;
        let dg = 0,
          dd = 0;
        for (let q = 0; q < 3; q++) {
          const mi = somme(lignes, y, x, x + t, W, q) / t,
            ga = somme(lignes, y, x - t, x, W, q) / t,
            dr = somme(lignes, y, x + t, x + 2 * t, W, q) / t;
          dg += (mi - ga) * (mi - ga);
          dd += (mi - dr) * (mi - dr);
        }
        const f = Math.min(Math.sqrt(dg), Math.sqrt(dd));
        if (f > SEUIL) ((ligMarque[y] = 1), (ligForce[y] = f));
      }
      troncons(ligMarque, ligForce, H, 3, H * 0.25, (a, b, f) => verticales.push({ x, t, y0: a, y1: b, contraste: f }));
    }
  }
  verticales.sort((p, q) => q.y1 - q.y0 - (p.y1 - p.y0) || q.contraste - p.contraste);
  const tubes: typeof verticales = [];
  for (const v of verticales) {
    // Une descente fait au plus une vingtaine de centimetres de large : avec l'echelle, on le verifie.
    if (pxParM && v.t / s > 0.3 * pxParM) continue;
    if (tubes.some((g) => Math.abs(g.x - v.x) <= Math.max(g.t, v.t) + 2 && Math.min(g.y1, v.y1) - Math.max(g.y0, v.y0) > 0.5 * Math.min(g.y1 - g.y0, v.y1 - v.y0))) continue;
    tubes.push(v);
    if (tubes.length >= 8) break;
  }
  const hautes = res.filter((r) => r.type === 'horizontale');
  for (const v of tubes) {
    const touche = hautes.some((g) => Math.abs(g.px.y * s - v.y0) <= 0.08 * H);
    const conf = Math.min(1, 0.4 * ((v.y1 - v.y0) / H) + 0.3 * Math.min(1, v.contraste / 80) + 0.3 * (touche ? 1 : 0));
    res.push({ type: 'descente', px: { x: v.x / s, y: v.y0 / s, l: v.t / s, h: (v.y1 - v.y0) / s }, confiance: Math.round(conf * 100) / 100 });
  }
  return { gouttieres: res };
}

/** Sommes cumulees : par ligne (sur x) si `parLigne`, sinon par colonne (sur y). Une rangee de `long + 1` valeurs par ligne (ou colonne). */
function integrale(ch: Float32Array, W: number, H: number, parLigne: boolean): Float64Array {
  const long = parLigne ? W : H,
    nb = parLigne ? H : W;
  const I = new Float64Array(nb * (long + 1));
  for (let p = 0; p < nb; p++) {
    let s = 0;
    for (let q = 0; q < long; q++) {
      s += ch[parLigne ? p * W + q : q * W + p]!;
      I[p * (long + 1) + q + 1] = s;
    }
  }
  return I;
}

/** Troncons de `marque` de longueur au moins `mini`, en admettant des trous de `trou` ; force = moyenne sur le troncon. */
function troncons(marque: Uint8Array, force: Float32Array, n: number, trou: number, mini: number, sortie: (a: number, b: number, f: number) => void) {
  let debut = -1,
    dernier = -1;
  const fermer = () => {
    if (debut >= 0 && dernier + 1 - debut >= mini) {
      let s = 0,
        k = 0;
      for (let i = debut; i <= dernier; i++) if (marque[i]) ((s += force[i]!), k++);
      sortie(debut, dernier + 1, s / Math.max(1, k));
    }
    debut = -1;
  };
  for (let i = 0; i < n; i++) {
    if (!marque[i]) continue;
    if (debut >= 0 && i - dernier > trou + 1) fermer();
    if (debut < 0) debut = i;
    dernier = i;
  }
  fermer();
}
