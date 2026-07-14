// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://madhellequin.github.io',
  // MDX lets articles embed the build-time <Chart /> component inline.
  // Plain .md files keep working exactly as before.
  integrations: [mdx()],
  i18n: {
    locales: ['ru', 'uk', 'en'],
    defaultLocale: 'ru',
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
