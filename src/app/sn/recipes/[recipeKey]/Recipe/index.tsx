'use client';

import { notFound, useParams } from 'next/navigation';

import { recipeOptions } from '@/queries/options';

import { generateRecipeBreadcrumbs } from '@/utils/seo';
import { formatTime } from '@/utils/time';

import { getSearchTagLink } from '@/helpers/links';

import AnchorChips from '@/components/AnchorChip';
import AvatarLink from '@/components/Avatar/AvatarLink';
import CustomImage from '@/components/CustomImage';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import Skeleton from '@/components/Skeleton';

import CopyLinkButton from '@/app/components/common/CopyLinkButton';
import { SuspenseQuery } from '@/app/components/common/SuspenseQuery';

import { RecipeDetail } from '@/services/requests/recipe/type';

import BookmarkButton from './BookmarkButton';
import { RecipePageParams } from '../page';
import RecipeContent from './RecipeContent';
import RecipeSchema from './RecipeSchema';
import style from './style.module.scss';

function Recipe() {
  const { recipeKey } = useParams<RecipePageParams>();
  return (
    <SuspenseQuery
      {...recipeOptions({ key: recipeKey })}
      fallback={<RecipeContentSkeleton />}
    >
      {(recipe) => (
        <>
          <RecipeBody recipe={recipe} />
          <RecipeSchema recipe={recipe} />
          <BreadcrumbSchema items={generateRecipeBreadcrumbs(recipe)} />
        </>
      )}
    </SuspenseQuery>
  );
}

export default Recipe;

function RecipeBody({ recipe }: { recipe?: RecipeDetail }) {
  if (!recipe) return notFound();

  const time = formatTime({
    hours: recipe.hours,
    minutes: recipe.minutes,
  });

  return (
    <section className={style.wrapper}>
      <div className={style['header']}>
        <AvatarLink user={recipe.user} />
        <div className={style['header__info']}>
          <CopyLinkButton />
          <BookmarkButton recipeKey={recipe.key} />
        </div>
      </div>
      <div className={style.container}>
        <div className={style['img-box']}>
          <CustomImage
            className={style['img']}
            src={recipe.img}
            fill
            alt={recipe.name}
          />
        </div>

        <hr className={style['border']} />
        <div className={style.content}>
          <div className={style['content__header']}>
            <span className={style['content__title']}>{recipe.name}</span>
            <p className={style['content__description']}>
              {recipe.description}
            </p>
            <AnchorChips.Container className={style['chip-container']}>
              {recipe.tags.map((tag) => (
                <AnchorChips.Chip
                  href={getSearchTagLink(tag.name)}
                  key={tag.name}
                >
                  {tag.name}
                </AnchorChips.Chip>
              ))}
            </AnchorChips.Container>
          </div>
          <div className={style.time}>{time}</div>
          <RecipeContent recipe={recipe} />
        </div>
      </div>
    </section>
  );
}

export function RecipeContentSkeleton() {
  return (
    <section className={style.wrapper}>
      <div className={style.header}>
        <div>
          <Skeleton className={style['avatar-skeleton']} border />
        </div>
      </div>

      <div className={style.container}>
        <div className={style['img-box']}>
          <Skeleton className={style['image-skeleton']} border />
        </div>

        <hr className={style.border} />

        <div className={style.content}>
          <div className={style['content__header']}>
            <Skeleton className={style['title-skeleton']} border />
            <Skeleton className={style['text-skeleton']} border />
            <Skeleton className={style['text-skeleton-2']} border />

            <div className={style['chip-container']}>
              <div className={style['chip-container-skeleton']}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div className={style['chip-skeleton']} key={index}>
                    <Skeleton border />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={style.time}>
            <Skeleton className={style['time-skeleton']} border />
          </div>

          <div className={style['content__body']}>
            <Skeleton className={style['content__body-skeleton']} border />
          </div>
        </div>
      </div>
    </section>
  );
}
