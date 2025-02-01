import { fetchAPI } from '@/services/api';

import { FetchResult } from '../type';
import { RecipeRecommendations } from './type';

export const getHomeRecommendations =
  async (): FetchResult<RecipeRecommendations> => {
    try {
      const response = await fetchAPI(`/recommend/home`);

      if (response.ok) return { ok: true, data: response.data };

      throw new Error(response.res.statusText);
    } catch (e) {
      console.error('Failed to fetch home recommendations', e);
      return { ok: false, error: 'Failed to fetch home recommendations' };
    }
  };
