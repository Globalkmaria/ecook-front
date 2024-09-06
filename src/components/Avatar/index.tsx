import Image from 'next/image';

import style from './style.module.scss';

interface AvatarProps {
  user: {
    img?: string;
    username: string;
  };
}

function Avatar({ user: { img, username } }: AvatarProps) {
  return (
    <div className={style.avatar}>
      <div className={style['img-box']}>
        {img ? (
          <Image src={img} alt={username} width={32} height={32} />
        ) : (
          <span className={style['username-img']}>{username[0]}</span>
        )}
      </div>

      <div className={style.username}>{username}</div>
    </div>
  );
}

export default Avatar;
