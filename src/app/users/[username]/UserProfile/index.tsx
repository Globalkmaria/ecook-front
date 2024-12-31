'use client';

import { notFound, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import style from './style.module.scss';

import { profileOptions } from '@/query/profileOptions';

import { useUserStore } from '@/providers/user-store-provider';

import { AvatarImg } from '@/components/Avatar';

import { UserPageParams } from '../page';

function UserProfile() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const params = useParams<UserPageParams>();

  const {
    data: profile,
    error,
    isLoading,
  } = useQuery(
    profileOptions({
      username: params.username,
      enabled: isLoggedIn,
      staleTime: 180000, // 3 minutes
    }),
  );

  if (error || (isLoading && !profile)) return notFound();

  const imgUser = {
    username: profile?.username ?? '',
    img: profile?.img,
  };

  return (
    <header className={style.profile}>
      <div className={style.avatar}>
        <AvatarImg user={imgUser} size={100} />
      </div>
      <div className={style.info}>
        <span className={style.username}>{profile?.username}</span>
        <span>
          <span className={style.recipes}>{profile?.totalPosts}</span>
          {` recipes`}
        </span>
      </div>
    </header>
  );
}

export default UserProfile;
