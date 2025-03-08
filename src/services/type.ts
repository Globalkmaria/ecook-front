type FetchSuccessResult<T = undefined> = T extends undefined
  ? { ok: true }
  : { data: T; ok: true };

type FetchErrorResult<T> = {
  error?: string;
  ok: false;
  data?: T;
  res?: Response;
};

type FetchOutcome<T> = FetchSuccessResult<T> | FetchErrorResult<T>;

export type FetchResult<T = undefined> = Promise<FetchOutcome<T>>;
