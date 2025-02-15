'use client';

import { useState } from 'react';

import style from './style.module.scss';

import Icon, { IconProps } from '@/components/Icon';
import { useClientStore } from '@/providers/client-store-provider';
import { useShallow } from 'zustand/shallow';

const item: CartItem = {
  id: 1,
  ingredient: {
    id: '1',
    name: 'ingredient',
  },
  product: {
    id: '1',
    name: 'product',
    brand: 'brand',
    purchasedFrom: 'purchasedFrom',
    img: 'img',
    key: 'key',
  },
  quantity: 1,
};

function Cart() {
  const isLoggedIn = useClientStore((state) => state.user.isLoggedIn);
  const CartContent = isLoggedIn ? LoggedInUserCart : NotLoggedInUserCart;
  return (
    <>
      <h2 className={style['title']}>Cart</h2>
      <ul className={style['cart']}>
        <CartContent />
      </ul>
    </>
  );
}

export default Cart;

type CartItem = {
  id: number;
  ingredient: {
    id: string;
    name: string;
  };
  product: {
    id: string;
    name: string;
    brand: string;
    purchasedFrom: string;
    img: string;
    key: string;
  };
  quantity: number;
};

function LoggedInUserCart() {
  const items = Array.from({ length: 5 }, (_, i) => ({
    ...item,
    id: i,
  }));
  const onQuantityChange = (quantity: number) => {};
  const quantities: {
    [key: string]: number;
  } = {};

  return items.map((item) => (
    <Item
      key={item.id}
      item={item}
      onQuantityChange={onQuantityChange}
      quantity={quantities[item.id]}
    />
  ));
}

function NotLoggedInUserCart() {
  const [quantities, setQuantities, getItems, removeItem] = useClientStore(
    useShallow((state) => [
      state.carts.quantities,
      state.carts.setQuantity,
      state.carts.getItems,
      state.carts.removeItem,
    ]),
  );

  // const items = getItems();

  const items = Array.from({ length: 5 }, (_, i) => ({
    ...item,
    id: i,
  }));

  const onQuantityChange = (quantity: number) => {
    if (quantity <= 0) {
      removeItem(item.ingredient.id);
    } else {
      setQuantities(item.ingredient.id, quantity);
    }
  };

  return items.map((item) => (
    <Item
      key={item.ingredient.id}
      item={item}
      quantity={quantities[item.ingredient.id] ?? 1}
      onQuantityChange={onQuantityChange}
    />
  ));
}

interface ItemProps {
  item: CartItem;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

function Item({ item, quantity, onQuantityChange }: ItemProps) {
  return (
    <li className={style['cart-item']}>
      <div className={style['ingredient']}>{item.ingredient.name}</div>
      {item.product && (
        <div className={style['product']}>
          <div className={style['product__img']}></div>
          <div className={style['product__info']}>
            {CONTENTS.map((content, i) => (
              <div className={style['content']} key={i}>
                <span className={style['content__title']}>
                  <Icon icon={content.icon} />
                  {content.title}
                </span>
                <span className={style['content__description']}>
                  {item.product[content.value]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      <Quantity quantity={quantity} onChange={onQuantityChange} />
    </li>
  );
}

type QuantityProps = {
  quantity: number;
  onChange: (quantity: number) => void;
};

function Quantity({ quantity, onChange }: QuantityProps) {
  const LeftButton = quantity <= 1 ? RemoveButton : MinusButton;
  return (
    <div className={style['quantity']}>
      <LeftButton quantity={quantity} onChange={onChange} />
      {quantity}
      <PlusButton quantity={quantity} onChange={onChange} />
    </div>
  );
}

function RemoveButton({ onChange }: QuantityProps) {
  const onClick = () => {
    onChange(0);
  };

  return (
    <button onClick={onClick} type='button'>
      <Icon icon='trash' />
    </button>
  );
}
function MinusButton({ quantity, onChange }: QuantityProps) {
  const onClick = () => {
    onChange(quantity - 1);
  };

  return (
    <button onClick={onClick} type='button'>
      <Icon icon='remove' />
    </button>
  );
}

function PlusButton({ quantity, onChange }: QuantityProps) {
  const onClick = () => {
    onChange(quantity + 1);
  };

  return (
    <button onClick={onClick} type='button'>
      <Icon icon='add' />
    </button>
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
