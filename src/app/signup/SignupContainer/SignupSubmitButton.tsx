import { useRouter } from 'next/navigation';

import style from './style.module.scss';

import { useClientStore } from '@/providers/client-store-provider';

import { signup } from '@/services/requests/auth';

import { HOME_LINK } from '@/helpers/links';

import Button from '@/components/Button';

import { SignupFormState } from '.';
import { getSignupFormData, validateSignupFormAndAlert } from './helper';
import { useShallow } from 'zustand/shallow';

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
  const [setUser, resetBookmarks, resetCart] = useClientStore(
    useShallow((state) => [
      state.setUser,
      state.resetBookmarks,
      state.resetCart,
    ]),
  );

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
      resetBookmarks();
      resetCart();

      router.push(HOME_LINK);
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
