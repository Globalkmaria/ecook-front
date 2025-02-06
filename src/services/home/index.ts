import { fetchAPI } from '../api';
import { HomeRecipe } from './type';
import { FetchResult } from '../type';
import { createAsyncErrorMessage, withSafeAsync } from '../utils';

export const getHomeRecipes = withSafeAsync(async (): FetchResult<
  HomeRecipe[]
> => {
  const response = await fetchAPI('/home', {
    cache: 'force-cache',
  });

  if (response.ok) return { ok: true, data: response.data };

  throw new Error(
    createAsyncErrorMessage(response.res, `Failed to fetch home recipes`),
  );
}, []);
