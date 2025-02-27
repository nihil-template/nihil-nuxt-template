import tailwindcss from '@tailwindcss/vite';
import { siteConfig } from './config/site.config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        {
          name: 'version',
          content: siteConfig.version,
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.cdnfonts.com/css/cascadia-code',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&family=Noto+Serif+KR:wght@200..900&display=swap',
        },
      ],
    },
  },

  devtools: { enabled: true, },
  css: [ '~/assets/css/main.css', ],

  vite: {
    plugins: [ tailwindcss(), ],
  },

  modules: [ '@pinia/nuxt', ],

  imports: {
    dirs: [ 'types/*.ts', 'types/**/*.ts', 'config/**', 'utils/**', 'stores/**', ],
  },

  devServer: {
    port: 3000,
  },

  compatibilityDate: '2025-02-24',
});
