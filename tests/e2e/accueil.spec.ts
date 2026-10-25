import { test, expect } from '@playwright/test';

test('le relais se joue une fois par session', async ({ page }) => {
  await page.goto('/fr/');
  await expect(page.locator('.relais')).toHaveAttribute('data-state', 'playing');
  await expect(page.locator('.relais')).toHaveAttribute('data-state', 'done', { timeout: 8000 });
  await page.reload();
  await expect(page.locator('.relais')).toHaveAttribute('data-state', 'done');
});

test('reduced-motion : état final immédiat', async ({ browser }) => {
  const page = await (await browser.newContext({ reducedMotion: 'reduce' })).newPage();
  await page.goto('/fr/');
  await expect(page.locator('.relais')).toHaveAttribute('data-state', 'done');
  await expect(page.locator('.phrase-or')).toHaveText('Deux façons d’aider.');
  await expect(page.locator('.phrase-or')).toBeVisible();
});

test('sans sessionStorage, l’intro se joue sans erreur', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.addInitScript(() =>
    Object.defineProperty(window, 'sessionStorage', { get() { throw new Error('denied'); } }),
  );
  await page.goto('/fr/');
  await expect(page.locator('.relais')).toHaveAttribute('data-state', 'done', { timeout: 8000 });
  expect(errors).toEqual([]);
});

test('les portes sont cliquables pendant l’animation', async ({ page }) => {
  await page.goto('/fr/');
  await expect(page.locator('.relais')).toHaveAttribute('data-state', 'playing');
  await page.locator('.porte--ecriture').click();
  await expect(page).toHaveURL(/\/fr\/ecriture$/);
});

test('textes du héros en anglais', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.locator('.porte--code')).toContainText('Melindes');
  await expect(page.locator('.porte--ecriture')).toContainText('Bindjé');
  await expect(page.locator('.phrase')).toContainText('Melindes solves.');
  await expect(page.locator('.phrase')).toContainText('Bindjé tells.');
  await expect(page.locator('.phrase-or')).toHaveText('Two ways to help.');
});
