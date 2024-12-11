import { lightSlugify } from '@/utils/normalize';

export const getUserLink = (username: string) => `/users/${username}`;

export const getSearchTagLink = (tag: string) => `/search?type=tag&q=${tag}`;

export const getSearchIngredientLink = (ingredient: string) =>
  `/search?type=ingredient&q=${ingredient}`;

export const getSearchProductLink = (product: string) =>
  `/search?type=product&q=${lightSlugify(product)}`;
