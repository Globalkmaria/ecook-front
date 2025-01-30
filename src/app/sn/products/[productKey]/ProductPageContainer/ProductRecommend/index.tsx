import style from './style.module.scss';

import ProductRecommendList from './ProductRecommendList';

function ProductRecommend() {
  return (
    <section className={style['recommend']}>
      <h2 className={style['title']}>Explore related recipes</h2>
      <ProductRecommendList />
    </section>
  );
}

export default ProductRecommend;
