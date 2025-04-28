'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';

import { profileOptions } from '@/queries/options';

import { AvatarImg } from '@/components/Avatar';

import CopyLinkButton from '@/app/components/common/CopyLinkButton';

import { useClientStore } from '@/providers/client-store-provider';

import style from './style.module.scss';
import { UserPageParams } from '../page';

function UserProfile() {
  const params = useParams<UserPageParams>();
  const username = useClientStore((state) => state.user.username);
  const isUserProfile = params.username === username;

  const { data: profile, error } = useQuery(
    profileOptions({
      username: params.username,
      enabled: isUserProfile,
    }),
  );

  if (error || !profile) return notFound();

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

export default UserProfile;
