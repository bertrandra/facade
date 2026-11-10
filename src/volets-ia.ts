// Detection des volets par YOLOv10n (modeles/volets-yolov10n.onnx), dans le navigateur, avec
// onnxruntime-web. Option a la demande : rien n'est charge tant que l'utilisateur ne la coche pas
// (le runtime, quelques Mo, et le modele, 9,4 Mo, viennent alors du CDN et du depot).
//
// Entree : l'image redressee (pixels RGBA). Sortie : des boites en pixels de l'image, sans NMS (le
// modele rend 300 candidats : x1, y1, x2, y2 en pixels du repere 640 x 640, score, classe).

import type { Image } from './auto.js';

export const RUNTIME_URL = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.24.1/dist/ort.min.js';
export const RUNTIME_DOSSIER = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.24.1/dist/';
export const MODELE_URL = 'https://raw.githubusercontent.com/bertrandra/facade/claude/intelligent-bohr-pozlb4/modeles/volets-yolov10n.onnx';
/** Taille d'entree du modele, et score minimal d'une detection (calé sur le lot de contrôle CMP, voir PROTOCOLE.md). */
const TAILLE = 640;
export const SCORE_MIN = 0.30;

interface OrtSession {
  inputNames: string[];
  run(entrees: Record<string, unknown>): Promise<Record<string, { data: Float32Array }>>;
}
interface Ort {
  env: { wasm: { wasmPaths: string; numThreads: number } };
  Tensor: new (type: string, data: Float32Array, dims: number[]) => unknown;
  InferenceSession: { create(bytes: Uint8Array, opts: { executionProviders: string[] }): Promise<OrtSession> };
}

let session: Promise<OrtSession> | null = null;

/** Charge le runtime (script du CDN, une fois). */
function chargerRuntime(): Promise<Ort> {
  const w = window as unknown as { ort?: Ort };
  if (w.ort) return Promise.resolve(w.ort);
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = RUNTIME_URL;
    s.onload = () => (w.ort ? resolve(w.ort) : reject(new Error('runtime absent après chargement')));
    s.onerror = () => reject(new Error('le runtime onnxruntime-web n’a pas pu être chargé (réseau ?)'));
    document.head.append(s);
  });
}

/** Charge le modele et la session, une fois. */
export function chargerDetecteur(): Promise<OrtSession> {
  if (!session) {
    session = (async () => {
      const ort = await chargerRuntime();
      ort.env.wasm.wasmPaths = RUNTIME_DOSSIER;
      ort.env.wasm.numThreads = 1;
      const rep = await fetch(MODELE_URL);
      if (!rep.ok) throw new Error(`le modèle n’a pas pu être téléchargé (${rep.status})`);
      return ort.InferenceSession.create(new Uint8Array(await rep.arrayBuffer()), { executionProviders: ['wasm'] });
    })();
    session.catch(() => (session = null));
  }
  return session;
}

export interface VoletIA {
  px: { x: number; y: number; l: number; h: number };
  score: number;
}

/** Les volets de l'image redressee (pixels RGBA). `echelle` : facteur de l'image d'entree, si utile. */
export async function detecterVoletsIA(img: Image, seuil = SCORE_MIN): Promise<VoletIA[]> {
  const s = await chargerDetecteur();
  const ort = (window as unknown as { ort: Ort }).ort;
  // Letterbox : mise a l'echelle sans deformation, marge grise (114), comme a l'entrainement.
  const k = Math.min(TAILLE / img.largeur, TAILLE / img.hauteur);
  const nw = Math.round(img.largeur * k),
    nh = Math.round(img.hauteur * k);
  const px = Math.floor((TAILLE - nw) / 2),
    py = Math.floor((TAILLE - nh) / 2);
  const src = document.createElement('canvas');
  src.width = img.largeur;
  src.height = img.hauteur;
  src.getContext('2d')!.putImageData(new ImageData(img.donnees as Uint8ClampedArray<ArrayBuffer>, img.largeur, img.hauteur), 0, 0);
  const dst = document.createElement('canvas');
  dst.width = dst.height = TAILLE;
  const ctx = dst.getContext('2d')!;
  ctx.fillStyle = 'rgb(114,114,114)';
  ctx.fillRect(0, 0, TAILLE, TAILLE);
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(src, px, py, nw, nh);
  const rgba = ctx.getImageData(0, 0, TAILLE, TAILLE).data;
  const n = TAILLE * TAILLE;
  const chw = new Float32Array(3 * n);
  for (let i = 0; i < n; i++) {
    chw[i] = rgba[4 * i]! / 255;
    chw[n + i] = rgba[4 * i + 1]! / 255;
    chw[2 * n + i] = rgba[4 * i + 2]! / 255;
  }
  const tenseur = new ort.Tensor('float32', chw, [1, 3, TAILLE, TAILLE]);
  const sortie = await s.run({ [s.inputNames[0]!]: tenseur });
  const d = Object.values(sortie)[0]!.data;
  const res: VoletIA[] = [];
  for (let i = 0; i < d.length / 6; i++) {
    const o = 6 * i;
    const score = d[o + 4]!;
    if (score < seuil) continue;
    const x0 = Math.max(0, (d[o]! - px) / k),
      y0 = Math.max(0, (d[o + 1]! - py) / k),
      x1 = Math.min(img.largeur, (d[o + 2]! - px) / k),
      y1 = Math.min(img.hauteur, (d[o + 3]! - py) / k);
    if (x1 - x0 < 2 || y1 - y0 < 2) continue;
    res.push({ px: { x: x0, y: y0, l: x1 - x0, h: y1 - y0 }, score: Math.round(score * 100) / 100 });
  }
  return res;
}
