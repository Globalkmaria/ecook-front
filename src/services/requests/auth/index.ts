import { fetchAPI } from '@/services/api';
import { AsyncError } from '@/services/helpers';

import { DeleteAccountParams } from './type';
import { FetchResult } from '../../type';
import { createAsyncErrorMessage, withSafeAsync } from '../../utils';
import { User } from '../users/type';

interface LoginData {
  username: string;
  password: string;
}

export const login = withSafeAsync(
  async (data: LoginData): FetchResult<User> => {
    const response = await fetchAPI<User>('/auth/login', {
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

    throw new AsyncError(
      createAsyncErrorMessage(response.res, 'Failed to login.'),
      response.res,
    );
  },
);

export const signup = withSafeAsync(
  async (data: FormData): FetchResult<User> => {
    const response = await fetchAPI<User>('/auth/signup', {
      method: 'POST',
      body: data,
    });

    if (response.ok) return { ok: true, data: response.data };

    throw new AsyncError(
      createAsyncErrorMessage(response.res, 'Failed to register'),
      response.res,
    );
  },
);

export const logout = withSafeAsync(async (): FetchResult => {
  const response = await fetchAPI('/auth/logout', { method: 'POST' });
  if (response.ok) return { ok: true };

  throw new AsyncError(
    createAsyncErrorMessage(response.res, 'Failed to logout'),
    response.res,
  );
});

export const deleteAccount = withSafeAsync(
  async (props: DeleteAccountParams): FetchResult => {
    const response = await fetchAPI<{ message: string }>(
      '/auth/delete-account',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(props),
      },
    );

    if (response.ok)
      return {
        ok: true,
      };

    throw new AsyncError(
      createAsyncErrorMessage(response.res, 'Failed to delete account'),
      response.res,
    );
  },
);
