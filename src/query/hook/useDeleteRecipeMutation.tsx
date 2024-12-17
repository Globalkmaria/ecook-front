'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteRecipe } from '@/service/recipes';
import { handleApiAuthResponse } from '@/service/utils/handleApiAuthResponse';

import { getUserInfo } from '@/helpers/auth';

function useDeleteRecipeMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { username } = getUserInfo();

  const result = useMutation({
    mutationFn: async (recipeKey: string) => {
      const response = await deleteRecipe(recipeKey);
      handleApiAuthResponse(response, router);

      if (response.ok) return response.data;
      throw new Error('Failed to delete recipe');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipeList', username] });
    },
    onError: () => alert('Failed to delete recipe'),
    retry: 3,
    retryDelay: 10000, // 10 seconds
  });

  return result;
}

export default useDeleteRecipeMutation;
