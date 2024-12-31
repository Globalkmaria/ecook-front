import { fetchAPI } from '@/utils/api';
import { FetchResult } from '../type';
import { Profile, ResIsUsernameAvailable } from './type';

export const getProfile = async (
  username: string,
  options?: RequestInit,
): FetchResult<Profile> => {
  try {
    const response = await fetchAPI(`/users/${username}`, { ...options });
    if (response.ok) return { ok: true, data: response.data };

    throw new Error(response.res.statusText);
  } catch (e) {
    console.error('Failed to fetch profile', e);
    return { ok: false, error: 'Failed to fetch profile' };
  }
};

export const isUsernameAvailable = async (
  username: string,
): FetchResult<ResIsUsernameAvailable> => {
  try {
    const response = await fetchAPI(`/auth/validate-username/${username}`);

    if (response.ok) return { ok: true, data: response.data };

    throw new Error(response.res.statusText);
  } catch (e) {
    console.error('Failed to validate username', e);
    return { ok: false, error: 'Failed to validate username' };
  }
};
