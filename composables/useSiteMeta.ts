export function useSiteMeta(meta: SiteMetadata) {
  const siteDescription = meta.description || siteConfig.description;
  const siteKeywords = meta.keywords
    ? `${siteConfig.keywords}, ${meta.keywords}`
    : siteConfig.keywords;
  const siteUrl = `${siteConfig.url}${meta.url}`;
  const siteImageLink = meta.image
    ? `${siteConfig.url}${meta.image.link}`
    : `${siteConfig.url}${siteConfig.image.link}`;
  const siteImageAlt = meta.image?.alt || siteConfig.image.alt;

  useSeoMeta({
    title: `${meta.title} - ${siteConfig.title}`,
    description: siteDescription,
    keywords: siteKeywords,
    ogTitle: meta.title,
    ogSiteName: siteConfig.title,
    ogDescription: siteDescription,
    ogUrl: siteUrl,
    ogImage: siteImageLink,
    ogType: "website",
    ogLocale: "ko_KR",
    twitterCard: "summary_large_image",
    twitterTitle: meta.title,
    twitterDescription: siteDescription,
    twitterImage: siteImageLink,
    twitterSite: siteConfig.url,
    twitterCreator: siteConfig.author.name,
  });
  useHead({
    link: [{ rel: "canonical", href: siteUrl }],
  });
}
