import { queryOptions } from '@tanstack/react-query';

import { getBookmarks } from '@/services/requests/bookmarks';
import { generateBookmarkListQueryKey } from '../helpers';

import {
  isUnauthorizedResponse,
  UNAUTHORIZED_ERROR,
} from '@/services/utils/authError';

interface Props {
  staleTime?: number;
  enabled?: boolean;
}

export const bookmarkListOptions = ({
  staleTime = 180000, // 3 mins , MS
  enabled = false,
}: Props) =>
  queryOptions({
    queryKey: generateBookmarkListQueryKey(),
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
