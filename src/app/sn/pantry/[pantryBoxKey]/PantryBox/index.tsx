'use client';

import style from './style.module.scss';

import QuantityInput from '@/app/sn/carts/Cart/QuantityInput';
import Button from '@/components/Button';
import CustomImage from '@/components/CustomImage';
import IconButton from '@/components/IconButton';
import { Input } from '@/components/Input';
import {
  dayLeftUntil,
  daysPassedSince,
  getDateAfterToday,
  getToday,
} from '@/utils/time';
import { useState } from 'react';
import { getLeftDayChipType } from '../../helper';
import Chip from '@/components/Chip';

const PANTRY_BOX: PantryBox = {
  key: '1',
  img: '/img/bg1.png',

  ingredientName: 'Onion',
  productName: 'Delicious Product',

  brand: 'Organic',
  purchasedFrom: "Trader Joe's",
  pantryBoxItemKey: '1',

  items: [
    {
      key: '1',
      buyDate: '2025-03-01',
      expireDate: '2025-03-10',
      quantity: 1,
    },
    {
      key: '2',
      buyDate: '2025-03-11',
      expireDate: '2025-03-20',
      quantity: 2,
    },
    {
      key: '3',
      buyDate: '2025-03-21',
      expireDate: '2025-03-30',
      quantity: 3,
    },
  ],
};

interface PantryBox {
  key: string;
  img?: string;
  ingredientName: string;
  productName?: string;
  brand?: string;
  purchasedFrom?: string;

  pantryBoxItemKey: string;
  items: {
    key: string;
    buyDate: string;
    expireDate: string;
    quantity: number;
  }[];
}

function PantryBox() {
  const pantryBox = PANTRY_BOX;
  const [items, setItems] = useState<PantryBox['items']>(pantryBox.items);

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <section className={style['pantry-box']}>
      <PantryBoxImg img={pantryBox.img} alt={pantryBox.ingredientName} />
      <PantryBoxInfo pantryBox={pantryBox} totalQuantity={totalQuantity} />
      <PantryBoxItems items={items} setItems={setItems} />
    </section>
  );
}

export default PantryBox;

function PantryBoxImg({ img, alt }: { img?: string; alt: string }) {
  if (!img) return null;

  return (
    <div className={style['pantry-box__img']}>
      <CustomImage fill src={img} alt={alt} />
    </div>
  );
}

function PantryBoxInfo({
  pantryBox,
  totalQuantity,
}: {
  pantryBox: PantryBox;
  totalQuantity: number;
}) {
  return (
    <div className={style['pantry-box__info']}>
      <div className={style['box']}>
        <span className={style['box__title']}>Ingredient Name</span>
        <span className={style['box__description']}>
          {pantryBox.ingredientName}
        </span>
      </div>
      <div className={style['box']}>
        <span className={style['box__title']}>Total Quantity</span>
        <span className={style['box__description']}>{totalQuantity}</span>
      </div>

      {pantryBox.productName && (
        <>
          <div className={style['box']}>
            <span className={style['box__title']}>Product Name</span>
            <span className={style['box__description']}>
              {pantryBox.productName}
            </span>
          </div>
          <div className={style['box']}>
            <span className={style['box__title']}>Product Brand</span>
            <span className={style['box__description']}>{pantryBox.brand}</span>
          </div>
          <div className={style['box']}>
            <span className={style['box__title']}>Purchased From</span>
            <span className={style['box__description']}>
              {pantryBox.purchasedFrom}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

interface PantryBoxItemsProps {
  items: PantryBox['items'];
  setItems: React.Dispatch<
    React.SetStateAction<
      {
        key: string;
        buyDate: string;
        expireDate: string;
        quantity: number;
      }[]
    >
  >;
}

function PantryBoxItems({ items, setItems }: PantryBoxItemsProps) {
  const onAdd = () =>
    setItems((prev) => [
      ...prev,
      {
        key: `${prev.length + 1}`,
        buyDate: getToday(),
        expireDate: getDateAfterToday(7),
        quantity: 1,
      },
    ]);

  return (
    <div className={style['pantry-box-items']}>
      <Button onClick={onAdd} className={style['add-button']}>
        Add new item
      </Button>
      <ul className={style['items']}>
        {items.map((item) => (
          <Item key={item.key} item={item} setItems={setItems} />
        ))}
      </ul>
    </div>
  );
}

function Item({
  item,
  setItems,
}: {
  item: PantryBox['items'][number];
  setItems: React.Dispatch<
    React.SetStateAction<
      {
        key: string;
        buyDate: string;
        expireDate: string;
        quantity: number;
      }[]
    >
  >;
}) {
  const daysPassed = daysPassedSince(item.buyDate);
  const daysLeft = dayLeftUntil(item.expireDate);
  const leftDayChipType = getLeftDayChipType(daysLeft);

  const onChange = (quantity: number) =>
    setItems((prev) =>
      prev.map((prevItem) =>
        prevItem.key === item.key ? { ...prevItem, quantity } : prevItem,
      ),
    );

  const onDelete = (key: string) =>
    setItems((prev) => prev.filter((i) => i.key !== key));

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setItems((prev) =>
      prev.map((prevItem) =>
        prevItem.key === item.key
          ? { ...prevItem, [e.target.name]: e.target.value }
          : prevItem,
      ),
    );

  return (
    <li key={item.key} className={style['item']}>
      <div className={style['box']}>
        <span className={style['box__title']}>Buy Date</span>
        <Input
          name='buyDate'
          type='date'
          value={item.buyDate}
          onChange={onDateChange}
        />
        <Chip type='info'>+ {daysPassed}</Chip>
      </div>
      <div className={style['box']}>
        <span className={style['box__title']}>Expire Date</span>
        <Input
          name='expireDate'
          type='date'
          value={item.expireDate}
          onChange={onDateChange}
        />
        <Chip type={leftDayChipType}>- {daysLeft}</Chip>
      </div>

      <div className={style['item__quantity']}>
        <div className={style['box']}>
          <span className={style['box__title']}>Quantity</span>
          <QuantityInput quantity={item.quantity} onChange={onChange} />
        </div>
        <IconButton
          icon='trash'
          className={style['delete-button']}
          onClick={() => onDelete(item.key)}
        >
          Delete
        </IconButton>
      </div>
    </li>
  );
}
