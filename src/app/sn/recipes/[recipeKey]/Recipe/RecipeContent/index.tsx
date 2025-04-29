import { useState } from 'react';

import { getListCheckboxInitialState } from '@/components/CheckboxList/helper';
import { Tab, TabGroup, TabsContainer, useTabContext } from '@/components/Tab';

import { RecipeDetail } from '@/services/requests/recipe/type';

import Ingredients from '../IngredientList';
import StepList from '../StepList';
import style from './style.module.scss';

function RecipeContent({ recipe }: { recipe: RecipeDetail }) {
  return (
    <div className={style['content__body']}>
      <TabsContainer>
        <ContentInfo recipe={recipe} />
      </TabsContainer>
    </div>
  );
}

export default RecipeContent;

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
