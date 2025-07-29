import { Metadata } from 'next';

import { baseUrl } from '@/const/baseUrl';
import { RecipeDetail } from '@/services/requests/recipe/type';

/**
 * Generate SEO-optimized metadata for recipe pages
 */
export function generateRecipeMetadata(recipe: RecipeDetail): Metadata {
  const title = `${recipe.name} Recipe - E-COOK`;
  const description = `Learn how to make ${recipe.name}. ${recipe.description} Cooking time: ${recipe.hours}h ${recipe.minutes}m. Created by ${recipe.user.username}.`;
  const url = `${baseUrl}/sn/recipes/${recipe.key}`;

  // Generate keywords from recipe data
  const keywords = [
    recipe.name.toLowerCase(),
    ...recipe.tags.map((tag) => tag.name.toLowerCase()),
    ...recipe.ingredients.slice(0, 5).map((ing) => ing.name.toLowerCase()),
    'recipe',
    'cooking',
    'food',
    recipe.user.username.toLowerCase(),
  ].join(', ');

  return {
    title,
    description,
    keywords,
    authors: [{ name: recipe.user.username }],
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: [
        {
          url: recipe.img,
          width: 1200,
          height: 630,
          alt: `${recipe.name} recipe image`,
        },
      ],
      siteName: 'E-COOK',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [recipe.img],
      creator: `@${recipe.user.username}`,
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Generate breadcrumb items for recipe pages
 */
export function generateRecipeBreadcrumbs(recipe: RecipeDetail) {
  return [
    {
      name: 'Home',
      url: baseUrl,
    },
    {
      name: 'Recipes',
      url: `${baseUrl}/sn/recipes`,
    },
    {
      name: recipe.name,
      url: `${baseUrl}/sn/recipes/${recipe.key}`,
    },
  ];
}

/**
 * Generate category-based breadcrumbs
 */
export function generateCategoryBreadcrumbs(category: string) {
  return [
    {
      name: 'Home',
      url: baseUrl,
    },
    {
      name: 'Recipes',
      url: `${baseUrl}/sn/recipes`,
    },
    {
      name: category,
      url: `${baseUrl}/sn/recipes?category=${encodeURIComponent(category)}`,
    },
  ];
}

/**
 * Generate search results breadcrumbs
 */
export function generateSearchBreadcrumbs(query: string) {
  return [
    {
      name: 'Home',
      url: baseUrl,
    },
    {
      name: 'Search',
      url: `${baseUrl}/sn/search`,
    },
    {
      name: `Results for "${query}"`,
      url: `${baseUrl}/sn/search?q=${encodeURIComponent(query)}`,
    },
  ];
}

/**
 * Clean and optimize text for SEO
 */
export function optimizeTextForSEO(
  text: string,
  maxLength: number = 160,
): string {
  // Remove extra whitespace and clean up text
  const cleaned = text.replace(/\s+/g, ' ').trim();

  // Truncate if too long, ensuring we don't cut off mid-word
  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  const truncated = cleaned.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  return lastSpace > 0
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
}

/**
 * Generate recipe-specific keywords
 */
export function generateRecipeKeywords(recipe: RecipeDetail): string[] {
  const keywords = new Set<string>();

  // Add recipe name variations
  keywords.add(recipe.name.toLowerCase());
  keywords.add(`${recipe.name.toLowerCase()} recipe`);
  keywords.add(`how to make ${recipe.name.toLowerCase()}`);

  // Add tags
  recipe.tags.forEach((tag) => {
    keywords.add(tag.name.toLowerCase());
    keywords.add(`${tag.name.toLowerCase()} recipe`);
  });

  // Add main ingredients
  recipe.ingredients.slice(0, 5).forEach((ingredient) => {
    keywords.add(ingredient.name.toLowerCase());
  });

  // Add cooking time related keywords
  const totalMinutes = recipe.hours * 60 + recipe.minutes;
  if (totalMinutes <= 30) {
    keywords.add('quick recipe');
    keywords.add('easy recipe');
  }
  if (totalMinutes <= 15) {
    keywords.add('15 minute recipe');
  }

  // Add general cooking keywords
  keywords.add('recipe');
  keywords.add('cooking');
  keywords.add('food');
  keywords.add('homemade');

  return Array.from(keywords);
}
