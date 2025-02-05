import { queryOptions } from '@tanstack/react-query';

import { QUERY_KEY__PRODUCTS } from '@/queries';
import { getProducts, ProductQueryType } from '@/services/products';
import { Product } from '@/services/products/type';

interface Props {
  q: string;
  initialData?: Product[];
  staleTime?: number;
  type: ProductQueryType;
  enabled?: boolean;
  nextRevalidateTime?: number;
}

export const productsOptions = ({
  initialData,
  staleTime,
  type,
  nextRevalidateTime,
  q,
  enabled,
}: Props) =>
  queryOptions({
    queryKey: [QUERY_KEY__PRODUCTS, { type, q }],
    queryFn: async () => {
      const result = await getProducts({
        type,
        q,
        options: {
          next: {
            revalidate: nextRevalidateTime,
          },
        },
      });

      if (!result.ok) throw new Error(result.error);

      return result.data.products;
    },
    initialData,
    staleTime,
    enabled: !!enabled,
  });
