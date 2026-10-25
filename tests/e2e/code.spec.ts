import { test, expect } from '@playwright/test';

test('liste des projets publiés, univers clair', async ({ page }) => {
  await page.goto('/fr/code');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'clair');
  const projets = page.locator('.projets');
  await expect(projets.getByRole('link', { name: /My Life/ })).toBeVisible();
  await expect(projets.getByRole('link', { name: /Portfolio/ })).toBeVisible();
  await expect(page.getByText(/TutorLink/)).toHaveCount(0);
});

test('TutorLink non publié → 404', async ({ page }) => {
  expect((await page.goto('/fr/code/tutorlink'))?.status()).toBe(404);
});

test('fiche My Life', async ({ page }) => {
  await page.goto('/fr/code/my-life');
  await expect(page.getByText('◐ Bientôt disponible · Android')).toBeVisible();
  await expect(page.getByText('Donne une direction à chaque partie de ta vie.')).toBeVisible();
  await expect(page.locator('.fonctionnalite')).toHaveCount(5);
  await expect(page.locator('.play')).not.toHaveAttribute('href', /.+/);
  await expect(page.getByRole('link', { name: /Être prévenu/ }).first()).toHaveAttribute('href', '/fr/contact?motif=my-life');
  await expect(page.locator('.technos')).toContainText('Supabase (back-end)');
});

test('fiche My Life en anglais', async ({ page }) => {
  await page.goto('/en/code/my-life');
  await expect(page.getByText('Give direction to every part of your life.')).toBeVisible();
  await expect(page.getByText('Translation coming soon')).toHaveCount(0);
});

test('bloc « Ce que je fais » et compétences côté code', async ({ page }) => {
  await page.goto('/fr/code');
  const bloc = page.locator('.ce-que-je-fais');
  await expect(bloc).toContainText('Design');
  await expect(bloc).toContainText('◐ En cours');
  await expect(page.locator('.competences')).toContainText('Flutter');
  await expect(page.getByRole('link', { name: 'Travaillons ensemble' })).toHaveAttribute('href', '/fr/contact?motif=recrutement');
});
