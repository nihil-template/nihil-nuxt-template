<template>
  <div>
    test
    <slot></slot>
  </div>
</template>

<script setup>
useSeoMeta({
  title: `홈 - ${siteConfig.title}`,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  ogTitle: "홈",
  ogSiteName: siteConfig.title,
  ogDescription: siteConfig.description,
  ogUrl: siteConfig.url,
  ogImage: `${siteConfig.url}/opengraph-image.png`,
  ogType: "website",
  ogLocale: "ko_KR",
  twitterCard: "summary_large_image",
  twitterTitle: "홈",
  twitterDescription: siteConfig.description,
  twitterImage: `${siteConfig.url}/twitter-image.png`,
  twitterUrl: siteConfig.url,
  twitterSite: siteConfig.url,
  twitterCreator: siteConfig.author.name,
});
useHead({
  link: [{ rel: "canonical", href: siteConfig.url }],
});
</script>

<style lang="scss" scoped></style>
