import { getRecipes } from '@/services/requests/recipes';
import { queryOptions } from '@tanstack/react-query';

import { queryKeys } from '@/queries/helpers';
import { RecipeListSearchType } from '@/services/requests/recipes/helper';

interface RecipeListOptions {
  query: string;
  type: RecipeListSearchType;
  staleTime?: number;
  enabled?: boolean;
}

export const recipeListOptions = ({
  query,
  type,
  staleTime,
  enabled,
}: RecipeListOptions) =>
  queryOptions({
    queryKey: queryKeys.recipes.list({ query, type }),
    queryFn: async () => {
      const result = await getRecipes(query, type);

      if (!result.ok) throw new Error(result.error);

      return result.data;
    },
    staleTime,
    enabled: !!enabled,
  });
