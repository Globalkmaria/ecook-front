import { getRecipes } from '@/service/recipes';
import RecipeList from './RecipeList';
import { SearchParams } from './page';

interface Props {
  searchParamsData: SearchParams;
}

async function RecipeListWrapper({ searchParamsData }: Props) {
  const { q, type } = searchParamsData;

  const recipes = await getRecipes(q, type);

  if (!recipes.ok) {
    console.error('Failed to fetch recipes', recipes.error);
    return null;
  }

  return <RecipeList recipes={recipes.data} />;
}

export default RecipeListWrapper;
