import {
  ChangeEventHandler,
  Dispatch,
  memo,
  SetStateAction,
  useState,
} from 'react';

import style from './style.module.scss';

import { Input } from '@/components/Input';
import useModal from '@/hooks/useModal';
import Button, { ButtonProps } from '@/components/Button';

import { RemoveButton } from './buttons';
import SearchProductModal from './SearchProductModal';
import { onFieldChange } from '../helper';
import {
  NewRecipeIngredientState,
  NewRecipeIngredientStates,
} from '../NewRecipe';
import { NewRecipeIngredient } from '@/service/recipes/type';

export type OnSelectProductProps = ({
  product,
  ingredient,
}: {
  product: Omit<NewRecipeIngredient, 'quantity'> | null;
  ingredient: {
    name: string;
    id?: string | null;
  } | null;
}) => void;

interface Props {
  ingredients: NewRecipeIngredientStates;
  onRemove: (id: string) => void;
  setIngredients: Dispatch<SetStateAction<NewRecipeIngredientStates>>;
}

function Ingredients({ ingredients, onRemove, setIngredients }: Props) {
  const searchProductModalControl = useModal();
  const [selectedIngredient, setSelectedIngredient] =
    useState<NewRecipeIngredientState | null>(null);

  const onSelectProduct: OnSelectProductProps = ({ product, ingredient }) => {
    if (selectedIngredient === null) return;

    if (product === null) {
      setIngredients((prev) =>
        prev.map((item) =>
          item.id === selectedIngredient.id
            ? {
                ...item,
                newProduct: null,
                productId: null,
              }
            : item,
        ),
      );

      return;
    }

    setIngredients((prev) =>
      prev.map((item) =>
        item.id === selectedIngredient.id
          ? {
              ...item,
              name: ingredient?.name ?? '',
              ingredientId: ingredient?.id ?? null,
              productId: product.productId ?? null,
              newProduct: product.newProduct ?? null,
            }
          : item,
      ),
    );

    setSelectedIngredient(null);
    searchProductModalControl.onClose();
  };

  const onClickSearchProduct = (ingredient: NewRecipeIngredientState) => {
    setSelectedIngredient(ingredient);
    searchProductModalControl.onOpen();
  };

  const onChange = (id: string, fieldName: string, value: string) =>
    onFieldChange(setIngredients, id, fieldName, value);

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

export default memo(Ingredients);

interface IngredientProps {
  item: NewRecipeIngredientState;
  onRemove: (id: string) => void;
  onChange: (id: string, fieldName: string, value: string) => void;
  onClickSearchProduct: (ingredient: NewRecipeIngredientState) => void;
}

function Ingredient({
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
