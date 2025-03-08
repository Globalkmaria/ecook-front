import { PantryState } from '@/stores/slices/pantry/pantrySlice';

import { GetIngredientsWithProductsRes } from '@/services/requests/ingredients/type';

import { PantryBoxContentProps } from '../PantryBoxContent';

export const mapPantryBoxToViewData = (
  pantryBox: PantryState['pantry']['pantryBoxes']['string'],
  ingredientInfo: GetIngredientsWithProductsRes,
): PantryBoxContentProps['pantryBox'] => {
  const ingredient = ingredientInfo[pantryBox.ingredientKey];
  const product = pantryBox.productKey
    ? ingredient.products[pantryBox.productKey]
    : null;

  return {
    key: pantryBox.key,
    img: product?.img || '',
    ingredientName: ingredient.ingredient.name,
    productName: pantryBox.productKey ? product?.name : null,
    brand: product?.brand,
    purchasedFrom: product?.purchasedFrom,
    items: pantryBox.items,
  };
};
