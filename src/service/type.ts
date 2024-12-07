export type FetchSuccessResult<T> = {
  data: T;
  ok: true;
};

type FetchErrorResult = {
  error?: string;
  ok: false;
  data?: any;
  res?: Response;
};

export type FetchResult<T> = Promise<FetchSuccessResult<T> | FetchErrorResult>;
