import Image from 'next/image';

import style from './style.module.scss';

import { IngredientProduct } from '@/data/ingredients';

import { joinClassNames } from '@/utils/style';

import Chip from '@/components/Chip';
import Icon from '@/components/Icon';

function Product({
  item,
  isUserProduct,
}: {
  item: IngredientProduct;
  isUserProduct?: boolean;
}) {
  const img = item.img || '/ingredient/default.png';

  const productClassName = isUserProduct
    ? joinClassNames(style['product--user'], style.product)
    : style.product;

  return (
    <div className={productClassName}>
      {isUserProduct && (
        <div className={style['user-pick']}>
          <Chip border>User pick</Chip>
        </div>
      )}

      <div className={style['img-box']}>
        {item.img ? (
          <Image src={img} alt={item.name} fill />
        ) : (
          <Icon icon='img' className={style['img-icon']} />
        )}
      </div>
      <div className={style['product__content']}>
        <div className={style['product__info']}>
          <Icon icon='label' />
          <span>{item.name}</span>
        </div>
        <div className={style['product__info']}>
          <Icon icon='product' />
          <span>{item.brand || ''}</span>
        </div>
        <div className={style['product__info']}>
          <Icon icon='basket' />
          <span>{item.purchasedAt || ''}</span>
        </div>
      </div>
    </div>
  );
}

export default Product;
