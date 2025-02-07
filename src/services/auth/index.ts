import { fetchAPI } from '@/services/api';

import { User } from '../users/type';
import { FetchResult } from '../type';
import { createAsyncErrorMessage, withSafeAsync } from '../utils';

interface LoginData {
  username: string;
  password: string;
}

export const login = withSafeAsync(
  async (data: LoginData): FetchResult<User> => {
    const response = await fetchAPI('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) return { ok: true, data: response.data };

    if (response.res.status === 401) {
      return {
        ok: false,
        error: 'Please check your email and password and try again.',
      };
    }

    throw new Error(createAsyncErrorMessage(response.res, 'Failed to login'));
  },
);

export const signup = withSafeAsync(
  async (data: FormData): FetchResult<User> => {
    const response = await fetchAPI('/auth/signup', {
      method: 'POST',
      body: data,
    });

    if (response.ok) return { ok: true, data: response.data };

    throw new Error(
      createAsyncErrorMessage(response.res, 'Failed to register'),
    );
  },
);

export const logout = withSafeAsync(async (): FetchResult => {
  const response = await fetchAPI('/auth/logout', { method: 'POST' });
  if (response.ok) return { ok: true };

  throw new Error(createAsyncErrorMessage(response.res, 'Failed to logout'));
});
