import { ImageProps } from 'next/image';
import Link from 'next/link';

import { getRecipeLink } from '@/helpers/links';

import { RecipeDetail } from '@/services/requests/recipe/type';

import style from './style.module.scss';
import AvatarLink from '../Avatar/AvatarLink';
import CustomImage from '../CustomImage';
import Skeleton from '../Skeleton';

interface Data {
  name: string;
  key: string;
  img: string;
  user: RecipeDetail['user'];
}

export interface CardProps {
  data: Data;
  imageProps?: Omit<Partial<ImageProps>, 'src'>;
}

function Card({ data, imageProps }: CardProps) {
  const recipeLink = getRecipeLink(data.key);

  return (
    <div className={style['card']}>
      <div className={style['top-overlay']}>
        <AvatarLink user={data.user} />
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

export function CardLoading() {
  return (
    <div className={style['loading']}>
      <Skeleton />
    </div>
  );
}
