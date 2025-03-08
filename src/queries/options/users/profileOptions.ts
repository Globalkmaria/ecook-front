import { queryOptions } from '@tanstack/react-query';

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
}: ProfileOptions) =>
  queryOptions({
    queryKey: queryKeys.users.user.profile(username),
    queryFn: async () => {
      const result = await getProfile(username);

      if (!result.ok) throw new Error(result.error);

      return result.data;
    },
    enabled,
    staleTime,
  });
