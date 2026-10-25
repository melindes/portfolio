import { test, expect } from '@playwright/test';

test('portrait centré sur la frontière, nom et diplôme', async ({ page }) => {
  await page.goto('/fr/');
  const bloc = page.locator('.qui-suis-je');
  await bloc.scrollIntoViewIfNeeded();
  const sec = await page.locator('.qui-suis-je .frontiere').boundingBox();
  const img = await page.locator('.qui-suis-je img').boundingBox();
  expect(Math.abs(img!.x + img!.width / 2 - (sec!.x + sec!.width / 2))).toBeLessThan(2);
  await expect(page.locator('.qui-suis-je h2.nom')).toHaveText(/Mandah Célestin Wilfried Bindjé/);
  await expect(bloc).toContainText('Licence MIAGE');
  await expect(page.locator('.qui-suis-je img')).toHaveAttribute('alt', 'Portrait de Mandah Célestin Wilfried Bindjé');
});

test('appels vers les projets et l’aventure', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.getByRole('link', { name: 'See my projects' })).toHaveAttribute('href', '/en/code');
  await expect(page.getByRole('link', { name: 'Join the adventure' })).toHaveAttribute('href', '/en/writing/les-larmes-du-present#rejoindre');
});
