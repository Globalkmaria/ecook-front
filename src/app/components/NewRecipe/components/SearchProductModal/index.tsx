import { useEffect, useState } from 'react';

import style from './style.module.scss';

import { Product } from '@/services/products/type';
import { IngredientNewProduct } from '@/services/recipes/type';
import { getProducts } from '@/services/products';

import useModal from '@/hooks/useModal';

import { Modal } from '@/components/Modal';

import IngredientInformationHeader from '@/app/sn/recipes/[recipeKey]/Recipe/IngredientList/IngredientInformation/IngredientInformationHeader';

import { NewRecipeIngredientState } from '../..';
import NewProduct from './NewProduct';
import ExistingProduct from './ExistingProduct';
import { OnSelectProductProps } from '../RecipeIngredientsContent';
import {
  getNewProductInitialState,
  getSelectedProductInitialState,
} from './helper';
import ProductSearchInput from './ProductSearchInput';
import SearchProductConfirmButton from './SearchProductConfirmButton';

interface Props {
  control: ReturnType<typeof useModal>;
  onSelectProduct: OnSelectProductProps;
  ingredient: NewRecipeIngredientState;
}

export const NEW_PRODUCT_ID = 'new';

// 'selectedProduct.productId' shows type and status of selected product. new | existing id | null
export type SelectedProductState = {
  ingredientId: string | null;
  name: string;
  productId: string | typeof NEW_PRODUCT_ID | null;
  newProduct: IngredientNewProduct | null;
} | null;

export type SearchedIngredientState = {
  id: string | null;
  name: string;
  products: Product[];
} | null;

function SearchProductModal({ control, onSelectProduct, ingredient }: Props) {
  const [selectedProduct, setSelectedProduct] = useState<SelectedProductState>(
    getSelectedProductInitialState(ingredient),
  );
  const [searchInput, setSearchInput] = useState(ingredient.name);
  const [searchedIngredient, setSearchedIngredient] =
    useState<SearchedIngredientState>(null);
  const [newProduct, setNewProduct] = useState<IngredientNewProduct>(
    getNewProductInitialState(ingredient),
  );

  const isProductSearched = !!searchedIngredient?.name;

  const searchIngredient = async () => {
    if (!searchInput.trim()) {
      setSearchedIngredient(null);
      return;
    }

    const result = await getProducts({
      type: 'ingredientName',
      q: searchInput,
    });
    if (!result.ok) {
      alert('Something went wrong while searching for the products.');
      return;
    }

    setSearchedIngredient({
      id: result.data[0]?.ingredient.id ?? null,
      name: searchInput,
      products: result.data,
    });
  };

  useEffect(() => {
    searchIngredient();
  }, []);

  return (
    <Modal backgroundType='light' onClose={control.onClose} isOpen={true}>
      <div className={style.wrapper}>
        <div className={style.container}>
          <h2 className={style.title}>Select product</h2>
          <ProductSearchInput
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            searchIngredient={searchIngredient}
            setSelectedProduct={setSelectedProduct}
          />

          <IngredientInformationHeader />

          <ul className={style.list}>
            {isProductSearched && (
              <NewProduct
                newProductState={newProduct}
                setNewProduct={setNewProduct}
                searchedIngredient={searchedIngredient}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
              />
            )}
            {searchedIngredient?.products?.map((product) => (
              <ExistingProduct
                key={product.id}
                product={product}
                ingredientName={searchedIngredient?.name}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
              />
            ))}
          </ul>

          <SearchProductConfirmButton
            selectedProduct={selectedProduct}
            onSelectProduct={onSelectProduct}
            searchedIngredient={searchedIngredient}
            newProduct={newProduct}
            onClose={control.onClose}
          />
        </div>
      </div>
    </Modal>
  );
}

export default SearchProductModal;
