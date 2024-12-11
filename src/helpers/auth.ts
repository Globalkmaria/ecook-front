export const getUserInfo = () => {
  if (typeof window !== 'undefined') {
    const username = sessionStorage.getItem('username');
    const img = sessionStorage.getItem('img');
    return { username, img };
  }
  return { username: null, img: null };
};
