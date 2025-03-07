import useLogout from '@/hooks/useLogout';
import { queryKeys } from '@/queries/helpers';
import { addPantryBox } from '@/services/requests/pantry/pantryBoxes';
import { AddPantryBoxReq } from '@/services/requests/pantry/pantryBoxes/type';
import { isUnauthorizedResponse } from '@/services/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAddPantryBoxMutation() {
  const logout = useLogout();
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: async (data: AddPantryBoxReq) => {
      const response = await addPantryBox(data);

      if (response.ok) return;

      if (isUnauthorizedResponse(response.res)) logout();

      throw new Error('Failed to add pantry box');
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.pantry.boxes.list(),
      });
    },
    onError: (error) => {
      console.error(error);
      alert('Failed to add pantry box.');
    },
  });

  return result;
}
