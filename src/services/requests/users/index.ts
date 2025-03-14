import { fetchAPI } from '@/services/api';
import { AsyncError } from '@/services/helpers';

import {
  Profile,
  CheckUsernameAvailabilityRes,
  GetUserBookmarkedRecipesRes,
} from './type';
import { FetchResult } from '../../type';
import { createAsyncErrorMessage, withSafeAsync } from '../../utils';

export const getProfile = withSafeAsync(
  async (username: string, options?: RequestInit): FetchResult<Profile> => {
    const response = await fetchAPI<Profile>(`/users/${username}`, {
      ...options,
    });
    if (response.ok) return { ok: true, data: response.data };

    throw new AsyncError(
      createAsyncErrorMessage(response.res, 'Failed to get profile'),
      response.res,
    );
  },
);

export const checkUsernameAvailability = withSafeAsync(
  async (username: string): FetchResult<CheckUsernameAvailabilityRes> => {
    const response = await fetchAPI<CheckUsernameAvailabilityRes>(
      `/auth/validate-username/${username}`,
    );

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

    const response = await fetchAPI<GetUserBookmarkedRecipesRes>(
      `/users/${username}/bookmarks`,
    );
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
