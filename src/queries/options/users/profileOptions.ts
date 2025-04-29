import { queryKeys } from '@/queries/helpers';

import { getProfile } from '@/services/requests/users';

interface ProfileOptions {
  username: string;
  enabled?: boolean;
  staleTime?: number;
}

export const profileOptions = ({
  username,
  enabled,
  staleTime,
}: ProfileOptions) => ({
  queryKey: queryKeys.users.user.profile(username),
  queryFn: async () => {
    const result = await getProfile(username);

    if (!result.ok) throw new Error('Failed to fetch user profile');

    return result.data;
  },
  enabled,
  staleTime,
});
