import { AddPantryBoxReq } from '@/services/requests/pantry/pantryBoxes/type';
import { CartProductProps } from '../CartProduct';
import { getDateAfterToday, getToday } from '@/utils/time';

export const getNewPantryBox = (
  ...args: Parameters<CartProductProps['onAddPantryBox']>
): AddPantryBoxReq => {
  const { ingredientKey, productKey, quantity } = args[0];
  return {
    pantryBox: { ingredientKey, productKey },
    pantryItem: {
      quantity,
      buyDate: getToday(),
      expireDate: getDateAfterToday(7),
    },
  };
};
