import { fetchAPI } from '@/utils/api';
import { FetchResult } from '../type';
import { Profile, ResIsUsernameAvailable } from './type';

export const getProfile = async (username: string): FetchResult<Profile> => {
  try {
    const data = await fetchAPI(`/users/${username}`);
    return { ok: true, data };
  } catch (e) {
    console.error('Failed to fetch profile', e);
    return { ok: false, error: 'Failed to fetch profile' };
  }
};

export const isUsernameAvailable = async (
  username: string,
): FetchResult<ResIsUsernameAvailable> => {
  try {
    const data = await fetchAPI(`/auth/validate-username/${username}`);

    return { ok: true, data };
  } catch (e) {
    console.error('Failed to validate username', e);
    return { ok: false, error: 'Failed to validate username' };
  }
};
