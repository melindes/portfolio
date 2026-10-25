import type { Page } from '@playwright/test';

/** Ouvre le menu ☰ s'il est affiché (mobile), puis renvoie la navigation principale. */
export async function navigation(page: Page) {
  const menu = page.getByRole('button', { name: /menu/i });
  if (await menu.isVisible()) await menu.click();
  return page.getByRole('navigation', { name: 'Navigation principale' });
}
