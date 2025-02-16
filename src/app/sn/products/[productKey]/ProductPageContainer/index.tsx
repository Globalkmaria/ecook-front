'use client';

import { notFound, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import style from './style.module.scss';

import { useClientStore } from '@/providers/client-store-provider';

import { productOptions } from '@/queries/options';

import Button from '@/components/Button';

import { ProductPageParams } from '../page';
import ProductInformation from './ProductInformation';
import ProductRecommend from './ProductRecommend';
import OtherProducts from './OtherProducts';

function ProductPageContainer() {
  const params = useParams<ProductPageParams>();
  const { data: product, isError } = useQuery(
    productOptions({ key: params.productKey }),
  );

  const addProduct = useClientStore((state) => state.addProductToCart);

  if (isError) throw new Error('Failed to load product');
  if (!product) return notFound();

  const onAddProduct = () => {
    addProduct(product.ingredient.key, product.key);
  };
  return (
    <div className={style['container']}>
      <div className={style['header']}>
        <Button onClick={onAddProduct} variant='secondary'>
          Add to cart
        </Button>
      </div>
      <ProductInformation product={product} />
      <OtherProducts />
      <ProductRecommend />
    </div>
  );
}

export default ProductPageContainer;
