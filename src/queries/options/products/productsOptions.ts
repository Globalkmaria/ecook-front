import { queryKeys } from '@/queries/helpers';

import { getProducts } from '@/services/requests/products';
import { Product, ProductQueryTypes } from '@/services/requests/products/type';

interface Props {
  q: string;
  initialData?: Product[];
  staleTime?: number;
  gcTime?: number;
  type: ProductQueryTypes;
  enabled?: boolean;
  nextRevalidateTime?: number;
}

export const productsOptions = ({
  initialData,
  staleTime = 86400000, // 24 hours , MS
  gcTime = 86400000, // 24 hours , MS
  type,
  nextRevalidateTime = 86400, // 24 hours , S
  q,
  enabled,
}: Props) => ({
  queryKey: queryKeys.products.list({ type, query: q }),
  queryFn: async () => {
    const result = await getProducts({
      type,
      q,
      options: {
        cache: 'force-cache',
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
  gcTime,
  enabled: !!enabled,
});
