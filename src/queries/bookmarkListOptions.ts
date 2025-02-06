import { queryOptions } from '@tanstack/react-query';
import { generateBookmarkListQueryKey } from './helper';
import { getBookmarks } from '@/services/bookmarks';
import { UNAUTHORIZED_ERROR_CAUSE } from '@/services/utils/authError';

interface Props {
  staleTime?: number;
  enabled?: boolean;
}

const bookmarkListOptions = ({
  staleTime = 180000, // 3 mins , MS
  enabled = false,
}: Props) =>
  queryOptions({
    queryKey: generateBookmarkListQueryKey(),
    queryFn: async () => {
      const result = await getBookmarks();

      if (!result.ok && result.res?.status === 401)
        throw new Error('Failed to fetch bookmarks', {
          cause: UNAUTHORIZED_ERROR_CAUSE,
        });

      if (!result.ok) throw new Error('Failed to fetch bookmarks');

      const bookmarksSet = new Set(result.data);
      return bookmarksSet;
    },
    staleTime,
    enabled,
  });

export default bookmarkListOptions;
