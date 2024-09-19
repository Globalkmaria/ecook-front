import { fetchAPI } from '@/utils/api';
import { FetchResult } from '../type';
import { Product } from './type';

export const getProducts = async (
  ingredientId: number,
): FetchResult<Product[]> => {
  try {
    const data = await fetchAPI(`/products/${ingredientId}`);
    return { ok: true, data };
  } catch (e) {
    console.error('Failed to fetch recipes', e);
    return { ok: false, error: 'Failed to fetch recipes', data: [] };
  }
};
