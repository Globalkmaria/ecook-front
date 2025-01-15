import { memo, useCallback } from 'react';

import style from './style.module.scss';

import { getNewIngredient } from '@/app/recipes/new/helper';

import { NewRecipeIngredientStates } from '.';
import RecipeIngredientsContent from './components/RecipeIngredientsContent';
import { AddButton } from './components/buttons';

interface RecipeIngredientsProps {
  setIngredients: React.Dispatch<
    React.SetStateAction<NewRecipeIngredientStates>
  >;
  ingredients: NewRecipeIngredientStates;
}

function RecipeIngredients({
  setIngredients,
  ingredients,
}: RecipeIngredientsProps) {
  const onAddIngredient = useCallback(
    () =>
      setIngredients((preIngredients) => [
        ...preIngredients,
        getNewIngredient(),
      ]),
    [],
  );

  return (
    <div className={style.box}>
      <h3>Ingredients*</h3>
      <div className={style.box__content}>
        <RecipeIngredientsContent
          setIngredients={setIngredients}
          ingredients={ingredients}
        />
        <AddButton onClick={onAddIngredient}>Add a ingredient</AddButton>
      </div>
    </div>
  );
}

export default memo(RecipeIngredients);
