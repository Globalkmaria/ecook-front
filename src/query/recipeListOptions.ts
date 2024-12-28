import { getRecipes } from '@/service/recipes';
import { queryOptions } from '@tanstack/react-query';

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
    queryKey: ['recipeList', query, type],
    queryFn: async () => {
      const result = await getRecipes(query, type);

      if (!result.ok) throw new Error(result.error);

      return result.data;
    },
    staleTime,
  });
