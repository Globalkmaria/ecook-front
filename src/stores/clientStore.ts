import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { createUserSlice, UserStore } from './slices/userSlice';

export type ClientStore = UserStore;

export const createClientStore = () =>
  create<ClientStore>()(
    persist(
      devtools((...arg) => ({
        ...createUserSlice(...arg),
      })),
      { name: 'ClientStore' },
    ),
  );
