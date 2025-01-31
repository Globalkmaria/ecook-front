import { fetchAPI } from '../api';
import { Product } from '../products/type';
import { RecommendRecipe } from '../recommend/type';
import { FetchResult } from '../type';

export const getProduct = async (
  productKey: string,
  options?: RequestInit,
): FetchResult<Product> => {
  try {
    const response = await fetchAPI(`/products/${productKey}`, {
      ...options,
    });

    if (response.ok) return { ok: true, data: response.data };

    throw new Error(response.res.statusText);
  } catch (e) {
    console.error('Failed to get product', e);
    return { ok: false, error: 'Failed to get product' };
  }
};

export const getProductRecommendations = async (
  productKey: string,
  options?: RequestInit,
): FetchResult<RecommendRecipe[]> => {
  try {
    const response = await fetchAPI(
      `/products/${productKey}/recommend`,
      options,
    );

    if (response.ok) return { ok: true, data: response.data };

    throw new Error(response.res.statusText);
  } catch (e) {
    console.error('Failed to fetch recommendations', e);
    return { ok: false, error: 'Failed to fetch recommendations', data: [] };
  }
};
