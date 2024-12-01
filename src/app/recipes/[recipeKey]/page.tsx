import { getRecipe } from '@/service/recipes';
import Recipe from './Recipe';

interface Props {
  params: Promise<{ recipeKey: string }>;
}

async function Page({ params }: Props) {
  const { recipeKey } = await params;
  if (!recipeKey) return null;

  const result = await getRecipe(recipeKey);
  if (!result.ok) return null;

  return <Recipe recipe={result.data} />;
}

export default Page;
