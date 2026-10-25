import { test, expect } from '@playwright/test';

test('l’affiche se joue une fois par session', async ({ page }) => {
  await page.goto('/fr/');
  await expect(page.locator('.affiche')).toHaveAttribute('data-state', 'playing');
  await expect(page.locator('.affiche')).toHaveAttribute('data-state', 'done', { timeout: 6000 });
  await page.reload();
  await expect(page.locator('.affiche')).toHaveAttribute('data-state', 'done');
});

test('reduced-motion : état final immédiat', async ({ browser }) => {
  const page = await (await browser.newContext({ reducedMotion: 'reduce' })).newPage();
  await page.goto('/fr/');
  await expect(page.locator('.affiche')).toHaveAttribute('data-state', 'done');
  await expect(page.locator('.affiche .photo')).toBeVisible();
});

test('sans sessionStorage, l’affiche se joue sans erreur', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.addInitScript(() =>
    Object.defineProperty(window, 'sessionStorage', { get() { throw new Error('denied'); } }),
  );
  await page.goto('/fr/');
  await expect(page.locator('.affiche')).toHaveAttribute('data-state', 'done', { timeout: 6000 });
  expect(errors).toEqual([]);
});

test('PORT / FOLIO empilés à gauche, photo à droite (ordinateur)', async ({ browser }) => {
  const page = await (await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1280, height: 800 } })).newPage();
  await page.goto('/fr/');
  await expect(page.locator('.affiche .mot .haut')).toHaveText('PORT');
  await expect(page.locator('.affiche .mot .bas')).toHaveText('FOLIO');
  const haut = await page.locator('.affiche .mot .haut').boundingBox();
  const bas = await page.locator('.affiche .mot .bas').boundingBox();
  expect(bas!.y).toBeGreaterThan(haut!.y);
  const mot = await page.locator('.affiche .mot').boundingBox();
  const photo = await page.locator('.affiche .photo').boundingBox();
  expect(photo!.x).toBeGreaterThanOrEqual(mot!.x + mot!.width - 40);
});

test('bandeau doré défilant sous l’affiche', async ({ page }) => {
  await page.goto('/fr/');
  await expect(page.locator('.affiche + .defilant, .affiche .defilant')).toContainText('MELINDES RÉSOUT');
});

test('photo détourée avec texte alternatif', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.locator('.affiche .photo')).toHaveAttribute('alt', 'Portrait of Mandah Célestin Wilfried Bindjé');
});

test('les portes sont cliquables pendant l’animation', async ({ page }) => {
  await page.goto('/fr/');
  await expect(page.locator('.affiche')).toHaveAttribute('data-state', 'playing');
  await page.locator('.porte--ecriture').click();
  await expect(page).toHaveURL(/\/fr\/ecriture$/);
});

test('textes des portes en anglais', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.locator('.porte--code')).toContainText('Melindes solves.');
  await expect(page.locator('.porte--code')).toContainText('See the code →');
  await expect(page.locator('.porte--ecriture')).toContainText('Bindjé tells.');
  await expect(page.locator('.porte--ecriture')).toContainText('Read the stories →');
});

test('logo PORTFOLIO dans l’en-tête', async ({ page }) => {
  for (const p of ['/fr/', '/fr/code', '/fr/ecriture']) {
    await page.goto(p);
    await expect(page.locator('header.entete .logo')).toContainText('PORTFOLIO');
  }
});

for (const width of [320, 375]) {
  test(`textes des portes entièrement visibles sur mobile @${width}`, async ({ browser }) => {
    const page = await (await browser.newContext({ reducedMotion: 'reduce', viewport: { width, height: 800 } })).newPage();
    await page.goto('/en/');
    await page.evaluate(() => document.fonts.ready);
    const debords = await page.locator('.porte > *').evaluateAll((els) =>
      els.filter((e) => { const r = e.getBoundingClientRect(); return r.left < 0 || r.right > window.innerWidth; }).map((e) => e.textContent),
    );
    expect(debords).toEqual([]);
  });
}
