'use client';

import { useEffect } from 'react';

import { notFound, useParams } from 'next/navigation';

import { profileOptions } from '@/queries/options';

import { AvatarImg } from '@/components/Avatar';
import Skeleton from '@/components/Skeleton';

import CopyLinkButton from '@/app/components/common/CopyLinkButton';
import { SuspenseQuery } from '@/app/components/common/SuspenseQuery';

import { useClientStore } from '@/providers/client-store-provider';
import { Profile } from '@/services/requests/users/type';

import style from './style.module.scss';
import { UserPageParams } from '../page';

function UserProfile() {
  const params = useParams<UserPageParams>();
  const username = useClientStore((state) => state.user.username);
  const isUserProfile = params.username === username;

  return (
    <SuspenseQuery
      {...profileOptions({
        username: params.username,
        enabled: isUserProfile,
        staleTime: isUserProfile ? 0 : 1000 * 60 * 60, // 1 hour
        gcTime: isUserProfile ? 0 : 1000 * 60 * 60, // 1 hour
      })}
      errorFallback={() => notFound()}
      fallback={<UserProfileBodySkeleton />}
    >
      {(profile) => <UserProfileBody profile={profile} />}
    </SuspenseQuery>
  );
}

export default UserProfile;

function UserProfileBody({ profile }: { profile: Profile }) {
  if (!profile) {
    notFound();
  }

  const userImgInfo = {
    username: profile?.username ?? '',
    img: profile?.img,
  };

  return (
    <header className={style.profile}>
      <div className={style.avatar}>
        <AvatarImg user={userImgInfo} size={100} />
      </div>
      <div className={style.info}>
        <span className={style.username}>{profile?.username}</span>
        <span>
          <span className={style.recipes}>{profile?.totalPosts}</span>
          {` recipes`}
        </span>
        <div>
          <CopyLinkButton />
        </div>
      </div>
    </header>
  );
}

function UserProfileBodySkeleton() {
  return (
    <header className={style.profile}>
      <div className={style.avatar}>
        <div className={style['avatar-skeleton']}>
          <Skeleton />
        </div>
      </div>
      <div className={style.info}>
        <div>
          <Skeleton className={style['username-skeleton']} border />
        </div>
        <div className={style['recipes-skeleton-wrapper']}>
          <div>
            <Skeleton className={style['recipes-skeleton']} border />
          </div>
        </div>
        <div>
          <Skeleton className={style['button-skeleton']} border />
        </div>
      </div>
    </header>
  );
}
