import { StateCreator } from 'zustand';

import { ClientStore } from '@/stores/clientStore';

import { getNewPantryBoxItem, getPantryBoxKey } from './helper';

export type PantryBoxItemState = {
  key: string;
  expireDate: string;
  buyDate: string;
  quantity: number;
};

type PantryBoxState = {
  key: string;
  ingredientKey: string;
  productKey?: string;
  items: PantryBoxItemState[];
};

export type PantryState = {
  pantry: {
    pantryBoxes: { [pantryBoxKey: string]: PantryBoxState };
  };
};

type AddPantryBoxItemPayload = {
  ingredientKey: string;
  productKey?: string;
  quantity?: number;
};

type DeletePantryBoxItemPayload = {
  pantryBoxKey: string;
  pantryBoxItemKey: string;
};

type UploadPantryBoxItemPayload<T extends keyof PantryBoxItemState> = {
  pantryBoxKey: string;
  pantryBoxItemKey: string;
  pantryBoxItemField: T;
  pantryBoxItemValue: PantryBoxItemState[T];
};

type PantryAction = {
  resetPantry: () => void;
  addPantryBox: (pantryBox: PantryBoxState) => void;
  deletePantryBox: (pantryBoxKey: string) => void;
  addPantryBoxItem: (payload: AddPantryBoxItemPayload) => void;
  deletePantryBoxItem: ({
    pantryBoxKey,
    pantryBoxItemKey,
  }: DeletePantryBoxItemPayload) => void;
  updatePantryBoxItem: <T extends keyof PantryBoxItemState>({
    pantryBoxKey,
    pantryBoxItemKey,
    pantryBoxItemField,
    pantryBoxItemValue,
  }: UploadPantryBoxItemPayload<T>) => void;
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
  addPantryBox: (pantryBox) =>
    set(
      (state) => {
        if (state.pantry.pantryBoxes[pantryBox.key]) {
          state.pantry.pantryBoxes[pantryBox.key].items.push(
            pantryBox.items[0],
          );
          return;
        }

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

  addPantryBoxItem: ({ ingredientKey, productKey }) =>
    set(
      (state) => {
        const pantryBoxKey = getPantryBoxKey(ingredientKey, productKey);
        const pantryBox = state.pantry.pantryBoxes[pantryBoxKey];
        pantryBox.items.push(getNewPantryBoxItem({}));
      },
      undefined,
      'pantry/addPantryBoxItem',
    ),

  deletePantryBoxItem: ({ pantryBoxKey, pantryBoxItemKey }) =>
    set(
      (state) => {
        const pantryBox = state.pantry.pantryBoxes[pantryBoxKey];
        if (!pantryBox) return;

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

  updatePantryBoxItem: ({
    pantryBoxKey,
    pantryBoxItemKey,
    pantryBoxItemField,
    pantryBoxItemValue,
  }) =>
    set(
      (state) => {
        const pantryBox = state.pantry.pantryBoxes[pantryBoxKey];
        if (!pantryBox || !pantryBox.items) return;

        pantryBox.items = pantryBox.items.map((item) => {
          if (item.key === pantryBoxItemKey) {
            return {
              ...item,
              [pantryBoxItemField]: pantryBoxItemValue,
            };
          }
          return item;
        });
      },
      undefined,
      'pantry/updatePantryBoxItem',
    ),
});
