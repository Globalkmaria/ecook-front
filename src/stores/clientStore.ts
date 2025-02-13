import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { createUserSlice, UserStore } from './slices/userSlice';
import { createBookmarkSlice, BookmarkStore } from './slices/bookmarkSlice';
import { immer } from 'zustand/middleware/immer';

export type ClientStore = UserStore & BookmarkStore;

export const createClientStore = () =>
  create<ClientStore>()(
    devtools(
      persist(
        immer((...arg) => ({
          ...createUserSlice(...arg),
          ...createBookmarkSlice(...arg),
        })),
        { name: 'ClientStore' },
      ),
    ),
  );
