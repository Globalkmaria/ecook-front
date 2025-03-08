import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/queries/helpers';

import useLogout from '@/hooks/useLogout';

import { updatePantryItem } from '@/services/requests/pantry/pantryItems';
import { UpdatePantryItemReq } from '@/services/requests/pantry/pantryItems/type';
import { isUnauthorizedResponse } from '@/services/utils';

export function useUpdatePantryItemMutation(pantryBoxKey: string) {
  const logout = useLogout();
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: async ({
      pantryItemKey,
      data,
    }: {
      pantryItemKey: string;
      data: UpdatePantryItemReq;
    }) => {
      const response = await updatePantryItem(pantryItemKey, data);
      if (response.ok) return;

      if (isUnauthorizedResponse(response.res)) logout();

      throw new Error('Failed to update pantry item');
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.pantry.boxes.box.detail(pantryBoxKey),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.pantry.boxes.list(),
      });
    },
    onError: (error) => {
      console.error(error);
      alert('Failed to update pantry item.');
    },
  });
  return result;
}
