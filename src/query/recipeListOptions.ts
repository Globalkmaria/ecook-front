import { getRecipes } from '@/services/recipes';
import { queryOptions } from '@tanstack/react-query';

import { QUERY_KEY__RECIPE_LIST } from '@/query';

interface RecipeListOptions {
  query?: string;
  type?: string;
  staleTime?: number;
}

export const recipeListOptions = ({
  query = '',
  type = '',
  staleTime,
}: RecipeListOptions) =>
  queryOptions({
    queryKey: [QUERY_KEY__RECIPE_LIST, query, type],
    queryFn: async () => {
      const result = await getRecipes(query, type);

      if (!result.ok) throw new Error(result.error);

      return result.data;
    },
    staleTime,
  });
