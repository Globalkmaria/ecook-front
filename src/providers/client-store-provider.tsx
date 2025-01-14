'use client';

import { createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

import { createClientStore, ClientStore } from '@/stores/clientStore';

export type ClientStoreApi = ReturnType<typeof createClientStore>;

export const ClientStoreContext = createContext<ClientStoreApi | undefined>(
  undefined,
);

export interface ClientStoreProviderProps {
  children: React.ReactNode;
}

export const ClientStoreProvider = ({ children }: ClientStoreProviderProps) => {
  const clientStore = useRef<ClientStoreApi>();
  if (!clientStore.current) {
    clientStore.current = createClientStore();
  }
  return (
    <ClientStoreContext.Provider value={clientStore.current}>
      {children}
    </ClientStoreContext.Provider>
  );
};

export const useClientStore = <T,>(selector: (store: ClientStore) => T): T => {
  const clientStoreContext = useContext(ClientStoreContext);

  if (!clientStoreContext) {
    throw new Error('useClientStore must be used within a ClientStoreProvider');
  }

  return useStore(clientStoreContext, selector);
};
