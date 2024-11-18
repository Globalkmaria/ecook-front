import { fetchAPI } from '@/utils/api';
import { RecipeDetail, RecipeSimple } from './type';
import { FetchResult } from '../type';

export const getRecipes = async (): FetchResult<RecipeSimple[]> => {
  try {
    const data = await fetchAPI('/recipes');

    return { ok: true, data };
  } catch (e) {
    console.error('Failed to fetch recipes', e);
    return { ok: false, error: 'Failed to fetch recipes', data: [] };
  }
};

export const getRecipe = async (id: string): FetchResult<RecipeDetail> => {
  try {
    const data = await fetchAPI(`/recipes/${id}`);
    return { ok: true, data };
  } catch (e) {
    console.error('Failed to fetch recipe', e);
    return { ok: false, error: 'Failed to fetch recipe' };
  }
};

export const deleteRecipe = async (id: string): FetchResult<null> => {
  try {
    await fetchAPI(`/recipes/${id}`, { method: 'DELETE' });
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
