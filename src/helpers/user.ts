import { assertBrowser } from '@/utils/checkWindow';

export const getUserInfo = () => {
  if (typeof window === 'undefined') {
    return {
      username: null,
      img: null,
    };
  }
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
  if (typeof window === 'undefined') return;

  username && sessionStorage.setItem('username', username);
  img && sessionStorage.setItem('img', img);
};
