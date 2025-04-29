import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  queryOptions,
} from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { recipeOptions, recipeRecommendOptions } from '@/queries/options';

import Recipe from './Recipe';
import Recommend from './Recommend';

function RecipePageContainer({ recipeKey }: { recipeKey: string }) {
  if (!recipeKey) notFound();

  const queryClient = new QueryClient();

  queryClient.prefetchQuery(queryOptions(recipeOptions({ key: recipeKey })));
  queryClient.prefetchQuery(
    queryOptions(recipeRecommendOptions({ key: recipeKey })),
  );

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
