import { memo } from 'react';

import style from './style.module.scss';

import { ProductInfo } from '@/app/recipes/[recipeKey]/components/Product';
import Icon from '@/components/Icon';

import { SelectedProductState } from '.';
import { Product } from '@/service/products/type';
import CustomImage from '@/components/CustomImage';

interface ExistingProductProps {
  item: Product;
  selectedProductId?: SelectedProductState['productId'];
  onClick: (product: Product) => void;
  ingredientName: string;
}

function ExistingProduct({
  item,
  selectedProductId,
  onClick,
  ingredientName,
}: ExistingProductProps) {
  return (
    <li className={style['product-container']} onClick={() => onClick(item)}>
      <input
        className={style.checkbox}
        type='checkbox'
        id={item.id.toString()}
        checked={selectedProductId === item.id}
        onChange={() => onClick(item)}
      />
      <div className={style.product}>
        <div className={style['img-box']}>
          {item.img ? (
            <CustomImage
              src={item.img}
              alt={item.name}
              fill
              loadingClassName={style['img-placeholder']}
              imgClassName={style['img']}
            />
          ) : (
            <Icon icon='img' className={style['img-icon']} />
          )}
        </div>

        <div className={style['product__info']}>
          <ProductInfo product={item} ingredientName={ingredientName} />
        </div>
      </div>
    </li>
  );
}

export default memo(ExistingProduct);
