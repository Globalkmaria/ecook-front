'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { mutationKeys } from '@/queries/helpers';

import { HOME_LINK } from '@/helpers/links';

import useLogout from '@/hooks/useLogout';

import { deleteAccount } from '@/services/requests/auth';
import { DeleteAccountParams } from '@/services/requests/auth/type';
import { isUnauthorizedResponse } from '@/services/utils/authError';

export const useDeleteAccountMutation = () => {
  const logout = useLogout();
  const router = useRouter();

  const result = useMutation({
    mutationKey: mutationKeys.auth.deleteAccount(),
    mutationFn: async (props: DeleteAccountParams) => {
      const response = await deleteAccount(props);

      if (response.ok) return;

      if (isUnauthorizedResponse(response.res)) {
        logout();
        throw new Error('Please log in to use this feature.');
      }

      throw new Error('Failed to delete account');
    },
    onSuccess: () => {
      logout();

      router.push(HOME_LINK);
    },
    onError: (error) => alert(error.message),
    retry: 1,
    retryDelay: 1000, // 1 seconds
  });

  return result;
};
