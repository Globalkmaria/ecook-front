import { lightSlugify } from '@/utils/normalize';

import { SearchMenuValue } from '@/const/searchMenu';

export const getUserLink = (username: string) => `/sn/users/${username}`;

export const getSearchTagLink = (tag: string) => `/sn/search?type=tag&q=${tag}`;

export const getSearchIngredientLink = (ingredient: string) =>
  `/sn/search?type=ingredient&q=${ingredient}`;

export const getSearchProductLink = (product: string) =>
  `/sn/search?type=product&q=${lightSlugify(product)}`;

export const getSearchLink = (type: SearchMenuValue, query: string) => {
  const sluggedQuery = lightSlugify(query);
  return `/sn/search?type=${type}&q=${sluggedQuery}`;
};

export const getRecipeLink = (recipeKey: string) => `/sn/recipes/${recipeKey}`;

export const getProductLink = (productKey: string) =>
  `/sn/products/${productKey}`;

export const getPantryBoxLink = (pantryBoxKey: string) =>
  `/sn/pantry/${pantryBoxKey}`;

export const NEW_RECIPE_LINK = `/sn/recipes/new`;

export const SIGNUP_LINK = `/signup`;

export const LOGIN_LINK = `/login`;

export const HOME_LINK = `/`;

export const BOOKMARKS_LINK = `/sn/bookmarks`;

export const CARTS_LINK = `/sn/carts`;

export const PANTRY_LINK = `/sn/pantry`;
