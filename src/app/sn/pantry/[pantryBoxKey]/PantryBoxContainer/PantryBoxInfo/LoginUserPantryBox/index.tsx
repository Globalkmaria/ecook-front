import { useParams } from 'next/navigation';
import { PantryBoxPageParams } from '../../../page';
import { useQuery } from '@tanstack/react-query';
import { pantryBoxOptions } from '@/queries/options/pantry/pantryBoxOption';
import PantryBoxContent, { PantryBoxContentProps } from '../PantryBoxContent';
import { useCallback, useEffect } from 'react';
import { useAddPantryItemMutation } from '@/queries/hooks/pantry/items/useAddPantryItem';
import { useDeletePantryItem } from '@/queries/hooks/pantry/items/useDeletePantryItem';
import { useUpdatePantryItemMutation } from '@/queries/hooks/pantry/items/useUpdatePantryItem';
import { PantryBoxItemsProps } from '../PantryBoxContent/PantryBoxItems';
import { getNewPantryBoxItemBaseProps } from '@/stores/slices/pantry/helper';
import { isUnauthorizedError } from '@/services/utils';
import useLogout from '@/hooks/useLogout';

function LoginUserPantryBox() {
  const logout = useLogout();
  const { pantryBoxKey } = useParams<PantryBoxPageParams>();
  if (!pantryBoxKey) return null;

  const { data, isError, isLoading, error } = useQuery(
    pantryBoxOptions({ pantryBoxKey }),
  );

  useEffect(() => {
    if (isUnauthorizedError(error)) {
      logout();
    }
  }, [error]);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error</div>;

  return <LoginUserPantryBoxContent pantryBoxKey={pantryBoxKey} data={data} />;
}

export default LoginUserPantryBox;

interface LoginUserPantryBoxContentProps {
  pantryBoxKey: string;
  data: PantryBoxContentProps['pantryBox'];
}

function LoginUserPantryBoxContent({
  pantryBoxKey,
  data,
}: LoginUserPantryBoxContentProps) {
  const { mutate: addItem } = useAddPantryItemMutation();
  const { mutate: deleteItem } = useDeletePantryItem(pantryBoxKey);
  const { mutate: updateItem } = useUpdatePantryItemMutation(pantryBoxKey);

  const onAddItem: PantryBoxItemsProps['onAddItem'] = useCallback(() => {
    addItem({
      data: {
        pantryBoxKey,
        ...getNewPantryBoxItemBaseProps(),
      },
      pantryBoxKey,
    });
  }, [pantryBoxKey]);

  const onChange: PantryBoxItemsProps['onChange'] = useCallback(
    ({ pantryBoxItemKey, fieldName, fieldValue }) => {
      if (fieldName === 'quantity' && Number(fieldValue) < 1) {
        deleteItem(pantryBoxItemKey);
        return;
      }

      updateItem({
        pantryItemKey: pantryBoxItemKey,
        data: {
          name: fieldName,
          value: fieldValue,
        },
      });
    },
    [pantryBoxKey],
  );
  return (
    <PantryBoxContent
      pantryBox={data}
      onAddItem={onAddItem}
      onDelete={deleteItem}
      onChange={onChange}
    />
  );
}
