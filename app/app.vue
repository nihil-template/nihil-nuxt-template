<script setup lang="ts">
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';

import { config as siteConfig } from '@/config/config';

// 런타임 설정 가져오기
const config = useRuntimeConfig();

// Vue Query 클라이언트 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 10 * 1000, // 10분
      gcTime: 60 * 12 * 1000, // 12분
      refetchOnWindowFocus: false,
      retry: false,
    },
    mutations: {
      retry: false,
      gcTime: 60 * 12 * 1000, // 12분
    },
  },
});

// Vue Query 플러그인 등록
const nuxtApp = useNuxtApp();
nuxtApp.vueApp.use(VueQueryPlugin, { queryClient });

// 기본 앱 레이아웃
useHead({
  titleTemplate: title => title
    ? `${title} - ${siteConfig.site.title}`
    : siteConfig.site.title,
  title: siteConfig.site.title,
  meta: [
    { name: 'description', content: siteConfig.site.description },
    { name: 'keywords', content: siteConfig.site.keywords },
    { name: 'author', content: siteConfig.author.name },
    { name: 'generator', content: 'Jetbrains Webstorm' },
    { name: 'google-site-verification', content: siteConfig.google.verification },
    { name: 'version', content: siteConfig.site.version },
    // Open Graph
    { property: 'og:title', content: 'home' },
    { property: 'og:description', content: siteConfig.site.description },
    { property: 'og:locale', content: 'ko_KR' },
    { property: 'og:type', content: siteConfig.site.type },
    { property: 'og:site_name', content: siteConfig.site.title },
    { property: 'og:url', content: siteConfig.site.url },
    { property: 'og:image', content: `${siteConfig.site.url}/opengraph-image.png` },
    { property: 'og:image:width', content: '1920' },
    { property: 'og:image:height', content: '1080' },
    { property: 'og:image:alt', content: siteConfig.images.cover.alt },
    // Twitter
    { name: 'twitter:image', content: `${siteConfig.site.url}/twitter-image.png` },
    { name: 'twitter:image:width', content: '1920' },
    { name: 'twitter:image:height', content: '1080' },
    { name: 'twitter:image:alt', content: 'twitter site image' },
    // Canonical
    { name: 'canonical', content: siteConfig.site.url },
  ],
  htmlAttrs: {
    lang: 'ko',
  },
});

// Canonical link 설정
useHead({
  link: [
    { rel: 'canonical', href: siteConfig.site.url },
  ],
});

// Google Analytics 스크립트
if (siteConfig.google.adSrc) {
  useHead({
    script: [
      { src: siteConfig.google.adSrc, async: true, crossorigin: 'anonymous' },
    ],
  });
}

if (siteConfig.google.analyticsId) {
  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${siteConfig.google.analyticsId}`,
        async: true,
      },
      {
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${siteConfig.google.analyticsId}');
        `,
      },
    ],
  });
}
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Vue Query Devtools - 개발 환경에서만 표시 (prod 빌드 차단) -->
    <ClientOnly>
      <VueQueryDevtools
        v-if='config.public.dev'
        :initial-is-open='false'
      />
    </ClientOnly>

    <!-- 전역 토스트 -->
    <ClientOnly>
      <Sonner
        position='top-center'
        :rich-colors='true'
      />
    </ClientOnly>
  </div>
</template>
