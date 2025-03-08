import { memo } from 'react';

import { joinClassNames } from '@/utils/style';

import CustomImage from '@/components/CustomImage';

import style from './style.module.scss';

interface AvatarProps {
  user: {
    img?: string | null;
    username: string;
  };
  size?: 32 | 48 | 64 | 100;
  hoverable?: boolean;
}

function Avatar({ user: { img, username }, size = 32 }: AvatarProps) {
  const joinedClassName = joinClassNames(
    style['img-box'],
    style['img-box--' + size],
  );
  return (
    <div className={style.avatar}>
      <div className={joinedClassName}>
        {img ? (
          <CustomImage src={img} alt={username} width={size} height={size} />
        ) : (
          <span className={style['username-img']}>{username[0]}</span>
        )}
      </div>

      <div className={style.username}>{username}</div>
    </div>
  );
}

export default memo(Avatar);

export const AvatarImg = memo(function AvatarImg({
  user: { img, username },
  size = 32,
  hoverable,
}: AvatarProps) {
  const coverClassName = joinClassNames(style['cover']);
  const joinedClassName = joinClassNames(
    style['img-box'],
    style['img-box--' + size],
  );

  return (
    <div className={style.avatar}>
      {hoverable ? <div className={coverClassName}></div> : null}
      <div className={joinedClassName}>
        {img ? (
          <CustomImage
            loadingClassName={style['img-placeholder']}
            src={img}
            alt={username}
            width={size}
            height={size}
          />
        ) : (
          <span className={style['username-img']}>{username[0]}</span>
        )}
      </div>
    </div>
  );
});
