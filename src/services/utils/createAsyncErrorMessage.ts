const createAsyncErrorMessage = (res: Response, message: string) => {
  return `${message} ${res.status}: ${res.statusText}`;
};

export default createAsyncErrorMessage;
