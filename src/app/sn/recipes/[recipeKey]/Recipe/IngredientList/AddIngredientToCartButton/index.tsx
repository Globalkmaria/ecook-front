'use client';

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
  const [addIngredientToCart, addProductToCart, isLoggedIn] = useClientStore(
    useShallow((state) => [
      state.addIngredientToCart,
      state.addProductToCart,
      state.user.isLoggedIn,
    ]),
  );
  const { mutate } = useCreateCartItemMutation();
  const onAddToCart = () => {
    if (isLoggedIn) {
      mutate({
        ingredientKey,
        productKey,
      });
      return;
    }

    if (productKey) {
      addProductToCart(ingredientKey, productKey);
    } else {
      addIngredientToCart(ingredientKey);
    }
  };

  return (
    <button
      type='button'
      onClick={onAddToCart}
      className={style['cart-button']}
    >
      <Icon icon='cart' className={style['icon']} />
    </button>
  );
}

export default AddIngredientToCartButton;
