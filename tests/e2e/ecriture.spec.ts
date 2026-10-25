import { test, expect } from '@playwright/test';

test('liste : univers sombre, projet phare puis romans à venir', async ({ page }) => {
  await page.goto('/fr/ecriture');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'sombre');
  await expect(page.locator('.phare')).toContainText('Les larmes du présent');
  await expect(page.locator('.carte-roman')).toHaveCount(3);
  await expect(page.locator('.ce-que-je-fais')).toContainText('Animation');
});

test('fiche Les larmes du présent', async ({ page }) => {
  await page.goto('/fr/ecriture/les-larmes-du-present');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'sombre');
  await expect(page.locator('h1')).toHaveText(/Les larmes\s*du présent/);
  await expect(page.getByText('★ Projet phare · en cours d’écriture')).toBeVisible();
  await expect(page.locator('.extrait')).toContainText('offrir du pain à quelqu’un qui meurt de soif');
  const niveaux = await page.locator('.livre').evaluateAll((els) => els.map((e) => e.getAttribute('data-niveau')));
  expect(niveaux).toEqual(['100', '40', '0']);
  await expect(page.locator('.livre .plume')).toHaveCount(1);
  await expect(page.locator('.trois-livres')).toContainText('chapitre 22 en cours');
  await expect(page.locator('#rejoindre a')).toHaveCount(4);
  await expect(page.locator('#rejoindre a').first()).toHaveAttribute('href', '/fr/contact?motif=beta-lecture&oeuvre=les-larmes-du-present');
});

test('les trois livres affichent leur encre (reduced-motion)', async ({ browser }) => {
  const page = await (await browser.newContext({ reducedMotion: 'reduce' })).newPage();
  await page.goto('/fr/ecriture/les-larmes-du-present');
  const h = await page.locator('.livre .encre').evaluateAll((els) => els.map((e) => Math.round((e as HTMLElement).getBoundingClientRect().height)));
  const total = await page.locator('.livre').first().evaluate((e) => Math.round(e.getBoundingClientRect().height));
  expect(h[0]).toBeGreaterThan(total * 0.9);
  expect(h[1]).toBeGreaterThan(total * 0.3);
  expect(h[1]).toBeLessThan(total * 0.5);
  expect(h[2]).toBe(0);
});

test('roman à venir sans pitch : titre et badge seulement', async ({ page }) => {
  await page.goto('/fr/ecriture/pokou');
  await expect(page.locator('h1')).toHaveText('Pokou, héroïne malgré elle');
  await expect(page.getByText('○ À venir', { exact: true })).toBeVisible();
  await expect(page.locator('.resume')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Être prévenu' })).toHaveAttribute('href', '/fr/contact?motif=soutien&oeuvre=pokou');
});

test('repli FR quand la traduction EN manque', async ({ page }) => {
  const r = await page.goto('/en/writing/pokou');
  expect(r?.status()).toBe(200);
  await expect(page.getByText('Translation coming soon')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('extrait absent → section masquée', async ({ page }) => {
  await page.goto('/fr/ecriture/toi-moi-nous');
  await expect(page.locator('.extrait')).toHaveCount(0);
});

test('fiche anglaise traduite', async ({ page }) => {
  await page.goto('/en/writing/les-larmes-du-present');
  await expect(page.getByText('The Tears of the Present')).toBeVisible();
  await expect(page.getByText('Translation coming soon')).toHaveCount(0);
});

test('page EN non traduite : le contenu est déclaré en français', async ({ page }) => {
  await page.goto('/en/writing/pokou');
  await expect(page.locator('main')).toHaveAttribute('lang', 'fr');
  await expect(page.getByText('Translation coming soon')).toHaveAttribute('lang', 'en');
});
