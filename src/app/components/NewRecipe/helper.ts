import { ImgState, NewRecipeIngredientStates, TextInputs } from '.';
import { Step } from './components/RecipeStepsContent';

export const getValidIngredients = (ingredients: NewRecipeIngredientStates) =>
  ingredients.filter(
    (ingredient) => ingredient.name.trim() || ingredient.quantity.trim(),
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
  ingredients[0].name.trim() &&
  steps[0].value.trim().length;
