import { getRecipe } from '@/services/recipe';
import { queryOptions } from '@tanstack/react-query';

import { QUERY_KEY__RECIPE } from '@/queries';
import { RecipeDetail } from '@/services/recipe/type';

interface Props {
  key: string;
  initialData?: RecipeDetail;
  staleTime?: number;
  nextRevalidateTime?: number;
}

export const recipeOptions = ({
  key,
  initialData,
  staleTime = 86400000, // 24 hours , MS
  nextRevalidateTime = 86400, // 24 hours , S
}: Props) =>
  queryOptions({
    queryKey: [QUERY_KEY__RECIPE, key],
    queryFn: async () => {
      const result = await getRecipe(key, {
        cache: 'force-cache',
        next: {
          revalidate: nextRevalidateTime,
        },
      });

      if (!result.ok) throw new Error(result.error);

      return result.data;
    },
    initialData,
    staleTime,
  });
