import {
  QUERY_KEY__PRODUCT,
  QUERY_KEY__PRODUCT_LIST,
  QUERY_KEY__USER_PROFILE,
  QUERY_KEY__RECIPE,
  QUERY_KEY__RECIPE_LIST,
  QUERY_KEY__RECOMMEND,
} from './const';

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

// User Profile
export const generateUserProfileQueryKey = (username: string) => {
  return [QUERY_KEY__USER_PROFILE, username];
};

// Recipe List
export const generateRecipeListQueryKey = ({
  query,
  type,
}: {
  query: string;
  type: string;
}) => {
  return [QUERY_KEY__RECIPE_LIST, { query, type }];
};

// Recipe
export const generateRecipeQueryKey = (recipeKey: string) => {
  return [QUERY_KEY__RECIPE, recipeKey];
};

export const generateRecipeRecommendQueryKey = (recipeKey: string) => {
  return [QUERY_KEY__RECIPE, recipeKey, QUERY_KEY__RECOMMEND];
};
