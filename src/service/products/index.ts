import { fetchAPI } from '@/utils/api';
import { FetchResult } from '../type';
import { Product } from './type';

type ProductQueryType = 'ingredientName';

export const getProducts = async (
  type: ProductQueryType,
  q: string,
): FetchResult<{
  ingredientId: string;
  products: Product[];
}> => {
  try {
    const response = await fetchAPI(`/products?type=${type}&q=${q}`);
    return { ok: true, data: response.data };
  } catch (e) {
    console.error('Failed to fetch recipes', e);
    return { ok: false, error: 'Failed to fetch recipes' };
  }
};
