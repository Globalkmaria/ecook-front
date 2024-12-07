import { RecipeSimple } from '../recipes/type';

export interface User {
  img?: string;
  username: string;
}

export type Profile = User & {
  totalPosts: number;
};

export interface ResIsUsernameAvailable {
  message: string;
  isAvailable: boolean;
}
