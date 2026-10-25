import { test, expect, type Page } from '@playwright/test';

const API = 'https://api.web3forms.com/submit';

async function remplir(page: Page) {
  await page.getByLabel('Nom').fill('Awa K.');
  await page.getByLabel('Email').fill('awa@example.com');
  await page.getByLabel('Message').fill('Je veux lire !');
}

test('pré-remplissage depuis l’URL', async ({ page }) => {
  await page.goto('/fr/contact?motif=voix&oeuvre=les-larmes-du-present');
  await expect(page.getByLabel('Motif')).toHaveValue('voix');
  await expect(page.locator('input[name="oeuvre"]')).toHaveValue('les-larmes-du-present');
});

test('motif piégé → « autre », rien d’injecté', async ({ page }) => {
  await page.goto('/fr/contact?motif=%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E');
  await expect(page.getByLabel('Motif')).toHaveValue('autre');
  await expect(page.locator('img[src="x"]')).toHaveCount(0);
});

test('envoi réussi', async ({ page }) => {
  let corps = '';
  await page.route(API, async (r) => { corps = r.request().postData() ?? ''; await r.fulfill({ json: { success: true } }); });
  await page.goto('/fr/contact?motif=beta-lecture');
  await remplir(page);
  await page.getByRole('button', { name: 'Envoyer' }).click();
  await expect(page.getByText('Merci, je te réponds vite.')).toBeVisible();
  expect(corps).toContain('[Portfolio] Bêta-lecture — Awa K.');
  expect(corps).not.toContain('"botcheck":true');
});

test('échec réseau → message d’erreur, bouton réactivé', async ({ page }) => {
  await page.route(API, (r) => r.abort());
  await page.goto('/fr/contact');
  await remplir(page);
  await page.getByRole('button', { name: 'Envoyer' }).click();
  await expect(page.getByText('L’envoi a échoué, réessaie.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Envoyer' })).toBeEnabled();
});

test('réponse refusée par le service → message d’erreur', async ({ page }) => {
  await page.route(API, (r) => r.fulfill({ status: 400, json: { success: false } }));
  await page.goto('/fr/contact');
  await remplir(page);
  await page.getByRole('button', { name: 'Envoyer' }).click();
  await expect(page.getByText('L’envoi a échoué, réessaie.')).toBeVisible();
});

test('champs requis : pas d’envoi si vide', async ({ page }) => {
  let appels = 0;
  await page.route(API, (r) => { appels++; return r.fulfill({ json: { success: true } }); });
  await page.goto('/fr/contact');
  await page.getByRole('button', { name: 'Envoyer' }).click();
  await expect(page.getByText('Merci, je te réponds vite.')).toBeHidden();
  expect(appels).toBe(0);
});

test('page de remerciement', async ({ page }) => {
  await page.goto('/en/contact/merci');
  await expect(page.locator('h1')).toHaveText('Thank you!');
});

test('message d’erreur sans email de secours : pas de répétition', async ({ page }) => {
  await page.route(API, (r) => r.abort());
  await page.goto('/fr/contact');
  await remplir(page);
  await page.getByRole('button', { name: 'Envoyer' }).click();
  const texte = (await page.locator('.erreur').innerText()).trim();
  expect(texte.match(/réessaie/gi)?.length ?? 0).toBe(1);
});

test('requête qui ne répond jamais → erreur après le délai maximal', async ({ page }) => {
  await page.clock.install();
  await page.route(API, () => { /* ne répond jamais */ });
  await page.goto('/fr/contact');
  await remplir(page);
  await page.getByRole('button', { name: 'Envoyer' }).click();
  await expect(page.getByRole('button', { name: 'Envoi…' })).toBeDisabled();
  await page.clock.runFor(16_000);
  await expect(page.getByText('L’envoi a échoué', { exact: false })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Envoyer' })).toBeEnabled();
});
