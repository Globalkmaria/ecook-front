import { RecipeSimple } from '../recipe/type';

export interface User {
  img?: string;
  username: string;
}

export type Profile = User & {
  totalPosts: number;
};

export interface CheckUsernameAvailabilityRes {
  message: string;
  isAvailable: boolean;
}

export interface GetUserBookmarkedRecipesRes {
  search: RecipeSimple[];
  recommend: RecipeSimple[];
}
