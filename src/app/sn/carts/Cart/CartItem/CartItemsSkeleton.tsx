import Skeleton from '@/components/Skeleton';

import style from './style.module.scss';
import CartProductSkeleton from '../CartProduct/CartProductSkeleton';

const array = Array(5).fill(1);

function CartItemsSkeleton() {
  return (
    <>
      {array.map((_, i) => (
        <CartItemSkeleton key={i} />
      ))}
    </>
  );
}

export default CartItemsSkeleton;

function CartItemSkeleton() {
  return (
    <li className={style['cart-item']}>
      <div className={style['ingredient-skeleton']}>
        <Skeleton border />
      </div>
      <CartProductSkeleton />
    </li>
  );
}
