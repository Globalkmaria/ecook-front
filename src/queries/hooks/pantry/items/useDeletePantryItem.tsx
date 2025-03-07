import useLogout from '@/hooks/useLogout';
import { queryKeys } from '@/queries/helpers';
import { deletePantryItem } from '@/services/requests/pantry/pantryItems';
import { isUnauthorizedResponse } from '@/services/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeletePantryItem(pantryBoxKey: string) {
  const logout = useLogout();
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: async (pantryItemKey: string) => {
      const response = await deletePantryItem(pantryItemKey);

      if (response.ok) return;

      if (isUnauthorizedResponse(response.res)) logout();

      throw new Error('Failed to delete pantry item');
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.pantry.boxes.box.detail(pantryBoxKey),
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.pantry.boxes.list,
      });
    },
    onError: (error) => {
      console.error(error);
      alert('Failed to delete pantry item.');
    },
  });

  return result;
}
