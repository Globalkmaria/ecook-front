import style from './style.module.scss';

import { IngredientWithProduct } from '@/services/requests/ingredients/type';

import Icon, { IconProps } from '@/components/Icon';
import CustomImage from '@/components/CustomImage';

import QuantityInput from '../QuantityInput';

interface CartItemProps {
  ingredientKey: string;
  item: {
    quantity?: number;
    products: {
      [productKey: string]: number;
    };
  };
  info: IngredientWithProduct;
  onQuantityChange: ({
    ingredientKey,
    productKey,
    quantity,
  }: {
    ingredientKey: string;
    productKey?: string;
    quantity: number;
  }) => void;
}

function CartItem({
  item,
  ingredientKey,
  info,
  onQuantityChange,
}: CartItemProps) {
  const onIngredientQuantityChange = (quantity: number) => {
    onQuantityChange({
      ingredientKey,
      quantity,
    });
  };
  const onProductQuantityChange = (productKey: string, quantity: number) => {
    onQuantityChange({
      ingredientKey,
      productKey,
      quantity,
    });
  };
  const productKeys = Object.keys(item.products);
  return (
    <li className={style['cart-item']}>
      <div className={style['ingredient']}>{info.ingredient.name}</div>
      {item.quantity && (
        <QuantityInput
          quantity={item.quantity}
          onChange={onIngredientQuantityChange}
        />
      )}
      {productKeys.map((productKey) => (
        <div key={productKey}>
          <div className={style['product']}>
            <div className={style['product__img']}>
              <CustomImage
                src={info.products[productKey].img}
                alt={info.products[productKey].name}
                fill
              />
            </div>
            <div className={style['product__info']}>
              {CONTENTS.map((content, i) => (
                <div className={style['content']} key={i}>
                  <span className={style['content__title']}>
                    <Icon icon={content.icon} />
                    {content.title}
                  </span>
                  <span className={style['content__description']}>
                    {info.products[productKey]?.[content.value]}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <QuantityInput
            quantity={item.products[productKey]}
            onChange={(value: number) =>
              onProductQuantityChange(productKey, value)
            }
          />
        </div>
      ))}
    </li>
  );
}

export default CartItem;

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
