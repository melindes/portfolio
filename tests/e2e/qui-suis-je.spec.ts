import { test, expect } from '@playwright/test';

test('récit en deux colonnes : My Life et le roman avec son avancement', async ({ page }) => {
  await page.goto('/fr/');
  const recit = page.locator('.recit');
  await expect(recit.locator('.col--code')).toContainText('Melindes résout');
  await expect(recit.locator('.col--code').getByRole('link', { name: /My Life/ })).toHaveAttribute('href', '/fr/code/my-life');
  await expect(recit.locator('.col--ecriture')).toContainText('Bindjé raconte');
  await expect(recit.locator('.col--ecriture').getByRole('link', { name: /Les larmes du présent/ })).toHaveAttribute('href', '/fr/ecriture/les-larmes-du-present');
  await expect(recit.locator('.col--ecriture')).toContainText('21 / 45');
});

test('nom en haut de l’affiche, sans diplôme ni bloc « Qui suis-je »', async ({ page }) => {
  await page.goto('/fr/');
  await expect(page.locator('.affiche .identite')).toHaveText('Mandah Célestin Wilfried Bindjé');
  await expect(page.locator('main')).not.toContainText('Licence MIAGE');
  await expect(page.locator('.qui-suis-je')).toHaveCount(0);
});

test('la formation est sur la page Code', async ({ page }) => {
  await page.goto('/fr/code');
  await expect(page.locator('.competences')).toContainText('Formation');
  await expect(page.locator('.competences')).toContainText('Licence MIAGE');
});

test('bandeau « Rejoindre l’aventure » avec les quatre motifs', async ({ page }) => {
  await page.goto('/fr/');
  const liens = page.locator('.rejoindre-bandeau a');
  await expect(liens).toHaveCount(4);
  await expect(liens.nth(0)).toHaveAttribute('href', '/fr/contact?motif=beta-lecture&oeuvre=les-larmes-du-present');
  await expect(liens.nth(3)).toHaveAttribute('href', '/fr/contact?motif=recrutement');
});
