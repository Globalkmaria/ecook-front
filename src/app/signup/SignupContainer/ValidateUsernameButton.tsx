import { useTransition } from 'react';

import Button from '@/components/Button';

import { checkUsernameAvailability } from '@/services/requests/users';

import { validateSignupUsernameAndAlert } from './helper';
import style from './style.module.scss';

interface ValidateUsernameButtonProps {
  isUsernameValid: boolean;
  setIsUsernameValid: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  isLoadingSignup: boolean;
}

function ValidateUsernameButton({
  isUsernameValid,
  setIsUsernameValid,
  username,
  isLoadingSignup,
}: ValidateUsernameButtonProps) {
  const [isLoading, startTransition] = useTransition();

  const disableCheckUsernameButton = isLoadingSignup || isLoading;
  const validateUsernameButtonVariant = isUsernameValid
    ? 'success'
    : 'secondary';
  const buttonText = isUsernameValid ? 'Available' : 'Check Availability';

  const onValidateUsername = async () => {
    if (isUsernameValid) return;
    if (isLoadingSignup || isLoading) return;

    if (!validateSignupUsernameAndAlert(username)) {
      setIsUsernameValid(false);
      return;
    }

    startTransition(async () => {
      const result = await checkUsernameAvailability(username);

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
    });
  };
  return (
    <Button
      variant={validateUsernameButtonVariant}
      className={style['valid-button']}
      onClick={onValidateUsername}
      disabled={disableCheckUsernameButton}
    >
      {buttonText}
    </Button>
  );
}

export default ValidateUsernameButton;

const USERNAME_IS_TAKEN_MESSAGE =
  'Username is already taken. Please try another one.';
