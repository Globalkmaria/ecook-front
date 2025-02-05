import { fetchAPI } from '@/services/api';

import { FetchResult } from '../type';
import { RecipeRecommendations } from './type';
import { createAsyncErrorMessage, withSafeAsync } from '../utils';

export const getHomeRecommendations = withSafeAsync(
  async (): FetchResult<RecipeRecommendations> => {
    const response = await fetchAPI(`/recommend/home`);

    if (response.ok) return { ok: true, data: response.data };

    throw new Error(
      createAsyncErrorMessage(
        response.res,
        'Failed to fetch home recommendations',
      ),
    );
  },
);
