export const SEARCH_TYPES_KEYS = {
  NAME: 'name',
  TAG: 'tag',
  INGREDIENT: 'ingredient',
  PRODUCT: 'product',
  USERNAME: 'username',
} as const;

export const SEARCH_TYPES = Object.values(SEARCH_TYPES_KEYS);

export type RecipeListSearchType = (typeof SEARCH_TYPES)[number];

export const checkSearchType = (type: any): type is RecipeListSearchType =>
  SEARCH_TYPES.includes(type);
