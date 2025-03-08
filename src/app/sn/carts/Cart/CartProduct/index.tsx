import { memo, useCallback } from 'react';
import Link from 'next/link';

import style from './style.module.scss';

import Icon, { IconProps } from '@/components/Icon';
import CustomImage from '@/components/CustomImage';
import QuantityInput from '@/app/components/common/QuantityInput';

import { getProductLink } from '@/helpers/links';

import IconButton from '@/components/IconButton';
import Button from '@/components/Button';

export interface CartItemProduct {
  key: string;
  name: string;
  brand: string;
  purchasedFrom: string;
  img: string;
}

export interface CartItemInfo {
  ingredient: { name: string; key: string; quantity?: number };
  products: CartItemProduct[];
}

export interface CartProductProps {
  product: CartItemProduct;
  onChange: (productKey: string, quantity: number) => void;
  quantity: number;
  ingredientKey: string;
  onAddPantryBox: CartItemControlProps['onAddPantryBox'];
}

function CartProduct({
  product,
  onChange,
  quantity,
  ingredientKey,
  onAddPantryBox,
}: CartProductProps) {
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

      <CartItemControl
        ingredientKey={ingredientKey}
        quantity={quantity}
        onChange={handleOnChange}
        product={product}
        onAddPantryBox={onAddPantryBox}
      />
    </div>
  );
}

export default memo(CartProduct);

interface CartItemControlProps {
  ingredientKey: string;
  product?: CartItemProduct;
  quantity: number;
  onChange: (quantity: number) => void;
  onAddPantryBox: (args: {
    ingredientKey: string;
    productKey?: string;
    quantity: number;
  }) => void;
}

export const CartItemControl = memo(function ItemControl({
  quantity,
  onChange,
  product,
  ingredientKey,
  onAddPantryBox,
}: CartItemControlProps) {
  const onDelete = useCallback(() => onChange(0), []);

  const onAddPantryBoxClick = () => {
    onAddPantryBox({
      ingredientKey,
      productKey: product?.key,
      quantity,
    });
  };

  return (
    <div className={style['item-control']}>
      <div className={style['item-control__left']}>
        <QuantityInput quantity={quantity} onChange={onChange} />
        <Button onClick={onAddPantryBoxClick} variant='secondary'>
          Move to pantry
        </Button>
      </div>
      <IconButton
        icon='trash'
        className={style['delete-button']}
        onClick={onDelete}
      >
        Delete
      </IconButton>
    </div>
  );
});

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
