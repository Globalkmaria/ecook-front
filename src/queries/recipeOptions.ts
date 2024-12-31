import { getRecipe } from '@/services/recipes';
import { queryOptions } from '@tanstack/react-query';

import { QUERY_KEY__RECIPE } from '@/queries';

export const recipeOptions = (key: string, enabled: boolean) =>
  queryOptions({
    queryKey: [QUERY_KEY__RECIPE, key],
    queryFn: async () => {
      const result = await getRecipe(key);

      if (!result.ok) throw new Error(result.error);

      return result.data;
    },
    enabled,
  });
