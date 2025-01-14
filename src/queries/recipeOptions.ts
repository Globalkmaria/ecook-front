import { getRecipe } from '@/services/recipe';
import { queryOptions } from '@tanstack/react-query';

import { QUERY_KEY__RECIPE } from '@/queries';
import { RecipeDetail } from '@/services/recipe/type';

interface Props {
  key: string;
  initialData?: RecipeDetail;
  staleTime?: number;
}

export const recipeOptions = ({ key, initialData, staleTime }: Props) =>
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
