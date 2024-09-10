import Image from 'next/image';

import style from './style.module.scss';

import { ProductInfo } from '@/app/recipes/[recipeId]/components/Product';
import Icon from '@/components/Icon';

import { IngredientProduct } from '@/data/ingredients';

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

export default ExistingProduct;
