import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  reporter: 'line',
  use: { baseURL: 'http://localhost:4321' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } } },
    { name: 'mobile', use: { ...devices['Desktop Chrome'], viewport: { width: 375, height: 812 }, hasTouch: true } },
  ],
  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://localhost:4321/',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    env: { PUBLIC_WEB3FORMS_KEY: 'cle-de-test' },
  },
});
