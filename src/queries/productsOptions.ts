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
}

export const productsOptions = ({
  initialData,
  staleTime,
  type,
  q,
  enabled,
}: Props) =>
  queryOptions({
    queryKey: [QUERY_KEY__PRODUCTS, type, q],
    queryFn: async () => {
      const result = await getProducts({
        type,
        q,
      });

      if (!result.ok) throw new Error(result.error);

      return result.data;
    },
    initialData,
    staleTime,
    enabled: !!enabled,
  });
