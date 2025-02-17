import { memo } from 'react';

import style from './style.module.scss';

import Icon, { IconProps } from '@/components/Icon';
import CustomImage from '@/components/CustomImage';

import { CartItemInfo } from '../LoggedInUserCart/LoggedInUserCartItem';
import QuantityInput from '../QuantityInput';

interface Props {
  product: Omit<CartItemInfo['products'][0], 'quantity'>;
  onChange: (productKey: string, quantity: number) => void;
  quantity: number;
}

function CartProducts({ product, onChange, quantity }: Props) {
  return (
    <div key={product.key}>
      <div className={style['product']}>
        <div className={style['product__img']}>
          <CustomImage src={product.img} alt={product.name} fill />
        </div>
        <div className={style['product__info']}>
          {CONTENTS.map((content, i) => (
            <div className={style['content']} key={i}>
              <span className={style['content__title']}>
                <Icon icon={content.icon} />
                {content.title}
              </span>
              <span className={style['content__description']}>
                {product?.[content.value]}
              </span>
            </div>
          ))}
        </div>
      </div>
      <QuantityInput
        quantity={quantity}
        onChange={(value: number) => onChange(product.key, value)}
      />
    </div>
  );
}

export default memo(CartProducts);

const CONTENT_VALUES = ['name', 'brand', 'purchasedFrom'] as const;
type ContentValues = (typeof CONTENT_VALUES)[number];

const CONTENTS: {
  icon: IconProps['icon'];
  title: string;
  value: ContentValues;
}[] = [
  {
    value: 'name',
    title: 'Product name',
    icon: 'label',
  },
  {
    value: 'brand',
    title: 'Brand',
    icon: 'product',
  },

  {
    value: 'purchasedFrom',
    title: 'Purchased from',
    icon: 'basket',
  },
];
