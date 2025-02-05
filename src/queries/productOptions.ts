import { queryOptions } from '@tanstack/react-query';

import { QUERY_KEY__PRODUCT } from '@/queries';

import { Product } from '@/services/products/type';
import { getProduct } from '@/services/product';

interface Props {
  key: string;
  staleTime?: number;
  nextRevalidateTime?: number;
  enabled?: boolean;
}

export const productOptions = ({
  key,
  staleTime = 86400000, // 24 hours , MS
  nextRevalidateTime = 86400, // 24 hours , S
  enabled = false,
}: Props) =>
  queryOptions({
    queryKey: [QUERY_KEY__PRODUCT, key],
    queryFn: async () => {
      const result = await getProduct(key, {
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
