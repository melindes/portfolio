/** Pourcentage d'encre d'un livre : chapitres écrits / total, arrondi et borné à 0–100. */
export function inkLevel(written: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round(Math.min(100, Math.max(0, (written / total) * 100)));
}
