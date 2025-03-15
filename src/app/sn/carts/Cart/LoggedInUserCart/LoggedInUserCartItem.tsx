import { memo, useCallback } from 'react';

import CartItem from '../CartItem';
import CartProduct, {
  CartItemInfo,
  CartItemProduct,
  CartProductProps,
} from '../CartProduct';
import { CartItemControl } from '../CartProduct/CartItemControl';

export interface LoggedInUserCartItemProps {
  item: Pick<CartItemInfo, 'ingredient'> & {
    products: (CartItemProduct & {
      quantity: number;
    })[];
  };
  onQuantityChange: (args: {
    ingredientKey: string;
    productKey?: string;
    quantity: number;
  }) => void;
  onAddPantryBox: CartProductProps['onAddPantryBox'];
}

function LoggedInUserCartItem({
  item,
  onQuantityChange,
  onAddPantryBox,
}: LoggedInUserCartItemProps) {
  const onIngredientQuantityChange = useCallback(
    (quantity: number) => {
      onQuantityChange({
        ingredientKey: item.ingredient.key,
        quantity,
      });
    },
    [onQuantityChange, item.ingredient.key],
  );

  const onProductQuantityChange = useCallback(
    (productKey: string, quantity: number) => {
      onQuantityChange({
        ingredientKey: item.ingredient.key,
        productKey,
        quantity,
      });
    },
    [onQuantityChange, item.ingredient.key],
  );
  return (
    <CartItem title={item.ingredient.name}>
      {item.ingredient.quantity && (
        <CartItemControl
          ingredientKey={item.ingredient.key}
          quantity={item.ingredient.quantity}
          onChange={onIngredientQuantityChange}
          onAddPantryBox={onAddPantryBox}
        />
      )}
      {item.products.map((product) => (
        <CartProduct
          ingredientKey={item.ingredient.key}
          key={product.key}
          product={product}
          onChange={onProductQuantityChange}
          quantity={product.quantity}
          onAddPantryBox={onAddPantryBox}
        />
      ))}
    </CartItem>
  );
}

export default memo(LoggedInUserCartItem);
