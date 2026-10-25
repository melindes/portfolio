import { it, expect } from 'vitest';
import { withSourceProgress } from '../../src/lib/ink';

it('les chiffres d’avancement viennent de la version source (FR), les titres de la traduction', () => {
  const fr = [
    { titre: 'L’armure', chapitres_ecrits: 15, chapitres_total: 15, pages: 160 },
    { titre: 'Le miroir', chapitres_ecrits: 7, chapitres_total: 15, en_cours: 23 },
  ];
  const en = [
    { titre: 'The Armour', chapitres_ecrits: 15, chapitres_total: 15, pages: 160 },
    { titre: 'The Mirror', chapitres_ecrits: 6, chapitres_total: 15, en_cours: 22 },
  ];
  expect(withSourceProgress(en, fr)).toEqual([
    { titre: 'The Armour', chapitres_ecrits: 15, chapitres_total: 15, pages: 160, en_cours: undefined },
    { titre: 'The Mirror', chapitres_ecrits: 7, chapitres_total: 15, pages: undefined, en_cours: 23 },
  ]);
});

it('sans source, les parties traduites restent telles quelles', () => {
  const en = [{ titre: 'X', chapitres_ecrits: 1, chapitres_total: 2 }];
  expect(withSourceProgress(en, undefined)).toEqual(en);
});
