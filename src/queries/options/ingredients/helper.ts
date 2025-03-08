import { CartState } from '@/stores/slices/cartSlice';

import { GetIngredientsWithProductsReq } from '@/services/requests/ingredients/type';

export const transformIngredientsForServer = (
  items: CartState['carts']['ingredients'],
) => {
  return Object.entries(items).reduce(
    (acc, [ingredientKey, item]) => {
      acc[ingredientKey] = {};

      if (item.products) {
        acc[ingredientKey].productKeys = Object.keys(item.products);
      }

      return acc;
    },
    {} as GetIngredientsWithProductsReq['items'],
  );
};
