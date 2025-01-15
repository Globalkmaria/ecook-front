import { getRandomId } from '@/utils/generateId';
import { Dispatch, SetStateAction } from 'react';
import { NewRecipeIngredientState } from '../../components/NewRecipe';

export const onFieldChange = <T extends { id: string }>(
  setState: Dispatch<SetStateAction<T[]>>,
  id: string,
  fieldName: string,
  value: string,
) => {
  setState((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, [fieldName]: value } : item,
    ),
  );
};

export const getNewIngredient = (): NewRecipeIngredientState => ({
  id: getRandomId(),
  name: '',
  quantity: '',
  ingredientId: null,
  productId: null,
  newProduct: null,
});
