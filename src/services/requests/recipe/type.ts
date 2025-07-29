import { Product } from '../products/type';
import { RecommendRecipe } from '../recommend/type';

export interface RecipeSimple {
  id: string;
  name: string;
  img: string;
  hours: number;
  minutes: number;
  tags: { id: string; name: string }[];
  key: string;
  user: {
    username: string;
    img: string | null;
    isDeleted: boolean;
  };
}

export interface RecipeDetail {
  name: string;
  description: string;
  hours: number;
  minutes: number;
  steps: string[];
  img: string;
  ingredients: Ingredient[];
  tags: { id: string; name: string }[];
  user: {
    username: string;
    img: string | null;
    isDeleted: boolean;
  };
  key: string;
  createdAt: string;
}

export interface RecipeIngredient {
  id: string;
  name: string;
  quantity: string;
  ingredientId: string | null;
  product: RecipeProduct | null;
}

export interface RecipeProduct {
  id: string;
  key: string;
  name: string;
  brand: string | null;
  purchasedFrom: string | null;
  link: string | null;
  img: string | null;
}

export interface Ingredient {
  id: string;
  key: string;
  name: string;
  quantity: string;
  ingredientId: string | null;
  userProduct: RecipeProduct | null;
  products: Product[] | null;
}

export interface EditRecipeRes {
  key: string;
}

export type GetRecipeRecommendationsRes = RecommendRecipe[];
