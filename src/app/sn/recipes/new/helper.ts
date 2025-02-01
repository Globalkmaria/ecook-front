import { getRandomId } from '@/utils/generateId';

import {
  NewRecipeIngredientState,
  NewRecipeInitialData,
  NewRecipeSubmitProps,
} from '@/app/components/NewRecipe';
import {
  NewRecipeDataServer,
  NewRecipeIngredientServer,
} from '@/services/recipes/type';

export const getNewIngredient = (): NewRecipeIngredientState => ({
  id: getRandomId(),
  ingredientName: '',
  quantity: '',
  ingredientId: null,
  productId: null,
  newProduct: null,
});

export const getNewRecipeInitialData = (): NewRecipeInitialData => ({
  name: '',
  description: '',
  hours: '',
  minutes: '',
  img: null,
  ingredients: [getNewIngredient()],
  steps: [{ id: getRandomId(), value: '' }],
  tags: [],
});

export const appendProductImgsToFormData = (
  ingredients: NewRecipeSubmitProps['ingredients'],
  formData: FormData,
): FormData => {
  ingredients.forEach(
    ({ newProduct }) =>
      newProduct &&
      newProduct.img &&
      formData.append(`img_${newProduct.id}`, newProduct.img),
  );

  return formData;
};

export const appendRecipeImgToFormData = (
  img: NewRecipeSubmitProps['img'],
  formData: FormData,
): FormData => {
  const isNewImg = !!(img && typeof img !== 'string');
  if (isNewImg) formData.append('img', img);

  return formData;
};

const getSteps = (steps: NewRecipeSubmitProps['steps']) =>
  steps.map((item) => item.value);

const getIngredients = (
  ingredients: NewRecipeSubmitProps['ingredients'],
): NewRecipeIngredientServer[] =>
  ingredients.map((item) => ({
    name: item.ingredientName,
    quantity: item.quantity,
    ingredientId: item.productId,
    newProduct: item.newProduct,
    productId: item.productId,
  }));

const appendRecipeInformationToFormData = (
  data: NewRecipeSubmitProps,
  formData: FormData,
) => {
  const info: Omit<NewRecipeDataServer, 'img'> = {
    ...data.textInputs,
    steps: getSteps(data.steps),
    ingredients: getIngredients(data.ingredients),
    tags: data.tags,
  };

  formData.append('info', JSON.stringify(info));
  return formData;
};

export const getNewRecipeSubmitFormData = (
  data: NewRecipeSubmitProps,
): FormData => {
  const formData = new FormData();

  appendProductImgsToFormData(data.ingredients, formData);
  appendRecipeImgToFormData(data.img, formData);
  appendRecipeInformationToFormData(data, formData);

  return formData;
};

export const validateNewRecipeData = (data: NewRecipeSubmitProps) =>
  data.img &&
  data.ingredients.length &&
  data.steps.length &&
  data.textInputs.name.trim();
