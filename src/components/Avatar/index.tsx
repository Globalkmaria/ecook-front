import style from './style.module.scss';

import { joinClassNames } from '@/utils/style';
import CustomImage from '@/components/CustomImage';

interface AvatarProps {
  user: {
    img?: string | null;
    username: string;
  };
  size?: 32 | 48 | 64 | 100;
  hoverable?: boolean;
}

function Avatar({ user: { img, username }, size = 32 }: AvatarProps) {
  const userNameImgClassName = joinClassNames(
    style['username-img'],
    style['username-img--' + size],
  );
  return (
    <div className={style.avatar}>
      <div className={style['img-box']}>
        {img ? (
          <CustomImage src={img} alt={username} width={size} height={size} />
        ) : (
          <span className={userNameImgClassName}>{username[0]}</span>
        )}
      </div>

      <div className={style.username}>{username}</div>
    </div>
  );
}

export default Avatar;

export function AvatarImg({
  user: { img, username },
  size = 32,
  hoverable,
}: AvatarProps) {
  const coverClassName = joinClassNames(style['cover']);
  const userNameImgClassName = joinClassNames(
    style['username-img'],
    style['username-img--' + size],
  );

  return (
    <div className={style.avatar}>
      {hoverable ? <div className={coverClassName}></div> : null}
      <div className={style['img-box']}>
        {img ? (
          <CustomImage src={img} alt={username} width={size} height={size} />
        ) : (
          <span className={userNameImgClassName}>{username[0]}</span>
        )}
      </div>
    </div>
  );
}
