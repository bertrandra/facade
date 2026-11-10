// Copie de src/facade/detection/classement.ts (`classer`, sans les details que lit Plan) et src/model/typesReleve.ts (`TypeOuverture`) du depot Plan (bertrandra/plan, commit 9002208d), embarquee sans changement de logique :
// la page n'a besoin que de cette partie, et ce depot est autonome.

export type TypeOuverture = 'fenetre' | 'porte-fenetre' | 'porte' | 'garage';

/** Le type d'une baie, d'apres sa taille et sa hauteur d'appui (spec §11, regles d'avant le lot). */
export function classer(y: number, l: number, h: number): TypeOuverture {
  const auSol = y < 0.25;
  if (auSol && l >= 2.1 && h >= 1.8) return 'garage';
  if (auSol && h >= 1.8) return l >= 1.1 ? 'porte-fenetre' : 'porte';
  if (y < 0.45 && h >= 1.9) return 'porte-fenetre';
  return 'fenetre';
}
