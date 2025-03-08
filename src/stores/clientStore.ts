import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { createBookmarkSlice, BookmarkStore } from './slices/bookmarkSlice';
import { createCartSlice, CartStore } from './slices/cartSlice';
import { createPantrySlice, PantryStore } from './slices/pantry/pantrySlice';
import { createUserSlice, UserStore } from './slices/userSlice';

export type ClientStore = UserStore & BookmarkStore & CartStore & PantryStore;

export const createClientStore = () =>
  create<ClientStore>()(
    devtools(
      persist(
        immer((...arg) => ({
          ...createUserSlice(...arg),
          ...createBookmarkSlice(...arg),
          ...createCartSlice(...arg),
          ...createPantrySlice(...arg),
        })),
        { name: 'ClientStore' },
      ),
    ),
  );
