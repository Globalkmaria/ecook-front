'use client';

import { notFound, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import style from './style.module.scss';

import { productOptions } from '@/queries/productOptions';

import { ProductPageParams } from '../page';
import ProductInformation from './ProductInformation';
import ProductRecommend from './ProductRecommend';

function ProductPageContainer() {
  const params = useParams<ProductPageParams>();
  const { data: product, isError } = useQuery(
    productOptions({ key: params.productKey }),
  );

  if (isError) throw new Error('Failed to load product');
  if (!product) return notFound();

  return (
    <div className={style['container']}>
      <ProductInformation product={product} />
      <ProductRecommend />
    </div>
  );
}

export default ProductPageContainer;
