import style from './style.module.scss';

import Link from 'next/link';

import { RecipeSimple } from '@/services/requests/recipe/type';

import { formatTime } from '@/utils/time';

import { getRecipeLink } from '@/helpers/links';

import Avatar from '@/components/Avatar';
import Chip2 from '@/components/Chip2';
import CustomImage from '@/components/CustomImage';
import Skeleton from '@/components/Skeleton';

interface Props {
  recipe: RecipeSimple;
}

function Card({ recipe }: Props) {
  const time = formatTime({ hours: recipe.hours, minutes: recipe.minutes });
  const link = getRecipeLink(recipe.key);

  return (
    <div className={style['wrapper']}>
      <Link href={link} className={style.card}>
        <div className={style['top-overlay']}>
          <div className={style['avatar']}>
            <Avatar user={recipe.user} />
          </div>
        </div>
        <div className={style['img-box']}>
          <div className={style['img-wrapper']}>
            <CustomImage
              loadingClassName={style['img-placeholder']}
              imgClassName={style.img}
              src={recipe.img}
              alt={recipe.name}
              fill
            />
          </div>
        </div>

        <div className={style.info}>
          <span className={style.title}>{recipe.name}</span>
          <span className={style.time}>{time}</span>

          <Chip2.Container>
            {recipe.tags.map((tag) => (
              <Chip2.Chip key={tag.id}>{tag.name}</Chip2.Chip>
            ))}
          </Chip2.Container>
        </div>
      </Link>
    </div>
  );
}

export function CardSkeleton() {
  const joinedClassNames = `${style['card']} ${style['skeleton']}`;
  return (
    <div className={style['wrapper']}>
      <div className={joinedClassNames}>
        <Skeleton />
      </div>
    </div>
  );
}

const RecipeImgAndInfoCard = {
  Card,
  Skeleton: CardSkeleton,
};

export default RecipeImgAndInfoCard;
