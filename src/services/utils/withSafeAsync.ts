import { AsyncError } from '@/services/helpers';
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
      const message = getMessage(error);

      if (error instanceof AsyncError) {
        return {
          ok: false,
          error: message,
          data: defaultData,
          res: error.res,
        };
      }

      return {
        ok: false,
        error: message,
        data: defaultData,
      };
    }
  };
}

export default withSafeAsync;

const getMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'Error occurred while processing the request.';
};
