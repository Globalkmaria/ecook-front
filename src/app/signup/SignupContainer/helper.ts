import { SignupFormState } from '.';

export const validateUsername = (username: string) => {
  const regex = /^[a-zA-Z][a-zA-Z0-9_-]{4,100}$/;
  return regex.test(username);
};

export const validatePassword = (password: string) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const INVALID_USERNAME_MESSAGE =
  'Usernames must start with a letter, can include letters, numbers, underscores (_), or hyphens (-), and must be between 5 and 100 characters long.';
export const INVALID_PASSWORD_MESSAGE =
  'Your password does not meet the requirements. Please ensure it includes at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.';
export const INVALID_EMAIL_MESSAGE = 'Please enter a valid email address.';

export const checkAllFieldsAreFilled = (form: SignupFormState) =>
  Object.values(form).every((value) => value !== '');
