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

type CartActionPayload = {
  ingredientKey: string;
  productKey?: string;
};

type CartActionPayloadWithQuantity = CartActionPayload & {
  quantity: number;
};

type CartAction = {
  getCartIngredientQuantity: ({
    ingredientKey,
  }: Pick<
    CartActionPayload,
    'ingredientKey'
  >) => CartState['carts']['ingredients'][string];

  getCartItemQuantity: ({
    ingredientKey,
    productKey,
  }: CartActionPayload) => number;

  addToCart: ({ ingredientKey, productKey }: CartActionPayload) => void;

  updateQuantity: ({
    ingredientKey,
    productKey,
    quantity,
  }: CartActionPayloadWithQuantity) => void;

  removeCartItem: ({ ingredientKey, productKey }: CartActionPayload) => void;

  resetCart: () => void;
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
    }

    return get().carts.ingredients[ingredientKey]?.quantity ?? 0;
  },
  addToCart: ({ ingredientKey, productKey }) =>
    set(
      (state) => {
        if (!state.carts.ingredients[ingredientKey]) {
          state.carts.ingredients[ingredientKey] = {
            products: {},
          };
        }

        if (productKey) {
          if (!state.carts.ingredients[ingredientKey].products[productKey]) {
            state.carts.ingredients[ingredientKey].products[productKey] = 0;
          }
          state.carts.ingredients[ingredientKey].products[productKey] += 1;
          return;
        }

        if (!state.carts.ingredients[ingredientKey].quantity) {
          state.carts.ingredients[ingredientKey].quantity = 0;
        }
        state.carts.ingredients[ingredientKey].quantity += 1;
      },
      undefined,
      'carts/addToCart',
    ),
  updateQuantity: ({ ingredientKey, productKey, quantity }) =>
    set(
      (state) => {
        if (productKey) {
          state.carts.ingredients[ingredientKey].products[productKey] =
            quantity;
          return;
        }

        state.carts.ingredients[ingredientKey].quantity = quantity;
      },
      undefined,
      'carts/updateQuantity',
    ),
  removeCartItem: ({ ingredientKey, productKey }) =>
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
