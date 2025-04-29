'use client';

import { useState } from 'react';

import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';

import { recipeOptions } from '@/queries/options';

import { formatTime } from '@/utils/time';

import { getSearchTagLink, getUserLink } from '@/helpers/links';

import AnchorChips from '@/components/AnchorChip';
import Avatar from '@/components/Avatar';
import { getListCheckboxInitialState } from '@/components/CheckboxList/helper';
import CustomImage from '@/components/CustomImage';
import { Tab, TabGroup, TabsContainer, useTabContext } from '@/components/Tab';

import CopyLinkButton from '@/app/components/common/CopyLinkButton';
import { SuspenseQuery } from '@/app/components/common/SuspenseQuery';

import { RecipeDetail } from '@/services/requests/recipe/type';

import BookmarkButton from './BookmarkButton';
import Ingredients from './IngredientList';
import StepList from './StepList';
import style from './style.module.scss';
import { RecipePageParams } from '../page';

function Recipe() {
  const { recipeKey } = useParams<RecipePageParams>();
  return (
    <SuspenseQuery {...recipeOptions({ key: recipeKey })}>
      {(recipe) => <RecipeBody recipe={recipe} />}
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

  const userLink = getUserLink(recipe.user.username);

  return (
    <section className={style.wrapper}>
      <div className={style['header']}>
        <Link href={userLink}>
          <Avatar user={recipe.user} />
        </Link>
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

          <Content recipe={recipe} />
        </div>
      </div>
    </section>
  );
}

function Content({ recipe }: { recipe: RecipeDetail }) {
  return (
    <div className={style['content__body']}>
      <TabsContainer>
        <ContentInfo recipe={recipe} />
      </TabsContainer>
    </div>
  );
}

function ContentInfo({ recipe }: { recipe: RecipeDetail }) {
  const { selectedIndex } = useTabContext();
  const stepsState = useState(getListCheckboxInitialState(recipe.steps));
  const ingredientsState = useState(
    getListCheckboxInitialState(recipe.ingredients),
  );

  return (
    <>
      <TabGroup>
        {TABS.map((item, index) => (
          <Tab key={index} index={index}>
            {item.label}
          </Tab>
        ))}
      </TabGroup>
      <div className={style.info}>
        {selectedIndex === 0 && (
          <Ingredients
            ingredients={recipe.ingredients}
            state={ingredientsState}
          />
        )}
        {selectedIndex === 1 && (
          <StepList state={stepsState} steps={recipe.steps} />
        )}
      </div>
    </>
  );
}

const TABS = [
  {
    label: 'Ingredients',
  },
  {
    label: 'Steps',
  },
];
