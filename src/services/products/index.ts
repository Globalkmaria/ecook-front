import { fetchAPI } from '@/services/api';
import { FetchResult } from '../type';
import { GetProductsReq, GetProductsRes } from './type';
import { createAsyncErrorMessage, withSafeAsync } from '../utils';

export const PRODUCT_TYPES = {
  INGREDIENT: 'ingredientName',
  USERNAME: 'username',
  PRODUCT_KEY: 'productKey',
} as const;

export const getProducts = withSafeAsync(
  async ({ type, q, options }: GetProductsReq): FetchResult<GetProductsRes> => {
    const response = await fetchAPI(`/products?type=${type}&q=${q}`, {
      ...options,
    });

    if (response.ok) return { ok: true, data: response.data };

    throw new Error(
      createAsyncErrorMessage(response.res, 'Failed to get products'),
    );
  },
);
