import { getRecipe } from '@/service/recipes';
import Recipe from './Recipe';

interface Props {
  params: Promise<{ recipeId: string }>;
}

async function Page({ params }: Props) {
  const { recipeId } = await params;
  if (!recipeId) return null;

  const result = await getRecipe(recipeId);
  if (!result.ok) return null;

  return <Recipe recipe={result.data} />;
}

export default Page;
