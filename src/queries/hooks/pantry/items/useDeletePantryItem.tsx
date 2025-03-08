import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { queryKeys } from '@/queries/helpers';

import { PANTRY_LINK } from '@/helpers/links';

import useLogout from '@/hooks/useLogout';

import { PantryBoxContentProps } from '@/app/sn/pantry/[pantryBoxKey]/PantryBoxContainer/PantryBoxInfo/PantryBoxContent';

import { deletePantryItem } from '@/services/requests/pantry/pantryItems';
import { isUnauthorizedResponse } from '@/services/utils';

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
    onMutate: async (pantryItemKey: string) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.pantry.boxes.box.detail(pantryBoxKey),
      });

      const previousPantryBox = queryClient.getQueryData<
        PantryBoxContentProps['pantryBox']
      >(queryKeys.pantry.boxes.box.detail(pantryBoxKey));

      const newPantryBox = {
        ...previousPantryBox,
        items: previousPantryBox?.items.filter(
          (item) => item.key !== pantryItemKey,
        ),
      };

      if (newPantryBox?.items?.length === 0) {
        queryClient.setQueryData(
          queryKeys.pantry.boxes.box.detail(pantryBoxKey),
          null,
        );
        router.push(PANTRY_LINK);
        return { previousPantryBox };
      }

      queryClient.setQueryData(
        queryKeys.pantry.boxes.box.detail(pantryBoxKey),
        newPantryBox,
      );
      return { previousPantryBox };
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.pantry.boxes.list(),
      });
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(
        queryKeys.pantry.boxes.box.detail(pantryBoxKey),
        context?.previousPantryBox,
      );

      console.error(error);
      alert('Failed to delete pantry item.');
    },
    onSettled: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.pantry.boxes.box.detail(pantryBoxKey),
      });
    },
  });

  return result;
}
