'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useShallow } from 'zustand/shallow';

import { useClientStore } from '@/providers/client-store-provider';

import { deleteRecipe } from '@/services/recipe';
import { handleApiAuthResponse } from '@/services/utils/handleApiAuthResponse';

import { QUERY_KEY__PROFILE, QUERY_KEY__RECIPE_LIST } from '@/queries';

function useDeleteRecipeMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [resetUser, username] = useClientStore(
    useShallow((state) => [state.resetUser, state.username]),
  );

  const result = useMutation({
    mutationFn: async (recipeKey: string) => {
      const response = await deleteRecipe(recipeKey);
      handleApiAuthResponse(response, router, resetUser);

      if (response.ok) return response.data;
      throw new Error('Failed to delete recipe');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY__RECIPE_LIST, username],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY__PROFILE, username],
      });
    },
    onError: () => alert('Failed to delete recipe'),
    retry: 3,
    retryDelay: 5000, // 5 seconds
  });

  return result;
}

export default useDeleteRecipeMutation;
