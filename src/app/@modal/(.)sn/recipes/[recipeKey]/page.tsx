import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { recipeOptions } from '@/queries/recipeOptions';
import { recipeRecommendOptions } from '@/queries/recipeRecommendOptions';

import ModalRecipe from './ModalRecipe';

interface Props {
  params: Promise<{ recipeKey: string }>;
}

async function RecipePage({ params }: Props) {
  const { recipeKey } = await params;
  if (!recipeKey) return null;

  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(recipeOptions({ key: recipeKey })),
    queryClient.prefetchQuery(recipeRecommendOptions({ key: recipeKey })),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ModalRecipe />
    </HydrationBoundary>
  );
}

export default RecipePage;
