import { useMutation, useQueryClient } from '@tanstack/react-query';

import useLogout from '@/hooks/useLogout';

import { useClientStore } from '@/providers/client-store-provider';

import { isForbiddenResponse, isUnauthorizedResponse } from '@/services/utils';
import { createCartItem } from '@/services/requests/carts';
import { queryKeys } from '@/queries/helpers';

export const useCreateCartItemMutation = () => {
  const logout = useLogout();
  const queryClient = useQueryClient();
  const username = useClientStore((state) => state.user.username);

  const result = useMutation({
    mutationFn: async (data: {
      ingredientKey: string;
      productKey?: string;
    }) => {
      if (!username) {
        logout();
        return;
      }

      const response = await createCartItem({
        ingredientKey: data.ingredientKey,
        productKey: data.productKey,
        username,
      });

      if (response.ok) return response.data;

      if (
        isUnauthorizedResponse(response.res) ||
        isForbiddenResponse(response.res)
      ) {
        logout();
      }

      throw new Error('Failed to create cart item');
    },
    onSuccess: () => {
      if (!username) {
        return;
      }

      queryClient.invalidateQueries({
        queryKey: queryKeys.carts.user.list(username),
      });
    },
    onError: (error) => alert(error.message),
  });

  return result;
};
