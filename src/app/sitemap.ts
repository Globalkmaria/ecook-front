import { getHomeRecipes } from '@/services/requests/home';

import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.ecook.online';

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  let recipePages: MetadataRoute.Sitemap = [];

  try {
    const recipesResult = await getHomeRecipes();

    if (recipesResult.ok && recipesResult.data) {
      recipePages = recipesResult.data.map((recipe) => ({
        url: `${baseUrl}/sn/recipes/${recipe.key}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error('Error generating recipe sitemap entries:', error);
  }

  return [...staticPages, ...recipePages];
}
