import { StateCreator } from 'zustand';

import { ClientStore } from '../clientStore';
import { isCartIngredientEmpty } from './helper';

export type CartIngredient = {
  quantity?: number;
  products: {
    [productKey: string]: number;
  };
};

export type CartState = {
  carts: {
    ingredients: {
      [ingredientKey: string]: CartIngredient;
    };
  };
};

type CartAction = {
  updateQuantity: ({
    ingredientKey,
    productKey,
    quantity,
  }: {
    ingredientKey: string;
    productKey?: string;
    quantity: number;
  }) => void;
  addIngredientToCart: (ingredientKey: string) => void;
  addProductToCart: (ingredientKey: string, productKey: string) => void;
  removeCartItem: ({
    ingredientKey,
    productKey,
  }: {
    ingredientKey: string;
    productKey?: string;
  }) => void;
  resetCart: () => void;
  getCartIngredientQuantity: ({
    ingredientKey,
  }: {
    ingredientKey: string;
  }) => CartState['carts']['ingredients'][string];
  getCartItemQuantity: ({
    ingredientKey,
    productKey,
  }: {
    ingredientKey: string;
    productKey?: string;
  }) => number;
};

export type CartStore = CartState & CartAction;

const initialCartState: CartState = { carts: { ingredients: {} } };

export const createCartSlice: StateCreator<
  ClientStore,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  CartStore
> = (set, get) => ({
  ...initialCartState,
  getCartIngredientQuantity: ({ ingredientKey }) => {
    return (
      get().carts.ingredients[ingredientKey] ?? { quantity: null, products: {} }
    );
  },

  getCartItemQuantity: ({ ingredientKey, productKey }) => {
    if (productKey) {
      return get().carts.ingredients[ingredientKey]?.products[productKey] ?? 0;
    } else {
      return get().carts.ingredients[ingredientKey]?.quantity ?? 0;
    }
  },

  updateQuantity: ({
    ingredientKey,
    productKey,
    quantity,
  }: {
    ingredientKey: string;
    productKey?: string;
    quantity: number;
  }) =>
    set(
      (state) => {
        if (productKey) {
          state.carts.ingredients[ingredientKey].products[productKey] =
            quantity;
        } else {
          state.carts.ingredients[ingredientKey].quantity = quantity;
        }
      },
      undefined,
      'carts/updateIngredientQuantity',
    ),
  addIngredientToCart: (ingredientKey: string) =>
    set(
      (state) => {
        if (!state.carts.ingredients[ingredientKey]) {
          state.carts.ingredients[ingredientKey] = {
            quantity: 0,
            products: {},
          };
        }
        const quantity = state.carts.ingredients[ingredientKey].quantity ?? 0;
        state.carts.ingredients[ingredientKey].quantity = quantity + 1;
      },
      undefined,
      'carts/addIngredientToCart',
    ),
  addProductToCart: (ingredientKey: string, productKey: string) =>
    set(
      (state) => {
        if (!state.carts.ingredients[ingredientKey]) {
          state.carts.ingredients[ingredientKey] = {
            products: {},
          };
        }

        if (!state.carts.ingredients[ingredientKey].products[productKey]) {
          state.carts.ingredients[ingredientKey].products[productKey] = 0;
        }

        state.carts.ingredients[ingredientKey].products[productKey] += 1;
      },
      undefined,
      'carts/addProductToCart',
    ),
  removeCartItem: ({
    ingredientKey,
    productKey,
  }: {
    ingredientKey: string;
    productKey?: string;
  }) =>
    set(
      (state) => {
        if (productKey) {
          delete state.carts.ingredients[ingredientKey].products[productKey];
        } else {
          delete state.carts.ingredients[ingredientKey].quantity;
        }

        if (isCartIngredientEmpty(state.carts.ingredients[ingredientKey])) {
          delete state.carts.ingredients[ingredientKey];
        }
      },
      undefined,
      'carts/removeCartItem',
    ),
  resetCart: () =>
    set(
      (state) => {
        state.carts.ingredients = {};
      },
      undefined,
      'carts/resetCart',
    ),
});
