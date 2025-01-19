import { lightSlugify } from '@/utils/normalize';

export const getUserLink = (username: string) => `/sn/users/${username}`;

export const getSearchTagLink = (tag: string) => `/sn/search?type=tag&q=${tag}`;

export const getSearchIngredientLink = (ingredient: string) =>
  `/sn/search?type=ingredient&q=${ingredient}`;

export const getSearchProductLink = (product: string) =>
  `/sn/search?type=product&q=${lightSlugify(product)}`;

export const getSearchURL = (type: string, query: string) => {
  const sluggedQuery = lightSlugify(query);
  return `/sn/search?type=${type}&q=${sluggedQuery}`;
};

export const getRecipeLink = (recipeKey: string) => `/sn/recipes/${recipeKey}`;

export const NEW_RECIPE_LINK = `/sn/recipes/new`;

export const SIGNUP_LINK = `/signup`;

export const LOGIN_LINK = `/login`;

export const HOME_LINK = `/`;
