import { memo, useCallback } from 'react';

import style from './style.module.scss';

import QuantityInput from '../QuantityInput';
import CartProduct from '../CartProduct';

interface CartItemProduct {
  key: string;
  name: string;
  brand: string;
  purchasedFrom: string;
  img: string;
  quantity: number;
}

export interface CartItemInfo {
  ingredient: { name: string; key: string; quantity?: number };
  products: CartItemProduct[];
}

export interface CartItemProps {
  item: CartItemInfo;
  onQuantityChange: ({
    ingredientKey,
    productKey,
    quantity,
  }: {
    ingredientKey: string;
    productKey?: string;
    quantity: number;
  }) => void;
}

function LoggedInUserCartItem({ item, onQuantityChange }: CartItemProps) {
  const onIngredientQuantityChange = useCallback((quantity: number) => {
    onQuantityChange({
      ingredientKey: item.ingredient.key,
      quantity,
    });
  }, []);

  const onProductQuantityChange = useCallback(
    (productKey: string, quantity: number) => {
      onQuantityChange({
        ingredientKey: item.ingredient.key,
        productKey,
        quantity,
      });
    },
    [],
  );
  return (
    <li className={style['cart-item']}>
      <div className={style['ingredient']}>{item.ingredient.name}</div>
      {item.ingredient.quantity && (
        <QuantityInput
          quantity={item.ingredient.quantity}
          onChange={onIngredientQuantityChange}
        />
      )}
      {item.products.map((product) => (
        <CartProduct
          key={product.key}
          product={product}
          onChange={onProductQuantityChange}
          quantity={product.quantity}
        />
      ))}
    </li>
  );
}

export default memo(LoggedInUserCartItem);
