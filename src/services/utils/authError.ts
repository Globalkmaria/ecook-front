export const UNAUTHORIZED_ERROR_CAUSE = 'UnauthorizedError';

export const checkIsUnauthorizedError = (error: Error | null): boolean =>
  error?.cause === UNAUTHORIZED_ERROR_CAUSE;

export const FORBIDDEN_ERROR_CAUSE = 'ForbiddenError';

export const checkIsForbiddenError = (error: Error | null): boolean =>
  error?.cause === FORBIDDEN_ERROR_CAUSE;

export const checkIsAuthError = (error: Error | null): boolean =>
  checkIsUnauthorizedError(error) || checkIsForbiddenError(error);
