import {
  ChangeEventHandler,
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useState,
} from 'react';

import style from './style.module.scss';

import { NewRecipeIngredient } from '@/services/recipes/type';

import useModal from '@/hooks/useModal';

import { validateLengthAndExecute } from '@/utils/validation';

import Button, { ButtonProps } from '@/components/Button';
import { Input } from '@/components/Input';

import { onFieldChange } from '@/app/recipes/new/helper';
import SearchProductModal from './SearchProductModal';
import { RemoveButton } from './buttons';
import {
  addProductInfoToSelectedIngredient,
  removeProductInfoFromSelectedIngredient,
} from './helper';
import { NewRecipeIngredientState, NewRecipeIngredientStates } from '..';

export type SelectedProductInfo = Omit<NewRecipeIngredient, 'quantity'> | null;
export type SelectedIngredientInfo = {
  name: string;
  id?: string | null;
} | null;

export type OnSelectProductProps = ({
  product,
  ingredient,
}: {
  product: SelectedProductInfo;
  ingredient: SelectedIngredientInfo;
}) => void;

interface Props {
  ingredients: NewRecipeIngredientStates;
  onRemove: (id: string) => void;
  setIngredients: Dispatch<SetStateAction<NewRecipeIngredientStates>>;
}

function RecipeIngredientsContent({
  ingredients,
  onRemove,
  setIngredients,
}: Props) {
  const searchProductModalControl = useModal();
  const [selectedIngredient, setSelectedIngredient] =
    useState<NewRecipeIngredientState | null>(null);

  const onSelectProduct: OnSelectProductProps = ({ product, ingredient }) => {
    if (selectedIngredient === null) return;

    if (product === null) {
      setIngredients((prev) =>
        removeProductInfoFromSelectedIngredient(prev, selectedIngredient),
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
          <Ingredient
            key={item.id}
            onChange={onChange}
            onRemove={onRemove}
            item={item}
            onClickSearchProduct={onClickSearchProduct}
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

interface IngredientProps {
  item: NewRecipeIngredientState;
  onRemove: (id: string) => void;
  onChange: (id: string, fieldName: string, value: string) => void;
  onClickSearchProduct: (ingredient: NewRecipeIngredientState) => void;
}

const Ingredient = memo(function Ingredient({
  item,
  onRemove,
  onChange,
  onClickSearchProduct,
}: IngredientProps) {
  const productSelected = item.productId ?? item.newProduct?.name;

  const productButtonType: ButtonProps['variant'] = productSelected
    ? 'success'
    : 'secondary';

  const productButtonTitle = productSelected
    ? 'Product selected'
    : 'Select product';

  const onQuantityChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    validateLengthAndExecute(
      INGREDIENT_QUANTITY_LIMIT,
      'Ingredient quantity',
      e.target.value,
      () => onChange(item.id, e.target.name, e.target.value),
    );

  const onNameChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    validateLengthAndExecute(
      INGREDIENT_TEXT_LIMIT,
      'Ingredient name',
      e.target.value,
      () => onChange(item.id, e.target.name, e.target.value),
    );

  return (
    <li className={style.ingredient}>
      <div className={style['ingredient__inputs']}>
        <Input
          onChange={onQuantityChange}
          className={style['ingredient__quantity']}
          placeholder='Quantity...'
          type='text'
          id='quantity'
          name='quantity'
          value={item.quantity}
        />
        <Input
          onChange={onNameChange}
          className={style['ingredient__name']}
          placeholder='Ingredient name'
          type='text'
          id='name'
          name='name'
          value={item.name}
        />
      </div>
      <div className={style['ingredient__buttons']}>
        <Button
          variant={productButtonType}
          onClick={() => onClickSearchProduct(item)}
        >
          {productButtonTitle}
        </Button>
        <RemoveButton onClick={() => onRemove(item.id)} />
      </div>
    </li>
  );
});

export const INGREDIENT_TEXT_LIMIT = 50;
const INGREDIENT_QUANTITY_LIMIT = 20;
