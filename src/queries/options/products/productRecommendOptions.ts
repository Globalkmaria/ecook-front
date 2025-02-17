import { queryOptions } from '@tanstack/react-query';

import { getProductRecommendations } from '@/services/requests/product';

import { queryKeys } from '@/queries/helpers';

interface ProductRecommendOptions {
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
}: ProductRecommendOptions) =>
  queryOptions({
    queryKey: queryKeys.products.product.recommend(key),
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
