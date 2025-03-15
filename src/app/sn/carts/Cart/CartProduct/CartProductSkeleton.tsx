import Skeleton from '@/components/Skeleton';

import style from './style.module.scss';

const array = Array(3).fill(1);

function CartProductSkeleton() {
  return (
    <div className={style['cart-product']}>
      <div className={style['product']}>
        <div className={style['product__link']}>
          <Skeleton border />
        </div>
        <div className={style['product__info']}>
          {array.map((_, i) => (
            <div className={style['content']} key={i}>
              <div className={style['skeleton__text']}>
                <Skeleton border />
              </div>
              <div className={style['skeleton__text']}>
                <Skeleton border />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={style['item-control']}>
        <div className={style['item-control__left']}>
          <div className={style['skeleton__input']}>
            <Skeleton />
          </div>

          <div className={style['skeleton__button']}>
            <Skeleton border />
          </div>
        </div>
        <div className={style['item-control__right']}>
          <div className={style['skeleton__delete']}>
            <Skeleton border />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProductSkeleton;
