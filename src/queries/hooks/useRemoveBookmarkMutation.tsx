import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/shallow';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { removeBookmark } from '@/services/bookmarks';
import { handleApiAuthResponse } from '@/services/utils/handleApiAuthResponse';

import { LOGIN_LINK } from '@/helpers/links';

import { useClientStore } from '@/providers/client-store-provider';

import { generateBookmarkListQueryKey } from '../helper';

function useRemoveBookmarkMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const resetUser = useClientStore(useShallow((state) => state.resetUser));

  const result = useMutation({
    mutationFn: async (recipeKey: string) => {
      const response = await removeBookmark(recipeKey);
      handleApiAuthResponse(response, router, resetUser);

      if (response.ok) return;

      if (!response.ok && response.res?.status === 401) {
        resetUser();
        router.replace(LOGIN_LINK);
      }

      throw new Error('Failed to unbookmark recipe');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: generateBookmarkListQueryKey(),
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
}

export default useRemoveBookmarkMutation;
