import Cart from './Cart';
import style from './style.module.scss';

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
