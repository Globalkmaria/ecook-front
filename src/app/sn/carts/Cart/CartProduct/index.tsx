import { memo, useCallback } from 'react';
import Link from 'next/link';

import style from './style.module.scss';

import Icon, { IconProps } from '@/components/Icon';
import CustomImage from '@/components/CustomImage';
import QuantityInput from '@/app/components/common/QuantityInput';

import { getProductLink } from '@/helpers/links';

import { CartItemInfo } from '../LoggedInUserCart/LoggedInUserCartItem';
import IconButton from '@/components/IconButton';
import Button from '@/components/Button';
import { useClientStore } from '@/providers/client-store-provider';
import { getNewPantryBox } from '@/stores/slices/pantry/helper';

interface Props {
  product: Omit<CartItemInfo['products'][0], 'quantity'>;
  onChange: (productKey: string, quantity: number) => void;
  quantity: number;
  ingredientKey: string;
}

function CartProduct({ product, onChange, quantity, ingredientKey }: Props) {
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

      <ItemControl
        ingredientKey={ingredientKey}
        quantity={quantity}
        onChange={handleOnChange}
        product={product}
      />
    </div>
  );
}

export default memo(CartProduct);

interface ItemControlProps {
  ingredientKey: string;
  product?: Props['product'];
  quantity: number;
  onChange: (quantity: number) => void;
}

export function ItemControl({
  quantity,
  onChange,
  product,
  ingredientKey,
}: ItemControlProps) {
  const addPantryBox = useClientStore((state) => state.addPantryBox);
  const onDelete = useCallback(() => onChange(0), []);

  const onAddPantryBoxClick = () => {
    addPantryBox(
      getNewPantryBox({
        ingredientKey: ingredientKey,
        productKey: product?.key,
        quantity,
      }),
    );
    onDelete();
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
