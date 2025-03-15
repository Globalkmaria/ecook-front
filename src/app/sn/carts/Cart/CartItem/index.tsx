import style from './style.module.scss';

interface CartItemProps {
  title: string;
  children: React.ReactNode;
}

function CartItem({ title, children }: CartItemProps) {
  return (
    <li className={style['cart-item']}>
      <div className={style['ingredient']}>{title}</div>
      {children}
    </li>
  );
}

export default CartItem;
