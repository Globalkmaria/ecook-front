import style from './style.module.scss';

import Icon, { IconProps } from '@/components/Icon';
import CustomImage from '@/components/CustomImage';

import QuantityInput from '../QuantityInput';

type CartItemProduct = {
  key: string;
  name: string;
  brand: string;
  purchasedFrom: string;
  img: string;
  quantity: number;
};

export interface CartItemInfo {
  ingredient: { name: string; key: string; quantity?: number };
  products: CartItemProduct[];
}

interface CartItemProps {
  item: CartItemInfo;
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

function CartItem({ item, onQuantityChange }: CartItemProps) {
  const onIngredientQuantityChange = (quantity: number) => {
    onQuantityChange({
      ingredientKey: item.ingredient.key,
      quantity,
    });
  };
  const onProductQuantityChange = (productKey: string, quantity: number) => {
    onQuantityChange({
      ingredientKey: item.ingredient.key,
      productKey,
      quantity,
    });
  };
  return (
    <li className={style['cart-item']}>
      <div className={style['ingredient']}>{item.ingredient.name}</div>
      {item.ingredient.quantity && (
        <QuantityInput
          quantity={item.ingredient.quantity}
          onChange={onIngredientQuantityChange}
        />
      )}
      {item.products.map((product) => (
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
            quantity={product.quantity}
            onChange={(value: number) =>
              onProductQuantityChange(product.key, value)
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
