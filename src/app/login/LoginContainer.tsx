'use client';

import { MouseEventHandler, useState, useTransition } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { HOME_LINK, SIGNUP_LINK } from '@/helpers/links';

import useResetNotLoggedInData from '@/hooks/useResetNotLoggedInData';

import Button from '@/components/Button';
import { Input } from '@/components/Input';

import { useClientStore } from '@/providers/client-store-provider';
import { login } from '@/services/requests/auth';

import style from './LoginContainer.module.scss';

function LoginContainer() {
  const router = useRouter();
  const resetNotLoggedInData = useResetNotLoggedInData();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, startTransition] = useTransition();
  const setUser = useClientStore((state) => state.setUser);

  const onLogin: MouseEventHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    if (!username || !password) {
      alert('Please fill in all fields');
      return;
    }

    startTransition(async () => {
      const result = await login({ username, password });

      if (!result.ok) {
        alert(result.error);
        return;
      }

      const user = {
        username: result.data.username,
        img: result.data.img ?? null,
      };
      setUser(user);
      resetNotLoggedInData();

      router.push(HOME_LINK);
    });
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
              autoComplete='current-password'
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
            <p>{`Don't have an account?`}</p>
            <Link href={SIGNUP_LINK}>Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginContainer;
