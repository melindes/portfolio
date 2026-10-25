import { test, expect } from '@playwright/test';

// Cible provisoire /fr/ → /en/ ; repassée sur /fr/contact en Task 11.
test('le sélecteur garde la page courante', async ({ page }) => {
  await page.goto('/fr/');
  await page.getByRole('link', { name: 'EN', exact: true }).click();
  await expect(page).toHaveURL(/\/en\/$/);
});

test('liens hreflang vers les deux langues', async ({ page }) => {
  await page.goto('/fr/');
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute('href', /\/en\/$/);
  await expect(page.locator('link[rel="alternate"][hreflang="fr"]')).toHaveAttribute('href', /\/fr\/$/);
});

test('404 bilingue avec liens vers les deux univers', async ({ page }) => {
  const r = await page.goto('/fr/nexiste-pas');
  expect(r?.status()).toBe(404);
  await expect(page.getByRole('main').getByRole('link', { name: /code/i }).first()).toBeVisible();
  await expect(page.getByRole('main').getByRole('link', { name: /écriture|writing/i }).first()).toBeVisible();
});
