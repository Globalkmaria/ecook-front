import { getRecipe } from '@/services/recipes';
import ModalRecipes from './ModalRecipes';

interface Props {
  params: Promise<{ recipeKey: string }>;
}

async function RecipePage({ params }: Props) {
  const { recipeKey } = await params;
  if (!recipeKey) return null;

  const result = await getRecipe(recipeKey, {
    cache: 'force-cache',
    next: {
      revalidate: 86400, // 1 day
    },
  });

  if (!result.ok) return null;

  return <ModalRecipes recipe={result.data} />;
}

export default RecipePage;
