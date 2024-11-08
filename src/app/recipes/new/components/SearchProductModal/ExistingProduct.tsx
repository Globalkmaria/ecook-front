import Image from 'next/image';

import style from './style.module.scss';

import { ProductInfo } from '@/app/recipes/[recipeId]/components/Product';
import Icon from '@/components/Icon';

import { SelectedProductState } from '.';
import { Product } from '@/service/products/type';

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
  const img = item.img || '/ingredient/default.png';

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
            <Image src={img} alt={item.name} fill />
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

export default ExistingProduct;
