import { queryOptions } from '@tanstack/react-query';

import { queryKeys } from '@/queries/helpers';

import { getProducts } from '@/services/requests/products';
import { Product, ProductQueryTypes } from '@/services/requests/products/type';

interface Props {
  q: string;
  initialData?: Product[];
  staleTime?: number;
  type: ProductQueryTypes;
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
    queryKey: queryKeys.products.list({ type, query: q }),
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
