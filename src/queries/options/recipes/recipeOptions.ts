import { queryOptions } from '@tanstack/react-query';

import { getRecipePageTag } from '@/actions/helpers';

import { getRecipe } from '@/services/requests/recipe';
import { RecipeDetail } from '@/services/requests/recipe/type';

import { queryKeys } from '@/queries/helpers';

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
    queryKey: queryKeys.recipes.recipe.detail(key),
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
