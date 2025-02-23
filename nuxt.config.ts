import tailwindcss from "@tailwindcss/vite";
import { siteConfig } from "./config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.cdnfonts.com/css/cascadia-code'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&family=Noto+Serif+KR:wght@200..900&display=swap'
        }
      ]
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss()
    ],
  },
  modules: [
    '@pinia/nuxt',
  ],
  devServer: {
    port: 3000,
  }
})
