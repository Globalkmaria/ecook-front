import { NewRecipeIngredientStates } from '.';
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
