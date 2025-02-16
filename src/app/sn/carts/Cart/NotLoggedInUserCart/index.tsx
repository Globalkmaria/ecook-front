'use client';

import { useQuery } from '@tanstack/react-query';
import { useShallow } from 'zustand/shallow';

import { transformIngredientsForServer } from '@/queries/options/ingredients/helper';
import { ingredientsWithProductsOptions } from '@/queries/options/ingredients/ingredientsWithProductsOptions';

import { useClientStore } from '@/providers/client-store-provider';

import CartItem from '../CartItem';

function NotLoggedInUserCart() {
  const [ingredients, removeCartItem, updateQuantity] = useClientStore(
    useShallow((state) => [
      state.carts.ingredients,
      state.removeCartItem,
      state.updateQuantity,
    ]),
  );

  const requestIngredients = transformIngredientsForServer(ingredients);

  const {
    data: ingredientsInfo,
    isLoading,
    isError,
  } = useQuery(
    ingredientsWithProductsOptions({
      items: requestIngredients,
      enabled: true,
    }),
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching ingredients</div>;
  if (ingredientsInfo === undefined)
    return <div>No cart information found</div>;

  const onQuantityChange = ({
    ingredientKey,
    productKey,
    quantity,
  }: {
    ingredientKey: string;
    productKey?: string;
    quantity: number;
  }) => {
    if (quantity <= 0) {
      removeCartItem({ ingredientKey, productKey });
      return;
    }

    updateQuantity({ ingredientKey, productKey, quantity });
  };

  const ingredientKeys = Object.keys(ingredientsInfo ?? {});

  const ingredientList = ingredientKeys.map((key) => {
    const ingredientInfo = ingredientsInfo[key];
    const ingredient = ingredients[key];

    return (
      <CartItem
        key={key}
        ingredientKey={key}
        item={ingredient}
        info={ingredientInfo}
        onQuantityChange={onQuantityChange}
      />
    );
  });

  return ingredientList;
}

export default NotLoggedInUserCart;
