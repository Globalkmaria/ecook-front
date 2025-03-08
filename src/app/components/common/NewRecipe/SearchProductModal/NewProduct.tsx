import { ChangeEventHandler, MouseEventHandler, useRef } from 'react';

import Icon from '@/components/Icon';
import ImageUploader from '@/components/imageUploader';
import { Input } from '@/components/Input';

import { IngredientNewProduct } from '@/services/requests/recipes/type';

import {
  NEW_PRODUCT_ID,
  SearchedIngredientState,
  SelectedProductState,
} from '.';
import style from './style.module.scss';

interface NewProductProps {
  selectedProduct: SelectedProductState;
  newProductState: IngredientNewProduct;
  setNewProduct: React.Dispatch<React.SetStateAction<IngredientNewProduct>>;
  searchedIngredient: SearchedIngredientState;
  setSelectedProduct: React.Dispatch<
    React.SetStateAction<SelectedProductState>
  >;
}

function NewProduct({
  selectedProduct,
  newProductState,
  setNewProduct,
  searchedIngredient,
  setSelectedProduct,
}: NewProductProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const onCheckBoxClick = () => {
    if (!searchedIngredient) return;

    if (selectedProduct?.productId === NEW_PRODUCT_ID) {
      setSelectedProduct(null);
      return;
    }

    setSelectedProduct({
      ingredientId: searchedIngredient.id,
      ingredientName: searchedIngredient.name,
      productId: NEW_PRODUCT_ID,
      newProduct: newProductState,
    });
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const onNewProductImgChange = (img: File | string | null) => {
    if (typeof img === 'string') return;
    setNewProduct((prev) => ({ ...prev, img }));
  };

  const onItemClick: MouseEventHandler = (e) => {
    const clickInsideContent = contentRef.current?.contains(e.target as Node);
    if (clickInsideContent && selectedProduct?.productId === NEW_PRODUCT_ID)
      return;

    onCheckBoxClick();
  };

  return (
    <li className={style['product-container']} onClick={onItemClick}>
      <input
        className={style.checkbox}
        type='checkbox'
        id={NEW_PRODUCT_ID}
        checked={selectedProduct?.productId === NEW_PRODUCT_ID}
        onChange={() => onCheckBoxClick()}
      />
      <div className={style['new-product']}>
        <h3>Add new product</h3>
        <div ref={contentRef} className={style['content']}>
          <div className={style['img-uploader']}>
            <ImageUploader
              imgValue={newProductState.img}
              onChange={onNewProductImgChange}
              mode='new'
            />
          </div>
          <div className={style['input-container']}>
            <Icon icon='labelFill' />
            <span>{searchedIngredient?.name}</span>
          </div>
          <div className={style['input-container']}>
            <Icon icon='label' />
            <Input
              placeholder='Product name'
              name='name'
              value={newProductState.name}
              onChange={onInputChange}
            />
          </div>
          <div className={style['input-container']}>
            <Icon icon='product' />
            <Input
              placeholder='Brand'
              name='brand'
              value={newProductState.brand ?? ''}
              onChange={onInputChange}
            />
          </div>
          <div className={style['input-container']}>
            <Icon icon='basket' />
            <Input
              placeholder='Purchased at'
              name='purchasedFrom'
              value={newProductState.purchasedFrom ?? ''}
              onChange={onInputChange}
            />
          </div>
        </div>
      </div>
    </li>
  );
}

export default NewProduct;
