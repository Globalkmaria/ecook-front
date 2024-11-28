'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useUserStore } from '@/providers/user-store-provider';

import style from './style.module.scss';

import { logout } from '@/service/auth';

import { AvatarImg } from '@/components/Avatar';
import Anchor from '@/components/Anchor';
import { Dropbox, DropboxItem, DropboxWrapper } from '@/components/Dropbox';

function NavRightButtons() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { username, img, resetUser } = useUserStore((store) => store);
  const isLogged = username !== null;
  const [isLoading, setIsLoading] = useState(false);

  const onLogout = async () => {
    if (isLoading) return;
    setIsLoading(true);

    await logout();
    resetUser();
    router.push('/');
  };

  return (
    <div className={style['right-buttons']}>
      {isLogged ? (
        <>
          <Anchor href='/recipes/new'>+ New recipes</Anchor>
          <div className={style.profile}>
            <Link href={`/users/${username}`}>
              <AvatarImg
                user={{
                  img,
                  username,
                }}
                size={48}
                hoverable
              />
            </Link>
            <DropboxWrapper ref={ref}>
              <Dropbox className={style['profile-dropbox']} containerRef={ref}>
                <DropboxItem onClick={onLogout}>Logout</DropboxItem>
              </Dropbox>
            </DropboxWrapper>
          </div>
        </>
      ) : (
        <Anchor href='/login'>Login</Anchor>
      )}
    </div>
  );
}

export default NavRightButtons;
