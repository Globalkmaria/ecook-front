import Script from 'next/script';

import { baseUrl } from '@/const/baseUrl';
import { RecipeDetail } from '@/services/requests/recipe/type';

interface RecipeSchemaProps {
  recipe: RecipeDetail;
}

export default function RecipeSchema({ recipe }: RecipeSchemaProps) {
  const totalMinutes = recipe.hours * 60 + recipe.minutes;
  const totalTimeISO = `PT${totalMinutes}M`;

  const recipeIngredients = recipe.ingredients.map(
    (ingredient) => `${ingredient.quantity} ${ingredient.name}`,
  );

  const recipeInstructions = recipe.steps.map((step, index) => ({
    '@type': 'HowToStep',
    name: `Step ${index + 1}`,
    text: step,
    position: index + 1,
  }));

  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.name,
    description: recipe.description,
    image: [recipe.img],
    author: {
      '@type': 'Person',
      name: recipe.user.username,
      ...(recipe.user.img && { image: recipe.user.img }),
    },
    datePublished: new Date(recipe.createdAt).toISOString(),
    prepTime: totalTimeISO,
    cookTime: totalTimeISO,
    totalTime: totalTimeISO,
    recipeCategory:
      recipe.tags.length > 0 ? recipe.tags[0].name : 'Main Course',
    recipeCuisine: 'International',
    recipeYield: '2 servings',
    recipeIngredient: recipeIngredients,
    recipeInstructions: recipeInstructions,
    keywords: recipe.tags.map((tag) => tag.name).join(', '),
    url: `${baseUrl}/sn/recipes/${recipe.key}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/sn/recipes/${recipe.key}`,
    },
  };

  return (
    <Script
      id={`recipe-schema-${recipe.key}`}
      type='application/ld+json'
      strategy='afterInteractive'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }}
    />
  );
}
