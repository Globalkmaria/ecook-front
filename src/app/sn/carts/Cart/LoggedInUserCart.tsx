import { useQuery } from '@tanstack/react-query';

import { useClientStore } from '@/providers/client-store-provider';

import { isAuthError } from '@/services/utils';

import useLogout from '@/hooks/useLogout';

import { userCartOptions } from '@/queries/options/carts/userCartOptions';
import { useUpdateCartItemQuantityMutation } from '@/queries/hooks/useUpdateCartItemQuantityMutation';

import CartItem from './CartItem';

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

  if (isAuthError(error)) {
    logout();
    return;
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching ingredients</div>;
  if (data === undefined) return <div>No cart information found</div>;

  const onQuantityChange = ({
    ingredientKey,
    productKey,
    quantity,
  }: {
    ingredientKey: string;
    productKey?: string;
    quantity: number;
  }) => {
    mutate({
      ingredientKey,
      productKey,
      quantity,
    });
  };

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
