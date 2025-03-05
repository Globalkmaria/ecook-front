import { memo, useCallback } from 'react';
import Link from 'next/link';

import style from './style.module.scss';

import Icon, { IconProps } from '@/components/Icon';
import CustomImage from '@/components/CustomImage';
import QuantityInput from '@/app/components/common/QuantityInput';

import { getProductLink } from '@/helpers/links';

import { CartItemInfo } from '../LoggedInUserCart/LoggedInUserCartItem';
import IconButton from '@/components/IconButton';

interface Props {
  product: Omit<CartItemInfo['products'][0], 'quantity'>;
  onChange: (productKey: string, quantity: number) => void;
  quantity: number;
}

function CartProduct({ product, onChange, quantity }: Props) {
  const productLink = getProductLink(product.key);

  const handleOnChange = useCallback(
    (quantity: number) => {
      onChange(product.key, quantity);
    },
    [onChange, product.key],
  );
  return (
    <div key={product.key} className={style['cart-product']}>
      <div className={style['product']}>
        <Link href={productLink} className={style['product__link']}>
          <CustomImage
            src={product.img}
            alt={product.name}
            fill
            className={style['product__img']}
          />
        </Link>
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

      <QuantityInputWithDeleteButton
        quantity={quantity}
        onChange={handleOnChange}
      />
    </div>
  );
}

export default memo(CartProduct);

export function QuantityInputWithDeleteButton({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (quantity: number) => void;
}) {
  const onDelete = useCallback(() => onChange(0), []);
  return (
    <div className={style['quantity']}>
      <QuantityInput quantity={quantity} onChange={onChange} />
      <IconButton
        icon='trash'
        className={style['delete-button']}
        onClick={onDelete}
      >
        Delete
      </IconButton>
    </div>
  );
}

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
