export const getUserInfo = () => {
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
  username && sessionStorage.setItem('username', username);
  img && sessionStorage.setItem('img', img);
};
