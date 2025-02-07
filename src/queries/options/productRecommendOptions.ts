import { queryOptions } from '@tanstack/react-query';

import { getProductRecommendations } from '@/services/product';

import { generateProductRecommendQueryKey } from '@/queries/helpers';

interface RecipeListOptions {
  key: string;
  staleTime?: number;
  enabled?: boolean;
  nextRevalidateTime?: number;
}

export const productRecommendOptions = ({
  key,
  staleTime = 86400000, // 24 hours , MS
  nextRevalidateTime = 86400, // 24 hours , S
  enabled = false,
}: RecipeListOptions) =>
  queryOptions({
    queryKey: generateProductRecommendQueryKey(key),
    queryFn: async () => {
      const result = await getProductRecommendations(key, {
        cache: 'force-cache',
        next: {
          revalidate: nextRevalidateTime,
        },
      });

      if (!result.ok) throw new Error(result.error);

      return result.data;
    },
    staleTime,
    enabled,
  });
