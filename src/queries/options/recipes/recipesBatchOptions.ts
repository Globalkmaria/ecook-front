import { queryOptions } from '@tanstack/react-query';

import { getRecipesBatch } from '@/services/requests/recipes';
import { RecipesBatchType } from '@/services/requests/recipes/helper';

import { queryKeys } from '@/queries/helpers';

interface RecipesBatchOptions {
  query: string[];
  type: RecipesBatchType;
  staleTime?: number;
  enabled?: boolean;
}

export const recipesBatchOptions = ({
  query,
  type,
  staleTime = 60 * 60 * 1000, // 1 hour / MS
  enabled,
}: RecipesBatchOptions) => {
  const id = query.sort().join(',');
  return queryOptions({
    queryKey: queryKeys.recipes.list({ query: id, type }),
    queryFn: async () => {
      const result = await getRecipesBatch({ query, type });

      if (!result.ok) throw new Error(result.error);

      return result.data;
    },
    staleTime,
    enabled: !!enabled,
  });
};
