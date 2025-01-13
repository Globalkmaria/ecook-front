import { fetchAPI } from '@/utils/api';
import { RecipeDetail } from './type';
import { FetchResult } from '../type';
import { RecipeSimple } from './type';

export const getRecipe = async (
  recipeKey: string,
  options?: RequestInit,
): FetchResult<RecipeDetail> => {
  try {
    const response = await fetchAPI(`/recipes/${recipeKey}`, { ...options });
    if (response.ok) return { ok: true, data: response.data };

    throw new Error(response.res.statusText);
  } catch (e) {
    console.error('Failed to fetch recipe', e);
    return { ok: false, error: 'Failed to fetch recipe' };
  }
};

export const deleteRecipe = async (recipeKey: string): FetchResult<null> => {
  try {
    const response = await fetchAPI(`/recipes/${recipeKey}`, {
      method: 'DELETE',
    });

    if (response.ok) return { ok: true, data: null };

    if (response.res.status === 401) {
      return {
        ok: false,
        error: 'Please login again to use the service',
        res: response.res,
      };
    }

    throw new Error(response.res.statusText);
  } catch (e) {
    console.error('Failed to delete recipe', e);
    return { ok: false, error: 'Failed to delete recipe' };
  }
};

export const editRecipe = async (
  data: FormData,
  recipeKey: string,
): FetchResult<{
  key: string;
}> => {
  try {
    const response = await fetchAPI(`/recipes/${recipeKey}`, {
      method: 'PUT',
      body: data,
    });

    if (response.ok) return { ok: true, data: response.data };

    if (response.res.status === 401) {
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

export const getRecipeRecommendations = async (
  recipeKey: string,
): FetchResult<RecipeSimple[]> => {
  try {
    const response = await fetchAPI(`/recipes/${recipeKey}/recommend`);

    if (response.ok) return { ok: true, data: response.data };

    throw new Error(response.res.statusText);
  } catch (e) {
    console.error('Failed to fetch recommendations', e);
    return { ok: false, error: 'Failed to fetch recommendations', data: [] };
  }
};
