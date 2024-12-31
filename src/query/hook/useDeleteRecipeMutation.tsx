'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useUserStore } from '@/providers/user-store-provider';

import { deleteRecipe } from '@/service/recipes';
import { handleApiAuthResponse } from '@/service/utils/handleApiAuthResponse';

import { QUERY_KEY__PROFILE, QUERY_KEY__RECIPE_LIST } from '@/query';

function useDeleteRecipeMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { resetUser, username } = useUserStore((state) => state);

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
