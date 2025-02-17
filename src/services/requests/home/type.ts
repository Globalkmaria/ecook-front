import { RecipeSimple } from '../recipe/type';

export type HomeRecipe = RecipeSimple & {
  user: { username: string };
};

export type GetHomeRecipesRes = HomeRecipe[];
