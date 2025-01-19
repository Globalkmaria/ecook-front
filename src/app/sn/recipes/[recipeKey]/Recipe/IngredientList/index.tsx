import { memo, useCallback } from 'react';

import style from './style.module.scss';

import { Ingredient, RecipeDetail } from '@/services/recipe/type';

import { getSearchIngredientLink } from '@/helpers/link';

import { ListItem } from '@/components/List';
import SearchIconLink from '@/components/SearchIconLink';

import InformationButton from './InformationButton';

interface Props {
  state: [
    Record<string, boolean>,
    React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
  ];
  ingredients: RecipeDetail['ingredients'];
}

function Ingredients({ ingredients, state }: Props) {
  const [checkedList, setCheckedList] = state;
  const onIngredientsToggle = useCallback(
    (index: number) =>
      setCheckedList((prev) => ({
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
          selected={checkedList[index]}
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
