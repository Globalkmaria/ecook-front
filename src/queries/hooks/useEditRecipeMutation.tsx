'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useShallow } from 'zustand/shallow';

import { revalidateRecipeDetailInformation } from '@/app/actions/revalidate';

import { useClientStore } from '@/providers/client-store-provider';

import { editRecipe } from '@/services/recipe';
import { handleApiAuthResponse } from '@/services/utils/handleApiAuthResponse';

import { QUERY_KEY__RECIPE, QUERY_KEY__RECIPE_LIST } from '@/queries';

const useEditRecipeMutation = (recipeKey: string, onCloseModal: () => void) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [resetUser, username] = useClientStore(
    useShallow((state) => [state.resetUser, state.username]),
  );

  const result = useMutation({
    mutationFn: async ({ data }: { data: FormData }) => {
      const response = await editRecipe(data, recipeKey);
      handleApiAuthResponse(response, router, resetUser);

      if (response.ok) return response.data;
      throw new Error('Failed to edit recipe');
    },
    onSuccess: async (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY__RECIPE_LIST, username],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY__RECIPE, data.key],
      });
      onCloseModal();
      await revalidateRecipeDetailInformation(data.key);
    },
    onError: () => alert('Failed to edit recipe'),
    retry: 3,
    retryDelay: 10000, // 10 seconds
  });

  return result;
};

export default useEditRecipeMutation;
