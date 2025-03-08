import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/queries/helpers';

import useLogout from '@/hooks/useLogout';

import { removeBookmark } from '@/services/requests/bookmarks';
import { isUnauthorizedResponse } from '@/services/utils/authError';

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
        queryKey: queryKeys.bookmarks.list(),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.bookmarks.recipes.list(),
      });
    },
    onError: (error) => {
      console.error(error);
      alert('Failed to unbookmark recipe.');
    },
    retry: 1,
    retryDelay: 1000, // 1 seconds
  });

  return result;
};
