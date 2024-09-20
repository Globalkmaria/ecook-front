import { Product } from '../products/type';

export interface RecipeSimple {
  id: number;
  name: string;
  simpleDescription: string;
  img: string;
  tags: { id: number; name: string }[];
}

export interface RecipeProduct {
  id: number;
  name: string;
  brand: string | null;
  purchasedFrom: string | null;
  link: string | null;
  img: string | null;
}

export interface Ingredient {
  id: number;
  name: string;
  quantity: string;
  ingredientId: number | null;
  userProduct: RecipeProduct | null;
  products: Product[] | null;
}

export interface RecipeIngredient {
  id: number;
  name: string;
  quantity: string;
  ingredientId: number | null;
  product: RecipeProduct | null;
}

export interface RecipeDetail {
  id: number;
  name: string;
  description: string;
  simpleDescription: string;
  time: string;
  steps: string[];
  img: string;
  ingredients: Ingredient[];
  tags: { id: number; name: string }[];
  user: { id: number; username: string; img: string | null };
}
