import Lara from '@primevue/themes/lara';
import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: process.env.NODE_ENV !== 'production', },

  // 개발 서버 포트 설정
  devServer: {
    port: 3000,
  },

  modules: [
    '@nuxt/image',
    '@nuxt/scripts',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@primevue/nuxt-module',
  ],

  // PrimeVue 설정 (Lara 테마 + TailwindCSS)
  primevue: {
    options: {
      theme: {
        preset: Lara,
        options: {
          prefix: 'p',
          darkModeSelector: '.dark',
          cssLayer: false,
        },
      },
      ripple: true,
      ptOptions: {
        mergeSections: true,
        mergeProps: true,
      },
    },
    autoImport: true,
    components: {
      include: '*',
      exclude: [ 'Chart', 'Editor', ],
    },
  },

  css: [ '~/assets/styles/tailwind.css', ],

  // 런타임 플래그 (클라이언트에서 dev 여부 판단용)
  runtimeConfig: {
    dev: process.env.NODE_ENV !== 'production',
    public: {
      dev: process.env.NODE_ENV !== 'production',
    },
  },

  // 컴포넌트 자동 import 설정
  components: [
    {
      path: '~/components',
      pathPrefix: false,
      extensions: [ '.vue', ],
      ignore: [ '**/index.ts', '**/index.js', ],
    },
  ],

  // stores 자동 import 설정
  imports: {
    dirs: [
      'composables/**',
      'composables/**/*',
      'entities/*/*.store',
    ],
    global: true,
  },

  // pages 폴더 내 components 폴더를 라우트로 인식하지 않도록 설정
  pages: {
    pattern: [ '**/*.vue', '!**/components/**', ],
  },

  // 컴포넌트 중복 해결 설정
  experimental: {
    componentIslands: false,
  },

  build: {
    transpile: [ '@vue/devtools-api', 'primevue', ],
  },

  vite: {
    optimizeDeps: {
      exclude: [ '@vue/devtools-api', ],
    },
    plugins: [
      tailwindcss(),
    ],
    ssr: {
      noExternal: [ 'primevue', ],
    },
  },

});
