import { config } from '@/config/config';
import type { OpenGraphType, SiteMetadata } from '@/entities/common/common.types';

/**
 * @description Nuxt.js용 메타데이터 설정 컴포저블
 * Next.js의 setMeta 헬퍼와 동일한 기능을 제공합니다.
 */
export const useSetMeta = (meta: SiteMetadata) => {
  const siteDescription = meta.description || config.site.description;
  const siteKeywords = meta.keywords
    ? `${config.site.keywords}, ${meta.keywords}`
    : config.site.keywords;
  const siteUrl = `${config.site.url}${meta.url}`;
  const siteImageLink = meta.imageLink
    ? `${config.site.url}${meta.imageLink}`
    : `${config.site.url}${config.images.cover.link}`;
  const siteImageAlt = meta.imageAlt || config.images.cover.alt;
  const siteType = meta.type || (config.site.type as OpenGraphType);

  // Nuxt.js useHead로 메타데이터 설정
  useHead({
    title: meta.title,
    meta: [
      { name: 'description', content: siteDescription, },
      { name: 'keywords', content: siteKeywords, },
      { name: 'author', content: config.author.name, },
      { name: 'robots', content: meta.robots || 'index, follow', },
      { name: 'generator', content: 'Nuxt.js', },
      { name: 'google-site-verification', content: config.google.verification, },
      { name: 'version', content: config.site.version, },

      // Open Graph
      { property: 'og:title', content: meta.title, },
      { property: 'og:description', content: siteDescription, },
      { property: 'og:locale', content: 'ko_KR', },
      { property: 'og:type', content: siteType, },
      { property: 'og:site_name', content: config.site.title, },
      { property: 'og:url', content: siteUrl, },
      { property: 'og:image', content: siteImageLink, },
      { property: 'og:image:width', content: '1920', },
      { property: 'og:image:height', content: '1080', },
      { property: 'og:image:alt', content: siteImageAlt, },

      // Twitter
      { name: 'twitter:card', content: 'summary_large_image', },
      { name: 'twitter:image', content: siteImageLink, },
      { name: 'twitter:image:width', content: '1920', },
      { name: 'twitter:image:height', content: '1080', },
      { name: 'twitter:image:alt', content: siteImageAlt, },
    ],
    link: [
      { rel: 'canonical', href: siteUrl, },
    ],
    htmlAttrs: {
      lang: 'ko',
    },
  });

  // 설정된 메타데이터 반환 (디버깅용)
  return {
    title: meta.title,
    description: siteDescription,
    keywords: siteKeywords,
    url: siteUrl,
    imageLink: siteImageLink,
    imageAlt: siteImageAlt,
    type: siteType,
  };
};
