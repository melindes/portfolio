// @ts-check
import { defineConfig } from 'astro/config';

// Adresse publique du site (ex. https://melindes-bindje.pages.dev), utilisée pour les liens hreflang,
// la redirection du formulaire sans JavaScript et le plan du site. À définir dans Cloudflare Pages.
const site = process.env.SITE_URL || undefined;

export default defineConfig({
  site,
  build: { inlineStylesheets: 'always' },
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
});
