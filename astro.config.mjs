// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// Minimal foundation: a single static page. Integrations (MDX, sitemap, RSS,
// Expressive Code, Tailwind) and the bilingual routing land with the blog
// itself — tracked in the repo issues, not implemented here.
export default defineConfig({
  // Absolute URLs (canonical, sitemap, RSS, OG) all derive from this.
  site: 'https://polycarpo.dev',
  output: 'static',
  trailingSlash: 'ignore',
});
