export const getUserInfo = () => {
  if (typeof window !== 'undefined') {
    const username = sessionStorage.getItem('username');
    const img = sessionStorage.getItem('img');
    const isLoggedIn = username !== null;
    return { username, img, isLoggedIn };
  }
  return { username: null, img: null, isLoggedIn: false };
};

export const checkLoginStatus = (params: { username?: string }) => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('username') === params.username;
  }
  return false;
};
