import { getRecipes } from '@/service/recipes';
import RecipeList from './RecipeList';
import { SearchParams } from './page';

interface Props {
  searchParamsData: SearchParams;
}

async function RecipeListWrapper({ searchParamsData }: Props) {
  const { q, type } = searchParamsData;

  const recipes = await getRecipes(q, type);

  return <RecipeList recipes={recipes?.data ?? []} isSuccess={recipes.ok} />;
}

export default RecipeListWrapper;
