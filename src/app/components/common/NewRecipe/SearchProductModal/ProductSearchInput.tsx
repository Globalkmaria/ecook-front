import { ChangeEventHandler, KeyboardEventHandler, useCallback } from 'react';

import { validateLengthAndExecute } from '@/utils/validation';

import Button from '@/components/Button';
import { Input } from '@/components/Input';

import { SelectedProductState } from '.';
import style from './style.module.scss';
import { INGREDIENT_TEXT_LIMIT } from '../RecipeIngredients/RecipeIngredient';

interface Props {
  searchInput: string;
  setSearchInput: (value: string) => void;
  searchIngredient: () => void;
  setSelectedProduct: React.Dispatch<
    React.SetStateAction<SelectedProductState>
  >;
}

function ProductSearchInput({
  searchInput,
  setSearchInput,
  searchIngredient,
  setSelectedProduct,
}: Props) {
  const onSearchSubmit = useCallback(() => {
    searchIngredient();
    setSelectedProduct(null);
  }, [searchIngredient, setSelectedProduct]);

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    validateLengthAndExecute(
      INGREDIENT_TEXT_LIMIT,
      'Ingredient name',
      e.target.value,
      () => setSearchInput(e.target.value),
    );

  const onInputKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') onSearchSubmit();
  };

  return (
    <div className={style.search}>
      <Input
        id='search'
        name='search'
        placeholder='Search product with ingredient name'
        value={searchInput}
        onChange={onInputChange}
        onKeyDown={onInputKeydown}
      />
      <Button variant='secondary' onClick={onSearchSubmit}>
        Search
      </Button>
    </div>
  );
}

export default ProductSearchInput;
