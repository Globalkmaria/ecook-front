'use client';

import { useShallow } from 'zustand/shallow';

import style from './style.module.scss';

import { useClientStore } from '@/providers/client-store-provider';

import Icon from '@/components/Icon';

interface Props {
  ingredientKey: string;
  productKey?: string;
}

function AddIngredientToCartButton({ ingredientKey, productKey }: Props) {
  const [addIngredientToCart, addProductToCart] = useClientStore(
    useShallow((state) => [state.addIngredientToCart, state.addProductToCart]),
  );
  const onAddToCart = () => {
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
