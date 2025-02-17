import { useShallow } from 'zustand/shallow';

import { useClientStore } from '@/providers/client-store-provider';

import { useCreateCartItemMutation } from '@/queries/hooks/carts/useCreateCartItemMutation';

import Button from '@/components/Button';

interface Props {
  ingredientKey: string;
  productKey: string;
}

function AddToCart({ ingredientKey, productKey }: Props) {
  const { mutate, isPending, isSuccess } = useCreateCartItemMutation();

  const [addProduct, isLoggedIn] = useClientStore(
    useShallow((state) => [state.addProductToCart, state.user.isLoggedIn]),
  );

  const text = isSuccess ? 'Added' : 'Add to cart';
  const onAddProduct = () => {
    if (isSuccess) return;

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
    <Button onClick={onAddProduct} variant='secondary' disabled={isPending}>
      {text}
    </Button>
  );
}

export default AddToCart;
