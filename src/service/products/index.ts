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

    if (response.ok) return { ok: true, data: response.data };

    throw new Error(response.res.statusText);
  } catch (e) {
    console.error('Failed to get recipes', e);
    return { ok: false, error: 'Failed to get recipes' };
  }
};
