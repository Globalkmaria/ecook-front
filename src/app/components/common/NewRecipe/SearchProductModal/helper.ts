import { getRandomId } from '@/utils/generateId';

import { IngredientNewProduct } from '@/services/requests/recipes/type';

import {
  NEW_PRODUCT_ID,
  SearchedIngredientState,
  SelectedProductState,
} from '.';
import { NewRecipeIngredientState } from '../';
import { OnSelectProductProps } from '../RecipeIngredients/RecipeIngredientsContent';

export const getSelectedProductInitialState = (
  ingredient: NewRecipeIngredientState,
): SelectedProductState =>
  (ingredient.productId ?? ingredient.newProduct?.id)
    ? {
        ingredientId: ingredient.id,
        ingredientName: ingredient.ingredientName,
        productId: ingredient.productId ?? NEW_PRODUCT_ID,
        newProduct: null,
      }
    : null;

export const getNewProduct = () => ({
  name: '',
  img: null,
  brand: null,
  link: null,
  purchasedFrom: null,
  id: getRandomId(),
});

export const getNewProductInitialState = (
  ingredient: NewRecipeIngredientState,
) =>
  ingredient.newProduct?.id ? { ...ingredient.newProduct } : getNewProduct();

export const getIngredientWithNewProduct = ({
  selectedProduct,
  searchedIngredient,
  newProduct,
}: {
  selectedProduct: NonNullable<SelectedProductState>;
  searchedIngredient: SearchedIngredientState;
  newProduct: IngredientNewProduct | null;
}): OnSelectProductProps => ({
  // removing new product fake product id
  product: {
    ...selectedProduct,
    ingredientName: searchedIngredient?.name ?? '',
    productId: null,
    newProduct,
  },
  ingredient: {
    name: searchedIngredient?.name ?? '',
    id: searchedIngredient?.id,
  },
});

export const getIngredientWithExistingProduct = ({
  selectedProduct,
}: {
  selectedProduct: NonNullable<SelectedProductState>;
}): OnSelectProductProps => ({
  product: {
    ingredientName: selectedProduct.ingredientName,
    ingredientId: selectedProduct.ingredientId,
    productId: selectedProduct.productId,
    newProduct: null,
  },
  ingredient: {
    name: selectedProduct.ingredientName,
    id: selectedProduct.ingredientId,
  },
});
