'use client';

import { createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

import { UserStore } from '@/stores/user-store';
import { createClientStore } from '@/stores/clientStore';

export type ClientStoreApi = ReturnType<typeof createClientStore>;

export const ClientStoreContext = createContext<ClientStoreApi | undefined>(
  undefined,
);

export interface ClientStoreProviderProps {
  children: React.ReactNode;
}

export const ClientStoreProvider = ({ children }: ClientStoreProviderProps) => {
  const userStore = useRef<ClientStoreApi>();
  if (!userStore.current) {
    userStore.current = createClientStore();
  }
  return (
    <ClientStoreContext.Provider value={userStore.current}>
      {children}
    </ClientStoreContext.Provider>
  );
};

export const useClientStore = <T,>(selector: (store: UserStore) => T): T => {
  const clientStoreContext = useContext(ClientStoreContext);

  if (!clientStoreContext) {
    throw new Error('useUserStore must be used within a ClientStoreProvider');
  }

  return useStore(clientStoreContext, selector);
};
