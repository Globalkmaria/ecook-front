import { initialSignupFormState, SignupFormState } from '.';

const validateUsername = (username: string) => {
  const regex = /^[a-zA-Z][a-zA-Z0-9_-]{4,100}$/;
  return regex.test(username);
};

const validatePassword = (password: string) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const optionalFields: (keyof SignupFormState)[] = ['img'];
const checkRequiredFieldsAreFilled = (form: SignupFormState) =>
  Object.entries(form).every(
    ([key, value]) =>
      optionalFields.includes(key as keyof SignupFormState) || value !== '',
  );

export const getSignupFormData = (form: SignupFormState) => {
  const formData = new FormData();
  Object.entries(form).forEach(([key, value]) => formData.append(key, value));
  return formData;
};

export const validateSignupFormAndAlert = (
  isUsernameValid: boolean,
  form: SignupFormState,
) => {
  if (!isUsernameValid) {
    alert(VALIDATE_USERNAME_MESSAGE);
    return false;
  }

  if (!checkRequiredFieldsAreFilled(form)) {
    alert(INVALID_REQUIRED_FIELDS_MESSAGE);
    return false;
  }

  if (!validateEmail(form.email)) {
    alert(INVALID_EMAIL_MESSAGE);
    return false;
  }

  if (!validatePassword(form.password)) {
    alert(INVALID_PASSWORD_MESSAGE);
    return false;
  }

  return true;
};

export const validateSignupUsernameAndAlert = (username: string) => {
  if (!username) {
    alert(ENTER_USERNAME_MESSAGE);
    return false;
  }

  if (!validateUsername(username)) {
    alert(INVALID_USERNAME_MESSAGE);
    return false;
  }

  return true;
};

const VALIDATE_USERNAME_MESSAGE = 'Please validate username';
const INVALID_PASSWORD_MESSAGE =
  'Your password does not meet the requirements. Please ensure it includes at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.';
const INVALID_EMAIL_MESSAGE = 'Please enter a valid email address.';
const INVALID_REQUIRED_FIELDS_MESSAGE =
  'Username, name, email and password are required';

const INVALID_USERNAME_MESSAGE =
  'Usernames must start with a letter, can include letters, numbers, underscores (_), or hyphens (-), and must be between 5 and 100 characters long.';
const ENTER_USERNAME_MESSAGE = 'Please enter a username';
