import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { PAGES } from './pages';

for (const p of PAGES) {
  test(`axe ${p}`, async ({ browser }) => {
    // reduced-motion : état final immédiat, pas d'élément en cours de fondu qui fausserait les contrastes.
    const page = await (await browser.newContext({ reducedMotion: 'reduce' })).newPage();
    await page.goto(p);
    for (const theme of ['clair', 'sombre']) {
      await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
      const r = await new AxeBuilder({ page }).analyze();
      const graves = r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      expect(graves.map((v) => `${theme}: ${v.id} → ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
    }
  });
}
