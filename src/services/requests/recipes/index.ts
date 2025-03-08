import { lightTrim } from '@/utils/normalize';

import { fetchAPI } from '@/services/api';
import { AsyncError } from '@/services/helpers';

import { RecipesBatchType, RecipesSearchType } from './helper';
import { GetRecipesRes } from './type';
import { FetchResult } from '../../type';
import { createAsyncErrorMessage, withSafeAsync } from '../../utils';

export const getRecipes = withSafeAsync(
  async (
    query: string,
    type: RecipesSearchType,
  ): FetchResult<GetRecipesRes> => {
    const response = await fetchAPI<GetRecipesRes>(
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
    const response = await fetchAPI<GetRecipesRes>(`/recipes/batch`, {
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
    const response = await fetchAPI<{
      key: string;
    }>('/recipes', {
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
