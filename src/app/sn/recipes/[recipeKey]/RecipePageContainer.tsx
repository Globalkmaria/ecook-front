import {
  dehydrate,
  HydrationBoundary,
  queryOptions,
} from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { getQueryClient } from '@/queries/get-query-client';
import { recipeOptions, recipeRecommendOptions } from '@/queries/options';

import { getRecipe } from '@/services/requests/recipe';

import Recipe from './Recipe';
import Recommend from './Recommend';

async function RecipePageContainer({ recipeKey }: { recipeKey: string }) {
  if (!recipeKey) notFound();

  const queryClient = getQueryClient();

  const result = await getRecipe(recipeKey);

  if (!result.ok) notFound();

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
