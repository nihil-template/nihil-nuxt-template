<template>
  <AppHeader />
  <AppNav />
  <AppContent>
    <AppSide />
    <AppMain>
      <slot></slot>
    </AppMain>
  </AppContent>
  <AppFooter />
</template>

<script setup lang="ts">
  useSeoMeta({
    title: `홈 - ${siteConfig.title}`,
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    ogTitle: '홈',
    ogSiteName: siteConfig.title,
    ogDescription: siteConfig.description,
    ogUrl: siteConfig.url,
    ogImage: `${siteConfig.url}${siteConfig.image.link}`,
    ogType: 'website',
    ogLocale: 'ko_KR',
    twitterCard: 'summary_large_image',
    twitterTitle: '홈',
    twitterDescription: siteConfig.description,
    twitterImage: `${siteConfig.url}${siteConfig.image.twitterImage}`,
    twitterSite: siteConfig.url,
    twitterCreator: siteConfig.author.name,
  });
  useHead({
    meta: [ { name: 'twitter:url', content: siteConfig.url, }, ],
    link: [ { rel: 'canonical', href: siteConfig.url, }, ],
  });
</script>

<style lang="scss" scoped></style>
