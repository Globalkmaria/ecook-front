'use client';

import { notFound, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import style from './style.module.scss';

import { useClientStore } from '@/providers/client-store-provider';

import { productOptions } from '@/queries/options';
import { useCreateCartItemMutation } from '@/queries/hooks/carts/useCreateCartItemMutation';

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
  const { mutate } = useCreateCartItemMutation();

  const [addProduct, isLoggedIn] = useClientStore((state) => [
    state.addProductToCart,
    state.user.isLoggedIn,
  ]);

  if (isError) throw new Error('Failed to load product');
  if (!product) return notFound();

  const onAddProduct = () => {
    const ingredientKey = product.ingredient.key;
    const productKey = product.key;
    if (isLoggedIn) {
      mutate({
        ingredientKey,
        productKey,
      });
    } else {
      addProduct(ingredientKey, productKey);
    }
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
