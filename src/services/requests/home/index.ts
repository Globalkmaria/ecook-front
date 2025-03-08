import { AsyncError } from '@/services/helpers';

import { GetHomeRecipesRes } from './type';
import { fetchAPI } from '../../api';
import { FetchResult } from '../../type';
import { createAsyncErrorMessage, withSafeAsync } from '../../utils';

export const getHomeRecipes =
  withSafeAsync(async (): FetchResult<GetHomeRecipesRes> => {
    const response = await fetchAPI<GetHomeRecipesRes>('/home');

    if (response.ok) return { ok: true, data: response.data };

    throw new AsyncError(
      createAsyncErrorMessage(response.res, `Failed to fetch home recipes`),
      response.res,
    );
  }, []);
