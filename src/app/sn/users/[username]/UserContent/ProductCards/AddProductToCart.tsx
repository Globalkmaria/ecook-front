'use client';

import { useState } from 'react';

import { useShallow } from 'zustand/shallow';

import { useCreateCartItemMutation } from '@/queries/hooks/carts/useCreateCartItemMutation';

import IconButton from '@/components/IconButton';

import { useClientStore } from '@/providers/client-store-provider';

import style from './style.module.scss';

interface Props {
  ingredientKey: string;
  productKey: string;
}

function AddProductToCart({ ingredientKey, productKey }: Props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [addToCart, isLoggedIn, quantity] = useClientStore(
    useShallow((state) => [
      state.addToCart,
      state.user.isLoggedIn,
      state.getCartItemQuantity({ ingredientKey, productKey }),
    ]),
  );

  const {
    mutate,
    data,
    isSuccess: isServerSuccess,
    isError,
  } = useCreateCartItemMutation();

  const onAddProduct = () => {
    if (isLoggedIn) {
      mutate({
        ingredientKey,
        productKey,
      });
    } else {
      addToCart({ ingredientKey, productKey });
      setIsSuccess(true);
    }
  };
  if (isError) {
    console.error('Error in AddProductToCart', isError);
    return;
  }

  const showCount = isServerSuccess || isSuccess;
  const count = isServerSuccess ? data : quantity;
  return (
    <div className={style['cart']}>
      {showCount && <div className={style['cart__count']}>{count}</div>}
      <IconButton
        icon='cart'
        onClick={onAddProduct}
        className={style['cart__icon']}
      />
    </div>
  );
}

export default AddProductToCart;
