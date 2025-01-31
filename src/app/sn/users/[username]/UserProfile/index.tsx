'use client';

import { notFound, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import style from './style.module.scss';

import { profileOptions } from '@/queries/profileOptions';

import { useClientStore } from '@/providers/client-store-provider';

import { AvatarImg } from '@/components/Avatar';

import { UserPageParams } from '../page';

function UserProfile() {
  const params = useParams<UserPageParams>();
  const username = useClientStore((state) => state.user.username);
  const isUserProfile = params.username === username;

  const {
    data: profile,
    error,
    isLoading,
  } = useQuery(
    profileOptions({
      username: params.username,
      enabled: isUserProfile,
    }),
  );

  if (error || (isLoading && !profile)) return notFound();

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
      </div>
    </header>
  );
}

export default UserProfile;
