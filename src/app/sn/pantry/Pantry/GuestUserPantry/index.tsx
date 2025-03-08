'use client';

import { useClientStore } from '@/providers/client-store-provider';
import { ingredientsWithProductsOptions } from '@/queries/options/ingredients/ingredientsWithProductsOptions';
import { useQuery } from '@tanstack/react-query';

import { getPantryBoxesViewData, mapPantryBoxesToReqData } from './helper';
import PantryBoxes from '../PantryBox';
import { useMemo } from 'react';
import { PantryState } from '@/stores/slices/pantry/pantrySlice';
import { GetIngredientsWithProductsReq } from '@/services/requests/ingredients/type';

function GuestUserPantry() {
  const pantryBoxes = useClientStore((state) => state.pantry.pantryBoxes);
  const requestIngredients = useMemo(
    () => mapPantryBoxesToReqData(pantryBoxes),
    [pantryBoxes],
  );

  return (
    <GuestUserPantryBoxes
      pantryBoxes={pantryBoxes}
      requestIngredients={requestIngredients}
    />
  );
}

function GuestUserPantryBoxes({
  pantryBoxes,
  requestIngredients,
}: {
  pantryBoxes: PantryState['pantry']['pantryBoxes'];
  requestIngredients: GetIngredientsWithProductsReq['items'];
}) {
  const {
    data: ingredientsInfo,
    isLoading,
    isError,
  } = useQuery(
    ingredientsWithProductsOptions({
      items: requestIngredients,
      enabled: !!Object.keys(requestIngredients).length,
    }),
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching ingredients</div>;
  if (!Object.keys(requestIngredients) || !ingredientsInfo)
    return <div>Add some ingredients to your pantry to see them here</div>;

  const data = getPantryBoxesViewData(ingredientsInfo, pantryBoxes);

  return <PantryBoxes items={data} />;
}

export default GuestUserPantry;
