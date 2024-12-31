import { getProfile } from '@/services/users';
import { queryOptions } from '@tanstack/react-query';

import { QUERY_KEY__PROFILE } from '@/queries';

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
    queryKey: [QUERY_KEY__PROFILE, username],
    queryFn: async () => {
      const result = await getProfile(username);

      if (!result.ok) throw new Error(result.error);

      return result.data;
    },
    enabled,
    staleTime,
  });
