'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useClientStore } from '@/providers/client-store-provider';

import { isUnauthorizedResponse } from '@/services/utils/authError';
import { createRecipe } from '@/services/requests/recipes';

import { queryKeys } from '@/queries/helpers';

import useLogout from '@/hooks/useLogout';

import { getRecipeLink, LOGIN_LINK } from '@/helpers/links';

export const useCreateRecipe = () => {
  const logout = useLogout();
  const queryClient = useQueryClient();
  const router = useRouter();
  const username = useClientStore((state) => state.user.username);

  const result = useMutation({
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
    retry: 3,
    retryDelay: 5000, // 5 seconds
  });

  return result;
};
