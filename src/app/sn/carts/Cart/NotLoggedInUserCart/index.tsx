'use client';

import { useQuery } from '@tanstack/react-query';

import { transformIngredientsForServer } from '@/queries/options/ingredients/helper';
import { ingredientsWithProductsOptions } from '@/queries/options/ingredients/ingredientsWithProductsOptions';

import { useClientStore } from '@/providers/client-store-provider';

import NotLoggedInUserCartItem from './NotLoggedInUserCartItem';

function NotLoggedInUserCart() {
  const ingredientsQuantities = useClientStore(
    (state) => state.carts.ingredients,
  );
  const ingredientKeys = Object.keys(ingredientsQuantities);
  const requestIngredients = transformIngredientsForServer(
    ingredientsQuantities,
  );
  const {
    data: ingredientsInfo,
    isLoading,
    isError,
  } = useQuery(
    ingredientsWithProductsOptions({
      items: requestIngredients,
      enabled: !!ingredientKeys.length,
    }),
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching ingredients</div>;
  if (!ingredientKeys.length || ingredientsInfo === undefined)
    return <div>Add some ingredients to your cart to see them here</div>;

  return (
    <>
      {ingredientKeys.map((key) => (
        <NotLoggedInUserCartItem key={key} info={ingredientsInfo[key]} />
      ))}
    </>
  );
}

export default NotLoggedInUserCart;
