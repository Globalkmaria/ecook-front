import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { createUserSlice, UserStore } from './user-store';

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
