import Script from 'next/script';

import { RecipeDetail } from '@/services/requests/recipe/type';

export default function RecipeSchema({ recipe }: { recipe: RecipeDetail }) {
  const totalMinutes = recipe.hours * 60 + recipe.minutes;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.name,
    description: recipe.description,
    image: recipe.img,
    author: { '@type': 'Person', name: recipe.user.username },
    cookTime: `PT${totalMinutes}M`,
    totalTime: `PT${totalMinutes}M`,
    recipeIngredient: recipe.ingredients.map((ingredient) => ingredient.name),
    recipeInstructions: recipe.steps.map((s) => ({
      '@type': 'HowToStep',
      text: s,
    })),
    keywords: recipe.tags.map((tag) => tag.name).join(', '),
  };

  return (
    <Script
      id={`recipe-jsonld-${recipe.key}`}
      type='application/ld+json'
      strategy='afterInteractive'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
