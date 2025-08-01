'use client';

import { useCallback, useState, useTransition } from 'react';

import Link from 'next/link';

import { createInputHandler } from '@/utils/createInputHandler';

import { LOGIN_LINK } from '@/helpers/links';

import ImageUploader from '@/components/imageUploader';
import { ImageFileType } from '@/components/imageUploader/helper';
import { Input } from '@/components/Input';

import SignupSubmitButton from './SignupSubmitButton';
import style from './style.module.scss';
import ValidateUsernameButton from './ValidateUsernameButton';

export interface SignupFormState {
  username: string;
  email: string;
  password: string;
  name: string;
  img: ImageFileType;
}

export const initialSignupFormState: SignupFormState = {
  username: '',
  email: '',
  password: '',
  name: '',
  img: null,
};

function SignupContainer() {
  const [isLoadingSignup, startTransitionSignup] = useTransition();
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [form, setForm] = useState({
    ...initialSignupFormState,
  });

  const onChange = createInputHandler(setForm);

  const onImgChange = useCallback((img: ImageFileType) => {
    // Accept both File objects and ImageWithUrl objects
    setForm((prev) => ({ ...prev, img }));
  }, []);

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isUsernameValid && setIsUsernameValid(false);
    onChange(e);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <h1>Sign up to E-COOK</h1>
        <div className={style.form}>
          <div>
            <div className={style['img-uploader']}>
              <ImageUploader
                onChange={onImgChange}
                imgValue={form.img}
                mode='new'
                optimizeImageOptions={{
                  maxSizeMB: 0.1,
                  maxWidthOrHeight: 300,
                }}
              />
            </div>
            <span className={style['helper-text']}>* Image is optional</span>
          </div>

          <fieldset>
            <label htmlFor='username'>Username</label>
            <div className={style['username']}>
              <Input
                className={style['text-input']}
                type='text'
                id='username'
                name='username'
                onChange={onUsernameChange}
                value={form.username}
              />
              <ValidateUsernameButton
                isUsernameValid={isUsernameValid}
                setIsUsernameValid={setIsUsernameValid}
                username={form.username}
                isLoadingSignup={isLoadingSignup}
              />
            </div>
          </fieldset>
          {INFO_ITEMS.map(({ value, label }) => (
            <fieldset key={value}>
              <label htmlFor={value}>{label}</label>
              <Input
                className={style['text-input']}
                type={value === 'password' ? 'password' : 'text'}
                id={value}
                name={value}
                autoComplete={value}
                onChange={onChange}
                value={form[value]}
              />
            </fieldset>
          ))}

          <SignupSubmitButton
            isLoadingSignup={isLoadingSignup}
            form={form}
            isUsernameValid={isUsernameValid}
            startTransitionSignup={startTransitionSignup}
          />

          <div className={style.register}>
            <p>Already have an account?</p>
            <Link href={LOGIN_LINK}>Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupContainer;

const INFO_ITEMS: {
  value: keyof Omit<SignupFormState, 'img'>;
  label: string;
}[] = [
  { value: 'name', label: 'Name' },
  { value: 'email', label: 'Email' },
  { value: 'password', label: 'Password' },
];
