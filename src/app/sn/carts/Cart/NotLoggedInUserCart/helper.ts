import { GetIngredientsWithProductsRes } from '@/services/requests/ingredients/type';
import { CartState } from '@/stores/slices/cartSlice';
import { CartItemInfo } from '../CartItem';

export const combineCartItemWithInfo = (
  items: CartState['carts']['ingredients'],
  info: GetIngredientsWithProductsRes,
): CartItemInfo[] => {
  const result: { [ingredientKey: string]: CartItemInfo } = {};

  for (const [ingredientKey, item] of Object.entries(items)) {
    const ingredientInfo = info[ingredientKey];
    if (!ingredientInfo) continue;

    result[ingredientKey] = {
      ingredient: { ...ingredientInfo.ingredient, quantity: item.quantity },
      products: [],
    };

    if (ingredientInfo.products) {
      const products: CartItemInfo['products'] = [];

      for (const productKey of Object.keys(ingredientInfo.products)) {
        const productInfo = ingredientInfo.products[productKey];
        const quantity = item.products[productKey];
        if (!productInfo || !quantity) continue;

        products.push({
          ...productInfo,
          quantity,
        });
      }

      result[ingredientKey].products = products;
    }
  }

  return Object.values(result);
};
