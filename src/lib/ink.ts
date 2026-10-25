/** Pourcentage d'encre d'un livre : chapitres écrits / total, arrondi et borné à 0–100. */
export function inkLevel(written: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round(Math.min(100, Math.max(0, (written / total) * 100)));
}

interface Partie { titre: string; chapitres_ecrits: number; chapitres_total: number; pages?: number; en_cours?: number }

/** Les chiffres d'avancement font foi dans la version source (FR) ; seuls les titres viennent de la traduction. */
export function withSourceProgress<P extends Partie>(traduites: P[], source: Partie[] | undefined): P[] {
  if (!source) return traduites;
  return traduites.map((p, i) => {
    const s = source[i];
    return s ? { ...p, chapitres_ecrits: s.chapitres_ecrits, chapitres_total: s.chapitres_total, pages: s.pages, en_cours: s.en_cours } : p;
  });
}
