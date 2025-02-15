import { StateCreator } from 'zustand';
import { ClientStore } from '../clientStore';

type CartState = {
  quantities: { [ingredientId: string]: number };
  items: {
    [ingredientId: string]: {
      id: string;
      productId?: string;
    };
  };
};

type CartAction = {
  getQuantity: (ingredientId: string) => number;
  setQuantity: (ingredientId: string, quantity: number) => void;
  resetQuantities: () => void;
  getItems: () => CartState['items'];
  addItem: (ingredientId: string, productId?: string) => void;
  removeItem: (ingredientId: string, productId?: string) => void;
  resetItems: () => void;
};

export type CartStore = { carts: CartState & CartAction };

const initialCartState: CartState = {
  quantities: {},
  items: {},
};

export const createCartSlice: StateCreator<
  ClientStore,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  CartStore
> = (set, get) => ({
  carts: {
    ...initialCartState,
    getQuantity: (ingredientId: string) =>
      get().carts.quantities[ingredientId] ?? 0,
    setQuantity: (ingredientId: string, quantity: number) =>
      set(
        (state) => {
          state.carts.quantities[ingredientId] = quantity;
        },
        undefined,
        'carts/setQuantity',
      ),
    resetQuantities: () =>
      set(
        (state) => {
          state.carts.quantities = {};
        },
        undefined,
        'carts/resetQuantities',
      ),
    getItems: () => get().carts.items,
    addItem: (ingredientId: string, productId?: string) =>
      set(
        (state) => {
          state.carts.items[ingredientId] = { id: ingredientId, productId };
        },
        undefined,
        'carts/addItem',
      ),
    removeItem: (ingredientId: string, productId?: string) =>
      set(
        (state) => {
          delete state.carts.items[ingredientId];
        },
        undefined,
        'carts/removeItem',
      ),
    resetItems: () =>
      set(
        (state) => {
          state.carts.items = {};
        },
        undefined,
        'carts/resetItems',
      ),
  },
});
