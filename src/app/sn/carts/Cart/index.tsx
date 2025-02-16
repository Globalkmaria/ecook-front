'use client';

import NotLoggedInUserCart from './NotLoggedInUserCart';
import style from './style.module.scss';

function Cart() {
  const CartContent = NotLoggedInUserCart;
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
