import { AsyncError } from '@/services/helpers';

import { fetchAPI } from '../../api';
import { FetchResult } from '../../type';
import { createAsyncErrorMessage, withSafeAsync } from '../../utils';
import { Product } from '../products/type';
import { RecommendRecipe } from '../recommend/type';

export const getProduct = withSafeAsync(
  async (productKey: string, options?: RequestInit): FetchResult<Product> => {
    const response = await fetchAPI<Product>(
      `/products/${productKey}`,
      options,
    );

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
    const response = await fetchAPI<RecommendRecipe[]>(
      `/products/${productKey}/recommend`,
      options,
    );

    if (response.ok) {
      response.data.sort((a, b) => a.name.localeCompare(b.name));

      return {
        ok: true,
        data: response.data,
      };
    }
    throw new AsyncError(
      createAsyncErrorMessage(response.res, 'Failed to fetch recommendations'),
      response.res,
    );
  },
);
