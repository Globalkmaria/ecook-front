import {
  GetIngredientsWithProductsReq,
  GetIngredientsWithProductsRes,
} from '@/services/requests/ingredients/type';

import { PantryState } from '@/stores/slices/pantry/pantrySlice';
import { PantryBoxesProps } from '../PantryBox';

export const mapPantryBoxesToReqData = (
  pantry: PantryState['pantry']['pantryBoxes'],
): GetIngredientsWithProductsReq['items'] => {
  return Object.entries(pantry).reduce(
    (acc, [_, pantryBox]) => {
      const ingredient = acc[pantryBox.ingredientKey] ?? {};

      if (pantryBox.productKey) {
        const products = ingredient.productKeys ?? [];
        products.push(pantryBox.productKey);
        ingredient.productKeys = products;
      }

      acc[pantryBox.ingredientKey] = ingredient;

      return acc;
    },
    {} as GetIngredientsWithProductsReq['items'],
  );
};

export const getPantryBoxesViewData = (
  ingredientInfo: GetIngredientsWithProductsRes,
  pantry: PantryState['pantry']['pantryBoxes'],
): PantryBoxesProps['items'] => {
  const pantryBoxes = Object.entries(pantry).map(([_, pantryBox]) => {
    const ingredient = ingredientInfo[pantryBox.ingredientKey];
    const product = pantryBox.productKey
      ? ingredient.products[pantryBox.productKey]
      : null;

    return {
      key: pantryBox.key,
      img: product?.img || '',
      buyDate: pantryBox.items[0].buyDate,
      expireDate: pantryBox.items[0].expireDate,
      ingredientName: ingredient.ingredient.name,
      productName: product?.name || '',
      quantity: getTotalQuantity(pantryBox),
    };
  });

  return pantryBoxes;
};

const getTotalQuantity = (
  pantryBox: PantryState['pantry']['pantryBoxes'][string],
) => pantryBox.items.reduce((acc, item) => acc + item.quantity, 0);
