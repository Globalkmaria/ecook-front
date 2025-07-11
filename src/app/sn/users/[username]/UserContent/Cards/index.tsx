'use client';

import { useMutationState } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { isPending, mutationKeys } from '@/queries/helpers';

import { formatTime } from '@/utils/time';

import { getRecipeLink } from '@/helpers/links';

import Chip, { ChipGroup } from '@/components/Chip';
import CustomImage from '@/components/CustomImage';
import Skeleton from '@/components/Skeleton';

import { RecipeSimple } from '@/services/requests/recipe/type';

import CardMenu from './CardMenu';
import style from './style.module.scss';

interface Props {
  recipes: RecipeSimple[];
}

function Cards({ recipes }: Props) {
  return (
    <ul className={style.list}>
      {recipes.map((recipe) => (
        <Card key={recipe.key} recipe={recipe} />
      ))}
    </ul>
  );
}

export default Cards;

interface CardProps {
  recipe: RecipeSimple;
}

function Card({ recipe }: CardProps) {
  const router = useRouter();
  const time = formatTime({ hours: recipe.hours, minutes: recipe.minutes });
  const recipeLink = getRecipeLink(recipe.key);

  const state = useMutationState({
    filters: {
      mutationKey: mutationKeys.recipes.recipe.delete(recipe.key),
      exact: true,
    },
    select: (state) => state.state,
  });

  const disableRecipeLink = isPending(state[0]);

  const onClick = () => {
    if (disableRecipeLink) return;
    router.push(recipeLink);
  };

  return (
    <li className={style.wrapper}>
      <div className={style['card-menu']}>
        <CardMenu recipeKey={recipe.key} />
      </div>

      <button
        type='button'
        onClick={onClick}
        className={style.card}
        disabled={disableRecipeLink}
      >
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
          <div className={style.chip}>
            <ChipGroup>
              {recipe.tags.map((tag) => (
                <Chip key={tag.name}>{tag.name}</Chip>
              ))}
            </ChipGroup>
          </div>
        </div>
      </button>
    </li>
  );
}

function CardSkeleton() {
  return (
    <li className={style.wrapper}>
      <div className={style.card}>
        <div className={style['img-box']}>
          <div className={style['img-wrapper']}>
            <Skeleton className={style['img-skeleton']} />
          </div>
        </div>

        <div className={style.info}>
          <div className={style['title-skeleton']}>
            <Skeleton border />
          </div>
          <div className={style['time-skeleton']}>
            <Skeleton border />
          </div>
          <div className={style['chip-skeleton-group']}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className={style['chip-skeleton']} border />
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}

export function CardListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <ul className={style.list}>
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </ul>
  );
}
