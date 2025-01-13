import { RecipeSimple } from '../recipe/type';

export type HomeRecipe = RecipeSimple & {
  user: { username: string };
};

export interface IngredientNewProduct {
  name: string;
  brand: string | null;
  purchasedFrom: string | null;
  link: string | null;
  img: File | null;
  id: string;
}

export interface NewRecipeIngredient {
  name: string;
  quantity: string;
  ingredientId: string | null;
  productId: string | null;
  newProduct: IngredientNewProduct | null;
}

export interface NewRecipeData {
  name: string;
  description: string;
  hours: string;
  minutes: string;
  steps: string[];
  img: File | null;
  ingredients: NewRecipeIngredient[];
  tags: string[];
}
