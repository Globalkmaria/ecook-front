// export interface Recipe {
//   name: string;
//   description: string;
//   filters: string[];
//   ingredients: RecipeIngredient[];
//   steps: string[];
//   img: string;
//   user: User;
// }

// export interface RecipeIngredient {
//   id: string;
//   name: string;
//   ingredientProductId?: string;
//   quantity: string;
// }

// export interface User {
//   id: string;
//   username: string;
//   youtube?: string;
//   instagram?: string;
//   img?: string;
//   posts?: string[];
//   comments?: string[];
// }

// ---

export interface RecipeSimple {
  id: number;
  name: string;
  simpleDescription: string;
  img: string;
  tags: { id: number; name: string }[];
}

export interface IngredientProduct {
  id: number;
  name: string;
  brand: string | null;
  purchasedFrom: string | null;
  link: string | null;
  img: string | null;
}

export interface RecipeIngredient {
  id: number;
  name: string;
  quantity: string;
  ingredientId: number | null;
  product: IngredientProduct | null;
}

export interface RecipeDetail {
  id: number;
  name: string;
  description: string;
  simpleDescription: string;
  time: string;
  steps: string[];
  img: string;
  ingredients: RecipeIngredient[];
  tags: { id: number; name: string }[];
  user: { id: number; username: string; img: string | null };
}
