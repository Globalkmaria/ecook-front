import { memo, useCallback } from 'react';
import { useShallow } from 'zustand/shallow';

import style from './style.module.scss';

import { useClientStore } from '@/providers/client-store-provider';

import { IngredientWithProduct } from '@/services/requests/ingredients/type';

import CartProduct from '../../CartProduct';
import QuantityInput from '../../QuantityInput';

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
  const productKeys = Object.keys(info.products);

  const [removeCartItem, updateQuantity, ingredientAndProductsQuantity] =
    useClientStore(
      useShallow((state) => [
        state.removeCartItem,
        state.updateQuantity,
        state.getCartIngredientQuantity({ ingredientKey }),
      ]),
    );

  const onQuantityChange = useCallback(
    ({ ingredientKey, productKey, quantity }: onQuantityChangeParams) => {
      if (quantity <= 0) {
        removeCartItem({ ingredientKey, productKey });
        return;
      }

      updateQuantity({ ingredientKey, productKey, quantity });
    },
    [],
  );

  const onIngredientQuantityChange = useCallback((quantity: number) => {
    onQuantityChange({
      ingredientKey,
      quantity,
    });
  }, []);

  const onProductQuantityChange = useCallback(
    (productKey: string, quantity: number) => {
      onQuantityChange({
        ingredientKey: ingredientKey,
        productKey,
        quantity,
      });
    },
    [],
  );

  return (
    <li className={style['cart-item']}>
      <div className={style['ingredient']}>{info.ingredient.name}</div>
      {ingredientAndProductsQuantity.quantity && (
        <QuantityInput
          quantity={ingredientAndProductsQuantity.quantity}
          onChange={onIngredientQuantityChange}
        />
      )}
      {productKeys.map((key) => (
        <CartProduct
          key={key}
          product={info.products[key]}
          onChange={onProductQuantityChange}
          quantity={ingredientAndProductsQuantity.products[key]}
        />
      ))}
    </li>
  );
}

export default memo(NotLoggedInUserCartItem);
