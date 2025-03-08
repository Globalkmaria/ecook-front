import { fetchAPI } from '@/services/api';
import { AsyncError } from '@/services/helpers';
import { FetchResult } from '@/services/type';
import { createAsyncErrorMessage, withSafeAsync } from '@/services/utils';

import { DeletePantryItem, UpdatePantryItemReq } from './type';

const BASE_URL = '/pantry/items';

export const deletePantryItem = withSafeAsync(
  async (key: string): FetchResult<DeletePantryItem> => {
    const response = await fetchAPI(`${BASE_URL}/${key}`, {
      method: 'DELETE',
    });

    if (response.ok) return { ok: true, data: response.data };

    throw new AsyncError(
      createAsyncErrorMessage(response.res, 'Failed to delete pantry item'),
      response.res,
    );
  },
);

export const updatePantryItem = withSafeAsync(
  async (key: string, data: UpdatePantryItemReq): FetchResult => {
    const response = await fetchAPI(`${BASE_URL}/${key}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) return { ok: true };

    throw new AsyncError(
      createAsyncErrorMessage(response.res, 'Failed to update pantry item'),
      response.res,
    );
  },
);
