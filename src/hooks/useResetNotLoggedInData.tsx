'use client';

import { useCallback } from 'react';
import { useShallow } from 'zustand/shallow';

import { useClientStore } from '@/providers/client-store-provider';

function useResetNotLoggedInData() {
  const [resetBookmarks, resetCart] = useClientStore(
    useShallow((state) => [state.resetBookmarks, state.resetCart]),
  );

  const resetNotLoggedInData = useCallback(() => {
    resetBookmarks();
    resetCart();
  }, []);

  return resetNotLoggedInData;
}

export default useResetNotLoggedInData;
