export const config = {
  title: process.env.NUXT_PUBLIC_SITE_TITLE || 'Next.js + NestJS 템플릿',
  description:
    process.env.NUXT_PUBLIC_SITE_DESCRIPTION || 'Next.js와 NestJS를 사용한 풀스택 웹 애플리케이션 템플릿',
  keywords:
    process.env.NUXT_PUBLIC_SITE_KEYWORDS
    || 'NestJS, Next.js, TypeScript, React, Node.js, 모노레포, 풀스택, 템플릿',
  author: {
    name: process.env.NUXT_PUBLIC_AUTHOR_NAME || '개발자',
    url: process.env.NUXT_PUBLIC_AUTHOR_URL || 'https://github.com',
  },
  type: process.env.NUXT_PUBLIC_SITE_TYPE || 'website',
  url:
    process.env.NUXT_PUBLIC_SITE_URL
    || (process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://your-domain.com'),
  cover: {
    link: process.env.NUXT_PUBLIC_COVER_LINK || '/opengraph-image.png',
    alt: process.env.NUXT_PUBLIC_COVER_ALT || '웹사이트 이미지',
  },
  logo: process.env.NUXT_PUBLIC_LOGO || '',
  darkLogo: process.env.NUXT_PUBLIC_DARK_LOGO || '',
  version: process.env.NUXT_PUBLIC_APP_VERSION || '1.0.0',
  googleVerfi: process.env.NUXT_PUBLIC_GOOGLE_VERIFICATION || '',
  googleAdSrc: process.env.NUXT_PUBLIC_GOOGLE_AD_SRC || '',
  googleAnalyticsId: process.env.NUXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
  apiRoute: process.env.NUXT_PUBLIC_API_ROUTE || 'http://localhost:8000',
};
