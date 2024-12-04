'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import style from './style.module.scss';

import { signup } from '@/service/auth';
import { isUsernameAvailable } from '@/service/users';

import { createInputHandler } from '@/utils/createInputHandler';
import { saveUerInfo } from '@/helpers/user';

import Button from '@/components/Button';
import { Input } from '@/components/Input';
import ImageUploader from '@/components/imageUploader';

import {
  checkAllFieldsAreFilled,
  getSignupFormData,
  INVALID_EMAIL_MESSAGE,
  INVALID_PASSWORD_MESSAGE,
  INVALID_USERNAME_MESSAGE,
  validateEmail,
  validatePassword,
  validateUsername,
} from './helper';

export interface SignupFormState {
  username: string;
  email: string;
  password: string;
  name: string;
  img: File | null;
}

function SignupContainer() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [isUsernameValid, setIsUsernameValid] = useState(false);

  const [form, setForm] = useState<SignupFormState>({
    username: '',
    email: '',
    password: '',
    name: '',
    img: null,
  });

  const onChange = createInputHandler(setForm);

  const onImgChange = useCallback((img: File | null) => {
    setForm((prev) => ({ ...prev, img }));
  }, []);

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isUsernameValid && setIsUsernameValid(false);
    onChange(e);
  };

  const onSignup = async () => {
    if (isLoading) return;
    setIsLoading(true);

    if (!isUsernameValid) {
      alert('Please validate username');
      setIsLoading(false);
      return;
    }

    if (!checkAllFieldsAreFilled(form)) {
      alert('Please fill all fields');
      setIsLoading(false);
      return;
    }

    if (!validatePassword(form.password)) {
      alert(INVALID_PASSWORD_MESSAGE);
      setIsLoading(false);
      return;
    }

    if (!validateEmail(form.email)) {
      alert(INVALID_EMAIL_MESSAGE);
      setIsLoading(false);
      return;
    }

    const formData = getSignupFormData(form);
    const result = await signup(formData);

    setIsLoading(false);
    if (!result.ok) {
      alert(result.error);
      return;
    }

    saveUerInfo({
      username: result.data.username,
      img: result.data.img,
    });

    router.push('/');
  };

  const onValidateUsername = async () => {
    if (!form.username) {
      alert('Please enter a username');
      return;
    }

    if (!validateUsername(form.username)) {
      alert(INVALID_USERNAME_MESSAGE);
      return;
    }

    const result = await isUsernameAvailable(form.username);

    if (!result.ok) {
      alert(result.error);
      return;
    }

    if (!result.data.isAvailable) {
      alert('Username is already taken. Please try another one.');
      setIsUsernameValid(false);
      return;
    }

    setIsUsernameValid(true);
  };

  const validateUsernameButtonVariant = isUsernameValid
    ? 'success'
    : 'secondary';
  const submitButtonText = isLoading ? 'Creating Account...' : 'Create Account';

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <h1>Sign up to E-COOK</h1>
        <div className={style.form}>
          <div className={style['img-uploader']}>
            <ImageUploader
              onChange={onImgChange}
              imgValue={form.img}
              maxSizeKB={200}
            />
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
              <Button
                variant={validateUsernameButtonVariant}
                className={style['valid-button']}
                onClick={onValidateUsername}
              >
                Check Availability
              </Button>
            </div>
          </fieldset>
          <fieldset>
            <label htmlFor='name'>Name</label>
            <Input
              className={style['text-input']}
              type='text'
              id='name'
              name='name'
              autoComplete='name'
              onChange={onChange}
              value={form.name}
            />
          </fieldset>
          <fieldset>
            <label htmlFor='email'>Email</label>
            <Input
              autoComplete='email'
              className={style['text-input']}
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
              className={style['text-input']}
              name='password'
              type='password'
              id='password'
              onChange={onChange}
              value={form.password}
            />
          </fieldset>

          <Button
            onClick={onSignup}
            className={style['submit-btn']}
            disabled={isLoading}
          >
            {submitButtonText}
          </Button>

          <div className={style.register}>
            <p>Already have an account?</p>
            <Link href='/login'>Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupContainer;
