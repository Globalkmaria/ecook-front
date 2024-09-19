export type FetchResult<T> = Promise<
  | {
      data: T;
      ok: true;
    }
  | {
      error?: string;
      ok: false;
      data?: T;
    }
>;
