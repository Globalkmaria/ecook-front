'use client';

import { useQuery } from '@tanstack/react-query';
import { useShallow } from 'zustand/shallow';

import { transformIngredientsForServer } from '@/queries/options/ingredients/helper';
import { ingredientsWithProductsOptions } from '@/queries/options/ingredients/ingredientsWithProductsOptions';

import { useClientStore } from '@/providers/client-store-provider';

import CartItem from '../CartItem';
import { combineCartItemWithInfo } from './helper';

function NotLoggedInUserCart() {
  const [ingredientsQuantities, removeCartItem, updateQuantity] =
    useClientStore(
      useShallow((state) => [
        state.carts.ingredients,
        state.removeCartItem,
        state.updateQuantity,
      ]),
    );

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
      enabled: true,
    }),
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching ingredients</div>;
  if (ingredientsInfo === undefined)
    return <div>No cart information found</div>;

  const onQuantityChange = ({
    ingredientKey,
    productKey,
    quantity,
  }: {
    ingredientKey: string;
    productKey?: string;
    quantity: number;
  }) => {
    if (quantity <= 0) {
      removeCartItem({ ingredientKey, productKey });
      return;
    }

    updateQuantity({ ingredientKey, productKey, quantity });
  };

  const combinedCartItems = combineCartItemWithInfo(
    ingredientsQuantities,
    ingredientsInfo,
  );

  return (
    <>
      {combinedCartItems.map((item) => (
        <CartItem
          key={item.ingredient.key}
          item={item}
          onQuantityChange={onQuantityChange}
        />
      ))}
    </>
  );
}

export default NotLoggedInUserCart;
