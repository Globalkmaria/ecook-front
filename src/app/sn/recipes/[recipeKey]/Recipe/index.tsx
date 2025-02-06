'use client';

import Link from 'next/link';
import { useState } from 'react';

import style from './style.module.scss';

import { RecipeDetail } from '@/services/recipe/type';
import { formatTime } from '@/utils/time';

import { getSearchTagLink, getUserLink } from '@/helpers/links';

import { Tab, TabsContainer } from '@/components/Tab';
import Avatar from '@/components/Avatar';
import CustomImage from '@/components/CustomImage';
import { getListCheckboxInitialState } from '@/components/CheckboxList/helper';
import AnchorChips from '@/components/AnchorChip';

import Ingredients from './IngredientList';
import { RECIPE_TABS, RecipeTab } from '../const';
import StepList from './StepList';
import BookmarkButton from './BookmarkButton';

interface Props {
  recipe: RecipeDetail;
}

function Recipe({ recipe }: Props) {
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
        <BookmarkButton />
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

          <ContentBody recipe={recipe} />
        </div>
      </div>
    </section>
  );
}

export default Recipe;

function ContentBody({ recipe }: { recipe: RecipeDetail }) {
  const [tab, setTab] = useState<RecipeTab>('Ingredients');
  const stepsState = useState(getListCheckboxInitialState(recipe.steps));
  const ingredientsState = useState(
    getListCheckboxInitialState(recipe.ingredients),
  );

  return (
    <div className={style['content__body']}>
      <TabsContainer>
        {RECIPE_TABS.map((item, index) => (
          <Tab key={item} index={index} onClick={() => setTab(item)}>
            {item}
          </Tab>
        ))}
      </TabsContainer>

      <div className={style.info}>
        {tab === 'Ingredients' && (
          <Ingredients
            ingredients={recipe.ingredients}
            state={ingredientsState}
          />
        )}
        {tab === 'Steps' && (
          <StepList state={stepsState} steps={recipe.steps} />
        )}
      </div>
    </div>
  );
}
