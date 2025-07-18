import { queryKeys } from '@/queries/helpers';

import { getRecipes } from '@/services/requests/recipes';
import { RecipesSearchType } from '@/services/requests/recipes/helper';

interface RecipeListOptions {
  query: string;
  type: RecipesSearchType;
  staleTime?: number;
  enabled?: boolean;
  gcTime?: number;
}

export const recipesOptions = ({
  query,
  type,
  staleTime,
  gcTime,
  enabled,
}: RecipeListOptions) => ({
  queryKey: queryKeys.recipes.list({ query, type }),
  queryFn: async () => {
    const result = await getRecipes(query, type);

    if (!result.ok) throw new Error(result.error);

    return result.data;
  },
  staleTime,
  gcTime,
  enabled: !!enabled,
});
