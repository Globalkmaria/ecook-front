'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';

import { productOptions } from '@/queries/options';

import style from './style.module.scss';
import { ProductPageParams } from '../page';
import AddToCart from './AddToCart';
import OtherProducts from './OtherProducts';
import ProductInformation from './ProductInformation';
import ProductRecommend from './ProductRecommend';

function ProductContent() {
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

export default ProductContent;
