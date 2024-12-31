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

export type FetchOutcome<T> = FetchSuccessResult<T> | FetchErrorResult;

export type FetchResult<T> = Promise<FetchOutcome<T>>;
