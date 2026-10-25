import { it, expect } from 'vitest';
import { shouldPlayIntro, markIntroSeen } from '../../src/lib/intro';

it('joue l’intro à la première visite', () => {
  expect(shouldPlayIntro({ getItem: () => null }, false)).toBe(true);
});
it('ne la rejoue pas dans la même session', () => {
  expect(shouldPlayIntro({ getItem: () => '1' }, false)).toBe(false);
});
it('ne la joue pas avec « réduire les animations »', () => {
  expect(shouldPlayIntro({ getItem: () => null }, true)).toBe(false);
});
it('la joue si le stockage lève', () => {
  expect(shouldPlayIntro({ getItem: () => { throw new Error(); } }, false)).toBe(true);
});
it('markIntroSeen mémorise et ne lève jamais', () => {
  const store: Record<string, string> = {};
  markIntroSeen({ setItem: (k, v) => { store[k] = v; } });
  expect(store['intro-vue']).toBe('1');
  expect(() => markIntroSeen({ setItem: () => { throw new Error(); } })).not.toThrow();
  expect(() => markIntroSeen(undefined)).not.toThrow();
});
