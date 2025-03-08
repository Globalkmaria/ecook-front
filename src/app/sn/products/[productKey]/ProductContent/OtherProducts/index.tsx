import OtherProductList from './OtherProductList';
import style from './style.module.scss';

function OtherProducts() {
  return (
    <section className={style['other-products']}>
      <h2 className={style['title']}>Products with same Ingredient</h2>
      <OtherProductList />
    </section>
  );
}

export default OtherProducts;
