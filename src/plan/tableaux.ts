// Copie de src/util/tableaux.ts (la fonction `au`) du depot Plan (bertrandra/plan, commit 9002208d), embarquee sans changement de logique :
// la page n'a besoin que de cette partie, et ce depot est autonome.

/** L'element d'indice `i`, ou une `RangeError` s'il n'y en a pas. */
export function au<T>(tableau: ArrayLike<T>, i: number): T {
  const v = tableau[i];
  if (v === undefined) throw new RangeError('Indice ' + i + ' hors du tableau (' + tableau.length + ' element(s)).');
  return v;
}
