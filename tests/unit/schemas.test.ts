import { describe, it, expect } from 'vitest';
import { z } from 'astro/zod';
import { makeRomanSchema, makeProjetSchema } from '../../src/lib/schemas';

const image = () => z.string();
const romanSchema = makeRomanSchema(image);
const projetSchema = makeProjetSchema(image);

const validRoman = {
  titre: 'Les larmes du présent', ordre: 1, statut: 'phare',
  parties: [{ titre: "L'armure", chapitres_ecrits: 15, chapitres_total: 15 }],
};
const validProjet = {
  titre: 'My Life', ordre: 1, statut: 'bientot', probleme: 'p', solution: 's', technos: ['Flutter'],
};

describe('schéma roman', () => {
  it('accepte un roman valide', () => {
    expect(romanSchema.safeParse(validRoman).success).toBe(true);
  });
  it('refuse plus de chapitres écrits que prévus', () => {
    const r = romanSchema.safeParse({ ...validRoman, parties: [{ titre: 'X', chapitres_ecrits: 16, chapitres_total: 15 }] });
    expect(r.success).toBe(false);
    expect(JSON.stringify(r.error?.issues)).toContain('chapitres_ecrits dépasse chapitres_total');
  });
  it('refuse un total de chapitres nul', () => {
    expect(romanSchema.safeParse({ ...validRoman, parties: [{ titre: 'X', chapitres_ecrits: 0, chapitres_total: 0 }] }).success).toBe(false);
  });
});

describe('schéma projet', () => {
  it('accepte un projet valide et publie par défaut', () => {
    const r = projetSchema.safeParse(validProjet);
    expect(r.success).toBe(true);
    expect(r.data?.publie).toBe(true);
  });
  it('refuse un statut inconnu', () => {
    expect(projetSchema.safeParse({ ...validProjet, statut: 'fini' }).success).toBe(false);
  });
});
