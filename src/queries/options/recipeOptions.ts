import { queryOptions } from '@tanstack/react-query';

import { getRecipePageTag } from '@/actions/helpers';

import { getRecipe } from '@/services/recipe';
import { RecipeDetail } from '@/services/recipe/type';

import { generateRecipeQueryKey } from '@/queries/helpers';

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
    queryKey: generateRecipeQueryKey(key),
    queryFn: async () => {
      const result = await getRecipe(key, {
        cache: 'force-cache',
        next: {
          revalidate: nextRevalidateTime,
          tags: [getRecipePageTag(key)],
        },
      });

      if (!result.ok) throw new Error(result.error);

      return result.data;
    },
    initialData,
    staleTime,
  });
