import { Dispatch, memo, SetStateAction, useCallback, useState } from 'react';

import style from './style.module.scss';

import { NewRecipeIngredient } from '@/services/recipes/type';

import useModal from '@/hooks/useModal';

import SearchProductModal from './SearchProductModal';
import RecipeIngredient from './RecipeIngredient';
import {
  addProductInfoToSelectedIngredient,
  onFieldChange,
  removeProductInfoFromSelectedIngredient,
} from './helper';
import { NewRecipeIngredientState, NewRecipeIngredientStates } from '..';

export type SelectedProductInfo = Omit<NewRecipeIngredient, 'quantity'> | null;
export type SelectedIngredientInfo = {
  name: string;
  id?: string | null;
} | null;

export type OnSelectProductProps = {
  product: SelectedProductInfo;
  ingredient: SelectedIngredientInfo;
};

export type OnSelectProduct = ({
  product,
  ingredient,
}: OnSelectProductProps) => void;

interface Props {
  ingredients: NewRecipeIngredientStates;
  setIngredients: Dispatch<SetStateAction<NewRecipeIngredientStates>>;
}

function RecipeIngredientsContent({ ingredients, setIngredients }: Props) {
  const searchProductModalControl = useModal();
  const [selectedIngredient, setSelectedIngredient] =
    useState<NewRecipeIngredientState | null>(null);

  const onRemove = useCallback(
    (id: string) => {
      if (ingredients.length === 1) return;
      setIngredients(ingredients.filter((item) => item.id !== id));
    },
    [ingredients, ingredients.length],
  );

  const onSelectProduct: OnSelectProduct = ({ product, ingredient }) => {
    if (selectedIngredient === null) return;

    if (product === null) {
      setIngredients((prev) =>
        removeProductInfoFromSelectedIngredient(prev, selectedIngredient.id),
      );
      return;
    }

    setIngredients((prev) =>
      addProductInfoToSelectedIngredient({
        ingredients: prev,
        selectedIngredient,
        selectedProductInfo: product,
        selectedIngredientInfo: ingredient,
      }),
    );

    setSelectedIngredient(null);
    searchProductModalControl.onClose();
  };

  const onResetSelectedProduct = useCallback(
    (ingredientId: string) => {
      setIngredients((prev) =>
        removeProductInfoFromSelectedIngredient(prev, ingredientId),
      );
    },
    [setIngredients],
  );

  const onClickSearchProduct = useCallback(
    (ingredient: NewRecipeIngredientState) => {
      setSelectedIngredient(ingredient);
      searchProductModalControl.onOpen();
    },
    [searchProductModalControl],
  );

  const onChange = useCallback(
    (id: string, fieldName: string, value: string) =>
      onFieldChange(setIngredients, id, fieldName, value),
    [setIngredients],
  );

  return (
    <>
      <ul className={style.ingredients}>
        {ingredients.map((item) => (
          <RecipeIngredient
            key={item.id}
            onChange={onChange}
            onRemove={onRemove}
            item={item}
            onClickSearchProduct={onClickSearchProduct}
            onResetSelectedProduct={onResetSelectedProduct}
          />
        ))}
      </ul>
      {selectedIngredient && searchProductModalControl.isOpen && (
        <SearchProductModal
          control={searchProductModalControl}
          onSelectProduct={onSelectProduct}
          ingredient={selectedIngredient}
        />
      )}
    </>
  );
}

export default memo(RecipeIngredientsContent);
