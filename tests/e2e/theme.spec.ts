import { test, expect } from '@playwright/test';

// Page d'univers sombre par défaut (temporairement /fr/test-theme, puis /fr/ecriture en Task 10).
const PAGE_SOMBRE = '/fr/test-theme';

test('le choix de thème persiste après rechargement', async ({ page }) => {
  await page.goto(PAGE_SOMBRE);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'sombre');
  await page.getByRole('button', { name: /mode clair|mode sombre/i }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'clair');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'clair');
});

test('sans localStorage, le thème par défaut s’applique sans erreur', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.addInitScript(() =>
    Object.defineProperty(window, 'localStorage', { get() { throw new Error('denied'); } }),
  );
  await page.goto(PAGE_SOMBRE);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'sombre');
  await page.getByRole('button', { name: /mode clair|mode sombre/i }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'clair');
  expect(errors).toEqual([]);
});
