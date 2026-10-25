import { test, expect } from '@playwright/test';

test('le choix clair/sombre est propre à chaque univers', async ({ page }) => {
  await page.goto('/fr/code');
  await page.getByRole('button', { name: /mode sombre/i }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'sombre');
  await page.goto('/fr/ecriture');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'sombre');
  await page.getByRole('button', { name: /mode clair/i }).click();
  await page.goto('/fr/code');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'sombre');
  await page.goto('/fr/ecriture');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'clair');
});

test('menu ☰ sur mobile', async ({ browser }) => {
  const page = await (await browser.newContext({ viewport: { width: 375, height: 800 } })).newPage();
  await page.goto('/fr/code');
  const lien = page.getByRole('navigation', { name: 'Navigation principale' }).getByRole('link', { name: 'Écriture' });
  await expect(lien).toBeHidden();
  const bouton = page.getByRole('button', { name: /menu/i });
  await expect(bouton).toHaveAttribute('aria-expanded', 'false');
  await bouton.click();
  await expect(bouton).toHaveAttribute('aria-expanded', 'true');
  await expect(lien).toBeVisible();
  await lien.click();
  await expect(page).toHaveURL(/\/fr\/ecriture$/);
});

test('pas de menu ☰ sur ordinateur : liens visibles', async ({ browser }) => {
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 800 } })).newPage();
  await page.goto('/fr/code');
  await expect(page.getByRole('button', { name: /menu/i })).toBeHidden();
  await expect(page.getByRole('navigation', { name: 'Navigation principale' }).getByRole('link', { name: 'Écriture' })).toBeVisible();
});

test('bandeaux d’affiche des sections', async ({ page }) => {
  await page.goto('/fr/code');
  await expect(page.locator('.bandeau-section h1')).toHaveText('CODE');
  await expect(page.locator('.bandeau-section .numero')).toContainText('01');
  await expect(page.locator('.defilant')).toHaveAttribute('aria-hidden', 'true');
  await expect(page.locator('.defilant')).toContainText('FLUTTER');
  await page.goto('/en/writing');
  await expect(page.locator('.bandeau-section h1')).toHaveText('WRITING');
  await expect(page.locator('.bandeau-section .numero')).toContainText('02');
});

test('carte My Life avec trois captures', async ({ page }) => {
  await page.goto('/fr/code');
  await expect(page.locator('.carte-projet').filter({ hasText: 'My Life' }).locator('img')).toHaveCount(3);
});

test('« Travaillons ensemble » remplace « recrutement / collaboration »', async ({ page }) => {
  await page.goto('/fr/code');
  await expect(page.getByRole('link', { name: 'Travaillons ensemble' })).toHaveAttribute('href', '/fr/contact?motif=recrutement');
  await expect(page.getByText(/recrutement \/ collaboration/)).toHaveCount(0);
  await page.goto('/fr/contact?motif=recrutement');
  await expect(page.getByLabel('Motif').locator('option:checked')).toHaveText('Proposer un poste ou un projet');
});

test('romans à venir présentés comme des couvertures', async ({ page }) => {
  await page.goto('/fr/ecriture');
  const cartes = page.locator('.carte-roman');
  await expect(cartes).toHaveCount(3);
  await expect(cartes.first()).toContainText('Pokou');
  await expect(cartes.first()).toContainText('héroïne malgré elle');
});

test('le titre d’un roman n’est coupé que devant un vrai sous-titre', async ({ page }) => {
  await page.goto('/fr/ecriture');
  const toi = page.locator('.carte-roman').filter({ hasText: 'Toi' });
  await expect(toi.locator('.principal')).toHaveText('Toi, Moi, Nous !');
  await expect(toi.locator('.sous')).toHaveCount(0);
  const pokou = page.locator('.carte-roman').filter({ hasText: 'Pokou' });
  await expect(pokou.locator('.principal')).toHaveText('Pokou');
  await expect(pokou.locator('.sous')).toHaveText('héroïne malgré elle');
});

