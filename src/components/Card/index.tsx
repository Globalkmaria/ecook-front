import { ImageProps } from 'next/image';
import Link from 'next/link';

import style from './style.module.scss';

import { getRecipeLink } from '@/helpers/link';

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

interface CardProps {
  data: Data;
  imageProps?: Omit<Partial<ImageProps>, 'src'>;
}

function Card({ data, imageProps }: CardProps) {
  return (
    <Link
      scroll={false}
      href={getRecipeLink(data.key)}
      className={style['card']}
    >
      <CustomImage
        src={data.img}
        fill
        alt={data.name}
        imgClassName={style['img']}
        {...imageProps}
      />
      <div className={style['hover-darker']} />
      <div className={style['top-overlay']}>
        <Avatar user={data.user} />
      </div>
      <div className={style['bottom-overlay']}>
        <span className={style['text']}>{data.name}</span>
      </div>
    </Link>
  );
}

export default Card;
