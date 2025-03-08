import { useCallback, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';

import { useAddPantryItemMutation } from '@/queries/hooks/pantry/items/useAddPantryItem';
import { useDeletePantryItem } from '@/queries/hooks/pantry/items/useDeletePantryItem';
import { useUpdatePantryItemMutation } from '@/queries/hooks/pantry/items/useUpdatePantryItem';
import { pantryBoxOptions } from '@/queries/options/pantry/pantryBoxOption';

import { getNewPantryBoxItemBaseProps } from '@/stores/slices/pantry/helper';

import { PANTRY_LINK } from '@/helpers/links';

import useLogout from '@/hooks/useLogout';

import Anchor from '@/components/Anchor';

import { isUnauthorizedError } from '@/services/utils';

import { PantryBoxPageParams } from '../../../page';
import PantryBoxContent, { PantryBoxContentProps } from '../PantryBoxContent';
import { PantryBoxItemsProps } from '../PantryBoxContent/PantryBoxItems';

function LoginUserPantryBox() {
  const logout = useLogout();
  const { pantryBoxKey } = useParams<PantryBoxPageParams>();

  const { data, isError, isLoading, error } = useQuery(
    pantryBoxOptions({ pantryBoxKey }),
  );

  useEffect(() => {
    if (isUnauthorizedError(error)) {
      logout();
    }
  }, [error]);

  if (!pantryBoxKey) return null;
  if (isLoading) return <div>Loading...</div>;
  if (data === null) return <NotFound />;
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

function NotFound() {
  return (
    <div>
      <p>Not found</p>
      <Anchor href={PANTRY_LINK}>Go back to pantry list</Anchor>
    </div>
  );
}
