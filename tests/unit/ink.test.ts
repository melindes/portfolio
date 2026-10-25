import { it, expect } from 'vitest';
import { inkLevel } from '../../src/lib/ink';

it('inkLevel calcule le pourcentage borné', () => {
  expect(inkLevel(15, 15)).toBe(100);
  expect(inkLevel(6, 15)).toBe(40);
  expect(inkLevel(0, 15)).toBe(0);
  expect(inkLevel(20, 15)).toBe(100);
  expect(inkLevel(3, 0)).toBe(0);
  expect(inkLevel(-2, 15)).toBe(0);
});
