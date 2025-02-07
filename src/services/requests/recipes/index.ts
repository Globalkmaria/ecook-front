import { fetchAPI } from '@/services/api';

import { lightTrim } from '@/utils/normalize';

import { GetRecipesRes } from './type';
import { FetchResult } from '../../type';
import { createAsyncErrorMessage, withSafeAsync } from '../../utils';
import { RecipeListSearchType } from './helper';
import { AsyncError } from '@/services/helpers';

export const getRecipes = withSafeAsync(
  async (
    query: string,
    type: RecipeListSearchType,
  ): FetchResult<GetRecipesRes> => {
    const response = await fetchAPI(
      `/recipes?q=${lightTrim(query)}&type=${type}`,
    );

    if (response.ok) return { ok: true, data: response.data };

    throw new AsyncError(
      createAsyncErrorMessage(response.res, `Failed to fetch recipes`),
      response.res,
    );
  },
  {
    search: [],
    recommend: [],
  },
);

export const createRecipe = withSafeAsync(
  async (
    data: FormData,
  ): FetchResult<{
    key: string;
  }> => {
    const response = await fetchAPI('/recipes', {
      method: 'POST',
      body: data,
    });

    if (response.ok) return { ok: true, data: response.data };

    throw new AsyncError(
      createAsyncErrorMessage(response.res, 'Failed to save recipe'),
      response.res,
    );
  },
);
