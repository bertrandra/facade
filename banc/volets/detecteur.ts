// Le detecteur de volets (src/volets.ts) vu par le banc des volets : meme interface que
// `detecterBaies`, les volets y tiennent lieu de boites a trouver. Il recoit les ouvertures que
// trouve le code de facade (src/baies.ts), en lecture seule. Voir PROTOCOLE.md.
//   node banc/volets/evaluer.mjs banc/volets/detecteur.ts <dossier-du-jeu>
import { detecterVolets } from '../../src/volets.js';
import { detecterBaies } from '../../src/baies.js';
import type { Image } from '../../src/auto.js';

export function detecterBaies2(img: Image, vu: Uint8Array | null, pxParM: number | null) {
  const baies = detecterBaies(img, vu, pxParM).baies.map((b) => ({ x: b.px.x, y: b.px.y, l: b.px.l, h: b.px.h }));
  const r = detecterVolets(img, vu, pxParM, baies);
  return { baies: r.volets.map((v) => ({ type: 'fenetre', px: v.px, carreaux: v.paire ? 2 : 1 })), solTrouve: false, solPx: null, echelleConnue: pxParM !== null };
}
export { detecterBaies2 as detecterBaies };
