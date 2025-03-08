'use client';

import { useClientStore } from '@/providers/client-store-provider';

import LoggedInUserCart from './LoggedInUserCart';
import NotLoggedInUserCart from './NotLoggedInUserCart';
import style from './style.module.scss';

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
