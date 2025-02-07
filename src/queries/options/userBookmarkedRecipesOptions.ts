import { queryOptions } from '@tanstack/react-query';

import {
  FORBIDDEN_ERROR_CAUSE,
  UNAUTHORIZED_ERROR_CAUSE,
} from '@/services/utils/authError';

import { getUserBookmarkedRecipes } from '@/services/users';
import { generateUserBookmarksQueryKey } from '../helpers';

interface Props {
  staleTime?: number;
  username: string;
  enabled: boolean;
}

export const userBookmarkedRecipesOptions = ({
  staleTime = 60000, // 1 mins , MS
  username,
  enabled,
}: Props) =>
  queryOptions({
    queryKey: generateUserBookmarksQueryKey(),
    queryFn: async () => {
      const result = await getUserBookmarkedRecipes(username);

      if (result.ok) return result.data;

      if (!result.ok && result.res?.status === 401)
        throw new Error('Failed to fetch bookmarks', {
          cause: UNAUTHORIZED_ERROR_CAUSE,
        });

      if (!result.ok && result.res?.status === 403)
        throw new Error('Failed to fetch bookmarks', {
          cause: FORBIDDEN_ERROR_CAUSE,
        });

      throw new Error('Failed to fetch bookmarks');
    },
    staleTime,
    enabled,
  });
