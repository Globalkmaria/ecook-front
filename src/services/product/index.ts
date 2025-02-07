import { fetchAPI } from '../api';
import { AsyncError } from '../helper/AsyncError';
import { Product } from '../products/type';
import { RecommendRecipe } from '../recommend/type';
import { FetchResult } from '../type';
import { createAsyncErrorMessage, withSafeAsync } from '../utils';

export const getProduct = withSafeAsync(
  async (productKey: string, options?: RequestInit): FetchResult<Product> => {
    const response = await fetchAPI(`/products/${productKey}`, {
      ...options,
    });

    if (response.ok) return { ok: true, data: response.data };

    throw new AsyncError(
      createAsyncErrorMessage(response.res, 'Failed to get product'),
      response.res,
    );
  },
);

export const getProductRecommendations = withSafeAsync(
  async (
    productKey: string,
    options?: RequestInit,
  ): FetchResult<RecommendRecipe[]> => {
    const response = await fetchAPI(
      `/products/${productKey}/recommend`,
      options,
    );

    if (response.ok) return { ok: true, data: response.data };

    throw new AsyncError(
      createAsyncErrorMessage(response.res, 'Failed to fetch recommendations'),
      response.res,
    );
  },
);
