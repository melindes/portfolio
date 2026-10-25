export const MOTIFS = ['beta-lecture', 'dessin-bd', 'voix', 'soutien', 'recrutement', 'my-life', 'autre'] as const;
export type Motif = (typeof MOTIFS)[number];

const OEUVRE_VALIDE = /^[a-z0-9-]{1,60}$/;

/** Lit ?motif=…&oeuvre=… en n'acceptant que des valeurs connues ou sûres. */
export function parseContactParams(search: string): { motif: Motif; oeuvre?: string } {
  const params = new URLSearchParams(search);
  const brut = params.get('motif');
  const motif = (MOTIFS as readonly string[]).includes(brut ?? '') ? (brut as Motif) : 'autre';
  const oeuvre = params.get('oeuvre');
  return oeuvre && OEUVRE_VALIDE.test(oeuvre) ? { motif, oeuvre } : { motif };
}

export function buildSubject(motifLabel: string, nom: string): string {
  return `[Portfolio] ${motifLabel} — ${nom.trim().slice(0, 80)}`;
}
