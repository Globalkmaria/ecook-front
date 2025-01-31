import { queryOptions } from '@tanstack/react-query';

import { QUERY_KEY__PRODUCTS } from '@/queries';

import { Product } from '@/services/products/type';
import { getProduct } from '@/services/product';

interface Props {
  key: string;
  initialData?: Product;
  staleTime?: number;
}

export const productOptions = ({ key, initialData, staleTime }: Props) =>
  queryOptions({
    queryKey: [QUERY_KEY__PRODUCTS, key],
    queryFn: async () => {
      const result = await getProduct(key, {
        cache: 'force-cache',
        next: {
          revalidate: 86400, // 1 day
        },
      });

      if (!result.ok) throw new Error(result.error);

      return result.data;
    },
    initialData,
    staleTime,
  });
