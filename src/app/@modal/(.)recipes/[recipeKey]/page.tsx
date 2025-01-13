import ModalRecipes from './ModalRecipes';
import { QueryClient } from '@tanstack/react-query';
import { recipeOptions } from '@/queries/recipeOptions';
import { recipeRecommendOptions } from '@/queries/recipeRecommendOptions';

interface Props {
  params: Promise<{ recipeKey: string }>;
}

async function RecipePage({ params }: Props) {
  const { recipeKey } = await params;
  if (!recipeKey) return null;

  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(recipeOptions(recipeKey)),
    queryClient.prefetchQuery(recipeRecommendOptions({ key: recipeKey })),
  ]);

  return <ModalRecipes />;
}

export default RecipePage;
