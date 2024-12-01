import { fetchAPI } from '@/utils/api';
import { RecipeDetail, RecipeSimple } from './type';
import { FetchResult } from '../type';

export const getRecipes = async (
  query?: string,
  type?: string,
): FetchResult<RecipeSimple[]> => {
  try {
    const data = await fetchAPI(`/recipes?q=${query ?? ''}&type=${type ?? ''}`);

    return { ok: true, data };
  } catch (e) {
    console.error('Failed to fetch recipes', e);
    return { ok: false, error: 'Failed to fetch recipes', data: [] };
  }
};

export const getRecipe = async (
  recipeKey: string,
): FetchResult<RecipeDetail> => {
  try {
    const data = await fetchAPI(`/recipes/${recipeKey}`);
    return { ok: true, data };
  } catch (e) {
    console.error('Failed to fetch recipe', e);
    return { ok: false, error: 'Failed to fetch recipe' };
  }
};

export const deleteRecipe = async (recipeKey: string): FetchResult<null> => {
  try {
    await fetchAPI(`/recipes/${recipeKey}`, {
      method: 'DELETE',
    });
    return { ok: true, data: null };
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

    return { ok: true, data: response };
  } catch (e) {
    console.error('Failed to save recipe', e);
    return { ok: false, error: 'Failed to save recipe' };
  }
};

export const editRecipe = async (
  data: FormData,
  recipeKey: string,
): FetchResult<RecipeDetail> => {
  try {
    const response = await fetchAPI(`/recipes/${recipeKey}`, {
      method: 'PUT',
      body: data,
    });

    return { ok: true, data: response };
  } catch (e) {
    console.error('Failed to save recipe', e);
    return { ok: false, error: 'Failed to save recipe' };
  }
};
