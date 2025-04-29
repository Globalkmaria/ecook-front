import { useParams } from 'next/navigation';

import { productsOptions } from '@/queries/options';

import { SuspenseQuery } from '@/app/components/common/SuspenseQuery';

import { PRODUCT_TYPES } from '@/services/requests/products';

import OtherProductList, { OtherProductListSkeleton } from './OtherProductList';
import style from './style.module.scss';
import { ProductPageParams } from '../../page';

function OtherProducts() {
  const { productKey } = useParams<ProductPageParams>();

  return (
    <section className={style['other-products']}>
      <h2 className={style['title']}>Products with same Ingredient</h2>
      <SuspenseQuery
        {...productsOptions({
          q: productKey,
          type: PRODUCT_TYPES.PRODUCT_KEY,
        })}
        errorFallback={Error}
        fallback={<OtherProductListSkeleton />}
      >
        {(products) => <OtherProductList products={products} />}
      </SuspenseQuery>
    </section>
  );
}

export default OtherProducts;

function Error() {
  return <div>Failed to load other products. Try again later.</div>;
}
