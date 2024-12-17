import { getRecipe } from '@/service/recipes';
import { queryOptions } from '@tanstack/react-query';

export const recipeOptions = (key: string, enabled: boolean) =>
  queryOptions({
    queryKey: ['recipe', key],
    queryFn: async () => {
      const result = await getRecipe(key);

      if (!result.ok) throw new Error(result.error);

      return result.data;
    },
    enabled,
  });
