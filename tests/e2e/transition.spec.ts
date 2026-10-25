import { test, expect } from '@playwright/test';

test('accueil → écriture sans rechargement complet ni erreur', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/fr/');
  await page.evaluate(() => ((window as unknown as { __marqueur: number }).__marqueur = 1));
  await page.locator('.porte--ecriture').click();
  await expect(page).toHaveURL(/\/fr\/ecriture$/);
  await expect(page.locator('.bandeau-section')).toBeVisible();
  expect(await page.evaluate(() => (window as unknown as { __marqueur?: number }).__marqueur)).toBe(1);
  expect(errors).toEqual([]);
});

test('le thème choisi survit à la navigation', async ({ page }) => {
  await page.goto('/fr/ecriture');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'sombre');
  await page.getByRole('button', { name: /mode clair/i }).click();
  await page.getByRole('navigation', { name: 'Navigation principale' }).getByRole('link', { name: 'Code' }).click();
  await expect(page).toHaveURL(/\/fr\/code$/);
  await page.getByRole('navigation', { name: 'Navigation principale' }).getByRole('link', { name: 'Écriture' }).click();
  await expect(page).toHaveURL(/\/fr\/ecriture$/);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'clair');
});
