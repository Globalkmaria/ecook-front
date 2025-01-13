import { queryOptions } from '@tanstack/react-query';

import { getRecipeRecommendations } from '@/services/recipe';
import { RecommendRecipe } from '@/services/recommend/type';

import { QUERY_KEY__RECIPE, QUERY_KEY__RECOMMEND } from '@/queries';

interface RecipeListOptions {
  key: string;
  staleTime?: number;
  initialData?: RecommendRecipe[];
}

export const recipeRecommendOptions = ({
  key,
  staleTime = 86400, // 24 hour
  initialData,
}: RecipeListOptions) =>
  queryOptions({
    queryKey: [QUERY_KEY__RECIPE, key, QUERY_KEY__RECOMMEND],
    queryFn: async () => {
      const result = await getRecipeRecommendations(key, {
        cache: 'force-cache',
        next: {
          revalidate: staleTime,
        },
      });

      if (!result.ok) throw new Error(result.error);

      return result.data;
    },
    staleTime,
    initialData,
  });
