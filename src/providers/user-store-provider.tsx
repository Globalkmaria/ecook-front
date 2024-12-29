'use client';

import { createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

import { createUserStore, UserStore } from '@/stores/user-store';

export type UserStoreApi = ReturnType<typeof createUserStore>;

export const UserStoreContext = createContext<UserStoreApi | undefined>(
  undefined,
);

export interface UserStoreProviderProps {
  children: React.ReactNode;
}

export const UserStoreProvider = ({ children }: UserStoreProviderProps) => {
  const userStore = useRef<UserStoreApi>();
  if (!userStore.current) {
    userStore.current = createUserStore();
  }
  return (
    <UserStoreContext.Provider value={userStore.current}>
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
  const userStoreContext = useContext(UserStoreContext);

  if (!userStoreContext) {
    throw new Error('useUserStore must be used within a UserStoreProvider');
  }

  return useStore(userStoreContext, selector);
};
