'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useClientStore } from '@/providers/client-store-provider';

import { deleteRecipe } from '@/services/requests/recipe';
import { isUnauthorizedResponse } from '@/services/utils/authError';

import { mutationKeys, queryKeys } from '@/queries/helpers';

import useLogout from '@/hooks/useLogout';

import { LOGIN_LINK } from '@/helpers/links';

export const useDeleteRecipeMutation = (recipeKey: string) => {
  const logout = useLogout();
  const queryClient = useQueryClient();
  const router = useRouter();
  const username = useClientStore((state) => state.user.username);

  const result = useMutation({
    mutationKey: mutationKeys.recipes.recipe.delete(recipeKey),
    mutationFn: async () => {
      const response = await deleteRecipe(recipeKey);

      if (response.ok) return response.data;

      if (isUnauthorizedResponse(response.res)) {
        logout();
        throw new Error('Please log in to use this feature.');
      }

      throw new Error('Failed to delete recipe');
    },
    onSuccess: () => {
      if (!username) {
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
        queryKey: queryKeys.users.user.profile(username),
      });
    },
    onError: (error) => alert(error.message),
    retry: 1,
    retryDelay: 1000, // 1 seconds
  });

  return result;
};
