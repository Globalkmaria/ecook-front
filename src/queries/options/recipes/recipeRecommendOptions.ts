import { queryOptions } from '@tanstack/react-query';

import { queryKeys } from '@/queries/helpers';

import { getRecipeRecommendations } from '@/services/requests/recipe';

interface RecipeRecommendOptions {
  key: string;
  enabled?: boolean;
  staleTime?: number;
  nextRevalidateTime?: number;
}

export const recipeRecommendOptions = ({
  key,
  staleTime = 86400000, // 24 hours , MS
  nextRevalidateTime = 86400, // 24 hours , S
  enabled = false,
}: RecipeRecommendOptions) =>
  queryOptions({
    queryKey: queryKeys.recipes.recipe.recommend(key),
    queryFn: async () => {
      const result = await getRecipeRecommendations(key, {
        cache: 'force-cache',
        next: {
          revalidate: nextRevalidateTime,
        },
      });

      if (!result.ok) throw new Error(result.error);

      return result.data;
    },
    staleTime,
    enabled,
  });
