'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { mutationKeys, queryKeys } from '@/queries/helpers';

import { getRecipeLink, LOGIN_LINK } from '@/helpers/links';

import useLogout from '@/hooks/useLogout';

import { useClientStore } from '@/providers/client-store-provider';
import { createRecipe } from '@/services/requests/recipes';
import { isUnauthorizedResponse } from '@/services/utils/authError';

export const useCreateRecipe = () => {
  const logout = useLogout();
  const queryClient = useQueryClient();
  const router = useRouter();
  const username = useClientStore((state) => state.user.username);

  const result = useMutation({
    mutationKey: mutationKeys.recipes.create(),
    mutationFn: async (data: FormData) => {
      const response = await createRecipe(data);
      if (response.ok) return response.data;

      if (isUnauthorizedResponse(response.res)) {
        logout();
        throw new Error('Please login again to use this service');
      }

      throw new Error('Failed to submit recipe');
    },
    onSuccess: (data) => {
      if (!username) {
        alert('Please login to edit recipe');
        router.replace(LOGIN_LINK);
        return;
      }

      queryClient.invalidateQueries({
        queryKey: queryKeys.recipes.list({
          query: username,
          type: 'username',
        }),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.user.profile(username),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.list({
          type: 'username',
          query: username,
        }),
      });

      router.replace(getRecipeLink(data.key));
    },
    onError: (error) => alert(error.message),
  });

  return result;
};
