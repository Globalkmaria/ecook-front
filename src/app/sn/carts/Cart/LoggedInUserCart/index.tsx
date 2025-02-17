import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useClientStore } from '@/providers/client-store-provider';

import { isAuthError } from '@/services/utils';

import useLogout from '@/hooks/useLogout';

import { userCartOptions } from '@/queries/options/carts/userCartOptions';
import { useUpdateCartItemQuantityMutation } from '@/queries/hooks';

import CartItem, { CartItemProps } from './LoggedInUserCartItem';

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
  const onQuantityChange: CartItemProps['onQuantityChange'] = useCallback(
    ({ ingredientKey, productKey, quantity }) => {
      mutate({
        ingredientKey,
        productKey,
        quantity,
      });
    },
    [],
  );

  if (isAuthError(error)) {
    logout();
    return;
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching ingredients</div>;
  if (data === undefined)
    return <div>Add some ingredients to your cart to see them here</div>;

  return (
    <>
      {data.map((item) => (
        <CartItem
          key={item.ingredient.key}
          item={item}
          onQuantityChange={onQuantityChange}
        />
      ))}
    </>
  );
}

export default LoggedInUserCart;
