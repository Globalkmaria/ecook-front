import { RecipeSimple } from '../recipes/type';

export interface User {
  img?: string;
  username: string;
}

export interface Profile {
  user: User;
  recipes: RecipeSimple[];
}

export interface ResIsUsernameAvailable {
  message: string;
  isAvailable: boolean;
}
