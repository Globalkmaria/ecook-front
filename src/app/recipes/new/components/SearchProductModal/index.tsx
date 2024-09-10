import IngredientInformationHeader from '@/app/recipes/[recipeId]/components/IngredientInformation/IngredientInformationHeader';
import style from './style.module.scss';

import { ProductInfo } from '@/app/recipes/[recipeId]/components/Product';
import Button from '@/components/Button';
import ImageUploader from '@/components/imageUploader';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { IngredientProduct } from '@/data/ingredients';

import useModal from '@/hooks/useModal';
import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';
import Image from 'next/image';
import Icon from '@/components/Icon';
import { getIngredientInfo } from '@/data/helper';

interface Props {
  control: ReturnType<typeof useModal>;
  onSelectProduct: (product: IngredientState) => void;
  ingredientName: string;
}

const NEW_PRODUCT_ID = 'new';

// existing product

// data to create recipe
interface IngredientState {
  ingredientId: string | null;
  ingredientName: string;
  productId: string | null;
  product: (NewProductState & { id?: string }) | null;
}

interface NewProductState {
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

function SearchProductModal({
  control,
  onSelectProduct,
  ingredientName,
}: Props) {
  const [selectedProduct, setSelectedProduct] =
    useState<IngredientState | null>({
      ingredientId: null,
      ingredientName,
      productId: NEW_PRODUCT_ID,
      product: null,
    });
  const [searchInput, setSearchInput] = useState(ingredientName);
  // TODO searched ingredient product on mount
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

  const handleSearchSubmit = () => {
    const ingredientInfo: SearchedIngredientState = getIngredientInfo(
      searchInput,
    ) ?? {
      name: searchInput,
      products: [],
    };

    setSearchedIngredient(ingredientInfo);
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
      control.onClose();
      return;
    }

    if (selectedProduct.productId === NEW_PRODUCT_ID) {
      // removing fake product id
      onSelectProduct({ ...selectedProduct, productId: null });
      control.onClose();
      return;
    }

    onSelectProduct(selectedProduct);
    control.onClose();
  };

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
            />
            {searchedIngredient?.products?.map((product) => (
              <ExistingProduct
                item={product}
                selectedProductId={selectedProduct?.productId}
                onClick={onExistingProductClick}
                key={product.id}
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

interface NewProductProps {
  onClick: () => void;
  onInputChange: ChangeEventHandler<HTMLInputElement>;
  id: string;
  selectedProductId?: string | null;
  newProductState: NewProductState;
  onNewProductImgChange: (img: string | null) => void;
}
function NewProduct({
  onClick,
  id,
  selectedProductId,
  onInputChange,
  newProductState,
  onNewProductImgChange,
}: NewProductProps) {
  return (
    <li className={style['product-container']} onClick={onClick}>
      <input
        className={style.checkbox}
        type='checkbox'
        id={id}
        checked={selectedProductId === id}
        onChange={() => onClick()}
      />
      <div className={style['new-product']}>
        <h3>New Product</h3>
        <div className={style['img-uploader']}>
          <ImageUploader
            imgValue={newProductState.img}
            onChange={onNewProductImgChange}
          />
        </div>
        <Input
          placeholder='Product name'
          name='name'
          value={newProductState.name}
          onChange={onInputChange}
        />
        <Input
          placeholder='Product brand'
          name='brand'
          value={newProductState.brand}
          onChange={onInputChange}
        />
        <Input
          placeholder='Purchased from'
          name='purchasedFrom'
          value={newProductState.purchasedFrom}
          onChange={onInputChange}
        />
      </div>
    </li>
  );
}

interface ExistingProductProps {
  item: IngredientProduct;
  selectedProductId?: string | null;
  onClick: (product: IngredientProduct) => void;
}

function ExistingProduct({
  item,
  selectedProductId,
  onClick,
}: ExistingProductProps) {
  const img = item.img || '/ingredient/default.png';

  return (
    <li className={style['product-container']} onClick={() => onClick(item)}>
      <input
        className={style.checkbox}
        type='checkbox'
        id={item.id}
        checked={selectedProductId === item.id}
        onChange={() => onClick(item)}
      />
      <div className={style.product}>
        <div className={style['img-box']}>
          {item.img ? (
            <Image src={img} alt={item.name} fill />
          ) : (
            <Icon icon='img' className={style['img-icon']} />
          )}
        </div>

        <div className={style['product__info']}>
          <ProductInfo item={item} />
        </div>
      </div>
    </li>
  );
}
