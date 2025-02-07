import {
  ImgState,
  NewRecipeIngredientState,
  NewRecipeIngredientStates,
  TextInputs,
} from '.';
import {
  SelectedIngredientInfo,
  SelectedProductInfo,
} from './RecipeIngredients/RecipeIngredientsContent';
import { Step } from './RecipeSteps/RecipeStepsContent';

export const getValidIngredients = (ingredients: NewRecipeIngredientStates) =>
  ingredients.filter(
    (ingredient) =>
      ingredient.ingredientName.trim() || ingredient.quantity.trim(),
  );

export const getValidAndTrimmedSteps = (steps: Step[]) =>
  steps
    .filter((step) => step.value.trim())
    .map((step) => ({
      ...step,
      value: step.value.trim(),
    }));

export const checkIfAllFieldsAreFilled = ({
  textInputs,
  img,
  ingredients,
  steps,
}: {
  textInputs: TextInputs;
  img: ImgState;
  ingredients: NewRecipeIngredientStates;
  steps: Step[];
}) =>
  textInputs.name.trim() &&
  img &&
  ingredients[0].ingredientName.trim() &&
  steps[0].value.trim().length;

export const removeProductInfoFromSelectedIngredient = (
  ingredients: NewRecipeIngredientStates,
  selectedIngredientId: NewRecipeIngredientState['id'],
): NewRecipeIngredientStates =>
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
  selectedIngredient,
  selectedProductInfo,
}: AddProductProps): NewRecipeIngredientStates =>
  ingredients.map((item) =>
    item.id === selectedIngredient.id
      ? {
          ...item,
          ingredientName: selectedProductInfo?.ingredientName ?? '',
          ingredientId: selectedProductInfo?.ingredientId ?? null,
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
