import { test, expect } from '@playwright/test';

test('le sélecteur garde la page courante', async ({ page }) => {
  await page.goto('/fr/contact');
  await page.getByRole('link', { name: 'EN', exact: true }).click();
  await expect(page).toHaveURL(/\/en\/contact$/);
});

test('le sélecteur traduit le chemin de la section Écriture', async ({ page }) => {
  await page.goto('/fr/ecriture/les-larmes-du-present');
  await page.getByRole('link', { name: 'EN', exact: true }).click();
  await expect(page).toHaveURL(/\/en\/writing\/les-larmes-du-present$/);
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
