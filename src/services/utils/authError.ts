export const UNAUTHORIZED_ERROR = 'UnauthorizedError';

export const isUnauthorizedError = (error?: Error | null): boolean =>
  error?.message === UNAUTHORIZED_ERROR;

export const isUnauthorizedResponse = (res?: Response): boolean =>
  res?.status === 401;

export const FORBIDDEN_ERROR = 'ForbiddenError';

export const isForbiddenError = (error?: Error | null): boolean =>
  error?.message === FORBIDDEN_ERROR;

export const isForbiddenResponse = (res?: Response): boolean =>
  res?.status === 403;

export const isAuthError = (error?: Error | null): boolean =>
  isUnauthorizedError(error) || isForbiddenError(error);
