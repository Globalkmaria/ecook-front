'use client';

import { useRef } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/shallow';

import {
  NEW_RECIPE_LINK,
  getUserLink,
  HOME_LINK,
  LOGIN_LINK,
  SIGNUP_LINK,
  BOOKMARKS_LINK,
  CARTS_LINK,
  PANTRY_LINK,
  ACCOUNT_LINK,
} from '@/helpers/links';

import Anchor from '@/components/Anchor';
import { AvatarImg } from '@/components/Avatar';
import { Dropbox, DropboxItem, DropboxWrapper } from '@/components/Dropbox';
import Icon from '@/components/Icon';

import { useClientStore } from '@/providers/client-store-provider';
import { logout } from '@/services/requests/auth';

import style from './style.module.scss';

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

  const onAccountSettings = () => {
    router.push(ACCOUNT_LINK);
  };

  return (
    <div className={style['right-buttons']}>
      <Links />
      <Anchor
        href={NEW_RECIPE_LINK}
        className={style.new}
        title='Add new recipe'
      >
        <Icon icon='add' className={style['new__icon']} />
        <span className={style['new__text']}>New recipes</span>
      </Anchor>
      <div className={style.profile}>
        <Link
          href={getUserLink(user.username ?? '')}
          title='Profile'
          aria-label='Profile'
        >
          <AvatarImg user={userImgInfo} size={48} hoverable />
        </Link>
        <DropboxWrapper ref={ref}>
          <Dropbox className={style['profile-dropbox']} containerRef={ref}>
            <DropboxItem onClick={onLogout} title='logout' aria-label='logout'>
              Logout
            </DropboxItem>
            <DropboxItem
              onClick={onAccountSettings}
              title='Account Settings'
              aria-label='Account Settings'
            >
              Settings
            </DropboxItem>
          </Dropbox>
        </DropboxWrapper>
      </div>
    </div>
  );
}

function NotLoggedInMenu() {
  return (
    <div className={style['right-buttons']}>
      <Links />
      <Anchor
        variant='secondary'
        href={SIGNUP_LINK}
        title='Sign up'
        aria-label='Sign up'
      >
        Sign up
      </Anchor>
      <Anchor href={LOGIN_LINK} title='login' aria-label='login'>
        Login
      </Anchor>
    </div>
  );
}

function Links() {
  return (
    <>
      <Anchor
        variant='secondary'
        href={CARTS_LINK}
        title='Shopping cart'
        aria-label='Shopping cart'
      >
        <Icon icon='cart' />
      </Anchor>
      <Anchor
        variant='secondary'
        href={PANTRY_LINK}
        title='Pantry'
        aria-label='Pantry'
      >
        <Icon icon='cabinet' />
      </Anchor>
      <Anchor
        variant='secondary'
        href={BOOKMARKS_LINK}
        title='Bookmarks'
        aria-label='Bookmarks'
      >
        <Icon icon='book' />
      </Anchor>
    </>
  );
}
