'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/shallow';
import { useQueryClient } from '@tanstack/react-query';

import style from './style.module.scss';

import { useClientStore } from '@/providers/client-store-provider';

import { logout } from '@/services/requests/auth';

import {
  NEW_RECIPE_LINK,
  getUserLink,
  HOME_LINK,
  LOGIN_LINK,
  SIGNUP_LINK,
  BOOKMARKS_LINK,
  CARTS_LINK,
} from '@/helpers/links';

import { AvatarImg } from '@/components/Avatar';
import Anchor from '@/components/Anchor';
import { Dropbox, DropboxItem, DropboxWrapper } from '@/components/Dropbox';
import Icon from '@/components/Icon';

function NavRightButtons() {
  const user = useClientStore(useShallow((state) => state.user));

  if (!user.isLoggedIn) return <NotLoggedInMenu />;

  return <LoggedInMenu />;
}

export default NavRightButtons;

function LoggedInMenu() {
  const query = useQueryClient();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [resetUser, user] = useClientStore(
    useShallow((state) => [state.resetUser, state.user]),
  );

  const userImgInfo = {
    username: user.username ?? '',
    img: user.img,
  };

  const onLogout = async () => {
    logout();
    resetUser();
    Promise.resolve().then(() => query.clear());

    router.push(HOME_LINK);
  };

  return (
    <div className={style['right-buttons']}>
      <Anchor variant='secondary' href={CARTS_LINK}>
        <Icon icon='cart' />
      </Anchor>
      <Anchor variant='secondary' href={BOOKMARKS_LINK}>
        <Icon icon='book' />
      </Anchor>
      <Anchor href={NEW_RECIPE_LINK} className={style.new}>
        <Icon icon='add' className={style['new__icon']} />
        <span className={style['new__text']}>New recipes</span>
      </Anchor>
      <div className={style.profile}>
        <Link href={getUserLink(user.username ?? '')}>
          <AvatarImg user={userImgInfo} size={48} hoverable />
        </Link>
        <DropboxWrapper ref={ref}>
          <Dropbox className={style['profile-dropbox']} containerRef={ref}>
            <DropboxItem onClick={onLogout}>Logout</DropboxItem>
          </Dropbox>
        </DropboxWrapper>
      </div>
    </div>
  );
}

function NotLoggedInMenu() {
  return (
    <div className={style['right-buttons']}>
      <Anchor variant='secondary' href={CARTS_LINK}>
        <Icon icon='cart' />
      </Anchor>
      <Anchor variant='secondary' href={BOOKMARKS_LINK}>
        <Icon icon='book' />
      </Anchor>
      <Anchor variant='secondary' href={SIGNUP_LINK}>
        Sign up
      </Anchor>
      <Anchor href={LOGIN_LINK}>Login</Anchor>
    </div>
  );
}
