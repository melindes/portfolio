import { test, expect } from '@playwright/test';

test('la racine envoie vers /fr/ par défaut', async ({ browser }) => {
  const ctx = await browser.newContext({ locale: 'fr-FR' });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(page).toHaveURL(/\/fr\/$/);
});

test('la racine envoie vers /en/ pour un navigateur anglais', async ({ browser }) => {
  const ctx = await browser.newContext({ locale: 'en-US' });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(page).toHaveURL(/\/en\/$/);
});

test('/fr/ et /en/ répondent avec la bonne langue', async ({ page }) => {
  for (const l of ['fr', 'en']) {
    const r = await page.goto(`/${l}/`);
    expect(r?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', l);
  }
});
