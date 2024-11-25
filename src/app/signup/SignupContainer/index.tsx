'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import style from './style.module.scss';

import { createInputHandler } from '@/utils/createInputHandler';

import Button from '@/components/Button';
import { Input } from '@/components/Input';

function SignupContainer() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const onChange = createInputHandler(setForm);

  const onSignup = () => {
    router.push('/');
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <h1>Sign up to E-COOK</h1>
        <form className={style.form}>
          <fieldset>
            <label htmlFor='username'>Username</label>
            <Input
              type='text'
              id='username'
              name='username'
              onChange={onChange}
              value={form.username}
            />
          </fieldset>
          <fieldset>
            <label htmlFor='email'>Email</label>
            <Input
              name='email'
              type='email'
              id='email'
              onChange={onChange}
              value={form.email}
            />
          </fieldset>
          <fieldset>
            <label htmlFor='password'>Password</label>
            <Input
              name='password'
              type='password'
              id='password'
              onChange={onChange}
              value={form.password}
            />
          </fieldset>

          <Button onClick={onSignup}>Create Account</Button>

          <div className={style.register}>
            <p>Already have an account?</p>
            <Link href='/login'>Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupContainer;
