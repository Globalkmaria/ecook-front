'use client';

import style from './style.module.scss';

import { useClientStore } from '@/providers/client-store-provider';

import NotLoggedInUserCart from './NotLoggedInUserCart';
import LoggedInUserCart from './LoggedInUserCart';

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
