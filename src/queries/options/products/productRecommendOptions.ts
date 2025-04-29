import { queryKeys } from '@/queries/helpers';

import { getProductRecommendations } from '@/services/requests/product';

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
}: ProductRecommendOptions) => ({
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
