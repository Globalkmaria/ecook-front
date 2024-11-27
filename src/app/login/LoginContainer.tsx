'use client';

import { MouseEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import style from './LoginContainer.module.scss';

import { useUserStore } from '@/providers/user-store-provider';

import { login } from '@/service/auth';

import Button from '@/components/Button';
import { Input } from '@/components/Input';

function LoginContainer() {
  const router = useRouter();
  const { setUser } = useUserStore((store) => store);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onLogin: MouseEventHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    const result = await login({ username, password });

    if (!result.ok) {
      alert(result.error);
      setIsLoading(false);
      return;
    }

    setUser({
      username: result.data.username,
      img: result.data.img,
    });

    router.push('/');
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <h1>Sign in to E-COOK</h1>
        <form className={style.form}>
          <fieldset>
            <label htmlFor='username'>Username</label>
            <Input
              type='text'
              id='username'
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </fieldset>
          <fieldset>
            <label htmlFor='password'>Password</label>
            <Input
              type='password'
              id='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </fieldset>

          <Button type='submit' disabled={isLoading} onClick={onLogin}>
            Sign In
          </Button>

          <div className={style.register}>
            <p>Don't have an account?</p>
            <Link href='/signup'>Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginContainer;

const USER = {
  id: 1,
  username: 'johndoe',
  img: '/img/img1.png',
};
