import { useParams } from 'next/navigation';
import { PantryBoxPageParams } from '../../../page';
import { useQuery } from '@tanstack/react-query';
import { pantryBoxOptions } from '@/queries/options/pantry/pantryBoxOption';
import PantryBoxContent from '../PantryBoxContent';
import { useCallback } from 'react';
import { useAddPantryItemMutation } from '@/queries/hooks/pantry/items/useAddPantryItem';
import { useDeletePantryItem } from '@/queries/hooks/pantry/items/useDeletePantryItem';
import { useUpdatePantryItemMutation } from '@/queries/hooks/pantry/items/useUpdatePantryItem';
import { PantryBoxItemsProps } from '../PantryBoxContent/PantryBoxItems';
import { getNewPantryBoxItemBaseProps } from '@/stores/slices/pantry/helper';

function LoginUserPantryBox() {
  const { pantryBoxKey } = useParams<PantryBoxPageParams>();
  const { data, isError, isLoading } = useQuery(
    pantryBoxOptions({ pantryBoxKey }),
  );
  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error</div>;

  const { mutate: addItem } = useAddPantryItemMutation();
  const { mutate: deleteItem } = useDeletePantryItem();
  const { mutate: updateItem } = useUpdatePantryItemMutation();

  const onAddItem: PantryBoxItemsProps['onAddItem'] = useCallback(() => {
    addItem({
      pantryBoxKey,
      ...getNewPantryBoxItemBaseProps(),
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

export default LoginUserPantryBox;
