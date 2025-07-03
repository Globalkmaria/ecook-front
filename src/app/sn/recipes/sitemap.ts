// app/sitemap.ts
import { baseUrl } from '@/const/baseUrl';
import { getHomeRecipes } from '@/services/requests/home';

import type { MetadataRoute } from 'next';

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rows = await getHomeRecipes();
  if (!rows.ok) return [];

  return rows.data.map((r) => ({
    url: `${baseUrl}/sn/recipes/${r.key}`,
    lastModified: new Date().toISOString(),
  }));
}
