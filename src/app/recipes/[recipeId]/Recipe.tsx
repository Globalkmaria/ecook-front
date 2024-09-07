'use client';

import Image from 'next/image';
import { useState } from 'react';
import style from './Recipe.module.scss';

import Chip, { ChipsContainer } from '@/components/Chip';
import { Tab, TabsContainer } from '@/components/Tab';
import { getListCheckboxInitialState } from '@/components/helpers';

import { RECIPES } from '@/data/recipe';

import { RECIPE_TABS, RecipeTab } from './const';
import CheckboxList from '@/components/CheckboxList';
import Avatar from '@/components/Avatar';
import Ingredients from './components/IngredientList';

interface Props {
  recipeId: string;
}

function Recipe({ recipeId }: Props) {
  const recipe = recipeId ? RECIPES[recipeId] : null;
  const [tab, setTab] = useState<RecipeTab>('Ingredients');
  const [ingredientsChecked, setIngredientsChecked] = useState(
    getListCheckboxInitialState(recipe?.ingredients ?? []),
  );
  const [stepsChecked, setStepsChecked] = useState(
    getListCheckboxInitialState(recipe?.steps ?? []),
  );

  if (!recipe) return null;

  const onIngredientsToggle = (id: number) => {
    setIngredientsChecked({
      ...ingredientsChecked,
      [id]: !ingredientsChecked[id],
    });
  };

  const onStepsToggle = (id: number) => {
    setStepsChecked({ ...stepsChecked, [id]: !stepsChecked[id] });
  };

  return (
    <div className={style.wrapper}>
      <Avatar user={recipe.user} />
      <div className={style.container}>
        <div className={style['img-box']}>
          <Image src={`/img/img${recipeId}.png`} fill alt={recipe.name} />
        </div>

        <div className={style.content}>
          <div className={style['content__header']}>
            <span className={style['content__title']}>{recipe.name}</span>
            <ChipsContainer className={style['chip-container']}>
              {recipe.filters.map((chip) => (
                <Chip key={chip}>{chip}</Chip>
              ))}
            </ChipsContainer>
          </div>

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
    </div>
  );
}

export default Recipe;
