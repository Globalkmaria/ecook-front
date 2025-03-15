import { useCallback, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useUpdateCartItemQuantityMutation } from '@/queries/hooks';
import { useAddPantryBoxMutation } from '@/queries/hooks/pantry/boxes/useAddPantryBox';
import { userCartOptions } from '@/queries/options/carts/userCartOptions';

import useLogout from '@/hooks/useLogout';

import { useClientStore } from '@/providers/client-store-provider';
import { isAuthError } from '@/services/utils';

import CartItem, { LoggedInUserCartItemProps } from './LoggedInUserCartItem';
import { CartProductProps } from '../CartProduct';
import { getNewPantryBox } from './helper';

function LoggedInUserCart() {
  const username = useClientStore((state) => state.user?.username);
  const logout = useLogout();
  const { data, isLoading, isError, error } = useQuery(
    userCartOptions({
      username: username ?? '',
      enabled: !!username,
    }),
  );
  const { mutate } = useUpdateCartItemQuantityMutation();
  const onQuantityChange: LoggedInUserCartItemProps['onQuantityChange'] =
    useCallback(
      ({ ingredientKey, productKey, quantity }) => {
        mutate({
          ingredientKey,
          productKey,
          quantity,
        });
      },
      [mutate],
    );

  const { mutate: addPantryBox } = useAddPantryBoxMutation();
  const onAddPantryBox: CartProductProps['onAddPantryBox'] = useCallback(
    async (args) => {
      const newPantryBox = getNewPantryBox(args);
      addPantryBox(newPantryBox, {
        onSuccess: () => {
          onQuantityChange({
            ingredientKey: args.ingredientKey,
            productKey: args.productKey,
            quantity: 0,
          });
        },
      });
    },
    [addPantryBox, onQuantityChange],
  );

  useEffect(() => {
    if (isAuthError(error)) {
      logout();
      return;
    }
  }, [error, logout]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching ingredients</div>;
  if (!data?.length)
    return <div>Add some ingredients to your cart to see them here</div>;

  return (
    <>
      {data.map((item) => (
        <CartItem
          key={item.ingredient.key}
          item={item}
          onQuantityChange={onQuantityChange}
          onAddPantryBox={onAddPantryBox}
        />
      ))}
    </>
  );
}

export default LoggedInUserCart;
