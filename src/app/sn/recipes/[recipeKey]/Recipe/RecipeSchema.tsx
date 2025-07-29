import Script from 'next/script';

import { baseUrl } from '@/const/baseUrl';
import { RecipeDetail } from '@/services/requests/recipe/type';

export default function RecipeSchema({ recipe }: { recipe: RecipeDetail }) {
  const totalMinutes = recipe.hours * 60 + recipe.minutes;

  const recipeIngredients = recipe.ingredients.map(
    (ingredient) => `${ingredient.quantity} ${ingredient.name}`,
  );
  const recipeInstructions = recipe.steps.map((step, index) => ({
    '@type': 'HowToStep',
    name: `Step ${index + 1}`,
    text: step,
    position: index + 1,
  }));

  const schema = {
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
    prepTime: `PT${Math.ceil(totalMinutes * 0.3)}M`,
    cookTime: `PT${Math.ceil(totalMinutes * 0.7)}M`,
    totalTime: `PT${totalMinutes}M`,
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
