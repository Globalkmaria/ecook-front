'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { mutationKeys } from '@/queries/helpers';

import { GOODBYE_LINK } from '@/helpers/links';

import useLogout from '@/hooks/useLogout';

import { useClientStore } from '@/providers/client-store-provider';
import { deleteAccount } from '@/services/requests/auth';
import { DeleteAccountParams } from '@/services/requests/auth/type';
import { isUnauthorizedResponse } from '@/services/utils/authError';

export const useDeleteAccountMutation = () => {
  const logout = useLogout();
  const router = useRouter();
  const resetUser = useClientStore((state) => state.resetUser);
  const query = useQueryClient();

  const result = useMutation({
    mutationKey: mutationKeys.auth.deleteAccount(),
    mutationFn: async (params: DeleteAccountParams) => {
      const response = await deleteAccount(params);

      if (response.ok) return;

      if (isUnauthorizedResponse(response.res)) {
        logout();
        throw new Error('Please log in to use this feature.');
      }

      throw new Error('Failed to delete account');
    },
    onSuccess: () => {
      // Set temporary token to allow goodbye page access
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('account_deleted', Date.now().toString());
      }

      resetUser();
      query.clear();

      router.push(GOODBYE_LINK);
    },
    onError: (error) => alert(error.message),
    retry: 1,
    retryDelay: 1000, // 1 seconds
  });

  return result;
};
