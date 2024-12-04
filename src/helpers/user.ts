import { assertBrowser } from '@/utils/checkWindow';

export const getUserInfo = () => {
  assertBrowser('getUserInfo');

  return {
    username: sessionStorage.getItem('username'),
    img: sessionStorage.getItem('img'),
  };
};

export const saveUerInfo = ({
  username,
  img,
}: {
  username?: string | null;
  img?: string | null;
}) => {
  assertBrowser('saveUerInfo');

  username && sessionStorage.setItem('username', username);
  img && sessionStorage.setItem('img', img);
};
