import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { createUserSlice, UserStore } from './slices/userSlice';
import { createBookmarkSlice, BookmarkStore } from './slices/bookmarkSlice';
import { immer } from 'zustand/middleware/immer';
import { CartStore, createCartSlice } from './slices/cartSlice';

export type ClientStore = UserStore & BookmarkStore & CartStore;

export const createClientStore = () =>
  create<ClientStore>()(
    devtools(
      persist(
        immer((...arg) => ({
          ...createUserSlice(...arg),
          ...createBookmarkSlice(...arg),
          ...createCartSlice(...arg),
        })),
        { name: 'ClientStore' },
      ),
    ),
  );
