import { fetchAPI } from '@/services/api';

import { lightTrim } from '@/utils/normalize';

import { GetRecipesRes } from './type';
import { RecipeDetail } from '../recipe/type';
import { FetchResult } from '../type';
import { createAsyncErrorMessage, withSafeAsync } from '../utils';
import { RecipeListSearchType } from './helper';

export const getRecipes = withSafeAsync(
  async (
    query: string,
    type: RecipeListSearchType,
  ): FetchResult<GetRecipesRes> => {
    const response = await fetchAPI(
      `/recipes?q=${lightTrim(query)}&type=${type}`,
    );

    if (response.ok) return { ok: true, data: response.data };

    throw new Error(
      createAsyncErrorMessage(response.res, `Failed to fetch recipes`),
    );
  },
  {
    search: [],
    recommend: [],
  },
);

export const createRecipe = withSafeAsync(
  async (data: FormData): FetchResult<RecipeDetail> => {
    const response = await fetchAPI('/recipes', {
      method: 'POST',
      body: data,
    });

    if (response.ok) return { ok: true, data: response.data };

    if (response.res.status === 401) {
      alert('Please login again to use the service');
      return {
        ok: false,
        error: 'Please login again to use the service',
        res: response.res,
      };
    }

    throw new Error(
      createAsyncErrorMessage(response.res, 'Failed to save recipe'),
    );
  },
);
