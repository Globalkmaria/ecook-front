import { FetchResult } from '../type';

function withSafeAsync<T>(
  fn: (...args: any) => FetchResult<T>,
  defaultData?: T,
): (...args: any) => FetchResult<T> {
  return async function (...args: any): FetchResult<T> {
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
