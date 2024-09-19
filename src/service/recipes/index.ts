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
