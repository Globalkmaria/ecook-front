export type FetchSuccessResult<T = undefined> = T extends undefined
  ? { ok: true }
  : { data: T; ok: true };

type FetchErrorResult = {
  error?: string;
  ok: false;
  data?: any;
  res?: Response;
};

export type FetchOutcome<T> = FetchSuccessResult<T> | FetchErrorResult;

export type FetchResult<T = undefined> = Promise<FetchOutcome<T>>;
