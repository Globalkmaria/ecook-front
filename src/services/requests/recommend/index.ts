import { fetchAPI } from '@/services/api';

import { FetchResult } from '../../type';
import { RecipeRecommendations } from './type';
import { createAsyncErrorMessage, withSafeAsync } from '../../utils';
import { AsyncError } from '../helper/AsyncError';

export const getHomeRecommendations = withSafeAsync(
  async (): FetchResult<RecipeRecommendations> => {
    const response = await fetchAPI(`/recommend/home`);

    if (response.ok) return { ok: true, data: response.data };

    throw new AsyncError(
      createAsyncErrorMessage(
        response.res,
        'Failed to fetch home recommendations',
      ),
      response.res,
    );
  },
);
