'use client';

import { useState } from 'react';
import { useShallow } from 'zustand/shallow';

import style from './style.module.scss';

import { useClientStore } from '@/providers/client-store-provider';

import { useCreateCartItemMutation } from '@/queries/hooks/carts/useCreateCartItemMutation';

import Icon from '@/components/Icon';

interface Props {
  ingredientKey: string;
  productKey?: string;
}

function AddIngredientToCartButton({ ingredientKey, productKey }: Props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [addIngredientToCart, addProductToCart, isLoggedIn, quantity] =
    useClientStore(
      useShallow((state) => [
        state.addIngredientToCart,
        state.addProductToCart,
        state.user.isLoggedIn,
        state.getCartItemQuantity({ ingredientKey, productKey }),
      ]),
    );
  const {
    mutate,
    data,
    isError,
    isSuccess: isServerSuccess,
  } = useCreateCartItemMutation();
  const onAddToCart = () => {
    if (isLoggedIn) {
      mutate({
        ingredientKey,
        productKey,
      });
      return;
    }

    productKey
      ? addProductToCart(ingredientKey, productKey)
      : addIngredientToCart(ingredientKey);

    setIsSuccess(true);
  };

  if (isError) {
    console.error('Error in AddIngredientToCartButton', isError);
    return;
  }

  const showCount = isServerSuccess || isSuccess;
  const count = isServerSuccess ? data : quantity;

  return (
    <div className={style['cart']}>
      {showCount && <div className={style['cart__count']}>{count}</div>}
      <button
        type='button'
        onClick={onAddToCart}
        className={style['cart-button']}
      >
        <Icon icon='cart' className={style['icon']} />
      </button>
    </div>
  );
}

export default AddIngredientToCartButton;
