import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';

import style from './style.module.scss';

import { Product } from '@/service/products/type';
import { IngredientNewProduct } from '@/service/recipes/type';

import useModal from '@/hooks/useModal';

import { getRandomId } from '@/utils/generateId';
import { validateLengthAndExecute } from '@/utils/validation';

import Button from '@/components/Button';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import IngredientInformationHeader from '@/app/recipes/[key]/components/IngredientInformation/IngredientInformationHeader';

import NewProduct from './NewProduct';
import ExistingProduct from './ExistingProduct';
import { NewRecipeIngredientState } from '../../NewRecipe';
import { INGREDIENT_TEXT_LIMIT, OnSelectProductProps } from '../Ingredients';

interface Props {
  control: ReturnType<typeof useModal>;
  onSelectProduct: OnSelectProductProps;
  ingredient: NewRecipeIngredientState;
}

export const NEW_PRODUCT_ID = 'new';

export type SelectedProductState = {
  ingredientId: string | null;
  name: string;
  productId: string | typeof NEW_PRODUCT_ID | null;
  newProduct: IngredientNewProduct | null;
};

type SearchedIngredientState = {
  id: string | null;
  name: string;
  products: Product[];
} | null;

// 'selectedProduct.productId' shows type and status of selected product. new | existing | null

function SearchProductModal({ control, onSelectProduct, ingredient }: Props) {
  const [selectedProduct, setSelectedProduct] =
    useState<SelectedProductState | null>(
      (ingredient.productId ?? ingredient.newProduct?.id)
        ? {
            ...ingredient,
            productId: ingredient.productId ?? NEW_PRODUCT_ID,
          }
        : null,
    );
  const [searchInput, setSearchInput] = useState(ingredient.name);

  const [searchedIngredient, setSearchedIngredient] =
    useState<SearchedIngredientState | null>(null);

  const [newProduct, setNewProduct] = useState<IngredientNewProduct>(
    ingredient.newProduct?.id
      ? {
          ...ingredient.newProduct,
        }
      : {
          name: '',
          img: null,
          brand: null,
          link: null,
          purchasedFrom: null,
          id: getRandomId(),
        },
  );

  const confirmButtonTitle = selectedProduct
    ? 'Product selected'
    : 'Continue without a product';

  const onNewProductChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const onNewProductImgChange = (img: File | null) =>
    setNewProduct((prev) => ({ ...prev, img }));

  const handleSearchInputChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    validateLengthAndExecute(
      INGREDIENT_TEXT_LIMIT,
      'Ingredient name',
      e.target.value,
      () => setSearchInput(e.target.value),
    );

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

  const onExistingProductClick = useCallback(
    (product: Product) => {
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
    },
    [searchedIngredient?.id, selectedProduct?.productId],
  );

  const onNewProductClick = () => {
    if (!searchedIngredient) return;

    if (selectedProduct?.productId === NEW_PRODUCT_ID) {
      setSelectedProduct(null);
      return;
    }

    setSelectedProduct({
      ingredientId: searchedIngredient.id ?? null,
      name: newProduct.name,
      productId: NEW_PRODUCT_ID,
      newProduct,
    });
  };

  const handleConfirm = () => {
    if (!selectedProduct) {
      onSelectProduct({
        product: null,
        ingredient: null,
      });

      control.onClose();
      return;
    }

    if (selectedProduct.productId === NEW_PRODUCT_ID) {
      if (!newProduct.name) {
        alert('Please enter product name to create new product.');
        return;
      }

      // removing new product fake product id
      onSelectProduct({
        product: {
          ...selectedProduct,
          productId: null,
          newProduct,
        },
        ingredient: {
          name: searchedIngredient?.name ?? '',
          id: searchedIngredient?.id,
        },
      });
      control.onClose();
      return;
    }

    onSelectProduct({
      product: {
        name: selectedProduct.name,
        ingredientId: selectedProduct.ingredientId,
        productId: selectedProduct.productId,
        newProduct: null,
      },
      ingredient: {
        name: searchedIngredient?.name ?? '',
        id: searchedIngredient?.id,
      },
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
              placeholder='Search product with ingredient name'
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
            {!!searchedIngredient?.name && (
              <NewProduct
                selectedProductId={selectedProduct?.productId ?? null}
                id={NEW_PRODUCT_ID}
                onClick={onNewProductClick}
                onInputChange={onNewProductChange}
                newProductState={newProduct}
                onNewProductImgChange={onNewProductImgChange}
                ingredientName={searchedIngredient?.name}
              />
            )}
            {searchedIngredient?.products?.map((product) => (
              <ExistingProduct
                key={product.id}
                item={product}
                selectedProductId={selectedProduct?.productId ?? null}
                onClick={onExistingProductClick}
                ingredientName={searchedIngredient?.name}
              />
            ))}
          </ul>

          <Button
            variant={selectedProduct ? 'success' : 'primary'}
            className={style['confirm-button']}
            onClick={handleConfirm}
          >
            {confirmButtonTitle}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default SearchProductModal;
