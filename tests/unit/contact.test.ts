import { describe, it, expect } from 'vitest';
import { parseContactParams, buildSubject, MOTIFS } from '../../src/lib/contact';

describe('parseContactParams', () => {
  it('lit motif et œuvre valides', () => {
    expect(parseContactParams('?motif=beta-lecture&oeuvre=les-larmes-du-present')).toEqual({ motif: 'beta-lecture', oeuvre: 'les-larmes-du-present' });
  });
  it('motif inconnu ou piégé → autre', () => {
    expect(parseContactParams('?motif=<script>')).toEqual({ motif: 'autre' });
    expect(parseContactParams('?motif=constructor')).toEqual({ motif: 'autre' });
  });
  it('œuvre invalide ignorée', () => {
    expect(parseContactParams('?oeuvre=../../etc')).toEqual({ motif: 'autre' });
    expect(parseContactParams('?motif=voix&oeuvre=<b>')).toEqual({ motif: 'voix' });
  });
  it('chaîne vide → autre', () => {
    expect(parseContactParams('')).toEqual({ motif: 'autre' });
  });
  it('liste des motifs', () => {
    expect(MOTIFS).toEqual(['beta-lecture', 'dessin-bd', 'voix', 'soutien', 'recrutement', 'my-life', 'autre']);
  });
});

describe('buildSubject', () => {
  it('formate l’objet du mail', () => {
    expect(buildSubject('Bêta-lecture', '  Awa K. ')).toBe('[Portfolio] Bêta-lecture — Awa K.');
  });
  it('tronque un nom trop long', () => {
    expect(buildSubject('Autre', 'x'.repeat(200))).toBe(`[Portfolio] Autre — ${'x'.repeat(80)}`);
  });
});
