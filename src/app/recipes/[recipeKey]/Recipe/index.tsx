'use client';

import Link from 'next/link';
import { useState } from 'react';

import style from './style.module.scss';

import { RecipeDetail } from '@/services/recipe/type';

import { formatTime } from '@/utils/time';

import { getSearchTagLink, getUserLink } from '@/helpers/link';

import Chip, { ChipsContainer } from '@/components/Chip';
import { Tab, TabsContainer } from '@/components/Tab';
import { getListCheckboxInitialState } from '@/components/helpers';
import CheckboxList from '@/components/CheckboxList';
import Avatar from '@/components/Avatar';
import AnchorUnderline from '@/components/Anchor/AnchorUnderline';
import CustomImage from '@/components/CustomImage';

import Ingredients from '../components/IngredientList';
import { RECIPE_TABS, RecipeTab } from '../const';

interface Props {
  recipe: RecipeDetail;
}

function Recipe({ recipe }: Props) {
  const [tab, setTab] = useState<RecipeTab>('Ingredients');
  const [ingredientsChecked, setIngredientsChecked] = useState(
    getListCheckboxInitialState(recipe.ingredients),
  );
  const [stepsChecked, setStepsChecked] = useState(
    getListCheckboxInitialState(recipe.steps),
  );

  if (!recipe) return null;

  const time = formatTime({
    hours: recipe.hours,
    minutes: recipe.minutes,
  });

  const userLink = getUserLink(recipe.user.username);

  const onIngredientsToggle = (id: number) =>
    setIngredientsChecked({
      ...ingredientsChecked,
      [id]: !ingredientsChecked[id],
    });

  const onStepsToggle = (id: number) =>
    setStepsChecked({ ...stepsChecked, [id]: !stepsChecked[id] });

  return (
    <section className={style.wrapper}>
      <div>
        <Link href={userLink}>
          <Avatar user={recipe.user} />
        </Link>
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
            <ChipsContainer className={style['chip-container']}>
              {recipe.tags.map((tag) => (
                <AnchorUnderline
                  href={getSearchTagLink(tag.name)}
                  key={tag.name}
                >
                  <Chip>{tag.name}</Chip>
                </AnchorUnderline>
              ))}
            </ChipsContainer>
          </div>
          <div className={style.time}>{time}</div>

          <div className={style['content__body']}>
            <TabsContainer>
              {RECIPE_TABS.map((item) => (
                <Tab
                  key={item}
                  selected={item === tab}
                  onClick={() => setTab(item)}
                >
                  {item}
                </Tab>
              ))}
            </TabsContainer>

            <div className={style.info}>
              {tab === 'Ingredients' && (
                <Ingredients
                  state={ingredientsChecked}
                  ingredients={recipe.ingredients}
                  onChange={onIngredientsToggle}
                />
              )}
              {tab === 'Steps' && (
                <CheckboxList
                  state={stepsChecked}
                  items={recipe.steps}
                  onChange={onStepsToggle}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Recipe;
