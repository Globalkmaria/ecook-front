import { fetchAPI } from '@/services/api';
import { FetchResult } from '../type';
import { Product } from './type';

export const PRODUCT_TYPES = {
  INGREDIENT: 'ingredient',
  USERNAME: 'username',
} as const;

export type ProductQueryType =
  (typeof PRODUCT_TYPES)[keyof typeof PRODUCT_TYPES];

export const getProducts = async ({
  type,
  q,
  options,
}: {
  type: ProductQueryType;
  q: string;
  options?: RequestInit;
}): FetchResult<{
  ingredientId: string | null;
  products: Product[];
}> => {
  try {
    const response = await fetchAPI(`/products?type=${type}&q=${q}`, {
      ...options,
    });

    if (response.ok) return { ok: true, data: response.data };

    throw new Error(response.res.statusText);
  } catch (e) {
    console.error('Failed to get products', e);
    return { ok: false, error: 'Failed to get products' };
  }
};
