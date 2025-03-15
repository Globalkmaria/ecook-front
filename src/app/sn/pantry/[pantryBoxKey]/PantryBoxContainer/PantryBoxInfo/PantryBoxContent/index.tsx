'use client';

import { getSearchLink } from '@/helpers/links';

import Anchor from '@/components/Anchor';
import CustomImage from '@/components/CustomImage';

import { getTotalQuantity } from './helper';
import PantryBoxItems, { PantryBoxItemsProps } from './PantryBoxItems';
import style from './style.module.scss';

interface PantryBox {
  key: string;
  img?: string | null;
  ingredientName: string;
  productName?: string | null;
  brand?: string;
  purchasedFrom?: string;

  items: {
    key: string;
    buyDate: string;
    expireDate: string;
    quantity: number;
  }[];
}

export type PantryBoxContentProps = {
  pantryBox: PantryBox;
} & Omit<PantryBoxItemsProps, 'items'>;

function PantryBoxContent({ pantryBox, ...restProps }: PantryBoxContentProps) {
  const totalQuantity = getTotalQuantity(pantryBox.items);
  const title = `${pantryBox.ingredientName}${pantryBox.productName ? ` / ${pantryBox.productName}` : ''}`;
  return (
    <section className={style['pantry-box']}>
      <h1 className={style['pantry-box__title']}>{title}</h1>
      <PantryBoxImg img={pantryBox.img} alt={pantryBox.ingredientName} />
      <PantryBoxInfo pantryBox={pantryBox} totalQuantity={totalQuantity} />
      <PantryBoxItems items={pantryBox.items} {...restProps} />
    </section>
  );
}

export default PantryBoxContent;

function PantryBoxImg({ img, alt }: { img?: string | null; alt: string }) {
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
    <div>
      <div className={style['pantry-box__info']}>
        <div className={style['box']}>
          <span className={style['box__title']}>Total Quantity</span>
          <span className={style['box__description']}>{totalQuantity}</span>
        </div>

        {pantryBox.productName && (
          <>
            <div className={style['box']}>
              <span className={style['box__title']}>Product Brand</span>
              <span className={style['box__description']}>
                {pantryBox.brand}
              </span>
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
      <div className={style['links']}>
        <Anchor
          variant='secondary'
          href={getSearchLink('ingredient', pantryBox.ingredientName)}
        >{`What Can I Make with This Ingredient?`}</Anchor>
        {pantryBox.productName && (
          <Anchor
            href={getSearchLink('product', pantryBox.productName)}
          >{`What Can I Make with This Product?`}</Anchor>
        )}
      </div>
    </div>
  );
}
