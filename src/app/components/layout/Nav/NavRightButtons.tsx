'use client';

import { useRef, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useUserStore } from '@/providers/user-store-provider';

import style from './style.module.scss';

import { logout } from '@/service/auth';

import { AuthenticatedUser } from '@/app/helper';

import { AvatarImg } from '@/components/Avatar';
import Anchor from '@/components/Anchor';
import { Dropbox, DropboxItem, DropboxWrapper } from '@/components/Dropbox';
import Icon from '@/components/Icon';

interface Props {
  user: AuthenticatedUser;
}

function NavRightButtons({ user }: Props) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [isLoading, startTransition] = useTransition();
  const resetUser = useUserStore((state) => state.resetUser);

  const onLogout = async () => {
    if (isLoading) return;

    startTransition(async () => {
      await logout();
      resetUser();
      router.push('/');
    });
  };

  return (
    <div className={style['right-buttons']}>
      {user.isLoggedIn ? (
        <>
          <Anchor href='/recipes/new' className={style.new}>
            <Icon icon='add' className={style['new__icon']} />
            <span className={style['new__text']}>New recipes</span>
          </Anchor>
          <div className={style.profile}>
            <Link href={`/users/${user.username}`}>
              <AvatarImg
                user={{
                  img: user.img,
                  username: user.username,
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
