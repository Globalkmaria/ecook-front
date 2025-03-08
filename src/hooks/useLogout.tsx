'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import { useClientStore } from '@/providers/client-store-provider';

import { LOGIN_LINK } from '@/helpers/links';
import { logout } from '@/services/requests/auth';

function useLogout() {
  const router = useRouter();
  const resetUser = useClientStore((state) => state.resetUser);
  const query = useQueryClient();

  const handleLogout = useCallback(() => {
    logout();
    resetUser();
    Promise.resolve().then(() => query.clear());

    router.push(LOGIN_LINK);
  }, []);

  return handleLogout;
}

export default useLogout;
