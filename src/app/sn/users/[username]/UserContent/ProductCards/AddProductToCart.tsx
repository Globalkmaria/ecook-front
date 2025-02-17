'use client';

import { useShallow } from 'zustand/shallow';

import style from './style.module.scss';

import { useClientStore } from '@/providers/client-store-provider';

import { useCreateCartItemMutation } from '@/queries/hooks/carts/useCreateCartItemMutation';

import IconButton from '@/components/IconButton';

interface Props {
  ingredientKey: string;
  productKey: string;
}

function AddProductToCart({ ingredientKey, productKey }: Props) {
  const [addProduct, isLoggedIn] = useClientStore(
    useShallow((state) => [state.addProductToCart, state.user.isLoggedIn]),
  );

  const { mutate } = useCreateCartItemMutation();

  const onAddProduct = () => {
    if (isLoggedIn) {
      mutate({
        ingredientKey,
        productKey,
      });
    } else {
      addProduct(ingredientKey, productKey);
    }
  };
  return (
    <IconButton icon='cart' onClick={onAddProduct} className={style['cart']} />
  );
}

export default AddProductToCart;
