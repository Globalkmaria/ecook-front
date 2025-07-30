import { getRandomId } from '@/utils/generateId';

import { getFileFromImageValue } from '@/components/imageUploader/helper';

import {
  NewRecipeIngredientState,
  NewRecipeInitialData,
  NewRecipeSubmitProps,
} from '@/app/components/common/NewRecipe';

import {
  NewRecipeDataServer,
  NewRecipeIngredientServer,
} from '@/services/requests/recipes/type';

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
  ingredients.forEach(({ newProduct }) => {
    if (newProduct && newProduct.img) {
      const fileImg = getFileFromImageValue(newProduct.img);
      if (fileImg) {
        formData.append(`img_${newProduct.id}`, fileImg);
      }
    }
  });

  return formData;
};

export const appendRecipeImgToFormData = (
  img: NewRecipeSubmitProps['img'],
  formData: FormData,
): FormData => {
  const fileImg = getFileFromImageValue(img);
  if (fileImg) formData.append('img', fileImg);

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
    newProduct: item.newProduct
      ? {
          id: item.newProduct?.id,
          name: item.newProduct?.name,
          brand: item.newProduct?.brand,
          purchasedFrom: item.newProduct?.purchasedFrom,
          link: item.newProduct?.link,
        }
      : null,
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
