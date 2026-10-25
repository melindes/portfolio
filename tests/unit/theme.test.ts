import { describe, it, expect } from 'vitest';
import { resolveTheme, readStored, writeStored } from '../../src/lib/theme';

describe('resolveTheme', () => {
  it('garde le thème par défaut sans choix mémorisé', () => {
    expect(resolveTheme(null, 'sombre')).toBe('sombre');
  });
  it('applique le choix mémorisé', () => {
    expect(resolveTheme('clair', 'sombre')).toBe('clair');
  });
  it('ignore une valeur inconnue', () => {
    expect(resolveTheme('n-importe', 'clair')).toBe('clair');
  });
});

describe('stockage protégé', () => {
  it('readStored renvoie null si le stockage lève', () => {
    const throwing = { getItem: () => { throw new Error('denied'); } };
    expect(readStored(throwing, 'theme')).toBeNull();
  });
  it('readStored renvoie null sans stockage', () => {
    expect(readStored(undefined, 'theme')).toBeNull();
  });
  it('readStored lit la valeur', () => {
    expect(readStored({ getItem: () => 'clair' }, 'theme')).toBe('clair');
  });
  it('writeStored ne lève jamais', () => {
    expect(() => writeStored({ setItem: () => { throw new Error(); } }, 'theme', 'clair')).not.toThrow();
  });
});
