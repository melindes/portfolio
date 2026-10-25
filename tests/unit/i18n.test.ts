import { describe, it, expect } from 'vitest';
import { localizedPath, alternatePath, useTranslations } from '../../src/lib/i18n';

describe('localizedPath', () => {
  it('traduit le chemin de la section Écriture', () => {
    expect(localizedPath('ecriture', 'en')).toBe('/en/writing');
    expect(localizedPath('ecriture', 'fr')).toBe('/fr/ecriture');
  });
  it('construit les fiches', () => {
    expect(localizedPath('roman', 'fr', 'pokou')).toBe('/fr/ecriture/pokou');
    expect(localizedPath('projet', 'en', 'my-life')).toBe('/en/code/my-life');
  });
  it('accueil avec / final, remerciement sous contact', () => {
    expect(localizedPath('home', 'fr')).toBe('/fr/');
    expect(localizedPath('merci', 'en')).toBe('/en/contact/merci');
  });
});

describe('alternatePath', () => {
  it('donne la même page dans l’autre langue', () => {
    expect(alternatePath('/fr/ecriture/les-larmes-du-present')).toBe('/en/writing/les-larmes-du-present');
    expect(alternatePath('/en/writing')).toBe('/fr/ecriture');
    expect(alternatePath('/en/contact/merci')).toBe('/fr/contact/merci');
    expect(alternatePath('/en/')).toBe('/fr/');
    expect(alternatePath('/fr/code/my-life')).toBe('/en/code/my-life');
  });
  it('renvoie vers l’accueil pour un chemin inconnu', () => {
    expect(alternatePath('/autre')).toBe('/fr/');
  });
});

describe('useTranslations', () => {
  it('traduit et retombe sur le français puis sur la clé', () => {
    const t = useTranslations('en');
    expect(t('nav.code')).toBe('Code');
    expect(t('cle.inexistante')).toBe('cle.inexistante');
  });
});
