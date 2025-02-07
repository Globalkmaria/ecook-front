import { ChangeEventHandler, memo } from 'react';

import style from './ingredients.module.scss';

import { validateLengthAndExecute } from '@/utils/validation';

import Button, { ButtonProps } from '@/components/Button';
import { Input } from '@/components/Input';

import { NewRecipeIngredientState } from '..';
import { RemoveButton } from '../buttons';

interface Props {
  item: NewRecipeIngredientState;
  onRemove: (id: string) => void;
  onChange: (id: string, fieldName: string, value: string) => void;
  onClickSearchProduct: (ingredient: NewRecipeIngredientState) => void;
  onResetSelectedProduct: (ingredientId: string) => void;
}

function RecipeIngredient({
  item,
  onRemove,
  onChange,
  onClickSearchProduct,
  onResetSelectedProduct,
}: Props) {
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

  const onNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onResetSelectedProduct(item.id);
    validateLengthAndExecute(
      INGREDIENT_TEXT_LIMIT,
      'Ingredient name',
      e.target.value,
      () => onChange(item.id, e.target.name, e.target.value),
    );
  };

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
          id='ingredientName'
          name='ingredientName'
          value={item.ingredientName}
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
}

export default memo(RecipeIngredient);

export const INGREDIENT_TEXT_LIMIT = 50;
const INGREDIENT_QUANTITY_LIMIT = 20;
