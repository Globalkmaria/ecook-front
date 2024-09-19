import { getRecipe } from '@/service/recipes';
import ModalRecipes from './ModalRecipes';

interface Props {
  params: { recipeId: string };
}

async function RecipePage({ params }: Props) {
  const result = await getRecipe(params.recipeId);
  if (!result.ok) return null;

  return <ModalRecipes recipe={result.data} />;
}

export default RecipePage;
