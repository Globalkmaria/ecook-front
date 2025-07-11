import Link from 'next/link';

import { formatTime } from '@/utils/time';

import { getRecipeLink } from '@/helpers/links';

import AvatarLink from '@/components/Avatar/AvatarLink';
import Chip, { ChipGroup } from '@/components/Chip';
import CustomImage from '@/components/CustomImage';
import Skeleton from '@/components/Skeleton';

import { RecipeSimple } from '@/services/requests/recipe/type';

import style from './style.module.scss';

interface Props {
  recipe: RecipeSimple;
}

function Card({ recipe }: Props) {
  const time = formatTime({ hours: recipe.hours, minutes: recipe.minutes });
  const recipeLink = getRecipeLink(recipe.key);

  return (
    <div className={style['wrapper']}>
      <div className={style['top-overlay']}>
        <AvatarLink user={recipe.user} />
      </div>

      <Link href={recipeLink} className={style.card}>
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

          <ChipGroup>
            {recipe.tags.map((tag) => (
              <Chip key={tag.name}>{tag.name}</Chip>
            ))}
          </ChipGroup>
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
