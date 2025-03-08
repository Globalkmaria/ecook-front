import useLogout from '@/hooks/useLogout';
import { queryKeys } from '@/queries/helpers';
import { addPantryItem } from '@/services/requests/pantry/pantryBoxes';
import { AddPantryItemReq } from '@/services/requests/pantry/pantryBoxes/type';
import { isUnauthorizedResponse } from '@/services/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAddPantryItemMutation() {
  const logout = useLogout();
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: async ({
      data,
      pantryBoxKey,
    }: {
      data: AddPantryItemReq;
      pantryBoxKey: string;
    }) => {
      const response = await addPantryItem(data, pantryBoxKey);

      if (response.ok) return data;

      if (isUnauthorizedResponse(response.res)) logout();

      throw new Error('Failed to add pantry item');
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.pantry.boxes.box.detail(data.pantryBoxKey),
      });
    },
    onError: (error) => {
      console.error(error);
      alert('Failed to add pantry item.');
    },
  });

  return result;
}
