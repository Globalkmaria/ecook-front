import { RecipeSimple } from '../recipes/type';

export interface User {
  id: number;
  img?: string;
  username: string;
}

export interface Profile {
  user: User;
  recipes: RecipeSimple[];
}
