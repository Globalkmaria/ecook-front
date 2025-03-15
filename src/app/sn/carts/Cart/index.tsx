'use client';

import { Suspense } from 'react';

import dynamic from 'next/dynamic';

import { useClientStore } from '@/providers/client-store-provider';

const LoggedInUserCart = dynamic(() => import('./LoggedInUserCart'), {
  ssr: false,
  loading: () => <CartItemsSkeleton />,
});
const NotLoggedInUserCart = dynamic(() => import('./NotLoggedInUserCart'), {
  ssr: false,
  loading: () => <CartItemsSkeleton />,
});
import CartItemsSkeleton from './CartItem/CartItemsSkeleton';
import style from './style.module.scss';

function Cart() {
  const isLoggedIn = useClientStore((state) => state.user.isLoggedIn);
  const CartContent = isLoggedIn ? LoggedInUserCart : NotLoggedInUserCart;
  return (
    <>
      <h2 className={style['title']}>Cart</h2>
      <ul className={style['cart']}>
        <Suspense fallback={<CartItemsSkeleton />}>
          <CartContent />
        </Suspense>
      </ul>
    </>
  );
}

export default Cart;
