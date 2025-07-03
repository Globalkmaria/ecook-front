import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/search',
    },
    sitemap: [
      'https://www.ecook.online/sitemap.xml',
      'https://www.ecook.online/sn/recipes/sitemap.xml',
      'https://www.ecook.online/sn/search/sitemap.xml',
    ],
  };
}
