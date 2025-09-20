<script setup lang="ts">
import { config as siteConfig } from '@/config/config';

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
    <Toast position='top-right' />
  </div>
</template>
