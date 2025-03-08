'use client';

import { useCallback } from 'react';

import { useShallow } from 'zustand/shallow';

import { useClientStore } from '@/providers/client-store-provider';

function useResetNotLoggedInData() {
  const [resetBookmarks, resetCart, resetPantry] = useClientStore(
    useShallow((state) => [
      state.resetBookmarks,
      state.resetCart,
      state.resetPantry,
    ]),
  );

  const resetNotLoggedInData = useCallback(() => {
    resetBookmarks();
    resetCart();
    resetPantry();
  }, []);

  return resetNotLoggedInData;
}

export default useResetNotLoggedInData;
