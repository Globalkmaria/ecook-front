import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { recipeOptions, recipeRecommendOptions } from '@/queries/options';

import Recipe from './Recipe';
import Recommend from './Recommend';

async function RecipePageContainer({ recipeKey }: { recipeKey: string }) {
  if (!recipeKey) notFound();

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(recipeOptions({ key: recipeKey })),
    queryClient.prefetchQuery(recipeRecommendOptions({ key: recipeKey })),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <Recipe />
        <Recommend />
      </div>
    </HydrationBoundary>
  );
}

export default RecipePageContainer;
