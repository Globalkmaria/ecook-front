'use client';

import { useClientStore } from '@/providers/client-store-provider';
import { ingredientsWithProductsOptions } from '@/queries/options/ingredients/ingredientsWithProductsOptions';
import { useQuery } from '@tanstack/react-query';

import { getPantryBoxesViewData, mapPantryBoxesToReqData } from './helper';
import PantryBoxes from '../PantryBox';

function GuestUserPantry() {
  const ingredientsQuantities = useClientStore(
    (state) => state.pantry.pantryBoxes,
  );
  const requestIngredients = mapPantryBoxesToReqData(ingredientsQuantities);

  const {
    data: ingredientsInfo,
    isLoading,
    isError,
  } = useQuery(
    ingredientsWithProductsOptions({
      items: requestIngredients,
      enabled: !!Object.keys(ingredientsQuantities).length,
    }),
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching ingredients</div>;
  if (!Object.keys(ingredientsQuantities) || ingredientsInfo === undefined)
    return <div>Add some ingredients to your pantry to see them here</div>;

  const data = getPantryBoxesViewData(ingredientsInfo, ingredientsQuantities);

  return <PantryBoxes items={data} />;
}

export default GuestUserPantry;
