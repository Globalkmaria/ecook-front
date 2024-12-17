'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editRecipe } from '@/service/recipes';
import { getUserInfo } from '@/helpers/auth';

const useEditRecipeMutation = (recipeKey: string, onCloseModal: () => void) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { username } = getUserInfo();

  const result = useMutation({
    mutationFn: async ({ data }: { data: FormData }) => {
      const response = await editRecipe(data, recipeKey);
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
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['recipeList', username] });
      queryClient.invalidateQueries({ queryKey: ['recipe', data?.key] });
      onCloseModal();
    },
    onError: () => alert('Failed to edit recipe'),
    retry: 3,
    retryDelay: 10000, // 10 seconds
  });

  return result;
};

export default useEditRecipeMutation;
