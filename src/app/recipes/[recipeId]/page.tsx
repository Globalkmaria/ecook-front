import { getRecipe } from '@/service/recipes';
import Recipe from './Recipe';

interface Props {
  params: { recipeId: string };
}

export default async function Page({ params }: Props) {
  const result = await getRecipe(params.recipeId);
  if (!result.ok) return null;

  return <Recipe recipe={result.data} />;
}
