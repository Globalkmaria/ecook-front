import { useCallback } from 'react';

import style from './style.module.scss';

import { getNewIngredient } from '@/app/recipes/new/helper';

import { NewRecipeIngredientStates } from '.';
import Ingredients from './components/Ingredients';
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
  const onAddIngredient = () =>
    setIngredients((preIngredients) => [...preIngredients, getNewIngredient()]);

  const onRemoveIngredient = useCallback(
    (id: string) =>
      setIngredients(ingredients.filter((item) => item.id !== id)),
    [ingredients],
  );
  return (
    <div className={style.box}>
      <h3>Ingredients*</h3>
      <div className={style.box__content}>
        <Ingredients
          setIngredients={setIngredients}
          onRemove={onRemoveIngredient}
          ingredients={ingredients}
        />
        <AddButton onClick={onAddIngredient}>Add a ingredient</AddButton>
      </div>
    </div>
  );
}

export default RecipeIngredients;
