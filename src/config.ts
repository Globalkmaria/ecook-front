const required = (key: string, defaultValue = undefined) => {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
};

export const config = {
  server: {
    url: required('NEXT_PUBLIC_SERVER_URL'),
  },
};
