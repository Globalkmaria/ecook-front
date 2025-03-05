import { ImageProps } from 'next/image';
import Link from 'next/link';

import style from './style.module.scss';

import { getRecipeLink, getUserLink } from '@/helpers/links';

import CustomImage from '../CustomImage';
import Avatar from '../Avatar';

interface Data {
  name: string;
  key: string;
  img: string;
  user: {
    username: string;
    img?: string | null;
  };
}

export interface CardProps {
  data: Data;
  imageProps?: Omit<Partial<ImageProps>, 'src'>;
}

function Card({ data, imageProps }: CardProps) {
  const userLink = getUserLink(data.user.username);
  const recipeLink = getRecipeLink(data.key);

  return (
    <div className={style['card']}>
      <div className={style['top-overlay']}>
        <Link href={userLink} className={style['avatar']}>
          <Avatar user={data.user} />
        </Link>
      </div>
      <Link scroll={false} href={recipeLink} className={style['img-link']}>
        <CustomImage
          src={data.img}
          fill
          alt={data.name}
          imgClassName={style['img']}
          {...imageProps}
        />
        <div className={style['hover-darker']} />
        <div className={style['bottom-overlay']}>
          <span className={style['text']}>{data.name}</span>
        </div>
      </Link>
    </div>
  );
}

export default Card;
