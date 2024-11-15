import Image from 'next/image';

import style from './style.module.scss';

interface AvatarProps {
  user: {
    img: string | null;
    username: string;
  };
  size?: number;
}

function Avatar({ user: { img, username }, size = 32 }: AvatarProps) {
  return (
    <div className={style.avatar}>
      <div className={style['img-box']}>
        {img ? (
          <Image src={img} alt={username} width={size} height={size} />
        ) : (
          <span className={style['username-img']}>{username[0]}</span>
        )}
      </div>

      <div className={style.username}>{username}</div>
    </div>
  );
}

export default Avatar;

export function AvatarImg({ user: { img, username }, size = 32 }: AvatarProps) {
  return (
    <div className={style.avatar}>
      <div className={style['img-box']}>
        {img ? (
          <Image src={img} alt={username} width={size} height={size} />
        ) : (
          <span className={style['username-img']}>{username[0]}</span>
        )}
      </div>
    </div>
  );
}
