'use client';

import Link from 'next/link';
import { useUserStore } from '@/providers/user-store-provider';

import style from './Nav.module.scss';

import { AvatarImg } from '@/components/Avatar';
import Anchor from '@/components/Anchor';
import { Dropbox, DropboxItem, DropboxWrapper } from '@/components/Dropbox';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

function NavRightButtons() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { username, resetUser } = useUserStore((store) => store);
  const isLogged = username !== null;

  const onLogout = () => {
    resetUser();
    router.push('/');
  };

  return (
    <div className={style['right-buttons']}>
      {isLogged ? (
        <>
          <Anchor href='/recipes/new'>+ New recipes</Anchor>
          <div className={style.profile}>
            <Link href={`/users/${USER.username}`}>
              <AvatarImg user={USER} size={48} hoverable />
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

const USER = {
  id: 1,
  username: 'johndoe',
  img: '/img/img1.png',
};
