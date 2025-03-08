import { AsyncError } from '@/services/helpers';

import { GetBookmarksRes } from './type';
import { fetchAPI } from '../../api';
import { FetchResult } from '../../type';
import { createAsyncErrorMessage, withSafeAsync } from '../../utils';

export const getBookmarks = withSafeAsync(
  async (): FetchResult<GetBookmarksRes> => {
    const response = await fetchAPI<GetBookmarksRes>('/bookmarks');

    if (response.ok) return { ok: true, data: response.data };

    throw new AsyncError(
      createAsyncErrorMessage(response.res, 'Failed to fetch bookmarks'),
      response.res,
    );
  },
);

export const addBookmark = withSafeAsync(
  async (recipeKey: string): FetchResult => {
    const response = await fetchAPI(`/bookmarks/${recipeKey}`, {
      method: 'POST',
    });

    if (response.ok) return { ok: true };

    throw new AsyncError(
      createAsyncErrorMessage(response.res, 'Failed to add bookmark'),
      response.res,
    );
  },
);

export const removeBookmark = withSafeAsync(
  async (recipeKey: string): FetchResult => {
    const response = await fetchAPI(`/bookmarks/${recipeKey}`, {
      method: 'DELETE',
    });

    if (response.ok) return { ok: true };

    throw new AsyncError(
      createAsyncErrorMessage(response.res, 'Failed to remove bookmark'),
      response.res,
    );
  },
);
