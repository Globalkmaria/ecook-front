import { getDateAfterToday, getToday } from '@/utils/time';
import { PantryState } from './pantrySlice';
import { getRandomId } from '@/utils/generateId';

export const getPantryBoxKey = (ingredientKey: string, productKey?: string) =>
  `${ingredientKey}${productKey ? `-${productKey}` : ''}`;

export const getNewPantryBoxItem = (
  quantity: number,
): PantryState['pantry']['pantryBoxes'][string]['items'][number] => {
  return {
    key: getRandomId(),
    expireDate: getDateAfterToday(7),
    buyDate: getToday(),
    quantity,
  };
};

export const getNewPantryBox = ({
  ingredientKey,
  productKey,
  quantity,
}: {
  ingredientKey: string;
  productKey?: string;
  quantity: number;
}): PantryState['pantry']['pantryBoxes'][string] => {
  return {
    key: getPantryBoxKey(ingredientKey, productKey),
    ingredientKey,
    productKey,
    items: [getNewPantryBoxItem(quantity)],
  };
};
