import { fetchAPI } from '@/services/api';

import {
  EditRecipeRes,
  GetRecipeRecommendationsRes,
  RecipeDetail,
} from './type';
import { FetchResult } from '../../type';
import { createAsyncErrorMessage, withSafeAsync } from '../../utils';
import { AsyncError } from '@/services/helpers';

export const getRecipe = withSafeAsync(
  async (
    recipeKey: string,
    options?: RequestInit,
  ): FetchResult<RecipeDetail> => {
    const response = await fetchAPI(`/recipes/${recipeKey}`, { ...options });
    if (response.ok) return { ok: true, data: response.data };

    throw new AsyncError(
      createAsyncErrorMessage(response.res, 'Failed to get recipe'),
      response.res,
    );
  },
);

export const deleteRecipe = withSafeAsync(
  async (recipeKey: string): FetchResult<null> => {
    const response = await fetchAPI(`/recipes/${recipeKey}`, {
      method: 'DELETE',
    });

    if (response.ok) return { ok: true, data: null };

    throw new AsyncError(
      createAsyncErrorMessage(response.res, 'Failed to delete recipe'),
      response.res,
    );
  },
);

export const editRecipe = withSafeAsync(
  async (data: FormData, recipeKey: string): FetchResult<EditRecipeRes> => {
    const response = await fetchAPI(`/recipes/${recipeKey}`, {
      method: 'PUT',
      body: data,
    });

    if (response.ok) return { ok: true, data: response.data };

    throw new AsyncError(
      createAsyncErrorMessage(response.res, 'Failed to edit recipe'),
      response.res,
    );
  },
);

export const getRecipeRecommendations = withSafeAsync(
  async (
    recipeKey: string,
    options?: RequestInit,
  ): FetchResult<GetRecipeRecommendationsRes> => {
    const response = await fetchAPI(`/recipes/${recipeKey}/recommend`, options);

    if (response.ok) return { ok: true, data: response.data };

    throw new AsyncError(
      createAsyncErrorMessage(response.res, 'Failed to fetch recommendations'),
      response.res,
    );
  },
);
