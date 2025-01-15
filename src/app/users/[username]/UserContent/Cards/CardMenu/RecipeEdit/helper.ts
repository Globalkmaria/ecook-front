import { RecipeDetail } from '@/services/recipe/type';

import { getRandomId } from '@/utils/generateId';

import { NewRecipeInitialData } from '@/app/components/NewRecipe';
import { NewRecipeSubmitProps } from '@/app/components/NewRecipe';

import { EditRecipeData } from '.';
import {
  appendProductImgsToFormData,
  appendRecipeImgToFormData,
} from '@/app/recipes/new/helper';

export const checkRequiredFieldsFilled = (data: NewRecipeSubmitProps) =>
  data.img &&
  data.ingredients.length &&
  data.steps.length &&
  data.textInputs.name;

export const getEditRecipeInitialValues = (
  recipe: RecipeDetail,
): NewRecipeInitialData => ({
  name: recipe.name,
  description: recipe.description,
  hours: recipe.hours === 0 ? '' : recipe.hours.toString(),
  minutes: recipe.minutes === 0 ? '' : recipe.minutes.toString(),
  img: recipe.img,
  ingredients: recipe.ingredients.map((item) => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    ingredientId: item.ingredientId,
    productId: item.userProduct?.id ?? null,
    newProduct: null,
  })),
  steps: recipe.steps.map((item) => ({ value: item, id: getRandomId() })),
  tags: recipe.tags.map((item) => item.name),
});

type InfoData = Omit<NewRecipeSubmitProps, 'img'>;

const getEditRecipeInfoData = ({
  textInputs,
  steps,
  ingredients,
  tags,
}: InfoData): EditRecipeData => {
  return {
    ...textInputs,
    steps: steps.map((item) => item.value),
    ingredients: ingredients.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      ingredientId: item.productId,
      newProduct: item.newProduct,
      productId: item.productId,
    })),
    tags: tags,
  };
};

const appendRecipeInfo = (data: NewRecipeSubmitProps, formData: FormData) => {
  const info = getEditRecipeInfoData(data);
  formData.append('info', JSON.stringify(info));
};

export const getEditRecipeFormData = (data: NewRecipeSubmitProps) => {
  const formData = new FormData();

  appendProductImgsToFormData(data.ingredients, formData);
  appendRecipeImgToFormData(data.img, formData);
  appendRecipeInfo(data, formData);

  return formData;
};
