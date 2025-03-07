import { fetchAPI } from '@/services/api';

import { FetchResult } from '../../type';
import { RecipeRecommendations, RecommendRecipe } from './type';
import { createAsyncErrorMessage, withSafeAsync } from '../../utils';
import { AsyncError } from '@/services/helpers';

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

export const getPantryBoxRecommendations = withSafeAsync(
  async (key: string): FetchResult<RecommendRecipe[]> => {
    const response = await fetchAPI(`/recommend/pantry/boxes/${key}`);

    if (response.ok) return { ok: true, data: response.data };

    throw new AsyncError(
      createAsyncErrorMessage(
        response.res,
        'Failed to fetch pantry box recommendations',
      ),
      response.res,
    );
  },
);
