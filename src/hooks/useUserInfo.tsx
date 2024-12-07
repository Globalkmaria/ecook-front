'use client';

import { useLayoutEffect, useState } from 'react';

interface UserInfo {
  username: string | null;
  img: string | null;
}

function useUserInfo() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: null,
    img: null,
  });

  useLayoutEffect(() => {
    const username = sessionStorage.getItem('username');
    const img = sessionStorage.getItem('img');
    setUserInfo({ username, img });
  }, []);

  return userInfo;
}

export default useUserInfo;
