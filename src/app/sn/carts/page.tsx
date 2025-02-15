import style from './style.module.scss';

import Cart from './Cart';

function CartPage() {
  return (
    <main className={style['page']}>
      <div className={style['page__container']}>
        <Cart />
      </div>
    </main>
  );
}

export default CartPage;
