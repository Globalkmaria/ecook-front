'use client';

import style from './style.module.scss';

import CustomImage from '@/components/CustomImage';
import { useState } from 'react';
import PantryBoxItems from './PantryBoxItems';

// const PANTRY_BOX: PantryBox = {
//   key: '1',
//   img: '',

//   ingredientName: 'Onion',
//   pantryBoxItemKey: '1',

//   items: [
//     {
//       key: '1',
//       buyDate: '2025-03-01',
//       expireDate: '2025-03-10',
//       quantity: 1,
//     },
//     {
//       key: '2',
//       buyDate: '2025-03-11',
//       expireDate: '2025-03-20',
//       quantity: 2,
//     },
//     {
//       key: '3',
//       buyDate: '2025-03-21',
//       expireDate: '2025-03-30',
//       quantity: 3,
//     },
//   ],
// };

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

export interface PantryBox {
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

function PantryBoxContent() {
  const pantryBox = PANTRY_BOX;
  const [items, setItems] = useState<PantryBox['items']>(pantryBox.items);

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const title = `${pantryBox.ingredientName}${pantryBox.productName ? ` / ${pantryBox.productName}` : ''}`;
  return (
    <section className={style['pantry-box']}>
      <h1 className={style['pantry-box__title']}>{title}</h1>
      <PantryBoxImg img={pantryBox.img} alt={pantryBox.ingredientName} />
      <PantryBoxInfo pantryBox={pantryBox} totalQuantity={totalQuantity} />
      <PantryBoxItems items={items} setItems={setItems} />
    </section>
  );
}

export default PantryBoxContent;

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
        <span className={style['box__title']}>Total Quantity</span>
        <span className={style['box__description']}>{totalQuantity}</span>
      </div>

      {pantryBox.productName && (
        <>
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
