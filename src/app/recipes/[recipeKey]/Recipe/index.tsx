'use client';

import Link from 'next/link';
import { useState } from 'react';

import style from './style.module.scss';

import { RecipeDetail } from '@/services/recipe/type';
import { formatTime } from '@/utils/time';

import { getSearchTagLink, getUserLink } from '@/helpers/link';

import Chip, { ChipsContainer } from '@/components/Chip';
import { Tab, TabsContainer } from '@/components/Tab';
import Avatar from '@/components/Avatar';
import AnchorUnderline from '@/components/Anchor/AnchorUnderline';
import CustomImage from '@/components/CustomImage';

import Ingredients from '../components/IngredientList';
import { RECIPE_TABS, RecipeTab } from '../const';
import StepList from './StepList';

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

          <ContentBody recipe={recipe} />
        </div>
      </div>
    </section>
  );
}

export default Recipe;

function ContentBody({ recipe }: { recipe: RecipeDetail }) {
  const [tab, setTab] = useState<RecipeTab>('Ingredients');

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
          <Ingredients ingredients={recipe.ingredients} />
        )}
        {tab === 'Steps' && <StepList steps={recipe.steps} />}
      </div>
    </div>
  );
}
