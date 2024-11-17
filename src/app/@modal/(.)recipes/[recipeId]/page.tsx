import { getRecipe } from '@/service/recipes';
import ModalRecipes from './ModalRecipes';

interface Props {
  params: Promise<{ recipeId: string }>;
}

async function RecipePage({ params }: Props) {
  const { recipeId } = await params;
  if (!recipeId) return null;

  const result = await getRecipe(recipeId);
  if (!result.ok) return null;

  return <ModalRecipes recipe={result.data} />;
}

export default RecipePage;
