import { fetchAPI } from '@/services/api';
import { AsyncError } from '@/services/helpers';
import { FetchResult } from '@/services/type';
import { createAsyncErrorMessage, withSafeAsync } from '@/services/utils';
import {
  AddPantryBoxReq,
  AddPantryBoxRes,
  GetPantryBoxesRes,
  GetPantryBoxRes,
} from './type';

const BASE_URL = '/pantry/boxes';

export const getPantryBoxes = withSafeAsync(
  async (): FetchResult<GetPantryBoxesRes> => {
    const response = await fetchAPI(BASE_URL);

    if (response.ok) return { ok: true, data: response.data };

    throw new AsyncError(
      createAsyncErrorMessage(response.res, 'Failed to fetch pantry boxes'),
      response.res,
    );
  },
);

export const addPantryBox = withSafeAsync(
  async (data: AddPantryBoxReq): FetchResult<AddPantryBoxRes> => {
    const response = await fetchAPI(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.ok) return { ok: true, data: response.data };

    throw new AsyncError(
      createAsyncErrorMessage(response.res, 'Failed to add pantry box'),
      response.res,
    );
  },
);

export const getPantryBox = withSafeAsync(
  async (key: string): FetchResult<GetPantryBoxRes> => {
    const response = await fetchAPI(`${BASE_URL}/${key}`);

    if (response.ok) return { ok: true, data: response.data };

    throw new AsyncError(
      createAsyncErrorMessage(response.res, 'Failed to fetch pantry box'),
      response.res,
    );
  },
);

export const deletePantryBox = withSafeAsync(
  async (key: string): FetchResult => {
    const response = await fetchAPI(`${BASE_URL}/${key}`, {
      method: 'DELETE',
    });

    if (response.ok) return { ok: true };

    throw new AsyncError(
      createAsyncErrorMessage(response.res, 'Failed to delete pantry box'),
      response.res,
    );
  },
);
