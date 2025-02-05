import { FetchResult } from '../type';

function withSafeAsync<T, U extends V[], V>(
  fn: (...args: U) => FetchResult<T>,
  defaultData?: T,
): (...args: U) => FetchResult<T> {
  return async function (...args: U): FetchResult<T> {
    try {
      return await fn(...args);
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : 'Error occurred in fetching data',
        data: defaultData,
      };
    }
  };
}

export default withSafeAsync;
