import {
  NewRecipeIngredientStates,
  NewRecipeInitialData,
} from '@/app/recipes/new/NewRecipe';
import { NewRecipeSubmitProps } from '@/app/recipes/new/NewRecipeContainer';
import { IngredientNewProduct, RecipeDetail } from '@/service/recipes/type';
import { getRandomId } from '@/utils/generateId';
import { EditRecipeData } from '.';

export const isRequiredFieldsFilled = (data: NewRecipeSubmitProps) =>
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

export const getNewProducts = (
  ingredients: NewRecipeIngredientStates,
): IngredientNewProduct[] =>
  ingredients.map((item) => item.newProduct).filter((item) => !!item);

export const appendProductImgsToFormData = (
  products: IngredientNewProduct[],
  formData: FormData,
) => {
  products.forEach(
    (product) =>
      product.img && formData.append(`img_${product.id}`, product.img),
  );
};

export const appendRecipeImgToFormData = (
  img: string | File | null,
  formData: FormData,
) => isNewImg(img) && formData.append('img', img);

type InfoData = Omit<NewRecipeSubmitProps, 'img'>;

export const getEditRecipeInfoData = ({
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

export const isNewImg = (img: string | File | null) =>
  !!(img && typeof img !== 'string');
