'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { revalidateTagRecipeDetail } from '@/actions/revalidate';
import { getRecipePageTag } from '@/actions/helpers';

import { useClientStore } from '@/providers/client-store-provider';

import { isUnauthorizedResponse } from '@/services/utils/authError';
import { editRecipe } from '@/services/requests/recipe';

import { queryKeys } from '@/queries/helpers';

import useLogout from '@/hooks/useLogout';

import { LOGIN_LINK } from '@/helpers/links';

export const useEditRecipeMutation = (
  recipeKey: string,
  onCloseModal: () => void,
) => {
  const logout = useLogout();
  const queryClient = useQueryClient();
  const router = useRouter();
  const username = useClientStore((state) => state.user.username);

  const result = useMutation({
    mutationFn: async ({ data }: { data: FormData }) => {
      const response = await editRecipe(data, recipeKey);

      if (response.ok) return response.data;

      if (isUnauthorizedResponse(response.res)) {
        logout();
        throw new Error('Please log in to use this feature.');
      }

      throw new Error('Failed to edit recipe');
    },
    onSuccess: async (data) => {
      if (!username) {
        alert('Please login to edit recipe');
        router.replace(LOGIN_LINK);
        return;
      }

      queryClient.invalidateQueries({
        queryKey: queryKeys.products.list({
          query: 'username',
          type: username,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.list({
          type: 'username',
          query: username,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.recipes.recipe.detail(data.key),
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
