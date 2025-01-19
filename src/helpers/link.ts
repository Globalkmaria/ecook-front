import { lightSlugify } from '@/utils/normalize';

export const getUserLink = (username: string) => `/sn/users/${username}`;

export const getSearchTagLink = (tag: string) => `/sn/search?type=tag&q=${tag}`;

export const getSearchIngredientLink = (ingredient: string) =>
  `/sn/search?type=ingredient&q=${ingredient}`;

export const getSearchProductLink = (product: string) =>
  `/sn/search?type=product&q=${lightSlugify(product)}`;

export const getRecipeLink = (recipeKey: string) => `/sn/recipes/${recipeKey}`;
