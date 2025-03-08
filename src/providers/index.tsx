'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { getQueryClient } from '@/queries/get-query-client';

import { ClientStoreProvider } from './client-store-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ClientStoreProvider>{children}</ClientStoreProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
