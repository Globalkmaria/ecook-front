import { fetchAPI } from '@/utils/api';
import { RecipeDetail, RecipeSimple } from './type';
import { FetchResult } from '../type';

export const getRecipes = async (
  query?: string,
  type?: string,
): FetchResult<RecipeSimple[]> => {
  try {
    const response = await fetchAPI(
      `/recipes?q=${query ?? ''}&type=${type ?? ''}`,
    );

    if (response.ok) return { ok: true, data: response.data };

    throw new Error(response.res.statusText);
  } catch (e) {
    console.error('Failed to fetch recipes', e);
    return { ok: false, error: 'Failed to fetch recipes', data: [] };
  }
};

export const getHomeRecipes = async (): FetchResult<RecipeSimple[]> => {
  try {
    const response = await fetchAPI('/recipes/home');

    if (response.ok) return { ok: true, data: response.data };

    throw new Error(response.res.statusText);
  } catch (e) {
    console.error('Failed to fetch recipes', e);
    return { ok: false, error: 'Failed to fetch recipes', data: [] };
  }
};

export const getRecipe = async (
  recipeKey: string,
): FetchResult<RecipeDetail> => {
  try {
    const response = await fetchAPI(`/recipes/${recipeKey}`);
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

export const saveRecipe = async (data: FormData): FetchResult<RecipeDetail> => {
  try {
    const response = await fetchAPI('/recipes', {
      method: 'POST',
      body: data,
    });

    if (response.ok) return { ok: true, data: response.data };

    if (response.res.status === 401) {
      alert('Please login again to use the service');
      return { ok: false, error: 'Please login again to use the service' };
    }

    throw new Error(response.res.statusText);
  } catch (e) {
    console.error('Failed to save recipe', e);
    return { ok: false, error: 'Failed to save recipe' };
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
