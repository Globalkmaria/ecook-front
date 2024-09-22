import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useState,
} from 'react';

import style from './style.module.scss';

import Button from '@/components/Button';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';

import useModal from '@/hooks/useModal';

import IngredientInformationHeader from '@/app/recipes/[recipeId]/components/IngredientInformation/IngredientInformationHeader';

import NewProduct from './NewProduct';
import ExistingProduct from './ExistingProduct';
import { NewRecipeIngredientState } from '../../NewRecipe';
import { IngredientNewProduct } from '@/service/recipes/type';
import { Product } from '@/service/products/type';
import { onSelectProductProps } from '../Ingredients';

interface Props {
  control: ReturnType<typeof useModal>;
  onSelectProduct: onSelectProductProps;
  ingredient: NewRecipeIngredientState;
}

export const NEW_PRODUCT_ID = 'new';

export type SelectedProductState = {
  ingredientId: number | null;
  name: string;
  productId: number | typeof NEW_PRODUCT_ID | null;
  newProduct: IngredientNewProduct | null;
};

type SearchedIngredientState = {
  id: number | null;
  name: string;
  products: Product[];
} | null;

// 'selectedProduct.productId' shows type and status of selected product. new | existing | null

function SearchProductModal({ control, onSelectProduct, ingredient }: Props) {
  const [selectedProduct, setSelectedProduct] =
    useState<SelectedProductState | null>(
      ingredient.productId === null
        ? null
        : {
            ingredientId: ingredient.ingredientId,
            name: ingredient.name,
            productId: ingredient.productId,
            newProduct: ingredient.newProduct,
          },
    );
  const [searchInput, setSearchInput] = useState(ingredient.name);

  const [searchedIngredient, setSearchedIngredient] =
    useState<SearchedIngredientState | null>(null);

  const [newProduct, setNewProduct] = useState<IngredientNewProduct>({
    name: '',
    img: null,
    brand: null,
    link: null,
    purchasedFrom: null,
  });

  const onNewProductChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const onNewProductImgChange = (img: File | null) =>
    setNewProduct((prev) => ({ ...prev, img }));

  const handleSearchInputChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setSearchInput(e.target.value);

  const searchIngredient = async () => {
    const { ingredientId, products } = await fetch(
      `http://localhost:8080/api/v1/products?ingredient=${searchInput}`,
    ).then((response) => response.json());

    setSearchedIngredient({
      id: ingredientId,
      name: searchInput,
      products,
    });
  };

  const handleSearchSubmit = () => {
    searchIngredient();
    setSelectedProduct(null);
  };

  const handleInputKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') handleSearchSubmit();
  };

  const onExistingProductClick = (product: Product) => {
    if (!searchedIngredient?.id) return;

    if (selectedProduct?.productId === product.id) {
      setSelectedProduct(null);
      return;
    }

    setSelectedProduct({
      ingredientId: product.ingredientId,
      name: product.name,
      productId: product.id,
      newProduct: null,
    });
  };

  const onNewProductClick = () => {
    if (!searchedIngredient) return;

    if (selectedProduct?.productId === NEW_PRODUCT_ID) {
      setSelectedProduct(null);
      return;
    }

    setSelectedProduct({
      ingredientId: searchedIngredient.id ?? null,
      name: searchedIngredient.name,
      productId: NEW_PRODUCT_ID,
      newProduct,
    });
  };

  const handleConfirm = () => {
    if (!selectedProduct) {
      onSelectProduct(null);
      control.onClose();
      return;
    }

    if (selectedProduct.productId === NEW_PRODUCT_ID) {
      if (!selectedProduct.name) {
        alert('Please enter product name to create new product.');
        return;
      }

      // removing new product fake product id
      onSelectProduct({ ...selectedProduct, productId: null });
      control.onClose();
      return;
    }

    onSelectProduct({
      name: selectedProduct.name,
      ingredientId: selectedProduct.ingredientId,
      productId: selectedProduct.productId,
      newProduct: null,
    });

    control.onClose();
  };

  useEffect(() => {
    searchIngredient();
  }, []);

  return (
    <Modal backgroundType='light' onClose={control.onClose} isOpen={true}>
      <div className={style.wrapper}>
        <div className={style.container}>
          <h2 className={style.title}>Select product</h2>
          <div className={style.search}>
            <Input
              id='search'
              name='search'
              placeholder='Search product'
              value={searchInput}
              onChange={handleSearchInputChange}
              onKeyDown={handleInputKeydown}
            />
            <Button variant='secondary' onClick={handleSearchSubmit}>
              Search
            </Button>
          </div>
          <IngredientInformationHeader />

          <ul className={style.list}>
            <NewProduct
              selectedProductId={selectedProduct?.productId ?? null}
              id={NEW_PRODUCT_ID}
              onClick={onNewProductClick}
              onInputChange={onNewProductChange}
              newProductState={newProduct}
              onNewProductImgChange={onNewProductImgChange}
              currentIngredientName={searchedIngredient?.name}
            />
            {searchedIngredient?.products?.map((product) => (
              <ExistingProduct
                key={product.id}
                item={product}
                selectedProductId={selectedProduct?.productId ?? null}
                onClick={onExistingProductClick}
              />
            ))}
          </ul>

          <Button className={style['confirm-button']} onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default SearchProductModal;
