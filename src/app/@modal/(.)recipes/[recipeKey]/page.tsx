import { getHomeRecipes, getRecipe } from '@/service/recipes';
import ModalRecipes from './ModalRecipes';

interface Props {
  params: Promise<{ recipeKey: string }>;
}

export const revalidate = 86400; // 1 day

export async function generateStaticParams() {
  const result = await getHomeRecipes();
  if (!result.ok) return [];
  return (
    result.data.map((recipe) => ({
      recipeKey: recipe.key,
    })) ?? []
  );
}

async function RecipePage({ params }: Props) {
  const { recipeKey } = await params;
  if (!recipeKey) return null;

  const result = await getRecipe(recipeKey, {
    cache: 'force-cache',
  });

  if (!result.ok) return null;

  return <ModalRecipes recipe={result.data} />;
}

export default RecipePage;
