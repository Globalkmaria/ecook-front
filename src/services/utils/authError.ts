export const UNAUTHORIZED_ERROR_CAUSE = 'UnauthorizedError';

export const checkIsUnauthorizedError = (error: Error | null): boolean => {
  return error?.cause === UNAUTHORIZED_ERROR_CAUSE;
};
