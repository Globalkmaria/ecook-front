import { initialSignupFormState, SignupFormState } from '.';

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

const optionalFields: (keyof SignupFormState)[] = ['img'];
export const checkRequiredFieldsAreFilled = (form: SignupFormState) =>
  Object.entries(form).every(
    ([key, value]) =>
      optionalFields.includes(key as keyof SignupFormState) || value !== '',
  );

export const getSignupFormData = (form: SignupFormState) => {
  const formData = new FormData();
  Object.entries(form).forEach(([key, value]) => formData.append(key, value));
  return formData;
};
