import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export type AuthenticatedUser =
  | {
      img: null;
      username: null;
      isLoggedIn: false;
    }
  | {
      img: null | string;
      username: string;
      isLoggedIn: true;
    };

export const parseUserFromCookies = (
  cookies: ReadonlyRequestCookies,
): AuthenticatedUser => {
  const username = cookies.get('username')?.value || null;
  const img = cookies.get('img')?.value || null;

  return username
    ? { username, img, isLoggedIn: true }
    : { username: null, img: null, isLoggedIn: false };
};
