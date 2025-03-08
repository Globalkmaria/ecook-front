import { queryOptions } from '@tanstack/react-query';

import { getBookmarks } from '@/services/requests/bookmarks';

import {
  isUnauthorizedResponse,
  UNAUTHORIZED_ERROR,
} from '@/services/utils/authError';
import { queryKeys } from '@/queries/helpers';

interface Props {
  staleTime?: number;
  enabled?: boolean;
}

export const bookmarkListOptions = ({
  staleTime = STALE_TIME,
  enabled = false,
}: Props) =>
  queryOptions({
    queryKey: queryKeys.bookmarks.list(),
    queryFn: async () => {
      const result = await getBookmarks();
      if (result.ok) {
        const bookmarksSet = new Set(result.data);
        return bookmarksSet;
      }

      if (isUnauthorizedResponse(result.res))
        throw new Error(UNAUTHORIZED_ERROR);

      throw new Error('Failed to fetch bookmark list');
    },
    staleTime,
    enabled,
  });

const STALE_TIME = 60 * 60 * 1000; // 1 hour
