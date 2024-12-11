export const getUserInfo = () => {
  if (typeof window !== 'undefined') {
    const username = sessionStorage.getItem('username');
    const img = sessionStorage.getItem('img');
    return { username, img };
  }
  return { username: null, img: null };
};

export const checkLoginStatus = (params: { username?: string }) => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('username') === params.username;
  }
  return false;
};
