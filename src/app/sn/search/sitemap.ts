import { baseUrl } from '@/const/baseUrl';
import { getHomeRecommendations } from '@/services/requests/recommend';

import type { MetadataRoute } from 'next';

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const result = await getHomeRecommendations();
  if (!result.ok) return [];

  const types = [
    ...result.data['tag'].order,
    ...result.data['ingredient'].order,
  ];

  return types.map((i) => ({
    url: `${baseUrl}/sn/search?type=tag&q=${i}`.replace(/&/g, '&amp;'),
    lastModified: new Date().toISOString(),
  }));
}
