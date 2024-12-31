'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useUserStore } from '@/providers/user-store-provider';

import { editRecipe } from '@/service/recipes';
import { handleApiAuthResponse } from '@/service/utils/handleApiAuthResponse';

import { QUERY_KEY__RECIPE, QUERY_KEY__RECIPE_LIST } from '@/query';

const useEditRecipeMutation = (recipeKey: string, onCloseModal: () => void) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { resetUser, username } = useUserStore((state) => state);

  const result = useMutation({
    mutationFn: async ({ data }: { data: FormData }) => {
      const response = await editRecipe(data, recipeKey);
      handleApiAuthResponse(response, router, resetUser);

      if (response.ok) return response.data;
      throw new Error('Failed to edit recipe');
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY__RECIPE_LIST, username],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY__RECIPE, data.key],
      });
      onCloseModal();
      router.push(`/recipes/${data.key}`);
    },
    onError: () => alert('Failed to edit recipe'),
    retry: 3,
    retryDelay: 10000, // 10 seconds
  });

  return result;
};

export default useEditRecipeMutation;
