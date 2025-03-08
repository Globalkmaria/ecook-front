'use client';

import { useState } from 'react';
import { useShallow } from 'zustand/shallow';

import { useClientStore } from '@/providers/client-store-provider';

import { useCreateCartItemMutation } from '@/queries/hooks/carts/useCreateCartItemMutation';

import Button from '@/components/Button';

interface Props {
  ingredientKey: string;
  productKey: string;
}

function AddToCart({ ingredientKey, productKey }: Props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [addToCart, isLoggedIn] = useClientStore(
    useShallow((state) => [state.addToCart, state.user.isLoggedIn]),
  );
  const {
    mutate,
    isPending,
    isSuccess: isServerSuccess,
  } = useCreateCartItemMutation();

  const text = isSuccess || isServerSuccess ? 'Added' : 'Add to cart';

  const onAddProduct = () => {
    if (isSuccess) return;

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

  return (
    <Button onClick={onAddProduct} variant='secondary' disabled={isPending}>
      {text}
    </Button>
  );
}

export default AddToCart;
