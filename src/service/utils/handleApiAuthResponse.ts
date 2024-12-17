'use client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { FetchOutcome } from '../type';

export const handleApiAuthResponse = <T>(
  response: FetchOutcome<T>,
  router: AppRouterInstance,
) => {
  if (!response.ok) {
    if (response.res?.status === 401) {
      sessionStorage.clear();
      router.push('/login');
      return null;
    }
  }

  return response;
};
