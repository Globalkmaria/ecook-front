import { queryOptions } from '@tanstack/react-query';

import { getProductRecommendations } from '@/services/product';

import { QUERY_KEY__PRODUCTS, QUERY_KEY__RECOMMEND } from '@/queries';

interface RecipeListOptions {
  key: string;
  staleTime?: number;
  enabled?: boolean;
}

export const productRecommendOptions = ({
  key,
  staleTime = 864000000, // 24 hours , MS
  enabled = false,
}: RecipeListOptions) =>
  queryOptions({
    queryKey: [QUERY_KEY__PRODUCTS, key, QUERY_KEY__RECOMMEND],
    queryFn: async () => {
      const result = await getProductRecommendations(key, {
        cache: 'force-cache',
        next: {
          revalidate: staleTime / 1000,
        },
      });

      if (!result.ok) throw new Error(result.error);

      return result.data;
    },
    staleTime,
    enabled,
  });
