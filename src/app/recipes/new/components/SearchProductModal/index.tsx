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

import { IngredientProduct } from '@/data/ingredients';
import { getIngredientInfo } from '@/data/helper';

import useModal from '@/hooks/useModal';

import IngredientInformationHeader from '@/app/recipes/[recipeId]/components/IngredientInformation/IngredientInformationHeader';

import NewProduct from './NewProduct';
import ExistingProduct from './ExistingProduct';
import { Ingredient } from '../Ingredients';

interface Props {
  control: ReturnType<typeof useModal>;
  onSelectProduct: (product: IngredientState | null) => void;
  ingredient: Ingredient;
}

const NEW_PRODUCT_ID = 'new';

// data to create recipe
export interface IngredientState {
  ingredientId: string | null;
  ingredientName: string;
  productId: string | null;
  product: (NewProductState & { id?: string }) | null;
}

export interface NewProductState {
  name: string;
  img?: string;
  brand?: string;
  purchasedFrom?: string;
}

type SearchedIngredientState = {
  id?: string;
  name: string;
  products: (NewProductState & { id: string; ingredientId: string })[];
} | null;

// 'selectedProduct.productId' shows type and status of selected product. new | existing | null

function SearchProductModal({ control, onSelectProduct, ingredient }: Props) {
  const [selectedProduct, setSelectedProduct] =
    useState<IngredientState | null>({
      ingredientId: ingredient.id,
      ingredientName: ingredient.name,
      productId: ingredient.productId,
      product: ingredient.product,
    });
  const [searchInput, setSearchInput] = useState(ingredient.name);

  const [searchedIngredient, setSearchedIngredient] =
    useState<SearchedIngredientState | null>(null);

  const [newProduct, setNewProduct] = useState<NewProductState>({
    name: '',
    img: '',
    brand: '',
    purchasedFrom: '',
  });

  const onNewProductChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const onNewProductImgChange = (img: string | null) =>
    setNewProduct((prev) => ({ ...prev, img }));

  const handleSearchInputChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setSearchInput(e.target.value);

  const searchIngredient = () => {
    const ingredientInfo: SearchedIngredientState = getIngredientInfo(
      searchInput,
    ) ?? {
      name: searchInput,
      products: [],
    };

    setSearchedIngredient(ingredientInfo);
  };

  const handleSearchSubmit = () => {
    searchIngredient();
    setSelectedProduct(null);
  };

  const handleInputKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') handleSearchSubmit();
  };

  const onExistingProductClick = (product: IngredientProduct) => {
    if (!searchedIngredient?.id) return;

    if (selectedProduct?.productId === product.id) {
      setSelectedProduct(null);
      return;
    }

    setSelectedProduct({
      ingredientId: searchedIngredient.id,
      ingredientName: searchedIngredient.name,
      productId: product.id,
      product: {
        id: product.id,
        name: product.name,
        img: product.img || '',
        brand: product.brand || '',
        purchasedFrom: product.purchasedFrom || '',
      },
    });
  };

  const onNewProductClick = () => {
    if (!searchedIngredient) return;

    if (selectedProduct?.productId === NEW_PRODUCT_ID) {
      setSelectedProduct(null);
      return;
    }

    setSelectedProduct({
      ingredientId: searchedIngredient.id || null,
      ingredientName: searchedIngredient.name,
      productId: NEW_PRODUCT_ID,
      product: {
        name: newProduct.name,
        img: newProduct.img || '',
        brand: newProduct.brand || '',
        purchasedFrom: newProduct.purchasedFrom || '',
      },
    });
  };

  const handleConfirm = () => {
    if (!selectedProduct?.productId || !searchedIngredient?.name) {
      onSelectProduct(null);
      control.onClose();
      return;
    }

    if (selectedProduct.productId === NEW_PRODUCT_ID) {
      if (!selectedProduct.ingredientName) {
        alert('Please enter product name to create new product.');
        return;
      }
      // removing fake product id
      onSelectProduct({ ...selectedProduct, productId: null });
      control.onClose();
      return;
    }

    onSelectProduct(selectedProduct);
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
              selectedProductId={selectedProduct?.productId}
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
                selectedProductId={selectedProduct?.productId}
                onClick={onExistingProductClick}
                currentIngredientName={searchedIngredient?.name}
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
