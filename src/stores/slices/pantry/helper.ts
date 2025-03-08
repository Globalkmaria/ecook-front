import { getDateAfterToday, getToday } from '@/utils/time';
import { PantryState } from './pantrySlice';
import { getRandomId } from '@/utils/generateId';

export const getPantryBoxKey = (ingredientKey: string, productKey?: string) =>
  `${ingredientKey}${productKey ? `-${productKey}` : ''}`;

export const getNewPantryBoxItemBaseProps = (quantity = 1) => ({
  quantity: quantity,
  expireDate: getDateAfterToday(7),
  buyDate: getToday(),
});

export const getNewPantryBoxItem = ({
  quantity = 1,
  key,
}: {
  quantity?: number;
  key?: string;
}): PantryState['pantry']['pantryBoxes'][string]['items'][number] => {
  return {
    key: key || getRandomId(),
    ...getNewPantryBoxItemBaseProps(quantity),
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
    items: [getNewPantryBoxItem({ quantity })],
  };
};
