import type { SiteConfig } from '~/types';

export const siteConfig: SiteConfig = {
  title: '랜덤 키워드',
  description: '창작자를 위한 랜덤 키워드 생성기',
  keywords: 'creator, keyword, random, generator, 키워드, 랜덤, 생성기, 창작자',
  author: {
    name: 'NIHILncunia',
    url: 'https://github.com/NIHILncunia',
  },
  type: 'website',
  url: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'http://localhost:3000',
  image: {
    link: '/opengraph-image.png',
    alt: 'site image',
  },
  version: 'v0.0.0',
  googleVerfi: '',
  googleAdSrc: '',
  googleAnalyticsId: '',
  get isBaseUrl() {
    return `${this.url}/api`;
  },
};
