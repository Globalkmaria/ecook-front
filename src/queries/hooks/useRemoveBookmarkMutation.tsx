import { useMutation, useQueryClient } from '@tanstack/react-query';

import { removeBookmark } from '@/services/bookmarks';

import {
  generateBookmarkListQueryKey,
  generateUserBookmarksQueryKey,
} from '@/queries/helpers';
import { isUnauthorizedResponse } from '@/services/utils/authError';
import useLogout from '@/hooks/useLogout';

export const useRemoveBookmarkMutation = () => {
  const queryClient = useQueryClient();
  const logout = useLogout();

  const result = useMutation({
    mutationFn: async (recipeKey: string) => {
      const response = await removeBookmark(recipeKey);

      if (response.ok) return;

      if (isUnauthorizedResponse(response.res)) logout();

      throw new Error('Failed to unbookmark recipe');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: generateBookmarkListQueryKey(),
      });
      queryClient.invalidateQueries({
        queryKey: generateUserBookmarksQueryKey(),
      });
    },
    onError: (error) => {
      console.error(error);
      alert('Failed to unbookmark recipe.');
    },
    retry: 3,
    retryDelay: 5000, // 5 seconds
  });

  return result;
};
