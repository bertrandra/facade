// Le detecteur de volets (src/volets.ts) presente au banc de baies : meme interface que les trois
// detecteurs de baies, les volets y sont des « baies ». Sert a noter les volets avec evaluer.mjs.
//   node banc/evaluer.mjs banc/volets.ts <dossier-du-jeu>
import { detecterVolets } from '../src/volets.js';
import type { Image } from '../src/auto.js';

export function detecterBaies(img: Image, vu: Uint8Array | null, pxParM: number | null) {
  const r = detecterVolets(img, vu, pxParM);
  return { baies: r.volets.map((v) => ({ type: 'fenetre', px: v.px, carreaux: v.paire ? 2 : 1 })), solTrouve: false, solPx: null, echelleConnue: pxParM !== null };
}
