import { getRecipes } from '@/service/recipes';
import { RecipeSimple } from '@/service/recipes/type';
import { queryOptions } from '@tanstack/react-query';

interface RecipeListOptions {
  query?: string;
  type?: string;
  enabled?: boolean;
  initialData: RecipeSimple[];
}

export const recipeListOptions = ({
  query = '',
  type = '',
  enabled,
  initialData,
}: RecipeListOptions) =>
  queryOptions({
    queryKey: ['recipeList', query, type],
    queryFn: async () => {
      const result = await getRecipes(query, type);

      if (!result.ok) throw new Error(result.error);

      return result.data;
    },
    enabled,
    initialData,
  });
