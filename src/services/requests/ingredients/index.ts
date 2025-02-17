import { fetchAPI } from '@/services/api';
import { AsyncError } from '@/services/helpers';
import { createAsyncErrorMessage, withSafeAsync } from '@/services/utils';
import {
  GetIngredientsWithProductsReq,
  GetIngredientsWithProductsRes,
} from './type';
import { FetchResult } from '@/services/type';

export const getIngredientsWithProducts = withSafeAsync(
  async ({
    items,
  }: GetIngredientsWithProductsReq): FetchResult<GetIngredientsWithProductsRes> => {
    if (Object.keys(items).length === 0) return { ok: true, data: {} };

    const response = await fetchAPI('/ingredients/batch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });

    if (response.ok) return { ok: true, data: response.data };

    throw new AsyncError(
      createAsyncErrorMessage(response.res, `Failed to fetch ingredients`),
      response.res,
    );
  },
);
