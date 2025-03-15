import { memo, useCallback } from 'react';

import { useShallow } from 'zustand/shallow';

import { getNewPantryBox } from '@/stores/slices/pantry/helper';

import { useClientStore } from '@/providers/client-store-provider';
import { IngredientWithProduct } from '@/services/requests/ingredients/type';

import CartItem from '../../CartItem';
import CartProduct, { CartProductProps } from '../../CartProduct';
import { CartItemControl } from '../../CartProduct/CartItemControl';

interface CartItemProps {
  info: IngredientWithProduct;
}

type onQuantityChangeParams = {
  ingredientKey: string;
  productKey?: string;
  quantity: number;
};

function NotLoggedInUserCartItem({ info }: CartItemProps) {
  const ingredientKey = info.ingredient.key;

  const [
    addPantryBox,
    removeCartItem,
    updateQuantity,
    ingredientAndProductsQuantity,
  ] = useClientStore(
    useShallow((state) => [
      state.addPantryBox,
      state.removeCartItem,
      state.updateQuantity,
      state.getCartIngredientQuantity({ ingredientKey }),
    ]),
  );

  const productKeys = Object.keys(ingredientAndProductsQuantity.products);

  const onQuantityChange = useCallback(
    ({ ingredientKey, productKey, quantity }: onQuantityChangeParams) => {
      if (quantity <= 0) {
        removeCartItem({ ingredientKey, productKey });
        return;
      }

      updateQuantity({ ingredientKey, productKey, quantity });
    },
    [removeCartItem, updateQuantity],
  );

  const onIngredientQuantityChange = useCallback(
    (quantity: number) => {
      onQuantityChange({
        ingredientKey,
        quantity,
      });
    },
    [ingredientKey, onQuantityChange],
  );

  const onProductQuantityChange = useCallback(
    (productKey: string, quantity: number) => {
      onQuantityChange({
        ingredientKey,
        productKey,
        quantity,
      });
    },
    [onQuantityChange, ingredientKey],
  );

  const onAddPantryBox: CartProductProps['onAddPantryBox'] = (arg) => {
    addPantryBox(getNewPantryBox(arg));
    onQuantityChange({
      ingredientKey,
      productKey: arg.productKey,
      quantity: 0,
    });
  };

  return (
    <CartItem title={info.ingredient.name}>
      {ingredientAndProductsQuantity.quantity && (
        <CartItemControl
          ingredientKey={ingredientKey}
          quantity={ingredientAndProductsQuantity.quantity}
          onChange={onIngredientQuantityChange}
          onAddPantryBox={onAddPantryBox}
        />
      )}
      {productKeys.map((key) => (
        <CartProduct
          key={key}
          ingredientKey={ingredientKey}
          product={info.products[key]}
          onChange={onProductQuantityChange}
          quantity={ingredientAndProductsQuantity.products[key]}
          onAddPantryBox={onAddPantryBox}
        />
      ))}
    </CartItem>
  );
}

export default memo(NotLoggedInUserCartItem);
