import { fetchAPI } from '@/services/api';
import { FetchResult } from '@/services/type';
import { createAsyncErrorMessage, withSafeAsync } from '@/services/utils';
import { AsyncError } from '@/services/helpers';

import { CreateCartItemReq, GetUserCartRes } from './type';

export const getUserCart = withSafeAsync(
  async (username: string): FetchResult<GetUserCartRes> => {
    const response = await fetchAPI(`/carts/user/${username}`);

    if (response.ok) return { ok: true, data: response.data };

    throw new AsyncError(
      createAsyncErrorMessage(response.res, 'Failed to fetch cart'),
      response.res,
    );
  },
);

interface UpdateCartItemQuantityReq {
  username: string;
  ingredientKey: string;
  productKey?: string;
  quantity: number;
}

export const updateCartItemQuantity = withSafeAsync(
  async ({
    username,
    ingredientKey,
    productKey,
    quantity,
  }: UpdateCartItemQuantityReq): FetchResult<{ count: number }> => {
    const response = await fetchAPI(`/carts/user/${username}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredientKey, productKey, quantity }),
    });

    if (response.ok) return { ok: true, data: response.data };

    throw new AsyncError(
      createAsyncErrorMessage(
        response.res,
        'Failed to update cart item quantity',
      ),
      response.res,
    );
  },
);

export const createCartItem = withSafeAsync(
  async ({
    username,
    ingredientKey,
    productKey,
  }: CreateCartItemReq): FetchResult<{ count: number }> => {
    const response = await fetchAPI(`/carts/user/${username}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredientKey, productKey }),
    });

    if (response.ok) return { ok: true, data: response.data };

    throw new AsyncError(
      createAsyncErrorMessage(response.res, 'Failed to create cart item'),
      response.res,
    );
  },
);
