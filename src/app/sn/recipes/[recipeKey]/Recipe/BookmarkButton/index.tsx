'use client';

import style from './style.module.scss';

import { useClientStore } from '@/providers/client-store-provider';

import { IconType } from '@/components/Icon/const';
import IconButton from '@/components/IconButton';

function BookmarkButton() {
  const isLoggedIn = useClientStore((state) => state.user.isLoggedIn);
  const saved = true;

  const icon: IconType = saved ? 'bookmarkFill' : 'bookmarkOutline';

  const onClick = () => {
    if (!isLoggedIn) {
      alert('Please login to use bookmark');
      return;
    }

    if (saved) {
      // Remove from bookmark API
    } else {
      // Add to bookmark API
    }
  };

  return (
    <IconButton icon={icon} onClick={onClick} className={style['button']} />
  );
}

export default BookmarkButton;
