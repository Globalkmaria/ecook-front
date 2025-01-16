import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { createUserSlice, UserStore } from './slices/userSlice';
import { immer } from 'zustand/middleware/immer';

export type ClientStore = UserStore;

export const createClientStore = () =>
  create<ClientStore>()(
    devtools(
      persist(
        immer((...arg) => ({
          ...createUserSlice(...arg),
        })),
        { name: 'ClientStore' },
      ),
    ),
  );
