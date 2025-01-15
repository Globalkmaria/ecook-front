import { ChangeEventHandler, KeyboardEventHandler } from 'react';

import style from './style.module.scss';

import { validateLengthAndExecute } from '@/utils/validation';

import Button from '@/components/Button';
import { Input } from '@/components/Input';

import { INGREDIENT_TEXT_LIMIT } from '../RecipeIngredientsContent';

function ProductSearchInput({
  searchInput,
  setSearchInput,
  handleSearchSubmit,
}: {
  searchInput: string;
  setSearchInput: (value: string) => void;
  handleSearchSubmit: () => void;
}) {
  const handleSearchInputChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    validateLengthAndExecute(
      INGREDIENT_TEXT_LIMIT,
      'Ingredient name',
      e.target.value,
      () => setSearchInput(e.target.value),
    );

  const handleInputKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') handleSearchSubmit();
  };

  return (
    <div className={style.search}>
      <Input
        id='search'
        name='search'
        placeholder='Search product with ingredient name'
        value={searchInput}
        onChange={handleSearchInputChange}
        onKeyDown={handleInputKeydown}
      />
      <Button variant='secondary' onClick={handleSearchSubmit}>
        Search
      </Button>
    </div>
  );
}

export default ProductSearchInput;
