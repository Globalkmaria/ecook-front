import { fetchAPI } from '@/services/api';

import { lightTrim } from '@/utils/normalize';

import { AsyncError } from '@/services/helpers';

import { GetRecipesRes } from './type';
import { FetchResult } from '../../type';
import { createAsyncErrorMessage, withSafeAsync } from '../../utils';
import { RecipesBatchType, RecipesSearchType } from './helper';

export const getRecipes = withSafeAsync(
  async (
    query: string,
    type: RecipesSearchType,
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

export const getRecipesBatch = withSafeAsync(
  async ({
    query,
    type,
  }: {
    query: string[];
    type: RecipesBatchType;
  }): FetchResult<GetRecipesRes> => {
    const response = await fetchAPI(`/recipes/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        query,
      }),
    });

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
