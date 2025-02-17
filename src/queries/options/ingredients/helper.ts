import { GetIngredientsWithProductsReq } from '@/services/requests/ingredients/type';
import { CartState } from '@/stores/slices/cartSlice';

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
