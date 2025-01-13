import { getRecipe } from '@/services/recipe';
import { queryOptions } from '@tanstack/react-query';

import { QUERY_KEY__RECIPE } from '@/queries';
import { RecipeDetail } from '@/services/recipe/type';

export const recipeOptions = (
  key: string,
  initialData?: RecipeDetail,
  staleTime = 86400,
) =>
  queryOptions({
    queryKey: [QUERY_KEY__RECIPE, key],
    queryFn: async () => {
      const result = await getRecipe(key, {
        cache: 'force-cache',
        next: {
          revalidate: 86400,
        },
      });

      if (!result.ok) throw new Error(result.error);

      return result.data;
    },
    initialData,
    staleTime,
  });
