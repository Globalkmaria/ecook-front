export const SEARCH_TYPES_KEYS = {
  NAME: 'name',
  TAG: 'tag',
  INGREDIENT: 'ingredient',
  PRODUCT: 'product',
  USERNAME: 'username',
} as const;

export const SEARCH_TYPES = Object.values(SEARCH_TYPES_KEYS);

export type RecipesSearchType = (typeof SEARCH_TYPES)[number];

export const checkSearchType = (
  type: string | undefined,
): type is RecipesSearchType =>
  SEARCH_TYPES.includes(type as RecipesSearchType);

export const RECIPES_BATCH_TYPES_KEYS = {
  KEYS: 'keys',
} as const;

export const RECIPES_BATCH_TYPES = Object.values(RECIPES_BATCH_TYPES_KEYS);

export type RecipesBatchType = (typeof RECIPES_BATCH_TYPES)[number];
