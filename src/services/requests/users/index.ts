import { fetchAPI } from '@/services/api';
import { FetchResult } from '../../type';
import {
  Profile,
  CheckUsernameAvailabilityRes,
  GetUserBookmarkedRecipesRes,
} from './type';
import { createAsyncErrorMessage, withSafeAsync } from '../../utils';
import { AsyncError } from '@/services/helpers';

export const getProfile = withSafeAsync(
  async (username: string, options?: RequestInit): FetchResult<Profile> => {
    const response = await fetchAPI(`/users/${username}`, { ...options });
    if (response.ok) return { ok: true, data: response.data };

    throw new AsyncError(
      createAsyncErrorMessage(response.res, 'Failed to get profile'),
      response.res,
    );
  },
);

export const checkUsernameAvailability = withSafeAsync(
  async (username: string): FetchResult<CheckUsernameAvailabilityRes> => {
    const response = await fetchAPI(`/auth/validate-username/${username}`);

    if (response.ok) return { ok: true, data: response.data };

    throw new AsyncError(
      createAsyncErrorMessage(
        response.res,
        'Failed to check username availability',
      ),
      response.res,
    );
  },
);

export const getUserBookmarkedRecipes = withSafeAsync(
  async (username: string): FetchResult<GetUserBookmarkedRecipesRes> => {
    if (!username) return { ok: false, error: 'Username is required' };

    const response = await fetchAPI(`/users/${username}/bookmarks`);
    if (response.ok) return { ok: true, data: response.data };

    throw new AsyncError(
      createAsyncErrorMessage(
        response.res,
        'Failed to fetch user bookmarked recipes',
      ),

      response.res,
    );
  },
);
