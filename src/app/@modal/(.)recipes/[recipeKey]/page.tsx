import { getRecipe, getRecipeRecommendations } from '@/services/recipe';
import ModalRecipes from './ModalRecipes';

interface Props {
  params: Promise<{ recipeKey: string }>;
}

async function RecipePage({ params }: Props) {
  const { recipeKey } = await params;
  if (!recipeKey) return null;

  const recipeResult = await getRecipe(recipeKey, {
    cache: 'force-cache',
    next: {
      revalidate: 86400, // 1 day
    },
  });

  const recommendResult = await getRecipeRecommendations(recipeKey, {
    cache: 'force-cache',
    next: {
      revalidate: 86400, // 1 day
    },
  });

  if (!recipeResult.ok) return null;

  return (
    <ModalRecipes
      recipe={recipeResult.data}
      recommendList={recommendResult.data}
    />
  );
}

export default RecipePage;
