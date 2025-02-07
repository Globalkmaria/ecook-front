import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addBookmark } from '@/services/bookmarks';
import { isUnauthorizedResponse } from '@/services/utils/authError';

import {
  generateBookmarkListQueryKey,
  generateUserBookmarksQueryKey,
} from '@/queries/helpers';
import useLogout from '@/hooks/useLogout';

export function useAddBookmarkMutation() {
  const logout = useLogout();
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: async (recipeKey: string) => {
      const response = await addBookmark(recipeKey);

      if (response.ok) return;

      if (isUnauthorizedResponse(response.res)) logout();

      throw new Error('Failed to add bookmark');
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
      alert('Failed to bookmark recipe.');
    },
    retry: 3,
    retryDelay: 5000, // 5 seconds
  });

  return result;
}
