'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useShallow } from 'zustand/shallow';

import { useClientStore } from '@/providers/client-store-provider';

import { deleteRecipe } from '@/services/recipe';
import { handleApiAuthResponse } from '@/services/utils/handleApiAuthResponse';

import {
  generateRecipeListQueryKey,
  generateUserProfileQueryKey,
} from '@/queries';

import { LOGIN_LINK } from '@/helpers/links';

function useDeleteRecipeMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [resetUser, username] = useClientStore(
    useShallow((state) => [state.resetUser, state.user.username]),
  );

  const result = useMutation({
    mutationFn: async (recipeKey: string) => {
      const response = await deleteRecipe(recipeKey);
      handleApiAuthResponse(response, router, resetUser);

      if (response.ok) return response.data;
      throw new Error('Failed to delete recipe');
    },
    onSuccess: () => {
      if (!username) {
        router.replace(LOGIN_LINK);
        return;
      }

      queryClient.invalidateQueries({
        queryKey: generateRecipeListQueryKey({
          query: 'username',
          type: username,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: generateUserProfileQueryKey(username),
      });
    },
    onError: () => alert('Failed to delete recipe'),
    retry: 3,
    retryDelay: 5000, // 5 seconds
  });

  return result;
}

export default useDeleteRecipeMutation;
