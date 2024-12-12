'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import style from './style.module.scss';

import { logout } from '@/service/auth';

import { getUserInfo } from '@/helpers/auth';

import { AvatarImg } from '@/components/Avatar';
import Anchor from '@/components/Anchor';
import { Dropbox, DropboxItem, DropboxWrapper } from '@/components/Dropbox';
import Icon from '@/components/Icon';

function NavRightButtons() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [isLoading, startTransition] = useTransition();

  const { username, img } = getUserInfo();
  const isLoggedIn = username !== null;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  if (!isClient) return null;

  const onLogout = async () => {
    if (isLoading) return;

    startTransition(async () => {
      await logout();
      sessionStorage.clear();
      router.push('/');
    });
  };

  return (
    <div className={style['right-buttons']}>
      {isLoggedIn ? (
        <>
          <Anchor href='/recipes/new' className={style.new}>
            <Icon icon='add' className={style['new__icon']} />
            <span className={style['new__text']}>New recipes</span>
          </Anchor>
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
                <DropboxItem disabled={isLoading} onClick={onLogout}>
                  Logout
                </DropboxItem>
              </Dropbox>
            </DropboxWrapper>
          </div>
        </>
      ) : (
        <>
          <Anchor variant='secondary' href='/signup'>
            Sign up
          </Anchor>
          <Anchor href='/login'>Login</Anchor>
        </>
      )}
    </div>
  );
}

export default NavRightButtons;
