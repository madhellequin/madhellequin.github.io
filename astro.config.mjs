// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://madhellequin.github.io',
  i18n: {
    locales: ['ru', 'uk', 'en'],
    defaultLocale: 'ru',
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
