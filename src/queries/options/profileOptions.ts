import { getProfile } from '@/services/users';
import { queryOptions } from '@tanstack/react-query';

import { generateUserProfileQueryKey } from '@/queries/helpers';

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
    queryKey: generateUserProfileQueryKey(username),
    queryFn: async () => {
      const result = await getProfile(username);

      if (!result.ok) throw new Error(result.error);

      return result.data;
    },
    enabled,
    staleTime,
  });
