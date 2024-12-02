import { fetchAPI } from '@/utils/api';
import { User } from '../users/type';
import { FetchResult } from '../type';

interface LoginData {
  username: string;
  password: string;
}

export const me = async (): FetchResult<User> => {
  try {
    const response = await fetchAPI('/auth/me');

    if ('username' in response) return { ok: true, data: response };

    return { ok: false, error: 'Failed to fetch user' };
  } catch (e) {
    console.error('Failed to fetch user', e);
    return { ok: false, error: 'Failed to fetch user' };
  }
};

export const login = async (data: LoginData): FetchResult<User> => {
  try {
    const response = await fetchAPI('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return { ok: true, data: response };
  } catch (e) {
    console.error('Failed to login', e);
    return { ok: false, error: 'Failed to login' };
  }
};

export const signup = async (data: FormData): FetchResult<User> => {
  try {
    const response = await fetchAPI('/auth/signup', {
      method: 'POST',
      body: data,
    });

    return { ok: true, data: response };
  } catch (e) {
    console.error('Failed to register', e);
    return { ok: false, error: 'Failed to register' };
  }
};

export const logout = async (): Promise<void> => {
  try {
    await fetchAPI('/auth/logout', { method: 'POST' });
  } catch (e) {
    console.error('Failed to logout', e);
  }
};
