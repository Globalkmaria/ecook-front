'use client';

import { useRef, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/shallow';

import style from './style.module.scss';

import { useClientStore } from '@/providers/client-store-provider';

import { logout } from '@/services/auth';

import { AvatarImg } from '@/components/Avatar';
import Anchor from '@/components/Anchor';
import { Dropbox, DropboxItem, DropboxWrapper } from '@/components/Dropbox';
import Icon from '@/components/Icon';

function NavRightButtons() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [isLoading, startTransition] = useTransition();
  const [resetUser, user] = useClientStore(
    useShallow((state) => [state.resetUser, state.user]),
  );

  const userImgInfo = {
    username: user.username ?? '',
    img: user.img,
  };

  const onLogout = async () => {
    if (isLoading) return;

    startTransition(async () => {
      await logout();
      resetUser();
      router.push('/');
    });
  };

  if (!user.isLoggedIn) return <NotLoggedInMenu />;

  return (
    <div className={style['right-buttons']}>
      <Anchor href='/recipes/new' className={style.new}>
        <Icon icon='add' className={style['new__icon']} />
        <span className={style['new__text']}>New recipes</span>
      </Anchor>
      <div className={style.profile}>
        <Link href={`/users/${user.username}`}>
          <AvatarImg user={userImgInfo} size={48} hoverable />
        </Link>
        <DropboxWrapper ref={ref}>
          <Dropbox className={style['profile-dropbox']} containerRef={ref}>
            <DropboxItem disabled={isLoading} onClick={onLogout}>
              Logout
            </DropboxItem>
          </Dropbox>
        </DropboxWrapper>
      </div>
    </div>
  );
}

export default NavRightButtons;

function NotLoggedInMenu() {
  return (
    <div className={style['right-buttons']}>
      <Anchor variant='secondary' href='/signup'>
        Sign up
      </Anchor>
      <Anchor href='/login'>Login</Anchor>
    </div>
  );
}
