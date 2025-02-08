import { queryOptions } from '@tanstack/react-query';

import { getUserBookmarkedRecipes } from '@/services/requests/users';
import { queryKeys } from '../../helpers';
import {
  FORBIDDEN_ERROR,
  isForbiddenResponse,
  isUnauthorizedResponse,
  UNAUTHORIZED_ERROR,
} from '@/services/utils/authError';

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
    queryKey: queryKeys.bookmarks.recipes.list(),
    queryFn: async () => {
      const result = await getUserBookmarkedRecipes(username);

      if (result.ok) return result.data;

      if (isUnauthorizedResponse(result.res))
        throw new Error(UNAUTHORIZED_ERROR);

      if (isForbiddenResponse(result.res)) throw new Error(FORBIDDEN_ERROR);

      throw new Error('Failed to fetch bookmarks');
    },
    staleTime,
    enabled,
  });
