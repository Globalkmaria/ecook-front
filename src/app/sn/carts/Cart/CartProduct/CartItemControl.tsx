import { memo, useCallback } from 'react';

import Button from '@/components/Button';
import IconButton from '@/components/IconButton';

import QuantityInput from '@/app/components/common/QuantityInput';

import { CartItemProduct } from '.';
import style from './style.module.scss';

export interface CartItemControlProps {
  ingredientKey: string;
  product?: CartItemProduct;
  quantity: number;
  onChange: (quantity: number) => void;
  onAddPantryBox: (args: {
    ingredientKey: string;
    productKey?: string;
    quantity: number;
  }) => void;
}

export const CartItemControl = memo(function ItemControl({
  quantity,
  onChange,
  product,
  ingredientKey,
  onAddPantryBox,
}: CartItemControlProps) {
  const onDelete = useCallback(() => onChange(0), [onChange]);

  const onAddPantryBoxClick = () => {
    onAddPantryBox({
      ingredientKey,
      productKey: product?.key,
      quantity,
    });
  };

  return (
    <div className={style['item-control']}>
      <div className={style['item-control__left']}>
        <QuantityInput quantity={quantity} onChange={onChange} />
        <Button onClick={onAddPantryBoxClick} variant='secondary'>
          Move to pantry
        </Button>
      </div>
      <IconButton
        icon='trash'
        className={style['delete-button']}
        onClick={onDelete}
      >
        Delete
      </IconButton>
    </div>
  );
});
