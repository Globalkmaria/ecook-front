import { ChangeEventHandler } from 'react';

export const withValidation = (
  validator: (value: string) => boolean,
  errorMessage: string,
  changeHandler: ChangeEventHandler<HTMLInputElement>,
): ChangeEventHandler<HTMLInputElement> => {
  return (e) => {
    if (!validator(e.target.value)) {
      alert(errorMessage);
      return;
    }
    changeHandler(e);
  };
};

export const withTextLengthLimit = (
  limit: number,
  name: string,
  changeHandler: ChangeEventHandler<HTMLInputElement>,
): ChangeEventHandler<HTMLInputElement> => {
  return withValidation(
    (value) => value.length <= limit,
    `${name} should not exceed ${limit} characters`,
    changeHandler,
  );
};

export const validateLengthAndExecute = (
  limit: number,
  name: string,
  value: string,
  onSuccess: () => void,
) => {
  if (value.length > limit) {
    alert(`${name} should not exceed ${limit} characters`);
    return;
  }

  onSuccess();
};

export const validatePositiveInteger = (value: string) => {
  if ((value.length && !/^\d+$/.test(value)) || Number(value) < 0) return false;

  return true;
};

export const validateWithAlertAndExecute = (
  validator: (value: string) => boolean,
  errorMessage: string,
  value: string,
  onSuccess: () => void,
) => {
  if (!validator(value)) {
    alert(errorMessage);
    return;
  }

  onSuccess();
};
