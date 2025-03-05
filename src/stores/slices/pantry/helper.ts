import { getDateAfterToday, getToday } from '@/utils/time';
import { PantryState } from './pantrySlice';

const getPantryBoxKey = (ingredientKey: string, productKey?: string) =>
  `${ingredientKey}${productKey ? `-${productKey}` : ''}`;

export const getNewPantryBoxItem = ({
  ingredientKey,
  productKey,
  quantity,
}: {
  ingredientKey: string;
  productKey?: string;
  quantity: number;
}) => {
  return {
    key: getPantryBoxKey(ingredientKey, productKey),
    expiryDate: getDateAfterToday(7),
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
    items: [getNewPantryBoxItem({ ingredientKey, productKey, quantity })],
  };
};
