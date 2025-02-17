import { useMutation, useQueryClient } from '@tanstack/react-query';

import useLogout from '@/hooks/useLogout';

import { useClientStore } from '@/providers/client-store-provider';

import { updateCartItemQuantity } from '@/services/requests/carts';
import { isForbiddenResponse, isUnauthorizedResponse } from '@/services/utils';

import { queryKeys } from '../helpers';

export const useUpdateCartItemQuantityMutation = () => {
  const logout = useLogout();
  const queryClient = useQueryClient();
  const username = useClientStore((state) => state.user.username);

  const result = useMutation({
    mutationFn: async (data: {
      ingredientKey: string;
      productKey?: string;
      quantity: number;
    }) => {
      if (!username) {
        logout();
        return;
      }

      const response = await updateCartItemQuantity({
        ingredientKey: data.ingredientKey,
        productKey: data.productKey,
        quantity: data.quantity,
        username,
      });

      if (response.ok) return response.data;

      if (
        isUnauthorizedResponse(response.res) ||
        isForbiddenResponse(response.res)
      ) {
        logout();
      }

      throw new Error('Failed to update cart item quantity');
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
