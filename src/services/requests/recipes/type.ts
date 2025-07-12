import { ImageFileType } from '@/components/imageUploader/helper';

import { RecipeSimple } from '../recipe/type';

export type GetRecipesRes = {
  search: RecipeSimple[];
  recommend: RecipeSimple[];
};

export interface IngredientNewProduct {
  id: string;
  name: string;
  brand: string | null;
  purchasedFrom: string | null;
  link: string | null;
  img: ImageFileType;
}

export interface NewRecipeIngredient {
  quantity: string;
  ingredientId: string | null;
  ingredientName: string;
  productId: string | null;
  newProduct: IngredientNewProduct | null;
}

export interface NewRecipeData {
  name: string;
  description: string;
  hours: string;
  minutes: string;
  steps: string[];
  img: ImageFileType;
  ingredients: NewRecipeIngredient[];
  tags: string[];
}

export interface NewRecipeIngredientServer {
  name: string;
  quantity: string;
  ingredientId: string | null;
  productId: string | null;
  newProduct: IngredientNewProduct | null;
}

export interface NewRecipeDataServer {
  name: string;
  description: string;
  hours: string;
  minutes: string;
  steps: string[];
  img: File | null;
  ingredients: NewRecipeIngredientServer[];
  tags: string[];
}
