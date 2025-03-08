import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/queries/helpers';

import useLogout from '@/hooks/useLogout';

import { deletePantryBox } from '@/services/requests/pantry/pantryBoxes';
import { isUnauthorizedResponse } from '@/services/utils';

export function useDeletePantryBoxMutation() {
  const logout = useLogout();
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: async (pantryBoxKey: string) => {
      const response = await deletePantryBox(pantryBoxKey);

      if (response.ok) return;

      if (isUnauthorizedResponse(response.res)) logout();

      throw new Error('Failed to delete pantry box');
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.pantry.boxes.list(),
      });
    },
    onError: (error) => {
      console.error(error);
      alert('Failed to delete pantry box.');
    },
  });

  return result;
}
