import {
  QUERY_KEY__PRODUCT,
  QUERY_KEY__PRODUCT_LIST,
  QUERY_KEY__USER_PROFILE,
  QUERY_KEY__RECIPE,
  QUERY_KEY__RECIPE_LIST,
  QUERY_KEY__RECOMMEND,
  QUERY_KEY__BOOKMARKS,
} from './queryKeys';

// Product
export const generateProductQueryKey = (productKey: string) => {
  return [QUERY_KEY__PRODUCT, productKey];
};

export const generateProductRecommendQueryKey = (productKey: string) => {
  return [QUERY_KEY__PRODUCT, productKey, QUERY_KEY__RECOMMEND];
};

// Product List
export const generateProductListQueryKey = ({
  type,
  query,
}: {
  type: string;
  query: string;
}) => {
  return [QUERY_KEY__PRODUCT_LIST, { type, query }];
};

// User
export const generateUserProfileQueryKey = (username: string) => {
  return [QUERY_KEY__USER_PROFILE, username];
};

export const generateUserBookmarksQueryKey = () => {
  return [QUERY_KEY__USER_PROFILE, QUERY_KEY__BOOKMARKS];
};

// Recipe List
export const generateRecipeListQueryKey = ({
  query,
  type,
}: {
  query: string;
  type: string;
}) => {
  return [QUERY_KEY__RECIPE_LIST, { query, type }] as const;
};

// Recipe
export const generateRecipeQueryKey = (recipeKey: string) => {
  return [QUERY_KEY__RECIPE, recipeKey];
};

export const generateRecipeRecommendQueryKey = (recipeKey: string) => {
  return [QUERY_KEY__RECIPE, recipeKey, QUERY_KEY__RECOMMEND];
};

// Bookmarks
export const generateBookmarkListQueryKey = () => {
  return [QUERY_KEY__BOOKMARKS];
};
