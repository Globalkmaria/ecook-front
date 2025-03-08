import { fetchAPI, FetchAPIOptions } from '@/services/api';
import { AsyncError } from '@/services/helpers';

import { RecipeRecommendations, RecommendRecipe } from './type';
import { FetchResult } from '../../type';
import { createAsyncErrorMessage, withSafeAsync } from '../../utils';

export const getHomeRecommendations = withSafeAsync(
  async (): FetchResult<RecipeRecommendations> => {
    const response = await fetchAPI<RecipeRecommendations>(`/recommend/home`);

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
  async ({
    key,
    options,
  }: {
    key: string;
    options?: FetchAPIOptions;
  }): FetchResult<RecommendRecipe[]> => {
    const response = await fetchAPI<RecommendRecipe[]>(
      `/recommend/pantry/boxes/${key}`,
      options,
    );

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
