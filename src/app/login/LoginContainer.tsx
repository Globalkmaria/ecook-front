'use client';

import Button from '@/components/Button';
import { useUserStore } from '@/providers/user-store-provider';
import { useRouter } from 'next/navigation';

function LoginContainer() {
  const router = useRouter();
  const { setUser } = useUserStore((store) => store);

  const onLogin = () => {
    setUser(USER);
    router.push('/');
  };
  return (
    <div>
      <Button onClick={onLogin}>Login as John Doe</Button>
    </div>
  );
}

export default LoginContainer;

const USER = {
  id: 1,
  username: 'johndoe',
  img: '/img/img1.png',
};
