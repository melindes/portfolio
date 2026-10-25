import { test, expect } from '@playwright/test';
import { PAGES } from './pages';

for (const p of PAGES) {
  for (const width of [320, 375]) {
    test(`pas de défilement horizontal ${p} @${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(p);
      const ok = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
      expect(ok).toBe(true);
    });
  }
}
