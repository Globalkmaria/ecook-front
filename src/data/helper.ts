import {
  ServerIngredient,
  INGREDIENTS_WITH_NAME_KEYS,
  INGREDIENTS_NAME_KEYS_ARRAY,
} from './ingredients';

export const getIngredientInfo = (
  ingredientName: string,
): ServerIngredient | null => {
  if (ingredientName === '') return null;

  const name = ingredientName.toLowerCase();
  const key = INGREDIENTS_NAME_KEYS_ARRAY.find(
    (key) => key.toLowerCase() === name,
  );

  if (!key) return null;

  return INGREDIENTS_WITH_NAME_KEYS[key];
};
