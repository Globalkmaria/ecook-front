import { NewRecipeIngredientState, NewRecipeIngredientStates } from '..';
import {
  SelectedIngredientInfo,
  SelectedProductInfo,
} from './RecipeIngredientsContent';

export const removeProductInfoFromSelectedIngredient = (
  ingredients: NewRecipeIngredientStates,
  selectedIngredientId: NewRecipeIngredientState['id'],
) =>
  ingredients.map((item) =>
    item.id === selectedIngredientId
      ? {
          ...item,
          newProduct: null,
          productId: null,
        }
      : item,
  );

interface AddProductProps {
  selectedIngredientInfo: SelectedIngredientInfo;
  selectedIngredient: NewRecipeIngredientState;
  selectedProductInfo: SelectedProductInfo;
  ingredients: NewRecipeIngredientStates;
}

export const addProductInfoToSelectedIngredient = ({
  ingredients,
  selectedIngredientInfo,
  selectedIngredient,
  selectedProductInfo,
}: AddProductProps) =>
  ingredients.map((item) =>
    item.id === selectedIngredient.id
      ? {
          ...item,
          name: selectedIngredientInfo?.name ?? '',
          ingredientId: selectedIngredientInfo?.id ?? null,
          productId: selectedProductInfo?.productId ?? null,
          newProduct: selectedProductInfo?.newProduct ?? null,
        }
      : item,
  );

export const onFieldChange = <T extends { id: string }>(
  setState: React.Dispatch<React.SetStateAction<T[]>>,
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
