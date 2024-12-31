'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useUserStore } from '@/providers/user-store-provider';

import { deleteRecipe } from '@/service/recipes';
import { handleApiAuthResponse } from '@/service/utils/handleApiAuthResponse';

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
      queryClient.invalidateQueries({ queryKey: ['recipeList', username] });
      queryClient.invalidateQueries({ queryKey: ['profile', username] });
    },
    onError: () => alert('Failed to delete recipe'),
    retry: 3,
    retryDelay: 5000, // 5 seconds
  });

  return result;
}

export default useDeleteRecipeMutation;
