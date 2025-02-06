'use client';

import { useRouter } from 'next/navigation';

import { useClientStore } from '@/providers/client-store-provider';

import { LOGIN_LINK } from '@/helpers/links';
import { useQueryClient } from '@tanstack/react-query';

function useLogout() {
  const router = useRouter();
  const resetUser = useClientStore((state) => state.resetUser);
  const query = useQueryClient();

  const logout = () => {
    Promise.resolve().then(() => {
      resetUser();
      router.push(LOGIN_LINK);
      query.clear();
    });
  };

  return logout;
}

export default useLogout;
