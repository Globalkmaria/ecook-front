import { fetchAPI } from '@/services/api';

import { lightTrim } from '@/utils/normalize';

import { GetRecipesRes, HomeRecipe } from './type';
import { RecipeDetail } from '../recipe/type';
import { FetchResult } from '../type';

export const getRecipes = async (
  query?: string,
  type?: string,
): FetchResult<GetRecipesRes> => {
  try {
    const response = await fetchAPI(
      `/recipes?q=${lightTrim(query ?? '')}&type=${type ?? ''}`,
    );

    if (response.ok) return { ok: true, data: response.data };

    throw new Error(response.res.statusText);
  } catch (e) {
    console.error('Failed to fetch recipes', e);
    return { ok: false, error: 'Failed to fetch recipes', data: [] };
  }
};

export const getHomeRecipes = async (): FetchResult<HomeRecipe[]> => {
  try {
    const response = await fetchAPI('/recipes/home', {
      cache: 'force-cache',
    });

    if (response.ok) return { ok: true, data: response.data };

    throw new Error(response.res.statusText);
  } catch (e) {
    console.error('Failed to fetch recipes', e);
    return { ok: false, error: 'Failed to fetch recipes', data: [] };
  }
};

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
