'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { getRecipePageTag } from '@/actions/helpers';
import { revalidateTagRecipeDetail } from '@/actions/revalidate';

import { mutationKeys, queryKeys } from '@/queries/helpers';

import { LOGIN_LINK } from '@/helpers/links';

import useLogout from '@/hooks/useLogout';

import { useClientStore } from '@/providers/client-store-provider';
import { editRecipe } from '@/services/requests/recipe';
import { isUnauthorizedResponse } from '@/services/utils/authError';

export const useEditRecipeMutation = (
  recipeKey: string,
  onCloseModal: () => void,
) => {
  const logout = useLogout();
  const queryClient = useQueryClient();
  const router = useRouter();
  const username = useClientStore((state) => state.user.username);

  const result = useMutation({
    mutationKey: mutationKeys.recipes.recipe.update(recipeKey),
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
        queryKey: queryKeys.recipes.list({
          type: 'username',
          query: username,
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
    retry: 1,
    retryDelay: 1000, // 1 seconds
  });

  return result;
};
