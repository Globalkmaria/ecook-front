'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteRecipe } from '@/service/recipes';
import { getUserInfo } from '@/helpers/auth';

function useDeleteRecipeMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { username } = getUserInfo();

  const result = useMutation({
    mutationFn: async (recipeKey: string) => {
      const response = await deleteRecipe(recipeKey);
      if (!response.ok) {
        if (response.res?.status === 401) {
          sessionStorage.clear();
          router.push('/login');
          return null;
        }
        throw new Error(response.error);
      }
      return response.data;
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
