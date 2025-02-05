import { getRecipes } from '@/services/recipes';
import { queryOptions } from '@tanstack/react-query';

import { generateRecipeListQueryKey } from '@/queries';
import { RecipeListSearchType } from '@/services/recipes/helper';

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
    queryKey: generateRecipeListQueryKey({ query, type }),
    queryFn: async () => {
      const result = await getRecipes(query, type);

      if (!result.ok) throw new Error(result.error);

      return result.data;
    },
    staleTime,
    enabled: !!enabled,
  });
