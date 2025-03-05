import { StateCreator } from 'zustand';

import { ClientStore } from '@/stores/clientStore';
import { getNewPantryBoxItem } from './helper';

type PantryBoxItem = {
  key: string;
  expiryDate: string;
  buyDate: string;
  quantity: number;
};

type PantryBox = {
  key: string;
  ingredientKey: string;
  productKey?: string;
  items: PantryBoxItem[];
};

export type PantryState = {
  pantry: {
    pantryBoxes: { [pantryBoxKey: string]: PantryBox };
  };
};

type AddPantryBoxItemPayload = {
  ingredientKey: string;
  productKey?: string;
  quantity?: number;
};

type PantryAction = {
  resetPantry: () => void;
  getPantryBoxes: () => PantryState['pantry']['pantryBoxes'];
  getPantryBox: (pantryBoxKey: string) => PantryBox;
  addPantryBox: (pantryBox: PantryBox) => void;
  deletePantryBox: (pantryBoxKey: string) => void;
  addPantryBoxItem: (payload: AddPantryBoxItemPayload) => void;
  deletePantryBoxItem: (pantryBoxKey: string, pantryBoxItemKey: string) => void;
  updatePantryBoxItem: <T extends keyof PantryBoxItem>(
    pantryBoxKey: string,
    pantryBoxItemKey: T,
    pantryBoxItemValue: PantryBoxItem[T],
  ) => void;
};

export type PantryStore = PantryState & PantryAction;

const initialPantryState: PantryState = { pantry: { pantryBoxes: {} } };

export const createPantrySlice: StateCreator<
  ClientStore,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  PantryStore
> = (set, get) => ({
  ...initialPantryState,
  resetPantry: () => set({ ...initialPantryState }),
  getPantryBoxes: () => get().pantry.pantryBoxes,
  getPantryBox: (pantryBoxKey) => get().pantry.pantryBoxes[pantryBoxKey],
  addPantryBox: (pantryBox) =>
    set(
      (state) => {
        state.pantry.pantryBoxes[pantryBox.key] = pantryBox;
      },
      undefined,
      'pantry/addPantryBox',
    ),
  deletePantryBox: (pantryBoxKey) =>
    set(
      (state) => {
        delete state.pantry.pantryBoxes[pantryBoxKey];
      },
      undefined,
      'pantry/deletePantryBox',
    ),

  addPantryBoxItem: ({ ingredientKey, productKey, quantity = 1 }) =>
    set(
      (state) => {
        const pantryBoxKey = `${ingredientKey}${productKey ? `-${productKey}` : ''}`;
        const pantryBox = state.pantry.pantryBoxes[pantryBoxKey];
        pantryBox.items.push(
          getNewPantryBoxItem({ ingredientKey, productKey, quantity }),
        );
      },
      undefined,
      'pantry/addPantryBoxItem',
    ),

  deletePantryBoxItem: (pantryBoxKey, pantryBoxItemKey) =>
    set(
      (state) => {
        const pantryBox = state.pantry.pantryBoxes[pantryBoxKey];
        if (!pantryBox || !pantryBox.items) return;

        if (pantryBox.items.length === 1) {
          delete state.pantry.pantryBoxes[pantryBoxKey];
          return;
        }

        pantryBox.items = pantryBox.items.filter(
          (item) => item.key !== pantryBoxItemKey,
        );
      },
      undefined,
      'pantry/deletePantryBoxItem',
    ),

  updatePantryBoxItem: (pantryBoxKey, pantryBoxItemKey, pantryBoxItemValue) =>
    set(
      (state) => {
        const pantryBox = state.pantry.pantryBoxes[pantryBoxKey];
        if (!pantryBox || !pantryBox.items) return;

        pantryBox.items = pantryBox.items.map((item) => {
          if (item.key === pantryBoxItemKey) {
            return {
              ...item,
              [pantryBoxItemKey]: pantryBoxItemValue,
            };
          }
          return item;
        });
      },
      undefined,
      'pantry/updatePantryBoxItem',
    ),
});
