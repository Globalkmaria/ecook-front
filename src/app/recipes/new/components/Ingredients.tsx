import { ChangeEventHandler, memo, useState } from 'react';

import style from './style.module.scss';

import { Input } from '@/components/Input';
import useModal from '@/hooks/useModal';
import Button, { ButtonProps } from '@/components/Button';

import { RemoveButton } from './buttons';
import SearchProductModal from './SearchProductModal';
import { IngredientProduct } from '@/data/ingredients';

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  productId: string | null;
}

interface Props {
  ingredients: Ingredient[];
  onRemove: (id: string) => void;
  onChange: (id: string, fieldName: string, value: string) => void;
}

function Ingredients({
  ingredients,
  onRemove,
  onChange,
}: Props): React.ReactElement<Props> | null {
  const searchProductModalControl = useModal();
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);

  const onSelectProduct = (product: IngredientProduct) => {
    if (selectedIngredient === null) return;
    onChange(selectedIngredient.id, 'productId', product.id);
    onChange(selectedIngredient.id, 'name', product.name);
    setSelectedIngredient(null);
    searchProductModalControl.onClose();
  };

  const onClickSearchProduct = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    searchProductModalControl.onOpen();
  };

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
      {searchProductModalControl.isOpen && (
        <SearchProductModal
          control={searchProductModalControl}
          onSelectProduct={onSelectProduct}
          selectedIngredient={selectedIngredient}
        />
      )}
    </>
  );
}

export default memo(Ingredients);

interface IngredientProps {
  item: Ingredient;
  onRemove: (id: string) => void;
  onChange: (id: string, fieldName: string, value: string) => void;
  onClickSearchProduct: (ingredient: Ingredient) => void;
}

function Ingredient({
  item,
  onRemove,
  onChange,
  onClickSearchProduct,
}: IngredientProps) {
  const productButtonType: ButtonProps['variant'] = item.productId
    ? 'success'
    : 'secondary';
  const productButtonTitle = item.productId
    ? 'Product selected'
    : 'Select product';

  const handleValueChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    onChange(item.id, e.target.name, e.target.value);

  return (
    <li className={style.ingredient}>
      <div className={style['ingredient__inputs']}>
        <Input
          onChange={handleValueChange}
          className={style['ingredient__quantity']}
          placeholder='Quantity...'
          type='text'
          id='quantity'
          name='quantity'
          value={item.quantity}
        />
        <Input
          onChange={handleValueChange}
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
}
