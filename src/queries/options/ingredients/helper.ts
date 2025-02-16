import { GetIngredientsWithProductsReq } from '@/services/requests/ingredients/type';
import { CartState } from '@/stores/slices/cartSlice';

export const transformIngredientsForServer = (
  items: CartState['carts']['ingredients'],
) => {
  return Object.entries(items).reduce(
    (acc, [ingredientKey, item]) => {
      acc[ingredientKey] = {};

      if (item.products) {
        acc[ingredientKey].productKey = Object.keys(item.products);
      }

      return acc;
    },
    {} as GetIngredientsWithProductsReq['items'],
  );
};
