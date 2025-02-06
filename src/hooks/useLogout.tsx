import { useRouter } from 'next/navigation';

import { useClientStore } from '@/providers/client-store-provider';

import { LOGIN_LINK } from '@/helpers/links';

function useLogout() {
  const router = useRouter();
  const resetUser = useClientStore((state) => state.resetUser);

  const logout = () => {
    Promise.resolve().then(() => {
      resetUser();
      router.push(LOGIN_LINK);
    });
  };

  return logout;
}

export default useLogout;
