// Le detecteur de volets (src/volets.ts) vu par le banc des volets : meme interface que
// `detecterBaies`, les volets y tiennent lieu de boites a trouver. Voir PROTOCOLE.md.
//   node banc/volets/evaluer.mjs banc/volets/detecteur.ts <dossier-du-jeu>
import { detecterVolets } from '../../src/volets.js';
import type { Image } from '../../src/auto.js';

export function detecterBaies(img: Image, vu: Uint8Array | null, pxParM: number | null) {
  const r = detecterVolets(img, vu, pxParM);
  return { baies: r.volets.map((v) => ({ type: 'fenetre', px: v.px, carreaux: v.paire ? 2 : 1 })), solTrouve: false, solPx: null, echelleConnue: pxParM !== null };
}
