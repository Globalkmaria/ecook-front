import { queryOptions } from '@tanstack/react-query';

import { QUERY_KEY__PRODUCTS } from '@/queries';

import { getProducts, ProductQueryType } from '@/services/products';
import { Product } from '@/services/products/type';

interface Props {
  q: string;
  initialData?: Product[];
  staleTime?: number;
  type: ProductQueryType;
}

export const productsOptions = ({ initialData, staleTime, type, q }: Props) =>
  queryOptions({
    queryKey: [QUERY_KEY__PRODUCTS, type, q],
    queryFn: async () => {
      const result = await getProducts({
        type,
        q,
        options: {
          cache: 'force-cache',
          next: {
            revalidate: 86400,
          },
        },
      });

      if (!result.ok) throw new Error(result.error);

      return result.data;
    },
    initialData,
    staleTime,
  });
