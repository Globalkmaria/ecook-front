import { getRandomId } from '@/utils/generateId';
import {
  NEW_PRODUCT_ID,
  SearchedIngredientState,
  SelectedProductState,
} from '.';
import { NewRecipeIngredientState } from '../..';
import { IngredientNewProduct } from '@/services/recipes/type';

export const getSelectedProductInitialState = (
  ingredient: NewRecipeIngredientState,
) =>
  (ingredient.productId ?? ingredient.newProduct?.id)
    ? {
        ...ingredient,
        productId: ingredient.productId ?? NEW_PRODUCT_ID,
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
}) => ({
  // removing new product fake product id
  product: {
    ...selectedProduct,
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
  searchedIngredient,
}: {
  selectedProduct: NonNullable<SelectedProductState>;
  searchedIngredient: SearchedIngredientState;
}) => ({
  product: {
    name: selectedProduct.name,
    ingredientId: selectedProduct.ingredientId,
    productId: selectedProduct.productId,
    newProduct: null,
  },
  ingredient: {
    name: searchedIngredient?.name ?? '',
    id: searchedIngredient?.id,
  },
});
