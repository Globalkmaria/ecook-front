import { ChangeEventHandler, MouseEventHandler, useRef } from 'react';

import style from './style.module.scss';

import { Input } from '@/components/Input';
import ImageUploader from '@/components/imageUploader';
import { IngredientNewProduct } from '@/service/recipes/type';
import { NEW_PRODUCT_ID, SelectedProductState } from '.';
import Icon from '@/components/Icon';

interface NewProductProps {
  onClick: () => void;
  onInputChange: ChangeEventHandler<HTMLInputElement>;
  id: string;
  selectedProductId: SelectedProductState['productId'];
  newProductState: IngredientNewProduct;
  onNewProductImgChange: (img: File | null) => void;
  ingredientName?: string;
}

function NewProduct({
  onClick,
  id,
  selectedProductId,
  onInputChange,
  newProductState,
  onNewProductImgChange,
  ingredientName,
}: NewProductProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClick: MouseEventHandler = (e) => {
    if (
      contentRef.current?.contains(e.target as Node) &&
      selectedProductId === NEW_PRODUCT_ID
    )
      return;

    onClick();
  };

  return (
    <li className={style['product-container']} onClick={handleClick}>
      <input
        className={style.checkbox}
        type='checkbox'
        id={id}
        checked={selectedProductId === id}
        onChange={() => onClick()}
      />
      <div className={style['new-product']}>
        <h3>Add new product</h3>
        <div ref={contentRef} className={style['content']}>
          <div className={style['img-uploader']}>
            <ImageUploader
              imgValue={newProductState.img}
              onChange={onNewProductImgChange}
            />
          </div>
          <div className={style['input-container']}>
            <Icon icon='labelFill' />
            <span>{ingredientName}</span>
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
