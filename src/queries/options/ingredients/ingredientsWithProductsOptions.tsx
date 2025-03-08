import { queryOptions } from '@tanstack/react-query';

import { queryKeys } from '@/queries/helpers';

import { getIngredientsWithProducts } from '@/services/requests/ingredients';
import { GetIngredientsWithProductsReq } from '@/services/requests/ingredients/type';

interface Props {
  staleTime?: number;
  enabled?: boolean;
  items: GetIngredientsWithProductsReq['items'];
}

export const ingredientsWithProductsOptions = ({
  items,
  staleTime = 60 * 60 * 1000, // 1 hour , MS
  enabled,
}: Props) =>
  queryOptions({
    queryKey: queryKeys.ingredients.products(items),
    queryFn: async () => {
      const result = await getIngredientsWithProducts({ items });

      if (result.ok) {
        return result.data;
      }

      throw new Error('Failed to fetch ingredients with products');
    },
    staleTime,
    enabled,
  });
