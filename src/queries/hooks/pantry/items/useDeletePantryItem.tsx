import { PANTRY_LINK } from '@/helpers/links';
import useLogout from '@/hooks/useLogout';
import { queryKeys } from '@/queries/helpers';
import { deletePantryItem } from '@/services/requests/pantry/pantryItems';
import { isUnauthorizedResponse } from '@/services/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useDeletePantryItem(pantryBoxKey: string) {
  const logout = useLogout();
  const queryClient = useQueryClient();
  const router = useRouter();

  const result = useMutation({
    mutationFn: async (pantryItemKey: string) => {
      const response = await deletePantryItem(pantryItemKey);
      if (response.ok) return response.data;

      if (isUnauthorizedResponse(response.res)) logout();

      throw new Error('Failed to delete pantry item');
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.pantry.boxes.box.detail(pantryBoxKey),
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.pantry.boxes.list(),
      });

      if (data.pantryBoxDeleted) {
        router.push(PANTRY_LINK);
      }
    },
    onError: (error) => {
      console.error(error);
      alert('Failed to delete pantry item.');
    },
  });

  return result;
}
