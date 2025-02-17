'use client';

import { notFound, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import style from './style.module.scss';

import { productOptions } from '@/queries/options';

import { ProductPageParams } from '../page';
import ProductInformation from './ProductInformation';
import ProductRecommend from './ProductRecommend';
import OtherProducts from './OtherProducts';
import AddToCart from './AddToCart';

function ProductPageContainer() {
  const params = useParams<ProductPageParams>();
  const { data: product, isError } = useQuery(
    productOptions({ key: params.productKey }),
  );

  if (isError) throw new Error('Failed to load product');
  if (!product) return notFound();

  return (
    <div className={style['container']}>
      <div className={style['header']}>
        <AddToCart
          ingredientKey={product.ingredient.key}
          productKey={product.key}
        />
      </div>
      <ProductInformation product={product} />
      <OtherProducts />
      <ProductRecommend />
    </div>
  );
}

export default ProductPageContainer;
