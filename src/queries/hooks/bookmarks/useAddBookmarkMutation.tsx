import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addBookmark } from '@/services/requests/bookmarks';
import { isUnauthorizedResponse } from '@/services/utils/authError';

import { queryKeys } from '@/queries/helpers';
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.bookmarks.list(),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.bookmarks.recipes.list(),
      });
    },
    onError: (error) => {
      console.error(error);
      alert('Failed to bookmark recipe.');
    },
  });

  return result;
}
