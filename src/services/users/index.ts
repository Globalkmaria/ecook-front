import { fetchAPI } from '@/services/api';
import { FetchResult } from '../type';
import { Profile, ResIsUsernameAvailable, UserBookmarkedRecipes } from './type';
import { createAsyncErrorMessage, withSafeAsync } from '../utils';

export const getProfile = withSafeAsync(
  async (username: string, options?: RequestInit): FetchResult<Profile> => {
    const response = await fetchAPI(`/users/${username}`, { ...options });
    if (response.ok) return { ok: true, data: response.data };

    throw new Error(
      createAsyncErrorMessage(response.res, 'Failed to get profile'),
    );
  },
);

export const checkUsernameAvailability = withSafeAsync(
  async (username: string): FetchResult<ResIsUsernameAvailable> => {
    const response = await fetchAPI(`/auth/validate-username/${username}`);

    if (response.ok) return { ok: true, data: response.data };

    throw new Error(
      createAsyncErrorMessage(
        response.res,
        'Failed to check username availability',
      ),
    );
  },
);

export const getUserBookmarkedRecipes = withSafeAsync(
  async (username: string): FetchResult<UserBookmarkedRecipes> => {
    if (!username) return { ok: false, error: 'Username is required' };

    const response = await fetchAPI(`/users/${username}/bookmarks`);
    if (response.ok) return { ok: true, data: response.data };

    if (response.res.status === 401) {
      return { ok: false, error: 'Unauthorized', res: response.res };
    }

    if (response.res.status === 403) {
      return { ok: false, error: 'Forbidden', res: response.res };
    }

    throw new Error(
      createAsyncErrorMessage(
        response.res,
        'Failed to fetch user bookmarked recipes',
      ),
    );
  },
);
