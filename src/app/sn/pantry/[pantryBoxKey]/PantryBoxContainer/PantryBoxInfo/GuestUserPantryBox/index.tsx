import { useCallback, useEffect, useMemo } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useShallow } from 'zustand/shallow';

import { ingredientsWithProductsOptions } from '@/queries/options/ingredients/ingredientsWithProductsOptions';

import {
  PantryBoxItemState,
  PantryState,
} from '@/stores/slices/pantry/pantrySlice';

import { PANTRY_LINK } from '@/helpers/links';

import { PantryBoxPageParams } from '@/app/sn/pantry/[pantryBoxKey]/page';
import PantryBoxContent from '@/app/sn/pantry/[pantryBoxKey]/PantryBoxContainer/PantryBoxInfo/PantryBoxContent';
import { mapPantryBoxesToReqData } from '@/app/sn/pantry/Pantry/GuestUserPantry/helper';

import { useClientStore } from '@/providers/client-store-provider';
import { GetIngredientsWithProductsReq } from '@/services/requests/ingredients/type';

import { mapPantryBoxToViewData } from './helper';

function GuestUserPantryBox() {
  const router = useRouter();
  const { pantryBoxKey = '' } = useParams<PantryBoxPageParams>();
  const pantryBoxes = useClientStore((state) => state.pantry.pantryBoxes);

  const pantryBox = pantryBoxes[pantryBoxKey] || null;

  const requestIngredients = useMemo(
    () => mapPantryBoxesToReqData(pantryBoxes),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pantryBoxKey],
  );

  useEffect(() => {
    if (!pantryBox) router.push(PANTRY_LINK);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pantryBox]);

  if (!pantryBoxKey || !pantryBox) return null;

  return (
    <GuestUserPantryBoxContent
      pantryBox={pantryBox}
      requestIngredients={requestIngredients}
      pantryBoxKey={pantryBoxKey}
    />
  );
}

export default GuestUserPantryBox;

interface onItemChange<T extends keyof PantryBoxItemState> {
  pantryBoxItemKey: string;
  fieldName: T;
  fieldValue: PantryBoxItemState[T];
}

interface GuestUserPantryBoxContentProps {
  pantryBox: PantryState['pantry']['pantryBoxes'][string];
  requestIngredients: GetIngredientsWithProductsReq['items'];
  pantryBoxKey: string;
}

function GuestUserPantryBoxContent({
  pantryBox,
  requestIngredients,
  pantryBoxKey,
}: GuestUserPantryBoxContentProps) {
  const [addPantryBoxItem, updatePantryBoxItem, deletePantryBoxItem] =
    useClientStore(
      useShallow((state) => [
        state.addPantryBoxItem,
        state.updatePantryBoxItem,
        state.deletePantryBoxItem,
      ]),
    );
  const {
    data: ingredientsInfo,
    isLoading,
    isError,
  } = useSuspenseQuery(
    ingredientsWithProductsOptions({
      items: requestIngredients,
      enabled: !!Object.keys(requestIngredients).length,
    }),
  );

  const onAddItem = useCallback(() => {
    addPantryBoxItem({
      ingredientKey: pantryBox.ingredientKey,
      productKey: pantryBox.productKey,
      quantity: 1,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pantryBoxKey]);

  const onDelete = useCallback(
    (itemKey: string) => {
      deletePantryBoxItem({
        pantryBoxKey,
        pantryBoxItemKey: itemKey,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pantryBoxKey],
  );

  const onChange = useCallback(
    <T extends keyof PantryBoxItemState>({
      pantryBoxItemKey,
      fieldName,
      fieldValue,
    }: onItemChange<T>) => {
      if (fieldName === 'quantity' && Number(fieldValue) < 1) {
        onDelete(pantryBoxItemKey);
        return;
      }

      updatePantryBoxItem({
        pantryBoxKey,
        pantryBoxItemKey: pantryBoxItemKey,
        pantryBoxItemField: fieldName,
        pantryBoxItemValue: fieldValue,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pantryBoxKey],
  );

  if (isLoading) return <div>Loading...</div>;
  if (!ingredientsInfo || isError) return <div>Error</div>;
  if (!pantryBox.items.length) return null;

  const data = mapPantryBoxToViewData(pantryBox, ingredientsInfo);

  return (
    <PantryBoxContent
      pantryBox={data}
      onAddItem={onAddItem}
      onDelete={onDelete}
      onChange={onChange}
    />
  );
}
