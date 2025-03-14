import { memo, useCallback } from 'react';

import { getSearchIngredientLink } from '@/helpers/links';

import Checkbox from '@/components/CheckboxList';
import SearchIconLink from '@/components/SearchIconLink';

import { Ingredient, RecipeDetail } from '@/services/requests/recipe/type';

import AddIngredientToCartButton from './AddIngredientToCartButton';
import InformationButton from './InformationButton';
import style from './style.module.scss';

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
    [setCheckedList],
  );

  return (
    <Checkbox.Container>
      {ingredients.map((ingredient, index) => (
        <IngredientItem
          key={index}
          ingredient={ingredient}
          onChange={onIngredientsToggle}
          selected={checkedList[index]}
          index={index}
        />
      ))}
    </Checkbox.Container>
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
    <Checkbox.Item
      checked={selected}
      onChange={() => onChange(index)}
      className={style.item}
      index={index}
    >
      <div className={style.content}>
        <Checkbox.Label selected={selected} htmlFor={index.toString()}>
          <span className={style.name}>{ingredient.name}</span>
          <span>-</span>
          <span className={style.quantity}>{ingredient.quantity}</span>
        </Checkbox.Label>
        <SearchIconLink href={getSearchIngredientLink(ingredient.name)} />
        {ingredient.userProduct && (
          <InformationButton ingredient={ingredient} />
        )}
        <AddIngredientToCartButton
          ingredientKey={ingredient.key}
          productKey={ingredient.userProduct?.key}
        />
      </div>
    </Checkbox.Item>
  );
});
