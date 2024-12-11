'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import style from './style.module.scss';

import { signup } from '@/service/auth';
import { isUsernameAvailable } from '@/service/users';

import { createInputHandler } from '@/utils/createInputHandler';

import Button from '@/components/Button';
import { Input } from '@/components/Input';
import ImageUploader from '@/components/imageUploader';

import {
  checkRequiredFieldsAreFilled,
  getSignupFormData,
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

export const initialSignupFormState: SignupFormState = {
  username: '',
  email: '',
  password: '',
  name: '',
  img: null,
};

function SignupContainer() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [isUsernameValid, setIsUsernameValid] = useState(false);

  const [form, setForm] = useState({
    ...initialSignupFormState,
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
      alert(VALIDATE_USERNAME_MESSAGE);
      setIsLoading(false);
      return;
    }

    if (!checkRequiredFieldsAreFilled(form)) {
      alert(INVALID_REQUIRED_FIELDS_MESSAGE);
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

    if (!result.ok) {
      alert(result.error);
      setIsLoading(false);
      return;
    }

    sessionStorage.setItem('username', result.data.username);
    result.data.img && sessionStorage.setItem('img', result.data.img);

    setIsLoading(false);
    router.push('/');
  };

  const onValidateUsername = async () => {
    if (!form.username) {
      alert(ENTER_USERNAME_MESSAGE);
      setIsUsernameValid(false);
      return;
    }

    if (!validateUsername(form.username)) {
      alert(INVALID_USERNAME_MESSAGE);
      setIsUsernameValid(false);
      return;
    }

    const result = await isUsernameAvailable(form.username);

    if (!result.ok) {
      alert(result.error);
      setIsUsernameValid(false);
      return;
    }

    if (!result.data.isAvailable) {
      alert(USERNAME_IS_TAKEN_MESSAGE);
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

const INFO_ITEMS: {
  value: keyof Omit<SignupFormState, 'img'>;
  label: string;
}[] = [
  { value: 'name', label: 'Name' },
  { value: 'email', label: 'Email' },
  { value: 'password', label: 'Password' },
];

const INVALID_USERNAME_MESSAGE =
  'Usernames must start with a letter, can include letters, numbers, underscores (_), or hyphens (-), and must be between 5 and 100 characters long.';
const INVALID_PASSWORD_MESSAGE =
  'Your password does not meet the requirements. Please ensure it includes at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.';
const INVALID_EMAIL_MESSAGE = 'Please enter a valid email address.';
const INVALID_REQUIRED_FIELDS_MESSAGE =
  'Username, name, email and password are required';
const VALIDATE_USERNAME_MESSAGE = 'Please validate username';
const ENTER_USERNAME_MESSAGE = 'Please enter a username';
const USERNAME_IS_TAKEN_MESSAGE =
  'Username is already taken. Please try another one.';
