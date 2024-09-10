import { ChangeEventHandler } from 'react';

import style from './style.module.scss';

import { Input } from '@/components/Input';
import ImageUploader from '@/components/imageUploader';

import { NewProductState } from '.';

interface NewProductProps {
  onClick: () => void;
  onInputChange: ChangeEventHandler<HTMLInputElement>;
  id: string;
  selectedProductId?: string | null;
  newProductState: NewProductState;
  onNewProductImgChange: (img: string | null) => void;
  currentIngredientName?: string;
}

function NewProduct({
  onClick,
  id,
  selectedProductId,
  onInputChange,
  newProductState,
  onNewProductImgChange,
  currentIngredientName,
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
        <span className={style['ingredient-name']}>
          {currentIngredientName}
        </span>
        <div className={style['img-uploader']}>
          <ImageUploader
            imgValue={newProductState.img}
            onChange={onNewProductImgChange}
          />
        </div>
        <div className={style['input-container']}>
          <Input
            placeholder='Product name'
            name='name'
            value={newProductState.name}
            onChange={onInputChange}
          />
        </div>
        <div className={style['input-container']}>
          <Input
            placeholder='Product brand'
            name='brand'
            value={newProductState.brand}
            onChange={onInputChange}
          />
        </div>
        <div className={style['input-container']}>
          <Input
            placeholder='Purchased from'
            name='purchasedFrom'
            value={newProductState.purchasedFrom}
            onChange={onInputChange}
          />
        </div>
      </div>
    </li>
  );
}

export default NewProduct;
