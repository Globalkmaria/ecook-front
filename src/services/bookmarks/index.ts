import { fetchAPI } from '../api';
import { FetchResult } from '../type';
import { createAsyncErrorMessage, withSafeAsync } from '../utils';
import { GetBookmarksRes } from './type';

export const getBookmarks = withSafeAsync(
  async (): FetchResult<GetBookmarksRes> => {
    const response = await fetchAPI('/bookmarks');

    if (response.res.status === 401)
      return { ok: false, error: 'Unauthorized', res: response.res };

    if (response.ok) return { ok: true, data: response.data };

    throw new Error(
      createAsyncErrorMessage(response.res, 'Failed to fetch bookmarks'),
    );
  },
);

export const addBookmark = withSafeAsync(
  async (recipeKey: string): FetchResult => {
    const response = await fetchAPI(`/bookmarks/${recipeKey}`, {
      method: 'POST',
    });

    if (response.res.status === 401)
      return { ok: false, error: 'Unauthorized', res: response.res };

    if (response.ok) return { ok: true };

    throw new Error(
      createAsyncErrorMessage(response.res, 'Failed to add bookmark'),
    );
  },
);

export const removeBookmark = withSafeAsync(
  async (recipeKey: string): FetchResult => {
    const response = await fetchAPI(`/bookmarks/${recipeKey}`, {
      method: 'DELETE',
    });

    if (response.res.status === 401)
      return { ok: false, error: 'Unauthorized', res: response.res };

    if (response.ok) return { ok: true };

    throw new Error(
      createAsyncErrorMessage(response.res, 'Failed to remove bookmark'),
    );
  },
);
