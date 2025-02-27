export function useSiteMeta(meta: SiteMetadata) {
  const siteDescription = meta.description || siteConfig.description;
  const siteKeywords = meta.keywords ? `${siteConfig.keywords}, ${meta.keywords}` : siteConfig.keywords;
  const siteUrl = `${siteConfig.url}${meta.url}`;
  const siteImageLink = meta.image
    ? `${siteConfig.url}${meta.image.link}`
    : `${siteConfig.url}${siteConfig.image.link}`;
  const siteType = meta.type || siteConfig.type;

  useSeoMeta({
    title: `${meta.title} - ${siteConfig.title}`,
    description: siteDescription,
    keywords: siteKeywords,
    ogTitle: meta.title,
    ogSiteName: siteConfig.title,
    ogDescription: siteDescription,
    ogUrl: siteUrl,
    ogImage: siteImageLink,
    ogType: siteType,
    ogLocale: 'ko_KR',
    twitterCard: 'summary_large_image',
    twitterTitle: meta.title,
    twitterDescription: siteDescription,
    twitterImage: siteImageLink,
    twitterSite: siteUrl,
    twitterCreator: siteConfig.author.name,
  });
  useHead({
    meta: [ { name: 'twitter:url', content: siteUrl, }, ],
    link: [ { rel: 'canonical', href: siteUrl, }, ],
  });
}
