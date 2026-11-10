import { detecterBaies } from '../../src/baies.js';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
// Ouvertures trouvees par le code de facade (src/baies.ts, lecture seule), une par image : entree de l'entrainement.
// Usage : node banc/volets/dump_baies.mjs <dossier du lot> <dossier de sortie> (apres esbuild, voir PROTOCOLE.md)
const dir = process.argv[2]!, out = process.argv[3]!;
for (const f of readdirSync(dir).filter((x) => x.endsWith('.json'))) {
  const J = JSON.parse(readFileSync(dir + '/' + f, 'utf8'));
  const buf = readFileSync(dir + '/' + f.replace('.json', '.rgba'));
  const img = { largeur: J.largeur, hauteur: J.hauteur, donnees: new Uint8ClampedArray(buf.buffer, buf.byteOffset, buf.length) };
  const r = detecterBaies(img, null, null);
  writeFileSync(out + '/' + f, JSON.stringify(r.baies.map((b: any) => ({ x: b.px.x, y: b.px.y, l: b.px.l, h: b.px.h, type: b.type }))));
}
console.log('ok');
