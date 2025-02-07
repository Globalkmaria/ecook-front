'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useShallow } from 'zustand/shallow';

import { revalidateTagRecipeDetail } from '@/actions/revalidate';
import { getRecipePageTag } from '@/actions/helpers';

import { useClientStore } from '@/providers/client-store-provider';

import { editRecipe } from '@/services/recipe';
import { handleApiAuthResponse } from '@/services/utils/handleApiAuthResponse';

import {
  generateProductListQueryKey,
  generateRecipeListQueryKey,
  generateRecipeQueryKey,
} from '@/queries/helpers';

import { LOGIN_LINK } from '@/helpers/links';

export const useEditRecipeMutation = (
  recipeKey: string,
  onCloseModal: () => void,
) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [resetUser, username] = useClientStore(
    useShallow((state) => [state.resetUser, state.user.username]),
  );

  const result = useMutation({
    mutationFn: async ({ data }: { data: FormData }) => {
      const response = await editRecipe(data, recipeKey);
      handleApiAuthResponse(response, router, resetUser);

      if (response.ok) return response.data;
      throw new Error('Failed to edit recipe');
    },
    onSuccess: async (data) => {
      if (!username) {
        alert('Please login to edit recipe');
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
        queryKey: generateProductListQueryKey({
          type: 'username',
          query: username,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: generateRecipeQueryKey(data.key),
      });

      await revalidateTagRecipeDetail(getRecipePageTag(data.key));
      onCloseModal();
    },
    onError: () => alert('Failed to edit recipe'),
    retry: 3,
    retryDelay: 10000, // 10 seconds
  });

  return result;
};
