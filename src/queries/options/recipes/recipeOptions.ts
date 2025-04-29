import { getRecipePageTag } from '@/actions/helpers';

import { queryKeys } from '@/queries/helpers';

import { getRecipe } from '@/services/requests/recipe';
import { RecipeDetail } from '@/services/requests/recipe/type';

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
}: Props) => ({
  queryKey: queryKeys.recipes.recipe.detail(key),
  queryFn: async () => {
    const result = await getRecipe(key, {
      cache: 'force-cache',
      next: {
        revalidate: nextRevalidateTime,
        tags: [getRecipePageTag(key)],
      },
    });

    if (!result.ok) throw new Error('Failed to load recipe');

    return result.data;
  },
  initialData,
  staleTime,
});
