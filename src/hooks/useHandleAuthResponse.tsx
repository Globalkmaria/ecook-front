'use client';

import { FetchResult, FetchSuccessResult } from '@/service/type';
import { useRouter } from 'next/navigation';

type Props<T> = {
  request: FetchResult<T>;
  options: {
    onSuccess?: (res: FetchSuccessResult<T>) => void;
    onFailure?: (error: string) => void;
  };
};

function useHandleAuthResponse() {
  const router = useRouter();

  const handleAuthResponse = async <T,>({
    request,
    options,
  }: Props<T>): Promise<null> => {
    try {
      const response = await request;

      if (!response.ok) {
        if (response.res?.status === 401) {
          sessionStorage.clear();
          router.push('/login');
          return null;
        }
        if (options.onFailure)
          options.onFailure(response.error || 'An error occurred');
        else alert(response.error || 'An error occurred');
        return null;
      }

      if (options.onSuccess) options.onSuccess(response);

      return null;
    } catch (error) {
      alert('An unexpected error occurred');
      return null;
    }
  };

  return { handleAuthResponse };
}

export default useHandleAuthResponse;
