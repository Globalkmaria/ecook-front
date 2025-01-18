import { memo, useCallback, useState } from 'react';

import style from './style.module.scss';

import { Ingredient, RecipeDetail } from '@/services/recipe/type';

import { getSearchIngredientLink } from '@/helpers/link';

import { ListItem } from '@/components/List';
import SearchIconLink from '@/components/SearchIconLink';
import { getListCheckboxInitialState } from '@/components/helpers';

import InformationButton from './InformationButton';

interface Props {
  ingredients: RecipeDetail['ingredients'];
}

function Ingredients({ ingredients }: Props) {
  const [ingredientsChecked, setIngredientsChecked] = useState(
    getListCheckboxInitialState(ingredients),
  );

  const onIngredientsToggle = useCallback(
    (index: number) =>
      setIngredientsChecked((prev) => ({
        ...prev,
        [index]: !prev[index],
      })),
    [],
  );

  return (
    <ul>
      {ingredients.map((ingredient, index) => (
        <IngredientItem
          key={index}
          ingredient={ingredient}
          onChange={onIngredientsToggle}
          selected={ingredientsChecked[index]}
          index={index}
        />
      ))}
    </ul>
  );
}

export default Ingredients;

interface IngredientProps {
  ingredient: Ingredient;
  onChange: (index: number) => void;
  selected: boolean;
  index: number;
}

const IngredientItem = memo(function IngredientItem({
  ingredient,
  onChange,
  selected,
  index,
}: IngredientProps) {
  return (
    <ListItem className={style.item}>
      <input
        onChange={() => onChange(index)}
        checked={selected}
        type='checkbox'
        id={index.toString()}
      />
      <div className={style.content}>
        <label htmlFor={index.toString()}>
          <span className={style.name}>{ingredient.name}</span>
          <span>-</span>
          <span className={style.quantity}>{ingredient.quantity}</span>
          <SearchIconLink href={getSearchIngredientLink(ingredient.name)} />
          {ingredient.userProduct && (
            <InformationButton ingredient={ingredient} />
          )}
        </label>
      </div>
    </ListItem>
  );
});
