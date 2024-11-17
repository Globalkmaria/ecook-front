import { Product } from '../products/type';

export interface RecipeSimple {
  id: string;
  name: string;
  img: string;
  hours: number;
  minutes: number;
  tags: { id: string; name: string }[];
}

export interface RecipeProduct {
  id: string;
  name: string;
  brand: string | null;
  purchasedFrom: string | null;
  link: string | null;
  img: string | null;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  ingredientId: string | null;
  userProduct: RecipeProduct | null;
  products: Product[] | null;
}

export interface RecipeIngredient {
  id: string;
  name: string;
  quantity: string;
  ingredientId: string | null;
  product: RecipeProduct | null;
}

export interface RecipeDetail {
  id: number;
  name: string;
  description: string;
  hours: number;
  minutes: number;
  steps: string[];
  img: string;
  ingredients: Ingredient[];
  tags: { id: string; name: string }[];
  user: { id: string; username: string; img: string | null };
}

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
  title: string;
  description: string;
  hours: string;
  minutes: string;
  steps: string[];
  img: File | null;
  ingredients: NewRecipeIngredient[];
  tags: string[];
  user: { id: string };
}
