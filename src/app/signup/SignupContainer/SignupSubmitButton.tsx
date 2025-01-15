import style from './style.module.scss';

import { useClientStore } from '@/providers/client-store-provider';

import { signup } from '@/services/auth';

import { getSignupFormData, validateSignupFormAndAlert } from './helper';

import { SignupFormState } from '.';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

interface Props {
  isLoadingSignup: boolean;
  form: SignupFormState;
  isUsernameValid: boolean;
  startTransitionSignup: (callback: () => Promise<void>) => void;
}

function SignupSubmitButton({
  isLoadingSignup,
  form,
  isUsernameValid,
  startTransitionSignup,
}: Props) {
  const router = useRouter();
  const setUser = useClientStore((state) => state.setUser);

  const submitButtonText = isLoadingSignup
    ? 'Creating Account...'
    : 'Create Account';

  const onSignup = async () => {
    if (isLoadingSignup) return;

    startTransitionSignup(async () => {
      if (!validateSignupFormAndAlert(isUsernameValid, form)) return;

      const formData = getSignupFormData(form);
      const result = await signup(formData);

      if (!result.ok) return alert(result.error);

      const user = {
        username: result.data.username,
        img: result.data.img ?? null,
      };
      setUser(user);

      router.push('/');
    });
  };

  return (
    <Button
      onClick={onSignup}
      className={style['submit-btn']}
      disabled={isLoadingSignup}
    >
      {submitButtonText}
    </Button>
  );
}

export default SignupSubmitButton;
