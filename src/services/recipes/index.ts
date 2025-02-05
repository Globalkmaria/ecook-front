import { fetchAPI } from '@/services/api';

import { lightTrim } from '@/utils/normalize';

import { GetRecipesRes, HomeRecipe } from './type';
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

export const getHomeRecipes = withSafeAsync(async (): FetchResult<
  HomeRecipe[]
> => {
  const response = await fetchAPI('/recipes/home', {
    cache: 'force-cache',
  });

  if (response.ok) return { ok: true, data: response.data };

  throw new Error(
    createAsyncErrorMessage(response.res, `Failed to fetch home recipes`),
  );
}, []);

export const createRecipe = async (
  data: FormData,
): FetchResult<RecipeDetail> => {
  try {
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

    throw new Error(response.res.statusText);
  } catch (e) {
    console.error('Failed to save recipe', e);
    return { ok: false, error: 'Failed to save recipe' };
  }
};
