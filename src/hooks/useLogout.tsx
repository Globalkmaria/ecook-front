'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import { useClientStore } from '@/providers/client-store-provider';

import { LOGIN_LINK } from '@/helpers/links';

function useLogout() {
  const router = useRouter();
  const resetUser = useClientStore((state) => state.resetUser);
  const query = useQueryClient();

  const logout = useCallback(() => {
    router.push(LOGIN_LINK);
    resetUser();
    Promise.resolve().then(() => {
      query.clear();
    });
  }, []);

  return logout;
}

export default useLogout;
